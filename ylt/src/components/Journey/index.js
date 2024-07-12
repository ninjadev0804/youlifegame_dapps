import React from "react"
import {
  BlueBg,
  BlueBg2,
  InnerContainer,
  InnerTitle,
  JourneyImage,
  MainContainer,
  VerticalLine,
} from "./JourneyElements"
import journeyPng from "../../assets/journey.png"
import { useMedia } from "../hooks"
import { journeyData } from "./data"
import InfoBox from "./InfoBox"

import BlueImage from "../../assets/journeyImages/first_circle.png"
import BlueImage2 from "../../assets/journeyImages/second_circle.png"

export const Journey = () => {
  const isMobile = useMedia("(max-width: 768px)")
  return (
    <MainContainer>
      <JourneyImage src={journeyPng} />
      {isMobile && (
        <InnerContainer>
          <InnerTitle>THE JOURNEY</InnerTitle>
          <VerticalLine />
          <BlueBg src={BlueImage} alt="blue_bg" />
          <BlueBg2 src={BlueImage2} alt="blue_bg2" />
          {journeyData.map((item) => (
            <InfoBox
              date={item.date}
              title={item.title}
              description={item.description}
              green={item.green}
              key={item.id}
            />
          ))}
        </InnerContainer>
      )}
    </MainContainer>
  )
}
