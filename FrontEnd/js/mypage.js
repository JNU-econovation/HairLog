var makeUrl = require("./makeUrl").makeUrl

var userUrl = makeUrl("api/privacy/user")   
var checkPasswordUrl = makeUrl("api/checkPassword")   
var editProfileUrl = makeUrl("editProfile")   

// test
const img = document.createElement('img');
img.src = '../imgs/ch_blue.png';
img.classList.add("imgTest");
const imgTest = document.querySelector('.imgTest');
imgTest.appendChild(img);


// 화면에 시각화 함수
function showUser(exDatas) {
  const userName = document.querySelector(".pBox");
  userName.innerHTML = `${exDatas.result.user.userName}님`;

  const recentDate = document.querySelector("#recent");
  recentDate.innerHTML = exDatas.result.recentDate.slice(0,10).replaceAll('-','.');

  const nextDate = document.querySelector("#next");
  nextDate.innerHTML = exDatas.result.nextDate.slice(0,10).replaceAll('-','.');
}


// 마이페이지 보여주기 
fetch(userUrl)  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      console.log(Datas); 
      if(Datas.code===200){
        showUser(Datas);
      }


    });



// 수정 페이지로 이동(비밀번호 확인)

// 팝업 띄우기
function showPopup() {
	const popup = document.querySelector('#popup');
  popup.classList.remove('hide');
}
const editBtn = document.querySelector(".editBtn");
editBtn.addEventListener("click", showPopup);

// 팝업 닫기
function closePopup(num) {
	const popup = document.querySelector('#popup');
  popup.classList.add('hide');


  if(num){
    // console.log("저장");
    const userPassword = document.querySelector("#inputPW").value;

    const PW = {userPassword};
    console.log(PW);

    // inputPW를 서버로 보내서 일치하는지 확인하고 일치하면 editProfile.html로 로드, 불일치하면 아래에 비밀번호가 틀립니다! 띄우기
    
    fetch(checkPasswordUrl, {
      headers: {
        'Content-Type': 'application/json'     
      },
      method: 'POST',
      body: JSON.stringify(PW),     //객체 -> JSON
    }) 
      .then((response) => response.text())
      .then((result) => { 
        Datas = JSON.parse(result);
        console.log(Datas.code);
        if(Datas.code===200){
          location.href = editProfileUrl;
        }
  
       });

  }
  else{
    console.log("취소");
  }
}
const back = document.querySelector(".back");
back.addEventListener("click", event => closePopup(0));

const complete = document.querySelector(".complete");
complete.addEventListener("click", event => closePopup(1));

