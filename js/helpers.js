/*
 * (c) 2019 Elvis Glints
 * Released under the MIT License.
 */
 function htmlEntities(str) {
     return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 }

/* enable/disable logging easily */
function logOutput(error,result) {

  if(logging){

    if(!error){
      console.log(result);
    }
    else{
      console.error(error);
    }

  }


}
