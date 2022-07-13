function makeUrl (apiUrl) {
  if(apiUrl != undefined){
    var base ="https://hairlogapi.herokuapp.com/"
    return base + apiUrl
  } else {
    var base ="https://hairlogapi.herokuapp.com/"
    return base
  }

}

var recordUrl = makeUrl("record")  
var Url =makeUrl() 
var designerUrl = makeUrl("designer")  
var mypageUrl = makeUrl("mypage")  

const Home  = document.querySelector(".one");

if(Home.classList.contains("check")){
  const Plus = document.querySelector("#Plus");
  function goPlus() {
    location.href=recordUrl;
  }
  Plus.addEventListener("click", goPlus);
}
else{
  function goHome() {
    location.href=Url;
  }
  Home.addEventListener("click", goHome);
}


const Designer = document.querySelector(".two");
function goDesigner() {
  location.href=designerUrl;
}
Designer.addEventListener("click", goDesigner);

const myPage = document.querySelector(".three");
function gomyPage() {
  location.href=mypageUrl;
}
myPage.addEventListener("click", gomyPage);

