import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const NotchWallet = ({ address, balance, onConnect }) => {
  const guest = !address || !balance
  return guest ? (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[url('/assets/images/bg-notch-1.svg')] aspect-[666/76] w-[666px] px-[43px] py-[10px] flex items-center justify-between">
      <div className="flex items-center">
        <Image src="/assets/images/exclamation-mark.svg" width="24" height="24" />
        <div className="text-xl font-medium pl-[21px]">
          No Wallet Connected
        </div>
      </div>
      <button onClick={onConnect} className="bg-[url('/assets/images/bg-button-1.svg')] aspect-[314.13/48] w-[314.13px] font-medium text-xl">Connect Wallet</button>
    </div>
  ) : (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[url('/assets/images/bg-notch-2.svg')] aspect-[832.5/76] w-[832.5px] px-[43px] py-[10px] flex items-center">
      <Image src="/assets/images/check.svg" width="24" height="24" />
      <div className="text-[#1B3543] text-xl font-medium pl-[21px]">
        Wallet Connected
      </div>
      <div className="border-l border-r mx-[37px] leading-[56px] border-gray-300 h-full"></div>
      <Image src="/assets/images/user.svg" width="52" height="52" />
      <div className="text-[#333333] font-medium pl-[21px]">
        <div className="tracking-tight">{address}</div>
        <div className="text-xl">{balance} ASTR</div>
      </div>
    </div>
  )
}

