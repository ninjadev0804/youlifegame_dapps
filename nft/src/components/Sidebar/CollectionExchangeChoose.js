import Carousel from "react-grid-carousel"
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
import { SearchOutlined } from "@ant-design/icons"
import { CircleCheckBox } from "components/common/CircleCheckBox"

export const CollectionExchangeChoose = ({ options, friend, closeSidebar }) => {
  const [checked, setChecked] = useState({
    checked_1: false,
    checked_2: false,
    checked_3: false,
    checked_4: false,
    checked_5: false,
    checked_6: false,
    checked_7: false,
    checked_8: false,
  })

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
          }}
        >
          Choose friend’s NFT
        </Typography.Title>

        <Input
          bordered={false}
          placeholder="Search NFT"
          suffix={<SearchOutlined />}
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: "8px",
            height: "37px",
            marginRight: "20px",
            width: "100%",
            color: "#737373",
          }}
        />

        <CssDiv mt="20px">
          <Carousel rows={2} cols={3}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <Carousel.Item key={index}>
                <CssDiv position="relative">
                  <img
                    src={options.imageUrl}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <CircleCheckBox
                    outWidth="20px"
                    outHeight="20px"
                    outBg="rgba(255, 255, 255, 0.4)"
                    outOpacity="1"
                    innerWidth="14px"
                    innerHeight="14px"
                    innerBg="#90E040"
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                    }}
                    checked={eval("checked.checked_" + String(index + 1))}
                    onChange={(e) =>
                      setChecked((prev) => ({
                        ...prev,
                        ["checked_" + String(index + 1)]: e.target.checked,
                      }))
                    }
                  />
                </CssDiv>
              </Carousel.Item>
            ))}
          </Carousel>
        </CssDiv>

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
              exchange
            </Button>
          </Col>
        </Row>
      </MainContainer>
      <CloseButton onClick={closeSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
