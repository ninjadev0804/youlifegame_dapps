import { Link } from "react-router-dom"
import styled from "styled-components"

export const InfoContainer = styled.div`
  position: relative;
  height: 100%;
`

export const InfoContainerTitle = styled.p`
  font-size: 58px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: #000;
  padding-top: 3rem;

  @media screen and (max-width: 768px) {
    font-size: 32px;
    text-align: center;
    margin: 0 auto;
    padding-top: 0rem;
    padding-left: 0.5rem;
  }
`

export const InfoContainerDesc = styled.p`
  font-size: 24px;
  margin: 0 auto;
  margin-top: 1.5rem;
  text-align: center;
  width: 45%;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    text-align: center;
    margin: 0 auto;
    width: 70%;
    padding-top: 0rem;
    padding-left: 0.5rem;
  }
`

export const NetImage = styled.img`
  width: 42.5rem;
  z-index: 1;
  position: absolute;
  left: 27%;
  top: 12%;

  @media screen and (max-width: 768px) {
    width: 33rem;
    left: -7%;
    top: 0;
  }
`

export const NavBtnLink = styled(Link)`
  margin-top: 0px;
  border-radius: 8px;
  margin-right: 0px;
  align-self: flex-end;
  height: 40px;
  background: #b9fd02;
  white-space: nowrap;
  padding: 10px 30px;
  color: #010606;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  width: 380px;
  text-align: center;
  z-index: 1;
  &:hover {
    background-color: #fff;
    border-radius: 8px;
    color: #242424;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const SupportFavTeam = styled.div`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 9rem;
  width: 100%;
  text-align: center;

  p {
    z-index: 1;
    margin-bottom: 1rem;
    margin-top: 30px;
    font-size: 58px;
    font-weight: bold;
    text-transform: uppercase;
  }

  @media screen and (max-width: 768px) {
    p {
      font-size: 45px;
    }
  }
`

export const ViewTeamsBtn = styled(Link)`
  @media screen and (max-width: 768px) {
    background: #90e040;
    padding: 1rem 1.5rem;
    text-align: center;
    text-transform: uppercase;
    font-size: 1rem;
    text-decoration: none;
    border-radius: 1rem;
    position: absolute;
    right: 5rem;
    width: 80%;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0rem;
    z-index: 10;
  }
`

export const CardContainer = styled.div`
  padding: 1rem 0;
  background: linear-gradient(
    90deg,
    rgba(123, 158, 227, 0.9) 0%,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(123, 158, 227, 0.9) 100%
  );
`
