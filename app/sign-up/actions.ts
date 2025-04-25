"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { State } from "./types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(_prevState: State, formData: FormData) {
  const supabase = await createClient();

  const schema = z.object({
    nickname: z
      .string()
      .min(2, { message: "최소 2자 이상 입력해주세요" })
      .max(20, "최대 20자 이하로 입력해 주세요"),
    email: z
      .string({
        invalid_type_error: "이메일을 다시 확인해 주세요.",
      })
      .email("이메일 형식으로 입력해주세요"),
    password: z.string().min(6, "6글자 이상 입력해주세요"),
  });

  const rawData = Object.fromEntries(formData);

  const validatedFields = schema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      fieldError: validatedFields.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  const info = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("nickname") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(info);

  if (error) {
    return {
      globalError: "회원가입에 실패했습니다. 다시 시도해주세요",
      inputs: rawData,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
