import React from "react"
import {
  HeroTitle,
  AbsoluteRight,
  HeroContainer,
  HeroContent,
  HeroTextContainer,
  Lenear,
  LenearFlexLeft,
  NavBtnLink3,
  RectangleImage,
  LenearTextContainer,
  HeroImageContainer,
  SignUpWaiting,
} from "./HeroElements"
import NetImg from "../../assets/heroImages/net.svg"
import { HeroImages } from "./HeroImages"

const HeroSection = () => {
  return (
    <HeroContainer id="home">
      <>
        <HeroContent>
          <HeroTextContainer>
            <HeroTitle>PLAY YOUR GAME!</HeroTitle>
            <AbsoluteRight>
              <div>
                Your Stats, Your Team, Your Game. <br />
                Own it! It's YourLIfe.
              </div>
              <div className="second-row">
                Play-to-Earn Global NFT Fantasy Sports Game. Connect. <br />{" "}
                Play, Watch, Earn. Shop.
              </div>
            </AbsoluteRight>
            <NavBtnLink3
              join={true}
              to="https://discord.com/invite/8hB3Zb4ZDX"
              duration={500}
              exact="true"
              target="_blank"
            >
              Join Our Discord
            </NavBtnLink3>
          </HeroTextContainer>

          <HeroImageContainer>
            <HeroImages />
          </HeroImageContainer>
        </HeroContent>

        <RectangleImage width={750} height={700} src={NetImg} />

        <Lenear>
          <LenearFlexLeft className="header1">
            EARN BY INVITING, <br /> WATCHING, PLAYING!
          </LenearFlexLeft>
          <LenearTextContainer>
            We are building a Web3 SportsFi platform that encompasses the
            minting of NFTs and unique Watch & Earn Capabilities. A user can
            earn the YourLife token by simply inviting, playing, and watching.
          </LenearTextContainer>
        </Lenear>

        <SignUpWaiting>
          <NavBtnLink3 firstteam={true}>GET YOUR FIRST TEAM</NavBtnLink3>
        </SignUpWaiting>
      </>
    </HeroContainer>
  )
}

export default HeroSection
