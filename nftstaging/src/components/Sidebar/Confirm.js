import React, { useEffect } from "react"
import {
  CloseButton,
  MainContainer,
  SidebarContainer,
  SidebarTitle,
  TitleContainer,
  NftContainer,
  NftImage,
  NftAttr,
  PriceBox,
  AttrBox,
  AttrContainer,
} from "./styles/SidebarStyling"

import { approve } from "utils/helpers/ylt"
import { MarketItemSale } from "utils/helpers/marketplace.js"
import { useMoralis } from "react-moralis"
import { getMarketFee } from "utils/helpers/marketplace"
import { Button, Col, Row, Modal } from "antd"
import { ExclamationCircleOutlined, CloseOutlined } from "@ant-design/icons"
import RunIcon from "../../images/account/collection/Run.svg"
import Logo from "../../images/marketplace/nftcard/logo.png"

export const Confirm = ({ options, closeSidebar }) => {
  const { Moralis } = useMoralis()

  const onClickAccept = async () => {
    const marketFee = await Moralis.executeFunction(getMarketFee())
    const price = Moralis.Units.Token(options.price + marketFee, "18")
    try {
      const transaction = await Moralis?.executeFunction(
        approve(process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS1, price),
      )
      await transaction.wait(3)
      await Moralis?.executeFunction(
        MarketItemSale(options.itemId, options.amount),
      )
    } catch (error) {
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: error.message ? error.message : error.data.message,
      })
    }
  }
  return (
    <SidebarContainer>
      <MainContainer>
        <TitleContainer>
          <SidebarTitle>CONFIRM</SidebarTitle>
        </TitleContainer>
        <NftContainer>
            <NftImage src={options?.image} alt={options?.image} />
            <NftAttr>
              <p>SOCCER</p>
              <h1>{options?.attrs.playerName}</h1>
              <PriceBox>
                <img src={Logo}></img>
                <usd>{options?.attrs?.usdValue}</usd>
                <ylt>{options?.attrs?.cryptoValue}</ylt>
              </PriceBox>
              {options.isERC721 &&
                  (
                    <AttrContainer>
                      <AttrBox>
                        <img src={RunIcon}></img>
                        <span>{options?.attrs?.speed}</span>
                      </AttrBox>
                      <AttrBox>
                        <img src={RunIcon}></img>
                        <span>{options?.attrs?.dexterity}</span>
                      </AttrBox>
                      <AttrBox>
                        <img src={RunIcon}></img>
                        <span>{options?.attrs?.stamina}</span>
                      </AttrBox>
                      <AttrBox>
                        <img src={RunIcon}></img>
                        <span>{options?.attrs?.dribbling}</span>
                      </AttrBox>
                      <AttrBox>
                        <img src={RunIcon}></img>
                        <span>{options?.attrs?.finishing}</span>
                      </AttrBox>
                    </AttrContainer>
                  )
                }
            </NftAttr>
          </NftContainer>
          <Row gutter={16}>
            <Col span={12}>
              <Button
                block
                type="primary"
                ghost
                size="large"
                onClick={closeSidebar}
              >
                BACK
              </Button>
            </Col>
          <Col span={12}>
            <Button block type="primary" size="large" onClick={onClickAccept}>
              BUY
            </Button>
          </Col>
        </Row>
      </MainContainer>
      <CloseButton onClick={closeSidebar}><CloseOutlined /></CloseButton>
    </SidebarContainer>
  )
}
