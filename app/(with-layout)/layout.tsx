import Header from "./components/global-layout/Header";

export default function Layout({ modal, children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      {modal}
      {children}
    </>
  );
}
