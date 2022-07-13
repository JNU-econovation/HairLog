function makeUrl (apiUrl) {
  var base ="https://hairlogapi.herokuapp.com/"
  return base + apiUrl
}

var register_1Url = makeUrl("register_1")   
var authenticateUrl = makeUrl("api/authenticate")   

const goRegister = document.querySelector(".goRegister");
function movePage() {
  location.href = register_1Url;
}
goRegister.addEventListener("click", movePage);


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



let Result = await fetch(authenticateUrl, {

    headers: {
      'Content-Type': 'application/json'         //content-type으로 보내야 서버 body에 들어감
    },
    method: 'POST',
    body: JSON.stringify(Login),     //객체 -> JSON
    
  }) 
    .then((response) => response.text())
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

    location.href = '/';

  }

}


loginForm.addEventListener("submit", getLogin);