import React from "react"
import {
  HeroTitle,
  AbsoluteRight,
  AbsoluteRightText,
  CenterImage,
  EllipsisImage,
  ImageContainer,
  Lenear,
  LenearContainer,
  LenearFlexLeft,
  LenearFlexLeftSecond,
  LenearLeftParagraph,
  LenearLeftSubParagraph,
  LenearSecond,
  ParagraphBNN,
  RectangleImage,
  RightLeftImage,
  SubParagraphBNN,
} from "./HeroElements"

export const HomeTablet = () => {
  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <ImageContainer>
          <CenterImage
            src={require("../../assets/center.png").default}
            alt="Paris"
            width={680}
          />
          <RightLeftImage
            src={require("../../assets/leftRight.png").default}
            alt="Paris"
          />
        </ImageContainer>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40vh",
            marginTop: 150,
            marginBottom: 220,
            letterSpacing: "0.4em",
          }}
        >
          <HeroTitle className="header1">
            PUT THE
            <br /> FUTURE IN
            <br /> YOUR HANDS
          </HeroTitle>

          <AbsoluteRight>
            <div>
              Money from the Player NFT sales is transferred to real teams to
              help support and develop youth sports leagues.
            </div>
            <div style={{ marginTop: 10 }}>
              This unique opportunity provides both Fun & Finances at the same
              time! Live YourLIfe and Earn!
            </div>
          </AbsoluteRight>
        </div>
        <EllipsisImage
          src={require("../../assets/ellipsBlack.png").default}
          alt="Paris"
        />

        <RectangleImage
          width={350}
          height={700}
          src={require("../../assets/Union.svg").default}
        />
      </div>
      <Lenear>
        <LenearFlexLeft>EARN BY INVITING, WATCHING, PLAYING!</LenearFlexLeft>
        <LenearContainer>
          <div>
            <LenearLeftParagraph>
              We are building a Web3 SportsFi platform that encompasses the
              minting of NFTs and unique Watch & Earn Capabilities. A user can
              earn the YourLife token by simply inviting, playing, and watching.
            </LenearLeftParagraph>
          </div>
          <div>
            <LenearLeftSubParagraph>
              To explain further, YourLife is a Multichain ecosystem that
              combines SportsFi with GameFi to create a disruptive Fantasy and
              eSports experience! In YourLife, users will enjoy incentives to
              invite and build their community and teams! Being compensated to
              invite, play, and watch will lead to earning that can be used in
              Your Life for everyday living! It is our goal to become a world
              leader in the Fantasy Sports arena and to help raise Your Life to
              a new level!
            </LenearLeftSubParagraph>
          </div>
        </LenearContainer>
      </Lenear>
      <AbsoluteRightText className="header1">
        Manage your Team/Club on the Blockchain
      </AbsoluteRightText>
      <LenearSecond>
        <LenearFlexLeftSecond>
          <img
            style={{
              width: "100%",
              height: "55%",
              margin: "auto",
              display: "block",
            }}
            src={require("../../assets/centerColumn.png").default}
            alt="Paris"
          />
          <ParagraphBNN className="paragraph">Booster Pack</ParagraphBNN>
          <SubParagraphBNN className="sub_paragraph">
            Boosters are an opportunity for a manager to take the team to the
            next level! By purchasing boosters, managers can obtain tactical
            cards to empover their players.
          </SubParagraphBNN>
        </LenearFlexLeftSecond>
        <LenearFlexLeftSecond>
          <img
            style={{
              width: "100%",
              height: "60%",
              margin: "auto",
              display: "block",
            }}
            src={require("../../assets/about_cards/Pavel_Guzeev.png").default}
            alt="Paris"
          />
          <ParagraphBNN className="paragraph">NFT Players</ParagraphBNN>
          <SubParagraphBNN className="sub_paragraph">
            Each player has been tokenized into one unique NFT on the
            blockchain. Players are constantly growing their careers in our
            advanced AI Simulated games. The more games they play, the more
            their stats improve and so their market value raising!
          </SubParagraphBNN>
        </LenearFlexLeftSecond>
        <LenearFlexLeftSecond>
          <img
            style={{
              width: "100%",
              height: "55%",
              margin: "auto",
              display: "block",
            }}
            src={require("../../assets/arrowPic.png").default}
            alt="Paris"
          />
          <ParagraphBNN className="paragraph">NFT transfer</ParagraphBNN>
          <p
            className="sub_paragraph"
            style={{
              paddingRight: 14,
              paddingLeft: 14,
            }}
          >
            Boosters are an opportunity for a manager to take the team to the
            next level! By purchasing boosters, managers can obtain tactical
            cards to empover their players.
          </p>
        </LenearFlexLeftSecond>
      </LenearSecond>
    </>
  )
}
