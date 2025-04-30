import { getBookDetail } from "@/app/lib/queries/getBookDetail";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { bookDetail, error } = await getBookDetail(id);

  if (!bookDetail || error) {
    notFound();
  }

  return <h1>intercept {id}</h1>;
}
