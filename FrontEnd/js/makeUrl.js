module.exports = function makeUrl (apiUrl) {
    if(apiUrl != undefined){
      var base ="https://hairlogapi.herokuapp.com/"
      return base + apiUrl
    } else {
      var base ="https://hairlogapi.herokuapp.com/"
      return base
    }
  
 }