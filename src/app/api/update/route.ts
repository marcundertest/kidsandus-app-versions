import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ScraperService } from "@/lib/scrapers/service";
import { APPS_CONFIG } from "@/lib/config";

const COOLDOWN_MINUTES = 60;

export async function POST() {
  const dataPath = path.join(process.cwd(), "data.json");

  try {
    let currentData;
    try {
      const content = await fs.readFile(dataPath, "utf8");
      currentData = JSON.parse(content);
    } catch {
      // If file doesn't exist, proceed with update
    }

    if (currentData?.lastUpdate) {
      const lastUpdate = new Date(currentData.lastUpdate);
      const diff = (new Date().getTime() - lastUpdate.getTime()) / (1000 * 60);

      if (diff < COOLDOWN_MINUTES) {
        return NextResponse.json(
          {
            success: false,
            error: "Rate limit: Please wait 60 minutes between updates",
          },
          { status: 429 },
        );
      }
    }

    const scraperService = new ScraperService();
    const newData = await scraperService.scrapeAll(APPS_CONFIG);

    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));

    return NextResponse.json({
      success: true,
      data: newData,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
