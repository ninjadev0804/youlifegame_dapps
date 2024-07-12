import styled from "styled-components"

export const MainContainer = styled.div`
  width: 100vw;
  position: relative;

  video {
    width: 100%;
  }

  @media screen and (min-width: 1600px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    /* margin-top: 7rem; */

    video {
      display: none;
    }
  }
`

export const JourneyImage = styled.img`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const InnerContainer = styled.div`
  padding: 0 1rem;
  position: relative;
`

export const InnerTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 1rem;
`

export const VerticalLine = styled.div`
  border-left: 2px dashed #90e040;
  height: 80%;
  position: absolute;
  left: 50%;
  margin-left: -3px;
  top: 5rem;
  z-index: -1;
`

export const BlueBg = styled.img`
  position: absolute;
  opacity: 1;
  z-index: -1;

  @media screen and (max-width: 768px) {
    top: 10%;
    right: 0;
  }
`

export const BlueBg2 = styled.img`
  position: absolute;
  opacity: 0.8;
  z-index: -1;

  @media screen and (max-width: 768px) {
    top: 65%;
    left: 0;
  }
`
