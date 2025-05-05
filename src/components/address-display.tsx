import truncateAddress from '@/utils/truncate-address'
import Image from 'next/image'
import { useAccount, useDisconnect } from 'wagmi'
import { FaRegBell } from 'react-icons/fa6'
import React, { useRef, useEffect, useState } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { Menu, MenuItem } from '@mui/material'

export default function AddressDisplay() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                handleClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            className="items-center justify-between flex p-[2px] gap-4"
            ref={wrapperRef}
        >
            <button className="border-x-[2px] h-[23px] px-4 border-[#313131]">
                <FaRegBell size={18} className="text-[#CFD3E5]" />
            </button>
            <div className="flex gap-2 items-center">
                <Image
                    src="/assets/wallet.svg"
                    alt="ENS Avatar"
                    width={20}
                    height={20}
                    className="object-contain"
                />
                {address && (
                    <div
                        onClick={handleClick}
                        className="flex items-center mt-1 cursor-pointer font-medium text-[14px] gap-2"
                    >
                        {truncateAddress(address as string)}
                        {/* arrow icon */}
                        {open ? (
                            <BiSolidDownArrow
                                style={{ transform: 'rotate(180deg)' }}
                                size={9}
                            />
                        ) : (
                            <BiSolidDownArrow size={9} />
                        )}
                    </div>
                )}

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    disableScrollLock
                    hideBackdrop
                    PaperProps={{
                        sx: {
                            m: 0,
                            p: 0,
                            backgroundColor: '#fff',
                            color: '#000',
                            borderRadius: '10px',
                        },
                    }}
                    MenuListProps={{
                        disablePadding: true,
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            disconnect()
                            handleClose()
                        }}
                        sx={{
                            fontSize: '14px',
                            px: 3,
                            py: 1,
                        }}
                    >
                        Disconnect
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}
