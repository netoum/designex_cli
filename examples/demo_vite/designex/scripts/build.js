import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer'
import StyleDictionary from 'style-dictionary';
import fs from 'node:fs';

const types = ['colors', 'textColor', 'backgroundColor', 'spacing', 'width', 'borderRadius', 'borderWidth', 'boxShadow', 'spacing', 'screens'];
const sets = JSON.parse(fs.readFileSync('designex/tokens/multi/$metadata.json', 'utf-8')).tokenSetOrder

await Promise.all(
  types.map((type) => {
    sets.map((set) => {

      const Tailwind = new StyleDictionary(
        makeSdTailwindConfig({
          type,
          isVariables: false,
          source: ['designex/tokens/multi/**/*.json'],
        })
      )
      Tailwind.platforms[`tailwind/${type}`] = {
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: `designex/build/${set}/`,
        files: [
          {
            destination: `${type}.js`,
            format: 'tailwindFormat',
            filter: async (token) => {
              return token.path[0] == type && token.filePath.endsWith(`${set}.json`);
            },
          }
        ]
      }
      Tailwind['log'] = {
        warnings: 'warn',
        verbosity: 'default',
        errors: {
          brokenReferences: 'throw'
        }
            }
      return Tailwind.buildAllPlatforms();
    })
  }),
);
