import { InjectedConnector } from "@web3-react/injected-connector";
import { SubWalletConnector } from "@subwallet/web3-react-subwallet-connector-v6";

export const injected = new InjectedConnector({ supportedChainIds: [592]})
export const subWallet = new SubWalletConnector({ supportedChainIds: [592]})