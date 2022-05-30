const inputToDoTitle = document.querySelector('#input-todo-title')
const inputToDoBody = document.querySelector('#input-todo-body')
const btnAdd = document.getElementById('btn-add')
const listTodo = document.getElementById('todo-list')
const deleteBtn = document.getElementById('delete-btn')
const inputEditTitle = document.getElementById('input-edit-title')
const inputEditBody = document.getElementById('input-edit-body')
const editBlock = document.querySelector('.edit-block')
const saveEdit = document.getElementById(`btn-save`)

class Https {
  #endpoint = 'http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/todos/';
  getAll() {
    return fetch(this.#endpoint).then((r) => r.json());
  }
  getById(id) {
    fetch(this.#endpoint + id);    
  }
  update(id,item) {
    return fetch(this.#endpoint + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((r) => r.json());
  }
  delete(id) {
    return fetch(this.#endpoint + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json());
  }
  create(item) {
    return fetch(this.#endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    }).then((r) => r.json());
  }
}


class App {
  constructor(buttonAdd, inputTitle, inputBody, edit, inputEditTitle, inputEditBody, listTodo, buttonSave) {
    this.btnAdd = buttonAdd;
    this.inputToDoTitle = inputTitle;
    this.inputToDoBody = inputBody;
    this.editBlock = edit;
    this.inputEditTitle = inputEditTitle;
    this.inputEditBody = inputEditBody;
    this.saveEdit = buttonSave;
    this.btnAdd.addEventListener('click', this.addTodo);
    this.saveEdit.addEventListener('click', this.onSubmitEditForm)
    this.https = new Https()
    this.https.getAll().then(todos => {
      this.toDoList = new ToDoList(listTodo, this.editTodo)
      this.toDoList.renderTodos(todos)
    })
  }

  addTodo = () => {
    const title = this.inputToDoTitle.value
    const body = this.inputToDoBody.value
    this.https.create({title, body, isComplete: false}).then((item) => {
      this.toDoList.onAddTodoList(item)
      this.clearInputs()
    })
  }
  editTodo = (item) => {
    this.editBlock.classList.toggle('edit-block-active');
    this.inputEditTitle.value = item.title
    this.inputEditBody.value = item.body
  }
  onSubmitEditForm = () => {
    const title = this.inputEditTitle.value
    const body = this.inputEditBody.value
    this.toDoList.updateToDo(title, body)
    this.editBlock.classList.remove('edit-block-active');
  }
  clearInputs = () => {
    this.inputToDoTitle.value = ''
    this.inputToDoBody.value = ''
  }
  
}


class ToDoList {
  todoArray = []
  constructor(listTodo, editTodo) {
    this.list = listTodo;
    this.edit = editTodo;
    this.https = new Https();
  }
  onAddTodoList = (item) => {
    const todoItem = new TodoItem(item)
    this.list.insertAdjacentHTML('afterbegin', todoItem.onAddTodo())
    const editTitle = document.getElementById(`todo-title-${item.id}`)
    editTitle.addEventListener('click', this.onEditTodo)
    const editBody = document.getElementById(`todo-body-${item.id}`)
    editBody.addEventListener('click', this.onEditTodo)
    const doneBtn = document.getElementById(`btn-done-${item.id}`)
    doneBtn.addEventListener('click', this.onDoneTodo)
    const deleteBtn = document.getElementById(`delete-btn-${item.id}`)
    deleteBtn.addEventListener('click', this.onRemoveTodoItem)
    this.todoArray.push(todoItem)
  }
  onEditTodo = (event) => {
    const item = this.todoArray.find((el) => `todo-title-${el.item.id}` === event.target.id || `todo-body-${el.item.id}` === event.target.id)
    this.edit(item.item)
    this.activeItem = item
  }
  updateToDo = (title,body) => {
    this.https.update(this.activeItem.item.id, {...this.activeItem.item, title, body}).then(this.activeItem.editTodo)
  }
  onDoneTodo = (event) => {
    console.log(event.target)
    const item = this.todoArray.find((el) => `btn-done-${el.item.id}` === event.target.id)
    this.https.update(item.item.id, {...item.item, isComplete: !item.item.isComplete}).then(item.completeTodo)
  }
  onRemoveTodoItem = (event) => {
    console.log(event.target)
    const item = this.todoArray.find((el) => `delete-btn-${el.item.id}` === event.target.id)
    this.https.delete(item.item.id).then(item.deleteTodo)
  }

  renderTodos = (todos) => {
    todos.forEach((t) => this.onAddTodoList(t))
  }
}


class TodoItem {
  constructor(item) {
    this.item = item;
  }
  onAddTodo = () => {
    return `<div id="todo-it-${this.item.id}" class="todo-item ${this.item.isComplete ? 'todo-item-done' : ''}">
          <div id="inform-todo">
            <div id="todo-title-${this.item.id}" class="todo-title">${this.item.title}</div>
            <div id="todo-body-${this.item.id}">${this.item.body}</div>
            <div id="todo-time">${this.createDate()}</div>
          </div>
          <div id="btn-item"> 
            <span id="delete-btn-${this.item.id}" class="delete">x</span>
            </br>
            <button id="btn-done-${this.item.id}" class="button-done">Done</button>
          </div>
        </div>
      </div>`
   }

   completeTodo = () => {
    document.getElementById(`todo-it-${this.item.id}`).classList.toggle('todo-item-done');
   }
   createDate = () => {
    const current = new Date(this.item.createDate);
    return current.toLocaleDateString();
  }
    editTodo = (item) => {
      this.item = item
      document.getElementById(`todo-title-${this.item.id}`).innerHTML = this.item.title
      document.getElementById(`todo-body-${this.item.id}`).innerHTML = this.item.body
    }
   deleteTodo = () => {
    document.getElementById(`todo-it-${this.item.id}`).remove();
   }
  }
  
  new App(btnAdd, inputToDoTitle, inputToDoBody, editBlock, inputEditTitle, inputEditBody, listTodo, saveEdit)