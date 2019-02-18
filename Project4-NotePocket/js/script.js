let addNoteButton = document.querySelector("#buttonAddNote");
let popup = document.querySelector("#popUpWindowWithForm");
let submitForm = document.querySelector("#submitButton");
let tasksID = document.querySelector('#tasks');

// Wyświetla notatkę i przypisuje jej przyciski, pobiera klucz i wartość obiektu z local storage
function displayNote(retrievedObject, id) {
  let divForTask = document.createElement("div");
  divForTask.style.backgroundColor = retrievedObject.color;
  divForTask.classList.add("task");
  tasksID.appendChild(divForTask);
  remove(id, divForTask);
  pinOnTopButton(divForTask);

  let h2ForTitle = document.createElement("h2");
  h2ForTitle.innerText = retrievedObject.title;
  divForTask.appendChild(h2ForTitle);

  let placeForContent = document.createElement("h3");
  placeForContent.innerText = retrievedObject.content;
  divForTask.appendChild(placeForContent);

  let placeForDate = document.createElement("h4");
  placeForDate.innerText = retrievedObject.date;
  divForTask.appendChild(placeForDate);
}

// Przycisk do przypinania notatki na górze listy
// Argumenty:
// ID notatki
// Div Notatki
function pinOnTopButton(divForTask) {
  let button = document.createElement("div");
  button.classList.add("pinontop");
  button.innerText = "Przypnij notatkę";
  divForTask.appendChild(button);

  button.addEventListener("click", function() {
    this.parentNode.parentNode.prepend(this.parentNode);
  })
}

// Przycisk do kasowania notatki
// Argumenty:
// ID notatki
// Div Notatki
function remove(id, divForTask) {
  let deleteButton = document.createElement("div");
  deleteButton.classList.add("exitbutton");
  divForTask.appendChild(deleteButton);
  let exit1 = document.createElement("div");
  let exit2 = document.createElement("div");
  exit1.classList.add("exit1");
  exit2.classList.add("exit2");

  deleteButton.appendChild(exit1);
  deleteButton.appendChild(exit2);
  deleteButton.addEventListener("click", function() {
    if (confirm('Czy chcesz usunąć tę notatkę?')) {
      localStorage.removeItem(id);
      location.reload();
    }
  })
}

// Efekt toogle dla formularza od dodawania
addNoteButton.addEventListener('click', function() {
  if (popup.style.display == "none") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
})

// Klasa Note
class Note {
  constructor() {
    let dropdown = document.querySelector("select");
    let date = new Date();
    let fullDate =
      date.getDate() + "."
      + date.getMonth()+1 + "."
      + date.getFullYear() + "\t\t"
      + date.getHours() + ':'
      + date.getMinutes() + ':'
      + date.getSeconds();

    let data = {
      'title': document.querySelector("#title").value,
      'content': document.querySelector("#content").value,
      'date': fullDate,
      'color': dropdown.options[dropdown.selectedIndex].value,
    }
    // Wzięcie ostatniego klucza z localStorage
    var key = localStorage.key(localStorage.length -1);
    localStorage.setItem(Number(key) + 1, JSON.stringify(data));
  }  
}

// Dodaje notatke
submitForm.addEventListener("click", function() {
  if (validateForm()) {
    let note = new Note();
  } else {
    alert('Wypełnij wszystkie pola');
  }
})

// Sprawdza czy title i content w formularzu nie są puste
function validateForm() {
  let title = document.querySelector("#title").value;
  let content = document.querySelector("#content").value;

  if (title == "" || content == "") return false;

  return true;
}

// Wyświetla notatki z localStorage
for(i in localStorage) {
  let retrievedObject = JSON.parse(localStorage.getItem(i));
  displayNote(retrievedObject, i);
}
