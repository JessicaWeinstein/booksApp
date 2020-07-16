const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
//goodReads was too hard to figure out the xml formatting, I couldn't find the results
//google books api 
const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:Normal+People+inauthor:Sally+Rooney"


$.ajax({
    url: proxyurl + url,
    //beforeSend: function(xhr) {
         //xhr.setRequestHeader("Authorization", "Bearer 6QXNMEMFHNY4FJ5ELNFMP5KRW52WFXN5")
    //}, 
    success: function(data){
        console.log(data);
        //process the JSON data etc
    }
})