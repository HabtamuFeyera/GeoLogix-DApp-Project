const CONTRACT_ADDRESS = '0x71d342F396716Aa1beA2Da817F78DE64e75B409E'; // Replace this with your actual contract address

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      web3 = new Web3(window.ethereum);
      try {
        // Request account access
        window.ethereum.enable().then(function() {
          // Accounts now exposed
          web3.eth.sendTransaction({/* ... */});
        });
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
      web3 = new Web3(window.web3.currentProvider);
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    // Load the contract JSON file
    $.getJSON("RefunderContract.json", function(refundContract) {
      // Instantiate a new web3 contract
      App.contracts.refundContract = new web3.eth.Contract(refundContract.abi, CONTRACT_ADDRESS);
      return App.render();
    });
  },

  render: function() {
    var loader = $("#loader");
    var content = $("#content");
    var contractInfo = $("#contractInfo");
    var accountInfo = $("#accountInfo");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        accountInfo.html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.refundContract.methods.getContractData().call({ from: App.account })
      .then(function(contractData) {
        contractInfo.html("Contract Data: " + JSON.stringify(contractData));
      })
      .catch(function(err) {
        console.error("Error fetching contract data:", err);
      });

    // Example usage:
    var employeeAddress = 'EMPLOYEE_ADDRESS';
    var latitude = 123; // Replace with the actual latitude
    var longitude = 456; // Replace with the actual longitude

    // Check employee position
    App.contracts.refundContract.methods.checkPosition(employeeAddress, latitude, longitude).call({ from: App.account })
      .then(function(result) {
        if (result) {
          console.log("Employee is within radius. Proceeding to pay.");
          // Pay the employee
          return App.contracts.refundContract.methods.pay(employeeAddress).send({ from: App.account });
        } else {
          console.log("Employee is outside radius.");
        }
      })
      .then(function(receipt) {
        if (receipt) {
          console.log("Payment successful! Transaction receipt: ", receipt);
        }
      })
      .catch(function(err) {
        console.error("Error:", err);
      })
      .finally(function() {
        loader.hide();
        content.show();
      });
  }
};

$(document).ready(function() {
  App.init();
});
