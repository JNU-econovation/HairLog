const loginForm = document.querySelector("#loginForm");


async function getLogin(event) {           //async 써서 해라
  event.preventDefault();
  const ID = document.querySelector('#id').value;
  const PD = document.querySelector('#password').value;

  const Login = {
    userEmail: ID,
    userPassword: PD,
  }

  console.log(Login);
  console.log(typeof(Login));

  // 서버로 보내.........!!!!!!!!!!! 성공

  //await 써라

let Result = await fetch('https://hairlogapi.herokuapp.com/api/authenticate', {
    headers: {
      'Content-Type': 'application/json'         //content-type으로 보내야 서버 body에 들어감
    },
    method: 'POST',
    body: JSON.stringify(Login),     //객체 -> JSON
    
  }) 
    .then((response) => response.text())
    // .then((result) => console.log(result));
    .then((result) =>{ 
      return JSON.parse(result);
    });

  console.log(Result)

  if(Result.code === 404) {       //로그인 실패

    const alarm = document.querySelector(".loginForm p");
    alarm.classList.remove("hidden");
    document.querySelector('#id').value= "";
    document.querySelector('#password').value ="";
  }
  else{      //성공
    location.href = '../html/home.html';
  }

}


loginForm.addEventListener("submit", getLogin);