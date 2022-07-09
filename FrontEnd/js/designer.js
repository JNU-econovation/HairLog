
//기록 추가 -> 디자이너 직접 추가 팝업 띄우기
function showPopup() {
	const popup = document.querySelector('#popup');
  popup.classList.remove('hide');
}


// 디자이너 추가
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
      showDesigners();
    });

  }
  else{       // 저장 안하고 닫기
    const popup = document.querySelector('#popup');
    popup.classList.add('hide');
    console.log("저장X")
  }
}

// 배열 전달 받아서 box 만드는 함수
function mkBoxes(exDatas) {
  // console.log(exDatas.designerList);

  const Boxes = document.querySelector(".boxes");
  Boxes.innerHTML = "";   //초기화

  for(let i=0;i<exDatas.designerList.length;i++){
    let temp = exDatas.designerList[i];

    const newBox = document.createElement('div');          //box 만들기
    newBox.classList.add("box");
    Boxes.appendChild(newBox);

    const newStar = document.createElement('p');           // box에 별 넣기
    newStar.innerHTML = '☆';
    newStar.classList.add('star');
    if(temp.designerFav){                 // 선호 디자이너 -> 별 노랑색
      newStar.classList.add('fav');
    }
    newBox.appendChild(newStar);

    const newDesigner = document.createElement('p');         // box에 디자이너 넣기
    newDesigner.innerHTML = `${temp.designerName} 디자이너`;
    newDesigner.classList.add("dName");
    newBox.appendChild(newDesigner);

    const newSalon = document.createElement('p');          // box에 미용실 넣기
    newSalon.innerHTML = `${temp.designerSalon}`;
    newSalon.classList.add("dSalon");
    newBox.appendChild(newSalon);

    const newEditBtn = document.createElement('p');        // box에 편집버튼 넣기
    newEditBtn.innerHTML = '✂';
    newEditBtn.classList.add("editBtn");
    newBox.appendChild(newEditBtn);

    const newDeleteBtn = document.createElement('p');      // box에 삭제버튼 넣기 
    newDeleteBtn.innerHTML = '✖';
    newDeleteBtn.classList.add('deleteBtn');
    newBox.appendChild(newDeleteBtn);


  }
}

// 디자이너 전달받아서 목록 시각화 함수
function showDesigners() {
  fetch('http://localhost:3000/api/designer')  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      console.log(Datas); 

      if(Datas.code===200){
        mkBoxes(Datas);
      }

  
    });
}

showDesigners();


