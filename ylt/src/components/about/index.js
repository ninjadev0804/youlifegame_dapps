import React from "react"
import ProgressRow from "../teams/ProgressRow"
import { TeamPropertiesInnerContainer } from "../teams/styles/LeftTeamElements"
import { rightTeamData } from "../teams/teamData"
import {
  Header,
  Img,
  InfoContainer,
  SpaceBetween,
  Column1,
  Column2,
  Legendary,
  PlayerImg,
  PlayerName,
  PlayerDescription,
  PlayerColumn,
  Column3,
} from "./InfoElements"
import "./style.css"

const InfoSection = () => {
  return (
    <InfoContainer id={"about"}>
      <Header>ABOUT CARDS</Header>
      <Img
        src={require("../../assets/about_cards/v2/hrdevided.png").default}
        alt="left"
      />
      <SpaceBetween>
        <Column1>
          <Legendary>legendary</Legendary>
          <PlayerColumn>
            <PlayerName>MAKENZIE MANNING</PlayerName>
            <PlayerDescription>
              Each player is unique and has their own characteristics. Depending
              on the rarity of the card, the player receives a different level
              of athletic skills and abilities.
            </PlayerDescription>
          </PlayerColumn>
        </Column1>

        <Column2>
          <PlayerImg
            src={
              require("../../assets/teamsImages/rightTeam/manning.svg").default
            }
            alt="manning"
          />
        </Column2>
        <Column3>
          <Header sub={true}>PROPERTIES</Header>
          {rightTeamData.map((item) => (
            <TeamPropertiesInnerContainer key={item.id}>
              <ProgressRow
                attribute={item.attribute}
                iconImage={item.iconImage}
                alt={item.alt}
              />
            </TeamPropertiesInnerContainer>
          ))}
        </Column3>
      </SpaceBetween>
    </InfoContainer>
  )
}

export default InfoSection
