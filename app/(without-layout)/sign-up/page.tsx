"use client";

import { useActionState } from "react";
import Form from "next/form";
import * as stylex from "@stylexjs/stylex";
import { State } from "./types";
import { signup } from "./actions";

const initialState = {
  fieldError: {},
  globalError: "",
};

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    signup,
    initialState
  );

  return (
    <Form action={formAction} {...stylex.props(styles.form)}>
      <h1>회원가입</h1>
      <div {...stylex.props(styles.wrapper)}>
        <label htmlFor="nickname" {...stylex.props(styles.label)}>
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          required
          defaultValue={state.inputs?.nickname}
          {...stylex.props(styles.input)}
        />
        {state.fieldError?.nickname && (
          <p aria-live="polite" role="status">
            {state.fieldError.nickname[0]}
          </p>
        )}
      </div>

      <div {...stylex.props(styles.wrapper)}>
        <label htmlFor="email" {...stylex.props(styles.label)}>
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={state.inputs?.email}
          {...stylex.props(styles.input)}
        />
        {state.fieldError?.email && (
          <p aria-live="polite" role="status">
            {state.fieldError.email[0]}
          </p>
        )}
      </div>

      <div {...stylex.props(styles.wrapper)}>
        <label htmlFor="password" {...stylex.props(styles.label)}>
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          defaultValue={state.inputs?.password}
          {...stylex.props(styles.input)}
        />
        {state.fieldError?.password && (
          <p aria-live="polite" role="status">
            {state.fieldError.password[0]}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} {...stylex.props(styles.button)}>
        회원가입
      </button>
      {state.globalError && (
        <p aria-live="polite" role="status">
          {state.globalError}
        </p>
      )}
    </Form>
  );
}

const styles = stylex.create({
  form: {
    border: "1px solid #ccc",
    padding: "24px",
    borderRadius: "24px",
    margin: "0 auto",
    display: "table",
    textAlign: "center",
  },
  wrapper: {
    display: "table-row",
  },
  label: {
    display: "table-cell",
  },
  input: {
    display: "table-cell",
    marginBottom: "12px",
  },
  button: {
    display: "table-row",
    width: "100%",
  },
});
