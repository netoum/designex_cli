import fs from 'node:fs';
import path from 'node:path';

const single_token = 'designex/tokens/tokens.json';
const multi_token_path = 'designex/tokens/multi';
const tokens = JSON.parse(fs.readFileSync(single_token, 'utf8'));
const metadata = tokens.$metadata || {};
const themes = tokens.$themes || [];
delete tokens.$metadata;
delete tokens.$themes;

const ensureDirectoryExistence = (filePath) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
};

const writeTokensToFile = (filePath, tokenData) => {
  ensureDirectoryExistence(filePath);
  fs.writeFileSync(filePath, JSON.stringify(tokenData, null, 2), 'utf8');
    console.log(`✔︎ ${filePath}`);
};

writeTokensToFile(path.join(multi_token_path, '$metadata.json'), metadata);
writeTokensToFile(path.join(multi_token_path, '$themes.json'), themes);

if (metadata.tokenSetOrder) {
  metadata.tokenSetOrder.forEach((tokenSet) => {
    if (tokens[tokenSet]) {
      if (tokenSet.includes('/')) {
        const [folder, file] = tokenSet.split('/');
        const dynamicPath = path.join(multi_token_path, folder, `${file}.json`);
        writeTokensToFile(dynamicPath, tokens[tokenSet]);
      } else {
        const dynamicPath = path.join(multi_token_path, `${tokenSet}.json`);
        writeTokensToFile(dynamicPath, tokens[tokenSet]);
      }
    }
  });
}