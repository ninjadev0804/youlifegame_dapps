import React from "react"
import {
  InfoBoxContainer,
  InfoBoxDate,
  InfoBoxDesc,
  InfoBoxTitle,
} from "./styles/InfoBoxStyles"

const InfoBox = ({ date, title, description, green }) => {
  return (
    <InfoBoxContainer green={green}>
      <InfoBoxDate>{date}</InfoBoxDate>
      <InfoBoxTitle>{title}</InfoBoxTitle>
      <InfoBoxDesc>{description}</InfoBoxDesc>
    </InfoBoxContainer>
  )
}

export default InfoBox
