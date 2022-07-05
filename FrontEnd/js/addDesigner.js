
//기록 추가 -> 디자이너 직접 추가 팝업
function showPopup() {
	const popup = document.querySelector('#popup');
  popup.classList.remove('hide');
}

// 나중에 팝업 취소하고 닫기, 저장하고 닫기 두개로 나누기
function closePopup() {
	const popup = document.querySelector('#popup');
  popup.classList.add('hide');
}

//기존 디자이너 클릭
const designerA = document.querySelector(".A");
const designerB = document.querySelector(".B");
const designerC = document.querySelector(".C");

const designerList = [designerA, designerB, designerC];

//클릭 이벤트 (css 수정)
function onclick(item) {
  item.classList.remove("NotSelected");
  item.classList.add("selected");

  const temp = designerList.filter(designerList => designerList != item);
  for(let i=0;i<temp.length;i++){
    temp[i].classList.remove("selected");
    temp[i].classList.add("NotSelected");
  }
}

function clickA() {
  onclick(designerA); 
  //디자이너A 선택

}

function clickB() {
  onclick(designerB); 
  //디자이너B 선택

}

function clickC() {
  onclick(designerC); 
  //디자이너C 선택

}

designerA.addEventListener("click", clickA);
designerB.addEventListener("click", clickB);
designerC.addEventListener("click", clickC);