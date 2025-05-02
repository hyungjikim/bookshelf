import { createClient } from "@/utils/supabase/server";
import { cloneElement, ReactElement } from "react";

interface WithAuthorOnlyProps {
  /** 게시물을 작성한 유저의 id */
  createdBy: string;
  /** 권한 확인 후 렌더링할 컴포넌트 */
  children: ReactElement<{ isAuthor: boolean }>;
}

export async function WithAuthorOnly({
  createdBy,
  children,
}: WithAuthorOnlyProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  return cloneElement(children, { isAuthor: userId === createdBy });
}
