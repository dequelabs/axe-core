import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

/**
 * Create file with given contents at specified location
 * @param {string} filePath file path, inclusive of file name
 * @param {string} content contents of the file
 */
export default function createFile(filePath, content) {
  return mkdir(dirname(filePath), { recursive: true }).then(() =>
    writeFile(filePath, content)
  );
}
