import styled from "styled-components"
import DT from "../../../static/design-token.json"

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const IconImage = styled.img`
  /* flex: 1; */
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;

  @media screen and (max-width: 768px) {
    width: 0.5rem;
    height: 0.5rem;
    margin-right: 0.2rem;
  }
`

export const AttrsBar = styled.div`
  width: 100%;
  height: 0.65rem;
  border-bottom: 6px solid #aaa;
  border-radius: 8px;
  flex: 4;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  @media screen and (max-width: 768px) {
    height: 0.2rem;
  }
`

export const AttrBoxContainer = styled.div`
  width: 100%;
  max-width: 8%;
  height: 1rem;
  margin-right: 0.2rem;
`

export const AttrBox = styled.span`
  display: block;
  position: absolute;
  background-color: blue;
  width: 1.2rem;
  height: 0.8rem;
  margin-right: 1rem;
  border-radius: 2px;
  transform: skewX(200deg);
  opacity: 1;
  box-shadow: 0px 0px 12px rgba(47, 105, 225, 0.6);

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 1rem;
    height: 0.6rem;
  }

  @media screen and (max-width: 768px) {
    height: 0.7rem;
    width: 0.5rem;
    top: -0.2rem;
  }
`

export const AttrsValue = styled.p`
  font-size: 1rem;
  color: #000;
  flex: 1;
  margin-left: 0.5rem;
  text-align: left;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 0.5rem;
    margin-left: 1rem;
  }
`
