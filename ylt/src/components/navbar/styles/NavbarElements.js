import styled, { css } from "styled-components"
import DT from "../../../static/design-token.json"

export const NavbarContainer = styled.nav`
  background: #fff;
  box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.28);
  height: 5rem;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  font-size: 1rem;
  position: sticky;
  top: 1rem;
  z-index: 100;
  width: 98%;
  position: relative;
`

export const LogoContainer = styled.div`
  background-color: #242424;
  width: 150px;
  border-radius: 10px;
  clip-path: polygon(0 0, 100% 0%, 79% 100%, 0% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const NavLogo = styled.img`
  width: 100px;
  margin: 0 30px 0 20px;
`

export const NavText = styled.p`
  font-size: 1.8rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    right: 1.5rem;
  }
`

export const NavLinksContainer = styled.div`
  width: 85%;
  clip-path: polygon(2% 0, 100% 0%, 100% 100%, 0% 100%);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  li {
    list-style-type: none;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavLinkInnerContainer = styled.ul`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 80%;
  }

  @media screen and (max-width: 920px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 6rem;
    list-style-type: none;
    background-color: #242424;
    border-radius: 10px;
  }
`
export const NavLinkInnerContainer1 = styled.ul`
  width: 50%;
  display: none;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    width: 80%;
  }

  @media screen and (max-width: 920px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 6rem;
    list-style-type: none;
    background-color: #242424;
    border-radius: 10px;
  }
`

export const NavLink = styled.a`
  display: flex;
  color: #000;
  text-underline-offset: 4px;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: #d2fa64;
  margin: 0 1rem;

  a {
    text-decoration: underline;
    text-decoration-color: #d2fa64;
    color: #000;
  }

  @media screen and (max-width: 920px) {
    text-decoration: none;
    text-underline-offset: 2px;
    color: #fff;
    padding: 1rem 0;
    :hover {
      text-decoration: underline;
    }
  }
`

export const NavBtn = styled.a`
  background-color: #90e040;
  align-self: center;
  padding: 1rem 3rem;
  border-radius: 8px;
  color: #242424;
  outline: none;
  border: none;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  margin-right: 1rem;
  font-size: 1rem;
  cursor: pointer;

  a {
    text-decoration: none;
  }

  &:hover {
    background-color: #fff;
    border-radius: 8px;
    color: #242424;
  }

  ${({ sub }) =>
    sub &&
    css`
      background-color: #3985f5;
    `}

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    padding: 0.5rem 1.5rem;

    ${({ sub }) =>
      sub &&
      css`
        padding: 0.8rem 2.5rem;
      `}
  }

  @media screen and (max-width: 920px) {
    display: none;
  }
`

export const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #191919;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`

export const StyledFormText = styled.p`
  margin-bottom: 5px;
  color: #fff;
`

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #fff;
  font-weight: bold;
  background: transparent;
  border: none;
  width: 400px;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
    width: 97%;
  }
`

export const Menu = styled.div`
  @media screen and (min-width: 920px) {
    display: none;
  }
  @media screen and (max-width: 920px) {
    width: 100%;
    position: absolute;
    left: 85%;
    transform: translateY(-50%);
    top: 55%;
  }
  @media screen and (max-width: 500px) {
    left: 80%;
  }
`

export const MenuImg = styled.img`
  width: 60px;
  height: 30px;
`

export const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  right: 1rem;
  top: 20%;

  @media screen and (min-width: 481px) {
    display: none;
  }
`
