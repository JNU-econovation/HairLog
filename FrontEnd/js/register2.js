// 숫자만 추출 (13주 -> 13)
function editTime(t) {
  const result = t.replace(/[^0-9]/g, "");
  return result;
}



// 시술주기 선택값 저장 
const inputDirect = document.querySelector(".select3");

let Time, directTime;

function handleTimer(e) {
  // 직접입력 선택했을 때 입력창 띄우기
  const value = e.value;

  if(value==='3'){
    inputDirect.classList.remove("hidden");
  }
  else {
    inputDirect.classList.add("hidden");
  }

  const selectedTime = document.querySelector("#selectTime");
  
  //선택값이 직접입력이 아닌 경우
  if(selectedTime.options[selectedTime.selectedIndex].value !=3 ) { 
    directTime=0;
    Time = selectedTime.options[selectedTime.selectedIndex].text;
    Time = editTime(Time);
  }
  //선택값이 직접입력인 경우
  else {
    directTime=1;
  }
}


//세션에서 가져올 값
let email = sessionStorage.getItem("userEmail");
let password = sessionStorage.getItem("userPassword");
let Name = sessionStorage.getItem("userName");

// console.log(sessionStorage.getItem("userEmail"));

//성별 선택값 저장
let Sex;
let SignUp;


function handleSex(e) {
  const selectedSex = document.querySelector("#selectSex");
  Sex = selectedSex.options[selectedSex.selectedIndex].value;   //f, m, unknown

  // console.log(Sex);
}


// sign up 버튼으로 전달

const signBTN = document.querySelector(".btn");

function signBtnClick() {
  if(directTime===0) {  //직접입력아닐때
    SignUp = {
      userEmail: email,
      userPassword: password,
      userName: Name,
      userSex: Sex,
      userCycle: Time,
    }
  }
  else {   //직접입력일때
    const temp = document.querySelector("#inputDirect").value;
    SignUp = {
      userEmail: email,
      userPassword: password,
      userName: Name,
      userSex: Sex,
      userCycle: editTime(temp),
    }
  }
  // console.log(SignUp);

  // 서버로 따로 보내는 버전
  
  fetch('https://hairlogapi.herokuapp.com/api/join', {
    headers: {
      'Content-Type': 'application/json'     
    },
    method: 'POST',
    body: JSON.stringify(SignUp),     //객체 -> JSON
  }) 
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(Datas);
      // console.log(result);

      // location.href = '../html/after_register.html';
      location.href = 'https://hairlogapi.herokuapp.com/after_register';

     });

    sessionStorage.clear();

    

}

signBTN.addEventListener("click",signBtnClick);



