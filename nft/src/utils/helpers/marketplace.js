import { ABI } from "../abi/marketplace"
import Moralis from "moralis-v1"
const ENV_CONTRACT_ADDRESS =
  process.env.REACT_APP_YLMARKETPLACE_CONTRACT_ADDRESS

export const minterListedNFT = (tokenId, price, amount, isERC721) => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "minterListedNFT",
    abi: ABI,
    params: {
      _tokenId: tokenId,
      _price: price,
      _amount: amount,
      _isERC721: isERC721,
    },
  }
}

export const buyerListedNFT = (tokenId, price, amount, isERC721) => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "buyerListedNFT",
    abi: ABI,
    params: {
      _tokenId: tokenId,
      _price: price,
      _amount: amount,
      _isERC721: isERC721,
    },
  }
}

export const fetchMarketItems = () => {
  console.log(ENV_CONTRACT_ADDRESS)
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "fetchMarketItems",
    abi: ABI,
  }
}

export const MarketItemSale = (itemId, amount, isERC721) => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "MarketItemSale",
    abi: ABI,
    params: {
      itemId,
      _amount: amount,
      _isERC721: isERC721,
    },
  }
}

export const allowCredential = (owner, flag) => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "allowCredential",
    abi: ABI,
    params: {
      _mOwner: owner,
      _flag: flag,
    },
  }
}

export const isMarketOwner = () => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "isMarketOwner",
    abi: ABI,
  }
}

export const editMarketItem = (itemId, price) => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "editMarketItem",
    abi: ABI,
    params: {
      _itemId: itemId,
      _price: price,
    },
  }
}

export const getMarketFee = () => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "marketfee",
    abi: ABI,
    params: {},
  }
}

export const adminPauseToggle = (_itemId, _amount, _flag) => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "adminPauseToggle",
    abi: ABI,
    params: {
      _itemId,
      _amount,
      _flag,
    },
  }
}

export const depositApproval = (_user, _tokenId, _amount, _flag) => {
  return {
    contractAddress: ENV_CONTRACT_ADDRESS,
    functionName: "depositApproval",
    abi: ABI,
    params: {
      _user,
      _tokenId,
      _amount,
      _flag,
    },
  }
}
