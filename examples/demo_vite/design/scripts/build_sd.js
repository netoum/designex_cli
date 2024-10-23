// import { register as registerTokenStudio } from 'designex/node_modules/@tokens-studio/sd-transforms/dist/register.js';
// import { makeSdTailwindConfig } from 'designex/node_modules/sd-tailwindcss-transformer/dist/index.js'
// import StyleDictionary from 'designex/node_modules/style-dictionary/lib/StyleDictionary.js';

import { register as registerTokenStudio } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { getReferences, usesReferences } from 'style-dictionary/utils';
import {
  fileHeader,
  formattedVariables,
  getTypeScriptType,
  iconsWithPrefix,
  minifyDictionary,
  sortByReference,
  createPropertyFormatter,
  sortByName,
  setSwiftFileProperties,
  setComposeObjectProperties,
} from 'style-dictionary/utils';

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

// Helper function to convert tokens to a nested structure
function nestTokens(tokens) {
  const nestedTokens = {};

  tokens.forEach(token => {
    let current = nestedTokens;
    token.path.forEach((part, index) => {
      // If we're at the last part of the path, assign the value
      if (index === token.path.length - 1) {
        current[part] = usesReferences(token) ? token.original.value : token.value;
      } else {
        // Ensure each part of the path exists
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  });

  return nestedTokens;
}

// StyleDictionary.registerFormat({
//   name: 'jsonWithFormattedReferences',
//   format: function({ dictionary, options }) {
//     const formattedOutput = formattedVariables({
//       format: 'json',
//       dictionary,
//       outputReferences: true, // Keep references as they are
//       outputReferenceFallbacks: false,
//       formatting: { lineSeparator: '\n' },
//       usesDtcg: options.usesDtcg || false
//     });
    
//     // Convert the formatted output into JSON structure
//     return `{ "tokens": ${formattedOutput} }`;
//   }
// });

StyleDictionary.registerFormat({
  name: `jsonWithReferences`,
  format: function ({ dictionary, options }) {
//     const tokens = nestTokens(dictionary.allTokens);
//     return JSON.stringify(tokens, null, 2);
//   }
// });
    const { allTokens, tokens, unfilteredTokens } = dictionary;
    const { outputReferences, usesDtcg } = options;
  
        return JSON.stringify(minifyDictionary(dictionary.allTokens, usesDtcg), null, 2);

  }
});

    // const { allTokens, tokens, unfilteredTokens } = dictionary;
//     const { outputReferences, usesDtcg } = options;
//     const tokens = dictionary.allTokens.map(token => {
//       // Use reference function to check if token value is a reference
//       return {
//         ...token,
//         value: usesReferences(token) ? token.original.value : token.value
//       };
//     });
//     return JSON.stringify(minifyDictionary(tokens), null, 2);
//   }
// });
//     let sortedTokens;
//     if (outputReferences) {
//       sortedTokens = [...allTokens].sort(sortByReference(tokens, { allTokens, usesDtcg }));
//     } else {
//       sortedTokens = [...allTokens].sort(sortByName);
//     }
//     // return JSON.stringify(sortedTokens, null, 2) + '\n';
//     return JSON.stringify(minifyDictionary(dictionary.tokens, usesDtcg), null, 2) + '\n';

//   },
// });

await Promise.all(
  types.map((type) => {
    sets.map((set) => {

      // Tailwind Multi Files
      const sd = new StyleDictionary(
      {
        log: {
          warnings: 'warn', // 'warn' | 'error' | 'disabled'
          verbosity: 'silent', // 'default' | 'silent' | 'verbose'
          errors: {
            brokenReferences: 'throw', // 'throw' | 'console'
          }
              },

          preprocessors: ['tokens-studio'],
          source: ['design/tokens/multi/**/*.json'],
          platforms: {
            css: {
              transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
              transforms: ['attribute/cti', 'name/kebab'], // <-- add a token name transform for generating token names, default is camel
              buildPath: `design/build/style-dictionary/${set}/`,

              files: [
                {
                  destination: `${type}.json`,
                  format: 'jsonWithReferences',
                  options: {
                    // Look here 👇
                    outputReferences: true
                  },
                  filter: async (token, options) => {
                    return token.path[0] == type && token.filePath.endsWith(`${set}.json`);
                  },
                },
              ],
            },
          },
        });
        
        // await sd.cleanAllPlatforms();
        return sd.buildAllPlatforms();
        }
      )
    
  }),
);
