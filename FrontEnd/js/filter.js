
// 박스 선택하면 해당 아이디 출력하기
const BOX = document.querySelector(".box")
function clickBox(ID) {
  // console.log(ID);
  location.href = `https://hairlogapi.herokuapp.com/recordResult?id=${ID}`;          // 쿼리스트링!!!!
}




// ID에 맞는 사진 불러오는 함수
function idToImg(arr, Id) {
  for(let i=0;i<arr.length;i++){
    if(arr[i].RecordId === Id){
      return arr[i].img1;
    }
  }
}

//객체 전달받아서 화면에 띄우는 함수(최신순,컷,펌,염색)
function renderBox(exDatas) {
  const boxes = document.querySelector(".boxes");


  for(let i=0;i<exDatas.result.record.count;i++){      //for문 돌면서 box 만들고 안에 내용 채우기
    const temp = exDatas.result.record.rows[i];        //temp = 각 기록 하나를 가리킴

    const newBox = document.createElement('div');   // 사각형 만들고 html에 넣기
    newBox.classList.add("box");
    const boxID = exDatas.result.record.rows[i].id;        // box에 id값 줘서 나중에 구분

    newBox.id = boxID;    
    boxes.appendChild(newBox);


    // 배경이미지 넣기
    let myURL;
    if(exDatas.result.img.count===1){     // 이미지가 기록 개수가 하나일 때
      myURL = exDatas.result.img.rows.img1;
    }
    else {
      myURL = idToImg(exDatas.result.img.rows , boxID); 
    }

    const img = document.createElement('img');
    img.src = myURL;
    img.crossOrigin = "anonymous";
    img.classList.add("boxIMG");
    newBox.appendChild(img);

    let rcDate = temp.recordDate.replaceAll('-','.').slice(2);
    const newDate = document.createElement('p');
    newDate.innerText = rcDate;
    newBox.appendChild(newDate);
    
    newBox.addEventListener("click", event =>clickBox(boxID));
  }
}


// 디자이너 화면에 띄우는 함수
function renderDesignerBox(exDatas) {
  const boxes = document.querySelector(".boxes");
  // console.log(exDatas.result.designerList.count);
  // console.log(exDatas.result.img[0]);

  for(let i=0;i<exDatas.result.designerList.count;i++) {                    // 디자이너 이름 p에 저장
    let name = exDatas.result.designerList.rows[i].designerName;

    const newBigBox = document.createElement('div');    
    newBigBox.classList.add("bigBox");      

    const newDesigner = document.createElement('p');
    newDesigner.innerHTML = name;
    newBigBox.appendChild(newDesigner);

    boxes.appendChild(newBigBox);

    
    // 여기
    const designerTemp = exDatas.result.recordByDesigner[i];    

    for(let j=0;j<designerTemp.count;j++){
      const temp = designerTemp.rows[j];
      // console.log(temp);

      const newBox = document.createElement('div');   // 사각형 만들고 html에 넣기
      newBox.classList.add("box");
      const boxID = temp.id;        // box에 id값 줘서 나중에 구분

      newBox.id = boxID;    

      boxes.appendChild(newBox);
      

      let myURL;
      if(exDatas.result.recordByDesigner[i].count===1){     // 이미지가 기록 개수가 하나일 때
        myURL = exDatas.result.img[i].rows.img1;
      }
      else {
        myURL = idToImg(exDatas.result.img[i].rows , boxID);
      }

      const img = document.createElement('img');
      img.src = myURL;
      img.crossOrigin = "anonymous";
      img.classList.add("boxIMG");
      newBox.appendChild(img);


      let rcDate = temp.recordDate.replaceAll('-','.').slice(2);
      const newDate = document.createElement('p');
      newDate.innerText = rcDate;
      newBox.appendChild(newDate);
    }

  }

}



const latestURL = 'https://hairlogapi.herokuapp.com/api/main/latest';
const cutURL = 'https://hairlogapi.herokuapp.com/api/main/cut';
const permURL = 'https://hairlogapi.herokuapp.com/api/main/perm';
const dyeingURL = 'https://hairlogapi.herokuapp.com/api/main/dyeing';
const designerURL = 'https://hairlogapi.herokuapp.com/api/main/designer';

// 화면에 띄우는 함수
function goFetch(url){
  // 화면 초기화
  const reset = document.querySelector(".boxes");
  reset.innerHTML = '';


  let Datas;

  fetch(url) 
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(result);
    // console.log(Datas); 

    if(Datas.code === 200){
      renderBox(Datas);
    }
    
  });
} 

goFetch(latestURL);



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
  
  goFetch(latestURL);

}

//컷
function selectF2() {
  onclick(filter_cut);

  let Datas;

  goFetch(cutURL);

}

//펌
function selectF3() {
  onclick(filter_perm);

  goFetch(permURL);
}

//염색
function selectF4() {
  onclick(filter_dying);

  goFetch(dyeingURL);
}



//디자이너별
function selectF5() {
  onclick(filter_designer);


  // 화면 초기화
  const Reset = document.querySelector(".boxes");
  Reset.innerHTML = '';


  let Datas;

  fetch(designerURL) 
  .then((response) => response.text())
  .then((result) => { 
    Datas = JSON.parse(result);
    // console.log(Datas); 
    // console.log(Datas.result.designerList.count);

    if(Datas.code === 200){
      renderDesignerBox(Datas);
    }
    
  });

}


filter_date.addEventListener("click", selectF1);
filter_cut.addEventListener("click", selectF2);
filter_perm.addEventListener("click", selectF3);
filter_dying.addEventListener("click", selectF4);
filter_designer.addEventListener("click", selectF5);








