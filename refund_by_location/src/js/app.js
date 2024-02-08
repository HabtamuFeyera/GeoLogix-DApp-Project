const CONTRACT_ADDRESS = '0x9B5a6cc6Fd6c3ACede8374C4D939f29aC499bf11'; // Replace this with the deployed contract address

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

  // Update the render function to populate the table with contract data
  render: function() {
    var loader = $("#loader");
    var content = $("#content");
    var contractTable = $("#contractInfo");
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
        // Populate the table with contract data
        var tableContent = "<tr><th>Employee Address</th><th>Center Latitude</th><th>Center Longitude</th><th>Radius</th><th>Budget</th><th>Status</th></tr>";
        for (var i = 0; i < contractData.length; i++) {
          tableContent += "<tr>";
          tableContent += "<td>" + contractData[i].employeeAddress + "</td>";
          tableContent += "<td>" + contractData[i].centerLatitude + "</td>";
          tableContent += "<td>" + contractData[i].centerLongitude + "</td>";
          tableContent += "<td>" + contractData[i].radius + "</td>";
          tableContent += "<td>" + contractData[i].budget + "</td>";
          tableContent += "<td>" + contractData[i].status + "</td>";
          tableContent += "</tr>";
        }
        contractTable.html(tableContent);
      })
      .catch(function(err) {
        console.error("Error fetching contract data:", err);
      });

    // Other code remains unchanged
  }
};


$(document).ready(function() {
  App.init();
});
