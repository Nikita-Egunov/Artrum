import { Header } from "@/features/profile";
import { Slider } from "@/widgets";
import { JSX } from "react";
import { ClientSlider } from "../lib";

export default function ProfilePage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="border-b border-app-dashed">
        <ClientSlider />
      </main>
    </>
  );
}
