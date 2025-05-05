'use client'

import { ChildProps } from '@/types/child-props'
import { createContext, useEffect, useState } from 'react'
import { Config, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { parseRainbowConfig } from '../../public/config/rainbow-config'
import { theme } from '../../public/config/theme'

const queryClient = new QueryClient()

export const ProvidersContext = createContext<{ rainbowConfig: Config | null }>(
    {
        rainbowConfig: null,
    }
)

export default function Providers({ children }: ChildProps) {
    const [rainbowConfig, setRainbowConfig] = useState<Config | null>(null)

    useEffect(function () {
        setup()
    }, [])

    async function setup() {
        const config = await parseRainbowConfig()
        setRainbowConfig(config)
    }

    return (
        rainbowConfig && (
            <WagmiProvider config={rainbowConfig}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider
                        theme={theme}
                        coolMode
                        modalSize="compact"
                    >
                        <ProvidersContext.Provider value={{ rainbowConfig }}>
                            {children}
                        </ProvidersContext.Provider>
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        )
    )
}
