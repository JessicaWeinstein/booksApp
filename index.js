$(document).ready(function (){

const proxyurl = "https://cors-anywhere.herokuapp.com/"; 

//________APIs we tried:
//GoodReads api:
//too hard to figure out the xml formatting, I couldn't find the results
//const url = "https://www.goodreads.com/search/index.xml?key=YOUR_KEY&q=Normal+People";

//Google Books api: 
//shows cover art and has a url link to the book review:
//get averageRating to write on the screen which will show #/5 stars then click on book to bring you to the book review url ex: https://play.google.com/store/books/details?id=kwBlDwAAQBAJ&source=gbs_api
// const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:Normal+People+inauthor:Sally+Rooney"
const url = "https://www.googleapis.com/books/v1/volumes?q="

// NY Times api - does not show book cover art/image:
// const url = "https://api.nytimes.com/svc/books/v3/reviews.json?title="
// const apiKey = "&api-key=TKPbCTXiG9BDGunZaZbmKE5TMnvQrB3f" //my api key

//______________


let searchInput = document.getElementById("searchInput");

let submit = document.getElementById("searchButton");
    submit.addEventListener("click", searchBooksAPI);

let bookTitle = document.getElementById("bookTitle");
let author = document.getElementById("author");
let year = document.getElementById("year");
let coverImage = document.getElementById("coverImage");
let averageRating = document.getElementById("ratingNumber")

let button = document.getElementById("reviewButton")
    button.addEventListener("click", goToBookReviewURL);

var infoLink = "";



function searchBooksAPI(){
$.ajax({
    url: proxyurl + url + searchInput.value, //+ apiKey for NYTimes
    //url: proxyurl + url,
    success: function(response){
        console.log(response);
        //process the JSON data etc
        displayFirstResult(response)
        displayReviewButton()
        setReviewLink(response)

    }
})
}

function setReviewLink(data){
    infoLink = data.items[0].volumeInfo.infoLink
}

function displayFirstResult(data){
    bookTitle.innerHTML = "Book Title: " + data.items[0].volumeInfo.title
    author.innerHTML = "Author: " + data.items[0].volumeInfo.authors[0]
    coverImage.style.backgroundImage = "url('" + data.items[0].volumeInfo.imageLinks.thumbnail + "')"
    averageRating.innerHTML= "Rating: " + data.items[0].volumeInfo.averageRating
}

function displayReviewButton(){
    button.style.display = "block";
}

function goToBookReviewURL(){
    window.location = infoLink + "&showAllReviews=true"
}


})