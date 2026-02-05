import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { getDataPath } from '@/lib/utils/fs';

export async function GET() {
  const dataPath = getDataPath();

  try {
    const content = await fs.readFile(dataPath, 'utf8');
    return NextResponse.json(JSON.parse(content));
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
