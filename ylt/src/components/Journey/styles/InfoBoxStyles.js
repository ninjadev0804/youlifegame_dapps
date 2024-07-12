import styled from "styled-components"

export const InfoBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 2px solid #90e040;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 2rem;
  background-color: ${({ green }) => (green ? "#90e040" : "#f1f1f1")};
  z-index: 2;
`

export const InfoBoxDate = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 1rem;
`

export const InfoBoxTitle = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 1rem;
`

export const InfoBoxDesc = styled.p`
  font-size: 0.8rem;
  text-align: left;
`
