designex
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/designex.svg)](https://npmjs.org/package/designex)
[![Downloads/week](https://img.shields.io/npm/dw/designex.svg)](https://npmjs.org/package/designex)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g designex
$ designex COMMAND
running command...
$ designex (--version)
designex/0.0.0 linux-x64 node-v20.18.0
$ designex --help [COMMAND]
USAGE
  $ designex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`designex build`](#designex-build)
* [`designex help [COMMAND]`](#designex-help-command)
* [`designex install`](#designex-install)

## `designex build`

describe the command here

```
USAGE
  $ designex build [--buildPath <value>] [--config <value>] [--inputFormat style-dictionary|tokens-studio]
    [--inputType single|multi] [--outputFormat tailwind|css] [--outputType merged|unmerged] [--prescriptName <value>]
    [--prescriptPath <value>] [--scriptName <value>] [--scriptPath <value>] [--template designex|corex|shadcn]
    [--tokensPath <value>] [--watch]

FLAGS
  --buildPath=<value>      [default: designex/build]
  --config=<value>         [default: designex.flags.json] config file to use
  --inputFormat=<option>   [default: style-dictionary]
                           <options: style-dictionary|tokens-studio>
  --inputType=<option>     [default: single]
                           <options: single|multi>
  --outputFormat=<option>  [default: tailwind]
                           <options: tailwind|css>
  --outputType=<option>    [default: unmerged]
                           <options: merged|unmerged>
  --prescriptName=<value>  [default: transform.js]
  --prescriptPath=<value>  [default: designex/scripts]
  --scriptName=<value>     [default: build.js]
  --scriptPath=<value>     [default: designex/scripts]
  --template=<option>      [default: designex] Tokens template to use
                           <options: designex|corex|shadcn>
  --tokensPath=<value>     [default: designex/tokens]
  --watch

DESCRIPTION
  describe the command here

EXAMPLES
  $ designex build
```

_See code: [src/commands/build.ts](https://github.com/netoum/designex_cli/blob/v0.0.0/src/commands/build.ts)_

## `designex help [COMMAND]`

Display help for designex.

```
USAGE
  $ designex help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for designex.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.16/src/commands/help.ts)_

## `designex install`

describe the command here

```
USAGE
  $ designex install [--buildPath <value>] [--config <value>] [--inputFormat style-dictionary|tokens-studio]
    [--inputType single|multi] [--outputFormat tailwind|css] [--outputType merged|unmerged] [--prescriptName <value>]
    [--prescriptPath <value>] [--scriptName <value>] [--scriptPath <value>] [--template designex|corex|shadcn]
    [--tokensPath <value>]

FLAGS
  --buildPath=<value>      [default: designex/build]
  --config=<value>         [default: designex.flags.json] config file to use
  --inputFormat=<option>   [default: style-dictionary]
                           <options: style-dictionary|tokens-studio>
  --inputType=<option>     [default: single]
                           <options: single|multi>
  --outputFormat=<option>  [default: tailwind]
                           <options: tailwind|css>
  --outputType=<option>    [default: unmerged]
                           <options: merged|unmerged>
  --prescriptName=<value>  [default: transform.js]
  --prescriptPath=<value>  [default: designex/scripts]
  --scriptName=<value>     [default: build.js]
  --scriptPath=<value>     [default: designex/scripts]
  --template=<option>      [default: designex] Tokens template to use
                           <options: designex|corex|shadcn>
  --tokensPath=<value>     [default: designex/tokens]

DESCRIPTION
  describe the command here

EXAMPLES
   install
```

_See code: [src/commands/install.ts](https://github.com/netoum/designex_cli/blob/v0.0.0/src/commands/install.ts)_
<!-- commandsstop -->