const GateScreen = ({
  onSelectMintType
}) => {
  return (
    <div className="h-screen w-screen px-10 py-10 xl:px-32 2xl:py-32 3xl:px-[139px] 3xl:py-[87px]">
      <div className="flex h-full">
        <div className="flex flex-col flex-grow justify-between">
          <div className="max-w-[705px] pr-8">
            <Image src="/assets/images/cosmize-logo-big.png" layout="responsive" width="705" height="87" />
          </div>
          <div className="text-5xl font-bold leading-[62px]">
            The first Polkadot-based<br />metaverse on AstarNetwork.
          </div>
          <div>
            <span className="text-4xl font-medium">3000 Access Key NFTs to Mint</span>
            <div className="relative flex items-center p-6">
              <div>
                <Image src="/assets/images/bracelet-3.png" width="277px" height="277px" />
              </div>
              <div className="-ml-32">
                <Image src="/assets/images/bracelet-2.png" width="227px" height="227px" />
              </div>
              <div className="-ml-24">
                <Image src="/assets/images/bracelet-1.png" width="190px" height="190px" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[832px] min-w-0">
          <div className="text-right space-y-12">
            <div>
              <div className="text-2xl leading-[31px]">Initial Release + Private Sale</div>
              <div className="text-3xl leading-[41px]">DD / MM / YYYY, hh : mm JST</div>
              <div className="text-3xl leading-[41px]">until DD / MM / YYYY, hh : mm JST</div>
            </div>
            <div>
              <div className="text-2xl leading-[31px]">Public Sale</div>
              <div className="text-3xl leading-[41px]">DD / MM / YYYY, hh : mm JST</div>
              <div className="text-3xl leading-[41px]">until DD / MM / YYYY, hh : mm JST</div>
            </div>
          </div>
          <div className="mt-[57px] space-y-[27px]">
            <div>
              <div className="bg-[url('/assets/images/bg-tooltip-1.svg')] bg-cover aspect-[357/55] w-[357px] leading-[55px] pl-[53px] font-bold flex items-center text-xl ml-6 mb-[7px]">
                <div className="mr-[18px] inline-block h-4 w-4 border border-white bg-[#888888] rounded-full bg-gray leading-[55px]"></div>
                Session ended
              </div>
              <div className="bg-[url('/assets/images/bg-panel-1.svg')] bg-cover aspect-[832/160.5] w-full px-11">
                <div className="flex justify-center items-center h-full">
                  <div className="cursor-not-allowed bg-[url('/assets/images/bg-panel-button-1.svg')] bg-cover aspect-[754/83] w-[744px] leading-[73px] px-[43px] font-semibold text-2xl flex justify-between">
                    <span>Public Sale</span>
                    <span>3000/3000 NFTs Minted</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[url('/assets/images/bg-tooltip-2.svg')] bg-cover aspect-[357/55] w-[357px] leading-[55px] pl-[53px] font-bold flex items-center text-xl ml-6 mb-[7px]">
                <div className="mr-[18px] inline-block h-4 w-4 border border-white bg-[#FE5A44] rounded-full bg-gray leading-[55px]"></div>
                Now LIVE
              </div>
              <div className="bg-[url('/assets/images/bg-panel-1.svg')] bg-cover aspect-[832/160.5] w-full px-11">
                <div className="flex justify-center items-center h-full">
                  <div onClick={onSelectMintType} className="cursor-pointer bg-[url('/assets/images/bg-panel-button-2.svg')] bg-cover aspect-[754/83] w-[744px] leading-[73px] px-[43px] font-semibold text-2xl flex justify-between">
                    <span>Private Sale</span>
                    <span>dd : hh : mm : ss</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Minter = () => {
  const [address, setAddress] = useState('')
  const [isExpand, setIsExpand] = useState(false)
  const [isAmountElementHidden, setIsAmountElementHidden] = useState(false);
  const [amount, setAmount] = useState(1)

  const maxAmount = 7

  // TODO: will removed on release version
  useEffect(() => {
    window.reset = {
      ...(window.reset || {}),
      wallet: () => setAddress(null)
    }
  }, [])

  return (
    <div className="relative h-screen w-screen py-[114px] 3xl:py-[154px] xl:px-32 3xl:px-[139px]">
      <div className="fixed top-1/2 -translate-y-1/2 right-0 aspect-square w-1/2 bg-[#1B3543C9] rounded-full scale-[65%]"></div>

      <NotchWallet onConnect={() => setAddress('0xE1C821584eAcb5C032d1b4C64cb16C6ba0B626ec')} address={address} balance={1} />
      <motion.div
        onAnimationComplete={() => setIsAmountElementHidden(isExpand)}
        animate={{ opacity: isExpand ? 0 : 1, scale: isExpand ? 0.95 : 1 }}
        transition={{ duration: 0.1, ease: "easeOut" }} className="grid grid-cols-2">
        <div className="scale-75 2xl:scale-100 origin-top-left">
          <div className="bg-[url('/assets/images/bg-panel-info.svg')] bg-contain aspect-[754/83] w-[754px] font-semibold text-2xl flex justify-between px-[43px] leading-[69px]">
            <div>Private Sale</div>
            <div>dd : hh : mm : ss</div>
          </div>
          <div className="bg-[url('/assets/images/bg-panel-rec.svg')] bg-contain aspect-[744/566] w-[754px] py-[43px] pr-[43px] pl-[55px] flex flex-col justify-between">
            <div className="text-5xl font-bold leading-[62.4px]">
              How Many KEYS Do<br />You Want?
            </div>

            <div className="max-w-[484px] mx-auto">
              <div className="flex items-center space-x-[14px]">
                <span className="border-t border-white w-6 inline-block"></span>
                <span>1200 / 3000 KEYS Remaining</span>
                <span className="border-t border-white flex-grow inline-block"></span>
              </div>

              <div className="mt-[6px]">
                <div className="relative w-full aspect-[484/84]">
                  {/* virtual border */}
                  <div className="absolute w-full">
                    <div className="-mx-4 -mt-[11px] bg-[url('/assets/images/border.svg')] aspect-[516/116] bg-contain bg-no-repeat" />
                  </div>

                  <div className="flex justify-between h-full px-[6px]">
                    <div className="flex h-full items-center space-x-1">
                      <div className="relative h-[72px] w-[72px] ">
                        {/* virtual background */}
                        <div className="-mx-[25px] -mt-[15px] absolute bg-[url('/assets/images/bg-button-left.svg')] aspect-[1/1] w-[122px]" />

                        <button onClick={() => amount > 1 && setAmount((old) => old - 1)} className="relative z-1 w-full h-full flex justify-center leading-[72px] font-medium text-3xl">
                          -
                        </button>
                      </div>
                      <div className="w-[100px] h-[72px] flex items-center justify-center bg-white font-medium text-2xl text-black">
                        {amount}
                      </div>
                      <div className="relative h-[72px] w-[72px]">
                        {/* virtual background */}
                        <div className="-mx-[25px] -mt-[15px] absolute bg-[url('/assets/images/bg-button-right.svg')] aspect-[1/1] w-[122px]" />

                        <button onClick={() => amount < maxAmount && setAmount((old) => old + 1)} className="relative z-1 w-full h-full flex justify-center leading-[72px] font-medium text-3xl">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-[200px] h-[72px]">
                        {/* virtual background */}
                        <div className="-ml-[25px] -mt-[15px] absolute bg-[url('/assets/images/bg-button-wider.svg')] aspect-[250/122] w-[250px]" />

                        <button onClick={() => setAmount(maxAmount)} className="relative z-1 h-full w-full font-medium text-2xl">Set to Max.</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mt-[27px] space-x-[21px]">
                <div className="-mt-px w-[24px]">
                  <Image src="/assets/images/exclamation-mark.svg" width="24" height="24" />
                </div>
                <span className="flex-1 leading-[16px]">You can mint up to 7 KEYS during the Private Sale, and
                  up to 10 KEYS during Public Sale.</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <div>Price</div>
                <div>300 ASTR</div>
              </div>
              <div>
                <div>QTY</div>
                <div>1</div>
              </div>
              <div className="relative aspect-[413/65] w-[414px]">
                <div className="-ml-[25px] -mt-[15px] absolute bg-[url('/assets/images/bg-button-2.svg')] aspect-[464/115] w-[464px]" />
                <button className="relative z-1 w-full h-full text-[#1B3543] leading-[53px] flex justify-center font-medium text-lg tracking-wider space-x-6">
                  <div>Mint</div>
                  <div className="w-[197px] h-[53px] flex items-center">
                    <div className="bg-[url('/assets/images/bg-label.svg')] bg-no-repeat w-[197px] h-[37px] text-white leading-[37px]">300 ASTR</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{
          height: isExpand ? "80%" : "130px",
        }} className="absolute overflow-hidden bottom-0 left-0 w-full flex flex-col">
        <div className="flex justify-between">
          <div className="max-w-[884px] min-w-[400px] w-1/2">
            <button
              className="bg-[url('/assets/images/bg-inventory-button.svg')] bg-contain bg-no-repeat aspect-[884/122] w-full flex space-x-4 items-center justify-center cursor-pointer"
              onClick={() => setIsExpand(!isExpand)}
            >
              <motion.div animate={{ rotate: isExpand ? 180 : 0 }}>
                <Image
                  src="/assets/images/up-chevron.png"
                  alt=""
                  width={24}
                  height={24}
                />
              </motion.div>
              <div className=" text-base font-bold text-white">Inventory</div>
            </button>
          </div>
          <div className="custom-tooltip flex gap-1.5 pr-6">
            <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
                <Image className="scale-[0.85]" src="/assets/images/bracelet-0.png" layout="fill" alt=""/>
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
              <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[60px] h-[60px] bg-cover">
              </button>
            </div>
        </div>
        <div className="flex-grow bg-[#233D4A]/[0.5625] pt-10 pl-20 flex gap-8">
          <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
            <Image className="scale-[0.85]" src="/assets/images/bracelet-3.png" layout="fill" alt=""/>
          </button>
          <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
            <Image className="scale-[0.85]" src="/assets/images/bracelet-2.png" layout="fill" alt=""/>
          </button>
          <button type="button" className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover">
            <Image className="scale-[0.85]" src="/assets/images/bracelet-1.png" layout="fill" alt=""/>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

const MintPage = () => {
  const [mintType, setMintType] = useState();

  // TODO: will removed on release version
  useEffect(() => {
    window.reset = {
      ...(window.reset || {}),
      mintType: () => setMintType(null)
    }
  }, [])

  return (
    <div className="bg-[url('/assets/images/background-image.png')] bg-cover h-screen w-screen text-white">
      {!mintType && (
        <div className="absolute bg-gradient-to-r from-[#88888800] to-[#1B3543] h-screen w-screen top-0" />
      )}
      <div className="relative h-screen w-screen bg-[#1B3543B8]">
        {
          mintType ? (
            <Minter />
          ) : (
            <GateScreen onSelectMintType={() => setMintType('private')} />
          )
        }
      </div>
    </div>
  )
}

export default MintPage;