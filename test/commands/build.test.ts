import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('build', () => {
  it('runs build cmd', async () => {
    const {stdout} = await runCommand('build')
    expect(stdout).to.not.contain('Build failed')
  })

})
