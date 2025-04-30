import { BooksListWithJoin } from "../components/bookshelf/types";

export function mapToBookUI(item: BooksListWithJoin) {
  return {
    id: item.id,
    title: item.book_id.title,
    author: item.book_id.author,
    publisher: item.book_id.publisher,
    created_at: item.created_at,
  };
}
