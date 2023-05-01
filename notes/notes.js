const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = document.querySelector("header p"),
closeIcon = popupBox.querySelector("header img"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () =>{
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () =>{
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <img onclick="showMenu(this)" src="icons/icons8-ellipsis-16.png" alt="settings">
                                <ul class="menu">
                                    <li onclick = "updateNote(${index},'${note.title}','${note.description}')"><img src="icons/icons8-edit-16.png" alt="edit">Edit</li>
                                    <li onclick = "deleteNote(${index})"><img src="icons/icons8-trash-16.png" alt="trash">Delete</li>
                                </ul> 
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document .addEventListener("click", e => {
        if( e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId){
    notes.splice(noteId, 1); 
    localStorage.setItem("notes", JSON.stringify(notes) );
    showNotes();
}
function updateNote(noteId,title,desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}

addBtn.addEventListener("click", e =>{
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDisc = descTag.value;
    if( noteDisc){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, 
            description: noteDisc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }else{
            isUpdate=false;
            notes[updateId] = noteInfo;
        }
        
        localStorage.setItem("notes", JSON.stringify(notes) );
        closeIcon.click();
        showNotes();
    }
});

// e.target.tagName != "I" ||