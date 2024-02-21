import archiver from 'archiver';
import fs from 'fs';
import { mkdir } from 'fs/promises';
import { program } from 'commander';
import path from 'path';

async function zipDirectory(sourceDir: string, outputPath: string) {
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = fs.createWriteStream(outputPath);

    await mkdir(path.dirname(outputPath), { recursive: true });

    return await new Promise<void>((resolve, reject) => {
        archive.directory(sourceDir, false)
            .on('error', (err) => reject(err))
            .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

program.name('casualos-cmi5-cli')
    .description('CLI to create and manage cmi5 packages.')
    .version('1.0.0');

program.command('zip')
    .description('Create a zip file from a directory.')
    .argument('<string>', 'Course to zip.')
    .action(async (str, options) => {
        const dir = path.resolve(__dirname, '..', 'courses', str);
        const zip = path.resolve(__dirname, '..', 'dist', `${str}.zip`);
        console.log('Zipping course at:', dir);
        await zipDirectory(dir, zip);
        console.log('Done. Course was zipped to ', zip);
    });

program.parse();