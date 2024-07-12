import {
  Button,
  Col,
  Divider,
  Image,
  Row,
  Space,
  Typography,
  Modal,
} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { CssDiv, CssP } from "components/CssStyledComponent/CssStyledComponent"
import { DappContext } from "context"
import React, { useContext } from "react"
import { useMoralis } from "react-moralis"
import { RaiseBid } from "./RaiseBid"
import {
  CloseButton,
  MainContainer,
  SidebarContainer,
  SidebarTitle,
  TitleContainer,
} from "./styles/SidebarStyling"
import { withdrawNFTInstant } from "utils/helpers/auction"
import { getMarketFee } from "utils/helpers/marketplace"
import { approve } from "utils/helpers/ylt"

export const NftBuy = ({ option, closeSidebar }) => {
  const { Moralis } = useMoralis()
  const { setSidebarContent, setOpenSidebar, onCloseSidebar } =
    useContext(DappContext)
  const openRaiseBidSidebar = () => {
    setSidebarContent(
      <RaiseBid option={option} closeSidebar={onCloseSidebar} />,
    )
    setOpenSidebar(true)
  }

  const onClickBuyNow = async (e) => {
    let transaction
    try {
      const marketFee = await Moralis.executeFunction(getMarketFee())
      const price = await Moralis.Units.Token(
        option.limit_price + marketFee,
        "18",
      )
      await Moralis.executeFunction(
        approve(process.env.REACT_APP_YLAUCTION_CONTRACT_ADDRESS, price),
      )
      transaction = await Moralis.executeFunction(
        withdrawNFTInstant(
          option.itemId,
          option.amount,
          option.personal == null ? false : true,
        ),
      )
      await transaction.wait(3)
    } catch (error) {
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: error.data.message,
      })
    }
  }

  const onClickRaiseBid = (e) => {
    openRaiseBidSidebar()
  }
  return (
    <SidebarContainer>
      <MainContainer>
        <TitleContainer>
          <SidebarTitle>BUY</SidebarTitle>
        </TitleContainer>

        <Row
          split={<Divider type="vertical" />}
          style={{
            position: "relative",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "25px 0",
          }}
        >
          <Col span={12}>
            <Typography.Title
              level={5}
              style={{ color: "#242424", textAlign: "center" }}
            >
              current bid
            </Typography.Title>
            <Space>
              <Image width={60} src="/favicon.ico" />
              <Typography.Title level={3}>{option.price}</Typography.Title>
            </Space>
            <CssP fontSize="18px">13:56:12</CssP>
          </Col>
          <CssDiv
            position="absolute"
            left="50%"
            top="50%"
            width="0"
            height="80%"
            transform="translate(-50%, -50%)"
            border="1px solid #000"
          />
          <Col span={12}>
            <Typography.Title
              level={5}
              style={{ color: "#242424", textAlign: "center" }}
            >
              instant redemption
            </Typography.Title>
            <Space>
              <Image width={60} src="/favicon.ico" />
              <Typography.Title level={3}>
                {option.limit_price}
              </Typography.Title>
            </Space>
          </Col>
        </Row>

        <Button
          type="primary"
          block
          style={{
            marginTop: "30px",
          }}
          onClick={onClickBuyNow}
        >
          BUY NOW
        </Button>
        <Button
          type="primary"
          block
          style={{
            marginTop: "10px",
          }}
          onClick={onClickRaiseBid}
        >
          RAISE BID
        </Button>
      </MainContainer>
      <CloseButton onClick={closeSidebar}>X</CloseButton>
    </SidebarContainer>
  )
}
