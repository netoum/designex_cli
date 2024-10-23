import { Command } from '@oclif/core';
import { exec } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function runScript(cmd: Command, scriptPath: string, scriptName: string): Promise<void> {
  const buildScriptPath = path.join(process.cwd(), scriptPath, scriptName);

  try {
    await fs.access(buildScriptPath);
	exec(`node ${buildScriptPath}`, (error, stdout, stderr) => {
		if (error) {
		  cmd.error(`${error.message}`);
		}

		if (stderr) {
		  cmd.warn(`${stderr}`);
		}

		cmd.log(`${stdout}`);
	  });
  } catch {
    cmd.error(`Script not found at: ${buildScriptPath}`);
  }

}
