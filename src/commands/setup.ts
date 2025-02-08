import { Command, Flags } from '@oclif/core';
import path from 'node:path';

import { copyFolder } from '../utils/copy-folder.js';

export default class Setup extends Command {

  static override description = 'Setup your design tokens from a selection of Designex templates. It will create the tokens and scripts files needed to build the design tokens.';

  static override examples = [
    '<%= flags.bin %> <%= command.id %>',
  ];

  static override flags = {
    clean: Flags.boolean({ allowNo: true, default: false, description: ' By default, it will delete previous tokens and scripts at the selected target location. Select --no-clean to keep your previous files' }),
    config: Flags.string({ default: 'designex.config.json', description: 'Path of the configuration file to use for setup. If you modify the setup section of the configuration file, you must run again designex setup to setup the new template ' ,}),
    dir: Flags.directory({ default: '', description: 'Path of the directory to copy the template to.' }),
    skipPreparse: Flags.boolean({ hidden: false }),
    template: Flags.string({
      default: 'shadcn/tokens-studio/single',
      description: 'Tokens and script template to use for setup',
      options: [
      'shadcn/tokens-studio/single', 'shadcn/tokens-studio/multi', 'shadcn/style-dictionary', 
      'tailwind/v4/style-dictionary', 'tailwind/v4/tokens-studio/single', 'tailwind/v4/tokens-studio/multi',
      'tailwind/v3/tokens-studio/single', 'tailwind/v3/tokens-studio/multi',
      'mozilla/tokens-studio/single', 'mozilla/tokens-studio/multi',
      'material/tokens-studio/single', 'material/tokens-studio/multi', 'material/style-dictionary'
    ]
    }),
  };

  public async run(): Promise<void> {

    const { flags } = await this.parse(Setup);
    this.log(`Designex template "${flags.template}"`)

    copyFolder(flags, path.resolve(flags.dir));
  }
}