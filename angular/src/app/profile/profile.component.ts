import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileServiceService],
})
export class ProfileComponent implements OnInit {

  // private name: string = "Janet Jackson"
  // private story: string = "Hi my name is alsjflsjfljdflsj";
  // private location: string = "Toronto, Ontario";
  // private imgUrl: string = "http://wp.production.patheos.com/blogs/pursuedbytruth/files/2015/11/richard.jpg";
  // private moneyRaised: number = 5000;
  private profilesArray: Profile[];

  private title = 'uCareEth';
  private ContractAddress = "0xbD52C5265B94f727f0616f831b011c17e1f235A2";
  private ABI = [{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }];
  private provider = new ethers.providers.Web3Provider(web3.currentProvider, 'rinkeby')
  private signer;
  private ContractInstance;

  constructor(private profileService: ProfileServiceService) {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      ContractInstance = new ethers.Contract(ContractAddress, ABI, signer);
      console.log(ContractInstance);

    })
  }

  ngOnInit() {
    this.profilesArray = this.profileService.getProfiles();
    console.log(this.profilesArray);
  }

  private async sendDonation() {
    let fromAddress = '0xC3b290bbF6Bdf0a73daE6dED2b737007f7E975f8';
    let toAddress = '0x828007A18e03562738D71d323B9698EC292EdEDB';
    let done = await ContractInstance.transfer(toAddress, ethers.utils.bigNumberify(10000000000));
    console.log('Transaction Finished')
  }
}
