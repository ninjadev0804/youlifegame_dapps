import React from "react"
import ProgressRow from "./ProgressRow"
import {
  LeftTeamContainer,
  LeftTeamImage,
  TeamPropertiesContainer,
  TeamPropertiesInnerContainer,
  TeamPropertiesTitle,
} from "./styles/LeftTeamElements"
import { leftTeamData } from "./teamData"

const LeftTeam = () => {
  return (
    <LeftTeamContainer>
      <div>
        <LeftTeamImage
          src={require("../../assets/teamsImages/leftTeam/andrade.svg").default}
          alt="first player"
        />

        <LeftTeamImage
          second
          src={require("../../assets/teamsImages/leftTeam/second.svg").default}
          alt="second player"
        />

        <LeftTeamImage
          third
          src={require("../../assets/teamsImages/leftTeam/third.svg").default}
          alt="left"
        />
        <LeftTeamImage
          fourth
          src={require("../../assets/teamsImages/leftTeam/fourth.svg").default}
          alt="left"
        />
        <LeftTeamImage
          fifth
          src={require("../../assets/teamsImages/leftTeam/fifth.svg").default}
          alt="left"
        />
      </div>

      <TeamPropertiesContainer>
        <TeamPropertiesTitle>team properties</TeamPropertiesTitle>
        {leftTeamData.map((item) => (
          <TeamPropertiesInnerContainer key={item.id}>
            <ProgressRow
              attribute={item.attribute}
              iconImage={item.iconImage}
              alt={item.alt}
            />
          </TeamPropertiesInnerContainer>
        ))}
      </TeamPropertiesContainer>
    </LeftTeamContainer>
  )
}

export default LeftTeam
