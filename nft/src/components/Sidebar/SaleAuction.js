import { Button, Col, DatePicker, Input, Row, Typography } from "antd"
import { CssP } from "components/CssStyledComponent/CssStyledComponent"
import React, { useState } from "react"
import { InputLabel } from "./styles/SellNFTStyling"
import {
  CloseButton,
  MainContainer,
  SidebarContainer,
  SidebarTitle,
  TitleContainer,
} from "./styles/SidebarStyling"

export const SaleAuction = ({ CardElmnt, closeSidebar }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const handleStartChange = (date, dateString) => {
    setStartDate(date)
  }

  const handleEndChange = (date, dateString) => {
    setEndDate(date)
  }
  return (
    <SidebarContainer>
      <MainContainer>
        <TitleContainer>
          <SidebarTitle>Sale</SidebarTitle>
        </TitleContainer>

        {CardElmnt}

        <Typography.Title level={3} style={{ marginTop: "30px" }}>
          SELL ON AUCTION
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
            marginRight: "20px",
            width: "100%",
            color: "#737373",
          }}
        />

        <Row gutter={16} style={{ marginTop: "10px" }}>
          <Col span={12}>
            <InputLabel>
              Start Date
              <DatePicker
                placeholder="__.__.____"
                value={startDate}
                onChange={handleStartChange}
                style={{
                  width: "100%",
                  backgroundColor: "#DEDEDE",
                  borderRadius: "6px",
                  color: "#737373",
                }}
              />
            </InputLabel>
          </Col>
          <Col span={12}>
            <InputLabel>
              End Date
              <DatePicker
                placeholder="__.__.____"
                value={endDate}
                onChange={handleEndChange}
                style={{
                  width: "100%",
                  backgroundColor: "#DEDEDE",
                  borderRadius: "6px",
                  color: "#737373",
                }}
              />
            </InputLabel>
          </Col>
        </Row>

        <CssP fontSize="16px" fontWeight="400" color="#242424" mt="10px">
          Minimum purchase price
        </CssP>
        <Input
          bordered={false}
          placeholder="500"
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: "8px",
            marginRight: "20px",
            width: "100%",
            color: "#737373",
          }}
        />

        <CssP fontSize="16px" fontWeight="400" color="#242424" mt="10px">
          Instant buyout price
        </CssP>
        <Input
          bordered={false}
          placeholder="500"
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: "8px",
            marginRight: "20px",
            width: "100%",
            color: "#737373",
          }}
        />

        <CssP fontSize="16px" fontWeight="400" color="#242424" mt="10px">
          Rate step
        </CssP>
        <Input
          bordered={false}
          placeholder="500"
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: "8px",
            marginRight: "20px",
            width: "100%",
            color: "#737373",
          }}
        />

        <Row gutter={16} style={{ marginTop: "30px", marginBottom: "10px" }}>
          <Col span={12}>
            <Button
              block
              size="medium"
              style={{
                color: "white",
                backgroundColor: "#A3A5A9",
              }}
            >
              BACK
            </Button>
          </Col>
          <Col span={12}>
            <Button block type="primary" size="medium">
              SELL
            </Button>
          </Col>
        </Row>
      </MainContainer>
      <CloseButton onClick={closeSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
