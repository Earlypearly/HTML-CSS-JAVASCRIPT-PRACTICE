const listArray = JSON.parse(localStorage.getItem('todoList')) || [];
const dateListArray = JSON.parse(localStorage.getItem('dateTimeList')) || [];
const todoListTextElement = document.querySelector('.js-to-do-input');
const todoContainerElement = document.querySelector('.js-todo-text');
const todoDateTimeElement = document.querySelector('.js-datetime-input');


renderToDoList();

function renderToDoList() {
  let todoListHTML  = ''; 

  for (let i = 0; i < listArray.length; i++) {
    let toDo = listArray[i];
    let dateTime = dateListArray[i];
    let todoHtml = `
    <div class=task-container>
      <p class="task-text-style">${toDo}</p> 
      <p class="task-datetime-text-style">${dateTime}</p>
      <button class="task-remove-btn-style"onclick="removeTask(${i})";>Remove</button>
    </div>`;
    todoListHTML += todoHtml;
  }
  localStorage.setItem('todoList', JSON.stringify(listArray));
  localStorage.setItem('dateTimeList', JSON.stringify(dateListArray));
  todoContainerElement.innerHTML = todoListHTML; 
  todoDateTimeElement.value = '';
}

function addtoDo() {
  const taskText = todoListTextElement.value;
  const dateTimeText = todoDateTimeElement.value;
  if (taskText && dateTimeText) {
    listArray.push(taskText);
    console.log(listArray);
    dateListArray.push(dateTimeText);
    todoListTextElement.value = '';
    todoListTextElement.value ='';
    renderToDoList();
  }
  else {
    alert('Please enter task title and datetime')
  }
}

function removeTask(index) {
  listArray.splice(index,1);
  dateListArray.splice(index,1);
  renderToDoList();
}