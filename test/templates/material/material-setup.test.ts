import { runCommand } from '@oclif/test'
import { expect } from 'chai'
import fs from 'node:fs/promises';
import path from 'node:path';
after(async () => {
  try {
    await fs.rm(path.resolve('test/tmp/designex_material_setup'), { recursive: true });
  } catch { }
});
describe('material Template Setup', () => {
  it('material/tokens-studio/single', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_material_setup --template=material/tokens-studio/single ')
    expect(stdout).to.contain('Designex template "material/tokens-studio/single"')
    expect(stdout).to.contain('designex_material_setup')
    expect(stdout).to.contain('✅ tokens.json copied to:')
    expect(stdout).to.contain('tokens.json')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')
    expect(stdout).to.contain('✅ transform.mjs copied to:')
    expect(stdout).to.contain('transform.mjs')
  })
  it('material/tokens-studio/multi', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_material_setup --template=material/tokens-studio/multi ')
    expect(stdout).to.contain('Designex template "material/tokens-studio/multi"')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')
    expect(stdout).to.contain('✅ $metadata.json copied to:')
    expect(stdout).to.contain('$metadata.json')
    expect(stdout).to.contain('✅ $themes.json copied to:')
    expect(stdout).to.contain('$themes.json')
    expect(stdout).to.contain('✅ Blue DT.json copied to:')
    expect(stdout).to.contain('Blue DT.json')
    expect(stdout).to.contain('✅ Blue LT.json copied to:')
    expect(stdout).to.contain('Blue LT.json')
    expect(stdout).to.not.contain('Designex template "material/tokens-studio/single"')
    expect(stdout).to.not.contain('tokens.json')
    expect(stdout).to.not.contain('transform.mjs')
  })
  it('material/style-dictionary', async () => {
    const { stdout } = await runCommand('setup --dir=test/tmp/designex_material_setup --template=material/style-dictionary ')
    expect(stdout).to.contain('Designex template "material/style-dictionary"')
    expect(stdout).to.contain('✅ build.mjs copied to:')
    expect(stdout).to.contain('build.mjs')
    expect(stdout).to.contain('✅ Blue DT.json copied to:')
    expect(stdout).to.contain('Blue DT.json')
    expect(stdout).to.contain('✅ Blue LT.json copied to:')
    expect(stdout).to.contain('Blue LT.json')
    expect(stdout).to.not.contain('Designex template "material/tokens-studio/single"')
    expect(stdout).to.not.contain('tokens.json')
    expect(stdout).to.not.contain('transform.mjs')
    expect(stdout).to.not.contain('✅ $metadata.json copied to:')
    expect(stdout).to.not.contain('$metadata.json')
    expect(stdout).to.not.contain('✅ $themes.json copied to:')
    expect(stdout).to.not.contain('$themes.json')
  })
})
