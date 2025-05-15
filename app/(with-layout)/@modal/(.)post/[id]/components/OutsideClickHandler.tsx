"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";
import { useClickAway } from "react-use";

export function OutsideClickHandler({ children }: { children: ReactNode }) {
  const router = useRouter();
  const ref = useRef(null);

  useClickAway(ref, () => router.back());

  return <div ref={ref}>{children}</div>;
}
