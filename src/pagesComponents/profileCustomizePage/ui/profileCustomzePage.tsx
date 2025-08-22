"use server"

import { AddAft } from "@/features";
import { AvatarCustomize, NameCustomize } from "@/features/profile/ui/customize";
import { getProfile } from "@/utils";

import { cookies } from "next/headers";

import { JSX } from "react";
import { Header } from "../header";

export default async function ProfileCustomizePage(): Promise<JSX.Element> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const profile = await getProfile(refreshToken);

  return (
    <>
      <Header />
      <main className=" px-[10px] mt-[10px]">
        <section className="container base grid grid-cols-2 gap-[10px]">

          <AvatarCustomize />
          <NameCustomize />
          {profile?.email === process.env.ADMIN_EMAIL && <AddAft />}
        </section>
      </main>
      {}
    </>
  )
}