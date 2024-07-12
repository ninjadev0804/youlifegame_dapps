/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "react-dropdown/style.css";
import Link from "next/link";
import Head from "next/head";
import { Scrolling } from "../components/Scrolling";
import Image from 'next/image';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader/Preloader";
import SwapForm from "../components/SwapForm";
import RateSetModal from "../components/RateSetModal";
import "antd/dist/antd.css";
import EventsModal from "../components/EventsModal";

const options = [
  { label: 'Swap', value: 'swap' },
  { label: 'Liquidity', value: 'liquidity' },
];

export default function Home() {
  
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useMoralis();   
  const [eventsModalOpen, setEventsModalOpen] = useState(false);
  const [rateModalOpen, setRateModalOpen] = useState(false);
 

  const eventsModalOpenHandler = () => {
    setEventsModalOpen(true);
  } 
  const rateModalOpenHandler = () => {
    setRateModalOpen(true);
  }

  const eventsModalCloseHandler = () => {
    setEventsModalOpen(false);
    setRateModalOpen(false);
  }

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!-- HTML Meta Tags --> */}
        <meta
          name="description"
          content="PUT THE FUTURE IN YOUR HANDS - Money from the Player NFT sales is transferred to real teams to help support and develop youth sports leagues! Live YourLIfe and Earn!"
        />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemProp="name" content="Your Life Games" />
        <meta
          itemProp="description"
          content="PUT THE FUTURE IN YOUR HANDS - Money from the Player NFT sales is transferred to real teams to help support and develop youth sports leagues! Live YourLife and Earn!"
        />
        <meta
          itemProp="image"
          content="https://nft.yourlifegames.com/static/media/yourlife_white.605e26de.png"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.yourlifegames.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Your Life Games" />
        <meta
          property="og:description"
          content="PUT THE FUTURE IN YOUR HANDS - Money from the Player NFT sales is transferred to real teams to help support and develop youth sports leagues! Live YourLife and Earn!"
        />
        <meta
          property="og:image"
          content="https://nft.yourlifegames.com/static/media/yourlife_white.605e26de.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Life Games" />
        <meta
          name="twitter:description"
          content="PUT THE FUTURE IN YOUR HANDS - Money from the Player NFT sales is transferred to real teams to help support and develop youth sports leagues - This unique opportunity provides both Fun & Finances at the same time! Live YourLife and Earn!"
        />
        <meta
          name="twitter:image"
          content="https://nft.yourlifegames.com/static/media/yourlife_white.605e26de.png"
        />
      </Head>
      {isLoading && <Preloader />}
      <div className="md:block hidden">
				<Scrolling />
			</div>
      <div className="relative flex flex-col items-center justify-between w-full min-h-screen pt-6 mx-auto overflow-x-hidden">
        {/* Main Container */}

        <Navbar setIsLoading={setIsLoading} />

        {user && user.attributes.isSuperAdmin && (
          <>
            <div className="w-full px-3">
              <div className="px-3 w-full">
                <button className="bg-[#ffffff] rounded-md px-5 pb-3 pt-3 stripe_rate_btn mt-7" onClick={rateModalOpenHandler}>
                  <img src="/assets/btn_stripe.png" alt="" /><span className=" tracking-wide">SET RATE FOR STRIPE</span>
                </button>
                <button className="bg-[#ffffff] rounded-md px-5 pb-3 pt-3 stripe_rate_btn mt-2" onClick={eventsModalOpenHandler}>
                  <img src="/assets/history.png" alt="no image" className="w-[26px] h-[22px]" /><span className="tracking-wide">TRANSACTION HISTORY</span>
                </button>
              </div>
            </div>

            <div className="flex px-2 justify-center w-full">
              <div className="flex bg-gray-300 rounded xl:-mt-5 mt-5 sm:max-w-screen-sm w-full max-w-[460px] border-4 border-[#BFBFD1]">
                <Link href="/">
                  <div className="flex items-center justify-center h-20 bg-white rounded w-1/2 font-bold text-2xl text-[#3985F5] cursor-pointer">
                    Swap
                  </div>
                </Link>
                <Link href="liquidity">
                  <div className="flex items-center justify-center h-20 rounded w-1/2 bg-[#BFBFD1] text-white font-bold text-2xl tracking-wider cursor-pointer">
                    Liquidity
                  </div>
                </Link>
              </div>
            </div>

            {rateModalOpen && (
              <RateSetModal onClose={eventsModalCloseHandler} />
            )}
            {eventsModalOpen && (
              <EventsModal onClose={eventsModalCloseHandler} />
            )}
          </>
        )}

        <SwapForm setIsLoading={setIsLoading} />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
