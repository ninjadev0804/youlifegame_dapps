import Countdown from "react-countdown"
import soccerBg from "../../../images/marketplace/soccerBg.svg"
import {
  BgImage,
  OfferBoxContainer,
  OfferImage,
  OfferImageContainer,
  OfferTimerBox,
  OfferImage2,
  OfferImage3,
  OfferImage4,
  OfferImage5,
  OfferTimeTextHeading,
  OfferPrice,
  BlankImag,
  BlankText,
  OfferTimerInnerBox,
  ResultOfferBoxContainer,
} from "../styles/OfferBoxStyling"
import { CssDiv } from "components/CssStyledComponent/CssStyledComponent"
import { Button } from "antd"
import Carousel from "react-grid-carousel"
import { approve, ownerOf, transferFrom } from "utils/helpers/ylnft721"
import { useMoralis } from "react-moralis"
export const OfferBox = ({ result }) => {
  const { Moralis } = useMoralis()
  const handleOfferBuy = (e) => {
    const tokenData = JSON.parse(e.target.name)
    tokenData.erc721.map(async (item) => {
      await Moralis.executeFunction(
        approve(process.env.REACT_APP_SUPER_ADMIN_WALLET_ADDRESS, item),
      )
      const owner = await Moralis.executeFunction(ownerOf(item))
      await Moralis.executeFunction(
        transferFrom(
          owner,
          process.env.REACT_APP_SUPER_ADMIN_WALLET_ADDRESS,
          item,
        ),
      )
    })
    tokenData.erc1155.map((item) => {})
  }
  return (
    <>
      {result.length > 0 ? (
        <Carousel cols={1} rows={1} gap={10} loop>
          {result.map((item, index) => {
            const d = new Date(item.endAt)
            return (
              <Carousel.Item key={index}>
                <ResultOfferBoxContainer>
                  <OfferImageContainer>
                    <BgImage src={soccerBg} alt="bg image" />
                    <OfferImage src={item.images[0]} alt="offer card" />
                    <OfferImage2 src={item.images[1]} alt="offer card" />
                    <OfferImage3 src={item.images[2]} alt="offer card" />
                    <OfferImage4 src={item.images[3]} alt="offer card" />
                    <OfferImage5 src={item.images[4]} alt="offer card" />
                  </OfferImageContainer>
                  <OfferTimerBox>
                    <OfferTimeTextHeading>{item.name}</OfferTimeTextHeading>
                    <CssDiv
                      backgroundColor="#F3F4F6"
                      padding="10px"
                      borderRadius="8px"
                      mt="20px"
                      mb="20px"
                    >
                      <OfferPrice right="true">-{item.discount}%</OfferPrice>
                      <OfferPrice center="true">
                        $
                        {item.fullPrice -
                          Math.floor((item.fullPrice * item.discount) / 100)}
                      </OfferPrice>
                      <OfferPrice left="true">{item.fullPrice}</OfferPrice>
                      <hr
                        style={{ width: "90%", margin: "10px auto 0px auto" }}
                      />
                      <OfferTimerInnerBox>
                        <Countdown date={d.getTime()} />
                        <p>until the end of the promotion</p>
                      </OfferTimerInnerBox>
                    </CssDiv>
                    <Button
                      name={item.tokenData}
                      onClick={handleOfferBuy}
                      type="primary"
                      block
                    >
                      BUY
                    </Button>
                  </OfferTimerBox>
                </ResultOfferBoxContainer>
              </Carousel.Item>
            )
          })}
        </Carousel>
      ) : (
        <OfferBoxContainer>
          <BlankImag src={"/empty_nft.png"} alt="bg image" />
          <BlankText>COMMING SOON NEW OFFERS!</BlankText>
        </OfferBoxContainer>
      )}
    </>
  )
}
