


// 유저별 디자이너 보여주기
const designer_A = document.querySelector(".A");
const designer_B = document.querySelector(".B");
const designer_C = document.querySelector(".C");
const designer_List = [designer_A, designer_B, designer_C];

let Datas;
fetch('http://localhost:3000/api/favDesigner') 
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(Datas); 

    for(let i=0;i<Datas.result.length;i++){
      designerList[i].innerHTML = Datas.result[i].designerName;
      // console.log(designerList[i].innerHTML);
    }    
  });




const record1 = document.querySelector(".record1");
const record2 = document.querySelector(".record2");
const record3 = document.querySelector(".record3");

// 버튼 누를 때 페이지 변화

// record1 -> record2 
const goToRecord2 = document.querySelector(".goToRecord2");
function showRecord2() {  
  record1.classList.add("hidden");
  record3.classList.add("hidden");
  record2.classList.remove("hidden");
}
goToRecord2.addEventListener("click",showRecord2);

// record2 -> record1
const backToRecord1 = document.querySelector(".backRecord1");
function BackRecord1() {
  record2.classList.add("hidden");
  record3.classList.add("hidden");
  record1.classList.remove("hidden");
  
}
backToRecord1.addEventListener("click",BackRecord1);

// record2 -> record3 
const goToRecord3 = document.querySelector(".goRecord3");
function showRecord3() {
  record1.classList.add("hidden");
  record2.classList.add("hidden");
  record3.classList.remove("hidden");
}
goToRecord3.addEventListener("click",showRecord3);

// record3 -> record2
const backToRecord3 = document.querySelector(".backRecord2");
backToRecord3.addEventListener("click",showRecord2);


// 입력값 객체로 저장해서 보내자

let recordDate, designerName, recordCost;
let cutName, cutLength;
let permName, permTime, permHurt;
let dyeingColor, dyeingDecolorization, dyeingTime, dyeingHurt;
let recordEtc;

// 디자이너 선택값 가져오기
function whoDesign() {

  const popup = document.querySelector('#popup');     // 직접입력 팝업창
  const directName = document.querySelector(".D");    //직접 입력한 디자이너 이름

  if(directName.classList.contains("selected")){      // 선호 디자이너 중 선택
    designerName = directName.innerHTML;
  }
  else {                                               // 직접 입력한 디자이너 선택
    for (let i=0;i<designer_List.length;i++){
      if(designer_List[i].classList.contains("selected")){
        designerName = designer_List[i].innerHTML;
      }  
    }
  }


}

// 컷 세부 입력값 가져오기 
function whatCut() {
  cutName = document.querySelector("#cutKind").value;
  cutLength = document.querySelector("#cutLength").value;
}

// 펌 세부 입력값 가져오기
const phurt1 = document.querySelector(".cutHurt1");
const phurt2 = document.querySelector(".cutHurt2");
const phurt3 = document.querySelector(".cutHurt3");  
const phurtList = [phurt1, phurt2, phurt3];

function whatPerm() {
  permName = document.querySelector("#permKind").value;
  permTime = document.querySelector("#permTime").value;


  for (let i=0;i<phurtList.length;i++){
    if(phurtList[i].classList.contains("selected")){
      permHurt = phurtList[i].value;
    }  
  }

}

// 염색 세부 입력값 가져오기
const hurt1 = document.querySelector(".dyingHurt1");
const hurt2 = document.querySelector(".dyingHurt2");
const hurt3 = document.querySelector(".dyingHurt3");  
const hurtList = [hurt1, hurt2, hurt3];

function whatDying() {
  dyeingColor = document.querySelector("#dyingColor").value;
  dyeingDecolorization = document.querySelector("#dyingDecolor").value;
  dyeingTime = document.querySelector("#dyingTime").value;


  for (let i=0;i<hurtList.length;i++){
    if(hurtList[i].classList.contains("selected")){
      dyeingHurt = hurtList[i].value;
    }  
  }
  // console.log(dyeingColor, dyeingDecolorization,dyeingTime, dyeingHurt);
}


// input 클릭을 div(+버튼)로 옮기기
const realUpload = document.querySelector('.readAdd');
const upload = document.querySelector('.imgAdd');

upload.addEventListener('click', () => realUpload.click());


let HairRecord;  // 임시저장 객체
const formData = new FormData();        //전송할 객체 (추가)
const editFormData = new FormData();    // 수정

