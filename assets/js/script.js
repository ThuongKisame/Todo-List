
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
            renderTasks(3)
        })
        
    }
}
function renderTasks(type){
    if(type===1){
        listTask.innerHTML=``
        for (let i = 0; i < tasks.length; i++) {
            
            listTask.innerHTML+=`
            <div class="align-center today-task__wrap">
                            <div class="today-task__item today-task__item--animation" style="animation-delay:0.`+i+1+`s"><span class="today-task__item-name">`+tasks[i].value+`</span>
                            </div>
                            <div class="recycle-bin__wrap">
                            </div>
                            <i class="recycle-bin__icon fa-solid fa-trash-can hover " id="`+tasks[i].id+`"></i>
                        </div>
            `
            
        }
    }
    if(type===2){
        listTask.innerHTML=``
        for (let i = 0; i < tasks.length; i++) {
            if(i==tasks.length-1){
                listTask.innerHTML+=`
                <div class="align-center today-task__wrap">
                                <div class="today-task__item today-task__item--animation" style="animation-delay:0.`+i+1+`s"><span class="today-task__item-name">`+tasks[i].value+`</span>
                                </div>
                                <div class="recycle-bin__wrap">
                                </div>
                                <i class="recycle-bin__icon fa-solid fa-trash-can hover " id="`+tasks[i].id+`"></i>
                            </div>
                `
            }else{

                listTask.innerHTML+=`
                <div class="align-center today-task__wrap">
                                <div class="today-task__item " style="transform : translateY(0px);animation-delay:0.`+i+1+`s"><span class="today-task__item-name">`+tasks[i].value+`</span>
                                </div>
                                <div class="recycle-bin__wrap">
                                </div>
                                <i class="recycle-bin__icon fa-solid fa-trash-can hover " id="`+tasks[i].id+`"></i>
                            </div>
                `
                
            }
        }
    }
    if(type==3){
        listTask.innerHTML=``
        for (let i = 0; i < tasks.length; i++) {
            
            listTask.innerHTML+=`
            <div class="align-center today-task__wrap">
                            <div class="today-task__item" style="transform : translateY(0px);animation-delay:0.`+i+1+`s"><span class="today-task__item-name">`+tasks[i].value+`</span>
                            </div>
                            <div class="recycle-bin__wrap">
                            </div>
                            <i class="recycle-bin__icon fa-solid fa-trash-can hover " id="`+tasks[i].id+`"></i>
                        </div>
            `
            
        }
    }
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
    renderTasks(2)
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
            renderTasks(1)
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
        renderTasks(3)
    })
}
run();