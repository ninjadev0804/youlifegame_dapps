import React from "react"
import {
  FooterContainer,
  FooterInnerContainer,
  LogoContainer,
  NavLink,
  NavLogo,
} from "./FooterEl"
import navbar_logo from "../../assets/yourlife_white.png"
import { navbarLinks } from "../navbar/navbarData"

const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <NavLogo src={navbar_logo} alt="ylt_logo" />
      </LogoContainer>
      <FooterInnerContainer>
        {navbarLinks.map((item) => (
          <li key={item.id}>
            {!item.authenticate && (
              <NavLink
                href={item.to}
                duration={500}
                exact="true"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt="marketplace_logo"
                    style={{ marginRight: "5px" }}
                  />
                )}

                {item.name}
              </NavLink>
            )}
          </li>
        ))}
      </FooterInnerContainer>
    </FooterContainer>
  )
}

export default Footer
