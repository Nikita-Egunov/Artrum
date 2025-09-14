"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardProps } from "../lib";

type Props = {
  title: string;
  cards: CardProps[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  canBuy?: boolean;
};
export default function Slider({
  title,
  cards,
  isLoading,
  isSuccess,
  canBuy = true,
}: Props) {
  return (
    <section className="container" id="ask-art">
      <h2 className="text-4xl w-fit mx-auto text-center font-bold bg-gradient-to-r from-accent-400 to-secondary-300 bg-clip-text text-transparent mb-8">
        {title}
      </h2>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[500px]">
          <span className="block w-6 h-6 border-b border-l border-primary-400 rounded-full animate-spin mx-auto"></span>
        </div>
      )}
      {cards?.length === 0 ? (
        <p className="text-xl w-fit mx-auto text-center font-bold text-secondary-400">
          Артов нет ((
        </p>
      ) : (
        isSuccess &&
        cards && (
          <Swiper
            slidesPerView={4.2}
            spaceBetween={16}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 2.2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3.2,
                spaceBetween: 16,
              },
            }}
          >
            {cards.map(
              (
                { id, description, imageUrl, cost, title }: CardProps,
                index,
              ) => (
                <SwiperSlide key={index}>
                  <Card
                    id={id}
                    description={description}
                    imageUrl={imageUrl}
                    cost={cost}
                    title={title}
                    canBuy={canBuy}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>
        )
      )}
    </section>
  );
}
