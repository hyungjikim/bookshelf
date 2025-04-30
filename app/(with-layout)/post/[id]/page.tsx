import { Database } from "@/database.types";
import { createClient as createClientWithoutCookie } from "@supabase/supabase-js";

type BookDetails = Database["public"]["Tables"]["book_details"]["Row"];

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
    .select("*")
    .overrideTypes<BookDetails[], { merge: false }>();

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

  return <div>This is {id}</div>;
}
