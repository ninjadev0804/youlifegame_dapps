import React from "react"
import {
  CloseButton,
  MainContainer,
  SidebarContainer,
  SidebarTitle,
  TitleContainer,
} from "./styles/SidebarStyling"

import { approve } from "utils/helpers/ylt"
import { MarketItemSale } from "utils/helpers/marketplace.js"
import { useMoralis } from "react-moralis"
import { getMarketFee } from "utils/helpers/marketplace"
import { Button, Col, Row, Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

export const Confirm = ({ options, closeSidebar }) => {
  const { Moralis } = useMoralis()

  const onClickAccept = async () => {
    const marketFee = await Moralis.executeFunction(getMarketFee())
    const price = await Moralis.Units.Token(options.price + marketFee, "18")
    try {
      const transaction = await Moralis?.executeFunction(
        approve(process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS, price),
      )
      await transaction.wait(3)
      await Moralis?.executeFunction(
        MarketItemSale(options.itemId, options.amount, options.isERC721),
      )
    } catch (error) {
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: error.data.message,
      })
    }
  }
  return (
    <SidebarContainer>
      <MainContainer>
        <TitleContainer>
          <SidebarTitle>CONFIRM</SidebarTitle>
        </TitleContainer>
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
              ACCEPT
            </Button>
          </Col>
        </Row>
      </MainContainer>
      <CloseButton onClick={closeSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
