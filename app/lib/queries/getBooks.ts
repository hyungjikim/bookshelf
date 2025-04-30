/**
 * 책 정보와 관련된 감상문 데이터를 가져오기 위한 SQL SELECT 쿼리 문자열.
 *
 * 이 쿼리는 `book_details` 테이블에서 책 감상문과 관련된 정보를 가져옵니다:
 * - id: 감상문 아이디
 * - content: 책 감상문 내용
 * - user_id: 감상문을 등록한 유저의 아이디
 * - book_id: `books` 테이블에서 책의 제목, 저자, 출판사 데이터를 가져옵니다.
 *
 * @example
 * ```ts
 * const { data } = await supabase.from("book_details").select(BOOKS_SELECT);
 * ```
 */
export const BOOKS_SELECT = `
  id,
  content,
  created_at,
  user_id,
  book_id (
    title,
    author,
    publisher
  )
`;
