import React, { useState } from "react"
import axios from "axios"
import {
  DescText,
  FlexContainer,
  InnerContainer,
  Input,
  InputContainer,
  MainContainer,
  MobileBtn,
  TeamBtn,
  TitleText,
} from "./InfoElements"
import { toast } from "react-toastify"
import { useMedia } from "../hooks"

export const Subscribe = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const isMobile = useMedia("(max-width: 768px)")
  const isDesktop = useMedia("(min-width: 768px)")

  const subscribeHandler = (e) => {
    axios
      .put("/api/add-contact", {
        email: newsletterEmail,
      })
      .then((res) => {
        toast.success("🦄 We send you email! Check your email address", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setNewsletterEmail("")
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
    <MainContainer>
      <TeamBtn href="/" target="_blank" rel="noopener noreferrer">
        get your first team
      </TeamBtn>
      <InnerContainer>
        <FlexContainer>
          {isDesktop && (
            <TitleText>
              Subscribe <br /> to our newsletters
            </TitleText>
          )}
          {isMobile && (
            <TitleText>
              Subscribe <br /> to our <br /> newsletters
            </TitleText>
          )}
          <DescText>
            Be aware of all YourLife events and be the first among others to
            receive prizes!
          </DescText>
        </FlexContainer>
        <InputContainer>
          <Input
            placeholder="email"
            type="email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
          />
          <TeamBtn sub onClick={subscribeHandler}>
            Subscribe
          </TeamBtn>
          {isMobile && (
            <MobileBtn href="/" target="_blank" rel="noopener noreferrer">
              subscribe
            </MobileBtn>
          )}
        </InputContainer>
      </InnerContainer>
    </MainContainer>
  )
}
