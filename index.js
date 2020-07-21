$(document).ready(function (){

const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
//this was using goodReads but too hard to figure out the xml formatting, I couldn't find the results
//const url = "https://www.goodreads.com/search/index.xml?key=YOUR_KEY&q=Normal+People";
//google books api 
//const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:Normal+People+inauthor:Sally+Rooney"
const url = "https://www.googleapis.com/books/v1/volumes?q="

let searchInput = document.getElementById("searchInput");

let submit = document.getElementById("searchButton");
    submit.addEventListener("click", searchBooksAPI);

let bookTitle = document.getElementById("bookTitle");
let author = document.getElementById("author");
let year = document.getElementById("year");
let coverImage = document.getElementById("coverImage");


function searchBooksAPI(){
$.ajax({
    url: proxyurl + url + searchInput.value,
    //url: proxyurl + url,
    success: function(response){
        console.log(response);
        //process the JSON data etc
        displayFirstResult(response)
    }
})

}

function displayFirstResult(data){
    bookTitle.innerHTML = "Book Title: " + data.items[0].volumeInfo.title
    author.innerHTML = "Author: " + data.items[0].volumeInfo.authors[0]
    coverImage.style.backgroundImage = "url('" + data.items[0].volumeInfo.imageLinks.thumbnail + "')"
}

})