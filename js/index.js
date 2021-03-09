console.log("welcome");

function Book(name, author, type){
    this.name = name;
    this.author = author;
    this.type = type
}
//display constructor
function Display(){

}

//add method to display prototype
Display.prototype.add = function(book){
    // console.log("adding")
    let tabelBody = document.getElementById("tableBody");
    let uistring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tabelBody.innerHTML += uistring;                
    
}

Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

Display.prototype.validate = function(book){
    if (book.name.length<2 || book.author.length<2 ){
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show = function(type, displayMessage){
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`
    setTimeout( function(){
        message.innerHTML = ""
    }, 2000);                    
}
//add submit event listener
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit",libraryFormSubmit);

// takeing the value from the input filed name, author, type=(fiction, programming, cooking) 
function libraryFormSubmit(e){
    // console.log("called form");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    
    // checkeing for which type of book is enter by the user
    if (fiction.checked){
        type=fiction.value;
    }
    else if (programming.checked){
        type=programming.value;
    }
    else if (cooking.checked){
        type=cooking.value;
    }

    // creating a book object from Book constructor
    let book = new Book(name, author, type);
    // console.log(book);

    // creating a display object from display constructor
    let display = new Display();

    // cheack for input value if it is valid than add otherwise show error in else part
    if (display.validate(book)){
        
        display.add(book);
        display.clear();
        display.show("success", "book has been successfully added")
    }
    else{
        display.show("danger", "sorry you can't add this book")
    }

    e.preventDefault();
}
