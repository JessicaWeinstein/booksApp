$(document).ready(function () {

const proxyurl = "https://cors-anywhere.herokuapp.com/"; 

let searchInput = document.getElementById("searchInput");

let submit = document.getElementById("searchButton");
    submit.addEventListener("click", searchBooksAPI);

let bookTitle = document.getElementById("bookTitle");

let author = document.getElementById("author");
author.addEventListener("click", moreByThisAuthor);

let year = document.getElementById("year");
let cover = document.getElementById("cover");
let rating = document.getElementById("rating")
let descripition = document.getElementById("description")
let page = document.getElementById("page")
let price = document.getElementById("price")
let dropDown = document.getElementById("dropDown")
let button = document.getElementById("review")
    button.addEventListener("click", goToBookReviewURL);

let buy = document.getElementById("buy")
buy.addEventListener("click", buyThisBook);

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
    title.innerHTML = "Book Title: " + data.items[0].volumeInfo.title
    author.innerHTML = data.items[0].volumeInfo.authors[0];
    cover.style.backgroundImage = "url('" + data.items[0].volumeInfo.imageLinks.thumbnail + "')"
    rating.innerHTML= "Rating: " + data.items[0].volumeInfo.averageRating
    // description.innerHTML = "Description: " + data.items[0].volumeInfo.description
    // page.innerHTML = "Page Count: " + data.items[0].volumeInfo.pageCount
    //     if (data.items[0].saleInfo.listPrice === undefined){
    //         price.innerHTML = "Sale price unavailable."
    //     }
    //     else{
    //         price.innerHTML = "Price: $" + data.items[0].saleInfo.listPrice.amount
    //     }
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
        let grid = document.createElement("div");
        let titleResults = document.createElement("div");
        titleResults.innerHTML = data.items[i].volumeInfo.title;
        titleResults.classList.add("next");
        let authorResults = document.createElement("div");
        authorResults.innerHTML = data.items[i].volumeInfo.authors;
        authorResults.classList.add("next");
        let smallThumb = document.createElement("div");
        smallThumb.classList.add("nextImage");
        smallThumb.style.backgroundImage = "url('" + data.items[i].volumeInfo.imageLinks.thumbnail + "')";
        smallThumb.style.display = "block";
        smallThumb.style.width = "130px";
        smallThumb.style.height = "170px";
        smallThumb.style.backgroundSize = "100% 100%";
        smallThumb.style.backgroundRepeat = "no-repeat";
        grid.appendChild(smallThumb);
        grid.appendChild(authorResults);
        grid.appendChild(titleResults);
        grid.classList.add("grid");
        results.appendChild(grid);

        // let authorResults = document.createElement("div");
        // authorResults.innerHTML = data.items[i].volumeInfo.authors;
        // box.appendChild(authorResults);
        // authorResults.addEventListener("click", moreByThisAuthor);

        // let smallThumb = document.createElement("div");
        // smallThumb.style.backgroundImage = "url('" + data.items[i].volumeInfo.imageLinks.thumbnail + "')";
        // // smallThumb.style.display = "block";
        // smallThumb.style.width = "130px";
        // smallThumb.style.height = "170px";
        // smallThumb.style.backgroundSize = "100% 100%";
        // smallThumb.style.backgroundRepeat = "no-repeat";
        // box.appendChild(smallThumb);


        // let titleResults = data.items[i].volumeInfo.title;
        // document.getElementsByClassName("box").innerHTML = titleResults;
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