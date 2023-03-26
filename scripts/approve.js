import { JsonRpcProvider, Contract, Wallet, formatUnits, parseEther } from 'ethers'
import dotenv from 'dotenv'
dotenv.config()

import token0Contract from '../build/contracts/CatToken.json' assert { type: 'json' }
import token1Contract from '../build/contracts/DogToken.json' assert { type: 'json' }

import pairAbi from './abis/pancake-pair.test.json' assert { type: 'json' }

const pairAddress = process.env.PAIR_ADDRESS
const routerAddress = process.env.ROUTER_ADDRESS
const token0Address = process.env.TOKEN0_ADDRESS
const token1Address = process.env.TOKEN1_ADDRESS

const provider = new JsonRpcProvider(process.env.RPC_URL)
const singer = new Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider)
const token0 = new Contract(token0Address, token0Contract.abi, singer)
const token1 = new Contract(token1Address, token1Contract.abi, singer)
const pair = new Contract(pairAddress, pairAbi, singer)

console.log('Start approving...')

// token0,token1 授权给 pair
const tx0ofApprove = await token0.approve(pairAddress, parseEther('100000000'))
const tx1ofApprove = await token1.approve(pairAddress, parseEther('100000000'))

// token0,token1 授权给 router
const tx0ofRouterApprove = await token0.approve(routerAddress, parseEther('10000000000'))
const tx1ofRouterApprove = await token1.approve(routerAddress, parseEther('10000000000'))

// pair 授权给 router
const txOfPairApprove = await pair.approve(routerAddress, parseEther('100000000000'))

console.log('Approved:', tx0ofApprove, tx1ofApprove, tx0ofRouterApprove, tx1ofRouterApprove, txOfPairApprove)
