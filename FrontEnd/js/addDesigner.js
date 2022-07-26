
//기록 추가 -> 디자이너 직접 추가 팝업
function showPopup() {
	const popup = document.querySelector('#popup');
  popup.classList.remove('hide');
}
const addDesigner = document.querySelector(".addDesigner");
addDesigner.addEventListener("click", showPopup);



// 나중에 팝업 취소하고 닫기, 저장하고 닫기 두개로 나누기
function closePopup() {
	const popup = document.querySelector('#popup');
  popup.classList.add('hide');
}



//기존 디자이너 클릭
const designerA = document.querySelector(".A");
const designerB = document.querySelector(".B");
const designerC = document.querySelector(".C");
const designerD = document.querySelector(".D");

const designerList = [designerA, designerB, designerC, designerD ];

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
}

function clickB() {
  onclick(designerB); 
}

function clickC() {
  onclick(designerC); 
}

function clickD() {
  if(document.querySelector(".D").innerHTML != ""){
    onclick(designerD); 
  }
  else {
    // console.log("값이 비었습니다");
  }
  

}

designerA.addEventListener("click", clickA);
designerB.addEventListener("click", clickB);
designerC.addEventListener("click", clickC);
designerD.addEventListener("click", clickD);


// 팝업 -> 완료 눌렀을 때 화면에 표시하고 서버로 보내
const completeBTN = document.querySelector(".complete");
function addComplete() {
  const inputDesignerName = document.querySelector("#inputDesignerName").value;
  const inputDesignerPlace = document.querySelector("#inputDesignerPlace").value;

  // console.log(inputDesignerName, inputDesignerPlace);
  completeBTN.classList.add("addDirect")

  const plusName = document.querySelector(".D");
  plusName.innerHTML = inputDesignerName;
}
completeBTN.addEventListener("click", addComplete);



