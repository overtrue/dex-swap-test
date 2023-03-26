import { JsonRpcProvider, Contract, Wallet, parseEther } from 'ethers'
import dotenv from 'dotenv'
dotenv.config()

import routerAbi from './abis/pancake-router.test.json' assert { type: 'json' }

const routerAddress = process.env.ROUTER_ADDRESS
const token0Address = process.env.TOKEN0_ADDRESS
const token1Address = process.env.TOKEN1_ADDRESS

const provider = new JsonRpcProvider(process.env.RPC_URL)
const singer = new Wallet(process.env.RECEIVER_PRIVATE_KEY || process.env.DEPLOYER_PRIVATE_KEY, provider)
const router = new Contract(routerAddress, routerAbi, singer)

const token0AmountOut = parseEther('100')
const token1amountInMax = 0
const path = [token0Address, token1Address]
const to = process.env.RECEIVER_ADDRESS || singer.address
const deadline = Math.floor(Date.now() / 1000) + 60 * 20

const tx = await router.swapTokensForExactTokens(token0AmountOut, token1amountInMax, path, to, deadline)

console.log('Swaped', tx)
