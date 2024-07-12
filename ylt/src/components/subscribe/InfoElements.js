import styled, { css } from "styled-components"
import DT from "../../static/design-token.json"

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 3rem;
  padding-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin-bottom: 2rem;
  }
`

export const TeamBtn = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  color: #010606;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  z-index: 1;
  font-weight: bold;
  background-color: #90e040;
  border-radius: 10px;
  font-size: 2rem;
  text-transform: uppercase;
  height: 4rem;
  margin-bottom: 3rem;

  &:hover {
    background-color: #fff;
    border-radius: 8px;
    color: #242424;
  }

  &::after {
    content: "→";
    font-size: 50px;
    font-weight: 400;
  }

  ${({ sub }) =>
    sub &&
    css`
      width: 100%;
      font-size: 1.5rem;
      margin-top: 1rem;
      height: 3rem;
      text-align: center;
      justify-content: center;
      font-weight: 400;

      &::after {
        content: "";
      }
    `}

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    336deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(57, 212, 245, 0.10686281348476889) 50%,
    rgba(144, 224, 64, 1) 100%
  );

  @media screen and (max-width: 768px) {
    height: 80%;
    background: linear-gradient(
      336deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(57, 212, 245, 0.9836135137648809) 50%,
      rgba(144, 224, 64, 1) 100%
    );
  }
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  margin-top: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 0rem;
    width: 100%;
    align-items: flex-start;
  }
`

export const TitleText = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: #242424;
  width: 50%;
  text-transform: uppercase;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    width: 100%;
    margin-top: 0;
  }
`

export const DescText = styled.p`
  font-size: 1.3rem;
  width: 30%;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    width: 100%;
    margin-top: 2rem;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 0;
  }
`

export const Input = styled.input`
  width: 100%;
  height: 3rem;

  &:placeholder-shown {
    font-size: 1.5rem;
    text-transform: uppercase;
    outline: none;
    border: none;
    border-bottom: 3px solid #ccc;
    background-color: transparent;
    color: #242424;
  }

  @media screen and (max-width: 768px) {
    &:placeholder-shown {
      font-size: 1rem;
      border-width: 2px;
    }
  }
`

export const MobileBtn = styled.a`
  text-decoration: none;
  height: 3rem;
  width: 100%;
  color: #010606;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  z-index: 1;
  font-weight: bold;
  background-color: #90e040;
  border-radius: 10px;
  text-transform: uppercase;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`
