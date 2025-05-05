import { createClient } from "@/utils/supabase/server";
import * as stylex from "@stylexjs/stylex";
import { PAGE_SIZE } from "../constants/books";
import { mapToBookUI } from "../utils/mapBooks";
import { BOOKS_SELECT } from "../lib/queries/getBooks";
import InfiniteBookshelf from "./components/bookshelf/InfiniteBookshelf";

export default async function Home() {
  const supabase = await createClient();
  const { data: initialData } = await supabase
    .from("book_details")
    .select(BOOKS_SELECT)
    .limit(PAGE_SIZE);

  if (!initialData)
    return <p {...stylex.props(styles.noBooks)}>📖 아직 추가된 책이 없어요!</p>;

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
