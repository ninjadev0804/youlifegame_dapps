import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { carouselImages } from "./data"
import { CaroulseImageEl } from "./styles/CarouselElements"

const SlidingCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      showIndicators={false}
      autoPlay={true}
      infiniteLoop={true}
      stopOnHover={false}
    >
      {carouselImages.map((item) => (
        <div style={{ width: "10%", height: "10%" }} key={item.id}>
          <CaroulseImageEl src={item.img} alt={item.alt} />
          <p>{item.name}</p>
        </div>
      ))}
    </Carousel>
  )
}

export default SlidingCarousel
