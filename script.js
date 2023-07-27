window.onload = function(){
  let button = document.getElementById('add-task');
  button.click();
}

function backgroundColor() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

const addTaskButton = document.querySelector('#add-task');

addTaskButton.addEventListener('click', addTask);

const projectBox = document.getElementById('projectsBox');

const rightBar = document.getElementById('right-bar');

let taskList = document.querySelector('#right-bar>#taskList');

let ul = document.createElement('ul');

let importantTasksBox = document.querySelector('#important-task-box');
let allTasksBox = document.querySelector('#all-task-box');
let todayTasksBox = document.querySelector('#today-task-box');
let nextdaysTasksBox = document.querySelector('#nextdays-task-box');

const todayDate = new Date();
const monthIn2Digit = ("0" + (todayDate.getMonth() + 1)).slice(-2);
const dateIn2Digit = ("0" + todayDate.getDate()).slice(-2);
const dateoftheday = `${todayDate.getFullYear()}-${monthIn2Digit}-${dateIn2Digit}`;

const taskInfoArray = [];

const newBoxDataMap = new Map();

function hideLeftBar() {
  const lines = document.getElementById('left-bar-id');
  if (lines.classList.contains('left-bar')) {
    lines.classList.toggle('hidden-left-bar');
  }
}

let i = 0;
// Declare the 'j' variable outside the addProject function
let j = 0;
let newTaskContent = null;
let activeNewBox = null;
function addTask() {
  getRightContent();
  if(rightBar.contains(document.querySelector('.newTaskContainer'))){
    rightBar.removeChild(document.querySelector('.newTaskContainer'));
  }
}

let requiredText = '';
let contentTitle = null;
let rightBarContent = null;

const allTasks = document.querySelector('#all-tasks');
allTasks.addEventListener('click', ()=>{
  const allTasksText = allTasks.querySelector('h4');
  allTasksRightBar(allTasksText.innerText);
});

const today = document.querySelector('#today');
today.addEventListener('click', ()=>{
  const todayText = today.querySelector('h4');
  todayRightBar(todayText.innerText);
});

const nextdays = document.querySelector('#nextdays');
nextdays.addEventListener('click', ()=>{
  const nextdaysText = nextdays.querySelector('h4');
  nextDaysBar(nextdaysText.innerText);
});

const important = document.querySelector('#important');
important.addEventListener('click', ()=>{
  const importantText = important.querySelector('h4');
  importantBar(importantText.innerText);
});

function allTasksRightBar(text){
  importantTasksBox.style.display = 'none';
  todayTasksBox.style.display = 'none';
  nextdaysTasksBox.style.display = 'none';
  taskList.style.display = 'none';

  requiredText = text;
  const titleOfContent = `<div class='content-title'>${requiredText}</div>`;

  if (contentTitle) {
    rightBar.removeChild(contentTitle);
  }
  contentTitle = document.createElement('div');
  contentTitle.classList.add('contentTitle');
  contentTitle.innerHTML = titleOfContent;

  if(rightBarContent){
    document.querySelector('#right-bar>#add-task').style.display = 'none';
  }

  allTasksBox.style.display = 'block';
  allTasksBox.style.listStyle = 'none';
  populateAllTasksBox();

  rightBar.insertBefore(contentTitle, allTasksBox);
  
}

function todayRightBar(text){
  allTasksBox.style.display = 'none';
  importantTasksBox.style.display = 'none';
  nextdaysTasksBox.style.display = 'none';
  taskList.style.display = 'none';

  requiredText = text;
  const titleOfContent = `<div class='content-title'>${requiredText}</div>`;

  if (contentTitle) {
    rightBar.removeChild(contentTitle);
  }
  contentTitle = document.createElement('div');
  contentTitle.classList.add('contentTitle');
  contentTitle.innerHTML = titleOfContent;

  if(rightBarContent){
    document.querySelector('#right-bar>#add-task').style.display = 'none';
  }

  todayTasksBox.style.display = 'block';
  todayTasksBox.style.listStyle = 'none';
  populateTodayTaskBox();

  rightBar.insertBefore(contentTitle, todayTasksBox);

}

