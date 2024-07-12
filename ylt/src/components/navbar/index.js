import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { navbarLinks } from "./navbarData"
import { ModalSubscribe } from "./Modal"
import {
  NavbarContainer,
  LogoContainer,
  NavLogo,
  NavLinksContainer,
  NavLink,
  NavBtn,
  NavLinkInnerContainer,
  NavLinkInnerContainer1,
  Menu,
  MenuImg,
} from "./styles/NavbarElements"
import navbar_logo from "../../assets/yourlife_white.png"

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [openMenu, setOpenMenu] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  const handleSubscribe = () => {
    axios
      .put("/api/add-contact", {
        email: newsletterEmail,
      })
      .then((res) => {
        toast.success("🦄 We sent you email! Check your email address", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setNewsletterEmail("")
        setOpen(false)
      })
      .catch((e) =>
        toast.error("🦄 Something wrong try again later!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }),
      )
  }

  return (
    <NavbarContainer>
      <LogoContainer>
        <NavLogo src={navbar_logo} alt="ylt_logo" />
      </LogoContainer>
      <NavLinksContainer>
        <NavLinkInnerContainer>
          {navbarLinks.map((item) => (
            <li key={item.id}>
              {!item.authenticate && (
                <NavLink
                  href={item.url}
                  duration={500}
                  exact="true"
                  target="_blank"
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
        </NavLinkInnerContainer>
      </NavLinksContainer>
      <Menu>
        <p onClick={() => setOpenMenu(!openMenu)}>
          <MenuImg
            src={require("../../assets/heroImages/navIcon.svg").default}
          />
        </p>
      </Menu>
      {openMenu && (
        <NavLinkInnerContainer1>
          {navbarLinks.map((item) => (
            <li key={item.id}>
              <NavLink to={item.to} duration={500} exact="true" target="_blank">
                {item.image && (
                  <img
                    src={item.image}
                    alt="marketplace_logo"
                    style={{ marginRight: "5px" }}
                  />
                )}
                {item.name}
              </NavLink>
              {item.authenticate && (
                <NavLink
                  to={item.to}
                  duration={500}
                  exact="true"
                  target="_blank"
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
        </NavLinkInnerContainer1>
      )}
      <NavBtn sub onClick={onOpenModal}>
        Subscribe
      </NavBtn>
      <NavBtn
        href="https://marketplace.yourlifegames.com/myaccount"
        target="_blank"
        rel="noopener noreferrer"
      >
        Start playing
      </NavBtn>
      <ModalSubscribe
        open={open}
        onCloseModal={onCloseModal}
        newsletterEmail={newsletterEmail}
        setNewsletterEmail={setNewsletterEmail}
        handleSubscribe={handleSubscribe}
      />
    </NavbarContainer>
  )
}
