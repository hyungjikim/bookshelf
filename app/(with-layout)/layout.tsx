import { ReactNode } from "react";
import Header from "./components/global-layout/Header";

export default function Layout({
  modal,
  children,
}: {
  modal: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      {modal}
      {children}
    </>
  );
}
