"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { EditState } from "./types";

export async function update(_prevState: EditState, formData: FormData) {
  const schema = z.object({
    content: z.string().min(1, { message: "최소 1자 이상 입력해주세요" }),
  });

  const rawData = Object.fromEntries(formData);
  const validatedFields = schema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.content?.[0],
    };
  }

  const content = formData.get("content") as string;
  const id = formData.get("id");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !id) {
    return {
      message: "글을 수정할 수 없습니다.",
    };
  }

  const { error } = await supabase
    .from("book_details")
    .update({ content, user_name: user?.user_metadata.full_name })
    .eq("id", Number(id));

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect(`/post/${id}`);
}
