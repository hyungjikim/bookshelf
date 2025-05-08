import * as stylex from "@stylexjs/stylex";
import { fetchMoreBooks } from "@/app/(with-layout)/page";
import { InviewRender } from "./InviewRender";
import HorizontalInfiniteBookshelf from "./HorizontalInfiniteBookshelf";

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
