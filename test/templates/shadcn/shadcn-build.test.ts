import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {

  try {
    await fs.rm(path.resolve('test/tmp/designex_shadcn_build'), { recursive: true });
    await fs.rm(path.resolve('test/tmp/designex_shadcn_build_multi'), { recursive: true });
  } catch { }
});


describe('Shadcn Template Build', () => {
  it('Build shadcn/tokens-studio/single', async () => {
    await runCommand('setup --dir=test/tmp/designex_shadcn_build --template=shadcn/tokens-studio/single')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_shadcn_build')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('designex_shadcn_build')

    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('$metadata.json')
    expect(stdout).to.contain('$themes.json')
    expect(stdout).to.contain('shadcn.json')
    expect(stdout).to.contain('mode')
    expect(stdout).to.contain('dark.json')
    expect(stdout).to.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('tailwind/colors')
    expect(stdout).to.contain('tailwind/borderRadius')
    expect(stdout).to.contain('tailwind/fontFamily')
    expect(stdout).to.contain('dark.css')
    expect(stdout).to.contain('shadcn.css')
    expect(stdout).to.contain('colors.js')
    expect(stdout).to.contain('borderRadius.js')
    expect(stdout).to.contain('fontFamily.js')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })

  it('Build shadcn/tokens-studio/multi', async () => {
    await runCommand('setup --dir=test/tmp/designex_shadcn_build_multi --template="shadcn/tokens-studio/multi"')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_shadcn_build_multi')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.not.contain('$metadata.json')
    expect(stdout).to.not.contain('$themes.json')
    expect(stdout).to.not.contain('shadcn.json')
    expect(stdout).to.not.contain('mode/dark.json')
    expect(stdout).to.not.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('tailwind/colors')
    expect(stdout).to.contain('tailwind/borderRadius')
    expect(stdout).to.contain('tailwind/fontFamily')
    expect(stdout).to.contain('dark.css')
    expect(stdout).to.contain('shadcn.css')
    expect(stdout).to.contain('colors.js')
    expect(stdout).to.contain('borderRadius.js')
    expect(stdout).to.contain('fontFamily.js')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })

  it('Build shadcn/style-dictionary', async () => {
    await runCommand('setup --dir=test/tmp/designex_shadcn_build --template=shadcn/tokens-studio/multi')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_shadcn_build')
    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.not.contain('$metadata.json')
    expect(stdout).to.not.contain('$themes.json')
    expect(stdout).to.not.contain('shadcn.json')
    expect(stdout).to.not.contain('dark.json')
    expect(stdout).to.not.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('tailwind/colors')
    expect(stdout).to.contain('tailwind/borderRadius')
    expect(stdout).to.contain('tailwind/fontFamily')
    expect(stdout).to.contain('dark.css')
    expect(stdout).to.contain('shadcn.css')
    expect(stdout).to.contain('colors.js')
    expect(stdout).to.contain('borderRadius.js')
    expect(stdout).to.contain('fontFamily.js')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })
})
