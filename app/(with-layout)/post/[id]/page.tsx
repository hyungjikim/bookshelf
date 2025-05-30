import { getBookDetail } from "@/app/lib/queries/getBookDetail";
import { createClient as createClientWithoutCookie } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { Loader } from "lucide-react";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { PostActionsControls } from "./components/PostActionsControls";
import { layoutStyles } from "@/app/styles/layout.styles";
import { WithAuthorOnly } from "./components/WithAuthorOnly";
import { Footer } from "./components/Footer";
import { getBookMetadata } from "./utils/getBookMetadata";
import { CreatedBy } from "./components/CreatedBy";
import { CreatedAt } from "./components/CreatedAt";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const book = await getBookMetadata(Number(id));
  return {
    title: book?.title,
  };
}

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

export default async function Page({ params }: Props) {
  const { id } = await params;

  const { bookDetail, error } = await getBookDetail(Number(id));

  if (!bookDetail || error) {
    notFound();
  }

  return (
    <main {...stylex.props(layoutStyles.main)}>
      <section {...stylex.props(layoutStyles.section)}>
        <WithAuthorOnly createdBy={bookDetail.user_id}>
          <PostActionsControls id={bookDetail.id} />
        </WithAuthorOnly>
        <Suspense
          fallback={
            <div {...stylex.props(layoutStyles.fallbackWrapper)}>
              <b>책 정보를 불러오고 있어요...</b>
              <Loader />
            </div>
          }
        >
          <Header id={Number(bookDetail.book_id)} />
        </Suspense>
        <div {...stylex.props(styles.contentWrapper)}>
          <div {...stylex.props(styles.creatorBlock)}>
            {bookDetail.user_name && <CreatedBy name={bookDetail.user_name} />}
            {bookDetail.created_at && (
              <CreatedAt date={new Date(bookDetail.created_at)} />
            )}
          </div>
          <Content body={bookDetail.content} />
        </div>
        <Footer />
      </section>
    </main>
  );
}

const styles = stylex.create({
  contentWrapper: {
    marginTop: "12px",
    display: "grid",
    rowGap: "8px",
  },
  creatorBlock: {
    display: "grid",
    gap: "4px",
  },
});
