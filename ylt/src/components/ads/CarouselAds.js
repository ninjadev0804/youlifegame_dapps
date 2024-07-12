import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

import soccer from "../../assets/adsImages/soccer.jpg"
import basketball from "../../assets/adsImages/basketball.jpg"
import handball from "../../assets/adsImages/handball.jpg"
import { CarouselContainer, CarouselImage } from "./styles/AdsElements"

export const CarouselAds = () => {
  const indicatorStyles = {
    backgroundColor: "#ccc",
    width: "20px",
    height: "10px",
    margin: "0 5px",
    borderRadius: "30%",
    display: "inline-block",
    transition: "all 0.3s ease",
  }
  return (
    <CarouselContainer>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        showIndicators={true}
        aytoPlay={true}
        infiniteLoop={true}
        stopOnHover={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{ ...indicatorStyles, background: "#b9fd02" }}
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            )
          }
          return (
            <li
              style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          )
        }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <CarouselImage src={soccer} alt="soccer" />
          <p className="legend text">Youtube</p>
        </div>
        <div>
          <CarouselImage src={basketball} alt="basketball" />
          <p className="legend text">Twitch</p>
        </div>
        <div>
          <CarouselImage src={handball} alt="handball" />
          <p className="legend text">Twitch</p>
        </div>
      </Carousel>
    </CarouselContainer>
  )
}
