import { AvatarCustomize, NameCustomize } from "@/features/profile/ui/customize";

export default function ProfileCustomizePage() {
  return (
    <main className="flex px-[10px] xl:flex-row flex-col items-center justify-center gap-4 mt-[20px]">
      <AvatarCustomize />
      <NameCustomize />
    </main>
  )
}