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

const token0AmountDesired = parseEther('100000')
const token1AmountDesired = parseEther('10000000')
const token0AmountMin = 0
const token1AmountMin = 0

const to = process.env.RECEIVER_ADDRESS || singer.address

const deadline = Math.floor(Date.now() / 1000) + 60 * 20

const tx = await router.addLiquidity(token0Address, token1Address, token0AmountDesired, token1AmountDesired, token0AmountMin, token1AmountMin, to, deadline)

console.log('Added liquidity:', tx)
