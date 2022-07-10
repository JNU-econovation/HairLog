

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

// 팝업 닫기
function closePopup(num) {
	const popup = document.querySelector('#popup');
  popup.classList.add('hide');


  if(num){
    // console.log("저장");
    const inputPW = document.querySelector("#inputPW").value;
    console.log(inputPW);

    // inputPW를 서버로 보내서 일치하는지 확인하고 일치하면 editProfile.html로 로드, 불일치하면 아래에 비밀번호가 틀립니다! 띄우기


  }
  else{
    console.log("취소");
  }
}



fetch('http://localhost:3000/api/result')  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      console.log(Datas); 

      // if(Datas.code===200){
      //   showUser(Datas);
      // }


    });