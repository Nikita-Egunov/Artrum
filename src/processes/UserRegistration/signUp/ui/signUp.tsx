import { AuthForm } from "../../lib";

export default function SignUp() {
  return (
    <section className="flex px-[10px] bg-primary-900/30 h-screen justify-center items-center">
      <AuthForm
        onSignUp={true}
      />
    </section>
  )
}