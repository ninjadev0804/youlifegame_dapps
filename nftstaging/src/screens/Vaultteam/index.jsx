import Carousel from "react-grid-carousel"
import {
  Button,
  Col,
  Input,
  Image,
  Row,
  Space,
  Tabs,
  Typography,
  Layout,
  Card,
  Drawer,
  Upload,
} from "antd"
import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMedia } from "hooks/useMedia"
import { useMoralis } from "react-moralis"
import "./style.css"
import { BackButton } from "./components/basic"

const Vaultteam = ({ moralis }) => {
  let inputRef

  const { Moralis } = useMoralis()
  const isMobile = useMedia("(max-width: 640px)")
  const [open, setOpen] = useState(false)

  const [teamName, setTeamName] = useState("")
  const [teams, setTeams] = useState([
    "teamName1",
    "teamName2",
    "teamName3",
    "teamName4",
    "teamName5",
    "teamName6",
  ])
  const [provideLogo, setProvideLogo] = useState([1, 1, 1, 1])
  const [players, setPlayers] = useState([1, 1, 1, 1, 1, 1])

  const showDrawer = () => {
    setOpen(true)
  }

  const fileUpload = async (event) => {
    const data = event
    const image_ipfs = new Moralis.File(data.name, data)
    const img = await image_ipfs.saveIPFS()
    const image = "https://gateway.moralisipfs.com/ipfs/" + img._hash
  }

  const createTeam = async () => {}

  return (
    <>
      <Layout className="layout">
        <Row justify="start">
          <Col span={24}>
            <BackButton>Back</BackButton>
            <input
              ref={(refParam) => (inputRef = refParam)}
              type="file"
              onChange={(e) => fileUpload(e.target.files[0])}
              style={{ display: "none" }}
            />
          </Col>
        </Row>
        <Row justify="space-between" align="middle" className="maring-top-20">
          <Col xs={24} md={12}>
            <h1 className="team-title">my teams</h1>
          </Col>
          <Col xs={24} md={12} className="align-right">
            <Space wrap>
              <Button
                type="primary"
                className="primary-btn"
                block
                onClick={() => showDrawer()}
              >
                CREATE A TEAM
              </Button>
              <Button type="primary" className="second-btn" ghost>
                DELETE
              </Button>
            </Space>
          </Col>
        </Row>
        <Row className="maring-top-20">
          {teams.map((item, index) => {
            return (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                className="padding-10"
              >
                <Link to={"/teams/" + item}>
                  <Card bordered={false} className="team-card">
                    <div className="booster-active-wrap">
                      <Typography className="booster-active">
                        booster activeated
                      </Typography>
                    </div>
                    <img
                      className="team-logo"
                      src="/images/vaultteam/YLT_teamlogo.png"
                      alt="YTL_team_logo"
                    />
                    <div className="card-title">MY TEAM NAME</div>
                  </Card>
                </Link>
              </Col>
            )
          })}
          <Col xs={24} sm={12} md={8} lg={6} className="padding-10">
            <Card bordered={true} className="team-card dotted-border">
              <div className="booster-active-wrap"></div>
              <PlusCircleOutlined className="team-add" />
              <div className="card-title">ADD A TEAM</div>
            </Card>
          </Col>
        </Row>
      </Layout>
      <Drawer
        placement={"right"}
        width={isMobile ? "90%" : "50%"}
        closable={false}
        // onClose={onClose}
        open={open}
        className="team-drawer"
      >
        <Row justify="space-between" align="middle">
          <Col xs={24} className="close-btn-wrap">
            <CloseOutlined
              className="close-btn"
              onClick={() => setOpen(false)}
            />
          </Col>
          <Col xs={24} md={24}>
            <h1 className="drawer-title">create a team</h1>
          </Col>
          <Col xs={24} md={24}>
            <Typography className="team-name">name</Typography>
            <Typography className="enter-name">Enter your team name</Typography>
            <Input
              className="name-box"
              placeholder="Name"
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Col>
          <Col xs={24} md={24}>
            <Typography className="team-name">logo</Typography>
            <Row>
              <Col xs={12} md={6}>
                <Card bordered={true} className="logo-card">
                  <PlusCircleOutlined
                    className="logo-add"
                    onClick={() => inputRef.click()}
                  />
                  <div className="add-logo">add logo</div>
                </Card>
              </Col>
              <Col xs={12} md={18}>
                <Row className="logo-list-wrap">
                  {provideLogo.map((logo, index) => {
                    return (
                      <Col key={index} xs={24} md={8}>
                        <Card bordered={true} className="logo-card">
                          <img
                            className="use-logo"
                            src="/images/vaultteam/YLT_teamlogo.png"
                            alt="YTL_team_logo"
                          />
                          <div className="add-logo">use logo</div>
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24}>
            <Typography className="team-name">Line-up</Typography>
            <Row className="logo-list-wrap">
              {players.map((logo, index) => {
                return (
                  <Col key={index} xs={12} md={6}>
                    <Card bordered={true} className="logo-card">
                      <PlusCircleOutlined className="logo-add" />
                      <div className="add-logo">add player</div>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Col>
          <Col xs={12} md={8} className="align-left maring-top-20">
            <Button
              type="primary"
              block
              className="team-create-btn"
              onClick={() => createTeam()}
            >
              CREATE
            </Button>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default Vaultteam
