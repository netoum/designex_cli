import { runCommand } from '@oclif/test'
import { expect } from 'chai';
import fs from 'node:fs/promises';
import path from 'node:path';

async function createMockConfigFile(filePath: string, config: object) {
  const resolvedPath = path.resolve(filePath);
  await fs.writeFile(resolvedPath, JSON.stringify(config, null, 2));
  return resolvedPath;
}

describe('hooks', () => {

  before(async () => {
    const mockConfig = {
      "build": {
        "script": "build.mjs",
        "tokens": "tokens"
      },
      "setup": {
        "dir": "test/tmp/designex_hooks",
        "template": "shadcn/tokens-studio/multi"
      }

    };
    await createMockConfigFile('test/tmp/designex_hooks.config.json', mockConfig);
  });

  after(async () => {
    try {
      await fs.rm(path.resolve('test/tmp/designex_hooks.config.json'));
      await fs.rm(path.resolve('test/tmp/designex_hooks'), { recursive: true });
    } catch { }
  });


  it('merge config file by default', async () => {
    const { stdout } = await runCommand('setup --config=test/tmp/designex_hooks.config.json --dir=test/tmp/designex_hooks')
    expect(stdout).to.contain("Designex template \"shadcn/tokens-studio/multi\"")
    expect(stdout).to.not.contain("Designex template \"shadcn/tokens-studio/single\"")

  });

  it('do not merge config file when --skipPreparse', async () => {

    const { stdout } = await runCommand('setup --skipPreparse --config=test/tmp/designex_hooks.config.json --dir=test/tmp/designex_hooks')
    expect(stdout).to.not.contain("Designex template \"shadcn/tokens-studio/multi\"")
    expect(stdout).to.contain("Designex template \"shadcn/tokens-studio/single\"")

  });

  it('config file overides cli flags', async () => {

    const { stdout } = await runCommand('setup --config=test/tmp/designex_hooks.config.json --template=shadcn/tokens-studio/single --dir=test/tmp/designex_hooks')
    expect(stdout).to.contain("Designex template \"shadcn/tokens-studio/multi\"")
    expect(stdout).to.not.contain("Designex template \"shadcn/tokens-studio/single\"")

  });
});
