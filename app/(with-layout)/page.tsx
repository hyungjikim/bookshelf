import * as stylex from "@stylexjs/stylex";
import InfiniteBookshelf from "./components/bookshelf/InfiniteBookshelf";
import { BOOKS_SELECT } from "../lib/queries/getBooksSelect";
import { PAGE_SIZE } from "../constants/books";
import { adaptBookListToUI } from "../utils/adaptBookListToUI";
import { createClient } from "@/utils/supabase/server";

export async function fetchMoreBooks(offset: number) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("book_details")
    .select(BOOKS_SELECT)
    .range(offset, offset + PAGE_SIZE - 1);
  return data?.map(adaptBookListToUI) ?? [];
}

export default async function Home() {
  const initialData = await fetchMoreBooks(0);

  if (!initialData)
    return <p {...stylex.props(styles.noBooks)}>📖 아직 추가된 책이 없어요!</p>;

  return (
    <div>
      <main {...stylex.props(styles.wrapper)}>
        <InfiniteBookshelf initialData={initialData} />
      </main>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "24px",
  },
  noBooks: {
    fontStyle: "italic",
  },
});
