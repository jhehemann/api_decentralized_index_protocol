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

  @Get('eth-balance/:address')
  getEthBalance(@Param('address') address: string) {
    console.log("API: app.controller.ts address: " + address);
    
    console.log("API: app.controller.ts ethBalance: " + this.appService.getEthBalance(address));
    
    return this.appService.getEthBalance(address);
  }
}
