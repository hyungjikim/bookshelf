import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "../actions/auth";

export async function AuthMenu() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {user ? (
        <li>
          <form action={signOut}>
            <button>
              <LogOut /> 로그아웃
            </button>
          </form>
        </li>
      ) : (
        <li>
          <Link href="/sign-in">로그인</Link>
        </li>
      )}
    </>
  );
}
