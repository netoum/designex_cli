import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';
after(async () => {
  try {
    await fs.rm(path.resolve('test/tmp/designex_setup'), { recursive: true });
    await fs.rm(path.resolve('test/tmp/designex_setup_custom'), { recursive: true });
    await fs.rm(path.resolve('test/tmp/designex_setup_config'), { recursive: true });
  } catch { }
});
describe('default setup', () => {
  it('custom dir flag', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_setup')
    expect(stdout).to.contain('Designex template "shadcn/tokens-studio/single"')
    expect(stdout).to.contain('✅ tokens.json copied to:')
    expect(stdout).to.contain('designex_setup')
    expect(stdout).to.contain('tokens.json')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')
    expect(stdout).to.contain('✅ transform.mjs copied to:')
    expect(stdout).to.contain('transform.mjs')
  })
  it('custom template flag', async () => {
    const { stdout } = await runCommand('setup --template=shadcn/tokens-studio/multi --dir=test/tmp/designex_setup_custom')
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
    expect(stdout).to.not.contain('tokens.json')
    expect(stdout).to.not.contain('transform.mjs')
  })
  it('custom config file', async () => {
    const { stdout } = await runCommand('setup --config=test/fixtures/designex_setup_config.config.json --dir=test/tmp/designex_setup_config')
    expect(stdout).to.contain('Designex template "shadcn/tokens-studio/multi"')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('designex_setup_config')
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
    expect(stdout).to.not.contain('tokens.json')
    expect(stdout).to.not.contain('transform.mjs')
  })
})
