import React, { useContext, useState } from "react"
import {
  CloseButton,
  MainContainer,
  SidebarContainer,
  SidebarTitle,
  TitleContainer,
} from "./styles/SidebarStyling"
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Image,
  Input,
  List,
  Row,
  Typography,
} from "antd"
import { CssDiv, CssP } from "components/CssStyledComponent/CssStyledComponent"
import { DappContext } from "context"
import "./styles/slidebar.css"

export const CollectionExchangeSum = ({ options, friend, closeSidebar }) => {
  return (
    <SidebarContainer>
      <MainContainer>
        <TitleContainer>
          <SidebarTitle>Exchange</SidebarTitle>
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

          <hr style={{ marginTop: "20px", marginBottom: "20px" }} />

          <CssDiv display="flex">
            <Avatar
              src={
                <Image
                  src={friend.avatar}
                  style={{ width: 32 }}
                  preview={false}
                />
              }
            />
            <Typography.Text
              style={{
                marginLeft: "10px",
                color: "#242424",
                flexGrow: 1,
              }}
            >
              {friend.name}
            </Typography.Text>

            <Image src="/black_exchange_icon.png" preview={false} />
          </CssDiv>
        </CssDiv>

        <Typography.Title
          level={4}
          style={{
            marginTop: "20px",
            textTransform: "uppercase",
          }}
        >
          set sum to sell
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
        />

        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col span={12}>
            <Button
              type="primary"
              block
              size="large"
              style={{
                textTransform: "uppercase",
                backgroundColor: "#A3A5A9",
                border: "none",
              }}
            >
              back
            </Button>
          </Col>

          <Col span={12}>
            <Button
              type="primary"
              block
              size="large"
              style={{
                textTransform: "uppercase",
              }}
            >
              request
            </Button>
          </Col>
        </Row>
      </MainContainer>
      <CloseButton onClick={closeSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
