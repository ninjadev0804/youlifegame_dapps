/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react"
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import { Card, Image, Tooltip, Modal, Skeleton } from "antd"
import {
  FileSearchOutlined,
  RightCircleOutlined,
  SendOutlined,
} from "@ant-design/icons"
import { getExplorer } from "helpers/networks"
import { useVerifyMetadata } from "hooks/useVerifyMetadata"
import { getCollectionsByChain } from "helpers/collections"

const { Meta } = Card

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    width: "100%",
    gap: "10px",
  },
}

function NFTTokenIds({ collectionId, setInputValue }) {
  const [nftTokenIds, setNftTokenIds] = useState({})
  const { chainId } = useMoralis()
  const [visible, setVisibility] = useState(false)
  const NFTCollections = getCollectionsByChain(chainId)
  // const [receiverToSend, setReceiver] = useState(null);
  // const [amountToSend, setAmount] = useState(null);
  const [nftToBuy, setNftToBuy] = useState(null)
  const [selectedNftImage, setSelectedNftImage] = useState(null)
  // const [isPending, setIsPending] = useState(false);
  const { verifyMetadata } = useVerifyMetadata()
  const Web3Api = useMoralisWeb3Api()
  const fetchAllTokenIds = useCallback(
    async ({ collectionId }) => {
      const options = {
        address: collectionId,
        chain: chainId,
        limit: 20,
      }
      const NFTs = await Web3Api.token.getAllTokenIds(options)
      setNftTokenIds(NFTs)
    },
    [Web3Api.token, chainId],
  )
  useEffect(() => {
    fetchAllTokenIds({ collectionId })
  }, [fetchAllTokenIds, collectionId])

  const handleBuy = (nft, imgURL) => {
    setNftToBuy(nft)
    setSelectedNftImage(imgURL)
    setVisibility(true)
  }

  return (
    <div
      style={{
        padding: "15px",
        maxWidth: "1030px",
        width: "100%",
        // overflow: "scroll",
        height: "100%",
      }}
    >
      <h1>YLG NFT Collections</h1>
      <div style={{ ...styles.NFTs, height: collectionId ? "100%" : "100vh" }}>
        {collectionId === null &&
          NFTCollections?.map((nft, index) => (
            <Card
              hoverable
              actions={[
                <Tooltip title="View Collection">
                  <RightCircleOutlined
                    onClick={() => setInputValue(nft?.addrs)}
                  />
                </Tooltip>,
              ]}
              style={{ width: 240, border: "2px solid #e7eaf3", height: "50%" }}
              cover={
                <Image
                  preview={false}
                  src={nft?.image || "error"}
                  alt=""
                  style={{ height: "240px" }}
                />
              }
              key={index}
            >
              <Meta title={nft.name} />
            </Card>
          ))}
        {collectionId && (
          <Skeleton loading={!nftTokenIds?.result}>
            {nftTokenIds?.result &&
              nftTokenIds.result.map((nft, index) => {
                //Verify Metadata
                nft = verifyMetadata(nft)
                var imgURL
                if (nft?.image) {
                  imgURL = nft.image
                } else {
                  const isIpfs =
                    JSON.parse(nft?.metadata)?.image.slice(0, 7) === "ipfs://"
                  imgURL =
                    nft?.metadata?.image && isIpfs
                      ? `https://gateway.moralisipfs.com/ipfs/${JSON.parse(
                          nft.metadata,
                        ).image.slice(7)}`
                      : JSON.parse(nft.metadata)?.image
                }

                return (
                  <Card
                    hoverable
                    actions={[
                      <Tooltip title="View On Blockexplorer">
                        <FileSearchOutlined
                          onClick={() =>
                            window.open(
                              `${getExplorer(chainId)}address/${
                                nft.token_address
                              }`,
                              "_blank",
                            )
                          }
                        />
                      </Tooltip>,
                      <Tooltip title="Buy NFT">
                        <SendOutlined onClick={() => handleBuy(nft, imgURL)} />
                      </Tooltip>,
                    ]}
                    style={{ width: 240, border: "2px solid #e7eaf3" }}
                    cover={
                      <Image
                        preview={false}
                        src={nft.image || imgURL || "error"}
                        fallback="data:image/png;base64,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"
                        alt=""
                        style={{ height: "300px" }}
                      />
                    }
                    key={index}
                  >
                    <Meta title={nft.name} description={nft.token_address} />
                  </Card>
                )
              })}
          </Skeleton>
        )}
      </div>
      <Modal
        title={`Buy ${nftToBuy?.name || "NFT"}`}
        open={visible}
        onOk={() => alert("bought the nft")}
        onCancel={() => setVisibility(false)}
        okText="Buy"
      >
        <img
          src={selectedNftImage}
          style={{
            width: "250px",
            margin: "auto",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        />
      </Modal>
    </div>
  )
}

export default NFTTokenIds
