"use client";
import React from "react";
import Slider, { Settings } from "react-slick";

interface SlidesTemplateProps {
  children: React.ReactNode;
}

/**
 * Simple use of the Slides component
 * @param children - JSX of the slides to be displayed in the Slides with the SlidesSlide component.
 */
const Slides = ({ children }: SlidesTemplateProps) => {
  const settings: Settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  return <Slider {...settings}>{children}</Slider>;
};

export default Slides;
