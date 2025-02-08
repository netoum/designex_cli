import { expandTypesMap, register as registerTokenStudio } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { transformTokens } from './transform.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

await transformTokens();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.resolve(__dirname)
const sets = JSON.parse(fs.readFileSync(path.resolve(base, 'tokens/multi/$metadata.json'), 'utf-8')).tokenSetOrder;
registerTokenStudio(StyleDictionary, {
  excludeParentKeys: false,
  platform: "css",
  'ts/color/modifiers': {
    format: 'hex',
  }
});

const allPromises = [
  sets
    .map((set) => {
      const CSS = new StyleDictionary({
        preprocessors: ['tokens-studio'],
        source: [`${base}/tokens/multi/${set}.json`]
      })

      CSS.platforms['css'] = {
        transformGroup: 'tokens-studio',
        transforms: ['attribute/cti', 'name/kebab'],
        expand: {
          typesMap: expandTypesMap,
        },
        buildPath: `${base}/build/`,
        files: [
          {
            destination: `${set}.css`,
            format: 'css/variables'
          },
        ],
      };
      CSS['log'] = { verbosity: 'verbose' }
      return CSS.buildPlatform('css');
    })
];

Promise.all(allPromises)
  .then(() => console.log('✅ Build completed successfully'))
  .catch(error => console.error('❌ Build failed:', error));
