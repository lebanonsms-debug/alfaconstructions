import fs from 'fs';
import path from 'path';

export function writeFile(projectRoot, relativePath, content) {
  const filePath = path.join(projectRoot, relativePath);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Written:', filePath);
}
