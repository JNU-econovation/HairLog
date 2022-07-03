
//디자이너 클릭 이벤트(css 변화)

const hairCut = document.querySelector(".cut");
const hairPerm = document.querySelector(".perm");
const hairDying = document.querySelector(".dying");

const hairList = [hairCut, hairPerm, hairDying];


function onClick(item) {
  item.classList.remove("NotSelected");
  item.classList.add("selected");

  const temp = hairList.filter(hairList => hairList != item);
  for(let i=0;i<temp.length;i++){
    temp[i].classList.remove("selected");
    temp[i].classList.add("NotSelected");
  }
}

// 세부 양식 보여주기
const cutForm = document.querySelector(".cutForm");
const permForm = document.querySelector(".permForm");
const dyingForm = document.querySelector(".dyingForm");

function clickCut() {
  onClick(hairCut); 

  //컷 세부 기록
  permForm.classList.add("hidden");
  dyingForm.classList.add("hidden");
  cutForm.classList.remove("hidden");


}


function clickPerm() {
  onClick(hairPerm); 

  //펌 세부 기록
  cutForm.classList.add("hidden");
  dyingForm.classList.add("hidden");
  permForm.classList.remove("hidden");

}

function clickDying() {
  onClick(hairDying); 

  //염색 세부 기록
  permForm.classList.add("hidden");
  cutForm.classList.add("hidden");
  dyingForm.classList.remove("hidden");


}

//시술 종류 클릭 이벤트 주기

hairCut.addEventListener("click", clickCut);
hairPerm.addEventListener("click", clickPerm);
hairDying.addEventListener("click", clickDying);


//펌 상함 정도 클릭 이벤트(css 변화)
const damagePermLV3 = document.querySelector(".permLV3");
const damagePermLV2 = document.querySelector(".permLV2");
const damagePermLV1 = document.querySelector(".permLV1");

const damagePermList = [damagePermLV3, damagePermLV2, damagePermLV1];

function OnClick(item) {
  item.classList.remove("NotSelected");
  item.classList.add("selected");

  const temp = damagePermList.filter(damagePermList => damagePermList != item);
  for(let i=0;i<temp.length;i++){
    temp[i].classList.remove("selected");
    temp[i].classList.add("NotSelected");
  }
}

function clickPermLV3() {
  OnClick(damagePermLV3); 
  //정보 전송 코드 추가
}

function clickPermLV2() {
  OnClick(damagePermLV2); 
  //정보 전송 코드 추가
}

function clickPermLV1() {
  OnClick(damagePermLV1); 
  //정보 전송 코드 추가
}

damagePermLV3.addEventListener("click", clickPermLV3);
damagePermLV2.addEventListener("click", clickPermLV2);
damagePermLV1.addEventListener("click", clickPermLV1);

//염색 상함 정도 클릭 이벤트(css 변화)
const damageDyingLV3 = document.querySelector(".dyingLV3");
const damageDyingLV2 = document.querySelector(".dyingLV2");
const damageDyingLV1 = document.querySelector(".dyingLV1");

const damageDyingList = [damageDyingLV3, damageDyingLV2, damageDyingLV1];

function onCLICK(item) {
  item.classList.remove("NotSelected");
  item.classList.add("selected");

  const temp = damageDyingList.filter(damageDyingList => damageDyingList != item);
  for(let i=0;i<temp.length;i++){
    temp[i].classList.remove("selected");
    temp[i].classList.add("NotSelected");
  }
}

function clickDyingLV3() {
  onCLICK(damageDyingLV3); 
  //정보 전송 코드 추가
}

function clickDyingLV2() {
  onCLICK(damageDyingLV2); 
  //정보 전송 코드 추가
}

function clickDyingLV1() {
  onCLICK(damageDyingLV1); 
  //정보 전송 코드 추가
}

damageDyingLV3.addEventListener("click", clickDyingLV3);
damageDyingLV2.addEventListener("click", clickDyingLV2);
damageDyingLV1.addEventListener("click", clickDyingLV1);