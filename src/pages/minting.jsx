import Head from "next/head";
import Image from "next/image";
import {useState } from "react";
import { motion } from "framer-motion"
import { useWeb3React } from "@web3-react/core";
import Modal from "../components/modal.js"

export default function Minting() {
  const [isExpand, setIsExpand] = useState(false)
  const [isAmountElementHidden, setIsAmountElementHidden] = useState(false)
  const [keysMinted, setKeysMinted] = useState(0);
  const { activate, connector, account } = useWeb3React();
  const [showModal, setShowModal] = useState(false)


  const amount = (value) =>{
    console.log(value);
    setKeysMinted(value);
  }

  return (
    <div>
      <Head>
        <title>Cosmize Minting</title>
        <meta name="description" content="Cosmize Minting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen w-screen bg-[url('/assets/images/background-image.png')] bg-cover flex flex-col">
        <div className="flex justify-end p-4">
          {/* <button 
            type="button" 
            className="bg-[url('/assets/images/button-title-idle-darker.png')] bg-cover w-[360px] aspect-[300/45] text-white font-medium"
          >
            Connect Wallet
          </button> */}
        </div>
        <div className="flex-grow flex items-end">
          {/* adjust the `w-[700px]` if need bigger space for the content */}
          <motion.div onAnimationComplete={() => setIsAmountElementHidden(isExpand)} animate={{ opacity: isExpand ? 0 : 1, scale: isExpand ? 0.95 : 1 }} transition={{ duration: 0.1, ease: 'easeOut' }} className="relative mx-20 mb-[172px] w-full max-w-[700px] aspect-[1141/796]">
            {(!isAmountElementHidden || !isExpand) && (
              <>
                <div className="absolute w-full h-full top-0">
                  {/* svg background */}
                  <svg width="100%" height="100%" viewBox="0 0 1141 796" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 762.5V33L33 0H1098L1141 43V752.5L1098 795.5H33L0 762.5Z" fill="black" fillOpacity="0.40" />
                  </svg>
                </div>

                <div className="text-white py-10 px-6 relative z-20">
                  1200 / 3000 KEYS remaining
                  <div className="text-5xl pt-5 font-bold text-left">HOW MANY KEYS</div>
                  <div className="text-5xl pt-2 pb-5 font-bold text-left">YOU WANT?</div>
                  <div className="pl-2 space-x-10">
                    <button type="button" onClick={(e) => amount(1)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 1 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 1 ? 'text-black' : 'text-white'}`}>1</div>
                    </button>
                    <button type="button" onClick={(e) => amount(2)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 2 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 2 ? 'text-black' : 'text-white'}`}>2</div>
                    </button>
                    <button type="button" onClick={(e) => amount(3)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 3 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 3 ? 'text-black' : 'text-white'}`}>3</div>
                    </button>
                    <button type="button" onClick={(e) => amount(4)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 4 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 4 ? 'text-black' : 'text-white'}`}>4</div>
                    </button>
                    <button type="button" onClick={(e) => amount(5)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 5 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 5 ? 'text-black' : 'text-white'}`}>5</div>
                    </button>
                  </div>
                  <div className="pl-2 space-x-10 space-y-5">
                  <button type="button" onClick={(e) => amount(6)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 6 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}> 
                      <div className={`text-lg font-bold ${keysMinted === 6 ? 'text-black' : 'text-white'}`}>6</div>
                    </button>
                    <button type="button" onClick={(e) => amount(7)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 7 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 7 ? 'text-black' : 'text-white'}`}>7</div>
                    </button>
                    <button type="button" onClick={(e) => amount(8)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 8 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 8 ? 'text-black' : 'text-white'}`}>8</div>
                    </button>
                    <button type="button" onClick={(e) => amount(9)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 9 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 9 ? 'text-black' : 'text-white'}`}>9</div>
                    </button>
                    <button type="button" onClick={(e) => amount(10)} className={`relative w-[60px] h-[60px] bg-cover ${keysMinted === 10 ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]' : ''}`}>
                      <div className={`text-lg font-bold ${keysMinted === 10 ? 'text-black' : 'text-white'}`}>10</div>
                    </button>
                  </div>
                  
                  <p className="font-medium pt-5">Disclaimer: You can mint up to 5 during the Private Sale and</p>
                  <div className="font-medium">10 during Public Sale</div>
                </div>
              </>
            )}
          </motion.div>
        </div>
        <motion.div animate={{ height: isExpand ? '80%' : '92px', backdropFilter: isExpand ? 'blur(4px)' : '' }} className="absolute overflow-hidden w-full bottom-0 bg-black/[0.40]">
          <div className={`h-[92px] flex justify-between items-center px-4${isExpand ? ' border-b-8' : ''}`}>
            <div className="flex space-x-4 items-center">
              <div className="flex space-x-4 items-center cursor-pointer" onClick={() => setIsExpand(!isExpand)}>
                <motion.div
                  animate={{ rotate: isExpand ? 180 : 0 }}
                >
                  <Image src="/assets/images/up-chevron.png" alt="" width={24} height={24} />
                </motion.div>
                <div className=" text-base font-bold text-white">Inventory</div>
              </div>
              <motion.div animate={{ opacity: isExpand ? 0 : 1 }} transition={{ duration: 0.1 }} className="flex items-center space-x-2">
                <button type="button" onClick={() => setIsExpand(true)} className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
                  <Image className="scale-[0.8]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                </button>
                <button type="button" onClick={() => setIsExpand(true)} className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
                  <Image className="scale-[0.8]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                </button>
                <button type="button" onClick={() => setIsExpand(true)} className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
                  <Image className="scale-[0.8]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                </button>
                <button type="button" onClick={() => setIsExpand(true)} className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
                  <Image className="scale-[0.8]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                </button>
                <button type="button" onClick={() => setIsExpand(true)} className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
                  <Image className="scale-[0.8]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                </button>
              </motion.div>
            </div>

            <div className="flex items-center space-x-10">
              <div className="text-white">
                <div className="text-sm">Price</div>
                <div className="font-medium">300 ASTR</div>
              </div>
              <div className="text-white">
                <div className="text-sm">Qty</div>
                <div className="font-medium">1x</div>
              </div>
              <div className="text-white">
                <div className="text-sm">Total</div>
                <div className="font-medium">300 ASTR</div>
              </div>
              <button type="button" onClick={() => setShowModal(true)} className="bg-[url('/assets/images/button-title-active.png')] bg-cover w-[300px] aspect-[300/45] text-black font-medium pb-[6px] pr-[20px]">Mint</button>
              <Modal show={showModal} onClose={() => setShowModal(false)}>
                  <div className="font-medium">Minting in Progress. Do not refresh</div>
              </Modal>
            </div>
          </div>
          {isExpand && (
            <div className=" text-white p-10">
              <div className="flex">
                <div className="text-2xl pt-10 pr-20 font-medium text-left flex">Minted</div>
                {/* container of buttons */}
                <div className="flex space-x-10">
                  <div>
                    {/* container each button */}
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[1]" src="/assets/images/bracelet-1.png" layout="fill" alt="" />
                    </button>
                    <div className="font-semibold"> 
                      <div>2022/08/09 14:00:00</div>
                      <div>Hydro # 201</div>
                    </div>
                  </div>
                  
                  <div>
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[1]" src="/assets/images/bracelet-1.png" layout="fill" alt="" />
                    </button>
                    <div className="font-semibold"> 
                      <div>2022/08/09 14:00:00</div>
                      <div>Hydro # 202</div>
                    </div>
                  </div>
                  
                  <div>
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[1]" src="/assets/images/bracelet-3.png" layout="fill" alt="" />
                    </button>
                    <div>2022/08/09 14:00:00</div>
                    <div>Hydro # 203</div>
                  </div>
                  
                  <div>
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[1]" src="/assets/images/bracelet-2.png" layout="fill" alt="" />
                    </button>
                    <div>2022/08/09 14:00:00</div>
                      <div>Hydro # 204</div>
                  </div>
                  
                  <div>
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[1]" src="/assets/images/bracelet-1.png" layout="fill" alt="" />
                    </button>
                    <div>2022/08/09 14:00:00</div>
                    <div>Hydro # 205</div>
                  </div>
                  
                </div>
              </div>
              
              <div className="flex pt-10">
                <div className="text-2xl font-medium text-left">In Progress</div>
                <div className="flex pl-10 space-x-10">
                  <div>
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[0.85]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                    </button>
                    <div>Minting Completed</div>
                    <div className="font-bold">Click to reveal</div>
                  </div>
                  
                  <div>
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[0.85]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                    </button>
                    <div>Minting in progress</div>
                    <div className="font-bold">???</div>
                  </div>
                  
                  <div>
                    <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
                      <Image className="scale-[0.85]" src="/assets/images/bracelet-0.png" layout="fill" alt="" />
                    </button>
                    <div>Minting in progress</div>
                    <div className="font-bold">???</div>
                  </div>
                  
                </div>
              </div>
              
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
