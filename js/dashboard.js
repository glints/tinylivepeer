class dashboard{


  constructor(abis){


    this.abis = abis;
    this.ethloaded = new Array();

    this.contractaddress = this.abis.contractAddress;
    this.smartContract = this.abis.smartContract;
    this.smartContractInstance = this.abis.smartContractInstance;
    this.roundsManagerContractInstance = this.abis.roundsManagerContractInstance;

    this.currentAccount = setupweb3.windowaccounts[0];


    this.promisify = (inner,args) =>
      new Promise((resolve, reject) => (function(){
        //console.log("does not work");
        if(typeof args === "undefined" ){

            inner((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        }

        else{

          if(typeof(args) === "object"){
            // ... extracts arguments in newer versions of js (apply did not work here)
            inner(...args,(err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
          }
          // single argument
          else{
            inner(args,(err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
          }


        }

      })()
      );

      //only for inside constructor
      self = this;

    return (async () => {

      //var address = window.web3.toChecksumAddress(setupweb3.windowaccounts[0]);
      var address = setupweb3.windowaccounts[0];
      var delegator = await self.getDelegator(address);

      return self;
    })();
  }
  //end constructor

  async getDelegator(address){

    var delegator = await self.promisify(self.smartContractInstance.getDelegator.call,address);
    var currentRound = await self.promisify(self.roundsManagerContractInstance.currentRound.call);

    self.delegator = delegator;
    self.bondedAmount = web3.fromWei(delegator[0].toString(10), 'ether');
    self.fees = delegator[1];
    self.delegateAddress = delegator[2];
    self.delegatedAmount = delegator[3];
    self.startRound = delegator[4];
    self.lastClaimRound = delegator[5];
    self.nextUnbondingLockId = delegator[6];
    self.currentRound = currentRound;
    self.claimableRounds = self.currentRound - self.lastClaimRound;

    var pendingStake = await self.getPendingStake(address);

    return delegator;

  }

  async getPendingStake(address){

    try {
      console.log(self.currentRound.c[0]);
        var args = Array(address,self.currentRound.c[0]);
        var pendingStake = await self.promisify(self.smartContractInstance.pendingStake.call,args);

        self.pendingStake = web3.fromWei(pendingStake.toString(10), 'ether');
        if(self.currentRound.c[0] !== undefined){

          return self.pendingStake;
        }

    } catch (error){
      console.log(error);
    }
  }

  async claimEarnings(address){
    try {
      /* claim 100 rounds if more than 100 rounds claimable */
      if(self.claimableRounds > 100){
        var args = parseInt(self.lastClaimRound) + 100;
      }
      else{
        //var args = self.claimableRounds % 100;
        var args = self.currentRound;

      }

      console.log(args);
      console.dir(self.smartContractInstance);
      var claim = await self.promisify(self.smartContractInstance.claimEarnings.sendTransaction,Array(args,{from: address,gas:2800000}));

      return claim;
    }
    catch(error){
      console.log(error);
    }
  }




}
