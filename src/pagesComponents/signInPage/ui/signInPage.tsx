import { SignIn } from "@/features";
import Link from "next/link";
import { JSX } from "react";

export default function SignInPage(): JSX.Element {
  return (
    <>
      <header className="p-3.5 border border-primary-500 rounded-xl bg-primary-800 mx-2.5 mt-2.5">
        <Link href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </Link>
      </header>
      <SignIn />;
    </>
  );
}
