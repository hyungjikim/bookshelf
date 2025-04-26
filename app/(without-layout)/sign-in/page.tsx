import Link from "next/link";
import { login, socialLogin } from "./actions";

export default function LoginPage() {
  const googleLogin = socialLogin.bind(null, "google");
  const githubLogin = socialLogin.bind(null, "github");

  return (
    <>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <Link href="/sign-up">회원가입하기</Link>
      </form>
      <button onClick={googleLogin}>login with google</button>
      <button onClick={githubLogin}>login with github</button>
    </>
  );
}
