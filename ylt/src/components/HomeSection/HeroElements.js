import styled, { css } from "styled-components"
import DT from "../../static/design-token.json"

export const HeroContainer = styled.div`
  align-items: stretch;
  background-color: #fff;
  padding: 0 30px;
  width: 100%;
  z-index: 1;
  position: relative;

  @media screen and (max-width: 768px) {
    padding: 0 5px;
  }
`

export const HeroContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 1160px) {
    display: block;
  }
`

export const RectangleImage = styled.img`
  position: absolute;
  right: 0;
  z-index: 1;
  opacity: 0.6;
  top: 0;

  @media screen and (max-width: 1160px) {
    right: 15rem;
    top: 10rem;
  }

  @media screen and (max-width: 768px) {
    right: 2rem;
    top: 10rem;
  }
`

export const HeroTextContainer = styled.div`
  position: relative;
  z-index: 10;
  flex-grow: 4;
  margin-left: 10rem;
  margin-top: 5rem;
  width: 100%;

  @media screen and (max-width: 1160px) {
    margin-left: 0;
    text-align: center;
  }
`

export const HeroTitle = styled.p`
  font-size: 4rem;
  font-weight: bold;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 3rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`

export const AbsoluteRight = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  z-index: 10;
  width: 100%;
  margin-top: 1rem;

  .second-row {
    margin-top: 20px;
  }

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 1rem;
    margin-top: 0;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 2px;

    .first-row {
      width: 100%;
    }

    .second-row {
      width: 100%;
      margin-top: 10px;
      font-size: 14px;
    }
  }
`

export const SignUpWaiting = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  background-color: #90e040;

  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavBtnLink3 = styled.a`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 1.2rem;
	align-items: center;
	color: #010606;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	z-index: 1;
	font-weight: bold;
	background-color: #90e040;
	border-radius: 10px;
	font-size: 2rem;
	text-transform: uppercase;
	height: 4rem;
	width: 100%;

	&:hover {
		background-color: #fff;
		border-radius: 8px;
		color: #242424;
	}

	${({ join }) =>
    join &&
    css`
      margin-top: 2rem;
      width: 45%;
      font-weight: 400;
      font-size: 1rem;

      a {
        text-decoration: none;
        color: #242424;
        text-align: center;
      }
    `}

	${({ firstteam }) =>
    firstteam &&
    css`
      font-size: 2rem;
      text-transform: uppercase;
      width: 100%;
      height: 100%;

      &::after {
        content: "→";
        font-size: 50px;
        font-weight: 400;
      }
    `}

	@media screen and (max-width: 1160px) {
		width: 80%;
		margin: 1rem auto;
		text-align: center;
		display: block;
		font-size: 30px;
	}

	@media screen and (max-width: ${DT.breakpoints.lg}) {
		${({ firstteam }) => firstteam && css``}

	@media screen and (max-width: 768px) {
		${({ join }) =>
      join &&
      css`
        width: 80%;
        margin-top: 1rem;
        justify-content: center;
        text-transform: uppercase;
        font-size: 20px;
        padding: 1rem;
      `}

		${({ firstteam }) =>
      firstteam &&
      css`
        font-size: 20px;
        margin-top: 1rem;
        height: 4rem;
        justify-content: center;
        align-items: center;

        &::after {
          content: "→";
          font-size: 40px;
          font-weight: 400;
          height: 3.5rem;
          margin-left: 1rem;
        }
      `}
	}
`

export const Lenear = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-radius: 10px;
  background: rgb(144, 224, 64);
  background: linear-gradient(
    336deg,
    rgba(144, 224, 64, 1) 0%,
    rgba(57, 212, 245, 0.5) 50%,
    rgba(57, 133, 245, 0.5) 100%
  );
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin: 0 auto;
  margin-top: 10rem;
  -webkit-box-shadow: 0px 5px 9px 7px rgba(167, 167, 167, 0.67);
  box-shadow: 0px 5px 9px 7px rgba(167, 167, 167, 0.67);

  @media screen and (max-width: 1160px) {
    margin-top: 33rem;
  }

  @media screen and (max-width: 768px) {
    height: 100%;
  }
`

export const LenearFlexLeft = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 3.5rem;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 34px;
    width: 70%;
    text-align: left;
    margin-top: 0;
  }
`

export const ArrowImage = styled.img`
  width: 70px;
  height: 50px;
`

export const LenearTextContainer = styled.p`
  width: 50%;
  margin: 0 auto;
  margin-top: 1rem;
  font-size: 20px;
  text-align: center;

  @media screen and (max-width: ${DT.breakpoints.lg}) {
    font-size: 1rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
    width: 90%;
    text-align: left;
    margin: 0;
    line-height: 20px;
    letter-spacing: 1px;
  }
`

export const HeroImageContainer = styled.div`
	width: 100%;
	position: relative;
	flex-grow: 6;
	height: 100%;
	margin-bottom: 5rem;
	

	.image {
		position: absolute;
		top: -100px;
		right: 100px;
		left: 20px;
		z-index: 5;
	}

	@media screen and (max-width: 1440px) {
		flex-grow: 5;
	}
	
	@media screen and (max-width: 1160px) {
		img {
			width: 25rem;
			height: 25rem;
		}
		.image {
			top: 0;
			margin: auto;
		}
	}

	@media screen and (max-width: 1024px}) {
		.image {
			position: absolute;
			top: 4rem;
			right: 2.25rem;
			z-index: 5;
		}

	@media screen and (max-width: ${DT.breakpoints.lg}) {
		.image {
			position: absolute;
			top: 10rem;
			right: 2.25rem;
			z-index: 5;
		}

`

export const NetImage = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  width: 350px;
  height: 350px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`
