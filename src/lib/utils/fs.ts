import path from 'path';
import os from 'os';

export function getDataPath(): string {
  if (process.env.NODE_ENV === 'production') {
    return path.join(os.tmpdir(), 'data.json');
  }
  return path.join(process.cwd(), 'data.json');
}
