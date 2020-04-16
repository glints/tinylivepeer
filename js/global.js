var proxyBondingManagerAddress = "0x511bc4556d823ae99630ae8de28b9b80df90ea2e";
var contractAddress = "0x511Bc4556D823Ae99630aE8de28b9B80Df90eA2e";
var roundsManagerAddress = "0x3984fc4ceeef1739135476f625d36d6c35c40dc3"
var logging = false;
var ganacheweb3;
let setupweb3;
var web3;

var windowaccounts = [];
var accounts = [];
var dash;

window.addEventListener("load", () => loadEdit(), false);
window.addEventListener("globalLoaded", () => globalLoaded(), false);
window.addEventListener("dashboardLoaded", () => dashboardLoaded(), false);
//pass dashboard to view
window.addEventListener('build', function (e) { buildView();}, false);
//event in dashboard
window.addEventListener("balanceUpdated", () => balanceUpdated(), false);
//Metamask
window.addEventListener("noMetamask", () => noMetamask(), false);
document.addEventListener("buildViewDone", () => MetamaskToggle(), false);

async function loadEdit(){
    // Modern dapp browsers...
    if (window.ethereum) {
      setupweb3 = await new setupWeb3("metamask");
      accounts = setupweb3.windowaccounts;
      //window.accounts = await setupweb3.getAccounts();

      console.log(accounts);
      web3 = setupweb3.web3;

      var event = new Event('Metamask');
      window.dispatchEvent(event);

      // made async
      abis = await new contractAbis([contractAddress,roundsManagerAddress],"LIVE");
      smartContractInstance = abis.smartContractInstance;
      var event = new Event('globalLoaded');
      window.dispatchEvent(event);

    }

    else {
        var event = new Event('noMetamask');
        window.dispatchEvent(event);

    }


}

async function globalLoaded(){

  dash = await new dashboard(abis);
  var event = new Event('dashboardLoaded');
  window.dispatchEvent(event);
}

async function dashboardLoaded(){

var eventEthLoaded = new Event('build');
window.dispatchEvent(eventEthLoaded);

var adminready = new Event('adminReady');
window.dispatchEvent(adminready);

}
