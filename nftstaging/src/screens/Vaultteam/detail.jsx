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
import React, { useState, useEffect, useMemo, useCallback } from "react"
import { useParams, useLocation, useHistory } from "react-router-dom"
import { useMedia } from "hooks/useMedia"
import { useMoralis } from "react-moralis"
import "./style.css"
import { BackButton, ArrowBtn } from "./components/basic"
import { PlayerCard, PlayerStats, PlayerStat } from "./components/playcard"
import {
  CssDivs,
  CssDiv,
} from "components/CssStyledComponent/CssStyledComponent"
import Item from "antd/lib/list/Item"
import { SearchOutlined } from "@ant-design/icons"

const priceList = [
  {
    id: "gold",
    name: "#1",
    price: "100000",
    bgImg: "url(/price_bg_1.png)",
  },
  {
    id: "silver",
    name: "#2",
    price: "50000",
    bgImg: "url(/price_bg_2.png)",
  },
  {
    id: "copper",
    name: "#3",
    price: "15000",
    bgImg: "url(/price_bg_3.png)",
  },
]

const tabList = [
  {
    label: "12 Hours",
    price: 15000,
  },
  {
    label: "24 Hours",
    price: 30000,
  },
  {
    label: "3 DAYS",
    price: 45000,
  },
  {
    label: "WEEK",
    price: 90000,
  },
]

