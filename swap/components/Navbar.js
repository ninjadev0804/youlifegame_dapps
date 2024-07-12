/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarLogo from "../assets/NavbarLogo.svg";
import Logo from "../assets/Logoemblem.svg";
import Link from "next/link";
import Account from "./Account";
import Burger from '@/assets/burger.svg';
import Burger2 from '@/assets/burger2.svg'
import Cross from '@/assets/cross.svg';
import LeftArrow from '@/assets/left-arrow.svg'
import GameLogo from '@/assets/logo.svg'
import EventsModal from "./EventsModal";
import { useMoralis } from "react-moralis";
import MarketPlaceSVG from '/assets/marketplace.svg';
import SwitchNetwork from "./SwitchNetwork";
import { useSelector, useDispatch } from 'react-redux';
import * as notify from '../state/ylttoast/index'; 
import OneSignal from 'react-onesignal';

export default function Navbar({ setIsLoading }) {
 


  const dispatch = useDispatch();
  const notiInfo = useSelector(({ notification }) => notification.value);

  useEffect(() => {
    const set = notiInfo.set;
    const data = notiInfo.data;
    if (set && data) {
      if (data.type == 1) {
        toast(data.msg, { type: toast.TYPE.INFO, autoClose: 6000 })
      }
      if (data.type == 3) {
        toast(data.msg, { type: toast.TYPE.WARNING, autoClose: 6000 })
      }
      clearNotify()
    }

  }, [notiInfo])

  const clearNotify = () => {
    const msg = {
      set: false,
      data: {}
    }
    dispatch(notify.setNotification(msg))
  }

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [eventsModalOpen, setEventsModalOpen] = useState(false);
  const [tokenURI, setTokenURI] = useState("")
  const { authenticate, isAuthenticated, user } = useMoralis();

  const authUser = () => authenticate({
    provider: process.env.NEXT_PUBLIC_WEB3AUTH_PROVIDER,
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
    theme: process.env.NEXT_PUBLIC_THEME,
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  })

  const toggleMobileMenuHandler = () => setOpenMobileMenu(!openMobileMenu)

  const eventsModalOpenHandler = () => setEventsModalOpen(true)

  const eventsModalCloseHandler = () => setEventsModalOpen(false)

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 1,
        width: "100%"
      }}
    />
  );

  useEffect(() => {
    setTokenURI(`?token=${user?.id}`) 
    if(user != null && user.attributes.isSuperAdmin) { 
      OneSignal.sendTag('admin', "superAdmin"); 
    }
  }, [isAuthenticated])

  const mobileMenu = (
    <div className="flex shadow md:hidden absolute top-full items-start mt-3 right-3 left-3 justify-between px-4 py-5 rounded-xl bg-[#ffffff] z-[11]">
      <div className="flex flex-col items-start w-full text-center">

        <Link key={1} href={`${"https://nft.yourlifegames.com/nftMarket"}${tokenURI}`}>
          <a className="block w-full no-underline text-md uppercase underline underline-offset-8 decoration-[#90E040] mb-4">
            <MarketPlaceSVG className="mr-2" />
            <span className="ml-2">Marketplace</span>
          </a>
        </Link>
        {
          user && user.attributes.isSuperAdmin && (
            <Link key={5} href="/transfers" >
              <a className="block w-full no-underline text-md uppercase underline underline-offset-8 decoration-[#90E040] mb-4">
                Transfers
              </a>
            </Link>
          )
        }

        <Link key={2} href={`${"https://nft.yourlifegames.com/myaccount"}${tokenURI}`}>
          <a className="block w-full no-underline text-md uppercase underline underline-offset-8 decoration-[#90E040] mb-4">
            My account
          </a>
        </Link>

        <Link key={3} href={`${"https://nft.yourlifegames.com/collections"}${tokenURI}`}>
          <a className="block w-full no-underline text-md uppercase underline underline-offset-8 decoration-[#90E040] mb-4">
            Collections
          </a>
        </Link>

        <Link key={4} href={`${"https://nft.yourlifegames.com/chat"}${tokenURI}`}>
          <a className="block w-full no-underline text-md uppercase underline underline-offset-8 decoration-[#90E040] mb-4">
            Chat
          </a>
        </Link>
        <ColoredLine color="grey" />
        <div className="w-full px-3 pt-3">
          <button
            onClick={authUser}
            type="button"
            className="w-full h-10 px-6 py-2 m-auto uppercase rounded-lg"
          >
            Authenticate
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative flex items-center w-full h-20 px-3 text-center shrink-0 navbar-zindex">
      {/* logo container */}
      <div className="bg-[#242424] mr-[70px] relative h-full rounded-l-xl md:flex justify-center items-center with-triangle triangle hidden gap-x-[10px] xl:min-w-[244px] min-w-[80px]">
				<NavbarLogo className="xl:block hidden w-18 h-10 fill-white" />
        <Logo className="w-18 h-18 fill-white xl:hidden block"/>
				{/* <Image src={Logo} alt="logo" width={60} height={60} objectFit="contain" /> */}
				{/* <p className="uppercase text-xl text-white font-bold mr-10">ylg</p> */}
			</div>
      {/* Navbar Links */}
      <div className="flex h-full w-full pl-3 md:pl-0 md:pr-12 md:bg-[#ffffff] bg-none rounded-r-xl items-center justify-between white-triangle-reverted with-triangle md:before:block before:hidden">
        <button className="md:hidden block">
					<LeftArrow />
				</button>
				<div className="md:hidden flex cursor-pointer">
					<GameLogo />
				</div>
        <button className="md:right-10 -right-0.5 block md:hidden" onClick={toggleMobileMenuHandler}>
          {!openMobileMenu ? (<Burger2 className="w-10 h-4" />) : (<Cross className="w-10 h-5" />)}
        </button>
        <div className="hidden md:flex">
          <Link key={1} href={`${"https://nft.yourlifegames.com/nftMarket"}${tokenURI}`}>
            <a className="flex text-md text-[#242424] uppercase underline underline-offset-8 underline-color decoration-[#3985F5] mr-4">
              <MarketPlaceSVG className="mr-2" />
              Marketplace
            </a>
          </Link>
          {
            user && user.attributes.isSuperAdmin && (
              <Link kye={5} href="/transfers" >
                <a className="flex text-md text-[#242424] uppercase underline underline-offset-8 underline-color decoration-[#3985F5] mr-4">
                  Transfers
                </a>
              </Link>
            )
          } 
          <Link key={2} href={`${"https://nft.yourlifegames.com/myaccount"}${tokenURI}`}>
            <a className="flex text-md text-[#242424] uppercase underline underline-offset-8 underline-color decoration-[#3985F5] mr-4">
              My account
            </a>
          </Link> 
          <Link key={3} href={`${"https://nft.yourlifegames.com/collections"}${tokenURI}`}>
            <a className="flex text-md text-[#242424] uppercase underline underline-offset-8 underline-color decoration-[#3985F5] mr-4">
              Collections
            </a>
          </Link> 
          <Link key={4} href={`${"https://nft.yourlifegames.com/chat"}${tokenURI}`}>
            <a className="flex text-md text-[#242424] uppercase underline underline-offset-8 underline-color decoration-[#3985F5] mr-4">
              Chat
            </a>
          </Link>
        </div> 
        {/* user account*/}
        <div className="relative items-center hidden md:flex">
          <div className="pr-6">
            <SwitchNetwork />
          </div>
          <Account
            setIsLoading={setIsLoading}
            openEventsModal={eventsModalOpenHandler}
            onAuth={authUser}
          />
        </div>
      </div>

      {/* mobileMenu */}
      {openMobileMenu && mobileMenu}

      {eventsModalOpen && <EventsModal onClose={eventsModalCloseHandler} />}
      <ToastContainer />
    </div >

  );
};
