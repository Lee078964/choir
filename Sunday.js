const sundaylist = JSON.parse(localStorage.getItem('sundaylist')) || [];

function saveToStorage() {
  localStorage.setItem('sundaylist', JSON.stringify(sundaylist));
}

function renderTodoList() {
  let todolistHTML = '';

  sundaylist.forEach((todoObject, index) => {
    const Song = todoObject.Song;
    const Note = todoObject.Note;

    const html = `
      <tr>
        <td>${index + 1}</td>
        <td>${Song}</td>
        <td>${Note}</td>
        <td><button class="delete-todo js-delete-todo">Delete</button></td>
      </tr>
    `;
    todolistHTML += html;
  })

  document.querySelector('.js-data')
    .innerHTML = todolistHTML;

  document.querySelectorAll('.js-delete-todo')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        sundaylist.splice(index, 1);
        saveToStorage();
        renderTodoList();
      })
    })
}
document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodo();
  })

function addTodo() {
  const inputElement = document.querySelector('.js-input-song');
  const Song = inputElement.value;

  const noteElement = document.querySelector('.js-input-note');
  const Note = noteElement.value;

  if (Song === '' || Note === '') {
    return;
  }

  sundaylist.push({
    Song: Song,
    Note: Note
  })
  saveToStorage();

  inputElement.value = '';
  noteElement.value = '';

  renderTodoList();
}
renderTodoList();