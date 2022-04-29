const inputToDo = document.querySelector('#input-todo')
const btn = document.getElementById('btn-add')
const list = document.getElementById('todo-list')
const error = document.querySelector('.error-val')
const container = document.querySelector('.check-list')

inputToDo.addEventListener('keyup', validateToDo);
inputToDo.addEventListener('keydown', deleteValue);
btn.addEventListener('click', onAddList);
container.addEventListener('click', onListClick);
btn.disabled = true;

function onAddList() {
  console.log(inputToDo.value, container, )
  const el = `<div name="name-el" class="item" id="id-el">
  ${inputToDo.value}
  <span id="delete-btn" class="delete">x</span></div>`;
  container.innerHTML += el;
  inputToDo.value = '';
  btn.disabled = true;
}

function onListClick(event) {
  if(event.target.id === 'id-el') {
    event.target.classList.toggle('item-click')
    return
  }
  if(event.target.id === 'delete-btn'){
    deleteToDo(event.target)
  }
}

function deleteToDo(el) {
  el.closest('.item').remove();
}

function validateToDo (event) {
  if(!event.target.value.trim()){
    error.innerText = '';
    btn.disabled = true;
    return
  }
  if(event.target.value.trim().length < 3) {
    error.innerText = 'Error. Text should be > 3';
    return
  }
  if(event.keyCode === 13) {
    onAddList()
  }
  error.innerText = ''
  btn.disabled = false;
}

function deleteValue(event) {
  console.log(event)
  if(event.shiftKey && event.keyCode === 8) {
    inputToDo.value = '';
  }
}

// при нажатии комбинации ctrl а потом backspace должны полность стереть весь текст в инпуте
// добавить очищение строки