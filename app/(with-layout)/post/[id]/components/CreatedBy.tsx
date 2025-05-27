import * as stylex from "@stylexjs/stylex";

export function CreatedBy({ name }: { name: string }) {
  return (
    <span {...stylex.props(styles.span)}>
      <b>{name}</b>님 작성
    </span>
  );
}

const styles = stylex.create({
  span: {
    textAlign: "end",
  },
});
