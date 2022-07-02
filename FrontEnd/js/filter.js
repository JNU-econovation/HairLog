
const filter_date = document.querySelector(".f1");
const filter_cut = document.querySelector(".f2");
const filter_perm = document.querySelector(".f3");
const filter_dying = document.querySelector(".f4");
const filter_designer = document.querySelector(".f5");
const myFilters = [filter_date, filter_cut, filter_perm, filter_dying, filter_designer];

//클릭 이벤트
function onclick(item) {
  item.classList.remove("NotSelected");
  item.classList.add("selected");

  const temp = myFilters.filter(myFilters => myFilters != item);
  for(let i=0;i<temp.length;i++){
    temp[i].classList.remove("selected");
    temp[i].classList.add("NotSelected");
  }

}

function selectF1() {
  onclick(filter_date); 
  //날짜순 정렬 코드 추가

}

function selectF2() {
  onclick(filter_cut);
  //컷 정렬 코드 추가

}

function selectF3() {
  onclick(filter_perm);
  //펌 정렬 코드 추가

}

function selectF4() {
  onclick(filter_dying);
  //염색 정렬 코드 추가

}
function selectF5() {
  onclick(filter_designer);
  //디자이너별 정렬 코드 추가

}

filter_date.addEventListener("click", selectF1);
filter_cut.addEventListener("click", selectF2);
filter_perm.addEventListener("click", selectF3);
filter_dying.addEventListener("click", selectF4);
filter_designer.addEventListener("click", selectF5);
