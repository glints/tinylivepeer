/*!
 * 
 * (c) 2019 Elvis Glints
 * Released under the MIT License.
 */
class setupWeb3{

  constructor(provider){

    self = this;
    self.windowaccounts;
    self.web3;

    if(provider == "metamask"){

      return (async () => {


        if (window.ethereum) {
            await window.ethereum.enable();

            window.web3 = new Web3(window.ethereum);
            try {

                accounts = await self.getAccounts();
                self.windowaccounts = accounts;

                if(window.web3.currentProvider.isMetaMask === true){

                  // set variables
                  self.web3 = window.web3;
                  self.metamaskaddress;
                  return self;

                }// close isMetamask

              }//close try
              catch (error) {console.log(error);}

            }//if ethereum

          })();//close async
        }//close if provider metamask



        if(provider == "other"){

          return (async () => {

            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            //self.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            self.web3 = "disabled";
            return self;

          })();//close async

        }//close if


  }//end constructor

  async getAccounts(){

    // Request account access if needed
    var ethlib = await ethereum.enable();
    var asyncreq = new asyncrequest();
    var accounts = await asyncreq.promisify(window.web3.eth.getAccounts);

    return accounts;

  }


}
