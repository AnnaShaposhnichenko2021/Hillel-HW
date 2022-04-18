const inputSurname = document.querySelector('#input-surname')
const inputName = document.querySelector('#input-name')
const inputTelephone = document.querySelector('#input-telephone')
const btn = document.getElementById('btn-add')
const surnameList = document.getElementById('surname')
const nameList = document.getElementById('name')
const telephoneList = document.getElementById('telephone')

btn.addEventListener('click', onClick);

function addCont (input, list) {
  const liTD = document.createElement('li');
    liTD.textContent = input.value;
    list.append(liTD);
    input.value = '';
    input.focus();
}
function onClick() {
  if(inputSurname.value.trim() && inputName.value.trim() && inputTelephone.value.trim()) {
    addCont(inputSurname, surnameList);
    addCont(inputName, nameList);
    addCont(inputTelephone, telephoneList)
  } else {
    alert('Fill in all the fields')
  }
}