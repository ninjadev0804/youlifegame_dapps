import styled from "styled-components"
import DT from "../../../static/design-token.json"

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 5.8rem;
  position: relative;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
  }

  @media (max-width: 768px) {
    margin: 0;
    justify-content: center;
  }
`

export const BackgroundLinear = styled.div`
  position: absolute;

  width: 120%;
  height: 157%;
  left: -10%;
  top: -53%;
  opacity: 0.6;

  @media screen and (max-width: 768px) {
    top: -25%;
    height: 110%;
  }
`

export const VSText = styled.p`
  font-size: 58px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  line-height: 250px;
  align-self: flex-start;
  width: 100%;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    line-height: 270px;
    flex: 1;
  }
`
