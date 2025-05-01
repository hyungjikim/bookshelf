import { createClient } from "@/utils/supabase/server";
import * as stylex from "@stylexjs/stylex";
import InfiniteBookshelf from "../components/bookshelf/InfiniteBookshelf";
import { PAGE_SIZE } from "../constants/books";
import { mapToBookUI } from "../utils/mapBooks";
import { BOOKS_SELECT } from "../lib/queries/getBooks";

export default async function Home() {
  const supabase = await createClient();
  const { data: initialData } = await supabase
    .from("book_details")
    .select(BOOKS_SELECT)
    .limit(PAGE_SIZE);

  if (!initialData)
    return <p {...stylex.props(styles.noBooks)}>Oops! No books added yet</p>;

  const mappedBooks = initialData.map(mapToBookUI);

  return (
    <div>
      <main {...stylex.props(styles.wrpper)}>
        <InfiniteBookshelf initialData={mappedBooks} />
      </main>
    </div>
  );
}

const styles = stylex.create({
  wrpper: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "24px",
  },
  noBooks: {
    fontStyle: "italic",
  },
});
