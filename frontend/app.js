App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
  
    init: function() {
      return App.initWeb3();
    },
  
    initWeb3: function() {
      // Initialize web3 and set the provider to connect to the appropriate network
      if (typeof web3 !== 'undefined') {
        // If a web3 instance is already provided by MetaMask or any other provider
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
        // Specify default instance if no web3 instance provided
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(App.web3Provider);
      }
      return App.initContract();
    },
  
    initContract: function() {
      // Load Refund.json to get the ABI and address of the deployed contract
      $.getJSON('Refund.json', function(refund) {
        // Instantiate a new truffle contract from the artifact
        App.contracts.Refund = TruffleContract(refund);
        // Connect provider to interact with contract
        App.contracts.Refund.setProvider(App.web3Provider);
  
        // Listen for events
        App.listenForEvents();
  
        // Render UI
        return App.render();
      });
    },
  
    render: function() {
      var refundInstance;
      var loader = $("#loader");
      var content = $("#content");
  
      loader.show();
      content.hide();
  
      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
          App.account = account;
          $("#accountAddress").html("Your Account: " + account);
        }
      });
  
      // Load contract data
      App.contracts.Refund.deployed().then(function(instance) {
        refundInstance = instance;
        return refundInstance.getContractCount();
      }).then(function(contractCount) {
        var contractData = $("#contractData");
        contractData.empty();
  
        for (var i = 1; i <= contractCount; i++) {
          refundInstance.getContractDetails(i).then(function(contract) {
            var id = contract[0];
            var minimumPointLong = contract[1];
            var minimumPointLat = contract[2];
            var maximumPointLong = contract[3];
            var maximumPointLat = contract[4];
            var startingTime = contract[5];
            var duration = contract[6];
            var gatheredLocationCount = contract[7];
            var contractTruth = contract[8];
            var completed = contract[9];
            var employeeId = contract[10];
            var employerId = contract[11];
  
            // Render contract data
            var contractTemplate = "<tr><th>" + id + "</th><td>" + minimumPointLong + "</td><td>" + minimumPointLat + "</td><td>" + maximumPointLong + "</td><td>" + maximumPointLat + "</td><td>" + startingTime + "</td><td>" + duration + "</td><td>" + gatheredLocationCount + "</td><td>" + contractTruth + "</td><td>" + completed + "</td><td>" + employeeId + "</td><td>" + employerId + "</td></tr>"
            contractData.append(contractTemplate);
          });
        }
  
        loader.hide();
        content.show();
      }).catch(function(error) {
        console.error("Error loading contract data: ", error);
      });
    },
  
    listenForEvents: function() {
      App.contracts.Refund.deployed().then(function(instance) {
        instance.CompletedEvent({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch(function(error, event) {
          console.log("Completed event triggered", event);
          // Reload when a new event is detected
          App.render();
        });
  
        instance.FailedEvent({}, {
          fromBlock: 0,
          toBlock: 'latest'
        }).watch(function(error, event) {
          console.log("Failed event triggered", event);
          // Reload when a new event is detected
          App.render();
        });
      });
    }
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  
  