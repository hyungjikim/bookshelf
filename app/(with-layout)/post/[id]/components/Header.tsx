import { createClient } from "@/utils/supabase/server";
import * as stylex from "@stylexjs/stylex";

export async function Header({ id }: { id: number }) {
  const supabase = await createClient();

  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return <p>🥹 책 정보를 불러오지 못했습니다</p>;

  return (
    <div {...stylex.props(styles.container)}>
      <h2 {...stylex.props(styles.h2)}>{book.title}</h2>
      {book.author && <span>{book.author} 지음</span>}
      {book.author && book.publisher && <small> / {book.publisher} 출판</small>}
      {!book.author && book.publisher && <small>{book.publisher} 출판</small>}
    </div>
  );
}

const styles = stylex.create({
  container: {
    minHeight: "56px",
  },
  h2: {
    marginBottom: "8px",
  },
});
