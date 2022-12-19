let todo=[];
let listSpan,prio,count = 0, completed = false;
//===================================================================================querySelector===============================================================================
const form = document.querySelector(".form");
const formInput = document.querySelector(".from_input");
const prioritySelect = document.querySelector("#priorityList");
const addBtn = document.querySelector(".js_add_btn");
const error = document.querySelector(".error");
const filterBtn = document.querySelector(".filter");
const todoList=document.querySelector(".js_todo_list");



//========================================================================take data form local storage and add to list===========================================================
todo = JSON.parse(localStorage.getItem('todo'))??[];
todo.map((ele)=>{
    createListElement(ele);
})
//======================================================================================function=================================================================================

//===================================================================================add new list element========================================================================
function addItems(event){
    event.preventDefault();
    console.log(event);
    if(event.target.defaultValue == "Save")
    SaveUpdate(event, formInput.value, prioritySelect.value);

    else
    {
        if(formInput.value == ""){
        error.innerText = "enter Text Details";
        setTimeout(()=> error.innerText="",2000);
        }
        else
        {
            const todoObj = {
                text:formInput.value,
                id:count++,
                priority:prioritySelect.value,
                completed:false
            };
            todo.push(todoObj);
            localStorage.setItem("todo", JSON.stringify(todo));
            createListElement(todoObj);
            form.reset();
        }
    }
}
//==============================================================================create HTML Elements=============================================================================
function createListElement(todoObj){
    const listEle = document.createElement("li");
    listEle.setAttribute("class","li_item");
    listEle.setAttribute("id", todoObj.id);
    //listEle.setAttribute("class",todoObj.priority);
    listEle.innerHTML= `<span>${todoObj.text}</span>
                        <div>
                        <button class="btn done">DONE</button>
                        <button class="btn edit">EDIT</button>
                        <button class="btn delete">DELETE</button>
                        </div>`;
    if (todoObj.priority == "high")
        listEle.classList.add("high");
    else if (todoObj.priority == "medium")
        listEle.classList.add("medium");
    else if (todoObj.priority == "low")
        listEle.classList.add("low");    
    todoList.appendChild(listEle);
}
//===================================================================================to delete list item=========================================================================
function deleteList(event){
    // console.log(event);
    event.path[2].remove();
    todo.forEach((ele,index)=>{
        if(parseInt(event.path[2].id) == ele.id)
        todo.splice(index,1);
    })
    localStorage.setItem("todo", JSON.stringify(todo));
}
//====================================================================================to edit list item=========================================================================
function editList(event){
    // console.log(event);
    listSpan = event.path[2].firstElementChild;
    formInput.value = listSpan.innerHTML;
    addBtn.value = "Save";
}

function  SaveUpdate(event, inputText, priority)
{
    listSpan.innerText = inputText;
    console.log(priority);
    if(priority=="high")
        listSpan.parentElement.parentElement.classList.add("high");
    else if(priority=="medium")
        listSpan.parentElement.parentElement.classList.add("medium");
    else if(priority=="low")
        listSpan.parentElement.parentElement.classList.add("low");
    todo.forEach((ele,index)=>
    {
        if (ele.id == parseInt(event.path[2].id))
        {
            ele.text = inputText;
            ele.priority = priority;
        };
    })
    localStorage.setItem("todo", JSON.stringify(todo));
    form.reset();
    addBtn.value = "ADD";
}

//========================================================================================completed task=========================================================================
function completedList(event){
    console.log(event);
    event.path[2].classList.add("checked");
    todo.forEach((ele)=>{
        if(parseInt(event.path[2].id)==ele.id){
            ele.text=event.path[2].firstChild.innerText;
             ele.completed=true;
          }
       })
       localStorage.setItem("todo", JSON.stringify(todo));
    //    console.log(todo);
}
//=======================================================================================filter part=============================================================================
function filterTask(event)
{
    outputList.innerHTML = "";
   let temp;
   if(event.target.dataset.filter=="high" || event.target.dataset.filter=="medium" || event.target.dataset.filter=="low"){
       temp = toDoArr.filter(elem => elem.priority == event.target.dataset.filter && elem.completed==false)
   }else if(event.target.dataset.filter=="Completed"){
      temp=toDoArr.filter(elem=>elem.completed==true)
   }
   else if(event.target.dataset.filter=="NotCompleted"){
      temp=toDoArr.filter(elem=>elem.completed==false)
   }
   else if(event.target.dataset.filter=="All"){
       temp = toDoArr;
   }
   temp.forEach(ele=>{
       createListElement(ele);
   })
}

//======================================================================================eventlistners============================================================================
addBtn.addEventListener("click", addItems)

todoList.addEventListener("click",(event)=>{
    // console.log(event);
    if(event.target.classList.contains("delete"))
        deleteList(event);
    else if(event.target.classList.contains("edit"))
        editList(event);
    else if(event.target.classList.contains("done"))
        completedList(event);
    
})

filterBtn.addEventListener("click", (event)=>
{
    if (event.target.classList.contains("btn"))
    filterTask(event);
})