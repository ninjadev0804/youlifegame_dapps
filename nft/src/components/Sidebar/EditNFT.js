import React, { useEffect, useState } from "react"
import {
  ActionBtn,
  AuctionContainer,
  BottomContainer,
  ButtonsContainer,
  CardContainer,
  DetailsContainer,
  IconImg,
  InnerContainer,
  InnerTitle,
  Input,
  InputLabel,
  NFTImg,
  NftTitle,
  RightContainer,
  SidebarContainer,
  SportTitle,
  StatItem,
  TitleContainer,
  TopHeaderText,
  WeightText,
} from "./styles/SellNFTStyling"
import { CloseButton, SidebarTitle } from "./styles/SidebarStyling"
import { DatePicker, Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { editMarketItem } from "utils/helpers/marketplace"
import { useMoralis } from "react-moralis"
import { editAuctionItems } from "utils/helpers/auction"

const PlayerStat = ({ iconType, weight }) => {
  return (
    <StatItem>
      <IconImg
        src={require(`../../images/account/collection/${iconType}.svg`).default}
      />
      <WeightText>{weight}</WeightText>
    </StatItem>
  )
}

export const EditNFT = ({ options, closeSidebar }) => {
  const [steps, setSteps] = useState(0)
  const [sellPrice, setSellPrice] = useState("")
  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [autoPrice, setAutoPrice] = useState(0)
  const [rate, setRate] = useState(0)
  const { Moralis, user } = useMoralis()

  useEffect(() => {
    setSellPrice("")
  }, [steps])

  useEffect(() => {
    options.status === "MARKETPLACE" ? setSteps(1) : setSteps(2)
  }, [options.status])

  const handleCloseSidebar = () => {
    closeSidebar()
  }

  const handlePriceChange = (e) => {
    setSellPrice(e.target.value)
  }

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value)
  }

  const handleAutoPriceChange = (e) => {
    setAutoPrice(e.target.value)
  }

  const handleRateChange = (e) => {
    setRate(e.target.value)
  }

  const handleStartChange = (value) => {
    if (value !== null) setStartDate(value?._d.getTime())
  }

  const handleEndChange = (value) => {
    if (value !== null) setEndDate(value?._d.getTime())
  }

  const handleMarketEdit = async () => {
    const price = await Moralis.Units.Token(sellPrice, "18")
    const transaction = await Moralis.executeFunction(
      editMarketItem(options.itemId, price),
    )
    await transaction.wait()
    location.reload()
  }

  const editAuctionItem = async () => {
    let transaction
    const period = parseInt((endDate - startDate) / 86400000)
    const value = Moralis.Units.Token(sellPrice, "18")
    console.log(period, value)
    try {
      transaction = await Moralis.executeFunction(
        editAuctionItems(options.itemId, period, value),
      )
      await transaction.wait(3)
    } catch (error) {
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: error.data.message,
      })
    }
  }

  return (
    <SidebarContainer>
      <TitleContainer>
        <SidebarTitle>{options.action[0]}</SidebarTitle>
      </TitleContainer>
      <CardContainer>
        <TopHeaderText>{options.status}</TopHeaderText>
        <InnerContainer>
          <NFTImg src={options.imageUrl} />
          <RightContainer>
            <SportTitle>{options.sport}</SportTitle>
            <NftTitle>{options.playerName}</NftTitle>
            <DetailsContainer>
              {options.personal !== null && (
                <>
                  <PlayerStat iconType="Run" weight={options.personal.speed} />
                  <PlayerStat
                    iconType="Wheel"
                    weight={options.personal.dexterity}
                  />
                  <PlayerStat
                    iconType="Stamina"
                    weight={options.personal.stamina}
                  />
                  <PlayerStat
                    iconType="Stamina"
                    weight={options.personal.dribbling}
                  />
                  <PlayerStat
                    iconType="Stamina"
                    weight={options.personal.dribbling}
                  />
                </>
              )}
            </DetailsContainer>
          </RightContainer>
        </InnerContainer>
      </CardContainer>

      {steps === 1 && (
        <BottomContainer>
          <InnerTitle>Edit on marketplace</InnerTitle>
          <InputLabel>
            Price (YLT)
            <Input
              placeholder="500"
              value={sellPrice}
              onChange={handlePriceChange}
            />
          </InputLabel>
          <ButtonsContainer>
            <ActionBtn onClick={handleCloseSidebar} outlined>
              back
            </ActionBtn>
            <ActionBtn tokenId={options.id} onClick={handleMarketEdit}>
              {options.action[0]}
            </ActionBtn>
          </ButtonsContainer>
        </BottomContainer>
      )}

      {steps === 2 && (
        <AuctionContainer>
          <InnerTitle>Edit on auction</InnerTitle>
          <ButtonsContainer>
            <InputLabel>
              Start Date
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={handleStartChange}
              />
            </InputLabel>
            <InputLabel>
              End Date
              <DatePicker dateFormat="dd/MM/yyyy" onChange={handleEndChange} />
            </InputLabel>
          </ButtonsContainer>
          <InputLabel>
            Price (YLT)
            <Input
              placeholder="500"
              value={sellPrice}
              onChange={handlePriceChange}
            />
          </InputLabel>
          <ButtonsContainer>
            <ActionBtn outlined onClick={handleCloseSidebar}>
              back
            </ActionBtn>
            <ActionBtn onClick={editAuctionItem}>Edit</ActionBtn>
          </ButtonsContainer>
        </AuctionContainer>
      )}
      <CloseButton onClick={handleCloseSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
