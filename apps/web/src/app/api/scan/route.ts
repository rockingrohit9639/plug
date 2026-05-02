import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: NextRequest) {
  const { github_url } = await request.json();

  if (!github_url || typeof github_url !== "string") {
    return NextResponse.json(
      { error: "github_url is required" },
      { status: 400 }
    );
  }

  const githubRegex =
    /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/;
  if (!githubRegex.test(github_url.trim())) {
    return NextResponse.json(
      { error: "Invalid GitHub repository URL" },
      { status: 400 }
    );
  }

  const { env } = await getCloudflareContext();
  const scanner = (env as Record<string, any>).SCANNER;

  if (!scanner) {
    return NextResponse.json(
      { error: "Scanner service not available" },
      { status: 503 }
    );
  }

  const result = await scanner.createScan(github_url.trim());

  return NextResponse.json(result);
}
