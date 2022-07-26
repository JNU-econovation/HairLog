const Home  = document.querySelector(".one");

if(Home.classList.contains("check")){
  const Plus = document.querySelector("#Plus");
  function goPlus() {
    location.href='https://hairlogapi.herokuapp.com/record';
  }
  Plus.addEventListener("click", goPlus);
}
else{
  function goHome() {
    location.href='https://hairlogapi.herokuapp.com/';
  }
  Home.addEventListener("click", goHome);
}


const Designer = document.querySelector(".two");
function goDesigner() {
  location.href='https://hairlogapi.herokuapp.com/designer';
}
Designer.addEventListener("click", goDesigner);

const myPage = document.querySelector(".three");
function gomyPage() {
  location.href='https://hairlogapi.herokuapp.com/mypage';
}
myPage.addEventListener("click", gomyPage);

