"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { State } from "./types";
import { z } from "zod";

export async function signIn(_prevState: State, formData: FormData) {
  const supabase = await createClient();

  const schema = z.object({
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

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      globalError: error.message,
      inputs: rawData,
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

type SocialLoginProvider = Extract<Provider, "google" | "github">;

export async function socialLogin(provider: SocialLoginProvider) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      queryParams: {
        prompt: "consent",
      },
    },
  });

  if (error) {
    redirect("/error");
  }

  if (data.url) {
    redirect(data.url);
  }
}
