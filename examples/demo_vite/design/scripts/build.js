// import { register as registerTokenStudio } from 'designex/node_modules/@tokens-studio/sd-transforms/dist/register.js';
// import { makeSdTailwindConfig } from 'designex/node_modules/sd-tailwindcss-transformer/dist/index.js'
// import StyleDictionary from 'designex/node_modules/style-dictionary/lib/StyleDictionary.js';

import { register as registerTokenStudio } from '@tokens-studio/sd-transforms';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer'
import StyleDictionary from 'style-dictionary';
import fs from 'fs'

const types = ['colors', 'textColor', 'backgroundColor', 'spacing', 'width', 'borderRadius', 'borderWidth', 'boxShadow', 'spacing', 'screens'];
const sets = JSON.parse(fs.readFileSync('design/tokens/multi/$metadata.json', 'utf-8')).tokenSetOrder

registerTokenStudio(StyleDictionary, {
  excludeParentKeys: false,
  platform: "css",
  'ts/color/modifiers': {
    format: 'hex',
  }
});

await Promise.all(
  types.map((type) => {
    sets.map((set) => {

      // Tailwind Multi Files
      const Tailwind = new StyleDictionary(
        makeSdTailwindConfig({
          type,
          preprocessors: ['tokens-studio'],
          isVariables: false,
          source: ['design/tokens/multi/**/*.json'],
        })
      )
      Tailwind.platforms[`tailwind/${type}`] = {
        transformGroup: 'tokens-studio',
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: `design/build/${set}/`,
        files: [
          {
            destination: `${type}.js`,
            format: 'tailwindFormat',
            filter: async (token, options) => {
              return token.path[0] == type && token.filePath.endsWith(`${set}.json`);
            },
          }
        ]
      }
      Tailwind['log'] = {
        warnings: 'warn', // 'warn' | 'error' | 'disabled'
        verbosity: 'silent', // 'default' | 'silent' | 'verbose'
        errors: {
          brokenReferences: 'throw', // 'throw' | 'console'
        }
            }
      return Tailwind.buildAllPlatforms();
    })

    // Tailwind Merged
    const TailwindMerged = new StyleDictionary(
      makeSdTailwindConfig({
        type,
        preprocessors: ['tokens-studio'],
        isVariables: false,
        source: ['design/tokens/multi/**/*.json'],
      })
    )
    TailwindMerged.platforms[`tailwind/${type}`] = {
      transformGroup: 'tokens-studio',
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: `design/build/merged/`,
      files: [
        {
          destination: `${type}.js`,
          format: 'tailwindFormat',
          filter: async (token, options) => {
            return token.path[0] == type;
          },
        }
      ]
    }
    TailwindMerged['log'] = {
      warnings: 'warn', // 'warn' | 'error' | 'disabled'
      verbosity: 'silent', // 'default' | 'silent' | 'verbose'
      errors: {
        brokenReferences: 'throw', // 'throw' | 'console'
      }
    }
    
    return TailwindMerged.buildAllPlatforms()
  }),
);
