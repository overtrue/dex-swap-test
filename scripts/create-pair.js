import { JsonRpcProvider, Contract, Wallet } from 'ethers'
import dotenv from 'dotenv'
dotenv.config()

import factoryAbi from './abis/pancake-factory.test.json' assert { type: 'json' }

const factoryAddress = process.env.FACTORY_ADDRESS
const token0Address = process.env.TOKEN0_ADDRESS
const token1Address = process.env.TOKEN1_ADDRESS

const provider = new JsonRpcProvider(process.env.RPC_URL)
const singer = new Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider)
const factory = new Contract(factoryAddress, factoryAbi, singer)
const tx = await factory.createPair(token0Address, token1Address)

console.log('Pair created', tx)
