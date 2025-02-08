import { runCommand } from '@oclif/test'
import { expect } from 'chai'

describe('default build', () => {
  it('default flags', async () => {
    const { stdout } = await runCommand('build --dir=test/fixtures/designex_build_default')
    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('test')
    expect(stdout).to.contain('fixtures')
    expect(stdout).to.contain('designex_build_default')
    expect(stdout).to.contain('build.mjs')
    expect(stdout).to.contain('$metadata.json')
    expect(stdout).to.contain('$themes.json')
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
  it('custom build filename flag', async () => {
    const { stdout } = await runCommand('build --dir=test/fixtures/designex_build_default --script=build_custom.mjs')
    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('test')
    expect(stdout).to.contain('fixtures')
    expect(stdout).to.contain('designex_build_default')
    expect(stdout).to.contain('build_custom.mjs')
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

  it('custom build filename flag not found', async () => {
    const { stdout } = await runCommand('build --dir=test/fixtures/designex_build_default --script=build_not_exist.mjs')
    expect(stdout).to.not.contain('Executing script at:')
    expect(stdout).to.not.contain('build_custom.mjs')
    expect(stdout).to.not.contain('build.mjs')
  })

  it('custom build filename from config', async () => {
    const { stdout } = await runCommand('build --dir=test/fixtures/designex_build_default --config=test/fixtures/designex_build_custom.config.json')
    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('test')
    expect(stdout).to.contain('fixtures')
    expect(stdout).to.contain('designex_build_default')
    expect(stdout).to.contain('build_custom.mjs')
    expect(stdout).to.not.contain('build.mjs')
  })
})
