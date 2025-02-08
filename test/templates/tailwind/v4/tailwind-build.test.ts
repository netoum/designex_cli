import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {

  try {
    await fs.rm(path.resolve('test/tmp/designex_tailwind_v4_build'), { recursive: true });
  } catch { }
});


describe('Tailwind Template Build', () => {
  it('Build tailwind/v4/style-dictionary', async () => {
    await runCommand('setup --dir=test/tmp/designex_tailwind_v4_build --template=tailwind/v4/style-dictionary')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_tailwind_v4_build')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('designex_tailwind_v4_build')

    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('css')
    expect(stdout).to.contain('tailwind.css')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })

  it('Build tailwind/v4/tokens-studio/single', async () => {
    await runCommand('setup --dir=test/tmp/designex_tailwind_v4_build --template=tailwind/v4/tokens-studio/single')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_tailwind_v4_build')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('$metadata.json')
    expect(stdout).to.contain('$themes.json')
    expect(stdout).to.contain('color.json')
    expect(stdout).to.contain('effect.json')
    expect(stdout).to.contain('font.json')
    expect(stdout).to.contain('size.json')
    expect(stdout).to.contain('text.json')

    expect(stdout).to.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('css')
    expect(stdout).to.contain('tailwind.css')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })


  it('Build tailwind/v4/tokens-studio/multi', async () => {
    await runCommand('setup --dir=test/tmp/designex_tailwind_v4_build --template=tailwind/v4/tokens-studio/multi')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_tailwind_v4_build')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.not.contain('$metadata.json')
    expect(stdout).to.not.contain('$themes.json')
    expect(stdout).to.not.contain('color.json')
    expect(stdout).to.not.contain('effect.json')
    expect(stdout).to.not.contain('font.json')
    expect(stdout).to.not.contain('size.json')
    expect(stdout).to.not.contain('text.json')

    expect(stdout).to.not.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('css')
    expect(stdout).to.contain('tailwind.css')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })


})
