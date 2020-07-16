//key: g4l2gWBtKTN4TpC6puSRAQ
//secret: EK37bZNYVq9s5LTn6jw0igBDVeZXUyE7UmaQ54hg

const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
//this was using goodReads but too hard to figure out the xml formatting, I couldn't find the results
//const url = "https://www.goodreads.com/search/index.xml?key=g4l2gWBtKTN4TpC6puSRAQ&q=Normal+People";
//google books api 
const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:Normal+People+inauthor:Sally+Rooney"


$.ajax({
    //url: 'https://www.goodreads.com/search.xml?key=g4l2gWBtKTN4TpC6puSRAQ&q=Ender%27s+Game',
    url: proxyurl + url,
    //beforeSend: function(xhr) {
         //xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
    //}, 
    success: function(data){
        console.log(data);
        //process the JSON data etc
    }
})