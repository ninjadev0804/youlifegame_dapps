import styled from "styled-components"
import DT from "../../../static/design-token.json"

export const MainContainer = styled.div`
  width: 100%;
  background-color: #e7e7e8;
  position: relative;
  padding-bottom: 1rem;
`

export const Background = styled.div`
  width: 100%;
  margin-top: 10rem;
  margin-bottom: 3rem;

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    margin-bottom: 1rem;
  }
`

export const TitleText = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  padding: 1rem 0;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 2rem;
    padding: 1rem 2.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }

  @media screen and (max-width: 640px) {
    font-size: 14px;
  }
`

export const AdsTitle = styled.div`
  height: 20%;
  width: 75%;
  align-items: center;
  background-color: #e7e7e8;
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  clip-path: polygon(
    10% 0%,
    0% 0%,
    100% 0%,
    90% 0%,
    100% 100%,
    100% 100%,
    0% 100%,
    0% 100%
  );

  @media screen and (max-width: 768px) {
    height: 15%;
    top: -15%;
  }
`

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 0.3rem;
  height: 100%;
  width: 95%;
  margin: 0 auto;

  @media screen and (min-width: 1600px) {
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 0 5px;
    flex-direction: column;
  }
`

export const CarouselContainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1rem;
  position: relative;
  margin: 1.5rem 0 0.5rem 0;

  .text {
    font-size: 3rem !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    opacity: 1 !important;
    background: none !important;
    bottom: 20px !important;
  }

  @media screen and (min-width: ${DT.breakpoints.xl2}) {
    width: 75%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100%;

    .text {
      font-size: 1rem !important;
    }

    li {
      width: 10px !important;
    }
  }
`

export const CarouselImage = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;

  @media screen and (min-width: ${DT.breakpoints.xl2}) {
    height: 31.5rem;
    object-fit: fill;
  }

  @media screen and (max-width: ${DT.breakpoints.xl2}) {
    height: 30rem;
    object-fit: fill;
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    height: 13rem;
    object-fit: cover;
  }
`

export const CountersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 80%;

  @media screen and (min-width: ${DT.breakpoints.xl2}) {
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`

export const CounterBox = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin-left: 2rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  -webkit-box-shadow: 0px 0px 15px 6px rgba(101, 101, 101, 0.6);
  box-shadow: 0px 0px 15px 6px rgba(101, 101, 101, 0.6);
  @media screen and (max-width: 768px) {
    margin: 0.5rem 1rem;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    height: 100%;

    &:nth-child(1) {
      margin: 0;
    }
  }
`

export const CounterBoxTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin-top: 1rem;
  }
`

export const CounterBoxValue = styled.p`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-top: 1.5rem;
  color: #90e040;
  margin-bottom: 1rem;

  @media screen and (max-width: 878px) {
    font-size: 40px;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 0;
  }
`

export const InnerContainer3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    margin: 1rem 0;
  }
  @media screen and (max-width: 640px) {
    width: 95%;
    margin: 1rem auto;
  }
`
export const GetRewardsBtn = styled.a`
  width: 100%;

  background: #90e040;
  padding: 1rem 1.5rem;
  text-align: center;
  border-radius: 1rem;
  margin-left: 2rem;
  text-transform: uppercase;
  font-size: 1rem;
  text-decoration: none;
  color: #242424;

  @media screen and (max-width: 768px) {
    width: 95%;
    margin: auto;
  }
`
