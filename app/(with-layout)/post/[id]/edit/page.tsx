import { getBookDetail } from "@/app/lib/queries/getBookDetail";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { Loader } from "lucide-react";
import { Header } from "../components/Header";
import { EditForm } from "./Form";
import { layoutStyles } from "@/app/styles/layout.styles";

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
    <main {...stylex.props(layoutStyles.container)}>
      <section {...stylex.props(layoutStyles.section)}>
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
        <EditForm defaultValue={bookDetail.content} id={Number(id)} />
      </section>
    </main>
  );
}