// 이미지 업로드 -> 화면에 미리보기 기능
const imgPlace = document.querySelector(".preview");      //이미지 들어갈 장소
const fileInput = document.querySelector("#image");   // file input


//이미지 미리보기 기능
function imgPreview(event) {
  const reader = new FileReader();

  reader.onload = function(event) {
    const myImg = document.createElement("img");
    myImg.setAttribute("src", event.target.result);

    imgPlace.appendChild(myImg);      //이미지 넣고 style 주기
    myImg.classList.add("uploadIMG");  
    

    // console.log(fileInput.files[0]);



  };

  reader.readAsDataURL(event.target.files[0]);
}





function extraInput() {
  const txtBox = document.getElementById("inputbox");
  let lines = txtBox.value.split("\n");
 
  // generate HTML version of text
  let resultString  = "<p>";
  for (let i = 0; i < lines.length; i++) {
    resultString += lines[i] + "<br />";
  }
  resultString += "</p>";
 
  recordEtc = resultString;
}


// record1 기록 저장 후 완료 버튼 눌렀을 때 출력

const submitRecord = document.querySelector("#submitRecord");

let queryID;
let url, editURL;

// 객체 만드는 함수(추가, 수정)
function mkObject() {
  // 날짜 불러오기
  recordDate = document.querySelector("#date").value;

  // 디자이너 불러오기
  whoDesign();

  // 비용 불러오기
  recordCost = document.querySelector("#cost").value;

  // 컷,펌,염색 세부 양식 불러오기
  const hairCut = document.querySelector(".cut");
  const hairPerm = document.querySelector(".perm");
  const hairDying = document.querySelector(".dying");
  const hairList = [hairCut,hairPerm,hairDying];
  const recordGrade = document.querySelector(".bar").value;

  // 추가 기록 불러오기
  extraInput();

  for(let i=0;i<hairList.length;i++){
    if(hairList[i].classList.contains("selected")){
      if(i===0){  //컷 선택

        url='http://localhost:3000/api/record/cut';
        editURL = 'http://localhost:3000/api/recordUpdate/cut';

        whatCut();
        HairRecord = {recordDate,designerName,recordCost,cutName,cutLength,recordGrade,recordEtc};

      }
      else if(i===1) { //펌 선택
        url='http://localhost:3000/api/record/perm';
        editURL = 'http://localhost:3000/api/recordUpdate/perm';

        whatPerm();
        HairRecord = {recordDate,designerName,recordCost,permName,permTime,permHurt,recordGrade,recordEtc};

      }
      else if(i===2) {  //염색 선택
        url='http://localhost:3000/api/record/dyeing';
        editURL = 'http://localhost:3000/api/recordUpdate/dyeing';

        whatDying();
        HairRecord = { recordDate,designerName,recordCost,dyeingColor,dyeingDecolorization,dyeingTime,dyeingHurt,recordGrade,recordEtc};

      }
    }
  }

  return HairRecord;
}

function sendEditRecord() {     // 수정
  let HairRecord = mkObject();

  // URL = editURL;
  let RecordId = Number(window.location.search.slice(4));
  // console.log(RecordId);
  HairRecord['RecordId'] = RecordId;
  // console.log("수정",HairRecord);

  for (let key in HairRecord) {  // data 객체 안에 있는 모든 요소를 data 객체의 key value 형태로 적재
    editFormData.append(key, HairRecord[key]);
  
  }
  editFormData.append("Image",fileInput.files[0]);
  // console.log("수정",editFormData);


  //formData key 값 확인
  for (let key of formData.keys()) {
    // console.log("키",key);
  }
  //formData value값 확인
  for (let value of formData.values()) {
    // console.log("값",value);
  }



  fetch(editURL, {  
    method: 'POST',
    body: editFormData,   
  }) 
    .then((response) => response.text())
    .then((result) => { 
      
      Datas = JSON.parse(result);
      // console.log(result);
      // console.log(Datas); 
      
      if(Datas.code===200){
        location.href = 'http://localhost:3000/recordResult';
      }
  
  
    });
}



function sendRecord(addORedit) {        // 0이면 추가, 1이면 수정       // 추가
  let HairRecord = mkObject();


  // console.log("객체",HairRecord);

  // form 서버로 전송
  for (let key in HairRecord) {  // data 객체 안에 있는 모든 요소를 data 객체의 key value 형태로 적재
    formData.append(key, HairRecord[key]);

  }
  formData.append("Image",fileInput.files[0]);


  let URL, HREF;
  fetch(url, {
    method: 'POST',
    body: formData,   
  }) 
    .then((response) => response.text())
    .then((result) => { 
      
      Datas = JSON.parse(result);
      // console.log(result);
      // console.log(Datas); 
      
      if(Datas.code===200){
        location.href = 'http://localhost:3000/recordResult';
      }


    });
}



