import { Command, Flags } from '@oclif/core';
import { watch } from 'chokidar';
import path from 'node:path'

import { runScript } from '../utils/run-script.js';

export default class Build extends Command {

  static override description = 'Build and Watch your design tokens from the configured script into the configured build path. Depending on your scripts it is created the desired export format (js, css ...)';

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ];

  static override flags = {
    config: Flags.string({ default: 'designex.config.json', description: 'Path of the configuration file to use for build. If you modify the setup section of the configuration file, you must run again designex setup to setup the new template ' ,}),
    dir: Flags.directory({ default: '', description: 'Path of the directory to build the design tokens' }),
    script: Flags.file({
      default: 'build.mjs',
      description: 'Script file name to use to build the design tokens'
    }),
    skipPreparse: Flags.boolean({
      hidden: true,
    }),
    tokens: Flags.directory({
      default: 'tokens',
      description: 'Tokens directory path to use to build the design tokens'
    }),
    tokensMulti: Flags.string({
      default: 'tokens/multi',
      description: 'If using transform from single to multi files, select your generated files to be ignored suring watch process. By defaul on all templates it is set to `tokens/multi`',
      multiple: false
    }),
    watch: Flags.boolean({
      default: false,
      description: 'Watch changes on the tokens directory and build design tokens on changes'
    }),
  };

  static strict = false

  public async run(): Promise<void> {

    const { flags } = await this.parse(Build);

    if (flags.watch) {
      const ignoredPatterns = flags.tokensMulti?.length 
      ? [path.resolve(flags.dir, flags.tokensMulti)]
      : [`${path.resolve(flags.dir, flags.tokens, 'multi')}`];
      
      const watcher = watch(path.resolve(flags.dir, flags.tokens), {
        ignored: ignoredPatterns
      });

      watcher
        .on('change', async (filePath) => {
          this.log(`File changed: ${filePath}`);
          try {
            await runScript(this, path.join(flags.dir, flags.script));
          } catch {
            this.error(`Build failed`);
          }

        })
        .on('error', (error: unknown) => {
          if (error instanceof Error) {
            this.error(`Watcher error: ${error.message}`);
          } else {
            this.error(`Watcher error: ${String(error)}`);
          }
        });

      this.log(`Watching for changes in ${path.resolve(flags.dir, flags.tokens)}...`);

      process.on('SIGINT', () => {
        this.log('Stopping watch mode...');
        watcher.close();
      });

    } else {
      try {
        await runScript(this, path.resolve(flags.dir, flags.script));
      } catch {
        this.error(`Build failed`);
      }
    }
  }
}
