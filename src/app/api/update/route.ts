import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { ScraperService } from '@/lib/scrapers/service';
import { APPS_CONFIG } from '@/lib/config';
import { getDataPath } from '@/lib/utils/fs';

const COOLDOWN_MINUTES = 60;

export async function POST() {
  const dataPath = getDataPath();

  try {
    let currentData;
    try {
      const content = await fs.readFile(dataPath, 'utf8');
      currentData = JSON.parse(content);
    } catch {
      // Ignore read errors
    }

    if (currentData?.lastUpdate) {
      const lastUpdate = new Date(currentData.lastUpdate);
      const diff = (new Date().getTime() - lastUpdate.getTime()) / (1000 * 60);

      if (diff < COOLDOWN_MINUTES) {
        return NextResponse.json(
          {
            success: false,
            error: `Rate limit: Please wait ${COOLDOWN_MINUTES} minutes between updates`,
          },
          { status: 429 }
        );
      }
    }

    const scraperService = new ScraperService();
    const newData = await scraperService.scrapeAll(APPS_CONFIG);

    try {
      await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));
    } catch (writeError) {
      console.error('Persistence failed:', writeError);
    }

    return NextResponse.json({
      success: true,
      data: newData,
    });
  } catch (error: any) {
    console.error('Update failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
