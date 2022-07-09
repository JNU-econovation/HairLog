
//기록 추가 -> 디자이너 직접 추가 팝업
function showPopup() {
	const popup = document.querySelector('#popup');
  popup.classList.remove('hide');
}

// 나중에 팝업 취소하고 닫기, 저장하고 닫기 두개로 나누기
function closePopup(isSave) {
  if(isSave){    // 저장 하고 닫기
    const popup = document.querySelector('#popup');
    popup.classList.add('hide');
    console.log("저장O");
    
    const designerName = document.querySelector("#inputDesignerName").value;
    const designerSalon = document.querySelector("#inputDesignerPlace").value;
    const fav = false;
    const designerData = { designerName, designerSalon, fav };          // 전송할 객체
    console.log(designerData);

    fetch('http://localhost:3000/api/designer', {        // 서버로 보내고 결과 출력
      headers: {
        'Content-Type': 'application/json'       
      },
      method: 'POST',
      body: JSON.stringify(designerData), 
    }) 
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      console.log(Datas); 
  
    });

  }
  else{       // 저장 안하고 닫기
    const popup = document.querySelector('#popup');
    popup.classList.add('hide');
    console.log("저장X")
  }

}