function nextDaysBar(text){
  allTasksBox.style.display = 'none';
  importantTasksBox.style.display = 'none';
  todayTasksBox.style.display = 'none';
  taskList.style.display = 'none';

  requiredText = text;
  const titleOfContent = `<div class='content-title'>${requiredText}</div>`;

  if (contentTitle) {
    rightBar.removeChild(contentTitle);
  }
  contentTitle = document.createElement('div');
  contentTitle.classList.add('contentTitle');
  contentTitle.innerHTML = titleOfContent;

  if(rightBarContent){
    document.querySelector('#right-bar>#add-task').style.display = 'none';
  }

  nextdaysTasksBox.style.display = 'block';
  nextdaysTasksBox.style.listStyle = 'none';
  populateNextdaysTaskBox();

  rightBar.insertBefore(contentTitle, nextdaysTasksBox);
}

function importantBar(text){
  allTasksBox.style.display = 'none';
  todayTasksBox.style.display = 'none';
  nextdaysTasksBox.style.display = 'none';
  taskList.style.display = 'none';

  requiredText = text;
  const titleOfContent = `<div class='content-title'>${requiredText}</div>`;

  if(contentTitle) {
    rightBar.removeChild(contentTitle);
  }
  contentTitle = document.createElement('div');
  contentTitle.classList.add('contentTitle');
  contentTitle.innerHTML = titleOfContent;

  if(rightBarContent){
    document.querySelector('#right-bar>#add-task').style.display = 'none';
  }

  importantTasksBox.style.display = 'block';
  importantTasksBox.style.listStyle = 'none';
  populateImportantTasksBox();

  rightBar.insertBefore(contentTitle, importantTasksBox);

}

function populateAllTasksBox() {
  allTasksBox.innerHTML = '';
  for (let i = 0; i < taskInfoArray.length; i++) {
    const taskInfoClone = taskInfoArray[i].cloneNode(true);
    if (taskInfoClone) {
      allTasksBox.appendChild(taskInfoClone);
    }
  }
}

function populateTodayTaskBox() {
  todayTasksBox.innerHTML = '';
  for (let i = 0; i < taskInfoArray.length; i++) {
    const taskInfoClone = taskInfoArray[i].cloneNode(true);
    let taskDateCheck = taskInfoClone.querySelector('#taskDate').innerText;
    if (taskDateCheck === dateoftheday) {
      todayTasksBox.appendChild(taskInfoClone);
    }
  }
}

function populateNextdaysTaskBox() {
  nextdaysTasksBox.innerHTML = '';
  for (let i = 0; i < taskInfoArray.length; i++) {
    const taskInfoClone = taskInfoArray[i].cloneNode(true);
    let taskDateDayCheck = taskInfoClone.querySelector('#taskDate').innerText.slice(-2);
    if (parseInt(taskDateDayCheck) <= parseInt(dateIn2Digit) + 7 && parseInt(taskDateDayCheck) >= parseInt(dateIn2Digit) + 1) {
      nextdaysTasksBox.appendChild(taskInfoClone);
    }
  }
}

function populateImportantTasksBox() {
  importantTasksBox.innerHTML = '';
  for (let i = 0; i < taskInfoArray.length; i++) {
    const taskInfoClone = taskInfoArray[i].cloneNode(true);
    let importance = taskInfoClone.querySelector('.taskImportantClicked');
    if (importance) {
      importantTasksBox.appendChild(taskInfoClone);
    }
  }
}

