import * as stylex from "@stylexjs/stylex";
import { InviewRender } from "./InviewRender";
import HorizontalInfiniteBookshelf from "./HorizontalInfiniteBookshelf";
import { PAGE_SIZE } from "@/app/constants/books";
import { BOOKS_SELECT } from "@/app/lib/queries/getBooksSelect";
import { adaptBookListToUI } from "@/app/utils/adaptBookListToUI";
import { createClient } from "@/utils/supabase/server";

async function fetchMoreBooks(offset: number) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("book_details")
    .select(BOOKS_SELECT)
    .range(offset, offset + PAGE_SIZE - 1);
  return data?.map(adaptBookListToUI) ?? [];
}

export async function Footer() {
  const initialData = await fetchMoreBooks(0);
  return (
    <InviewRender>
      <h4 {...stylex.props(styles.h4)}>🔎 다른 책도 살펴보세요</h4>
      <HorizontalInfiniteBookshelf initialData={initialData} />
    </InviewRender>
  );
}

const styles = stylex.create({
  h4: {
    marginBottom: "12px",
    textAlign: "center",
  },
});
