import { WalletProps } from '@/types/wallet-props'

export default function ConnectWalletButton({ openConnectModal }: WalletProps) {
    return (
        <button
            onClick={openConnectModal}
            className="flex text-[14px] border-[1px] border-[#313131] justify-center bg-white text-black items-center text-center  hover:opacity-80 rounded-[20px] connect-wallet font-semibold cursor-pointer"
        >
            Connect Wallet
        </button>
    )
}
