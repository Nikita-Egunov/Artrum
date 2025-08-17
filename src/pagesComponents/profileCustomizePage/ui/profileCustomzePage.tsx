import { AvatarCustomize, NameCustomize } from "@/features/profile/ui/customize";
import { Header } from "@/widgets";
import Link from "next/link";
import { JSX } from "react";

export default function ProfileCustomizePage(): JSX.Element {
  return (
    <>
      <header className="pt-[10px] px-[10px]">
        <div className="w-full p-6 bg-primary-800/40 rounded-xl border border-primary-700">
          <Link href={'/profile'}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
          </Link>
        </div>
      </header>
      <main className="md:flex space-2.5 px-[10px] justify-center gap-2.5 mt-[10px]">
        {/* <AvatarCustomize /> */}
        <NameCustomize />
      </main>
    </>
  )
}