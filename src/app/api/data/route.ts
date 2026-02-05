import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const dataPath = path.join(process.cwd(), "data.json");

  try {
    const content = await fs.readFile(dataPath, "utf8");
    return NextResponse.json(JSON.parse(content));
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
