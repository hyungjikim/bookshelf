import { Database } from "@/database.types";

type Book = Pick<
  Database["public"]["Tables"]["books"]["Row"],
  "title" | "author" | "publisher"
>;

type BookDetail = Pick<
  Database["public"]["Tables"]["book_details"]["Row"],
  "id" | "created_at"
>;

export type BooksListWithJoin = BookDetail & {
  book_id: Book;
};

export type BookUI = Database["public"]["Tables"]["books"]["Row"];
