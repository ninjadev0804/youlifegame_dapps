import styled from "styled-components"

export const CardContainer = styled.div`
  width: 100%;
  height: 20rem;
  background-color: #fff;
  border-radius: 0.3rem;
  padding: 1rem;
  cursor: pointer;
`

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  border-bottom: 1px solid #e5e5e5;
`

export const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`

export const ProfileName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 1rem;
  color: #242424;
`

export const SportContainer = styled.div`
  width: 100%;
  height: 70%;
`

export const SportInnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  .plus-icon {
    margin-right: 0.5rem;
  }
`
export const QuantityText = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #242424;
  position: absolute;
  top: 0;
  left: 0;
  text-transform: uppercase;
`

export const SportTitle = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 600;
`

export const AttrOuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
`

export const AttrBoxContainer = styled.div`
  width: 100%;
  max-width: 8%;
  height: 1rem;
`

export const AttrsBar = styled.div`
  width: 100%;
  height: 15%;
  border-bottom: 1px solid #e5e5e5;
  border-radius: 0.6rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
`

export const AttrBox = styled.span`
  display: block;
  position: absolute;
  width: 0.8rem;
  height: 1.2rem;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  margin-right: 0.5rem;
  /* background-color: green;
  box-shadow: 0 0 0 1px green; */
`

export const AttrsValue = styled.p`
  font-size: 1rem;
  color: #000;
  flex: 1;
  margin-left: 0.5rem;
  text-align: left;
  font-weight: bold;
`

export const TopContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const TopInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
`

export const FiltersBtn = styled.button`
  width: 30%;
  height: 3.5rem;
  background-color: #dedede;
  border-radius: 0.8rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: #242424;
  text-transform: uppercase;
  cursor: pointer;
`

export const CardsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0.5rem;
  position: relative;
  padding-top: 3rem;
`
