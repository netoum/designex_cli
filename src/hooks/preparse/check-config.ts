// import { Hook } from '@oclif/core';
import type { Hook } from '@oclif/core';

import { promises as fs } from 'node:fs';
import * as path from 'node:path';

const hook: Hook<'preparse'> = async function ({ argv }) {
  const skipPreparseFlag = argv.includes('--skipPreparse');
  if (skipPreparseFlag) {
    return argv;
  }

  let configFileName = 'designex.config.json';
  const configFlagIndex = argv.findIndex(arg => arg.startsWith('--config='));

  if (configFlagIndex > -1) {
    configFileName = argv[configFlagIndex].split('=')[1];
  }

  const configPath = path.join(process.cwd(), configFileName);

  try {
    const userConfigContent = await fs.readFile(configPath, 'utf8');
    const userConfig = JSON.parse(userConfigContent);

    for (const [key, value] of Object.entries(userConfig)) {
      const flag = `--${key}=${value}`;
      if (!argv.includes(flag)) {
        argv.push(flag);
      }
    }

    argv.push('--skipPreparse');
    return argv;
  }
  catch {
  }

  return argv;
};

export default hook;
