import React from "react"
import { useMedia } from "../hooks"

import {
  InfoContainer,
  InfoContainerDesc,
  InfoContainerTitle,
  NavBtnLink,
  NetImage,
  SupportFavTeam,
  ViewTeamsBtn,
  CardContainer,
} from "./styles/InfoElements"

import Teams from "./Teams"
import { Slide } from "./Slide"
import { SlideRight } from "./SlideRight"

const TeamsSection = () => {
  const isMobile = useMedia("(max-width: 768px)")

  return (
    <InfoContainer>
      <CardContainer>
        <InfoContainerTitle>
          It's time for your <br /> first game!
        </InfoContainerTitle>
        <InfoContainerDesc>
          Gather your team and get ready to watch them play and earn rewards!
        </InfoContainerDesc>
        <NetImage
          src={require("../../assets/teamsImages/net.svg").default}
          alt="net"
        />
        <Teams />
      </CardContainer>

      <SupportFavTeam>
        <p id={"suport_team"}>
          Support your <br /> favorite team
        </p>
        <NavBtnLink to="/">VIEW ALL TEAMS</NavBtnLink>
      </SupportFavTeam>

      <Slide />
      <SlideRight />

      {isMobile && <ViewTeamsBtn to="/">VIEW ALL TEAMS</ViewTeamsBtn>}
    </InfoContainer>
  )
}

export default TeamsSection
