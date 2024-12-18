import { Command, Flags } from '@oclif/core';
import { watch } from 'chokidar';

import { runScript } from '../utils/run-script.js';

export default class Build extends Command {

  static override description = 'describe the command here';

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ];

  static override flags = {
    buildPath: Flags.directory({
      default: 'designex/build',
    }),
    config: Flags.string({ default: 'designex.flags.json', description: 'config file to use' }),
    inputFormat: Flags.string({
      default: 'style-dictionary',
      multiple: false,
      options: ['style-dictionary', 'tokens-studio'],
    }),
    inputType: Flags.string({
      default: 'single',
      multiple: false,
      options: ['single', 'multi'],
    }),
    outputFormat: Flags.string({
      default: 'tailwind',
      multiple: false,
      options: ['tailwind', 'css'],
    }),
    outputType: Flags.string({
      default: 'unmerged',
      multiple: false,
      options: ['merged', 'unmerged'],
    }),
    prescriptName: Flags.file({
      default: 'transform.js',
    }),
    prescriptPath: Flags.directory({
      default: 'designex/scripts',
    }),
    scriptName: Flags.file({
      default: 'build.js',
    }),
    scriptPath: Flags.directory({
      default: 'designex/scripts',
    }),
    skipPreparse: Flags.boolean({
      hidden: true,
    }),
    template: Flags.string({ default: 'designex', description: 'Tokens template to use', options: ['designex', 'corex', 'shadcn'] }),
    tokensPath: Flags.directory({
      default: 'designex/tokens',
    }),
    watch: Flags.boolean({
      default: false,
    }),
  };

  static strict = false

  public async run(): Promise<void> {
    const { flags } = await this.parse(Build);

    if (flags.watch) {
      const ignoredPatterns = flags.inputType === 'single' ? [`${flags.tokensPath}/multi`] : [];

      const watcher = watch(flags.tokensPath, {
        ignoreInitial: true,
        ignored: ignoredPatterns,
        persistent: true
      });

      watcher
        .on('change', async (filePath) => {
          this.log(`File changed: ${filePath}`);
          try {
            if (flags.inputType === 'single') {
              await runScript(this, flags.prescriptPath, flags.prescriptName);
            }

            await runScript(this, flags.scriptPath, flags.scriptName);
          } catch {
            this.error(`Build failed`);
          }

        })
        .on('error', (error : any) => {
          this.error(`Watcher error: ${error.message}`);
        });

        this.log(`Watching for changes in ${flags.tokensPath}...`);

      process.on('SIGINT', () => {
        this.log('Stopping watch mode...');
        watcher.close();
      });

    } else {
      try {
        if (flags.inputType === 'single') {
          await runScript(this, flags.prescriptPath, flags.prescriptName);
        }

        await runScript(this, flags.scriptPath, flags.scriptName);
      } catch {
        this.error(`Build failed`);
      }
    }
  }
}
