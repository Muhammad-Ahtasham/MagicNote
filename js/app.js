// adding notes code
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener(
    'click', function (e) {
        let addTxt = document.getElementById('addTxt');
        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesObj = []
        }
        else {
            notesObj = JSON.parse(notes)
        }
        notesObj.push(addTxt.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTxt.value = "";
        showNotes();
    })

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `            
        <div class="card m-2 noteCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
        </div>
      </div>`;
    });
    let noteElm = document.getElementById('notes')
    if(notesObj.length!=0){
        noteElm.innerHTML = html;
    }
    else{
        noteElm.innerHTML = `Nothing to show right now`;
    }
}


// deleting note functions and code here
function deleteNote(index){
    // console.log("deleting", index)
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    // splice deletes from the first arguments and no of deleting Objects in givens as 2nd argument
    // in this case the deletion starts from index and no of deletions is 1 
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// search bar functions
let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value.toLowerCase();
    // console.log('input ecent fired', inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
});