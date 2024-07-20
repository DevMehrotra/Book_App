let form = document.getElementById("book-form")
let tbody = document.getElementById("book-list")

//UI
function showAlert(msg,className){
  const div = document.createElement("div")//<div></div>
  div.className = "alert alert-"+className//div class="alert alert-danger">,/div>
  div.appendChild(document.createTextNode(msg))//div class="alert alert-danger">Please fill the all the fields</div>
  const container = document.querySelector(".container")
  const form = document.querySelector("#book-form")
  container.insertBefore(div,form)
  setTimeout(function(){
    document.querySelector(".alert").remove()
  },2000)
}


function getbook(){
  const storedBooks = [ {
    title:"Book one",
    author:"Jhon Doe",
    isbn:1234
},
{
  title:"Book Two",
  author:"Jane Doe",
  isbn:4567
}  
  ]
  storedBooks.forEach(function(book){
    addBookToList(book.title,book.author,book.isbn)
  })
  
}

function addBook(title,author,isbn){
  let tr = document.createElement("tr")//<tr></tr>
  tr.innerHTML = `
  <tr>
  <td>${title}</td>
  <td>${author}</td>
  <td>${isbn}</td>
  <td><a href ="#" class="btn btn-danger float right delete">X</a></td>
  `
tbody.appendChild(tr)
}

function clearAllFields(){
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("isbn").value = ""
  document.getElementById("title").focus()
}

//LocalStorage
function clearAllFields(title,author,isbn){
let books = []
books.push({title,author,isbn})
localStorage.setItem("books",JSON.stringify(books))
}

//Event Listener
form.addEventListener("submit",function(x){
  x.preventDefault()
  let title = document.getElementById("title").value
  let author = document.getElementById("author").value
  let isbn = document.getElementById("isbn").value

  if(title== "" || author=="" || isbn=="" ){
    //alert("plese fill all the Fields");
    showAlert("please fill all the fields","danger")
    return;
  }

  addBookToList(title,author,isbn)
  addBookToDb(title,author,isbn)
  clearAllFields()
 

showAlert("Books add successfully","success")
  
})

tbody.addEventListener("click",function(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure you want to delete this book") ){
       tbody.removeChild(e.target.parentElement .parentElement)
        }
    }

})

window.addEventListener("load",getbook)