function getRightContent() {
  taskList.style.display = 'block';
  allTasksBox.style.display = 'none';
  todayTasksBox.style.display = 'none';
  importantTasksBox.style.display = 'none';
  nextdaysTasksBox.style.display = 'none';

  requiredText = 'Add Task';
  const titleOfContent = `<div class='content-title'>${requiredText}</div>`;
  if (contentTitle) {
    rightBar.removeChild(contentTitle);
  }
  contentTitle = document.createElement('div');
  contentTitle.classList.add('contentTitle');
  contentTitle.innerHTML = titleOfContent;
  if(rightBarContent){
    rightBar.removeChild(document.querySelector('#right-bar>#add-task'));
  }
  rightBarContent = `<div class='add-task' id='add-task'>
    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Edit / Add_Plus_Circle">
      <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
    <button id="add-task-button">New Task</button>
    </div>`
  
  rightBar.appendChild(contentTitle);
  rightBar.insertBefore(contentTitle, taskList);
  rightBar.insertAdjacentHTML('beforeend', rightBarContent);



  let addTaskButton = document.querySelector('button#add-task-button');
  addTaskButton.addEventListener('click', ()=>{
    addTaskButton.disabled = true;
    newTask();
  });

  let k = 0;
  function newTask(){
    newTaskContent = `
    <div class='newTaskContainer'>
    <fieldset>
      <form>
       <label for="title">Title:</label><br>
       <input type="text" id="title" name="title" placeholder="Title"><br>
       <label for="details">Details (Optional):</label><br>
       <textarea type="text" id="details" name="details" placeholder="eg: I am going to complete this no matter what. Damn sure!" wrap="hard" spellcheck="false"></textarea><br>
       <label for="date">Date:</label><br>
       <input type="date" id="date"><br>
       <div class='form-buttons'><input type='button' value="Add" class='addForm'>
       <input type='button' value="Cancel"  class='cancelForm'></div>
      </form>
    </fieldset>
    </div>`;
  
    rightBar.insertAdjacentHTML('beforeend', newTaskContent);

    const cancelFormBtn = document.querySelector('.cancelForm');
    cancelFormBtn.addEventListener('click', ()=>{
      const removeForm = cancelFormBtn.parentNode.parentNode.parentNode.parentNode;
      rightBar.removeChild(removeForm);
      document.querySelector('button#add-task-button').disabled = false;
    });

    const addFormBtn = document.querySelector('.addForm');

    addFormBtn.addEventListener('click', ()=>{
      let taskTitle = document.querySelector('form>#title').value;
      let taskDetails = document.querySelector('form>#details').value;
      let taskDate = document.querySelector('form>#date').value;
      let theTask = `<div class='theTask'>
        <div class='theTaskFirstSection'>
          <div class='taskTitle'>${taskTitle}</div>
          <div class='taskDate' id='taskDate'>${taskDate}</div>
          <div class='taskImportant' id='taskImportant-${k}'>
            <svg fill="#000000" height="15px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          viewBox="0 0 512.062 512.062" xml:space="preserve">
          <g>
            <g>
              <path d="M493.516,170.854l-148.833-19.839L275.114,11.797c-7.86-15.729-30.306-15.729-38.167,0l-69.569,139.217L18.545,170.854
             c-17.92,2.389-24.932,24.589-11.635,36.837l107.39,98.922L85.628,487.324c-2.966,18.692,18.069,31.703,33.469,20.703
             l136.934-97.81l136.934,97.81c15.401,11,36.435-2.011,33.47-20.703l-28.673-180.711l107.39-98.922
             C518.448,195.442,511.437,173.242,493.516,170.854z M360.447,282.976c-5.252,4.838-7.735,11.982-6.616,19.034l22.481,141.688
             L268.431,366.64c-7.418-5.298-17.382-5.298-24.799,0L135.75,443.698l22.481-141.688c1.119-7.052-1.364-14.196-6.616-19.034
             l-82.333-75.841l114.944-15.322c7.011-0.935,13.103-5.283,16.265-11.61l55.541-111.145l55.541,111.145
             c3.162,6.327,9.254,10.676,16.265,11.61l114.944,15.322L360.447,282.976z"/>
            </g>
          </g>
          </svg>
          </div>
          <div class='taskDelete' id='task-delete-${k}'>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="18px" height="18px"><path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"/></svg>
          </div>
        </div>
        <div class='taskDetails'>${taskDetails}</div>
      </div>`;

      let li = document.createElement("li");

      li.innerHTML = theTask;
      li.id =  `${k}`;

      ul.appendChild(li);
      ul.style.listStyle = 'none';
      
      taskList.appendChild(ul);
      taskInfoArray.push(li);

      if(newTaskContent){
        rightBar.removeChild(document.querySelector('.newTaskContainer'));
        document.querySelector('button#add-task-button').disabled = false;
      }

      let taskImportantSvg = document.querySelector(`#taskImportant-${k}>svg`);
      taskImportantSvg.addEventListener('click', ()=>{
        taskImportantSvg.classList.toggle('taskImportantClicked');
      });

      let taskDeleteSvg = document.querySelector(`#task-delete-${k}>svg`);
      taskDeleteSvg.addEventListener('click', ()=>{
        let removeTask = taskDeleteSvg.parentNode.parentNode.parentNode.parentNode;
        // if(taskInfoArray.includes(removeTask)){
        //   taskInfoArray.filter(item => item != removeTask);
        //   console.log(taskInfoArray);
        // }

        let index = taskInfoArray.indexOf(removeTask);

        if(index != -1){
          taskInfoArray.splice(index, 1);
        }
        ul.removeChild(removeTask);
      });
      k++;
    });
  }
}
