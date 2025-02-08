import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {

  try {
    await fs.rm(path.resolve('test/tmp/designex_tailwind_v3_build'), { recursive: true });
  } catch { }
});


describe('Tailwind Template Build', () => {

  it('Build tailwind/v3/tokens-studio/single', async () => {
    await runCommand('setup --dir=test/tmp/designex_tailwind_v3_build --template=tailwind/v3/tokens-studio/single')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_tailwind_v3_build')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')


    expect(stdout).to.contain('$metadata.json')
    expect(stdout).to.contain('$themes.json')
    expect(stdout).to.contain('tailwind.json')
    expect(stdout).to.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('colors.js')
    expect(stdout).to.contain('blur.js')
    expect(stdout).to.contain('letterSpacing.js')
    expect(stdout).to.contain('spacing.js')
    expect(stdout).to.contain('borderRadius.js')
    expect(stdout).to.contain('fontFamily.js')
    expect(stdout).to.contain('screens.js')
    expect(stdout).to.contain('backgroundSize.js')
    expect(stdout).to.contain('backgroundPosition.js')
    expect(stdout).to.contain('animation.js')
    expect(stdout).to.contain('fontWeight.js')
    expect(stdout).to.contain('lineHeight.js')
    expect(stdout).to.contain('boxShadow.js')


    expect(stdout).to.contain('tailwind/colors')
    expect(stdout).to.contain('tailwind/blur')

    expect(stdout).to.contain('tailwind/letterSpacing')
    expect(stdout).to.contain('tailwind/spacing')
    expect(stdout).to.contain('tailwind/borderRadius')
    expect(stdout).to.contain('tailwind/fontFamily')
    expect(stdout).to.contain('tailwind/screens')
    expect(stdout).to.contain('tailwind/backgroundSize')
    expect(stdout).to.contain('tailwind/backgroundPosition')
    expect(stdout).to.contain('tailwind/animation')
    expect(stdout).to.contain('tailwind/fontWeight')
    expect(stdout).to.contain('tailwind/lineHeight')
    expect(stdout).to.contain('tailwind/fontWeight')
    expect(stdout).to.contain('tailwind/boxShadow')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })


  it('Build tailwind/v3/tokens-studio/multi', async () => {
    await runCommand('setup --dir=test/tmp/designex_tailwind_v3_build --template=tailwind/v3/tokens-studio/multi')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_tailwind_v3_build')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')


    expect(stdout).to.not.contain('$metadata.json')
    expect(stdout).to.not.contain('$themes.json')
    expect(stdout).to.not.contain('tailwind.json')
    expect(stdout).to.not.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('colors.js')
    expect(stdout).to.contain('blur.js')
    expect(stdout).to.contain('letterSpacing.js')
    expect(stdout).to.contain('spacing.js')
    expect(stdout).to.contain('borderRadius.js')
    expect(stdout).to.contain('fontFamily.js')
    expect(stdout).to.contain('screens.js')
    expect(stdout).to.contain('backgroundSize.js')
    expect(stdout).to.contain('backgroundPosition.js')
    expect(stdout).to.contain('animation.js')
    expect(stdout).to.contain('fontWeight.js')
    expect(stdout).to.contain('lineHeight.js')
    expect(stdout).to.contain('boxShadow.js')


    expect(stdout).to.contain('tailwind/colors')
    expect(stdout).to.contain('tailwind/blur')

    expect(stdout).to.contain('tailwind/letterSpacing')
    expect(stdout).to.contain('tailwind/spacing')
    expect(stdout).to.contain('tailwind/borderRadius')
    expect(stdout).to.contain('tailwind/fontFamily')
    expect(stdout).to.contain('tailwind/screens')
    expect(stdout).to.contain('tailwind/backgroundSize')
    expect(stdout).to.contain('tailwind/backgroundPosition')
    expect(stdout).to.contain('tailwind/animation')
    expect(stdout).to.contain('tailwind/fontWeight')
    expect(stdout).to.contain('tailwind/lineHeight')
    expect(stdout).to.contain('tailwind/fontWeight')
    expect(stdout).to.contain('tailwind/boxShadow')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })


})
