import {
	type Dirent,
	mkdirSync,
	readFileSync,
	readdirSync,
	writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tokenRegex = /{{|}}/
const maxstache = (str: string, ctx: Record<string, string> = {}) => {
	const tokens = str.split(tokenRegex)
	const res = tokens.map(parse(ctx))
	return res.join('')
}

const parse = (ctx: Record<string, string>) => function(token: string, i: number) {
		if (i % 2 === 0) return token
		return ctx[token]
	}

export default function copyTemplate(
	srcDir: string,
	outDir: string,
	vars: Record<string, string> = {},
) {
	mkdirSync(outDir, { recursive: true })
	const createdFiles: string[] = []
	const files = readdirSync(srcDir, { recursive: true, withFileTypes: true })
	for (const file of files) {
		if (file.isDirectory()) continue
		createdFiles.push(writeFile(outDir, srcDir, vars, file))
	}

	return createdFiles
}

function writeFile(
	outDir: string,
	srcDir: string,
	vars: Record<string, string>,
	file: Dirent,
) {
	const filePath = file.parentPath
	const fullPath = `${filePath}${path.sep}${file.name}`
	const relativePath = fullPath.replace(srcDir, '')
	const relativeDirPath = filePath.replace(srcDir, '')
	const outFile = path.join(
		outDir,
		maxstache(removeUnderscore(relativePath), vars),
	)
	const fileContent = readFileSync(fullPath)
	mkdirSync(path.join(outDir, maxstache(relativeDirPath, vars)), {
		recursive: true,
	})
	writeFileSync(outFile, maxstache(fileContent.toString(), vars))
	return outFile
}

const underscoreRegex = /^_/
function removeUnderscore(filepath: string) {
	const parts = filepath.split(path.sep)
	const filename = parts.pop()?.replace(underscoreRegex, '')
	return [...parts, filename ?? ''].join(path.sep)
}


export const copyTokens = (flags: Record<string, string>): string[] => {
	const tokensTemplate = path.join(
	   __dirname,
	  '../../templates',
	  'tokens',
	  flags.inputFormat,
	  flags.inputType
	);
	const tokensDir = path.join(flags.tokensPath);
  
	const tokensVariables = {
	  buildPath: flags.buildPath,
	  scriptName: flags.scriptName,
	  tokensPath: flags.tokensPath,
	};
  
	return copyTemplate(tokensTemplate, tokensDir, tokensVariables);
  };
  
  export const copyScript = (flags: Record<string, string>): string[] => {
	const scriptsTemplate = path.join(
		__dirname,
		'../../templates',
		'scripts',
	  flags.inputFormat,
	  flags.inputType,
	  flags.outputFormat,
	  flags.outputType,
	  'script'
	);
	const scriptsDir = path.join(flags.scriptPath);
  
	const scriptsVariables = {
	  buildPath: flags.buildPath,
	  scriptName: flags.scriptName,
	  tokensPath: flags.tokensPath,
	};
  
	return copyTemplate(scriptsTemplate, scriptsDir, scriptsVariables);
  };
  
  export const copyPrescript = (flags: Record<string, string>): string[] => {
	const prescriptsTemplate = path.join(
		__dirname,
		'../../templates',
		'scripts',
	  flags.inputFormat,
	  flags.inputType,
	  flags.outputFormat,
	  flags.outputType,
	  'prescript'
	);
	const prescriptsDir = path.join(flags.prescriptPath);
  
	const prescriptsVariables = {
	  prescriptName: flags.prescriptName,
	  tokensPath: flags.tokensPath,
	};
  
	return copyTemplate(prescriptsTemplate, prescriptsDir, prescriptsVariables);
  };