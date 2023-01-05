import React, { useState, useEffect, useRef } from "react";
import Slider  from "react-slick";

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow] = useState(4);
  const [autoplaySpeed] = useState(2000);
  const [slides] = useState([
    { imageUrl: "https://images.pexels.com/photos/1252873/pexels-photo-1252873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    { imageUrl: "https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    { imageUrl: "https://images.pexels.com/photos/1716158/pexels-photo-1716158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    { imageUrl: "https://images.pexels.com/photos/577584/pexels-photo-577584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" },
    { imageUrl: "https://images.pexels.com/photos/262738/pexels-photo-262738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }
  ]);
  const settings = {
    
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight:true,
    fade: false,
    autoplay: true,
    centerPadding: '1rem',
    speed: 100,
    className:'w-full h-auto',
    beforeChange: (current, next) => setCurrentIndex(next),
    afterChange: current => setCurrentIndex(current),
    customPaging: i => (
        <button
          className="!bg-red-500 rounded-full !w-3 !h-3 mt-4 hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-800"
          style={{
            opacity: i === currentIndex ? "1" : "0.3",
            outline: "none"
          }}
        />
      )
  }
   return (
    <div className="flex justify-center items-center mx-4 overflow-x-clip">
    <Slider {...settings}>
    {slides.map((slide, index) => (
        <div
      
          key={index}
          className="h-full"
          
          
        >
          <div className="bg-center bg-cover h-full" style={{backgroundImage:`url(${slide.imageUrl})` }}></div>
        </div>

      ))}
        </Slider>
    </div>
   );
};

export default ImageCarousel;
