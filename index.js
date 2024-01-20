/*const h2 = document.createElement("h2");
h2.textContent = "Some of my Favorite Artists";
const artists=getElementById("artists");
document.querySelector(artists).append(h2);
//h2.insertBefore(getElementById("images"));
h2.id="javas";*/
kanyeQuote()
const pressMe = document.getElementById("press");
const colors = ["red", "purple", "green", "pink", "blue", "rgb(7,192,254)"]

var num=-1;
pressMe.addEventListener('click', function() {
    if(num==5 || num==-1){
        num=-1;
        
    }
    console.log(num);
    document.body.style.backgroundColor=colors[num+=1];
}
  );

  function kanyeQuote(){
    fetch("https://api.kanye.rest")
    .then(response=>response.json())
    .then(quote=>{
        const yeQuote = document.createElement("h4")
        yeQuote.textContent = '"'+quote.quote+'"'
        yeQuote.id = "kanye-quote"
        document.querySelector("#quote").appendChild(yeQuote)
        console.log(yeQuote.textContent)
        return yeQuote.textContent
    });
  }

  

  const quoteButton = document.getElementById("quote-button")
  quoteButton.addEventListener("click",event=>{
    const yeQuote = document.getElementById("kanye-quote")
    event.preventDefault()
    yeQuote.remove()
    yeQuote.textContent= kanyeQuote()

  })


  //add submit to kanye quote to add a comment
  //on hover do something