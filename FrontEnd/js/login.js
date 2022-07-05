const loginForm = document.querySelector("#loginForm");


function getLogin(event) {
  event.preventDefault();
  const ID = document.querySelector('#id').value;
  const PD = document.querySelector('#password').value;

  const Login = {
    userEmail: ID,
    userPassword: PD,
  }

  console.log(Login);
  console.log(typeof(Login));

  // 서버로 보내.........!!!!!!!!!!!

  fetch('/api/swagger/authenticate', {
    method: 'POST',
    body: JSON.stringify(Login),     //객체 -> JSON
  }) 
    .then((response) => response.json())
    .then((result) => { console.log(result); });
    
}

loginForm.addEventListener("submit", getLogin);