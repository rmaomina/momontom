const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList"),
  doneList = document.querySelector(".js-doneList");

const TODOS_LS = "todos";
let todos = []; // temp store

function deleteTodo(event) {
  event.preventDefault();
  const btn = event.target;
  const li = btn.parentNode;
  const parent = li.parentNode;
  parent.removeChild(li);
  const cleanTodos = todos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todos = cleanTodos;
  saveTodos();
}

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(obj) {
  const li = document.createElement("li");
  const check = document.createElement("input");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const todoId = todos.length + 1;

  const todoObj = {
    checked: obj.checked ? obj.checked : "false",
    id: todoId,
    todo: obj.todo
  };

  todos.push(todoObj);

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTodo);
  check.setAttribute("type", "checkbox");
  check.addEventListener("change", checkedToggle);
  span.innerText = obj.todo;
  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = todoId;

  if (todoObj.checked !== "true") {
    todoList.appendChild(li);
  } else {
    span.classList.add("checked");
    check.checked = "checked";
    doneList.appendChild(li);
  }
  saveTodos();
}

function addTodo(event) {
  event.preventDefault();
  const currValue = {
    todo: todoInput.value
  };
  todoInput.value = "";
  paintTodo(currValue);
  saveTodos();
}

function checkedToggle(event) {
  event.preventDefault();
  const tg = event.target.parentNode;
  const clone = tg.cloneNode(true);
  const delBtn = clone.querySelector("button");
  const tgIndex = todos.findIndex((todo) => todo.id === parseInt(tg.id));

  clone.addEventListener("change", checkedToggle);
  delBtn.addEventListener("click", deleteTodo);
  if (event.target.checked === true) {
    todoList.removeChild(tg);
    doneList.appendChild(clone);
    todos[tgIndex].checked = "true";
  } else {
    doneList.removeChild(tg);
    todoList.appendChild(clone);
    todos[tgIndex].checked = "false";
  }
  saveTodos(todoList);
}

function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    // There is TODOs
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function (todo) {
      paintTodo(todo);
    });
  }
}

loadTodos();
todoForm.addEventListener("submit", addTodo);
