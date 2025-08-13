"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardProps } from "../lib";


type Props = {
  title: string
  cards: CardProps[];
}
export default function Slider({
  title,
  cards
}: Props) {
  return (
    <section className="container">
      <h2 className="text-4xl w-fit mx-auto text-center font-bold bg-gradient-to-r from-accent-400 to-secondary-300 bg-clip-text text-transparent mb-8">{title}</h2>
      <Swiper
        slidesPerView={4.2}
        spaceBetween={16}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 8
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 16
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 16,
          }
        }}
      >
        {cards.map(({ buttonUrl, description, imageUrl, price, title }: CardProps, index) => (
          <SwiperSlide
            key={index}
          >
            <Card
              buttonUrl={buttonUrl}
              description={description}
              imageUrl={imageUrl}
              price={price}
              title={title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}