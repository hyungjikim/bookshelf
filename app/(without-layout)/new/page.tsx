import { layoutStyles } from "@/app/styles/layout.styles";
import { PublishForm } from "./components/Form";
import * as stylex from "@stylexjs/stylex";

export default function Page() {
  return (
    <main {...stylex.props(layoutStyles.container)}>
      <section {...stylex.props(layoutStyles.section)}>
        <PublishForm />
      </section>
    </main>
  );
}
