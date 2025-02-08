import { Command } from '@oclif/core';
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function runScript(cmd: Command, script: string): Promise<void> {
    const buildScriptPath = path.resolve(script);

    try {
        await fs.access(buildScriptPath);

        console.log(`Executing script at: ${path.join(script)}`);

        const output = execFileSync('node', [buildScriptPath], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 10 });
        console.log(output);
        console.log('✅ Script executed successfully.');

    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : `Unknown error: ${JSON.stringify(error)}`;
        console.error(`❌ Failed to execute script at: ${buildScriptPath}\nDetails: ${errorMessage}`);
    }
}
