import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"
import { useWeb3React } from "@web3-react/core";

export default function Minting() {
  const [isExpand, setIsExpand] = useState(false)
  const [isAmountElementHidden, setIsAmountElementHidden] = useState(false)
  const { activate, connector, account } = useWeb3React();
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
          </button> */}
          <div>
            {account}
          </div>
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

                <div className="py-10 px-6">
                  Content
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
                <div className="font-bold text-white">Inventory</div>
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
              <button type="button" className="bg-[url('/assets/images/button-title-active.png')] bg-cover w-[300px] aspect-[300/45] text-black font-medium pb-[6px] pr-[20px]">Mint</button>
            </div>
          </div>
          {isExpand && (
            <div className="p-10">
              Content
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
