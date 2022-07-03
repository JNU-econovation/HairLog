
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