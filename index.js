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
//const url = "https://www.googleapis.com/books/v1/volumes?q="

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
let descripitionText = document.getElementById("descriptionText")
let pageCount = document.getElementById("pageCount")
let listPrice = document.getElementById("listPrice")
let dropDown = document.getElementById("dropDown")
let buy = document.getElementById("buyButton")
    buy.addEventListener("click", buyThisBook);




let button = document.getElementById("reviewButton")
    button.addEventListener("click", goToBookReviewURL);

var infoLink = "";
var url = "";



function searchBooksAPI(){
     url = selectedDropdownOptionUrl();
$.ajax({
     url: proxyurl + url + searchInput.value, //+ apiKey for NYTimes
    //url: proxyurl + url,
    success: function(response){
        console.log(response);
        //process the JSON data etc
        displayFirstResult(response)
        displayReviewButton()
        setReviewLink(response)
        displayNextResults(response)
        displayBuyButton()
        setBuyLink(response)
    } 
})
}

function selectedDropdownOptionUrl(){
    let selectedValue = dropDown.value;
    console.log(selectedValue);

        if (selectedValue === "all"){
            url = "https://www.googleapis.com/books/v1/volumes?q="
        }
        else if (selectedValue === "title"){
            url = "https://www.googleapis.com/books/v1/volumes?q=intitle:"

        }
        else if (selectedValue === "author"){
            url = "https://www.googleapis.com/books/v1/volumes?q=inauthor:"

        }
        else if (selectedValue === "genre"){
            url = "https://www.googleapis.com/books/v1/volumes?q=subject:"

        }

        return url;
}

function setReviewLink(data){
    infoLink = data.items[0].volumeInfo.infoLink
}

function setBuyLink(data){
    buyLink = data.items[0].saleInfo.buyLink
}

function displayFirstResult(data){
    bookTitle.innerHTML = "Book Title: " + data.items[0].volumeInfo.title
    author.innerHTML = "Author: " + data.items[0].volumeInfo.authors[0]
    coverImage.style.backgroundImage = "url('" + data.items[0].volumeInfo.imageLinks.thumbnail + "')"
    averageRating.innerHTML= "Rating: " + data.items[0].volumeInfo.averageRating
    descriptionText.innerHTML = "Description: " + data.items[0].volumeInfo.description
    pageCount.innerHTML = "Page Count: " + data.items[0].volumeInfo.pageCount
        if (data.items[0].saleInfo.listPrice === undefined){
            listPrice.innerHTML = "Sale price unavailable."
        }
        else{
            listPrice.innerHTML = "Price: $" + data.items[0].saleInfo.listPrice.amount
        }
}

function displayReviewButton(){
    button.style.display = "block";
}

function goToBookReviewURL(){
    window.location = infoLink + "&showAllReviews=true"
}

function displayBuyButton() {
    buy.style.display = "block";
}

function buyThisBook () {
    window.location = buyLink
}

function displayNextResults(data) {
    for(let i = 1; i < 10; i++) {
        let titleResults = document.createElement("div");
        titleResults.innerHTML = data.items[i].volumeInfo.title;
        titleResults.style.padding = "2px";
        titleResults.style.paddingTop = "15px";
        nextResultsContainer.appendChild(titleResults);

        let authorResults = document.createElement("div");
        authorResults.innerHTML = data.items[i].volumeInfo.authors;
        nextResultsContainer.appendChild(authorResults);

        let smallThumb = document.createElement("div");
        smallThumb.style.backgroundImage = "url('" + data.items[i].volumeInfo.imageLinks.thumbnail + "')";
        smallThumb.style.display = "block";
        smallThumb.style.width = "130px";
        smallThumb.style.height = "170px";
        smallThumb.style.backgroundSize = "100% 100%";
        smallThumb.style.backgroundRepeat = "no-repeat";
        nextResultsContainer.appendChild(smallThumb);
    }
}

function moreByThisAuthor() {
    console.log("whatever")
    //trigger a page refresh & new search
    $.ajax({
        url: proxyurl + "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + author.innerHTML,
        //url: proxyurl + url,
        success: function(authorResponse){
            console.log(authorResponse);
            //process the JSON data etc
            displayAuthorResult(authorResponse)
        }
    })
}

function displayAuthorResult(data) {
    bookTitle.innerHTML = "Book Title: " + data.items[0].volumeInfo.title
    author.innerHTML = "Author: " + data.items[0].volumeInfo.authors[0]
    coverImage.style.backgroundImage = "url('" + data.items[0].volumeInfo.imageLinks.thumbnail + "')"
    averageRating.innerHTML= "Rating: " + data.items[0].volumeInfo.averageRating
}

})