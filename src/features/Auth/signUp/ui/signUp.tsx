"use client";

import { Notif } from "@/shared/components";
import { SignUpForm } from "../../lib";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux";

export default function SignUp() {
  const { isOpen, message, type } = useSelector(
    (state: RootState) => state.notif,
  );

  return (
    <section
      data-testid="sign-up-page"
      className="flex px-[10px] bg-primary-900/30 h-screen justify-center items-center"
    >
      <SignUpForm />
      {isOpen && <Notif type={type}>{message}</Notif>}
    </section>
  );
}
