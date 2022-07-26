    // 이름 넣기
    const name = document.querySelector(".name");

    fetch('https://hairlogapi.herokuapp.com/api/privacy/user')  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      console.log(Datas); 

      name.innerHTML = `${Datas.result.user.userName}님, 환영합니다!`;

    });

    // 페이지 이동
    const btn = document.querySelector(".btn");
    function goHome() {
      location.href='/'
    }
    btn.addEventListener("click",goHome);