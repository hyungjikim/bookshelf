import { Book } from "../../types/book";
import { BookDetail } from "../../types/bookDetail";

type BookMetaData = Pick<Book, "title" | "author" | "publisher">;

type BookOverview = Pick<BookDetail, "id" | "created_at">;

export type BooksListWithJoin = BookOverview & {
  book_id: BookMetaData;
};
