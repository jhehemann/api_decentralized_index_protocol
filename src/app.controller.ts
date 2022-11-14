import { Controller, Get, Param, Query } from '@nestjs/common';
import { BigNumber } from 'ethers';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('total-supply')
  getTotalSupply() {
    return this.appService.getTotalSupply();
  }

  @Get('index-value')
  getIndexValue() {
    return this.appService.getIndexValue();
  }

  @Get('wbtc-usd-price')
  getWbtcUsdPrice() {
    return this.appService.getWbtcUsdPrice();
  }

  @Get('eth-usd-price')
  getEthUsdPrice() {
    return this.appService.getEthUsdPrice();
  }

  @Get('weth-on-contract')
  getwethOnContract() {
    return this.appService.getWethOnContract();
  }

  @Get('aweth-on-contract')
  getAwethOnContract() {
    return this.appService.getAwethOnContract();
  }

  @Get('awbtc-on-contract')
  getAwbtcOnContract() {
    return this.appService.getAwbtcOnContract();
  }

  // @Get('eth-balance/:address')
  // getEthBalance(@Param('address') address: string) {
  //   console.log("API: app.controller.ts address: " + address);
    
  //   //console.log("API: app.controller.ts ethBalance: " + this.appService.getEthBalance(address));
    
  //   return this.appService.getEthBalance(address);
  // }

  @Get('dip-balance/:address')
  getDipBalance(@Param("address") address: string) {   
    return this.appService.getDipBalance(address);
  }

  @Get('allowance')
  getAllowance(@Query("from") from: string, @Query("to") to: string) {
    return this.appService.getAllowance(from, to);
  }


}
