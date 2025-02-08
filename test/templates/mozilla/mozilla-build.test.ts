import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';

after(async () => {

  try {
    await fs.rm(path.resolve('test/tmp/designex_mozilla_build'), { recursive: true });
  } catch { }
});


describe('mozilla Template Build', () => {
  it('Build mozilla/tokens-studio/single', async () => {
    await runCommand('setup --dir=test/tmp/designex_mozilla_build --template=mozilla/tokens-studio/single')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_mozilla_build')

    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')
    expect(stdout).to.contain('designex_mozilla_build')

    expect(stdout).to.contain('$metadata.json')
    expect(stdout).to.contain('$themes.json')
    expect(stdout).to.contain('global.json')
    expect(stdout).to.contain('semantic.json')
    expect(stdout).to.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('global.css')
    expect(stdout).to.contain('semantic.css')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })

  it('Build mozilla/tokens-studio/multi', async () => {
    await runCommand('setup --dir=test/tmp/designex_mozilla_build --template=mozilla/tokens-studio/multi')

    const { stdout } = await runCommand('build --dir=test/tmp/designex_mozilla_build')
    expect(stdout).to.contain('Executing script at:')
    expect(stdout).to.contain('build.mjs')

    expect(stdout).to.not.contain('global.json')
    expect(stdout).to.not.contain('semantic.json')
    expect(stdout).to.not.contain('✅ Tokens transformed successfully')

    expect(stdout).to.contain('global.css')
    expect(stdout).to.contain('semantic.css')

    expect(stdout).to.contain('✅ Script executed successfully.')
    expect(stdout).to.contain('✅ Build completed successfully')
  })


})
