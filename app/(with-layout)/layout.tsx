import { ReactNode } from "react";
import Header from "../components/Header";

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
