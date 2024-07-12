import React from "react"

import {
  AttrBox,
  AttrBoxContainer,
  AttrsBar,
  AttrsValue,
  IconImage,
  MainContainer,
} from "./styles/ProgressRow"

const ProgressRow = ({ attribute, iconImage, alt }) => {
  const attr = Math.floor(attribute / 9)
  let attrsArr

  if (!attr) return null

  if (attr > 1) {
    attrsArr = Array(attr).fill(0)
  }

  return (
    <MainContainer>
      <IconImage src={iconImage} alt={alt} />
      <AttrsBar>
        {attrsArr.map((i, index) => {
          return (
            <AttrBoxContainer key={index}>
              <AttrBox />
            </AttrBoxContainer>
          )
        })}
      </AttrsBar>
      <AttrsValue>{attribute}</AttrsValue>
    </MainContainer>
  )
}

export default ProgressRow
