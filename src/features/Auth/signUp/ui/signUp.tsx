import { AuthForm } from "../../lib";

export default function SignUp() {
  return (
    <section
      data-testid="sign-up-page"
      className="flex px-[10px] bg-primary-900/30 h-screen justify-center items-center"
    >
      <AuthForm onSignUp={true} />
    </section>
  );
}
