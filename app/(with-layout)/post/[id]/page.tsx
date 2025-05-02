import { getBookDetail } from "@/app/lib/queries/getBookDetail";
import { createClient as createClientWithoutCookie } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { Loader } from "lucide-react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { PostActionsControls } from "./components/PostActionControls";

export async function generateStaticParams() {
  /**
   * @supabase/ssr 의 createServerClient 메소드를 사용해서 클라이언트를 생성하려면 쿠키 접근이 필요한데
   * generateStaticParams 함수 내부에서 cookies() 를 호출하는 것은 request scope 에서 벗어난 요청이라서 에러가 발생함
   * 인증이 필요한 데이터가 아니므로, @supabase/supabase-js 를 사용해서 cookies 설정을 포함하지 않은 클라이언트를 생성
   */
  const supabase = createClientWithoutCookie(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: bookDetails, error } = await supabase
    .from("book_details")
    .select("*");

  if (error) return [];

  return bookDetails?.map((bookDetail) => ({
    id: String(bookDetail.id),
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { bookDetail, error } = await getBookDetail(Number(id));

  if (!bookDetail || error) {
    notFound();
  }

  return (
    <main {...stylex.props(styles.container)}>
      <section {...stylex.props(styles.section)}>
        <PostActionsControls id={bookDetail.id} />
        <Suspense
          fallback={
            <div {...stylex.props(styles.fallbackWrapper)}>
              <b>책 정보를 불러오고 있어요...</b>
              <Loader />
            </div>
          }
        >
          <Header id={Number(bookDetail.book_id)} />
        </Suspense>
        <div {...stylex.props(styles.contentWrapper)}>
          <Content body={bookDetail.content} />
        </div>
      </section>
    </main>
  );
}

const styles = stylex.create({
  container: {
    margin: "0 auto",
    maxWidth: "760px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #eee",
    padding: "12px",
    borderRadius: "12px",
  },
  section: {
    width: "100%",
  },

  contentWrapper: {
    marginTop: "12px",
  },
  fallbackWrapper: {
    minHeight: "56px",
  },
});
