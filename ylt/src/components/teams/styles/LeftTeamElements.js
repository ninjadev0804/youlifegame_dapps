import styled, { css } from "styled-components"

export const LeftTeamContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const LeftTeamImage = styled.img`
  width: 260px;
  height: 330px;
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;

  ${({ second }) =>
    second &&
    css`
      width: 240px;
      height: 300px;
      position: absolute;
      top: 15px;
      left: 101px;
      z-index: 4;
    `}

  ${({ third }) =>
    third &&
    css`
      width: 235px;
      height: 270px;
      position: absolute;
      top: 30px;
      left: 192px;
      z-index: 3;
    `}

	${({ fourth }) =>
    fourth &&
    css`
      width: 230px;
      height: 240px;
      position: absolute;
      top: 45px;
      left: 282px;
      z-index: 2;
    `}

	${({ fifth }) =>
    fifth &&
    css`
      width: 210px;
      height: 210px;
      position: absolute;
      top: 55px;
      left: 371px;
      z-index: 1;
    `}

		@media screen and (max-width: 768px) {
    width: 170px;
    height: 190px;
    top: 50px;
    left: 0px;

    ${({ second }) =>
      second &&
      css`
        width: 125px;
        height: 160px;
        position: absolute;
        top: 82px;
        left: 25px;
        z-index: 4;
      `}

    ${({ third }) =>
      third &&
      css`
        width: 120px;
        height: 150px;
        position: absolute;
        top: 95px;
        left: 27px;
        z-index: 3;
      `}

	${({ fourth }) =>
      fourth &&
      css`
        width: 110px;
        height: 140px;
        position: absolute;
        top: 110px;
        left: 35px;
        z-index: 2;
      `}

	${({ fifth }) =>
      fifth &&
      css`
        width: 100px;
        height: 130px;
        position: absolute;
        top: 125px;
        left: 40px;
        z-index: 1;
      `}
  }
`

export const TeamPropertiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 22rem;
  height: 50%;

  @media screen and (max-width: 768px) {
    margin-top: 17rem;
    margin-left: 20px;
  }
`

export const TeamPropertiesTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
  }
`

export const TeamPropertiesInnerContainer = styled.div`
  margin-bottom: 1rem;

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`
