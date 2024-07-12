import React from "react"
import { carouselImages } from "./dataImages"
import "./styles/slide.css"
import { SlideImg } from "./styles/StiderElements"

export const Slide = () => {
  return (
    <div className="slider-support">
      <div className="slide-track">
        {carouselImages.map((image) => (
          <div className="slide" key={image.id}>
            <a href={image.url} target="_blank" rel="noopener noreferrer">
              <SlideImg src={image.img} alt={image.alt} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
