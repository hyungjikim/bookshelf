import { createClient } from "@/utils/supabase/server";

/**
 * dynamic segment(id) 로 책의 메타데이터를 조회하는 함수
 * @param id dynamic segment Number 로 변환해서 넘겨주세요
 * @returns 조회한 책의 메타데이터
 */
export async function getBookMetadata(id: number) {
  const supabase = await createClient();
  const { data: bookDetail } = await supabase
    .from("book_details")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (!bookDetail) return;

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookDetail?.book_id)
    .single();

  if (!book) return;

  return book;
}
