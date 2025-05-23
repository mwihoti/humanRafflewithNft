import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { embeddedWallet } from "@civic/auth-web3/wagmi";



// Get the environment variable using process.env instead of import.meta.env
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';
const civicClientId = process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || '';

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        embeddedWallet(),
        injected(),
        coinbaseWallet(),
        walletConnect({ projectId: walletConnectProjectId,
            showQrModal: true
         })
    ],
    
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http()
    }
})



declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}