// 삭제, 수정에 필요한 변수
let RecordId, category;



// 사진 넣기
function seeIMG(exDatas){
  // console.log(exDatas);
  // console.log(exDatas.result.img.rows.img1);

  const newBox = document.querySelector(".imgBox");
  const img = document.createElement('img');
  img.src = exDatas.result.img.rows.img1;
  img.crossOrigin = "anonymous";
  img.classList.add("myimg");
  newBox.appendChild(img);
}

// 별표 넣기(만족도)
function seeStar(exDatas){
  // console.log(exDatas);

  const count = exDatas.result.record.rows[0].recordGrade;

  const Star = document.querySelector(".star");
  Star.innerHTML = '⭐'.repeat(count);
}

// 필수 기록사항 표시
function seeRecord(exDatas){
  // console.log(exDatas);
  // console.log(exDatas.result.record.rows[0].recordDate);

  const box = document.querySelector(".recordBox");

  const rDate = document.createElement('p');         // 날짜
  const date = exDatas.result.record.rows[0].recordDate.replaceAll('-','. ');
  rDate.innerHTML = `날짜 : ${date}`;
  box.appendChild(rDate);

  const rDesigner = document.createElement('p');          // 디자이너
  const designer = exDatas.result.designer[0].designerName;
  rDesigner.innerHTML = `디자이너 : ${designer}`;
  box.appendChild(rDesigner);

  const rSalon = document.createElement('p');         // 미용실
  const salon = exDatas.result.designer[0].designerSalon;
  rSalon.innerHTML = `미용실 : ${salon}`;
  box.appendChild(rSalon);

  const rCost = document.createElement('p');          // 비용
  const cost = exDatas.result.record.rows[0].recordCost;
  rCost.innerHTML =  `비용 : ${cost}원`;
  box.appendChild(rCost);
}

// 염색 기록사항 표시
function seeDyeing(exDatas){
  const box = document.querySelector(".recordBox");

  const rColor = document.createElement('p');         // 색상
  const color = exDatas.result.category.dyeingColor;
  rColor.innerHTML = `시술 색 : ${color}`;
  box.appendChild(rColor);

  const rDecolor = document.createElement('p');         // 탈색 횟수
  const decolor = exDatas.result.category.dyeingDecolorization;
  rDecolor.innerHTML = `탈색 횟수 : ${decolor}번`;
  box.appendChild(rDecolor);

  const rTime = document.createElement('p');         // 소요시간
  const time = exDatas.result.category.dyeingTime;
  rTime.innerHTML = `소요시간 : ${time}시간`;
  box.appendChild(rTime);

  const rHurt = document.createElement('p');         // 상함정도
  const hurt = exDatas.result.category.dyeingHurt;
  const arr = ['상','중','하'];
  rHurt.innerHTML = `상함 정도 : ${arr[hurt-1]}`;
  box.appendChild(rHurt);
}

// 펌 기록사항 표시
function seePerm(exDatas){
  const box = document.querySelector(".recordBox");

  const rKind = document.createElement('p');         // 이름
  const kind = exDatas.result.category.permName;
  rKind.innerHTML = `펌 종류 : ${kind}`;
  box.appendChild(rKind);


  const rTime = document.createElement('p');         // 소요시간
  const time = exDatas.result.category.permTime;
  rTime.innerHTML = `소요시간 : ${time}시간`;
  box.appendChild(rTime);

  const rHurt = document.createElement('p');         // 상함정도
  const hurt = exDatas.result.category.permHurt;
  const arr = ['상','중','하'];
  rHurt.innerHTML = `상함 정도 : ${arr[hurt-1]}`;
  box.appendChild(rHurt);
}

// 컷 기록사항 표시
function seeCut(exDatas){
  const box = document.querySelector(".recordBox");

  const rKind = document.createElement('p');         // 이름
  const kind = exDatas.result.category.cutName;
  rKind.innerHTML = `컷 종류 : ${kind}`;
  box.appendChild(rKind);


  const rLength = document.createElement('p');         // 길이
  const length = exDatas.result.category.cutLength;
  rLength.innerHTML = `컷 길이 : ${length}`;
  box.appendChild(rLength);

  const rHurt = document.createElement('p');         // 상함정도
  const hurt = exDatas.result.category.permHurt;
  const arr = ['상','중','하'];
  rHurt.innerHTML = `상함 정도 : ${arr[hurt-1]}`;
  box.appendChild(rHurt);
}

// 추가기록 표시 
function seeExtraRecord(exDatas) {
  console.log(exDatas);

  const box = document.querySelector(".recordBox");

  const rExtra = document.createElement('p');         // 추가기록
  const extra = exDatas.result.record.rows[0].recordEtc;
  const P = document.createElement('p');
  P.classList.add('extra');
  P.innerHTML = "추가 기록 : ";
  box.appendChild(P);

  rExtra.innerHTML = extra;
  box.appendChild(rExtra);

}

// 코드 종합 함수
function recordAll(exDatas){
  seeIMG(exDatas);
  seeStar(exDatas);
  seeRecord(exDatas);

  const Category = exDatas.result.record.rows[0].recordCategory;
  if(Category === "dyeing"){
    seeDyeing(exDatas);
  }
  else if(Category === "perm"){
    seePerm(exDatas);
  }
  else{
    seeCut(exDatas);
  }

  seeExtraRecord(exDatas);

  RecordId = exDatas.result.category.RecordId;
  category = exDatas.result.record.rows[0].recordCategory;
}

// 화면에 표시
if(window.location.href==='http://localhost:3000/recordResult') { // 기록 후 넘어갈 페이지
  fetch('http://localhost:3000/api/instance')  
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      // console.log(Datas); 

      if(Datas.code===200){
        recordAll(Datas);

      }

    });
}
else{        // 클릭해서 넘어갈 페이지
  const queryID = Number(window.location.search.slice(4));
  // console.log(queryID);

  fetch(`http://localhost:3000/api/result?id=${queryID}`)       // 쿼리스트링으로 요청 보내기
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(result);
    // console.log(Datas); 

    if(Datas.code===200){
      recordAll(Datas);

    }

  });

}


// 기록 삭제
const deleteBtn = document.querySelector(".delete");

function deleteRecord(){
  const deleteForm = {RecordId,category};
  // console.log(deleteForm);

  fetch('http://localhost:3000/api/recordDelete', {
    headers: {
      'Content-Type': 'application/json'     
    },
    method: 'POST',
    body: JSON.stringify(deleteForm),     //객체 -> JSON
  }) 
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      console.log("삭제",Datas);
      // console.log(result);
      location.href = '/';
     });

}
deleteBtn.addEventListener("click",deleteRecord);



// 기록 수정(>> record.js)
const editBtn = document.querySelector(".edit");

function goEditPage() {
  location.href = `http://localhost:3000/record?id=${RecordId}`;   
}
editBtn.addEventListener("click", goEditPage);