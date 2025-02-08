import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {
  try {
    await fs.rm(path.resolve('test/tmp/designex_mozilla_setup'), { recursive: true });
  } catch { }
});


describe('Mozilla Template Setup', () => {
  it('mozilla/tokens-studio/single', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_mozilla_setup --template=mozilla/tokens-studio/single ')
    expect(stdout).to.contain('Designex template "mozilla/tokens-studio/single"')
    expect(stdout).to.contain('designex_mozilla_setup')

    expect(stdout).to.contain('✅ tokens.json copied to:')
    expect(stdout).to.contain('tokens.json')

    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ transform.mjs copied to:')
    expect(stdout).to.contain('transform.mjs')

  })

  it('mozilla/tokens-studio/multi', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_mozilla_setup --template=mozilla/tokens-studio/multi ')
    expect(stdout).to.contain('Designex template "mozilla/tokens-studio/multi"')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.contain('✅ $metadata.json copied to:')
    expect(stdout).to.contain('$metadata.json')

    expect(stdout).to.contain('✅ $themes.json copied to:')
    expect(stdout).to.contain('$themes.json')

    expect(stdout).to.contain('✅ global.json copied to:')
    expect(stdout).to.contain('global.json')

    expect(stdout).to.contain('✅ semantic.json copied to:')
    expect(stdout).to.contain('semantic.json')


    expect(stdout).to.not.contain('Designex template "mozilla/tokens-studio/single"')
    expect(stdout).to.not.contain('tokens.json')
    expect(stdout).to.not.contain('transform.mjs')

  })

})
