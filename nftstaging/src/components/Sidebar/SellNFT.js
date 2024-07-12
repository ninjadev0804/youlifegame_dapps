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
  AntInput,
  AnttLabel,
  DateContainer,
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
import { minterListedNFT, getMarketFee } from "utils/helpers/marketplace"
import { MinterListNFT } from "utils/helpers/auction"
import { approve } from "utils/helpers/ylnft721"
import { approve as approveYLT } from "utils/helpers/ylt"
import { setApprovalForAll } from "utils/helpers/ylnft1155"
import { useMoralis } from "react-moralis"
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

export const SellNFT = ({ options, closeSidebar }) => {
  const [steps, setSteps] = useState(0)
  const [sellPrice, setSellPrice] = useState(0)
  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [autoPrice, setAutoPrice] = useState(0)
  const [rate, setRate] = useState(0)
  const { Moralis, user } = useMoralis()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setSellPrice("")
  }, [steps])

  const handleCloseSidebar = () => {
    closeSidebar()
    setSteps(0)
  }

  const handleMarketplaceClick = () => setSteps(1)
  const handleAuctionClick = () => setSteps(2)

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

  const handleList = async () => {
    setLoading(true)
    try {
      let transaction
      const value = Moralis.Units.Token(sellPrice, "18")
      const marketFee = await Moralis.executeFunction(getMarketFee())
      transaction = await Moralis.executeFunction(
        approveYLT(
          process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS1,
          marketFee,
        ),
      )
      await transaction.wait()
      if (options.isERC721) {
        transaction = await Moralis.executeFunction(
          approve(
            process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS1,
            options.id,
          ),
        )
        await transaction.wait()
      } else {
        transaction = await Moralis.executeFunction(
          setApprovalForAll(
            process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS1,
            true,
          ),
        )
        await transaction.wait()
      }
      transaction = await Moralis.executeFunction(
        minterListedNFT(options.id, value),
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

  const handleAuction = async () => {
    setLoading(true)
    try {
      let transaction
      const value = Moralis.Units.Token(sellPrice, "18")
      const limit = Moralis.Units.Token(autoPrice, "18")
      const period = parseInt((endDate - startDate) / 86400000)
      if (options.isERC721) {
        transaction = await Moralis.executeFunction(
          approve(process.env.REACT_APP_YLAUCTION_CONTRACT_ADDRESS, options.id),
        )
        await transaction.wait()
      } else {
        transaction = await Moralis.executeFunction(
          setApprovalForAll(
            process.env.REACT_APP_YLAUCTION_CONTRACT_ADDRESS,
            true,
          ),
        )
        await transaction.wait()
      }
      transaction = await Moralis.executeFunction(
        MinterListNFT(
          options.id,
          value,
          options.amount,
          limit,
          period,
          options.isERC721,
        ),
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
      {steps === 0 && (
        <>
          <ActionBtn onClick={handleMarketplaceClick}>
            sell on marketplace
          </ActionBtn>
          <ActionBtn onClick={handleAuctionClick}>sell on auction</ActionBtn>
        </>
      )}

      {steps === 1 && (
        <Form name="marketplace_form" layout="vertical" onFinish={handleList} requiredMark={false}>
          <BottomContainer>
            <InnerTitle>sell on marketplace</InnerTitle>
            <Form.Item name="Price (YLT)" label={<AnttLabel>Price (YLT)</AnttLabel>} rules={[{ validator: checkPrice }]}>
              <AntInput placeholder="500" value={sellPrice} onChange={handlePriceChange} />
            </Form.Item>
            <ButtonsContainer>
              <ActionBtn onClick={() => setSteps(0)} outlined>back</ActionBtn>
              <ActionBtn tokenId={options.id} active>{options.action[0]}</ActionBtn>
            </ButtonsContainer>
          </BottomContainer>
        </Form>
      )}

      {steps === 2 && (
        <Form name="aution_form" layout="vertical" onFinish={handleAuction} requiredMark={false}>
          <AuctionContainer>
            <InnerTitle>sell on auction</InnerTitle>
            <Form.Item name="Price (YLT)" label={<AnttLabel>Price (YLT)</AnttLabel>} rules={[{ validator: checkPrice }]}>
              <AntInput placeholder="500" value={sellPrice} onChange={handlePriceChange} />
            </Form.Item>
            <DateContainer>
              <Form.Item name="start_date" style={{ width: "100%" }} label={<AnttLabel>Start Date</AnttLabel>} rules={[{ type: 'object', required: true, message: 'Please select Start Date!', }]}>
                <DatePicker
                  placeholder="__.__.____"
                  dateFormat="dd/MM/yyyy"
                  value={startDate}
                  onChange={handleStartChange}
                  style={{ width: "100%", backgroundColor: "#DEDEDE", borderRadius: "6px", color: "#737373", }}
                />
              </Form.Item>
              <Form.Item name="end_date" style={{ width: "100%" }} label={<AnttLabel>End Date</AnttLabel>} rules={[{ type: 'object', required: true, message: 'Please select End Date!', }]}>
                <DatePicker
                  placeholder="__.__.____"
                  dateFormat="dd/MM/yyyy"
                  value={endDate}
                  onChange={handleEndChange}
                  style={{ width: "100%", backgroundColor: "#DEDEDE", borderRadius: "6px", color: "#737373", }}
                />
              </Form.Item>
            </DateContainer>
            <Form.Item name="Minimum purchase price" label={<AnttLabel>Minimum purchase price</AnttLabel>} rules={[{ validator: checkPrice }]}>
              <AntInput placeholder="500" value={minPrice} onChange={handleMinPriceChange} />
            </Form.Item>
            <Form.Item name="Instant buyout price" label={<AnttLabel>Instant buyout price</AnttLabel>} rules={[{ validator: checkPrice }]}>
              <AntInput placeholder="500" value={autoPrice} onChange={handleAutoPriceChange} />
            </Form.Item>
            <Form.Item name="Rate step" label={<AnttLabel>Rate step</AnttLabel>} rules={[{ validator: checkPrice }]}>
              <AntInput placeholder="500" value={rate} onChange={handleRateChange} />
            </Form.Item>
            <ButtonsContainer>
              <ActionBtn outlined onClick={() => setSteps(0)}>back</ActionBtn>
              <ActionBtn active>sell</ActionBtn>
            </ButtonsContainer>
          </AuctionContainer>
        </Form>
      )}
      {steps !== 0 && isLoading && <LoadingSpin tip="Loading..." />}
      <CloseButton onClick={handleCloseSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
