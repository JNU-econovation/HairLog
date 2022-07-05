

let date, designer, cost;
let cutKind, cutLength;
let permKind, permTime, permHurt;
let dyingColor, dyingDecolor,dyingTime, dyingHurt;

// 디자이너 선택값 가져오기
function whoDesign() {
  const designerA = document.querySelector(".A");
  const designerB = document.querySelector(".B");
  const designerC = document.querySelector(".C");
  const designerList = [designerA, designerB, designerC];

  for (let i=0;i<designerList.length;i++){
    if(designerList[i].classList.contains("selected")){
      designer = designerList[i].innerHTML;
    }  
  }
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
      permHurt = hurtList[i].innerHTML;
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
      dyingHurt = hurtList[i].innerHTML;
    }  
  }
  console.log(dyingColor, dyingDecolor,dyingTime, dyingHurt);
}



let HairRecord;

// nextBTN 클릭 이벤트
const btn = document.querySelector(".front");

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

  for(let i=0;i<hairList.length;i++){
    if(hairList[i].classList.contains("selected")){
      if(i===0){  //컷 선택
        whatCut();
        HairRecord = {
          recordDate: date,
          designerName: designer,
          recordCost: cost,
          cutName: cutKind,
          cutLength: cutLength,
        }
      }
      else if(i===1) { //펌 선택
        whatPerm();
        HairRecord = {
          recordDate: date,
          designerName: designer,
          recordCost: cost,
          permName: permKind,
          permTime: permTime,
          permHurt: permHurt,
        }
      }
      else if(i===2) {  //염색 선택
        whatDying();
        HairRecord = {
          recordDate: date,
          designerName: designer,
          recordCost: cost,
          dyeingColor: dyingColor,
          dyeingDecolorization: dyingDecolor,
          dyeingTime: dyingTime,
          dyeingHurt: dyingHurt,
        }
      }
    }
  }

  console.log(HairRecord);

}

btn.addEventListener("click", clickBTN);