if(window.location.href==='http://localhost:3000/record'){       // 기록 추가
  // console.log("추가");
  submitRecord.addEventListener("click", sendRecord);
}
else{                                                            // 기록 수정
  // console.log("수정");
  queryID = Number(window.location.search.slice(4));
  // console.log(queryID);

  // 수정 전 기록 채우기
  fill(queryID);

  // 수정 값 객체 만들기
  submitRecord.addEventListener("click", sendEditRecord );
}



// 수정 전 기록 채우는 함수
function fill(ID){
  fetch(`http://localhost:3000/api/result?id=${queryID}`)       // 쿼리스트링으로 요청 보내기
    .then((response) => response.text())
    .then((result) => { 
      Datas = JSON.parse(result);
      // console.log(result);
      // console.log("결과",Datas);
      
      fillRecord(Datas);
    });

}

function fillRecord(exDatas){
  // console.log("결과",exDatas);
  
  // record1
  const rDate = document.querySelector("#date");    // 날짜 채우기
  rDate.value = exDatas.result.record.rows[0].recordDate;

  for(let i=0;i<designer_List.length;i++){              // 디자이너 선택하기
    designer_List[i].classList.remove("selected");
    if(designer_List[i].innerHTML===exDatas.result.designer[0].designerName){
      designer_List[i].classList.add("selected");
      // console.log(designer_List[i].innerHTML);
    }
  }

  const rCost = document.querySelector("#cost");          // 비용 채우기
  rCost.value = exDatas.result.record.rows[0].recordCost;

  const hairCut = document.querySelector(".cut");         // 시술 종류 선택하기
  const hairPerm = document.querySelector(".perm");
  const hairDying = document.querySelector(".dying");
  const hairList = [hairCut, hairPerm, hairDying];

  const temp = ["cut","perm","dyeing"];
  const index = temp.indexOf(exDatas.result.record.rows[0].recordCategory);

  hairList[index].classList.add("selected");

  if(index===0){       // 컷일때 
    const cutKind = document.querySelector("#cutKind");   // 컷 이름
    cutKind.value = exDatas.result.category.cutName;

    const cutLength = document.querySelector("#cutLength");   // 컷 길이
    cutLength.value = exDatas.result.category.cutLength;

  }
  else if(index===1)  {    // 펌일때
    const permKind = document.querySelector("#permKind");   // 펌 이름
    permKind.value = exDatas.result.category.permName;

    const permTime = document.querySelector("#permTime");   // 시간
    permTime.value = exDatas.result.category.permTime;

    const permHurt = exDatas.result.category.permHurt;  // 상함 정도
    phurtList[permHurt-1].classList.add("selected");

  }
  else if(index===2){     // 염색일때
    const dyingColor = document.querySelector('#dyingColor');   //색
    dyingColor.value = exDatas.result.category.dyeingColor;

    const dyingDecolor = document.querySelector("#dyingDecolor");  // 탈색
    dyingDecolor.value = exDatas.result.category.dyeingDecolorization;

    const dyingTime = document.querySelector("#dyingTime");    // 시간
    dyingTime.value = exDatas.result.category.dyeingTime;

    const dyeingHurt = exDatas.result.category.dyeingHurt;  // 상함 정도
    hurtList[dyeingHurt-1].classList.add("selected");
  }

  // record2
    const rcIMG = document.querySelector(".preview");         // 사진 보여주기
    const img = document.createElement('img');
    img.src = exDatas.result.img.rows.img1;
    img.crossOrigin = "anonymous";
    img.classList.add("rcIMG");
    rcIMG.appendChild(img);

  const plusBTN = document.querySelector(".imgAdd");      // 추가 버튼 앞으로 가져오기
  plusBTN.classList.add("bringFront");

  const staisfy = document.querySelector(".bar");
  staisfy.value = exDatas.result.record.rows[0].recordGrade;

  const extraRecord = document.querySelector("#inputbox");
  let text =  exDatas.result.record.rows[0].recordEtc;
  text = text.replace("<p>", "");
  text = text.replace("</p>", "");
  text = text.replaceAll("<br />", "\n");

  extraRecord.value = text;

}