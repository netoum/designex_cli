Designex
[![Version](https://img.shields.io/npm/v/designex.svg)](https://npmjs.com/package/@netoum/designex)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Downloads/week](https://img.shields.io/npm/dw/designex.svg)](https://npmjs.com/package/@netoum/designex)
=================

# Designex
Get easily started with design tokens using Designex CLI. Features a wide range of templates, pre-built configurations, and live reloading for seamless design system integration.

- 🚀 Quick Start - Run **Designex Setup** to setup ready-to-use token templates and get your project running in seconds.
- 🔨 Easy Build - Use **Designex Build** to convert your tokens into platform-ready formats.
- 👀 Live Updates - Use **Designex Build Watch** to see changes instantly while you work.

The Cli is build with [Oclif](https://oclif.io). A great and efficient Cli framework, check it out.  

Depending on the template selected it will use the following dependencies: 

- [Style Dictionary](https://styledictionary.com/) v.4.3.0
- [Tokens Studio](https://www.npmjs.com/package/@tokens-studio/sd-transforms) v.1.2.9
- [SD Tailwindcss Transformer](https://www.npmjs.com/package/sd-tailwindcss-transformer) v.2.0.0

You can choose any another version by adding the packages into your own package.json file under "dependencies". Some scripts from the templates may not work properly with some other versions

## Installation

```bash
npm install -D @netoum/designex

```

## Quick Start

```bash
npx designex setup --template=tailwind/v4/style-dictionary

npx designex build
```

<!-- toc -->
* [Designex](#designex)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -D @netoum/designex
$ npx designex COMMAND
running command...
$ npx designex --version
@netoum/designex/1.0.2 linux-x64 node-v22.9.0
$ npx designex --help [COMMAND]
USAGE
  $ designex COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`npx designex build`](#designex-build)
* [`npx designex help [COMMAND]`](#designex-help-command)
* [`npx designex setup`](#designex-setup)

## `designex build`

Build and Watch your design tokens from the configured script into the configured build path. Depending on your scripts it is created the desired export format (js, css ...)

```
USAGE
  $ npx designex build [--config <value>] [--dir <value>] [--script <value>] [--tokens <value>] [--tokensMulti
    <value>] [--watch]

FLAGS
  --config=<value>       [default: designex.config.json] Path of the configuration file to use for build. If you modify
                         the setup section of the configuration file, you must run again designex setup to setup the new
                         template
  --dir=<value>          Path of the directory to build the design tokens
  --script=<value>       [default: build.mjs] Script file name to use to build the design tokens
  --tokens=<value>       [default: tokens] Tokens directory path to use to build the design tokens
  --tokensMulti=<value>  [default: tokens/multi] If using transform from single to multi files, select your generated
                         files to be ignored suring watch process. By defaul on all templates it is set to
                         `tokens/multi`
  --watch                Watch changes on the tokens directory and build design tokens on changes

DESCRIPTION
  Build and Watch your design tokens from the configured script into the configured build path. Depending on your
  scripts it is created the desired export format (js, css ...)

EXAMPLES
  $ npx designex build
```

_See code: [src/commands/build.ts](https://github.com/netoum/designex_cli/blob/v1.0.2/src/commands/build.ts)_

## `designex help [COMMAND]`

Display help for designex.

```
USAGE
  $ npx designex help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for designex.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.20/src/commands/help.ts)_

## `designex setup`

Setup your design tokens from a selection of Designex templates. It will create the tokens and scripts files needed to build the design tokens.

```
USAGE
  $ npx designex setup [--clean] [--config <value>] [--dir <value>] [--skipPreparse] [--template
    shadcn/tokens-studio/single|shadcn/tokens-studio/multi|shadcn/style-dictionary|tailwind/v4/style-dictionary|tailwind
    /v4/tokens-studio/single|tailwind/v4/tokens-studio/multi|tailwind/v3/tokens-studio/single|tailwind/v3/tokens-studio/
    multi|mozilla/tokens-studio/single|mozilla/tokens-studio/multi|material/tokens-studio/single|material/tokens-studio/
    multi|material/style-dictionary]

FLAGS
  --[no-]clean
      By default, it will delete previous tokens and scripts at the selected target location. Select --no-clean to keep
      your previous files

  --config=<value>
      [default: designex.config.json] Path of the configuration file to use for setup. If you modify the setup section of
      the configuration file, you must run again designex setup to setup the new template

  --dir=<value>
      Path of the directory to copy the template to.

  --skipPreparse

  --template=<option>
      [default: shadcn/tokens-studio/single] Tokens and script template to use for setup
      <options: shadcn/tokens-studio/single|shadcn/tokens-studio/multi|shadcn/style-dictionary|tailwind/v4/style-dictionar
      y|tailwind/v4/tokens-studio/single|tailwind/v4/tokens-studio/multi|tailwind/v3/tokens-studio/single|tailwind/v3/toke
      ns-studio/multi|mozilla/tokens-studio/single|mozilla/tokens-studio/multi|material/tokens-studio/single|material/toke
      ns-studio/multi|material/style-dictionary>

DESCRIPTION
  Setup your design tokens from a selection of Designex templates. It will create the tokens and scripts files needed to
  build the design tokens.

EXAMPLES
   setup
```

_See code: [src/commands/setup.ts](https://github.com/netoum/designex_cli/blob/v1.0.2/src/commands/setup.ts)_
<!-- commandsstop -->



## Templates:
### Tailwind v4
 This templates follows the latest setup of [Tailwind v4] (https://tailwindcss.com).
 It will generate Tailwind v4 CSS files to import into your main css assets.

 You can choose from style dictionary or tokens studio format.
 If you are using the free version of Tokens Studio you must select single file.
 
- **tailwind/v4/tokens-studio/single**
- **tailwind/v4/tokens-studio/multi**
- **tailwind/v4/style-dictionary**

### Tailwind v3
 This templates follows the legacy setup of [Tailwind v3] (https://tailwindcss.com).
 It will generate Tailwind v3 JS files to import into your Tailwind Config file.
 You can choose from tokens studio single and multi format.
 If you are using the free version of Tokens Studio you must select single file.
 
- **tailwind/v3/tokens-studio/single**
- **tailwind/v3/tokens-studio/multi**

 ### Shadcn
 This templates follows the latest setup of [Shadcn] (https://ui.shadcn.com/docs).
 It will generate Tailwind v3 JS files to import into your Tailwind Config file.
 You must also add the generate CSS files for the default and dark mode.
 The colors are converted to hsl as advised by Shadcn
 You can choose from style dictionary or tokens studio format.
 If you are using the free version of Tokens Studio you must select single file.

- **shadcn/tokens-studio/single**
- **shadcn/tokens-studio/multi**
- **shadcn/style-dictionary**

``` js
// Tailwind Config
  theme: {
    extend: {
      textColor: require("./build/shadcn/textColor.js"),
      colors: require("./build/shadcn/colors.js"),
      backgroundColor: require("./build/shadcn/backgroundColor.js")
    }

```
##### Shadcn Css
// CSS Import

``` css

@import "../build/css/shadcn.css";
@import "../build/css/shadcn/modes/light.css";

 ```

### Material
 This templates is an export of the [Material 3 Design Kit](https://www.figma.com/community/file/1035203688168086460) Figma file and the [Material Theme Builder](https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder) Figma Plugin
 You can choose from style dictionary or tokens studio format.
 If you are using the free version of Tokens Studio you must select single file.
  
- **material/tokens-studio/single**
- **material/tokens-studio/multi**
- **material/style-dictionary**

### Mozilla
 This templates is an export of the legacy [Mozilla Design Tokens](https://github.com/MozillaFoundation/Design/blob/master/systems/tokens.json)
 You can choose from tokens studio single and multi format.
 If you are using the free version of Tokens Studio you must select single file.
  
- **mozilla/tokens-studio/single**
- **mozilla/tokens-studio/multi**
