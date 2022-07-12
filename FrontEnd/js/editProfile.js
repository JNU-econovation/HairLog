// 
const back = document.querySelector(".back");
function goBack() {
  history.back();
}
back.addEventListener("click", goBack);


// 현재 정보 시각화 함수 
function showProfile(exDatas) {
  console.log(exDatas);

  const nameHolder = document.querySelector("#uName");
  nameHolder.value = exDatas.result.user.userName;             

  const cycleHolder = document.querySelector("#uCycle");
  cycleHolder.value = `${(exDatas.result.user.userCycle)/7}주`;         
  
}

// 정보 불러와서 현재 정보 보여주기
let userEmail, userSex, userPassword;
let userPW;

fetch('http://localhost:3000/api/privacy/user')  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      // console.log(Datas); 

      if(Datas.code===200){
        showProfile(Datas);
        userEmail = Datas.result.user.userEmail;
        userSex = Datas.result.user.userSex;
      }
    });


// 수정할 객체 만들기
function mkEdit() {
  let userName = document.querySelector('#uName').value;
  let userCycle = (document.querySelector("#uCycle").value.replace(/[^0-9]/g, ""))*7;    // 숫자만 가져와서 일로 변환(*7)

  userPassword = document.querySelector("#newPW").value;

  let result = {userEmail,userPassword,userName,userSex,userCycle};
  // console.log(result);

  return result;
}

// 서버로 수정 요청 보내기
function goEdit() {
  let editData = mkEdit();
  console.log(editData);

  fetch('http://localhost:3000/api/privacyUpdate/user', {        // 서버로 보내고 결과 출력
  headers: {
    'Content-Type': 'application/json'       
  },
  method: 'POST',
  body: JSON.stringify(editData), 
  }) 
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(result);
    console.log("수정완료",Datas); 

  });

}

const completeBTN = document.querySelector(".complete");
completeBTN.addEventListener("click", goEdit);