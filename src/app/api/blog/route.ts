import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "en";

  const posts = getBlogPosts(locale);

  return NextResponse.json(posts);
}
