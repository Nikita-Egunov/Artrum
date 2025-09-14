"use server";

import { getProfile } from "@/utils";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  const user = await getProfile(token);

  return (
    <header className="artrum-gradient-200 border-b border-app-dashed">
      <div className="container mx-auto px-6 py-6">
        <div className="md:flex space-y-2.5 items-center justify-between">
          <Link href={"/"} className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 overflow-hidden relative rounded-full bg-primary-700 border-2 border-accent-300">
                <Image
                  className="absolute w-full h-full object-cover object-center"
                  src={user?.avatarUrl ? user.avatarUrl : "/nft.jpg"}
                  alt="Аватар"
                  width={70}
                  height={70}
                />
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-2xl text-center font-bold text-primary-50">
                {user?.name || user?.email}
              </h1>
            </div>
          </Link>

          <div className="flex gap-2.5">
            <Link
              href={"/profile/customize"}
              className="border-2 border-accent-300 text-accent-300 px-6 py-2 
                            rounded-full hover:bg-accent-300 hover:text-white transition-colors"
            >
              Редактировать
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
