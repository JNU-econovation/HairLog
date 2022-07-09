// 입력값 초기화 함수
function resetInput() {
  document.querySelector("#inputDesignerName").value = '';
  document.querySelector("#inputDesignerPlace").value = '';
}

//기록 추가 -> 디자이너 직접 추가 팝업 띄우기
const addBTN = document.querySelector("#add");
const editBTN = document.querySelector("#edit");

function showPopup(num, ID) {
	const popup = document.querySelector('#popup');
  popup.classList.remove('hide');


  
  if(num===1){   // 추가
    editBTN.classList.add("hidden");
    addBTN.classList.remove("hidden");
  }
  else if(num===0) {
    addBTN.classList.add("hidden");
    editBTN.classList.remove("hidden");
    editID = ID;
  }

}

// 디자이너 삭제 함수
function deleteDesigner(id) {
  const DesignerId = Number(id.slice(1));
  const ID = {DesignerId};

  fetch('http://localhost:3000/api/designerDelete', {        // 서버로 보내고 결과 출력
  headers: {
    'Content-Type': 'application/json'       
  },
  method: 'POST',
  body: JSON.stringify(ID), 
  }) 
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    console.log("삭제완료",Datas); 
    showDesigners();
  });
}


// 디자이너 추가(1), 취소(0)
function closePopup(isSave) {
  if(isSave){    // 저장 하고 닫기
    const popup = document.querySelector('#popup');
    popup.classList.add('hide');
    // console.log("추가");
    
    const designerName = document.querySelector("#inputDesignerName").value;
    const designerSalon = document.querySelector("#inputDesignerPlace").value;
    const fav = false;
    const designerData = { designerName, designerSalon, fav };          // 전송할 객체
    // console.log(designerData);

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
      console.log("추가완료",Datas); 
      showDesigners();
      resetInput();
    });

  }
  else{       // 저장 안하고 닫기
    const popup = document.querySelector('#popup');
    popup.classList.add('hide');
    // console.log("취소")
  }
}

// 디자이너 수정
let editID=0;
// 임시 배열 (매번 초기화)
let dArray = [];

function editAll(id) {
  const popup = document.querySelector('#popup');     // 팝업창 삭제
  popup.classList.add('hide');
  // console.log("수정");



  let DesignerId = id;
  // console.log(DesignerId);
  let designerName,designerSalon,designerFav;

  designerName = document.querySelector("#inputDesignerName").value;
  designerSalon = document.querySelector("#inputDesignerPlace").value; 


  for(let i=0;i<dArray.length;i++){     // id에 맞는 디자이너,미용실 이름 가져오기
    if(DesignerId === dArray[i].id){
      designerFav = dArray[i].designerFav;
    }
  }


  const editData = {DesignerId,designerName,designerSalon,designerFav};  // 보낼 객체

  fetch('http://localhost:3000/api/designerUpdate', {        // 서버로 보내고 결과 출력
  headers: {
    'Content-Type': 'application/json'       
  },
  method: 'POST',
  body: JSON.stringify(editData), 
  }) 
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(result);
    console.log("수정완료",Datas); 
    showDesigners();
    resetInput();
  });
}
editBTN.addEventListener("click", event =>editAll(editID));

// 디자이너 수정 (별 눌러서 선호도 수정) 
function editFav(id) {
  const popup = document.querySelector('#popup');
  popup.classList.add('hide');
  const DesignerId = Number(id.slice(1));
  // console.log(DesignerId);

  let temp,designerName,designerSalon,designerFav;

  for(let i=0;i<dArray.length;i++){     // id에 맞는 디자이너,미용실 이름 가져오기
    if(DesignerId === dArray[i].id){
      temp = dArray[i];
      designerName = temp.designerName;
      designerSalon = temp.designerSalon;
    }
  }

  if(temp.designerFav===1){   // 선호 디자이너인 경우
    designerFav = 0;
  }
  else{
    designerFav = 1;
  }

  const editData = {DesignerId,designerName,designerSalon,designerFav};  // 보낼 객체

  fetch('http://localhost:3000/api/designerUpdate', {        // 서버로 보내고 결과 출력
  headers: {
    'Content-Type': 'application/json'       
  },
  method: 'POST',
  body: JSON.stringify(editData), 
  }) 
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(result);
    console.log("수정완료",Datas); 
    showDesigners();
    resetInput();
  });

}
// editBTN.addEventListener("click", editAll(editID));


// 배열 전달 받아서 box 만드는 함수
function mkBoxes(exDatas) {
  // console.log(exDatas.designerList);

  const Boxes = document.querySelector(".boxes");
  Boxes.innerHTML = "";   //초기화
  dArray = [];


  for(let i=0;i<exDatas.designerList.length;i++){
    let temp = exDatas.designerList[i];
    dArray.push(temp);

    const newBox = document.createElement('div');          //box 만들기
    newBox.classList.add("box");
    Boxes.appendChild(newBox);

    const newStar = document.createElement('p');           // box에 별 넣기
    newStar.innerHTML = '☆';
    newStar.classList.add('star');
    newStar.id = `s${temp.id}`;
    if(temp.designerFav){                 // 선호 디자이너 -> 별 노랑색
      newStar.classList.add('fav');
    }
    newBox.appendChild(newStar);
    newStar.addEventListener("click", event => editFav(`${newStar.id}`));       // fav 수정 이벤트 등록

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
    newEditBtn.id = `e${temp.id}`;
    newEditBtn.classList.add("editBtn");
    newBox.appendChild(newEditBtn);
    newEditBtn.addEventListener("click", event =>  showPopup(0, temp.id)); // 수정 이벤트 등록
    // editID = temp.id;

    const newDeleteBtn = document.createElement('p');      // box에 삭제버튼 넣기 
    newDeleteBtn.innerHTML = '✖';
    newDeleteBtn.id = `d${temp.id}`;
    newDeleteBtn.classList.add('deleteBtn');
    newBox.appendChild(newDeleteBtn);
    newDeleteBtn.addEventListener("click", event => deleteDesigner(`${newDeleteBtn.id}`));       // 삭제 이벤트 등록 (함수 파라미터 가져오기)

    
  }
  // console.log(dArray);
}

// 디자이너 전달받아서 목록 시각화 함수
function showDesigners() {
  fetch('http://localhost:3000/api/designer')  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      console.log("로딩완료",Datas); 

      if(Datas.code===200){
        mkBoxes(Datas);
        resetInput();
      }  
    });
    editID = 0;
}

showDesigners();

