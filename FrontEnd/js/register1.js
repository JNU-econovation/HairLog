
// 입력값 다루기

const nextBTN = document.querySelector(".front");

function nextPage() {
  const Name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const SignUp = {
    userEmail: email,
    userPassword: password,
    userName: Name,
  }

  console.log(SignUp);

  // 서버로 따로 보내는 버전
  
  fetch('/api/swagger/join', {
    method: 'POST',
    body: JSON.stringify(SignUp),     //객체 -> JSON
  }) 
    .then((response) => response.json())
    .then((result) => { console.log(result); });

}

nextBTN.addEventListener("click", nextPage);
