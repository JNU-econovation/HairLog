


// 유저별 디자이너 보여주기
const designer_A = document.querySelector(".A");
const designer_B = document.querySelector(".B");
const designer_C = document.querySelector(".C");
const designer_List = [designer_A, designer_B, designer_C];

let Datas;

fetch('https://hairlogapi.herokuapp.com/api/favDesigner') 

// fetch('https://hairlogapi.herokuapp.com/api/main/designer') 

  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    console.log(Datas); 

    for(let i=0;i<Datas.result.length;i++){
      designerList[i].innerHTML = Datas.result[i].designerName;
      console.log(designerList[i].innerHTML);
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

let date, designer, cost;
let cutKind, cutLength;
let permKind, permTime, permHurt;
let dyingColor, dyingDecolor, dyingTime, dyingHurt;
let recordEtc;

// 디자이너 선택값 가져오기
function whoDesign() {

  const popup = document.querySelector('#popup');     // 직접입력 팝업창
  const directName = document.querySelector(".D");    //직접 입력한 디자이너 이름

  if(directName.classList.contains("selected")){      // 선호 디자이너 중 선택
    designer = directName.innerHTML;
  }
  else {                                               // 직접 입력한 디자이너 선택
    for (let i=0;i<designer_List.length;i++){
      if(designer_List[i].classList.contains("selected")){
        designer = designer_List[i].innerHTML;
      }  
    }
  }





  // for (let i=0;i<designerList.length;i++){
  //   if(designerList[i].classList.contains("selected")){
  //     designer = designerList[i].innerHTML;
  //   }  
  // }
}

// 컷 세부 입력값 가져오기 
function whatCut() {
  cutKind = document.querySelector("#cutKind").value;
  cutLength = document.querySelector("#cutLength").value;
}

// 펌 세부 입력값 가져오기
function whatPerm() {
  permKind = document.querySelector("#permKind").value;
  permTime = document.querySelector("#permTime").value;

  const hurt1 = document.querySelector(".cutHurt1");
  const hurt2 = document.querySelector(".cutHurt2");
  const hurt3 = document.querySelector(".cutHurt3");  
  const hurtList = [hurt1, hurt2, hurt3];

  for (let i=0;i<hurtList.length;i++){
    if(hurtList[i].classList.contains("selected")){
      permHurt = hurtList[i].value;
    }  
  }






}

// 염색 세부 입력값 가져오기
function whatDying() {
  dyingColor = document.querySelector("#dyingColor").value;
  dyingDecolor = document.querySelector("#dyingDecolor").value;
  dyingTime = document.querySelector("#dyingTime").value;

  const hurt1 = document.querySelector(".dyingHurt1");
  const hurt2 = document.querySelector(".dyingHurt2");
  const hurt3 = document.querySelector(".dyingHurt3");  
  const hurtList = [hurt1, hurt2, hurt3];

  for (let i=0;i<hurtList.length;i++){
    if(hurtList[i].classList.contains("selected")){
      dyingHurt = hurtList[i].value;
    }  
  }
  console.log(dyingColor, dyingDecolor,dyingTime, dyingHurt);
}


// input 클릭을 div(+버튼)로 옮기기
const realUpload = document.querySelector('.readAdd');
const upload = document.querySelector('.imgAdd');

upload.addEventListener('click', () => realUpload.click());


let HairRecord;  // 임시저장 객체
const formData = new FormData();        //전송할 객체 


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
    

    console.log(fileInput.files[0]);



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

function clickBTN() {
  // 날짜 불러오기
  date = document.querySelector("#date").value;

  // 디자이너 불러오기
  whoDesign();

  // 비용 불러오기
  cost = document.querySelector("#cost").value;

  // 컷,펌,염색 세부 양식 불러오기
  const hairCut = document.querySelector(".cut");
  const hairPerm = document.querySelector(".perm");
  const hairDying = document.querySelector(".dying");
  const hairList = [hairCut,hairPerm,hairDying];
  const satisfact = document.querySelector(".bar").value;

  // 추가 기록 불러오기
  extraInput();
  let url;

  for(let i=0;i<hairList.length;i++){
    if(hairList[i].classList.contains("selected")){
      if(i===0){  //컷 선택


        url='https://hairlogapi.herokuapp.com/api/record/cut';


        whatCut();
        HairRecord = {
          // url:url,
          recordDate: date,
          designerName: designer,
          recordCost: cost,
          cutName: cutKind,
          cutLength: cutLength,
          recordGrade: satisfact,
          recordEtc: recordEtc,
        }
      }
      else if(i===1) { //펌 선택
        url='https://hairlogapi.herokuapp.com/api/record/perm';
        whatPerm();
        HairRecord = {
          // url:url,
          recordDate: date,
          designerName: designer,
          recordCost: cost,
          permName: permKind,
          permTime: permTime,
          permHurt: permHurt,
          recordGrade: satisfact,
          recordEtc: recordEtc,
        }
      }
      else if(i===2) {  //염색 선택
        url='https://hairlogapi.herokuapp.com/api/record/dyeing';
        whatDying();
        HairRecord = {
          // url:url,
          recordDate: date,
          designerName: designer,
          recordCost: cost,
          dyeingColor: dyingColor,
          dyeingDecolorization: dyingDecolor,
          dyeingTime: dyingTime,
          dyeingHurt: dyingHurt,
          recordGrade: satisfact,
          recordEtc: recordEtc,
        }
      }
    }
  }

  console.log(HairRecord);


  // form 서버로 전송


  for (let key in HairRecord) {  // data 객체 안에 있는 모든 요소를 data 객체의 key value 형태로 적재
    formData.append(key, HairRecord[key]);

  }
  formData.append("Image",fileInput.files[0]);


  //formData key 값 확인
  for (let key of formData.keys()) {
    console.log(key);
  }
  //formData value값 확인
  for (let value of formData.values()) {
    console.log(value);
  }

  fetch(url, {

    // headers: {                   
    //   'Content-Type': 'multipart/form-data'           // 사진 보내는
    // },

    method: 'POST',
    body: formData,   
  }) 
    .then((response) => response.text())
    .then((result) => { 
      
      Datas = JSON.parse(result);
      // console.log(result);
      console.log(Datas); 
      
      if(Datas.code===200){
        location.href = '/';
      }


    });


}

submitRecord.addEventListener("click", clickBTN);
