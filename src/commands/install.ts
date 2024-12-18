import { Command, Flags } from '@oclif/core';

import { copyPrescript, copyScript, copyTokens } from '../utils/copy-template.js';

export default class Install extends Command {

  static override description = 'describe the command here';

  static override examples = [
    '<%= flags.bin %> <%= command.id %>',
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
      default: 'transform.mjs',
    }),
    prescriptPath: Flags.directory({
      default: 'designex/scripts',
    }),
    scriptName: Flags.file({
      default: 'build.mjs',
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
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Install);

    
    this.log(`Configuration: ${JSON.stringify(flags, null, 2)}`);

    const tokenFiles = copyTokens(flags);
    for (const file of tokenFiles) this.log(`✔︎ ${file}`);

    const scriptFiles = copyScript(flags);
    for (const file of scriptFiles) this.log(`✔︎ ${file}`);

    if (flags.inputType === 'single') {
      const prescriptFiles = copyPrescript(flags);
      for (const file of prescriptFiles) this.log(`✔︎ ${file}`);
    }
  }
}