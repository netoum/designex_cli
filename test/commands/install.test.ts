import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('install', () => {
  it('runs install cmd', async () => {
    const {stdout} = await runCommand('install')
    expect(stdout).to.contain('Configuration:')
  })

  it('runs install --config example.config.json', async () => {
    const {stdout} = await runCommand('install --config example.config.json')
    expect(stdout).to.contain('config": "example.config.json"')
  })
})
