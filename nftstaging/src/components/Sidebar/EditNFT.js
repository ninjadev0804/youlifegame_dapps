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
  DateContainer,
  AntInput,
  AnttLabel,
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
import { DatePicker, Modal, Form } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { editMarketItem } from "utils/helpers/marketplace"
import { useMoralis } from "react-moralis"
import { editAuctionItems } from "utils/helpers/auction"
import { LoadingSpin } from "components/common/LoadingSpin"

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
  const { Moralis, user } = useMoralis()
  const [isLoading, setLoading] = useState(false)

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

  const handleStartChange = (value) => {
    if (value !== null) setStartDate(value?._d.getTime())
  }

  const handleEndChange = (value) => {
    if (value !== null) setEndDate(value?._d.getTime())
  }

  const handleMarketEdit = async () => {
    setLoading(true)
    try {
      const price = Moralis.Units.Token(sellPrice, "18")
      const transaction = await Moralis.executeFunction(
        editMarketItem(options.itemId, price),
      )
      await transaction.wait()
      location.reload()
    } catch (error) {
      setLoading(false)
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: error.message ? error.message : error.data.message,
      })
    }
  }

  const editAuctionItem = async () => {
    setLoading(true)
    try {
      let transaction
      const period = parseInt((endDate - startDate) / 86400000)
      const value = Moralis.Units.Token(sellPrice, "18")
      transaction = await Moralis.executeFunction(
        editAuctionItems(options.itemId, period, value),
      )
      await transaction.wait()
      location.reload()
    } catch (error) {
      setLoading(false)
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: error.message ? error.message : error.data.message,
      })
    }
  }

  const checkPrice = (e, value) => {
    if (value > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(e.field + ' must be greater than zero!'));
  };

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
        <Form name="marketplace_form" layout="vertical" onFinish={handleMarketEdit} requiredMark={false}>
          <BottomContainer>
            <InnerTitle>Edit on marketplace</InnerTitle>
            <Form.Item name="Price (YLT)" label={<AnttLabel>Price (YLT)</AnttLabel>} rules={[{ validator: checkPrice }]}>
              <AntInput placeholder="500" value={sellPrice} onChange={handlePriceChange} />
            </Form.Item>
            <ButtonsContainer>
              <ActionBtn onClick={handleCloseSidebar} outlined>back</ActionBtn>
              <ActionBtn tokenId={options.id} active>{options.action[0]}</ActionBtn>
            </ButtonsContainer>
          </BottomContainer>
        </Form>
      )}

      {steps === 2 && (
        <Form name="aution_form" layout="vertical" onFinish={editAuctionItem} requiredMark={false}>
          <AuctionContainer>
            <InnerTitle>Edit on auction</InnerTitle>
            <DateContainer>
              <Form.Item name="start_date" style={{ width: "100%" }} label={<AnttLabel>Start Date</AnttLabel>} rules={[{ type: 'object', required: true, message: 'Please select Start Date!', }]}>
                <DatePicker dateFormat="dd/MM/yyyy" onChange={handleStartChange} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="end_date" style={{ width: "100%" }} label={<AnttLabel>End Date</AnttLabel>} rules={[{ type: 'object', required: true, message: 'Please select End Date!', }]}>
                <DatePicker dateFormat="dd/MM/yyyy" onChange={handleEndChange} style={{ width: "100%" }} />
              </Form.Item>
            </DateContainer>
            <Form.Item name="Price (YLT)" label={<AnttLabel>Price (YLT)</AnttLabel>} rules={[{ validator: checkPrice }]}>
              <AntInput placeholder="500" value={sellPrice} onChange={handlePriceChange} />
            </Form.Item>
            <ButtonsContainer>
              <ActionBtn outlined onClick={handleCloseSidebar}>back</ActionBtn>
              <ActionBtn active>Edit</ActionBtn>
            </ButtonsContainer>
          </AuctionContainer>
        </Form>
      )}

      {isLoading && <LoadingSpin tip="Loading..." />}
      <CloseButton onClick={handleCloseSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
