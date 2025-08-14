import { AuthForm } from "../../lib";

export default function SignIn() {
  return (
    <section
      data-testid="sign-in-page"
      className="flex px-[10px] bg-primary-900/30 h-screen justify-center items-center"
    >
      <AuthForm />
    </section>
  );
}
