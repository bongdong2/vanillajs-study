const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input")
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LOCAL_STORAGE = "toDos";

let toDos = [];

function deleteToDo(event) {
    // 해당 이벤트를 호출하는 삭제 버튼의 부모를 찾아서 
    // 자식노드인 li를 삭제한다.
    // filter 메서드를 이용해 삭제된 toDo를 제외시킨다.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        // li의 id는 문자열이므로 숫자로 바꾼다.
        return toDo.id !== parseInt(li.id);
    });

    // toDos를 변경하기 위해 const에서 let으로 변경한다.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    // 로컬스토리지에 객체를 바로 저장하면 'object Object' 처럼 저장이 되므로
    // JSON.stringify(object)를 사용해서 객체를 문자열로 저장한다.
    localStorage.setItem(TODOS_LOCAL_STORAGE, JSON.stringify(toDos));
}


function paintToDo(text) { 
    // li를 만들어 todoList에 넣는다.
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML  = "❌"; // 이모지
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    // 새로 생성한 li에 id를 넣는다.
    const newId = toDos.length + 1
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    // 객체를 toDos 배열에 넣는다.
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}
 
function handleSubmit(event) {
    // 이벤트를 막음. 여기서는 from submit 되어 리프레시되는 것을 막는다.
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""
}

function loadToDos() {
    // localStorage에 있는 todo 리스트를 가져온다.
    const loadedTodos = localStorage.getItem(TODOS_LOCAL_STORAGE);
    if(loadedTodos !== null) {
        const parsedToDos = JSON.parse(loadedTodos);
        parsedToDos.forEach(function(toDo) {
            // todo 리스트가 있으면 화면에 출력한다.
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos(); 
    toDoForm.addEventListener("submit", handleSubmit);
}

init();