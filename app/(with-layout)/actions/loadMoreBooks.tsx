"use server";

import { PAGE_SIZE } from "@/app/constants/books";
import { BOOKS_SELECT } from "@/app/lib/queries/getBooks";
import { mapToBookUI } from "@/app/utils/mapBooks";
import { createClient } from "@/utils/supabase/server";

export async function fetchMoreBooks(offset: number) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("book_details")
    .select(BOOKS_SELECT)
    .range(offset, offset + PAGE_SIZE - 1);

  return data?.map(mapToBookUI) ?? [];
}
