import StyleDictionary from 'style-dictionary';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.resolve(__dirname)
const sets = [
  "material-theme",
  "M3/Light",
  "M3/Light High Contrast",
  "M3/Light Medium Contrast",
  "M3/Dark",
  "M3/Dark High Contrast",
  "M3/Dark Medium Contrast",
  "M3/Monochrome LT",
  "M3/Monochrome DT",
  "M3/Pink LT",
  "M3/Pink DT",
  "M3/Rose LT",
  "M3/Rose DT",
  "M3/Red LT",
  "M3/Red DT",
  "M3/Orange LT",
  "M3/Orange DT",
  "M3/Yellow LT",
  "M3/Yellow DT",
  "M3/Chartreuse LT",
  "M3/Chartreuse DT",
  "M3/Green LT",
  "M3/Green DT",
  "M3/Teal LT",
  "M3/Teal DT",
  "M3/Cyan LT",
  "M3/Cyan DT",
  "M3/Blue LT",
  "M3/Blue DT",
  "M3/Indigo LT",
  "M3/Indigo DT",
  "M3/Purple LT",
  "M3/Purple DT",
  "Typeface/Baseline",
  "Typeface/Wireframe",
  "Shape/Baseline"
]

const allPromises = [
  sets
    .map((set) => {
      const CSS = new StyleDictionary({
        source: [`${base}/tokens/${set}.json`]
      })

      CSS.platforms['css'] = {
        transforms: ['attribute/cti', 'name/kebab'],
        buildPath: `${base}/build/`,
        files: [
          {
            destination: `${set}.css`,
            format: 'css/variables'
          },
        ],
      };
      CSS['log'] = { verbosity: 'default' }
      return CSS.buildPlatform('css');
    })
];

Promise.all(allPromises)
  .then(() => console.log('✅ Build completed successfully'))
  .catch(error => console.error('❌ Build failed:', error));
