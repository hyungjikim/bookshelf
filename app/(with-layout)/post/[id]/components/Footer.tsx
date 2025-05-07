import dynamic from "next/dynamic";
import { Loader } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { fetchMoreBooks } from "@/app/(with-layout)/page";

const LazyHorizontalInfiniteBookshelf = dynamic(
  () => import("./HorizontalInfiniteBookshelf"),
  {
    loading: () => <Loader />,
  }
);

export async function Footer() {
  const initialData = await fetchMoreBooks(0);
  return (
    <div>
      <h4 {...stylex.props(styles.h4)}>🔎 다른 책도 살펴보세요</h4>
      <LazyHorizontalInfiniteBookshelf initialData={initialData} />
    </div>
  );
}

const styles = stylex.create({
  h4: {
    marginBottom: "12px",
    textAlign: "center",
  },
});
