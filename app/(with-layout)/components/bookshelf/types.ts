import { Database } from "@/database.types";

export type Book = Database["public"]["Tables"]["books"]["Row"];
type BookDetails = Database["public"]["Tables"]["book_details"]["Row"];

type BookMetaData = Pick<Book, "title" | "author" | "publisher">;

type BookOverview = Pick<BookDetails, "id" | "created_at">;

export type BooksListWithJoin = BookOverview & {
  book_id: BookMetaData;
};
