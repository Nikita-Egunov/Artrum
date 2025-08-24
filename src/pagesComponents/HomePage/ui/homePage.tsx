import { About, Footer, Header, Hero } from "@/widgets";
import { JSX } from "react";
import SliderClient from "./sliderClient/sliderClient";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Header />
      <Hero
        h1="Приветствую тебя в своём магазине артов"
        p="Здесь ты можешь купить AFT. Это ценность на этой площадке"
        button1Text="Купить"
        button1Url="/shop"
        button2Text="О нас"
        button2Url="/about"
      />
      <SliderClient title="Доступные для покупки арты" />
      <About
        title="Немного об Artrum"
        description="
          Эта старнная площадка была создана для того чтобы продавать арты. 
          Т.е. вы покупаете id фотографии из моей базы данных.
          Всё)
          Возможно кто то захочет его купить, возможно и нет. 
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
          url="/about"
          imgUrl="/merge.png"
          isWrapped={true}
          btnText="Хочу знать всё"
        />
      </div>
      <Footer />
    </>
  );
}
