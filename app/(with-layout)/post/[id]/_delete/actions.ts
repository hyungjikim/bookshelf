"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteContent(_, formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!id || !user) {
    return {
      message: "글을 삭제할 수 없습니다",
    };
  }
  const { error } = await supabase
    .from("book_details")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return {
      message: "글을 삭제하지 못했습니다. 다시 시도해주세요",
    };
  }

  revalidatePath("/");
  redirect("/");
}
