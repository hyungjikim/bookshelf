import { LoaderIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import { Overlay } from "@/app/components/Overlay";

export default function Loading() {
  return (
    <Overlay>
      <p {...stylex.props(styles.p)}>📚 Loading ...</p>
      <LoaderIcon />
    </Overlay>
  );
}

const styles = stylex.create({
  p: {
    fontWeight: "bold",
  },
});
