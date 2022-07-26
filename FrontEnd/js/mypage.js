// test
const img = document.createElement('img');
img.src = '../imgs/ch_blue.png';
img.classList.add("imgTest");
const imgTest = document.querySelector('.imgTest');
imgTest.appendChild(img);


// 화면에 시각화 함수
function showUser(exDatas) {
  // console.log(exDatas);

  const userName = document.querySelector(".pBox");
  userName.innerHTML = `${exDatas.result.user.userName}님`;

  const recentDate = document.querySelector("#recent");
  recentDate.innerHTML = exDatas.result.recentDate.slice(0,10).replaceAll('-','.');

  const nextDate = document.querySelector("#next");
  nextDate.innerHTML = exDatas.result.nextDate.slice(0,10).replaceAll('-','.');
}


// 마이페이지 보여주기 
fetch('http://localhost:3000/api/privacy/user')  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      // console.log(Datas); 

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
    // console.log(PW);
    location.href = 'http://localhost:3000/editProfile';

  }
  else{
    // console.log("취소");
  }
}
const back = document.querySelector(".back");
back.addEventListener("click", event => closePopup(0));

const complete = document.querySelector(".complete");
complete.addEventListener("click", event => closePopup(1));
