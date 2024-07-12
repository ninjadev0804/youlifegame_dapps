import styled, { css } from "styled-components"
import DT from "../../static/design-token.json"

export const InfoContainer = styled.div`
  color: "#191919";
  padding: 0 30px;
  margin-top: 50px;
`

export const Header = styled.p`
  font-weight: bold;
  font-size: 3.625rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    ${({ sub }) =>
      sub &&
      css`
        font-size: 1.8rem;
      `}
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 2.5rem;

    ${({ sub }) =>
      sub &&
      css`
        font-size: 1.5rem;
      `}
  }

  @media screen and (max-width: 768px) {
    font-size: 24px;
    padding: 0;
    margin: 0;
    border-bottom: 2px solid #aaa;
  }
`

export const SpaceBetween = styled.div`
  display: flex;
  align-items: stretch;
  margin: 30px 0 30px 0;
`

export const Column1 = styled.div`
  flex-grow: 2;
  width: 100%;
  display: flex;
  align-items: stretch;
`

export const PlayerColumn = styled.div`
  width: 75%;
  margin-left: 10px;

  @media screen and (max-width: 768px) {
    width: 100%;
    grid-area: 2/3;
    margin: 0;
  }
`

export const PlayerName = styled.p`
  font-size: 24px;
  font-weight: bold;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`

export const PlayerDescription = styled.p`
  font-size: 1rem;
  margin-top: 1.5rem;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 0;
    width: 100%;
    grid-area: 2/3;
  }
`

export const PlayerImg = styled.img`
  min-width: 150px;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 270px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 90%;
  }
`

export const Column2 = styled.div`
  flex-grow: 5;
  width: 100%;
`

export const Column3 = styled.div`
  flex-grow: 5;
  width: 100%;
`
export const Legendary = styled.button`
  background-color: orange;
  color: #000;
  padding: 5px;
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  border: none;
  outline: none;
  height: 30px;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 768px) {
    width: 55%;
    padding: 1px;
    font-size: 0.7rem;
  }
`

export const Img = styled.img`
  width: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const ImgMobile = styled.img`
  @media screen and (min-width: 481px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
`

export const AttrsRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const HealthAttr = styled.p`
  margin-top: 32px;
  padding-right: 20px;

  @media screen and (max-width: 768px) {
    padding-right: 10px;
  }
`

export const HealthIcon = styled.img`
  padding-left: 20px;
  margin-top: 30px;
  height: 50%;

  @media screen and (max-width: 768px) {
    /* padding-left: 30px; */
  }
`

export const WheelIcon = styled.img`
  padding-left: 25px;
  margin-top: -5px;
  height: 50%;
`

export const WheelAttr = styled.p`
  margin-top: 0;
  padding-right: 20px;
`

export const BatteryIcon = styled.img`
  padding-left: 30px;
  margin-top: -5px;
  height: 50%;

  @media screen and (max-width: 768px) {
    padding-left: 33px;
  }
`

export const BatteryAttr = styled.p`
  margin-top: 0;
  padding-right: 20px;

  @media screen and (max-width: 768px) {
  }
`
