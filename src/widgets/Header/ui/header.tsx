"use server";
import Link from "next/link";
import { cookies } from "next/headers";
import { getProfile } from "@/utils";
import { User } from "@prisma/client";

export default async function Header() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const user = await getProfile(refreshToken);

  return (
    <header className="z-40 artrum-gradient-300 py-4 shadow-lg absolute top-0 left-0 w-full">
      <nav className="container base mx-auto flex items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide text-primary-50 hover:text-accent-200 transition-colors"
        >
          Artrum
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={"/profile"}
            className="border-4 border-accent-400 text-accent-400 px-6 py-2 rounded-full hover:bg-accent-400 hover:text-white transition-colors"
          >
            {user ? "Профиль" : "Войти"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
