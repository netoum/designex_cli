import type { Hook } from '@oclif/core';

import { promises as fs } from 'node:fs';
import * as path from 'node:path';

const hook: Hook<'preparse'> = async function ({ argv, options }) {
  const skipPreparseFlag = argv.includes('--skipPreparse');
  if (skipPreparseFlag) {
    return argv;
  }

  const { context } = options;

  if (!context || !context.id) {
    console.error(`Error: Context or context.id is undefined. argv: ${JSON.stringify(argv)}`);
    return argv;
  }

  const commandId = context.id;

  let configFileName = 'designex.config.json';
  const configFlagIndex = argv.findIndex(arg => arg.startsWith('--config='));

  if (configFlagIndex > -1) {
    configFileName = argv[configFlagIndex].split('=')[1];
  }

  const configPath = path.join(process.cwd(), configFileName);

  try {
    await fs.access(configPath);

    const userConfigContent = await fs.readFile(configPath, 'utf8');
    const userConfig = JSON.parse(userConfigContent);

    const commandConfig = userConfig[commandId];
    if (!commandConfig) {
      console.warn(`No configuration found for command ID: ${commandId}`);
      return argv;
    }

    for (const [key, value] of Object.entries(commandConfig)) {
      argv = argv.filter(arg =>
        !arg.startsWith(`--${key}`) &&
        !arg.startsWith(`--no-${key}`)
      );

      if (typeof value === 'boolean') {
        const flag = value ? `--${key}` : `--no-${key}`;
        argv.push(flag);
      } else {
        const flag = `--${key}=${value}`;
        argv.push(flag);
      }
    }

    argv.push('--skipPreparse');
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error(`Error processing config file at ${configPath}:`, error);
    }
  }

  return argv;
};

export default hook;
