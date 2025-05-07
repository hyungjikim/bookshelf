import { BooksListWithJoin } from "../(with-layout)/components/bookshelf/types";

/**
 * Supabase에서 조회한 책 데이터를 UI에서 사용할 수 있는 형식으로 변환
 * @param item Supabase 쿼리 결과로 받은 책 항목 객체
 * @returns UI에서 사용할 수 있도록 가공된 책 데이터 객체
 */
export function adaptBookListToUI(item: BooksListWithJoin) {
  return {
    id: item.id,
    title: item.book_id.title,
    author: item.book_id.author,
    publisher: item.book_id.publisher,
    created_at: item.created_at,
  };
}
