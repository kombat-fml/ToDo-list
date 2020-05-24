const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#addNewTask");
const tasksList = document.querySelector("#list-group");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  //находим важные элементы на странице
  const taskText = input.value.trim();

  //формируем разметку для новой задачи
  const taskHTML = `
  <li class="list-group-item d-flex justify-content-between">
    <span contenteditable="true" class="task-title">${taskText}</span>
    <div>
      <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
      <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
    </div>
  </li>`;

  //добавляем новую задачу на страницу
  tasksList.insertAdjacentHTML("afterbegin", taskHTML);

  //очищаем поле ввода
  input.value = "";
  //оставим фокус на поле ввода
  input.focus();

  //скрываем или показываем запись, что список дел пуст
  toggleEmptyListItem();

  //показываем нотификацию о добавлении задачи
  showNotification("new");

});

// Прослушиваем клик внутри списка с задачами
tasksList.addEventListener("click", function (event) {

  // Проверяем  что клик произошел по кнопке "удалить"
  if (event.target.getAttribute("data-action") == "delete-task") {
    // Находим родительский тег и удаляем его
    event.target.closest(".list-group-item").remove();

    //скрываем или показываем запись, что список дел пуст
    toggleEmptyListItem();

    //показываем нотификацию, что задача удалена
    showNotification("delete");

  } else if (event.target.getAttribute("data-action") == "ready") {
    //находим родительский тег li
    const parentElement = event.target.closest(".list-group-item");

    // Добавляем к тегу span доп. калсс
    parentElement.querySelector(".task-title").classList.add("task-title--done");

    // Убираем возможность редактировать задачу
    parentElement.querySelector(".task-title").setAttribute("contenteditable", "false");

    // перемещаем запись в конец списка 
    tasksList.insertAdjacentElement("beforeend", parentElement);

    //удаляем кнопку готово
    event.target.remove();

    // Нотификация о выполнении задачи
    showNotification("ready");
  };


});

//функция проверки списка задач и вывод таблички "список пуст"
function toggleEmptyListItem() {

  if (tasksList.children.length > 1) {
    document.querySelector("#empty-list-item").style.display = "none";

  } else {
    document.querySelector("#empty-list-item").style.display = "block";
  }

};


function showNotification(type) {

  let newElement = document.createElement("div");

  switch (type) {
    case "new":
      newElement.className = "alert alert-warning container";
      newElement.textContent = "Задача добавлена!";
      break;
    case "delete":
      newElement.className = "alert alert-danger container";
      newElement.textContent = "Задача удалена!";
      break;
    case "ready":
      newElement.className = "alert alert-success container";
      newElement.textContent = "Задача выполнена!";
      break;

  }

  document.querySelector("#notifyHolder").insertAdjacentElement("afterbegin", newElement);

  setTimeout(function () {
    newElement.style.opacity = "1";
  }, 300);

  setTimeout(function () {
    newElement.style.opacity = "0";
  }, 2300);

  setTimeout(function () {
    newElement.remove();
  }, 2700);

};