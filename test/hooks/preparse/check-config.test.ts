import { Config } from '@oclif/core';
import { expect } from 'chai';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

describe('hooks', () => {
  let config: Config;

  // Load the config before the tests run
  before(async () => {
    config = await Config.load({ root: path.dirname(fileURLToPath(import.meta.url)) });
  });

  it('should respect --skipPreparse flag and not load the config', async () => {
    const argv: string[] = ['--skipPreparse'];

    const options = {
      flags: {},
    };

    const results = await config.runHook('preparse', { argv, options });

    console.log(results.failures[0])
    expect(results.successes[0]).to.be.ok;
    expect(results.successes[0].result).to.deep.equal(argv);
  });

  it('should merge the config file when --skipPreparse is not present', async () => {
    const argv: string[] = ['--config=test/designex.config.json'];
    const options = {
      flags: {},
    };

    const mockConfig = {
      "scriptName": "test_build.js",
      "scriptPath": "designex/scripts"
    };
    const configFilePath = path.join(process.cwd(), 'test/designex.config.json');
    await fs.writeFile(configFilePath, JSON.stringify(mockConfig, null, 2));

    const results = await config.runHook('preparse', { argv, options });

    expect(results.successes[0].result).to.include('--scriptPath=designex/scripts');
    expect(results.successes[0].result).to.include('--scriptName=test_build.js');

    await fs.unlink(configFilePath);
  });

  it('should handle custom config file via --config flag', async () => {
    const argv: string[] = ['--config=test/custom-config.json']; 
    const options = {
      flags: {},
    };

    const customConfig = {
      customFlag: 'customValue',
    };
    const customConfigFilePath = path.join(process.cwd(), 'test/custom-config.json');
    await fs.writeFile(customConfigFilePath, JSON.stringify(customConfig));

    const results = await config.runHook('preparse', { argv, options });

    expect(results.successes[0].result).to.include('--customFlag=customValue');

    await fs.unlink(customConfigFilePath);
  });
});
