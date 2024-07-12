import styled from "styled-components"
import { css } from "styled-components"
import DT from "../../../static/design-token.json"
import { Link } from "react-router-dom"

export const OfferBoxContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 25rem;
  margin-top: 5rem;
  width: 100%;
  margin-bottom: 8rem;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    flex-direction: column;
    margin-bottom: 5rem;

    button {
      width: 70%;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    margin-left: -15px;
    margin-right: -15px;
    flex-direction: column;
    height: 680px;
    margin-bottom: 10rem;

    button {
      width: 90%;
      margin: 0 auto;
      margin-left: 2.5rem;
    }

    a {
      font-size: 1.8rem;
      padding: 1rem 0%;
    }
  }

  @media screen and (max-width: ${DT.breakpoints.xs}) {
    flex-direction: column;
    height: 680px;
    margin-top: 2rem;
    width: 105%;

    button {
      width: 85%;
      margin: 0 auto;
    }
  }
`

export const ResultOfferBoxContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 29rem;
  margin-top: 5rem;
  width: 100%;
  margin-bottom: 8rem;
  background-color: white;
  padding: 15px 0px 50px 15px;
  border-radius: 15px;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    flex-direction: column;
    margin-bottom: 5rem;

    button {
      width: 70%;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    margin-left: -15px;
    margin-right: -15px;
    flex-direction: column;
    height: 680px;
    margin-bottom: 10rem;

    button {
      width: 90%;
      margin: 0 auto;
      margin-left: 2.5rem;
    }

    a {
      font-size: 1.8rem;
      padding: 1rem 0%;
    }
  }

  @media screen and (max-width: ${DT.breakpoints.xs}) {
    flex-direction: column;
    height: 680px;
    margin-top: 2rem;
    width: 105%;

    button {
      width: 85%;
      margin: 0 auto;
    }
  }
`

export const BlankText = styled.p`
  position: absolute;
  top: 40px;
  left: 90px;
  font-size: 60px;
  font-weight: 1000;
  color: white;
  width: 270px;
`
export const BlankImag = styled.img`
  width: 100%;
  margin: 0 15px 0 15px;
  border: 18px solid white;
  border-radius: 10px;
  position: relative;
  background-color: #242424;
`

export const OfferImageContainer = styled.div`
  position: relative;
  width: 70%;

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    width: 110%;
    margin-left: -20px;
    margin-right: -20px;
  }

  @media screen and (max-width: ${DT.breakpoints.xs}) {
    width: 103%;
    margin: 0;
  }
`

export const BgImage = styled.img`
  border-radius: 15px;
  position: absolute;
  top: 0;
  height: 27rem;
  width: 95%;
  background-color: #242424;

  @media screen and (max-width: ${DT.breakpoints.md}) {
    width: 100%;
  }
`

export const OfferImage = styled.img`
  border-radius: 15px;
  position: absolute;
  height: 17rem;
  top: -6.25rem;
  left: -38rem;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 6;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    top: 200px;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    top: 220px;
    height: 14rem;
    left: -30rem;
  }

  @media screen and (max-width: ${DT.breakpoints.md}) {
    top: 400px;
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    top: 430px;
  }
`
export const OfferImage2 = styled.img`
  border-radius: 15px;
  position: absolute;
  height: 17rem;
  top: -3.5rem;
  left: -20rem;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 5;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    top: 220px;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    top: 240px;
    height: 14rem;
    left: -15rem;
  }

  @media screen and (max-width: ${DT.breakpoints.md}) {
    top: 400px;
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    top: 430px;
  }
`
export const OfferImage3 = styled.img`
  border-radius: 15px;
  position: absolute;
  height: 17rem;
  top: -1rem;
  left: -5rem;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 4;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    top: 240px;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    top: 260px;
    height: 14rem;
    left: -2rem;
  }

  @media screen and (max-width: ${DT.breakpoints.md}) {
    top: 400px;
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    top: 430px;
  }
`
export const OfferImage4 = styled.img`
  border-radius: 15px;
  position: absolute;
  height: 17rem;
  top: 3rem;
  left: 30rem;
  right: 20rem;
  bottom: 0;
  margin: auto;
  z-index: 3;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    top: 260px;
    left: 28rem;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    top: 280px;
    height: 14rem;
    left: 21rem;
  }

  @media screen and (max-width: ${DT.breakpoints.md}) {
    top: 400px;
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    top: 430px;
  }
`
export const OfferImage5 = styled.img`
  border-radius: 15px;
  position: absolute;
  height: 17rem;
  top: 6rem;
  left: 32rem;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 2;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    top: 280px;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    top: 300px;
    height: 14rem;
    left: 22rem;
  }

  @media screen and (max-width: ${DT.breakpoints.md}) {
    top: 400px;
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    top: 430px;
  }
`

