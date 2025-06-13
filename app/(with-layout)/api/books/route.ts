import { PAGE_SIZE } from "@/app/constants/books";
import { BOOKS_SELECT } from "@/app/lib/queries/getBooksSelect";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset"));
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("book_details")
    .select(BOOKS_SELECT)
    .range(offset, offset + PAGE_SIZE - 1)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
