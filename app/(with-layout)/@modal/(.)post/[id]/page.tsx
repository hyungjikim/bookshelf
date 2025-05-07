import { getBookDetail } from "@/app/lib/queries/getBookDetail";
import { notFound } from "next/navigation";
import { BookDetailModal } from "./components/BookDetailModal";
import { Suspense } from "react";
import { Overlay } from "@/app/components/Overlay";
import { Header } from "../../../post/[id]/components/Header";
import { Content } from "../../../post/[id]/components/Content";
import { Loader } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { ModalHeaderActions } from "./components/ModalHeaderActions";
import { WithAuthorOnly } from "../../../post/[id]/components/WithAuthorOnly";
import { Footer } from "@/app/(with-layout)/post/[id]/components/Footer";
import { InviewRender } from "@/app/(with-layout)/post/[id]/components/InviewRender";

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
    <Overlay>
      <BookDetailModal>
        <WithAuthorOnly createdBy={bookDetail.user_id}>
          <ModalHeaderActions id={bookDetail.id} />
        </WithAuthorOnly>
        <Suspense
          fallback={
            <div {...stylex.props(styles.fallbackWrapper)}>
              <span>책 정보를 불러오고 있어요...</span>
              <Loader />
            </div>
          }
        >
          <Header id={Number(bookDetail.book_id)} />
        </Suspense>
        <Content body={bookDetail.content} />
        <InviewRender>
          <Footer />
        </InviewRender>
      </BookDetailModal>
    </Overlay>
  );
}

const styles = stylex.create({
  fallbackWrapper: {
    minHeight: "56px",
  },
});
