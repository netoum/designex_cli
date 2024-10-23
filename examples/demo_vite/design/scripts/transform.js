import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// Parse command-line arguments for the silent option
const isSilent = process.argv.includes('--silent');

// Path to the single Figma Tokens Studio file
const figmaTokensFilePath = 'design/tokens/single.json';

// Directory where the split files will be saved
const outputDir = 'design/tokens/multi';

// Load the Figma Tokens Studio file
const tokens = JSON.parse(fs.readFileSync(figmaTokensFilePath, 'utf8'));

// Extract metadata and themes
const metadata = tokens.$metadata || {};
const themes = tokens.$themes || [];

// Remove metadata and themes from tokens to process other sections
delete tokens.$metadata;
delete tokens.$themes;

// Helper function to create directories if they don't exist
const ensureDirectoryExistence = (filePath) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
};

// Helper function to write tokens to files dynamically based on tokenSet
const writeTokensToFile = (filePath, tokenData) => {
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, JSON.stringify(tokenData, null, 2), 'utf8');
  if (!isSilent) {
    console.log(chalk.bold.green(`✔︎ ${filePath}`));
  }};

// Write metadata and themes to separate JSON files
writeTokensToFile(path.join(outputDir, '$metadata.json'), metadata);
writeTokensToFile(path.join(outputDir, '$themes.json'), themes);

// Process tokens dynamically based on tokenSetOrder in $metadata
if (metadata.tokenSetOrder) {
  metadata.tokenSetOrder.forEach((tokenSet) => {
    if (tokens[tokenSet]) {
      if (tokenSet.includes('/')) {
        // For tokens like "component/button", create subfolder with file "button.json"
        const [folder, file] = tokenSet.split('/');
        const dynamicPath = path.join(outputDir, folder, `${file}.json`);
        writeTokensToFile(dynamicPath, tokens[tokenSet]);
      } else {
        // For global tokens like "global" or "semantic", write directly as "global.json"
        const dynamicPath = path.join(outputDir, `${tokenSet}.json`);
        writeTokensToFile(dynamicPath, tokens[tokenSet]);
      }
    }
  });
}
if (!isSilent) {
  console.log('Token splitting completed.');
}