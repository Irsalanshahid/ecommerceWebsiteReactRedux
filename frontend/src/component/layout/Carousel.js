import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow] = useState(4);
  const [autoplaySpeed] = useState(2000);
  const [slides] = useState([
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2219/4051/files/shirt_1b7d77f0-24bd-4449-81d3-5a260a640f39_1024x1024_crop_center.jpg?v=1672057739',
    },
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2219/4051/files/Jackets_68fc0cd4-6530-45ad-8b67-cedb621aa19c_1024x1024_crop_center.jpg?v=1672210611',
    },
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2219/4051/files/Ready-TO-Wear_75a4f7b5-61b3-44e5-aa37-d5e4423f3679_1024x1024_crop_center.jpg?v=1672057788',
    },
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2219/4051/files/winter_41343c88-b7d1-4a01-a29f-5ce005533718_1024x1024_crop_center.jpg?v=1672057768',
    },
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2219/4051/files/unstitched_8964d041-3f76-42fc-9c75-1243047f6048_1024x1024_crop_center.jpg?v=1672057753',
    },
  ]);
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    fade: false,
    autoplay: true,
    centerPadding: '1rem',
    responsive: [
      {
        breakpoint: 987,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    speed: 100,
    className: 'w-full h-auto',
    beforeChange: (current, next) => setCurrentIndex(next),
    afterChange: (current) => setCurrentIndex(current),
    customPaging: (i) => (
      <button
        className="!bg-gray-400 rounded-full !w-1 !h-1 mt-4 dot"
        style={{
          outline: i === currentIndex ?  '1px solid black' : 'none',
        }}
      />
    ),
  };
  return (
    <div className="flex justify-center items-center">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="h-full">
            <div class="relative w-full flex items-center justify-center lg:px-4">
              <img
                src={slide.imageUrl}
                class="h-auto w-auto m-auto"
                alt="slide-img"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
