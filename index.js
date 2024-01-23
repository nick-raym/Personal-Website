/*const h2 = document.createElement("h2");
h2.textContent = "Some of my Favorite Artists";
const artists=getElementById("artists");
document.querySelector(artists).append(h2);
//h2.insertBefore(getElementById("images"));
h2.id="javas";*/
kanyeQuote()
const pressMe = document.getElementById("press");
const colors = ["lightcoral", "purple", "green", "pink", "blue", "rgb(7,192,254)"]

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

  // function mmaStats(){
  //   fetch("https://api.sportradar.us/mma/trial/v2/en/champions.json?api_key=hg9s33jqdr37es6y8vz5qd4j")
  //   .then(response=>response.json())
  //   .then(mmaInfo=>{
  //     console.log(mmaInfo)
  //   })
  //   .catch(error=>console.log(error))
  // }
  
  // mmaStats()


  //add submit to kanye quote to add a comment
  //on hover do something
  
  function zipFindLocation(){
    const form = document.querySelector("#find-zip")
    form.addEventListener("submit",event=>{
      event.preventDefault()
        const zipCode = form.enterZip.value;
        const country = form.enterCountry.value;
        console.log(zipCode +" "+country)
        fetch("https://api.zippopotam.us/"+country+"/"+zipCode)
        .then(response=>response.json())
        .then(zipLo=>{
          //console.log(("https://api.zippopotam.us/"+country+"/"+zipCode))
          //console.log(zipLo)
          const zipList = document.querySelector("#zipList")
          const zipInfo = "Zip Location: " +zipLo["post code"]+", "+zipLo["country"]+" "+"Place Name: " + zipLo["places"][0]["place name"] +", "+zipLo["places"][0]["state abbreviation"]+" "+"Lat/Long: "+zipLo["places"][0]["latitude"]+", "+zipLo["places"][0]["longitude"]
          const zipEl = document.createElement("p")
          zipEl.textContent=zipInfo
          zipList.append(zipEl)
          if(document.querySelector("#unrec")){
          document.querySelector("#unrec").remove()}
        })
        .catch(error=>{
          console.log(error)
          
          if(!document.querySelector("#unrec")){
          const err=document.createElement("p")
          err.id="unrec"
          err.textContent="Unrecognized zip-code or country"
          document.querySelector("#error").append(err)}
        })
        
    })
  }
  zipFindLocation()

  const countries= ["AD","AR","AS","AT","AU","BD","BE","BG","BR","CA","CH","CZ","DE","DK","DO","ES","FI","FO","FR","GB","GF","GG","GL","GP","GT","GU","GY","HR","HU","IM","IN","IS","IT","JE","JP","LI","LK","LT","LU","MC","MD","MH","MK","MP",
  "MQ","MX","MY","NL","NO","NZ","PH","PK","PL","PM","PR","PT","RE","RU","SE","SI","SJ","SK","SM","TH","TR","US","VA","VI","YT","ZA"]
  
  const periods = countries.map(country => {
    const per = " "+country.substring(0,1)+"."+country.substring(1,2)+"."
    return per 
  });

  console.log(periods)

  document.querySelector("#hover").addEventListener("mouseover",event=>{
    event.preventDefault()
    const abb=document.createElement("p")
    abb.id="abbs"
    abb.textContent=periods
    document.querySelector("#hover").append(abb)
    
  })

  document.querySelector("#hover").addEventListener("mouseout",event=>{
    event.preventDefault()
    document.querySelector("#abbs").remove()
    
  })
