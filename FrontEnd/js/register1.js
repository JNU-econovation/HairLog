
// 입력값 다루기

const nextBTN = document.querySelector(".front");

function nextPage() {
  const Name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  
  
  sessionStorage.setItem('userEmail',email);
  sessionStorage.setItem('userPassword',password);
  sessionStorage.setItem('userName',Name);



  console.log(SignUp);



}

nextBTN.addEventListener("click", nextPage);
