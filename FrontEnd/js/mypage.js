
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
