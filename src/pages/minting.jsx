import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import Modal from "../components/modal.js";
import {
  nftContractAddress,
  nftInterface,
  useNFTCall,
  useNFTMethod,
} from "contracts/nft.js";
import { stages, whitelistedAddresses } from "constants/nft.js";
import { makeMerkleTree } from "helpers/merkleproof.js";
import keccak256 from "keccak256";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { gql, useQuery } from "@apollo/client";
import { injected, subwallet } from "components/wallet/connectors";
import { connectorAtom } from "components/wallet/atoms";
import { useAtom } from "jotai";

const connectorsByName = {
  injected: injected,
}

const getOwnerTokens = gql`
  query ($owner: ID!) {
    tokens(where: { owner: { id_eq: $owner } }) {
      id
      imageUri
      isListed
      ticketId
      tokenId
      uri
    }
  }
`;

const getTokenByTokenId = gql`
  query ($tokenId: Int!) {
    tokens(where: { tokenId_eq: $tokenId }) {
      id
      imageUri
      isListed
      ticketId
      tokenId
      uri
    }
  }
`;

export default function Minting() {
  const { activate, connector, account, library, chainId } = useWeb3React();

  const [activatingConnector, setActivatingConnector] = useAtom(connectorAtom);

  const {
    data: tokensData,
  } = useQuery(getOwnerTokens, {
    variables: {
      owner: account,
    },
  });

  const {
    data: mintedTokenData,
    refetch: refetchMintedToken,
  } = useQuery(getTokenByTokenId, {
    variables: {
      tokenId: undefined
    }
  });

  const [isExpand, setIsExpand] = useState(false);
  const [isAmountElementHidden, setIsAmountElementHidden] = useState(false);
  const [keysMinted, setKeysMinted] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [amountOnMinting, setAmountOnMinting] = useState(0);
  const [amountOnMinted, setAmountOnMinted] = useState(0);
  const [mintedTokenIds, setMintedTokenIds] = useState([]);

  const { send: privateMint } = useNFTMethod("privateSaleMint");
  const { send: publicMint } = useNFTMethod("publicSaleMint");
  const { value: stage } = useNFTCall("stage");

  const { value: privSalePrice } = useNFTCall("PRIV_SALE_PRICE");
  const { value: pubSalePrice } = useNFTCall("PUB_SALE_PRICE");

  const { value: totalMinted } = useNFTCall("totalSupply");
  const { value: totalSupply } = useNFTCall("TOTAL_SUPPLY");

  const isPrivate = stage === stages.private;
  const isPublic = stage === stages.public;

  const maxAmount = (isPublic && 10) || (isPrivate && 5) || 0;
  const waitMetadata = async (tokenId) => {
    return new Promise(async (resolve) => {
      const tryFetcher = async () => {
        await setTimeout(async () => {
          const res = await refetchMintedToken({
            tokenId: tokenId
          })

          if (!res.data.tokens[0]) await tryFetcher()
          else resolve(res.data.tokens[0])
        }, 5 * 1000)
      }
      tryFetcher()
    })
  }
  const handlePrivateMint = async () => {
    const expDate = new Date().getTime() + 50 * 10 ** 3;
    const merkleTree = makeMerkleTree(whitelistedAddresses);
    const merkleproof = merkleTree.getHexProof(
      keccak256(account?.toLowerCase())
    );

    const types = {
      Mint: [
        { name: "caller", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const domain = {
      name: "Cosmize",
      version: "1",
      chainId: chainId,
      verifyingContract: nftContractAddress,
    };

    const value = {
      deadline: expDate,
      amount: keysMinted,
      caller: account,
    };
    const signer = library?.getSigner?.();
    try {
      const sign = await signer._signTypedData(domain, types, value);

      privateMint(keysMinted, expDate, sign, merkleproof, {
        value: new BigNumber(privSalePrice.toString())
          .times(keysMinted)
          .toString(),
      }).then(async (tx) => {
        setAmountOnMinting((old) => old + keysMinted);

        const receipt = await tx.wait();

        setShowModal(true);
        <Modal show={showModal}>
                <div className="font-medium text-center text-3xl justify-center">
                  Minting in progress
                </div>
                <div className="font-medium text-center text-3xl justify-center">
                  Do not refresh page
                </div>
        </Modal>

        const tokenIds = receipt.events
          .filter(({ event }) => event === "MintEvent")
          .reduce((a, c) => {
            const tokenId = nftInterface
              .decodeEventLog(c.event, c.data, c.topics)
              .startTokenID.toString();
            return [...a, tokenId];
          }, []);

        await waitMetadata(Number(tokenIds[0]))

        setMintedTokenIds((old) => [...old, ...tokenIds]);
        setAmountOnMinting((old) => old - keysMinted);
        setShowModal(false)
      });
    } catch (e) {
      console.error(e);
    }

    setShowModal(true);
    <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="font-medium text-center text-3xl justify-center">
                  Minting Success!
                </div>
      </Modal>
  };

  const handlePublicMint = () => {
    const expDate = new Date().getTime() + 50 * 10 ** 3;

    const types = {
      Mint: [
        { name: "caller", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const domain = {
      name: "Cosmize",
      version: "1",
      chainId: chainId,
      verifyingContract: nftContractAddress,
    };

    const value = {
      deadline: expDate,
      amount: keysMinted,
      caller: account,
    };

    const signer = library?.getSigner?.();
    const sign = signer._signTypedData(domain, types, value);
    publicMint(keysMinted, expDate, sign, {
      value: new BigNumber(pubSalePrice.toString())
        .times(keysMinted)
        .toString(),
    }).then(async (tx) => {
      setAmountOnMinting(keysMinted);
      await tx.wait();
      // replace amount minted with array of mintedTokenId
      setAmountOnMinted((old) => old + keysMinted);
      setAmountOnMinting(0);
    });
  };

  const handleMint = () => {
    if (isPrivate) handlePrivateMint();
    else if (isPublic) handlePublicMint();
  };

  const handleConnectWallet = async () => {

      const currentConnector = connectorsByName[name];
      const activating = currentConnector === activatingConnector;
      const connected = currentConnector === connector;
      
      setActivatingConnector(currentConnector)
      await window.ethereum.enable();
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x250',
            rpcUrls: ['https://astar.public.blastapi.io'],
            chainName: 'Astar',
            nativeCurrency: { name: 'ASTR', decimals: 18, symbol: 'ASTR' },
            blockExplorerUrls: ['https://blockscout.com/astar']
          }
        ]
      })
      await activate(currentConnector, (error) => {
        if(error) {
          setActivatingConnector(undefined)
        }
      })
    window.location.reload(true)
  }

  const handleRevealMinted = (tokenId) => {
    // fetch nft by token id
    setMintedTokenIds((old) => old.filter((e) => e !== tokenId));
  };

  const amount = (value) => {
    setKeysMinted(value);
  };

  return (
    <div>
      <Head>
        <title>Cosmize Minting</title>
        <meta name="description" content="Cosmize Minting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen w-screen bg-[url('/assets/images/background-image.png')] bg-cover flex flex-col">
        <div className="flex justify-end p-4">
          {!account ? 
              <button
                type="button"
                onClick={handleConnectWallet}
                className="bg-[url('/assets/images/button-title-active.png')] bg-cover w-[300px] aspect-[300/45] text-black font-medium pb-[6px] pr-[20px]"
              >
                Connect Wallet
              </button>
                
              : <button 
                  type="button" 
                  className="bg-[url('/assets/images/button-title-idle-darker.png')] bg-cover w-[360px] aspect-[300/45] text-white font-medium"
                >
                  {account?.substr(0,25) + "..."}
                </button>
          }
        </div>
        <div className="flex-grow flex items-end">
          {/* adjust the `w-[700px]` if need bigger space for the content */}
          <motion.div
            onAnimationComplete={() => setIsAmountElementHidden(isExpand)}
            animate={{ opacity: isExpand ? 0 : 1, scale: isExpand ? 0.95 : 1 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="relative mx-20 mb-[172px] w-full max-w-[700px] aspect-[1141/796]"
          >
            {(!isAmountElementHidden || !isExpand) && (
              <>
                <div className="absolute w-full h-full top-0">
                  {/* svg background */}
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1141 796"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 762.5V33L33 0H1098L1141 43V752.5L1098 795.5H33L0 762.5Z"
                      fill="black"
                      fillOpacity="0.40"
                    />
                  </svg>
                </div>

                <div className="flex flex-col h-full text-white py-10 px-6 relative z-0">
                  {totalMinted?.toString()} / {totalSupply?.toString()} KEYS
                  remaining
                  <div className="text-5xl pt-5 font-bold text-left">
                    HOW MANY KEYS
                  </div>
                  <div className="text-5xl pt-2 pb-5 font-bold text-left">
                    YOU WANT?
                  </div>
                  <div className="pl-2 flex flex-grow flex-wrap gap-10">
                    {new Array(maxAmount).fill(null).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={(e) => amount(i + 1)}
                        className={`relative w-[75px] h-[75px] bg-cover ${keysMinted === i + 1
                          ? 'bg-[url("/assets/images/button-menu-active-ver2.png")]'
                          : ""
                          }`}
                      >
                        <div
                          className={`text-lg font-bold ${keysMinted === i + 1 ? "text-black" : "text-white"
                            }`}
                        >
                          {i + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="font-medium pt-5">
                    Disclaimer: You can mint up to 5 during the Private Sale and
                  </p>
                  <div className="font-medium">10 during Public Sale</div>
                </div>
              </>
            )}
          </motion.div>
        </div>
        <motion.div
          animate={{
            height: isExpand ? "80%" : "92px",
            backdropFilter: isExpand ? "blur(4px)" : "",
          }}
          className="absolute overflow-hidden w-full bottom-0 bg-black/[0.40]"
        >
          <div
            className={`h-[92px] flex justify-between items-center px-4${isExpand ? " border-b-8" : ""
              }`}
          >
            <div className="flex space-x-4 items-center">
              <div
                className="flex space-x-4 items-center cursor-pointer"
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
              </div>
            </div>

            <div className="flex items-center space-x-10">
              <div className="text-white">
                <div className="text-sm">Price</div>
                <div className="font-medium">
                  {privSalePrice &&
                    pubSalePrice &&
                    stage &&
                    ethers.utils.formatEther(
                      (isPrivate && privSalePrice.toString()) ||
                      (isPublic && pubSalePrice.toString())
                    )}{" "}
                  ASTR
                </div>
              </div>
              <div className="text-white">
                <div className="text-sm">Qty</div>
                <div className="font-medium">{keysMinted}x</div>
              </div>
              <div className="text-white">
                <div className="text-sm">Total</div>
                <div className="font-medium">
                  {privSalePrice &&
                    pubSalePrice &&
                    stage &&
                    ethers.utils.formatEther(
                      new BigNumber(
                        (isPrivate && privSalePrice?.toString()) ||
                        (isPublic && pubSalePrice?.toString())
                      )
                        .times(keysMinted)
                        .toString()
                    )}{" "}
                  ASTR
                </div>
              </div>
                <button
                  type="button"
                  onClick={handleMint}
                  className="bg-[url('/assets/images/button-title-active.png')] bg-cover w-[300px] aspect-[300/45] text-black font-medium pb-[6px] pr-[20px]"
                >
                Mint
                </button>
            </div>
          </div>
          {isExpand && (
            <div className="text-white p-10">
              {!!tokensData?.tokens && (
                <div className="flex">
                  <div className="text-2xl pt-10 pr-20 font-medium text-left flex">
                    Minted
                  </div>
                  {/* container of buttons */}
                  <div className="flex gap-10">
                    {tokensData?.tokens.filter((token) => !mintedTokenIds.includes(token?.tokenId)).map(token => (
                      <div key={token?.id}>
                        {/* container each button */}
                        <button
                          type="button"
                          className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover"
                        >
                          <Image
                            className="scale-[1]"
                            src="/assets/images/bracelet-1.png"
                            layout="fill"
                            alt=""
                          />
                        </button>
                        <div className="font-semibold">
                          {/* <div>2022/08/09 14:00:00</div> */}
                          <div>{token?.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!!(mintedTokenIds.length || amountOnMinting) && (
                <div className="flex pt-10">
                  <div className="text-2xl font-medium text-left">
                    In Progress
                  </div>
                  <div className="flex flex-wrap pl-10 gap-10">
                    {mintedTokenIds.map((tokenId, i) => (
                      <div key={i}>
                        <button
                          type="button"
                          onClick={() => handleRevealMinted(tokenId)}
                          className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover"
                        >
                          <Image
                            className="scale-[0.85]"
                            src="/assets/images/bracelet-0.png"
                            layout="fill"
                            alt=""
                          />
                        </button>
                        <div>Minting Completed</div>
                        <div className="font-bold">Click to reveal</div>
                      </div>
                    ))}

                    {new Array(amountOnMinting).fill(null).map((_, i) => (
                      <div key={i}>
                        <button
                          type="button"
                          className="relative bg-[url('/assets/images/button-menu-active-ver2.png')] w-[145px] h-[145px] bg-cover"
                        >
                          <Image
                            className="scale-[0.85]"
                            src="/assets/images/bracelet-0.png"
                            layout="fill"
                            alt=""
                          />
                        </button>
                        <div>Minting in progress</div>
                        <div className="font-bold">???</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
