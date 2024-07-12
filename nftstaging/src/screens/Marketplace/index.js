import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Row, Col } from "antd"
import NFTGeometricCard from "components/NFTGeometricCard"
import {
  InfoContainer,
  InnerHeaderContainer,
  InnerHeaderLabel,
  BackButton,
  Heading,
  NftCardContainer,
  TabContainer,
  TabFilterBar,
} from "./styles/InfoElements"
import "./st.css"
import { OfferBox } from "./components"
import BoosterSlider from "./components/BoosterSlider"
import Buttons from "./components/Buttons"
import { CssDiv } from "components/CssStyledComponent/CssStyledComponent"
import { Alert, Button, Input, Modal, Typography, Spin } from "antd"
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { DappContext } from "context"
import { MarketPlaceFilters } from "components/Sidebar/MarketPlaceFilters"
import { fetchMarketItems } from "utils/helpers/marketplace"
import { fetchAuctionItems } from "utils/helpers/auction"
import { tokenURI as getTotkenURI721, tokenURI } from "utils/helpers/ylnft721"
import { tokenURI as getTotkenURI1155 } from "utils/helpers/ylnft1155"
import { useMoralis } from "react-moralis"
import { SubscribeBtn, SubscribeBtnContainer2, SubscribeText1, SubscribeText2 } from "components/Header/HeaderStyling"

