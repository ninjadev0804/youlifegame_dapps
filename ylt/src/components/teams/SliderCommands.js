import React from "react"
import { useMedia } from "../hooks"
import { SliderImg } from "./Slider"
import "./styles/slider.css"

const SliderCommands = () => {
  const isMobile = useMedia("(max-width: 768px)")
  const settingsWeb = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: -1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    touchMove: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          variableWidth: true,
        },
      },
    ],
  }

  const settingsWeb2 = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    touchMove: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: -3,
          infinite: true,
          dots: false,
          variableWidth: true,
        },
      },
    ],
  }
  return (
    <div style={{ marginTop: 40 }}>
      <SliderImg settingsWeb={settingsWeb} />
      <SliderImg settingsWeb={settingsWeb2} />
      {isMobile && <SliderImg settingsWeb={settingsWeb} />}
    </div>
  )
}

export default SliderCommands
