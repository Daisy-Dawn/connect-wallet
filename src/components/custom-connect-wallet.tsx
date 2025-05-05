import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import ConnectWalletButton from './header-comps/connect-wallet-button'
import AddressDisplay from './address-display'

export default function CustomConnectWallet() {
    const { isConnected } = useAccount()

    return (
        <ConnectButton.Custom>
            {({ openConnectModal }) => {
                return isConnected ? (
                    <AddressDisplay />
                ) : (
                    <ConnectWalletButton openConnectModal={openConnectModal} />
                )
            }}
        </ConnectButton.Custom>
    )
}
