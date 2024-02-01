"use strict";
function getBooks(booktitle) {
    if (booktitle != null && booktitle.length != 0) {
        const { from } = rxjs;
        const { map, switchMap, tap } = rxjs.operators;
        let apisurl = "https://www.googleapis.com/books/v1/volumes?q=";
        const p = fetch(apisurl + booktitle).then(responce => responce.json());
        //Serve per verificare che l'api funzioni
        /*.then(
            books => console.log(books)
    );*/
        return from(p).pipe(tap((data) => {
            if (data != null && data.items != null) {
                showTotal(data.items.length);
            }
            else {
                showTotal(0);
            }
        }), switchMap((data) => from(data.items || [])), map((elements) => {
            if (elements.volumeInfo.imageLinks != null) {
                const book = {
                    title: elements.volumeInfo.title,
                    categories: elements.volumeInfo.categories,
                    authors: elements.volumeInfo.authors,
                    description: elements.volumeInfo.description,
                    thumbnail: elements.volumeInfo.imageLinks.thumbnail
                };
                return book;
            }
            else {
                const book = {
                    title: elements.volumeInfo.title,
                    categories: elements.volumeInfo.categories,
                    authors: elements.volumeInfo.authors,
                    description: elements.volumeInfo.description,
                    thumbnail: ''
                };
                return book;
            }
        }));
    }
    else {
        //let p = new Promise ((res) => console.log(res));
        //p.then
        let list = [];
        return list;
    }
}
function showTotal(total) {
    console.log(total);
    const found = document.querySelector("#found");
    if (found) {
        found.textContent = '' + total;
    }
}
function displayBook(book) {
    const bookTpl = `<div class="card mb-3 shadow-sm">
                        <img src = "${book.thumbnail}" title= "${book.title}" alt= "${book.title}">
                        <div class="card-body">
                        <h5>${book.title}</h5>
                        <p class="card-text"></p>
                            <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-muted"> 9 mins </small>
                            </div>
                        </div>
                    </div>`;
    const div = document.createElement("div");
    div.setAttribute("class", "col-md-3");
    div.innerHTML = bookTpl;
    const books = document.querySelector("#books");
    if (books) {
        books.appendChild(div);
    }
}
function cleanBooks() {
    const found = document.querySelector("#found");
    if (found) {
        found.textContent = '' + 0;
    }
    const books = document.querySelector("#books");
    if (books) {
        books.innerHTML = '';
    }
}
/*function loadingBooks(){
    const books = document.querySelector("#books");
    if(books){
        books.innerHTML = 'LOADING . . .';
    }
}*/
function searchBooks() {
    const searchElements = document.querySelector("#Search");
    const { fromEvent } = rxjs;
    const { filter, map, switchMap, debounceTime, tap } = rxjs.operators;
    if (searchElements) {
        const button = document.querySelector("#searchButton");
        fromEvent(button, 'click').pipe(map(() => searchElements.value), tap(() => showTotal(0)
        //() => loadingBooks()
        ), /*debounceTime(
            2000
        ),*/ tap(() => cleanBooks()), switchMap((element) => getBooks(element))).subscribe((book) => displayBook(book));
        fromEvent(searchElements, 'submit').pipe(tap((event) => event.keyCode === 13), map(() => searchElements.value), tap(() => showTotal(0)), tap(() => cleanBooks()), switchMap((element) => getBooks(element))).subscribe((book) => displayBook(book));
        //vecchia chiamata "getBooks"
        //getBooks("java programming");
    }
}
searchBooks();
/*function searchButtonClicked(){
    const books: any = document.querySelector("#Search");
    if(books){
        getBooks(books.value).subscribe(
            (book: Book) => displayBook(book)
        )
    }
}*/
