const todo=[];
let listSpan,count = 0, completed = false;
// querySelector
const form = document.querySelector(".form");
const formInput = document.querySelector(".from_input");
const prioritySelect = document.querySelector("#priorityList");
const addBtn = document.querySelector(".js_add_btn");
const error = document.querySelector(".error");
const filterBtn = document.querySelector(".filter");
const todoList=document.querySelector(".js_todo_list");




todo = JSON.parse(localStorage.getItem('todo'))??[];
todo.map((ele)=>{
    createListElement(ele);
})
// function
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
            createListElement(todoObj);
            form.reset();
        }
    }
}

function createListElement(todoObj){
    
}



// eventlistners
addBtn.addEventListener("click", addItems)


