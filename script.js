(function(){
 
//Select necessary elements
  const input = document.querySelector("input");
  const form = document.querySelector("button");
  const lists = document.querySelector(".list");

//declare 2 static methods etal in class for local storage function
  class Storage {
    static addTodStorage(todoArr){
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage(){
        let storage = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
        return storage;
    }
} 

let todoArr = Storage.getStorage();

//Class as object template for each input item
class Todo {
  constructor(id, todo){
      this.id = id;
      this.todo = todo;
  }
}

//listener for todo item adding
form.addEventListener("click", () => {
  let id = Math.floor(Math.random()*1000);
  let todo = new Todo(id, input.value);
  todoArr = [...todoArr, todo];
  UI.displayData();
  UI.clearInput();
  Storage.addTodStorage(todoArr);
})

//Another class to control page item display as well as item local storage
class UI{
    static displayData(){
        let displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id = ${item.id}>🗑️</span>
                </div>
            `
        });
        lists.innerHTML = (displayData).join(" ");
    }
    static clearInput(){
        input.value = "";
    }
    static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            UI.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodStorage(todoArr);
    }
}

//listener to run so necessary items populate on page load.
window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
});

})();