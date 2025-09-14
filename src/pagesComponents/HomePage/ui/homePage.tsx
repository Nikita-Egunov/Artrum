import { About, Footer, Header, Hero } from "@/widgets";
import { JSX } from "react";
import SliderClient from "./sliderClient/sliderClient";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <Hero
        h1="Приветствую тебя в своей сокровищнице артов"
        p="Здесь ты можешь попросить AFT. А я возможно подарю их тебе)"
        button1Text="Попросить"
        button1Url="#ask-art"
        button2Text="Об этом всём"
        button2Url="#about"
      />
      <SliderClient title="Доступные для просьбы арты" />
      <About
        title="Немного об Artrum"
        description="
          Эта старнная площадка была создана для того чтобы дарить арты. 
          Всё)
        "
        url="/about"
        imgUrl="/theRiachestNft.jpg"
        btnText="Хочу знать всё"
      />
      <div className="border-app-dashed border-t">
        <SliderClient title="Редкие арты" />
        <About
          title="Вообще, а зачем это всё?"
          description="Честно, не знаю. Просто прикольно)"
          url="#"
          imgUrl="/merge.png"
          isWrapped={true}
          btnText="Хочу знать всё"
        />
      </div>
      <Footer />
    </>
  );
}
