
// 처음 => 최신순 정렬
fetch('https://hairlogapi.herokuapp.com/api/main/latest') 
  .then((response) => response.text())
  .then((result) => { console.log(result); });








const filter_date = document.querySelector(".f1");
const filter_cut = document.querySelector(".f2");
const filter_perm = document.querySelector(".f3");
const filter_dying = document.querySelector(".f4");
const filter_designer = document.querySelector(".f5");
const myFilters = [filter_date, filter_cut, filter_perm, filter_dying, filter_designer];

// 정렬 버튼 클릭 -> CSS 변화
function onclick(item) {
  item.classList.remove("NotSelected");
  item.classList.add("selected");

  const temp = myFilters.filter(myFilters => myFilters != item);
  for(let i=0;i<temp.length;i++){
    temp[i].classList.remove("selected");
    temp[i].classList.add("NotSelected");
  }

}

//최신순 
function selectF1() {
  onclick(filter_date); 


}

//컷
function selectF2() {
  onclick(filter_cut);

}

//펌
function selectF3() {
  onclick(filter_perm);

}

//염색
function selectF4() {
  onclick(filter_dying);

}

//디자이너별
function selectF5() {
  onclick(filter_designer);

}

filter_date.addEventListener("click", selectF1);
filter_cut.addEventListener("click", selectF2);
filter_perm.addEventListener("click", selectF3);
filter_dying.addEventListener("click", selectF4);
filter_designer.addEventListener("click", selectF5);
