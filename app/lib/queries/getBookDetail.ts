import { createClient } from "@/utils/supabase/server";

/**
 * book_details 테이블에서 특정 책 상세 데이터를 조회하는 쿼리입니다.
 * @param id 조회하려는 상세 id
 * @returns
 * - bookDetail: id 에 대응하는 데이터, 없으면 null
 * - error: supbase error, 없으면 null
 *  */
export async function getBookDetail(id: string) {
  const supabase = await createClient();
  const { data: bookDetail, error } = await supabase
    .from("book_details")
    .select("*")
    .eq("id", id)
    .single();

  return { bookDetail, error };
}
