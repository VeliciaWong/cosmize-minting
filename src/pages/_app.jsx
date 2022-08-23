import 'styles/globals.css'
import {useWeb3React, Web3ReactProvider} from '@web3-react/core'
import { useEffect } from 'react';
import { useEagerConnect, useInactiveListener } from "components/wallet/hooks";
import { Web3Provider } from '@ethersproject/providers';
import { connectorAtom } from 'components/wallet/atoms';
import { useAtom } from 'jotai';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }) {
  const context = useWeb3React();
  const { connector } = context;

  const [activatingConnector, setActivatingConnector] = useAtom(connectorAtom);

  useEffect(() => {
    if(activatingConnector && activatingConnector === connector) setActivatingConnector(undefined);
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager || !activatingConnector)

  return <Component {...pageProps} />
}

function InitiateWeb3Provider(props) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MyApp {...props} />
    </Web3ReactProvider>
  )
}

export default InitiateWeb3Provider
