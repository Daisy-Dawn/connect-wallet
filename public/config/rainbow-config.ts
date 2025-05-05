import { getProjectId } from '@/server/get-project-id'
import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { monadTestnet } from 'viem/chains'
import { connectorsForWallets } from '@getpara/rainbowkit'
import {
    getParaWallet,
    OAuthMethod,
    AuthLayout,
} from '@getpara/rainbowkit-wallet'
import { Environment } from '@getpara/web-sdk'
import { http } from 'wagmi'
import { createConfig } from 'wagmi'
import { haha } from '../custom-wallets'

const API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY || ''

export async function parseRainbowConfig() {
    const projectId: string | undefined = await getProjectId()
    if (!projectId) throw new Error('No Project Id!')

    const { wallets } = getDefaultWallets({
        appName: 'USDm',
        projectId,
    })

    const paraWallet = getParaWallet({
        para: {
            environment: Environment.BETA,
            apiKey: API_KEY,
        },
        appName: 'USDm',
    })

    const connectors = connectorsForWallets(
        [
            {
                groupName: 'Social Login',
                wallets: [paraWallet],
            },
            ...wallets,
        ],
        {
            appName: 'USDm',
            projectId: projectId!,
        }
    )
    return createConfig({
        connectors,
        chains: [monadTestnet],
        transports: {
            [monadTestnet.id]: http(),
        },
    })
}
