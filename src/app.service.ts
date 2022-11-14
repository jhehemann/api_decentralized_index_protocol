import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { ConstructorFragment } from 'ethers/lib/utils';
import * as TokenContractJson from './assets/IndexToken.json';
import * as IndexContractJson from './assets/IndexContract.json';
import { appendFile } from 'fs';

const TOKEN_CONTRACT_ADDRESS = '0x90c84237fddf091b1e63f369af122eb46000bc70';
const INDEX_CONTRACT_ADDRESS = '0x3D63c50AD04DD5aE394CAB562b7691DD5de7CF6f';


class Invest {
   
}


@Injectable()
export class AppService {

  provider: ethers.providers.Provider;
  tokenContract: Contract;
  indexContract: Contract;

  constructor() {
    this.provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');
    // this.provider = ethers.getDefaultProvider('goerli');
    this.tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenContractJson.abi, this.provider);
    this.indexContract = new ethers.Contract(INDEX_CONTRACT_ADDRESS, IndexContractJson.abi, this.provider);
  }

  async getTotalSupply() {
    const totalSupplyBN = await this.tokenContract.totalSupply();
    const totalSupply = ethers.utils.formatEther(totalSupplyBN);
    return totalSupply;
  }

  async getIndexValue() {
    const indexValue = await this.indexContract.indexValueUSD();
    // const indexValue = ethers.utils.formatEther(indexValueBN);
    console.log("indexValue: " + indexValue);
    return indexValue;
  }

  async getWbtcUsdPrice() {
    const wbtcEthPriceBN = await this.indexContract.getWbtcPrice();
    const wbtcEthPrice = ethers.utils.formatEther(wbtcEthPriceBN);
    const ethUsdPriceLN = await this.indexContract.getEthPrice();
    const ethUsdPrice = ethers.utils.formatUnits(ethUsdPriceLN, 8);
    const wbtcUsdPrice = Number(wbtcEthPrice) * Number(ethUsdPrice);
    console.log("WBTC-USD Price: " + wbtcUsdPrice);
    return wbtcUsdPrice;
  }

  async getWethOnContract() {
    const wethOnContractBN = await this.indexContract.wethOnContract();
    const wethOnContract = ethers.utils.formatEther(wethOnContractBN);
    console.log("weth on contract in ETH: " + wethOnContract);
    return wethOnContract;
  }

  async getAwethOnContract() {
    const aWethOnContractBN = await this.indexContract.aWethOnContract();
    const aWethOnContract = ethers.utils.formatEther(aWethOnContractBN);
    console.log("aWeth on contract in ETH: " + aWethOnContract);
    return aWethOnContract;
  }

  async getAwbtcOnContract() {
    const aWbtcOnContractBN = await this.indexContract.aWbtcOnContract();
    const aWbtcOnContract = ethers.utils.formatUnits(aWbtcOnContractBN, 8);
    console.log("aWbtc on contract in ETH: " + aWbtcOnContract);
    return aWbtcOnContract;
  }

  async getEthUsdPrice() {
    const ethUsdPriceLN = await this.indexContract.getEthPrice();
    const ethUsdPrice = ethers.utils.formatUnits(ethUsdPriceLN, 8);
    console.log("ETH-USD Price: " + ethUsdPrice);
    return ethUsdPrice;
  }

  // async getEthBalance(address: string) {
  //   const ethBalanceBN = await this.provider.getBalance(address);
  //   const ethBalance = ethers.utils.formatEther(ethBalanceBN);
  //   console.log("API: app.service.ts address: " + address);
  //   console.log("API: app.service.ts ethBalance: " + ethBalance);
  //   return {result: ethBalance};
  // }

  async getDipBalance(address: string) {
    const dipBalanceBN = await this.tokenContract.balanceOf(address);
    const dipBalance = ethers.utils.formatEther(dipBalanceBN);
    return dipBalance;
  }

  async invest(amount: string) {
    const fundTx = await this.indexContract.receive_funds({ "value": ethers.utils.parseEther(amount) });
    await fundTx.wait();
  }

  async getAllowance(from: string, to: string) {
    const allowanceBN = await this.tokenContract.allowance(from, to);
    const allowance = ethers.utils.formatEther(allowanceBN);
    return {result: allowance};
  }

}
 