const Home  = document.querySelector(".one");

if(Home.classList.contains("check")){
  const Plus = document.querySelector("#Plus");
  function goPlus() {
    location.href='http://localhost:3000/record';
  }
  Plus.addEventListener("click", goPlus);
}
else{
  function goHome() {
    location.href='http://localhost:3000/';
  }
  Home.addEventListener("click", goHome);
}


const Designer = document.querySelector(".two");
function goDesigner() {
  location.href='http://localhost:3000/designer';
}
Designer.addEventListener("click", goDesigner);

const myPage = document.querySelector(".three");
function gomyPage() {
  location.href='http://localhost:3000/mypage';
}
myPage.addEventListener("click", gomyPage);

