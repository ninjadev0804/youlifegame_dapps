/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useEffect } from 'react';
import { useMoralis } from "react-moralis";
import Cross from '@/assets/cross.svg';
import { Modal } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { ArrowLeft, ArrowRight, CheckCircleFill, BoxArrowUpRight } from "react-bootstrap-icons";
import { shortenAddress, dateFormat } from "../utils/helperFunction";

export default function RateSetModal({ onClose }) {
  const scanUrl = 'https://testnet.bscscan.com/tx/';
  const [rate, setRate] = useState(0);
  const { isAuthenticated, Moralis } = useMoralis();
  const [swapTokenLogs, setSwapTokenLogs] = useState([]);
  const [toggleFiltersModal, setToggleFiltersModal] = useState(false);
  const [swapTokenLogsQuery, setSwapTokenLogsQuery] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); 

  let perPage = 10;
  async function loadSwapTokenLogs() {
    const data = await fetchData();
    setSwapTokenLogsQuery(data);
  }

  useEffect(() => {
    const fn = async () => {
      const value = await Moralis.Cloud.run("getStripeRate")
      setRate(value?.attributes.rate);
      loadSwapTokenLogs();
    }
    fn()
  }, [isAuthenticated]);

  useEffect(() => {
    setLastPage(getLastPage(swapTokenLogsQuery));
    if (lastPage < currentPage) {
      setCurrentPage(1);
    }
    pagination();
  }, [currentPage, swapTokenLogsQuery]);

  const handleRate = async (evt) => {
    const value = evt.target.value;
    if (value >= 0)
      setRate(value);
  }

  const handleSaveRate = async () => {
    await Moralis.Cloud.run("setStripeRate", { rate })
    Modal.success({
      icon: <ExclamationCircleOutlined />,
      content: "Saved!",
    })
  }

  async function fetchData() {
    let query = await Moralis.Cloud.run("getSwapTransfers", {
      searchKeyWord: "",
    });
    if (!query || query.length == 0) {
      return [];
    }

    query = query.filter((log, i) => {
      return log;
    });

    return query.reverse();
  }

  const pagination = () => {
    if (swapTokenLogsQuery && swapTokenLogsQuery.length > 0) {
      setSwapTokenLogs(
        swapTokenLogsQuery.slice(
          (currentPage - 1) * perPage,
          currentPage * perPage
        )
      );
    } else {
      setSwapTokenLogs([]);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    // let minPage = currentPage - 1;
    setCurrentPage(currentPage - 1);
  };

  function getLastPage(result) {
    if (!result || result.length < 0) {
      return 1;
    }
    return Math.ceil(result.length / perPage);
  }

  return (
    <div className="fixed w-screen h-screen bg-[#242424] top-0 left-0 bg-opacity-50 flex justify-end z-20">
      <button
        className="hidden md:flex w-10 h-10 bg-[#f2f3f5] rounded-full justify-center items-center mr-8 mt-20"
        onClick={onClose}
      >
        <Cross className="w-5 h-5 stroke-[#242424]" />
      </button>
      <div className="max-w-2xl w-full h-screen bg-[#F2F3F5] opacity-100 shrink-0 pt-10 md:pt-20 px-10 overflow-y-auto">
        <button
          className="flex md:hidden w-10 h-10 ml-auto bg-[#f2f3f5] rounded-full justify-center items-center mb-8"
          onClick={onClose}
        >
          <Cross className="w-5 h-5 stroke-[#242424]" />
        </button>

        <div className="flex items-end justify-between mb-8">
          <h2 className="text-5xl font-bold uppercase">RATE FOR STRIPE</h2>
        </div>

        <div className="stripe-rate-header">
          <div className="stripe-rate-display">
            <div className="cus_d_flex">
              <div className="cus_d_flex_item_5">
                <img src="/assets/brand_token.svg" alt="" />
                <span className="pl-5 cus_font">{rate}</span>
              </div>
              <div className='cus_d_flex_item_2'><span className='pl-5 cus_font'>=</span></div>
              <div className='cus_d_flex_item_5'>
                <img src="/assets/brand_usd.svg" alt="" />
                <span className='pl-5 cus_font'>1</span>
              </div>
            </div>
            <p className='cus_rate_label'>current rate</p>
          </div>
        </div>

        <div className="mb-8">
          <div className='stripe-input-title'>
            Enter the rate (YLT per 1 USD)
          </div>
          <input className='stripe-input' value={rate} placeholder="500" type="number" onChange={handleRate} />
          <button className='stripe-set-btn' onClick={handleSaveRate}>SET RATE</button>
        </div> 
        
      </div>
    </div>
  )
}