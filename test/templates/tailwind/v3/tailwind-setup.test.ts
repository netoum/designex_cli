import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {
  try {
    await fs.rm(path.resolve('test/tmp/designex_tailwind_v3_setup'), { recursive: true });
  } catch { }
});


describe('tailwind Template Setup', () => {
  it('tailwind/v3/tokens-studio/single', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_tailwind_v3_setup --template=tailwind/v3/tokens-studio/single')
    expect(stdout).to.contain('Designex template "tailwind/v3/tokens-studio/single"')

    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ tokens.json copied to:')
    expect(stdout).to.contain('tokens.json')

    expect(stdout).to.contain('✅ transform.mjs copied to:')
    expect(stdout).to.contain('transform.mjs')

    expect(stdout).to.not.contain('✅ $metadata.json copied to:')
    expect(stdout).to.not.contain('$metadata.json')

    expect(stdout).to.not.contain('✅ $themes.json copied to:')
    expect(stdout).to.not.contain('$themes.json')

  })

  it('tailwind/v3/tokens-studio/multi', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_tailwind_v3_setup --template=tailwind/v3/tokens-studio/multi')
    expect(stdout).to.contain('Designex template "tailwind/v3/tokens-studio/multi"')

    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ $metadata.json copied to:')
    expect(stdout).to.contain('$metadata.json')

    expect(stdout).to.contain('✅ $themes.json copied to:')
    expect(stdout).to.contain('$themes.json')

    expect(stdout).to.contain('✅ tailwind.json copied to:')
    expect(stdout).to.contain('tailwind.json')

    expect(stdout).to.not.contain('✅ transform.mjs copied to:')
    expect(stdout).to.not.contain('transform.mjs')

  })
})
