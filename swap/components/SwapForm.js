/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";
import { emailValidate } from "../utils/emailValidation";
import Chevron from '../assets/chevron.svg';
import CurrencyDropdown from "./CurrencyDropdown";
import AdvancedSwapDetailsDropdown from 'components/swap/AdvancedSwapDetailsDropdown'
import useWrapCallback, { WrapType } from '../hooks/useWrapCallback'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../state/swap/hooks'
import Logo from "../assets/Logoemblem.svg";
import BtnRefresh from '../assets/refresh.svg'
import BtnArrowDownGreen from '../assets/btn-arrow-down-green.svg'
import BtnArrow from '../assets/btn-arrow.svg'
import BUSDTokenABI from "../contracts/abi/BUSDToken.json";
import USDTTokenABI from "../contracts/abi/USDTToken.json";
import YLTABI from "../contracts/abi/YLT.json";
import IUniswapV2Router02ABI from "../contracts/abi/IUniswapV2Router02.json";
import WAValidator from "multicoin-address-validator";
import { useDispatch } from 'react-redux';
import * as notify from '../state/ylttoast/index';
import OneSignal from 'react-onesignal';
import { Currency } from "pancakeswap-v2-testnet-sdk";

const _chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
const YLTtokenAddress = process.env.NEXT_PUBLIC_YLTtokenAddress;
const USDTtokenAddress = process.env.NEXT_PUBLIC_USDTtokenAddress;
const BUSDtoeknAddress = process.env.NEXT_PUBLIC_BUSDtokenAddress;
const RouterAddress = process.env.NEXT_PUBLIC_RouterAddress;

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(publishableKey);
const isBrowser = typeof window !== "undefined";
const isWallet = isBrowser ? typeof window.ethereum !== "undefined" : false;
const web3Provider = isWallet ? new ethers.providers.Web3Provider(window.ethereum) : null;

const currency = [
  {
    id: 'USD',
    title: "USD",
    image: '/assets/usd.png',
    address: YLTtokenAddress,
    chainId: 97,
    decimals: 18,
    name: "YourLife Token",
    symbol: "YLT",
  },
  {
    id: 'USDT',
    title: "USDT",
    image: '/assets/usdt.png',
    address: USDTtokenAddress,
    chainId: 97,
    decimals: 18,
    name: "USDT Token",
    symbol: "USDT",
  },
  {
    id: 'BUSD',
    title: "BUSD",
    image: '/assets/busd.png',
    address: BUSDtoeknAddress,
    chainId: 97,
    decimals: 18,
    name: "Binance USD",
    symbol: "BUSD",
  },
];




