import React from "react"
import ProgressRow from "./ProgressRow"
import {
  RightTeamContainer,
  RightTeamImage,
  TeamPropertiesContainer,
  TeamPropertiesInnerContainer,
  TeamPropertiesTitle,
} from "./styles/RightTeamElements"
import { rightTeamData } from "./teamData"

const RightTeam = () => {
  return (
    <RightTeamContainer>
      <div>
        <RightTeamImage
          src={
            require("../../assets/teamsImages/rightTeam/manning.svg").default
          }
          alt="first player"
        />
        <RightTeamImage
          second
          src={require("../../assets/teamsImages/rightTeam/second.svg").default}
          alt="second player"
        />
        <RightTeamImage
          third
          src={require("../../assets/teamsImages/rightTeam/third.svg").default}
          alt="third player"
        />
        <RightTeamImage
          fourth
          src={require("../../assets/teamsImages/rightTeam/fourth.svg").default}
          alt="fourth player"
        />
        <RightTeamImage
          fifth
          src={require("../../assets/teamsImages/rightTeam/fifth.svg").default}
          alt="fifth player"
        />
      </div>

      <TeamPropertiesContainer>
        <TeamPropertiesTitle>team properties</TeamPropertiesTitle>
        {rightTeamData.map((item) => (
          <TeamPropertiesInnerContainer key={item.id}>
            <ProgressRow
              attribute={item.attribute}
              iconImage={item.iconImage}
              alt={item.alt}
            />
          </TeamPropertiesInnerContainer>
        ))}
      </TeamPropertiesContainer>
    </RightTeamContainer>
  )
}

export default RightTeam
