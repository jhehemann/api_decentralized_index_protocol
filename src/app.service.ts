import { Injectable } from '@nestjs/common';
import { Contract, ethers } from 'ethers';
import { ConstructorFragment } from 'ethers/lib/utils';
import * as TokenContractJson from './assets/IndexToken.json';
import * as IndexContractJson from './assets/IndexContract.json'
import { appendFile } from 'fs';

const TOKEN_CONTRACT_ADDRESS = '0x90c84237fddf091b1e63f369af122eb46000bc70';
const INDEX_CONTRACT_ADDRESS = '0x3D63c50AD04DD5aE394CAB562b7691DD5de7CF6f';




@Injectable()
export class AppService {

  provider: ethers.providers.Provider;
  tokenContract: Contract;
  indexContract: Contract;

  constructor() {
    this.provider = ethers.getDefaultProvider('http://127.0.0.1:8545/');
    this.tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenContractJson.abi, this.provider);
    this.indexContract = new ethers.Contract(INDEX_CONTRACT_ADDRESS, IndexContractJson.abi, this.provider);
  }

  async getTotalSupply() {
    const totalSupplyBN = await this.tokenContract.totalSupply();
    const totalSupply = ethers.utils.formatEther(totalSupplyBN);
    return totalSupply;
  }

  async getEthBalance(address: string) {
    const ethBalanceBN = await this.provider.getBalance(address);
    const ethBalance = ethers.utils.formatEther(ethBalanceBN);
    console.log("API: app.service.ts address: " + address);
    console.log("API: app.service.ts ethBalance: " + ethBalance);
    return {result: ethBalance};
    
  }

}
 