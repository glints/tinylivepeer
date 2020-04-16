/*!
 * Ethereum crowdsale
 * (c) 2019 Elvis Glints
 * Released under the MIT License.
 */

class asyncrequest{

  constructor(){

    self = this;
    self.promise;

  }

  async promisify(inner,args){

    var promised = new Promise((resolve, reject) => (function(){

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
        inner(args,(err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })

      }

    })());
    return promised;

  }// close promisify


}//close class
