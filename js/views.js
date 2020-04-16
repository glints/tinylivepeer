/*
 * (c) 2019 Elvis Glints
 * Released under the MIT License.
 */

$( document ).ready(function() {

});


var vmMetamaskdisabled = new Vue({
  el: '#metamaskdisabled',
  data: function() {
    return {
      metamaskdisabled : true
    }
  }

});

async function noMetamask(){
  //console.log("no metamask");
  $(".metamaskprogress img").css("display","none");
  $(".metamaskprogress p").html("No Metamask found, please install using the link below.");
}

async function MetamaskToggle(){
  //console.log("tog this");
  /* Metamask is enabled, so show the crowdfundwrap */
  $(".crowdsalewrap").css("display","block");
  $(".metamaskprogress").css("display","none");
  vmMetamaskdisabled.metamaskdisabled = false;
}

async function buildView(){

  //console.dir(dash);
  vmCurrentAccount = new Vue({
    el: '#current-account',
    data(){
      return {
        currentaddress: dash.currentAccount

      }
    }
  });

  vmDashboard = new Vue({
    el: '#dashboard',
    data: {
      items: [
      'delegator bonded amount: ' + htmlEntities(dash.bondedAmount),
      'delegator fees: ' + htmlEntities(dash.fees),
      'delegator address: ' + htmlEntities(dash.delegateAddress),
      'delegated amount: ' + htmlEntities(dash.delegatedAmount),
      'start round:' + htmlEntities(dash.startRound),
      'last claim round: ' + htmlEntities(dash.lastClaimRound),
      'current round:' + htmlEntities(dash.currentRound),
      'claimable rounds:' + htmlEntities(dash.claimableRounds),
      'pending stake:' + htmlEntities(dash.pendingStake),
      ]
    }
  });

  vmButtons = new Vue({
    el: '#livepeer-btns',
    methods: {
      getNumRounds: () => {
        if(dash.claimableRounds < 100) {
          return dash.claimableRounds;
        }
        else{
          return 100;
        }

      }
    },
    data(){
      return {
        numrounds : this.getNumRounds(),
        items: [

        ],
        click: (buttonName,$event) => {
          var self = this;
          if (buttonName === 'claimearnings') {
            
            dash.claimEarnings(dash.currentAccount);

            }//close if
          }//close click
        }//close return

      }//close data

  });




  var eventBuildView = new Event('buildViewDone');
  document.dispatchEvent(eventBuildView);


}//close buildView
