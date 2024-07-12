import React from "react"
import { carouselImagesRight } from "./dataImages"
import "./styles/slide.css"
import { SlideImg } from "./styles/StiderElements"

export const SlideRight = () => {
  return (
    <div className="slider_right">
      <div className="slide-track">
        {carouselImagesRight.map((image) => (
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
