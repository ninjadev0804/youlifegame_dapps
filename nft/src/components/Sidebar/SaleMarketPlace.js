import { Button, Col, Input, Row, Typography, Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { CssDiv, CssP } from "components/CssStyledComponent/CssStyledComponent"
import React, { useState } from "react"
import {
  CloseButton,
  MainContainer,
  SidebarContainer,
  SidebarTitle,
  TitleContainer,
} from "./styles/SidebarStyling"
import { buyerListedNFT, getMarketFee } from "utils/helpers/marketplace"
import { approve as approveYLT } from "utils/helpers/ylt"
import { approve } from "utils/helpers/ylnft721"
import { setApprovalForAll } from "utils/helpers/ylnft1155"
import { useMoralis } from "react-moralis"

export const SaleMarketPlace = ({ options, closeSidebar }) => {
  const { Moralis, user } = useMoralis()
  const [sellPrice, setSellPrice] = useState(0)
  const handleList = async () => {
    const value = Moralis.Units.Token(sellPrice, "18")
    const marketFee = await Moralis.executeFunction(getMarketFee())
    await Moralis.executeFunction(
      approveYLT(
        process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS,
        marketFee,
      ),
    )
    // await Moralis.executeFunction(
    //   depositApproval(
    //     user?.attributes.ethAddress,
    //     options.id,
    //     options.amount,
    //     true,
    //   )
    // )
    try {
      if (options.isERC721) {
        await Moralis.executeFunction(
          approve(
            process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS,
            options.id,
          ),
        )
      } else {
        await Moralis.executeFunction(
          setApprovalForAll(
            process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS,
            true,
          ),
        )
      }
      const transaction = await Moralis.executeFunction(
        buyerListedNFT(options.id, value, options.amount, options.isERC721),
      )
      await transaction.wait(3)
      location.reload()
    } catch (error) {
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: error.data.message,
      })
    }
    // location.reload()
  }

  const handlePriceChange = (e) => {
    setSellPrice(e.target.value)
  }
  return (
    <SidebarContainer>
      <MainContainer>
        <TitleContainer>
          <SidebarTitle>Sale</SidebarTitle>
        </TitleContainer>
        <CssDiv padding="15px" backgroundColor="white" borderRadius="8px">
          <Row gutter={16}>
            <Col span={9}>
              <img
                src={options.imageUrl}
                style={{ width: "100%", height: "auto" }}
              />
            </Col>

            <Col span={15}>
              <CssP color="#61616A" fontSize="14px" fontWeight="700" mt="20px">
                {options.sport}
              </CssP>
              <CssP color="#242424" fontSize="24px" fontWeight="700">
                {options.playerName}
              </CssP>
              <CssDiv display="flex" gap="5px">
                {options.speedElmnt}
                {options.dexterityElmnt}
                {options.staminaElmnt}
                {options.dribblingElmnt}
                {options.finishingElmnt}
              </CssDiv>
            </Col>
          </Row>
        </CssDiv>
        <Typography.Title level={3} style={{ marginTop: "30px" }}>
          SELL ON MARKETPLACE
        </Typography.Title>

        <CssP fontSize="16px" fontWeight="400" color="#242424" mt="10px">
          Price (YLT)
        </CssP>
        <Input
          bordered={false}
          placeholder="500"
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: "8px",
            height: "37px",
            marginRight: "20px",
            width: "100%",
            color: "#737373",
          }}
          onChange={handlePriceChange}
        />

        <Row gutter={16} style={{ marginTop: "30px" }}>
          <Col span={12}>
            <Button
              block
              size="large"
              style={{
                color: "white",
                backgroundColor: "#A3A5A9",
              }}
            >
              BACK
            </Button>
          </Col>
          <Col span={12}>
            <Button onClick={handleList} block type="primary" size="large">
              SELL
            </Button>
          </Col>
        </Row>
      </MainContainer>
      <CloseButton onClick={closeSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