/** description of marketplace */
const Marketplace = ({ moralis }) => {
  const {
    flag_offerAuction,
    setOpenSidebar,
    setSidebarContent,
    onCloseSidebar,
    setOpenModal,
    modalContent,
    setModalContent,
  } = useContext(DappContext)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const { isAuthenticated, user } = useMoralis()
  const [onceLoad, setOnceLoad] = useState(false)
  const [nfts, setNfts] = useState([])
  const [offers, setOffers] = useState([])
  const [offerNFTs, setOfferNFTs] = useState([])
  const [auctionNFTs, setAuctionNFTs] = useState([])
  const [isLoading, setLoading] = useState(false);

  const joinNewsLetter = () => {
    if (!user?.attributes.emailVerified) {
      Modal.error({
        icon: <ExclamationCircleOutlined />,
        content: "You have to verify email!",
      })
    } else {
      Modal.success({
        icon: <ExclamationCircleOutlined />,
        content: "You can join to news letter!",
      })
    }
  }
  const loadMarketPlaceNFTs = useCallback(async () => {
    if (!moralis || !isAuthenticated) return;
    setLoading(true)
    // const marketNFT = await moralis?.fn.executeFunction(fetchMarketItems())
    // const listedNFT = await Promise.all(
    //   marketNFT?.map(async (item) => {
    //     const isERC721 = item.isERC721
    //     const getTokenURI = isERC721 ? getTotkenURI721 : getTotkenURI1155
    //     const token_uri = await moralis?.fn.executeFunction(
    //       getTokenURI(item.tokenId),
    //     )
    //     const meta = await moralis?.fn.Cloud.run("fetchNFTMetadata", {
    //       url: token_uri,
    //     })
    //     const status = "MARKETPLACE"
    //     const action = ["EDIT", item.state === 0 ? "PAUSE" : "UNPAUSE"]
    //     return {
    //       id: item.tokenId.toString(),
    //       itemId: item.itemId.toString(),
    //       imgSrc: meta.data.image,
    //       title: meta.data.name,
    //       price: moralis?.fn.Units.FromWei(item.price.toString()), //BNB
    //       priceUSD: moralis?.fn.Units.FromWei(item.price.toString()),
    //       brickColor: "#3985f5",
    //       address:
    //         meta.data.personal === null
    //           ? process.env.REACT_APP_YLNFT1155_CONTRACT_ADDRESS
    //           : process.env.REACT_APP_YLNFT721_CONTRACT_ADDRESS,
    //       status,
    //       action,
    //       owner: item.owner,
    //       sport: meta.data.sport,
    //       date: meta.data.date || Date.now(),
    //       amount: item.amount.toString(),
    //       personal: isERC721
    //         ? {
    //           speed: meta.data.personal.speed,
    //           dexterity: meta.data.personal.energy,
    //           stamina: meta.data.personal.luck,
    //           dribbling: meta.data.personal.power,
    //           finishing: meta.data.personal.wizzardy,
    //         }
    //         : null,
    //     }
    //   }),
    // )

    // setNfts(listedNFT)

    let options = {
      chain: "bsc testnet",
      token_addresses: [
        process.env.REACT_APP_YLNFT721_CONTRACT_ADDRESS,
        process.env.REACT_APP_YLNFT1155_CONTRACT_ADDRESS,
      ],
    }
    const notListedNFT = await moralis?.fn.Cloud.run("getAllNFTs", {
      options,
      // list,
      marketAddress: process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS1,
      superAdminAddress: process.env.REACT_APP_SUPER_ADMIN_WALLET_ADDRESS,
    })
    const onlyMintedNFT = await Promise.all(
      notListedNFT?.map(async (item) => {
        const metaTokenUri =
          item?.token_uri.substring(8, 12) == "ipfs"
            ? item.token_uri.replace(
              /^.{28}/g,
              "https://gateway.moralisipfs.com",
            )
            : item.token_uri
        const meta = await moralis?.fn.Cloud.run("fetchNFTMetadata", {
          url: metaTokenUri,
        })
        const imgSrc = meta.data.image
        const price = "1 BNB"
        const dprice = "300"
        const isERC721 = item.contract_type === "ERC721"
        const data = { tokenId: item.token_id, isERC721 }
        const isOfferCard = await moralis?.fn.Cloud.run("isOfferNFT", data)
        const status = isOfferCard ? "Offer" : "NOT LISTED"
        const action = isOfferCard ? ["", "REMOVE"] : ["SELL", "ADD IN OFFER"]
        return {
          id: item.token_id,
          imgSrc: imgSrc,
          title: meta.data.name,
          price: price, //BNB
          priceUSD: dprice,
          brickColor: "#3985f5",
          address: item.token_address,
          status,
          action,
          isERC721,
          owner: item.owner_of,
          sport: meta.data.sport,
          date: item.last_metadata_sync,
          amount: item.amount,
          personal: meta.data.personal
            ? {
              speed: meta.data.personal.speed,
              dexterity: meta.data.personal.energy,
              stamina: meta.data.personal.luck,
              dribbling: meta.data.personal.power,
              finishing: meta.data.personal.wizzardy,
            }
            : null,
        }
      }),
    )
    let result = onlyMintedNFT.filter((nft) => nft.status !== "Offer")
    setNfts(result)
    setLoading(false)
  }, [moralis, isAuthenticated])

  const loadOfferNFTs = useCallback(async () => {
    if (!moralis || !isAuthenticated) return;
    let options = {
      chain: "bsc testnet",
      token_addresses: [
        process.env.REACT_APP_YLNFT721_CONTRACT_ADDRESS,
        process.env.REACT_APP_YLNFT1155_CONTRACT_ADDRESS,
      ],
    }
    setLoading(true);
    const notListedNFT = await moralis?.fn.Cloud.run("getAllNFTs", {
      options,
      // list,
      marketAddress: process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS1,
      superAdminAddress: process.env.REACT_APP_SUPER_ADMIN_WALLET_ADDRESS,
    })
    const onlyMintedNFT = await Promise.all(
      notListedNFT?.map(async (item) => {
        const metaTokenUri =
          item?.token_uri.substring(8, 12) == "ipfs"
            ? item.token_uri.replace(
              /^.{28}/g,
              "https://gateway.moralisipfs.com",
            )
            : item.token_uri
        const meta = await moralis?.fn.Cloud.run("fetchNFTMetadata", {
          url: metaTokenUri,
        })
        const imgSrc = meta.data.image
        const price = "1 BNB"
        const dprice = "300"
        const isERC721 = item.contract_type === "ERC721"
        const data = { tokenId: item.token_id, isERC721 }
        const isOfferCard = await moralis?.fn.Cloud.run("isOfferNFT", data)
        const status = isOfferCard ? "Offer" : "NOT LISTED"
        const action = isOfferCard ? ["", "REMOVE"] : ["SELL", "ADD IN OFFER"]
        return {
          id: item.token_id,
          imgSrc: imgSrc,
          title: meta.data.name,
          price: price, //BNB
          priceUSD: dprice,
          brickColor: "#3985f5",
          address: item.token_address,
          status,
          action,
          isERC721,
          owner: item.owner_of,
          sport: meta.data.sport,
          date: item.last_metadata_sync,
          amount: item.amount,
          personal: meta.data.personal
            ? {
              speed: meta.data.personal.speed,
              dexterity: meta.data.personal.energy,
              stamina: meta.data.personal.luck,
              dribbling: meta.data.personal.power,
              finishing: meta.data.personal.wizzardy,
            }
            : null,
        }
      }),
    )
    let result = onlyMintedNFT.filter((nft) => nft.status === "Offer")
    setOfferNFTs(result);
  }, [moralis, isAuthenticated]);

  const loadAuctionNFTs = useCallback(async () => {
    if (!moralis || !isAuthenticated) return;
    setLoading(true);
    const auctionNFT = await moralis?.fn.executeFunction(fetchAuctionItems())
    const listedAuctionNFT = await Promise.all(
      auctionNFT?.map(async (item) => {
        const isERC721 = item.isERC721
        const getTokenURI = isERC721 ? getTotkenURI721 : getTotkenURI1155
        const token_uri = await moralis?.fn.executeFunction(getTokenURI(item.tokenId))
        const meta = await moralis?.fn.Cloud.run("fetchNFTMetadata", { url: token_uri })
        return {
          id: item.tokenId.toString(),
          itemId: item.auctionId.toString(),
          imgSrc: meta.data.image,
          title: meta.data.name,
          price: moralis?.fn.Units.FromWei(item.highestBid.toString()), //BNB
          priceUSD: moralis?.fn.Units.FromWei(item.limitPrice.toString()),
          brickColor: "#3985f5",
          address:
            meta.data.personal === null
              ? process.env.REACT_APP_YLNFT1155_CONTRACT_ADDRESS
              : process.env.REACT_APP_YLNFT721_CONTRACT_ADDRESS,
          owner: item.owner,
          sport: meta.data.sport,
          date: meta.data.date || Date.now(),
          amount: item.amount.toString(),
          personal: isERC721
            ? {
              speed: meta.data.personal.speed,
              dexterity: meta.data.personal.energy,
              stamina: meta.data.personal.luck,
              dribbling: meta.data.personal.power,
              finishing: meta.data.personal.wizzardy,
            }
            : null,
        }
      }),
    )
    setAuctionNFTs(listedAuctionNFT)
    setLoading(false);
  }, [moralis, isAuthenticated]);

  //
  const loadOffers = useCallback(async () => {
    if (moralis && isAuthenticated) {
      moralis?.fn.Cloud.run("getOffers", { isFullOffer: true }).then(
        async (result) => {
          const value = await Promise.all(
            result.map(async (item) => {
              const attr = item.attributes
              const erc721Arr = await Promise.all(
                attr.ERC721.map(async (id) => {
                  const tokenURI = await moralis?.fn.executeFunction(
                    getTotkenURI721(id),
                  )
                  const meta = await moralis?.fn.Cloud.run("fetchNFTMetadata", {
                    url: tokenURI,
                  })
                  return meta.data.image
                }),
              )
              const erc1155Arr = await Promise.all(
                attr.ERC1155.map(async (id) => {
                  const tokenURI = await moralis?.fn.executeFunction(
                    getTotkenURI1155(id),
                  )
                  const meta = await moralis?.fn.Cloud.run("fetchNFTMetadata", {
                    url: tokenURI,
                  })
                  return meta.data.image
                }),
              )
              return {
                discount: attr.discount,
                endAt: attr.endAt,
                name: attr.name,
                fullPrice: attr.fullPrice,
                images: erc1155Arr.concat(erc721Arr),
                tokenData: JSON.stringify({
                  erc721: attr.ERC721,
                  erc1155: attr.ERC1155,
                }),
              }
            }),
          )
          setOffers(value)
        },
      )
    }
  }, [moralis, isAuthenticated])

  useEffect(() => {
    if (moralis && !onceLoad && isAuthenticated) {
      loadMarketPlaceNFTs()
      loadOffers()
      loadOfferNFTs()
      loadAuctionNFTs()
      setOnceLoad(true)
    }
  }, [
    moralis,
    onceLoad,
    isAuthenticated,
    loadMarketPlaceNFTs,
    loadOffers,
    loadOfferNFTs,
    loadAuctionNFTs,
  ])

  const subscribeHandler = () => {
    axios
      .put("/api/add-contact", {
        email: newsletterEmail,
      })
      .then((res) => {
        toast.success("🦄 We send you email! Check your email address", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setNewsletterEmail("")
      })
      .catch((e) =>
        toast.error("🦄 Something wrong try again later!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }),
      )
  }

  const onClickFilters = (e) => {
    setSidebarContent(<MarketPlaceFilters closeSidebar={onCloseSidebar} />)
    setOpenSidebar(true)
  }

  return (
    <>
      <InfoContainer>
        <InnerHeaderContainer>
          <BackButton>Back</BackButton>
          <SubscribeBtnContainer2>
            <SubscribeBtn onClick={joinNewsLetter}>
              <SubscribeText1>Subscribe for newsletters</SubscribeText1>
              <SubscribeText2>Subscribe</SubscribeText2>
            </SubscribeBtn>
          </SubscribeBtnContainer2>
        </InnerHeaderContainer>
        <InnerHeaderLabel>MARKETPLACE</InnerHeaderLabel>
        {isLoading ?
          <Spin
            style={{ height: "500px", width: "100%", paddingTop: "150px" }}
            tip="Loading..."
          ></Spin> :
          <BoosterSlider nfts={nfts} />
        }
        <OfferBox result={offers} />
        <CssDiv pb={"50px"}>
          <Buttons />
          <TabContainer>
            <div>
              {flag_offerAuction == "offer" && (
                <Typography.Title className="typo-title">
                  <span className="typo-title">OFFICIAL OFFER</span>
                </Typography.Title>
              )}
              {flag_offerAuction == "auction" && (
                <Typography.Title className="typo-title">
                  <span className="typo-title">AUCTION</span>
                </Typography.Title>
              )}
            </div>
            <TabFilterBar>
              <Input
                suffix={<SearchOutlined />}
                bordered={false}
                placeholder="Search"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  height: "37px",
                  marginRight: "20px",
                }}
              />
              <Button
                type="primary"
                ghost
                style={{ width: "90px", height: "37px", marginRight: "20px" }}
                onClick={onClickFilters}
              >
                FILTERS
              </Button>
            </TabFilterBar>
          </TabContainer>
          {
            flag_offerAuction == "offer" &&
            (
              isLoading ?
                <Spin
                  style={{ height: "500px", width: "100%", paddingTop: "150px" }}
                  tip="Loading..."
                ></Spin> :
                <NftCardContainer>
                  {offerNFTs.map((card, index) => (
                    <NFTGeometricCard
                      key={index}
                      id={card.id}
                      brickColor={card.brickColor}
                      text={card.sport}
                      playerName={card.title}
                      usdValue={card.priceUSD}
                      imageUrl={card.imgSrc}
                      cryptoValue={card.price}
                      personal={card.personal}
                      owner={card.owner}
                      address={card.address}
                      amount={card.amount}
                      itemId={card.itemId}
                    />
                  ))}
                </NftCardContainer>
            )
          }
          {flag_offerAuction == "auction" && (
            isLoading ?
              <Spin
                style={{ height: "500px", width: "100%", paddingTop: "150px" }}
                tip="Loading..."
              ></Spin> :
              <NftCardContainer>
                {auctionNFTs.map((card, index) => (
                  <NFTGeometricCard
                    key={index}
                    id={card.id}
                    brickColor={card.brickColor}
                    text={card.sport}
                    playerName={card.title}
                    usdValue={card.priceUSD}
                    imageUrl={card.imgSrc}
                    cryptoValue={card.price}
                    personal={card.personal}
                    owner={card.owner}
                    address={card.address}
                    amount={card.amount}
                    itemId={card.itemId}
                  />
                ))}
              </NftCardContainer>
          )}
        </CssDiv>
      </InfoContainer>
    </>
  )
}

export default Marketplace
