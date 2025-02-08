import { register as registerTokenStudio } from '@tokens-studio/sd-transforms';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer'
import StyleDictionary from 'style-dictionary';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.resolve(__dirname)

const types = [
  'colors', 'blur',
  'letterSpacing', 'spacing', 'borderRadius', 'borderWidth',
  'fontFamily', 'screens', 'backgroundSize', 'backgroundPosition',
  'animation', 'fontWeight', 'fontSize', 'lineHeight', 'fontFamily',
  'boxShadow'
];
const sets = JSON.parse(fs.readFileSync(path.resolve(base, 'tokens/$metadata.json'), 'utf-8')).tokenSetOrder;

registerTokenStudio(StyleDictionary, {
  excludeParentKeys: false,
  platform: "css",
  'ts/color/modifiers': {
    format: 'hsl',
  }
});

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: 'name/kebab-custom',
  transform: function (token, config) {
    const segments = token.path.map(part =>
      part
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase()
    );
    const transformedName = segments.join('-');
    return config.prefix ? `${config.prefix}--${transformedName}` : transformedName;
  }
});


const SD = new StyleDictionary({
  source: [`${base}/tokens/tailwind/*.json`],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/kebab-custom',
        'fontFamily/css',
        'size/rem',
        'shadow/css/shorthand',
        'cubicBezier/css',
        'ts/descriptionToComment', 'ts/resolveMath', 'ts/size/px', 'ts/opacity', 'ts/size/lineheight', 'ts/typography/fontWeight', 'ts/color/modifiers', 'ts/size/css/letterspacing', 'ts/shadow/innerShadow'
      ],
      buildPath: `${base}/build/css/`,
      files: [
        {
          destination: `tailwind.css`,
          format: 'css/variables',
          options: {
            selector: `@theme`,
          },
        },
      ],
    },
  },
  log: { verbosity: 'verbose' },
});

await SD.buildPlatform('css')
  .then(() => {
    console.log('✅ Build completed successfully');
  })
  .catch((error) => {
    console.error('❌ Build failed:', error);
  });
