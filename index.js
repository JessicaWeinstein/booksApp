$(document).ready(function () {

const proxyurl = "https://cors-anywhere.herokuapp.com/"; 

//when page loads it automatically uses the "all" url search
var url = "https://www.googleapis.com/books/v1/volumes?q="


let searchInput = document.getElementById("searchInput");

let submit = document.getElementById("searchButton");
    submit.addEventListener("click", searchBooksAPI);

let pageHeader = document.getElementById("pageHeader");
let pageHeader2 = document.getElementById("pageHeader2");

let bookTitle = document.getElementById("bookTitle");

let author = document.getElementById("author");
//     author.addEventListener("click", moreByThisAuthor);

let year = document.getElementById("year");
let coverImage = document.getElementById("coverImage");
let ratingNumber = document.getElementById("ratingNumber")
let descripitionText = document.getElementById("descriptionText")
let pageCount = document.getElementById("pageCount")
let listPrice = document.getElementById("listPrice")
let dropDown = document.getElementsByClassName("dropDown-options")
let dropDownOption = document.getElementsByClassName("dropDown-option")
let buy = document.getElementById("buyButton")
    buy.addEventListener("click", buyThisBook);

let selectedValue = "all";

let button = document.getElementById("reviewButton")
    button.addEventListener("click", goToBookReviewURL);

// buy = document.getElementById("buyButton")

// let cover = document.getElementById("cover");
// let rating = document.getElementById("rating")
// let descripition = document.getElementById("description")
// let page = document.getElementById("page")
// 
// let button = document.getElementById("review")
    button.addEventListener("click", goToBookReviewURL);

// let buy = document.getElementById("buy")

var infoLink = "";

//veiw drop down list function
document.querySelector(".custom-select-wrapper").addEventListener("click", function() {
    this.querySelector(".dropDown").classList.toggle("open");
})


for (const option of document.querySelectorAll(".dropDown-option")) { 
    option.addEventListener("click", function() {
        if (!this.classList.contains("selected")) {
            this.parentNode.querySelector(".dropDown-option.selected").classList.remove("selected");
            this.classList.add("selected");
            this.closest(".dropDown").querySelector(".custom-select-trigger span").textContent = this.textContent;

            var selectedValueText = this.textContent;
            url = selectedDropdownOptionUrl(selectedValueText);
            console.log(url);
        }
             // selectedValue =  this.closest(".dropDown").querySelector(".custom-select-trigger span").textContent = this.textContent;
    })
}
//end of view dropdown list

function searchBooksAPI(){
     // url = selectedDropdownOptionUrl();
$.ajax({
     url: proxyurl + url + searchInput.value,
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

function selectedDropdownOptionUrl(selectedValueText){
    // let selectedValue = dropDownOption.value;
    // console.log(selectedValue);
    console.log(selectedValueText)

        if (selectedValueText === "All"){
            url = "https://www.googleapis.com/books/v1/volumes?q="
        }
        else if (selectedValueText === "Title"){
            url = "https://www.googleapis.com/books/v1/volumes?q=intitle:"

        }
        else if (selectedValueText === "Author"){
            url = "https://www.googleapis.com/books/v1/volumes?q=inauthor:"

        }
        else if (selectedValueText === "Genre"){
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
    pageHeader.style.display = "block";
    pageHeader2.style.display = "block";
    bookTitle.innerHTML = "Book Title: " + data.items[0].volumeInfo.title
    author.innerHTML = "Author: " + data.items[0].volumeInfo.authors[0];
    coverImage.style.backgroundImage = "url('" + data.items[0].volumeInfo.imageLinks.thumbnail + "')"
    ratingNumber.innerHTML= "Rating: " + data.items[0].volumeInfo.averageRating + "/5 Stars"
    descriptionText.innerHTML = data.items[0].volumeInfo.description
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
        let grid = document.createElement("div");
        let titleResults = document.createElement("div");
        titleResults.innerHTML = "Book Title: " + data.items[i].volumeInfo.title;
        titleResults.classList.add("next");
        let authorResults = document.createElement("div");
        authorResults.innerHTML = "Author: " + data.items[i].volumeInfo.authors;
        authorResults.classList.add("next" );
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

//when you click on author:
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