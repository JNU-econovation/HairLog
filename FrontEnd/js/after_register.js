function makeUrl (apiUrl) {
  var base ="https://hairlogapi.herokuapp.com/"
  return base + apiUrl
}

var userUrl = makeUrl("api/privacy/user")    

// 이름 넣기
const name = document.querySelector(".name");

fetch(url)  
.then((response) => response.text())
.then((result) => { 
  Datas = JSON.parse(result);
  name.innerHTML = `${Datas.result.user.userName}님, 환영합니다!`;
});

// 페이지 이동
const btn = document.querySelector(".btn");
function goHome() {
  location.href='/'
}
btn.addEventListener("click",goHome);