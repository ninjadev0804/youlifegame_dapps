import React from "react"
import {
  AdsTitle,
  Background,
  CounterBox,
  CounterBoxTitle,
  CounterBoxValue,
  CountersContainer,
  GetRewardsBtn,
  InnerContainer,
  MainContainer,
  TitleText,
  InnerContainer3,
} from "./styles/AdsElements"
import { CarouselAds } from "./CarouselAds"

const Ads = () => {
  return (
    <Background>
      <MainContainer>
        <AdsTitle>
          <TitleText>
            get paid for every second <br /> you are watching ads
          </TitleText>
        </AdsTitle>

        <InnerContainer>
          <CarouselAds />
          <CountersContainer>
            <InnerContainer3>
              <CounterBox>
                <CounterBoxTitle>watch time</CounterBoxTitle>
                <CounterBoxValue>00:12</CounterBoxValue>
              </CounterBox>
              <CounterBox>
                <CounterBoxTitle>coins received</CounterBoxTitle>
                <CounterBoxValue>0,37 YLT</CounterBoxValue>
              </CounterBox>
            </InnerContainer3>
            <GetRewardsBtn href="/">get rewards</GetRewardsBtn>
          </CountersContainer>
        </InnerContainer>
      </MainContainer>
    </Background>
  )
}

export default Ads
