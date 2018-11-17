pragma solidity ^0.4.24;

import "./Ownable.sol";

contract Verify is Ownable {
    
    event charityRegistered(address addr);
    event homelessRegistered(address addr);

    mapping (address => bool) public verifiedCharity;
    mapping (address => bool) public verifiedHomeless;
    
    modifier isCharity() {
        require(verifiedCharity[msg.sender] == true);
        _;
    }
    
    function addVerifiedCharity(address _charityAddress) public onlyOwner(){
        require(verifiedCharity[_charityAddress] == false);
        verifiedCharity[_charityAddress] = true;
        emit charityRegistered(_charityAddress);
    }
    
    function addVerifiedHomeless(address _homelessAddress) public isCharity(){
        require(verifiedHomeless[_homelessAddress] == false);
        verifiedHomeless[_homelessAddress] = true; 
        emit homelessRegistered(_homelessAddress);
    }
}