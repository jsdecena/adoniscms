'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './swiper.scss';

interface Props<T> {
  items: T[];
  renderItemAction: (_item: T) => React.ReactNode;
  spaceBetween?: number;
  slidesPerView?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export default function CardSwiper<T>({
  items,
  renderItemAction,
  slidesPerView = {
    xs: 3,
    sm: 3,
    md: 3,
    lg: 3,
    xl: 3,
  },
  spaceBetween = 30,
}: Props<T>) {
  return (
    <div className="-mx-6">
      <Swiper
        className="-my-3 py-3"
        spaceBetween={spaceBetween}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: { slidesPerView: slidesPerView.xs }, // Mobile screens
          640: { slidesPerView: slidesPerView.sm }, // Small screens (sm)
          768: { slidesPerView: slidesPerView.md }, // Medium screens (md)
          1024: { slidesPerView: slidesPerView.lg }, // Large screens (lg)
          1280: { slidesPerView: slidesPerView.xl }, // Extra large screens (xl)
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{renderItemAction(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
