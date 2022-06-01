
let tasks=[]
let stmpId=1
let inputNewTask=document.querySelector('.input__new-task')
let listTask=document.querySelector('.today-task__list')
let numberTask=document.querySelector('.total-pending__num')
let btnClear=document.querySelector('.btn--clear')
let recycleBin;

function clickOnRecycleBin(recycleBin){
    for (let i = 0; i < recycleBin.length; i++) {
        recycleBin[i].addEventListener('click',function(){
            let id=recycleBin[i].getAttribute("id")
            objIndex = tasks.findIndex((obj => obj.id == id));
            tasks.splice(objIndex, 1);
            renderTasks()
        })
        
    }
}
function renderTasks(){
    listTask.innerHTML=``
    tasks.forEach((i) => {
        listTask.innerHTML+=`
        <div class="align-center today-task__wrap">
                        <div class="today-task__item"><span class="today-task__item-name">`+i.value+`</span>
                        </div>
                        <div class="recycle-bin__wrap">
                        </div>
                        <i class="recycle-bin__icon fa-solid fa-trash-can hover " id="`+i.id+`"></i>
                    </div>
        `
    })
    numberTask.innerHTML=tasks.length
    localStorage.setItem("list-Task",JSON.stringify(tasks))
    recycleBin=document.querySelectorAll('.recycle-bin__icon')
    clickOnRecycleBin(recycleBin)
}
function confirmValue(){
    let data={
        id:stmpId,
        value:inputNewTask.value
    }
    tasks.push(data)
    stmpId++;
    renderTasks()
    inputNewTask.value="";
}

function run() {
    if (localStorage.getItem("list-Task")) {
        arrStmp=(JSON.parse(localStorage.getItem("list-Task")))
        arrStmp.forEach((i) => {
          tasks.push(i)
        })
       
        if(tasks.length>0){
            stmpId=tasks[tasks.length-1].id+1
            renderTasks()
        }
    }
    document.querySelector('.btn--add').addEventListener('click', function () {
        if(inputNewTask.value.length>0){
            confirmValue()
        }
    })
    inputNewTask.addEventListener('keypress',function(e){
        if(e.key ==='Enter'){
            confirmValue()
        }
    })
    btnClear.addEventListener('click',function(){
        tasks=[]
        renderTasks()
    })
}
run();