import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer'
import StyleDictionary from 'style-dictionary';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.resolve(__dirname)

const sets = ['shadcn']
const modes = ['dark']
const types = ['colors', 'borderRadius', 'fontFamily'];

const allPromises = [
  ...types.map((type) =>
    sets.map((set) => {
      const Tailwind = new StyleDictionary(
        makeSdTailwindConfig({
          type,
          isVariables: true,
          source: [`${base}/tokens/${set}.json`],
        })
      )
      Tailwind.platforms[`tailwind/${type}`] = {
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: `${base}/build/${set}/`,
        files: [
          {
            destination: `${type}.js`,
            format: 'tailwindFormat',
            options: {
              outputReferences: true,
            },
            filter: async (token) => {
              return token.path[0] == type && token.filePath.endsWith(`${set}.json`);
            }
          }
        ]
      }
      Tailwind['log'] = { verbosity: 'default' }
      return Tailwind.buildAllPlatforms();
    })
  ),

  ...sets.map((set) => {
    const CSS = new StyleDictionary(
      makeSdTailwindConfig({
        type: 'all',
        preprocessors: ['tokens-studio'],
        isVariables: true,
        source: [`${base}/tokens/${set}.json`],
      })
    )
    CSS.platforms['css'] = {
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: `${base}/build/css/`,
      files: [
        {
          destination: `${set}.css`,
          format: 'css/variables',
          options: {
            outputReferences: false,
          }
        },
      ],
    };
    CSS['log'] = { verbosity: 'default' }
    return CSS.buildPlatform('css');
  }),

  ...modes.map((mode) => {
    const CSSMode = new StyleDictionary(
      makeSdTailwindConfig({
        type: 'all',
        preprocessors: ['tokens-studio'],
        isVariables: true,
        source: [`${base}/tokens/mode/${mode}.json`],
      })
    )
    CSSMode.platforms['css'] = {
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: `${base}/build/css/mode/`,
      files: [
        {
          destination: `${mode}.css`,
          format: 'css/variables',
          options: {
            outputReferences: false,
            selector: `.${mode}`
          }
        },
      ],
    };
    CSSMode['log'] = { verbosity: 'default' }
    return CSSMode.buildPlatform('css');
  })
];

Promise.all(allPromises)
  .then(() => console.log('✅ Build completed successfully'))
  .catch(error => console.error('❌ Build failed:', error));
