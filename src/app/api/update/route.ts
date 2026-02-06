import { NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/utils/fs';
import { ScraperService } from '@/lib/scrapers/service';
import { APPS_CONFIG } from '@/lib/config';

const COOLDOWN_MINUTES = 60;

export async function POST(request: Request) {
  try {
    const currentData = await readData<{ lastUpdate?: string }>();

    const ADMIN_SECRET = 'force';
    const adminKey = typeof request !== 'undefined' ? request.headers.get('x-admin-key') : null;

    // Strict check: If header exists (even empty) but is wrong, deny immediately
    if (adminKey !== null && adminKey !== ADMIN_SECRET) {
      return NextResponse.json({ success: false, error: 'Invalid Admin Key' }, { status: 401 });
    }
    const isForceUpdate = adminKey === ADMIN_SECRET;

    if (currentData?.lastUpdate && !isForceUpdate) {
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
      await writeData(newData);
    } catch (writeError) {
      console.error('Persistence failed:', writeError);
    }

    return NextResponse.json({
      success: true,
      data: newData,
    });
  } catch (error: unknown) {
    console.error('Update failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
