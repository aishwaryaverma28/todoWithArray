let todo=[];
let listSpan,count = 0, completed = false;
// querySelector
const form = document.querySelector(".form");
const formInput = document.querySelector(".from_input");
const prioritySelect = document.querySelector("#priorityList");
const addBtn = document.querySelector(".js_add_btn");
const error = document.querySelector(".error");
const filterBtn = document.querySelector(".filter");
const todoList=document.querySelector(".js_todo_list");



//take data form local storage and add to list
todo = JSON.parse(localStorage.getItem('todo'))??[];
todo.map((ele)=>{
    createListElement(ele);
})
// function
//add new list element
function addItems(e){
    e.preventDefault();
    if(e.target.innerText == "Save")
        SaveUpdate(e, formInput.value, prioritySelect.value);
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
//create HTML Elements
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



// eventlistners
addBtn.addEventListener("click", addItems)

todoList.addEventListener("click",(event)=>{
    // console.log(event);
    if(event.target.classList.contains("delete"))
        deleteList(event);
    
})
