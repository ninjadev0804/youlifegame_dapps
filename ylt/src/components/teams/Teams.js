import React from "react"
import LeftTeam from "./LeftTeam"
import { TeamContainer, VSText } from "./styles/TeamElements"
import RightTeam from "./RightTeam"

const Teams = () => {
	return (
		<>
			<TeamContainer>
				<LeftTeam />
				<VSText>VS</VSText>
				<RightTeam />
			</TeamContainer>
		</>
	)
}

export default Teams
