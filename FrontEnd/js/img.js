
// input 클릭을 div(+버튼)로 옮기기
const realUpload = document.querySelector('.readAdd');
const upload = document.querySelector('.imgAdd');

upload.addEventListener('click', () => realUpload.click());


// 이미지 업로드 -> 화면에 미리보기 기능
const imgPlace = document.querySelector(".preview");      //이미지 들어갈 장소

function imgPreview(event) {
  const reader = new FileReader();

  reader.onload = function(event) {
    const myImg = document.createElement("img");
    myImg.setAttribute("src", event.target.result);

    imgPlace.appendChild(myImg);      //이미지 넣고 style 주기
    myImg.classList.add("uploadIMG");     
  };

  reader.readAsDataURL(event.target.files[0]);
}
