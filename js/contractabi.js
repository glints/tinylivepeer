// contract abi
class contractAbis{

  constructor(contractAddress,development){

    return (async () => {

      var files = ['abi/livepeer_bondingmanager_abi.json','abi/livepeer_roundsmanager_abi.json'];
      var jsonfiles = [];
      var index = 0;

      for(index in files){
        var json = (function() {
                var json = null;
                $.ajax({
                    'async': false,
                    'global': false,
                    'url': files[index],
                    'dataType': "json",
                    'success': function (data) {
                        json = data;
                    }
                });

                return json;
          })();
          jsonfiles.push(json)
      }


      this.web3 = web3;

      //console.log(jsonfiles);
      var contractabi = jsonfiles[0];
      var roundscontractabi = jsonfiles[1];
      this.contractAddress = contractAddress[0];
      this.roundsManagerAddress = contractAddress[1];

      // creation of contract object
      this.smartContract = this.web3.eth.contract(contractabi);
      this.roundsManagerContract = this.web3.eth.contract(roundscontractabi);

      // initiate contract with tokenAddress
      this.smartContractInstance = this.smartContract.at(this.contractAddress);
      this.roundsManagerContractInstance = this.roundsManagerContract.at(this.roundsManagerAddress);


      return this;
    })();
  }

  getsmartContractInstance(){
    return this.smartContractInstance;
  }

  getcontractAddress(){
    return this.contractAddress;
  }



}//close class
