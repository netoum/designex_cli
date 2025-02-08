import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {
  try {
    await fs.rm(path.resolve('test/tmp/designex_shadcn_setup'), { recursive: true });
  } catch { }
});


describe('Shadcn Template Setup', () => {
  it('shadcn/tokens-studio/single', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_shadcn_setup --template=shadcn/tokens-studio/single ')
    expect(stdout).to.contain('Designex template "shadcn/tokens-studio/single"')
    expect(stdout).to.contain('designex_shadcn_setup')

    expect(stdout).to.contain('✅ tokens.json copied to:')
    expect(stdout).to.contain('tokens.json')

    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ transform.mjs copied to:')
    expect(stdout).to.contain('transform.mjs')

  })

  it('shadcn/tokens-studio/multi', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_shadcn_setup --template=shadcn/tokens-studio/multi ')
    expect(stdout).to.contain('Designex template "shadcn/tokens-studio/multi"')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')
    expect(stdout).to.contain('✅ $metadata.json copied to:')
    expect(stdout).to.contain('$metadata.json')


    expect(stdout).to.contain('✅ $themes.json copied to:')
    expect(stdout).to.contain('$themes.json')

    expect(stdout).to.contain('✅ dark.json copied to:')
    expect(stdout).to.contain('dark.json')

    expect(stdout).to.contain('✅ shadcn.json copied to:')
    expect(stdout).to.contain('shadcn.json')

    expect(stdout).to.not.contain('Designex template "shadcn/tokens-studio/single"')
    expect(stdout).to.not.contain('✅ tokens.json copied to:')
    expect(stdout).to.not.contain('transform.mjs')
 
  })

  it('shadcn/style-dictionary', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_shadcn_setup --template=shadcn/style-dictionary ')
    expect(stdout).to.contain('Designex template "shadcn/style-dictionary"')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ dark.json copied to:')
    expect(stdout).to.contain('dark.json')

    expect(stdout).to.contain('✅ shadcn.json copied to:')
    expect(stdout).to.contain('shadcn.json')

    expect(stdout).to.not.contain('$themes.json')

    expect(stdout).to.not.contain('$metadata.json')

    expect(stdout).to.not.contain('Designex template "shadcn/tokens-studio/single"')
    expect(stdout).to.not.contain('Designex template "shadcn/tokens-studio/multi"')

  })

})