export const OfferTimerBox = styled.div`
  width: 33%;
  background-color: white;
  border-radius: 15px;
  position: absolute;
  padding: 1rem;
  right: 0;
  height: 27rem;

  @media screen and (max-width: ${DT.breakpoints.xl}) {
    width: 30%;
    margin-left: -13px;
    margin-right: 0px;
  }
  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 32%;
    /* margin-left: -13px;
    margin-right: 0px; */
  }

  @media screen and (max-width: ${DT.breakpoints.sm}) {
    width: 108%;
    top: 400px;
    height: 55%;
    margin-left: -13px;
    margin-right: -14px;
    padding-top: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  @media screen and (max-width: ${DT.breakpoints.xs}) {
    width: 107%;
    top: 400px;
    height: 47%;
    margin-left: -13px;
    margin-right: -14px;
    padding-top: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`

export const OfferTimeTextHeading = styled.div`
  margin: 0rem auto;
  margin-top: 2rem;
  width: 80%;
  text-transform: uppercase;
  color: #242424;
  font-weight: 600;
  text-align: left;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 5px;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 90%;
    font-size: 1.2rem;
    line-height: 1.5rem;
    letter-spacing: 4px;
  }
`

export const OfferTimerDiscountBox = styled.div`
  width: 80%;
  font: 2rem;
  background-color: #444;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-radius: 12px;
  margin-top: 2rem;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 90%;
  }
`

export const OfferPrice = styled.p`
  font-size: 1.5rem;

  ${({ left }) =>
    left &&
    css`
      text-align: center;
      text-decoration: line-through;
      color: #a3a3a3;
      padding-left: 1rem;
    `}

  ${({ center }) =>
    center &&
    css`
      font-size: 2.2rem;
      text-align: center;
      color: #3985f5;
      font-size: 64px;
      line-height: 72px;
      font-weight: 700;
      margin-top: 20px;
    `}

  ${({ right }) =>
    right &&
    css`
      width: 20%;
      text-align: center;
      font-size: 18px;
      color: #242424;
      background-color: #90e040;
      border-radius: 8px;
      padding: 0.2rem;
    `}

    @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 14rem;
  }
`

export const OfferBgImage = styled.img`
  border-radius: 15px;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 0;
`

export const NavBtn = styled.button`
  border-radius: 5px;
  outline: none;
  border: none;
  position: relative;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  width: 60%;
  justify-content: center;
  z-index: 2;
`

export const OfferTimerInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem 1rem;

  span {
    color: #242424;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }

  p {
    color: #242424;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-top: 5px;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    span {
      font-size: 2rem;
    }
  }
`

export const NavBtnLink = styled(Link)`
  border-radius: 8px;
  background: #e12626;
  white-space: nowrap;
  padding: 10px 30px;
  width: 100%;
  text-transform: uppercase;
  color: #fff;
  font-size: 1.2rem;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  text-align: center;
  &:hover {
    transition: all 0.2 ease-in-out;
    background: #fff;
    color: #010606;
  }
`
