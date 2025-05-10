"use client";

import Link from "next/link";
import { signIn, socialLogin } from "./actions";
import Form from "next/form";
import { useActionState } from "react";
import { State } from "./types";
import * as stylex from "@stylexjs/stylex";
import { layoutStyles } from "@/app/styles/layout.styles";
import {
  buttonStyles,
  formStyles,
  inputStyles,
  labelStyles,
} from "@/app/styles/form.styles";

const initialState = {
  fieldError: {},
  globalError: "",
};

export default function SignInPage() {
  const googleLogin = socialLogin.bind(null, "google");
  const githubLogin = socialLogin.bind(null, "github");

  const [state, formAction, pending] = useActionState<State, FormData>(
    signIn,
    initialState
  );

  return (
    <main {...stylex.props(layoutStyles.main)}>
      <section {...stylex.props(layoutStyles.section)}>
        <Form action={formAction} {...stylex.props(formStyles.form)}>
          <div>
            <label htmlFor="email" {...stylex.props(labelStyles.label)}>
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={state.inputs?.email}
              placeholder="이메일 주소를 입력해주세요"
              {...stylex.props(inputStyles.input, styles.input)}
            />
            {state.fieldError?.email && (
              <p aria-live="polite" role="status">
                {state.fieldError.email[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" {...stylex.props(labelStyles.label)}>
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue={state.inputs?.password}
              placeholder="비밀번호를 입력해주세요"
              {...stylex.props(inputStyles.input)}
            />
            {state.fieldError?.password && (
              <p aria-live="polite" role="status">
                {state.fieldError.password[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            {...stylex.props(buttonStyles.button, styles.customButton)}
          >
            {pending ? "...로그인중" : "로그인"}
          </button>
          {state.globalError && (
            <p aria-live="polite" role="status">
              {state.globalError}
            </p>
          )}
        </Form>
        <Link href="/sign-up">회원가입하기</Link>

        <button onClick={googleLogin}>login with google</button>
        <button onClick={githubLogin}>login with github</button>
      </section>
    </main>
  );
}

const styles = stylex.create({
  input: {
    maxWidth: "unset",
  },
  customButton: {
    marginTop: "12px",
    height: "36px",
    fontSize: "1.1rem",
  },
});
