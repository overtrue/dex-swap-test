import { JsonRpcProvider, Contract, Wallet, formatUnits } from 'ethers'
import dotenv from 'dotenv'
dotenv.config()

import token0Contract from '../build/contracts/CatToken.json' assert { type: 'json' }
import token1Contract from '../build/contracts/DogToken.json' assert { type: 'json' }

import pairAbi from './abis/pancake-pair.test.json' assert { type: 'json' }

const pairAddress = process.env.PAIR_ADDRESS
const token0Address = process.env.TOKEN0_ADDRESS
const token1Address = process.env.TOKEN1_ADDRESS

const provider = new JsonRpcProvider(process.env.RPC_URL)
const singer = new Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider)

const token0 = new Contract(token0Address, token0Contract.abi, singer)
const token1 = new Contract(token1Address, token1Contract.abi, singer)
const pair = new Contract(pairAddress, pairAbi, singer)

console.log('Token balances:')

const balance0 = await token0.balanceOf(singer.address)
console.log('token0 balance:', formatUnits(balance0, 18))

const balance1 = await token1.balanceOf(singer.address)
console.log('token1 balance:', formatUnits(balance1, 18))

const reserves = await pair.getReserves()

console.log('Pair reserves:')

console.log('token0:', Number(formatUnits(reserves[0], 18)))
console.log('token1:', Number(formatUnits(reserves[1], 18)))