export default function SwapForm({ setIsLoading }) {

  // pancake hooks
  const { typedValue } = useSwapState()
  const { v2Trade, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  const { onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const dispatch = useDispatch();
  // input values
  const [usdAmount, setUsdAmount] = useState(0.0);
  const [ylt, setYlt] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(currency[0].id);
  const [walletAddress, setWalletAddress] = useState({
    value: "",
    isValid: false,
  });
  const [email, setEmail] = useState("");
  // rates
  const [rateUSDT, setRateUSDT] = useState(0.0);
  const [rateBUSD, setRateBUSD] = useState(0.0);
  const [rateStripe, setRateStripe] = useState(0);
  // balances
  const [yltBalance, setYltBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [busdBalance, setBusdBalance] = useState(0);
  // moralis
  const { user, isAuthenticated, Moralis, authenticate } = useMoralis();
  const [chainId, setChainId] = useState(web3Provider?.network?.chainId);
  // etc
  const router = useRouter();
  // current network
  const item = useRef({
    name: "YL Token",
    description: "Latest Apple AirPods.",
    image: appUrl + "/assets/LogoYLGWhite.png",
    quantity: 1,
    price: 9,
    email: "",
    address: "",
    amount: "",
    token: "",
    scanid:"",
    usertoken:""
  });

  const [revert, setRevert] = useState(true);

  const registerOneSignal = (address, email) => {
    OneSignal.setEmail(email, email);
  }
  // when mounted, initialize web3 modules
  function updateChainId(network) {
    setChainId(network.chainId);
  }
  useEffect(() => {
    if (!isBrowser) return;
    web3Provider?.on('network', updateChainId);
    return () => {
      web3Provider?.removeListener('network', updateChainId);
    }
  }, []);

  useEffect(() => {
    if (typeof window.ethereum == 'undefined') {
      const msg = {
        set: true,
        data: { type: 3, msg: 'You need to install crypto wallet' }
      }
      dispatch(notify.setNotification(msg))
    }
  }, []);

  useEffect(() => {
    async function getBalanceAsync() {
      await getBalance(selectedCurrency);
      const value = await Moralis.Cloud.run("getStripeRate");
      setRateStripe(value?.attributes.rate);
      await refreshRate();
    };
    getBalanceAsync();
  }, [isAuthenticated, chainId]);

  useEffect(() => {
    async function func() {
      const { status, token, timestamp } = router.query;
      setIsLoading(true);
      if (status == "success" && token?.length > 100 && timestamp?.length > 20) {
        const _item = JSON.parse(localStorage.getItem('item'));
        const data = {
          email: _item.current.email,
          address: _item.current.address,
          tokenAmount: _item.current.price.toString(),
          yltAmount: _item.current.amount.toString(),
          tokenType: 2,
          token: token,
          state: 0,
          usertoken:'USD',
          scanid: '',
        }
        // await Moralis.Cloud.run("saveTokenSwap", data);
        await axios
          .post("api/posts/stripeSuccess",
            {
              status: status,
              timestamp: token,
              data
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            }
          ).then((res) => {
            setIsLoading(false);
            const msg = {
              set: true,
              data: { type: 1, msg: 'Payment successed! Admin will send token to your wallet, please wait admin email' }
            }
            dispatch(notify.setNotification(msg))
            router.push("/")
          }).catch((e) => {

          })
      }

      if (token?.length > 20) {
        if (localStorage.getItem(process.env.NEXT_PUBLIC_localStorage) == undefined) {
          const result = await Moralis.Cloud.run("getUserById", { id: token });

          localStorage.setItem(process.env.NEXT_PUBLIC_localStorage, JSON.stringify(result));
          setEmail(result?.attributes.email);
          router.push("/"); // remove token and other things ...
          location.reload(); // because react doesn't rerender components if not changed
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }

    }
    func();
  }, [router.isReady]);

  useEffect(() => {
    getBalance(selectedCurrency)
  }, [selectedCurrency])

  const addEmail = async () => {
    const { id } = user;
    await Moralis.Cloud.run("addEmail", { id, email });
  };

  const canSwap = () => {
    if (selectedCurrency == 'USD' && usdAmount < 0.6) return false;
    if (ylt <= 0 || usdAmount <= 0) return false;
    if (!ylt && !usdAmount) return false;
    if (user && !user?.attributes.email && !email) return false;
    //if (email && !emailValidate(email)) return false; 
    if (user && !user?.attributes.ethAddress && !walletAddress.isValid) return false;
    return true;
  };

  // swap by using token
  async function swapWithToken() {
    if (chainId != _chainId) return;
    if (!isAuthenticated) {
      authenticate()
      return
    }

    setIsLoading(true);
    if (isAuthenticated && email) {
      await addEmail();
    }

    const amountOutMin = 0;
    const amountIn = usdAmount;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    let to = null;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      to = accounts[0];
    } catch (err) {
      setIsLoading(false);
      return;
    }

    let metaSigner = web3Provider.getSigner(to);


    try {
      const RouterContract = new ethers.Contract(
        RouterAddress,
        IUniswapV2Router02ABI.abi,
        metaSigner
      );

      if (selectedCurrency == "USDT") {
        const path = [USDTtokenAddress, YLTtokenAddress];
        const USDTContract = new ethers.Contract(
          USDTtokenAddress,
          USDTTokenABI,
          metaSigner
        );
        let tx = await USDTContract.approve(
          RouterAddress,
          ethers.utils.parseUnits(Number(amountIn).toString(), 18)
        );
        await tx.wait();
        // transaction to carry
        tx = await RouterContract.swapExactTokensForTokens(
          ethers.utils.parseUnits(Number(amountIn).toString(), 18),
          amountOutMin,
          path,
          to,
          deadline
        );
        const res = await tx.wait();
        await getBalance(selectedCurrency);
        await Moralis.Cloud.run("saveTokenSwap", {
          email: !user?.attributes.email ? email : user?.attributes.email,
          address: to,
          tokenAmount: usdAmount.toString(),
          yltAmount: ylt.toString(),
          tokenType: 1,
          state: 1,
          usertoken:'USDT',
          scanid: res.transactionHash,
        });

        setIsLoading(false);
      }
      if (selectedCurrency == "BUSD") {
        const path = [BUSDtoeknAddress, YLTtokenAddress];
        const BUSDContract = new ethers.Contract(
          BUSDtoeknAddress,
          BUSDTokenABI,
          metaSigner
        );
        let tx = await BUSDContract.approve(
          RouterAddress,
          ethers.utils.parseUnits(Number(amountIn).toString(), 18)
        );
        const res = await tx.wait();
        // transaction to carry
        tx = await RouterContract.swapExactTokensForTokens(
          ethers.utils.parseUnits(Number(amountIn).toString(), 18),
          amountOutMin,
          path,
          to,
          deadline
        );
        await tx.wait();
        await getBalance(selectedCurrency);
        await Moralis.Cloud.run("saveTokenSwap", {
          email: !user?.attributes.email ? email : user?.attributes.email,
          address: to,
          tokenAmount: usdAmount.toString(),
          yltAmount: ylt.toString(),
          tokenType: 1,
          state: 1,
          usertoken:'BUSD',
          scanid: res.transactionHash,
        });

        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(">>>TOKEN SWAP ERR")
    }


  }

  const swapWithStrip = async () => {
    if (chainId != _chainId) return;
    if (!isAuthenticated) {
      authenticate()
      return
    }

    setIsLoading(true);
    let to = null;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      to = accounts[0];
    } catch (err) {
      setIsLoading(false);
      return;
    }

    stripePromise.then((stripe) => {
      item.current.price = usdAmount;
      item.current.address = to;
      item.current.amount = ylt;
      item.current.email = !user?.attributes.email ? email : user?.attributes.email;
      item.current.token = user?.id;
      item.current.usertoken = "USD";
      item.current.scanid = "";
      localStorage.setItem('item', JSON.stringify(item));

      registerOneSignal(item.current.address, item.current.email);

      axios
        .post(
          "/api/posts/create-checkout-session",
          { item: item.current },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            }
          }
        )
        .then((checkoutSession) => {
          stripe
            .redirectToCheckout({ sessionId: checkoutSession.data.id })
            .then((result) => {
              if (result.error) {
                // alert(result.error.message);
              }
            });
        })
        .catch((err) => {
          setIsLoading(false);
        });
    });
  };

  // etc
  const refreshRate = async () => {
    if (!isBrowser) return;
    if (chainId != _chainId) return;
    let to = null;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      to = accounts[0];
      const metaSigner = web3Provider.getSigner(to);
      const routerContract = new ethers.Contract(
        RouterAddress,
        IUniswapV2Router02ABI.abi,
        metaSigner
      );
      const swapAmount = ethers.utils.parseUnits("1", 18);
      const amountsOutUSDT = await routerContract.getAmountsOut(
        swapAmount.toString(),
        [USDTtokenAddress, YLTtokenAddress]
      );
      const currentRateT = ethers.utils.formatEther(amountsOutUSDT[1]);
      setRateUSDT(Number.parseFloat(currentRateT).toFixed(6));
      const amountsOutBUSD = await routerContract.getAmountsOut(
        swapAmount.toString(),
        [BUSDtoeknAddress, YLTtokenAddress]
      );
      const currentRateB = ethers.utils.formatEther(amountsOutBUSD[1]);
      setRateBUSD(Number.parseFloat(currentRateB).toFixed(6));
    } catch (err) {
      console.log(">>>GET RATE ERR", err.message)
      return 0; // finish function
    }
  };

  const getBalance = async (sc) => {
    if (chainId != _chainId) return;

    try {
      let to = null;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      to = accounts[0];

      let metaSigner = web3Provider.getSigner(to);
      const BUSDContract = new ethers.Contract(
        BUSDtoeknAddress,
        BUSDTokenABI,
        metaSigner
      );
      const busdBalance = await BUSDContract.balanceOf(to);
      setBusdBalance(busdBalance.toString() / 10 ** 18);

      const USDTContract = new ethers.Contract(
        USDTtokenAddress,
        USDTTokenABI,
        metaSigner
      );
      const usdtBalance = await USDTContract.balanceOf(to);
      setUsdtBalance(usdtBalance.toString() / 10 ** 18);

      const YLTContract = new ethers.Contract(
        YLTtokenAddress,
        YLTABI,
        metaSigner
      );
      const balance = await YLTContract.balanceOf(to);
      setYltBalance(balance.toString() / 10 ** 18);

    } catch (e) {
      console.log(">>GET BALANCE ERR", e.message)
    }
  };

  // events
  const handleWalletChange = (value) => {
    setWalletAddress({
      value,
      isValid: WAValidator.validate(value, "BNB"),
    });
  };

  const handleChangeCurrency = async (currencyId) => {
    if (currencyId == 'USD') {
      setYlt(Number.parseFloat(usdAmount * rateStripe).toFixed(6));
    } else if (currencyId == "USDT") {
      setYlt(Number.parseFloat(usdAmount * rateUSDT).toFixed(6));
      onCurrencySelection(Field.INPUT, currency[1])
      onCurrencySelection(Field.OUTPUT, currency[0])
    } else {
      setYlt(Number.parseFloat(usdAmount * rateBUSD).toFixed(6));
      onCurrencySelection(Field.INPUT, currency[2])
      onCurrencySelection(Field.OUTPUT, currency[0])
    }
    setSelectedCurrency(currencyId);
    await refreshRate();
  };

  const handleUsdAmount = (value) => {
    if (value < 0) value = 0;
    setUsdAmount(value);
    if (selectedCurrency == 'USD') {
      setYlt(value * rateStripe);
    } else if (selectedCurrency == 'USDT') {
      onUserInput(Field.INPUT, value.toString())
      setYlt(value * rateUSDT);
    } else {
      onUserInput(Field.INPUT, value.toString())
      setYlt(value * rateBUSD);
    }
  };

  const handleYLTAmount = (value) => {
    if (value <= 0) {
      value = 0;
      setYlt(0);
      setUsdAmount(0);
    } else {
      setYlt(value);
      if (selectedCurrency == 'USD') {
        setUsdAmount(Number(rateStripe) ? value / rateStripe : 0);
      } else if (selectedCurrency == 'USDT') {
        setUsdAmount(Number(rateUSDT) ? value / rateUSDT : 0);
      } else {
        setUsdAmount(Number(rateBUSD) ? value / rateBUSD : 0);
      }
    }
  };

  const revertion = () => {
    refreshRate();
    setRevert(!revert)
  }

  const inputMax = () => { 
    if(selectedCurrency == "USDT"){
      handleUsdAmount(usdtBalance)
    }
    if(selectedCurrency == "BUSD"){
      handleUsdAmount(busdBalance)
    }
  }

  return (
    <div className="sm:max-w-screen-sm sm:w-full bg-white relative mx-3 flex flex-col rounded-2xl pt-3 pb-5 px-2.5 my-10">
      <div className="relative flex flex-col text-5xl mb-7">
        <div className="w-full relative flex justify-center">
          <div className="absolute w-10 h-10 flex justify-center items-center left-5 rounded-full bg-[#F6F6F7] cursor-pointer">
            <BtnArrow />

          </div>
          <span className="text-[#242424] font-bold text-2xl mb-12">EXCHANGE</span>
        </div>
        <div className="relative w-full">
          <div className={`absolute right-5 top-2/4 -translate-y-2/4 items-end flex flex-row gap-x-5 ${selectedCurrency != "USD" && "mt-2"}`}>
            {selectedCurrency !="USD" && <p className="font-bold text-[14px] text-[#3985F5] mb-3 select-none" style={{cursor:'pointer'}} onClick={()=>inputMax()}>MAX</p>}
            <div className="flex flex-col">
              {isAuthenticated && selectedCurrency != 'USD' && (
                <p className="text-sm">Balance: {selectedCurrency == "BUSD" ? busdBalance.toFixed(4) : usdtBalance.toFixed(4)} </p>
              )}
              <CurrencyDropdown 
                options={currency}
                selectedId={selectedCurrency}
                onChange={(e)=>handleChangeCurrency(e)} />
            </div>
          </div>
          <p className="absolute text-[#242424] text-[14px] font-medium !pl-3 pt-3 select-none">From</p>

          <NumericFormat
            placeholder="Enter amount"
            value={usdAmount}
            thousandSeparator={true}
            decimalScale={6}
            onValueChange={(values, sourceInfo) => {
              handleUsdAmount(values.floatValue);
            }}
            className="form-input h-[100px] text-2xl sm:text-3xl pb-0"
          />
        </div>
        <div className="w-full py-2 flex justify-center">
          <div className="w-10 h-10 bg-[#F6F6F7] rounded-full flex justify-center items-center">
            <BtnArrowDownGreen />
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute flex flex-col items-end right-5 top-2/4 -translate-y-2/4">
            {isAuthenticated && (
              <p className="text-sm">Balance: {yltBalance.toFixed(2)} </p>
            )}{" "}
            <div className="mt-2 py-1 px-2.5 w-[134px] flex items-center justify-center rounded-lg bg-[#C3EB9B] cursor-pointer">
              <Logo className="h-7 w-7 mr-1.5" />
              <span className="text-2xl opacity-50 mx-3">YLT</span>
              <Chevron className="w-3.5 h-1.5 fill-transparent stroke-[#242424] grow" />
            </div>
          </div>
          <div className="absolute text-[#242424] font-medium text-[14px] pt-5 pl-3 select-none">To (estimated)</div>
          <NumericFormat
            placeholder="YLT Token Amount"
            value={ylt}
            thousandSeparator={true}
            decimalScale={6}
            onValueChange={(values, sourceInfo) => {
              handleYLTAmount(values.floatValue);
            }}
            className="form-input mt-2 w-full h-[100px] text-2xl sm:text-3xl pb-0"
          />
        </div>
      </div>
      {!user?.attributes.ethAddress && (
        <>
          <label
            htmlFor="walletAddress"
            className="mt-5 w-[97%] mx-auto text-gray-500 text-xs"
          >
            Your wallet must be BEP-20 compatible
          </label>
          <input
            id="walletAddress"
            type="text"
            placeholder="Enter your crypto wallet address"
            value={walletAddress.value}
            onChange={(e) => handleWalletChange(e.target.value)}
            className={`form-input font-normal text-lg ${walletAddress.value.length > 0
              ? walletAddress.isValid
                ? "border-2 border-green-500"
                : "border-2 border-red-500"
              : ""
              }`}
          />
        </>
      )}
      {!user?.attributes.email && (
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg font-normal form-input"
        />
      )}
      {user?.attributes.ethAddress && (
        <>
          <div className="pl-3">
            You will get your YLT tokens to this wallet Address
          </div>
          <input
            type="text"
            disabled
            value={user?.attributes.ethAddress}
            className="text-lg font-normal form-input"
          />
        </>
      )}
      {
        selectedCurrency !== 'USD' &&
        <>
          <div className="w-full flex justify-between items-center text-[#242424] mb-4 px-3 mt-3">
            <span className="text-[14px] font-bold">Price</span>
            <div className="flex justify-between gap-3 items-center">
              {
                revert?
                <span className="font-bold text-[14px] tracking-tight">{selectedCurrency == 'USDT' ? (1 / rateUSDT).toFixed(4) + " USDT" : (1 / rateBUSD).toFixed(4) + " BUSD"} per YLT</span>
                :<span className="font-bold text-[14px] tracking-tight">{selectedCurrency=="USDT"? rateUSDT:rateBUSD} YLT per {selectedCurrency} </span>
              }
              <BtnRefresh onClick={revertion} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className="swap-detail">
            <AdvancedSwapDetailsDropdown trade={trade} />
          </div> 
        </>
      }

      {selectedCurrency != 'USD' ? (
        <>
          <button onClick={swapWithToken}
            type="submit"
            className="w-full h-16 rounded-lg bg-[#90E040] hover:bg-[#7bd043] border-none text-2xl text-white mx-auto mt-7 disabled:text-gray-200 cursor-pointer"
          // disabled={canSwap()}
          >
            Swap Anyway
          </button>
        </>
      ) : (
        <button onClick={swapWithStrip}
          type="submit"
          className="w-full h-16 rounded-lg bg-[#3985F5] hover:bg-[#568cde] border-none text-white mx-auto disabled:text-gray-200 cursor-pointer mt-5 text-2xl"
          disabled={!canSwap()}
        >Swap via STRIPE
        </button>
      )}

    </div>

  );
}