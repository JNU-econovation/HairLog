
// 직접입력 다루기
const inputDirect = document.querySelector(".select3");

function handleOnTimer(e) {
  const value = e.value;

  if(value==='3'){
    inputDirect.classList.remove("hidden");
  }
  else {
    inputDirect.classList.add("hidden");
  }
}