const TeamDetail = ({ moralis }) => {
  let inputRef
  const history = useHistory()
  const location = useLocation()
  const { Moralis } = useMoralis()
  const isMobile = useMedia("(max-width: 640px)")
  const params = useParams()
  const [open, setOpen] = useState(false)
  const [notifyOpen, setNotifyOpen] = useState("")

  const [type, setType] = useState("baseball")
  const [teamName, setTeamName] = useState("")
  const [teams, setTeams] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1])
  const [provideLogo, setProvideLogo] = useState([1, 1, 1, 1])
  const [players, setPlayers] = useState([1, 1, 1, 1])

  const [sideContents, setSideContents] = useState("get reward")

  const openModal = (a) => {
    setSideContents(a)
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (params.type != null && params.type != undefined) {
      setType(params.type)
    }
  }, [params.type])

  const onTabChange = (key) => {
    console.log(key)
  }

  const fileUpload = async (event) => {
    const data = event
    const image_ipfs = new Moralis.File(data.name, data)
    const img = await image_ipfs.saveIPFS()
    const image = "https://gateway.moralisipfs.com/ipfs/" + img._hash
  }

  const createTeam = async () => {}

  const takeReward = async () => {}

  const { Search } = Input
  const onSearch = (value) => console.log(value)
  const removeItem = () => {
    openModal("remove a player")
  }
  const openinfo = () => {
    openModal("booster")
  }
  const deletePlayer = () => {
    setNotifyOpen('cantremove')
  }

  return (
    <>
      <Layout className="layout team-detail">
        <Row justify="start">
          <Col span={24}>
            <BackButton onClick={() => history.goBack()}>Previous</BackButton>
            <input
              ref={(refParam) => (inputRef = refParam)}
              type="file"
              onChange={(e) => fileUpload(e.target.files[0])}
              style={{ display: "none" }}
            />
          </Col>
        </Row>
        <Row justify="end" align="middle" className="maring-top-20">
          <Col xs={24} md={12} lg={9} className="align-center">
            <Row type="flex" align="middle" justify="center">
              <img
                className="team-detail-logo margin-right-10"
                src="/images/vaultteam/YLT_teamlogo.png"
                alt="YTL_team_logo"
              />
              <h1 className="team-title">{type}</h1>
            </Row>
          </Col>
          <Col xs={24} md={12} lg={9} className="align-center">
            <span className="level-type margin-right-10">
              power<span className="level-value margin-left-10">83</span>
            </span>
            <span className="level-type margin-right-10">
              speed<span className="level-value margin-left-10">134</span>
            </span>
            <span className="level-type margin-right-10">
              energy<span className="level-value margin-left-10">111</span>
            </span>
          </Col>
          <Col xs={24} lg={3} className="align-right">
            <Space wrap>
              <Button type="primary" className="primary-btn " block>
                DISBAND
              </Button>
            </Space>
          </Col>
        </Row>
        <Row type="flex" className="maring-top-20">
          <Col sm={24} md={24} lg={24} className="d-flex overflowX">
            <div className="player-card-wrap">
              <p className="wrap-title">Trainer</p>
              <div className="h-gap">
                <PlayerCard sportBg={"#ffffff"} />
              </div>
            </div>
            <div className="player-card-wrap-white">
              <p className="wrap-title">Soccer</p>
              <div className="d-flex">
                {players.map((item, index) => {
                  return (
                    <div className="h-gap" key={index}>
                      <PlayerCard
                        sportBg={"#ffffff"}
                        removeItem={removeItem}
                        openinfo={openinfo}
                      />
                    </div>
                  )
                })}
                <div className="h-tap">
                  <Card
                    bordered={true}
                    className="add-card"
                    onClick={() => openModal("add player")}
                  >
                    <PlusCircleOutlined className="logo-add" />
                    <div className="add-logo maring-top-10">add player</div>
                  </Card>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="maring-top-30" gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="quick-match-btn d-flex maring-top-10">
              <img
                className="quick-logo margin-right-10"
                src="/images/vaultteam/quickmatch.png"
                alt="YTL_team_logo"
              />
              <p className="quick-btn-text">Quick Match</p>
            </div>
            <p className="sub-team-title maring-top-40">TOURNAMENTS</p>
            <div className="league-carousel">
              <Carousel
                rows={1}
                cols={1}
                showDots={true}
                loop={true}
                centerMode={true}
                arrowLeft={<ArrowBtn type="left">&larr;</ArrowBtn>}
                arrowRight={<ArrowBtn type="right">&rarr;</ArrowBtn>}
                dotColorActive="#ffffff"
                dotColorInactive={"#F5F5F0"}
                autoplay={3000}
              >
                {[0, 1, 2, 3].map((item, index) => (
                  <Carousel.Item key={index} className="ghost">
                    <div key={index} className="cs-wrap">
                      <img className="cs-img" src="/Tournaments.png" alt="" />
                      <div className="cs-info-wrap">
                        <div className="cs-f-wrap">
                          <p className="cs-date">19 april 2022</p>
                          <p className="cs-type">SOCCER</p>
                        </div>
                        <p className="cs-info">
                          Youth League Champions Tournament
                        </p>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="prize-wrap">
                <p className="prize">Prizes</p>

                <Row gutter={16}>
                  {priceList.map((item) => (
                    <Col key={item.id} md={8} xs={24}>
                      <CssDivs
                        backgroundImage={item.bgImg}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        borderRadius="8px"
                        display="flex"
                        flexDirection="column"
                        gap="4px"
                        justifyContent="center"
                        alignItems="center"
                        pt="10px"
                        pb="10px"
                      >
                        <Typography.Title
                          level={3}
                          style={{ color: "white", marginBottom: "0rem" }}
                        >
                          {item.name}
                        </Typography.Title>
                        <CssDivs
                          border="none"
                          borderTop="1px solid white"
                          width="80%"
                        />
                        <Space>
                          <Image
                            width={25}
                            src="/yourlife.png"
                            preview={false}
                          />
                          <Typography.Title
                            level={3}
                            style={{ color: "white", marginBottom: "0rem" }}
                          >
                            {item.price}
                          </Typography.Title>
                        </Space>
                      </CssDivs>
                    </Col>
                  ))}
                  <Col xs={24} md={24} className="maring-top-20">
                    <Button type="primary" className="primary-btn " block>
                      ENROLL
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} className="maring-bt-30">
            <div className="maring-top-10">
              <img className="camp-img" src="/training_camp.png" alt="" />
              <p className="camp-text">Training camp</p>
              <div className="prize-wrap">
                <Row>
                  <Col sm={24} md={24} lg={24} className="d-flex overflowX">
                    <div className="trainer-item">
                      <img
                        className="trainer-img"
                        src="/player.png"
                        alt="playerImage"
                      />
                      <div className="reward-btn-wrap">
                        <p className="trainer-time">12h 28m</p>
                      </div>
                    </div>

                    <div className="trainer-item">
                      <img
                        className="trainer-img"
                        src="/player.png"
                        alt="playerImage"
                      />
                      <div className="reward-btn-wrap">
                        <Button
                          type="primary"
                          className="primary-btn"
                          block
                          onClick={() => openModal("get reward")}
                        >
                          Get reward
                        </Button>
                      </div>
                    </div>

                    {players.map((item, index) => {
                      return (
                        <div key={index} className="trainer-item">
                          <Card bordered={true} className="trainer-card">
                            <PlusCircleOutlined className="logo-add" />
                            <div className="add-logo">add player</div>
                          </Card>
                        </div>
                      )
                    })}
                  </Col>
                  <Col
                    sm={24}
                    md={24}
                    lg={24}
                    className="d-flex overflowX maring-top-30"
                  >
                    <Tabs centered className="tab-box">
                      {tabList.map((item, index) => {
                        return (
                          <Item md={6} tab={item.label} key={index}>
                            <div className="justify-center padding-10 maring-bt-20">
                              <Image
                                width={25}
                                src="/yourlife.png"
                                preview={false}
                              />
                              <p className="tab-price">{item.price}</p>
                            </div>
                          </Item>
                        )
                      })}
                    </Tabs>
                  </Col>
                </Row>
                <Button
                  type="primary"
                  className="primary-btn maring-top-20"
                  block
                >
                  ENROLL
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Layout>

      <Drawer
        placement={"right"}
        width={isMobile ? "90%" : "35%"}
        closable={false}
        // onClose={onClose}
        open={open}
        className="team-drawer"
      >
        <Row justify="center" align="middle">
          <Col xs={24} className="close-btn-wrap">
            <CloseOutlined
              className="close-btn"
              onClick={() => setOpen(false)}
            />
          </Col>
          {notifyOpen == "" ? (
            <Col xs={24} md={24}>
              <h1 className="drawer-title">{sideContents}</h1>
            </Col>
          ) : (
            <></>
          )}

          {sideContents == "booster" && (
            <>
              <Col xs={24} md={24}>
                <div className="rewarder-card-wrap">
                  <img
                    className="rewarder-img"
                    src="/player.png"
                    alt="playerImage"
                  />
                  <div className="rewarder-detail">
                    <p className="rewarder-sport-type">Soccer</p>
                    <h3 className="rewarder-name maring-top-5">
                      Christian Andrade
                    </h3>
                    <div className="maring-top-10">
                      <PlayerStats>
                        <PlayerStat iconType="Run" weight={321} />
                        <PlayerStat iconType="Wheel" weight={32} />
                        <PlayerStat iconType="Stamina" weight={8} />
                      </PlayerStats>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} className="d-flex overflowX maring-top-10">
                {players.map((item, index) => {
                  return (
                    <div className="trainer-item pos-rel">
                      <img
                        className="trainer-img"
                        src="/Union.png"
                        alt="playerImage"
                      />
                      <img
                        className="booster-img pos-abs"
                        src="/5speed.png"
                        alt="playerImage"
                      />
                      <div className="reward-btn-wrap">
                        <Button type="primary" className="primary-btn" block>
                          +5 SPEED
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </Col>
              <Col xs={24} md={24} className="align-left maring-top-10">
                <Row gutter={10}>
                  <Col xs={12} sm={12} md={12}>
                    <Button type="primary" className="grey-btn" block>
                      Back
                    </Button>
                  </Col>
                  <Col xs={12} sm={12} md={12}>
                    <Button type="primary" className="primary-btn" block>
                      Add
                    </Button>
                  </Col>
                </Row>
              </Col>
            </>
          )}

          {sideContents == "remove a player" &&
            (notifyOpen == "cantremove" ? (
              <>
                <Col xs={24} md={24} className="justify-center mt-25vh">
                  <img
                    className="rewarder-img"
                    src="/images/vaultteam/failed.png"
                    alt="playerImage"
                  />
                </Col>
                <Col xs={24} md={18} className="justify-center maring-top-10">
                  <p className="notify-msg maring-top-10">
                    Can't remove a player
                  </p>
                </Col>
                <Col xs={24} md={18} className="justify-center">
                  <p className="notify-sub-msg">
                    The player is currently participating in the tournament, you
                    cannot remove him from the roster
                  </p>
                </Col>
                <Col xs={12} md={8} className="justify-center maring-top-20">
                  <Button type="primary" className="primary-btn" block>
                    Close
                  </Button>
                </Col>
              </>
            ) : notifyOpen == "removed" ? (
              <>
                <Col xs={24} md={24} className="justify-center mt-25vh">
                  <img
                    className="rewarder-img"
                    src="/images/vaultteam/check.png"
                    alt="playerImage"
                  />
                </Col>
                <Col xs={24} md={18} className="justify-center maring-top-10">
                  <p className="notify-msg maring-top-10">
                    Player removed from team
                  </p>
                </Col>
                <Col xs={12} md={8} className="justify-center maring-top-20">
                  <Button type="primary" className="primary-btn" block>
                    Close
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col xs={24} md={24}>
                  <div className="rewarder-card-wrap">
                    <img
                      className="rewarder-img"
                      src="/player.png"
                      alt="playerImage"
                    />
                    <div className="rewarder-detail">
                      <p className="rewarder-sport-type">Soccer</p>
                      <h3 className="rewarder-name maring-top-5">
                        Christian Andrade
                      </h3>
                      <div className="maring-top-10">
                        <PlayerStats>
                          <PlayerStat iconType="Run" weight={321} />
                          <PlayerStat iconType="Wheel" weight={32} />
                          <PlayerStat iconType="Stamina" weight={8} />
                        </PlayerStats>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={24} className="align-left maring-top-10">
                  <Row gutter={10}>
                    <Col xs={12} sm={12} md={12}>
                      <Button type="primary" className="grey-btn" block>
                        Back
                      </Button>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                      <Button type="primary" className="primary-btn" block onClick={()=>deletePlayer()}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </>
            ))}

          {sideContents == "add player" && (
            <>
              <Col xs={24} md={24} className="maring-top-20">
                <div className="serach-wrap">
                  <input placeholder="Serch player" className="search-box" />
                  <SearchOutlined className="search-icon" />
                </div>
              </Col>
              <Col
                sm={24}
                md={24}
                lg={24}
                className="d-flex overflowX maring-top-10"
              >
                {players.map((item, index) => {
                  return (
                    <div key={index} className="trainer-item">
                      <img
                        className="trainer-img"
                        src="/player.png"
                        alt="playerImage"
                      />
                      {/* <div className="reward-btn-wrap">
                    <p className="trainer-time">12h 28m</p>
                  </div> */}
                    </div>
                  )
                })}
              </Col>
              <Col xs={24} md={24} className="align-left maring-top-10">
                <Row gutter={10}>
                  <Col xs={12} sm={12} md={12}>
                    <Button type="primary" className="grey-btn" block>
                      Back
                    </Button>
                  </Col>
                  <Col xs={12} sm={12} md={12}>
                    <Button type="primary" className="primary-btn" block>
                      Add
                    </Button>
                  </Col>
                </Row>
              </Col>
            </>
          )}
          {sideContents == "get reward" && (
            <>
              <Col xs={24} md={24}>
                <div className="rewarder-card-wrap">
                  <img
                    className="rewarder-img"
                    src="/player.png"
                    alt="playerImage"
                  />
                  <div className="rewarder-detail">
                    <p className="rewarder-sport-type">Soccer</p>
                    <h3 className="rewarder-name maring-top-5">
                      Christian Andrade
                    </h3>
                    <div className="maring-top-10">
                      <PlayerStats>
                        <PlayerStat iconType="Run" weight={321} />
                        <PlayerStat iconType="Wheel" weight={32} />
                        <PlayerStat iconType="Stamina" weight={8} />
                      </PlayerStats>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24}>
                <div className="tab-box cs-f-wrap padding-20">
                  <div className="tab-price">reward</div>
                  <div className="justify-center ">
                    <Image width={25} src="/yourlife.png" preview={false} />
                    <p className="tab-price">15000</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} className="align-left maring-top-10">
                <Button
                  type="primary"
                  block
                  className="team-create-btn"
                  onClick={() => takeReward()}
                >
                  TAKE
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Drawer>
    </>
  )
}

export default TeamDetail
