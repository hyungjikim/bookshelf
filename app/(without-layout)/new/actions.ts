"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { PublishState } from "./types";
import { redirect } from "next/navigation";

export async function publish(_prevState: PublishState, formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const publisher = formData.get("publisher") as string;
  const content = formData.get("content") as string;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  // 기존에 등록된 책인지 확인
  const { data: existingBooks } = await supabase
    .from("books")
    .select("id")
    .eq("title", title.trim())
    .eq("author", author.trim())
    .eq("publisher", publisher.trim())
    .limit(1);

  let bookId: number;

  if (existingBooks && existingBooks.length > 0) {
    bookId = existingBooks[0].id;
  } else {
    // books 테이블에 새로운 책 등록
    const { data: newBook, error: insertBookError } = await supabase
      .from("books")
      .insert({ title, author, publisher })
      .select("id")
      .single();

    if (insertBookError)
      return {
        message: insertBookError.message,
        title,
        author,
        publisher,
        content,
      };

    bookId = newBook.id;
  }

  // book_detail 테이블에 감상문 추가
  const { error: insertReviewError } = await supabase
    .from("book_details")
    .insert({
      book_id: bookId,
      content,
      user_id: userId,
    });

  if (insertReviewError)
    return {
      message: insertReviewError.message,
      title: title as string,
      author: author as string,
      publisher: publisher as string,
      content: content as string,
    };

  // TODO: 상세 페이지로 리다이렉트
  revalidatePath("/");
  redirect("/");
}
