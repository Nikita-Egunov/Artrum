"use client";

import { Notif } from "@/shared/components";
import { SignInForm } from "../../lib";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux";

export default function SignIn() {
  const { isOpen, message, type } = useSelector((state: RootState) => state.notif);
  return (
    <section
      data-testid="sign-in-page"
      className="flex px-[10px] bg-primary-900/30 h-screen justify-center items-center"
    >
      <SignInForm />

      {isOpen &&
        <Notif type={type}>
          {message}
        </Notif>
      }
    </section>
  );
}
