import StyleDictionary from 'style-dictionary';
import path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.resolve(__dirname);
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
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/kebab-custom',
        'fontFamily/css',
        'size/rem',
        'shadow/css/shorthand',
        'cubicBezier/css'
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
