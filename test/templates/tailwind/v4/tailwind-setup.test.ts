import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {
  try {
    await fs.rm(path.resolve('test/tmp/designex_tailwind_v4_setup'), { recursive: true });
  } catch { }
});


describe('tailwind Template Setup', () => {
  it('tailwind/v4/style-dictionary', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_tailwind_v4_setup --template=tailwind/v4/style-dictionary')
    expect(stdout).to.contain('Designex template "tailwind/v4/style-dictionary"')
    expect(stdout).to.contain('designex_tailwind_v4_setup')

    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ color.json copied to:')
    expect(stdout).to.contain('color.json')

    expect(stdout).to.contain('✅ effect.json copied to:')
    expect(stdout).to.contain('effect.json')

    expect(stdout).to.contain('✅ font.json copied to:')
    expect(stdout).to.contain('font.json')

    expect(stdout).to.contain('✅ size.json copied to:')
    expect(stdout).to.contain('size.json')

    expect(stdout).to.contain('✅ text.json copied to:')
    expect(stdout).to.contain('text.json')

    expect(stdout).to.not.contain('✅ transform.mjs copied to:')
    expect(stdout).to.not.contain('transform.mjs')

  })

  it('tailwind/v4/tokens-studio/single', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_tailwind_v4_setup --template=tailwind/v4/tokens-studio/single')
    expect(stdout).to.contain('Designex template "tailwind/v4/tokens-studio/single"')

    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ tokens.json copied to:')
    expect(stdout).to.contain('tokens.json')

    expect(stdout).to.contain('✅ transform.mjs copied to:')
    expect(stdout).to.contain('transform.mjs')

  })

  it('tailwind/v4/tokens-studio/multi', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_tailwind_v4_setup --template=tailwind/v4/tokens-studio/multi')
    expect(stdout).to.contain('Designex template "tailwind/v4/tokens-studio/multi"')

    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ color.json copied to:')
    expect(stdout).to.contain('color.json')

    expect(stdout).to.contain('✅ effect.json copied to:')
    expect(stdout).to.contain('effect.json')

    expect(stdout).to.contain('✅ font.json copied to:')
    expect(stdout).to.contain('font.json')

    expect(stdout).to.contain('✅ size.json copied to:')
    expect(stdout).to.contain('size.json')

    expect(stdout).to.contain('✅ text.json copied to:')
    expect(stdout).to.contain('text.json')

    expect(stdout).to.not.contain('✅ transform.mjs copied to:')
    expect(stdout).to.not.contain('transform.mjs')

  })
})
