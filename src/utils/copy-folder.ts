import { Dirent, copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Flags {
    clean: boolean;
    dir: string
    template: string;
}

const ensureDirectoryExistence = (folderPath: string): void => {
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath, { recursive: true });
    }
};

const copyDirectory = (sourceDir: string, destDir: string, logPath: string = ''): void => {
    ensureDirectoryExistence(destDir);
    const entries: Dirent[] = readdirSync(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);
        const destPath = path.join(destDir, entry.name);
        const currentLogPath = logPath ? path.join(logPath, entry.name) : entry.name;

        if (entry.isDirectory()) {
            copyDirectory(sourcePath, destPath, currentLogPath);
        } else {
            copyFileSync(sourcePath, destPath);
            console.log(`✅ ${entry.name} copied to: ${currentLogPath}`);
        }
    }
};

export const copyFolder = (flags: Flags, folderName: string): string[] => {
    const sourceFolder = path.join(
        __dirname,
        '../../templates',
        flags.template
    );
    const targetFolder = path.resolve(folderName);

    try {
        if (flags.clean && existsSync(targetFolder)) {
            rmSync(targetFolder, { force: true, recursive: true });
        }

        copyDirectory(sourceFolder, targetFolder, folderName);

        return [folderName];
    } catch (error) {
        console.error(`❌ Failed to copy ${folderName}`);
        console.error('Error details:', error instanceof Error ? error.message : error);
        return [];
    }
};

