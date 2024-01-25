
kanyeQuote()
const pressMe = document.getElementById("press");
const colors = ["lightcoral", "purple", "green", "pink", "blue", "rgb(7,192,254)"]

var num=-1;
pressMe.addEventListener('click', function() {
    if(num==5 || num==-1){
        num=-1;
        
    }
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

  function zipFindLocation(){
    const form = document.querySelector("#find-zip")
    form.addEventListener("submit",event=>{
      event.preventDefault()
        const zipCode = form.enterZip.value;
        const country = form.enterCountry.value;
        fetch("https://api.zippopotam.us/"+country+"/"+zipCode)
        .then(response=>response.json())
        .then(zipLo=>{
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

  fetch("http://localhost:3000/fighters")
  .then(response=>response.json())
  .then(fighters=>{
    const mmaFormOne = document.querySelector("#mma-first")
    const mmaFormTwo = document.querySelector("#mma-second")
    let fighterOneName="";
    let fighterTwoName="";

    mmaFormOne.addEventListener("submit",event=>{
      event.preventDefault()
      let fighterOne = mmaFormOne.enterfirst.value
      let nameArray = fighterOne.split(" ")
      const capArray=nameArray.map(name=>{
        let firstLetter = name[0].toUpperCase()
        name = firstLetter + name.substring(1)
        return name
      })
      fighterOneName = capArray.join(" ")
      const firstStats= document.querySelector("#first-stats")
    
      fighters.forEach(fighter => {
          if(fighterOneName === fighter["name"]){
            const newStat = fighterStats(fighter)
            firstStats.innerHTML=""
            firstStats.append(newStat)
          }
      })
      compareStats(fighterOneName,fighterTwoName,fighters)
    })
    

    mmaFormTwo.addEventListener("submit",event=>{
      event.preventDefault()
      let fighterTwo = mmaFormTwo.entersecond.value
      let nameArray = fighterTwo.split(" ")
      const capArray=nameArray.map(name=>{
        let firstLetter = name[0].toUpperCase()
        name = firstLetter + name.substring(1)
        return name
      })
      fighterTwoName = capArray.join(" ")
      const secondStats= document.querySelector("#second-stats")
    
      fighters.forEach(fighter => {
          if(fighterTwoName === fighter["name"]){
            const newStat = fighterStats(fighter)
            secondStats.innerHTML=""
            secondStats.append(newStat)
          }
      })
      compareStats(fighterOneName,fighterTwoName,fighters)
    })
    
  
  })
  .catch(error=>{
    console.log(error)
  })


  function fighterStats(fighter){
      const newStat = document.createElement("h3")
      if(!(fighter["nickname"]==="")){
        newStat.innerHTML='<em>"'+fighter["nickname"]+'"</em>'+'<br>'
        }
        newStat.innerHTML+="Record: "+"(<span class='wins'>"+fighter["wins"]+"</span>, <span class='losses'>"+fighter["losses"]+"</span>, <span class='draws'>"+fighter["draws"]+"</span>)"
        newStat.innerHTML+="<br>Ht: <span class='height'>"+fighter["height_cm"]+"cm</span> Wt: <span class='weight'>"+fighter["weight_in_kg"]+"kg</span> Reach: <span class='reach'>"+fighter["reach_in_cm"]+"cm</span>"
        newStat.innerHTML+="<br>"+fighter["stance"]+" Stance"
        newStat.innerHTML+="<br>SSLPM: <span class='sslpm'>"+fighter["significant_strikes_landed_per_minute"]+"</span> SS Accuracy: <span class='ssa'>"+fighter["significant_striking_accuracy"]+"%</span>"
        newStat.innerHTML+="<br>SS-absorbed-Pm: <span class='ssapm'>"+fighter["significant_strikes_absorbed_per_minute"]+"</span> SS-Def: <span class='ssd'>"+fighter["significant_strike_defence"]+"%</span>"
        newStat.innerHTML+="<br>TDLPM: <span class='atl'>"+fighter["average_takedowns_landed_per_15_minutes"]+"</span> TDACC: <span class='tda'>"+fighter["takedown_accuracy"]+"%</span> TD-Def: <span class='tdd'>"+fighter["takedown_defense"]+"%</span>"
        newStat.innerHTML+="<br> Avg-Subs-Att/15mins: <span class='sub'>"+fighter["average_submissions_attempted_per_15_minutes"]+"</span>"
        return newStat

  }


  function compareStats(fighter1,fighter2,fighters){
    if(fighter1!="" && fighter2!=""){
      let winsOne,winsTwo,lossesOne,lossesTwo,drawsOne,drawsTwo,heightOne,heightTwo,weightOne,weightTwo,reachOne,reachTwo,sslpmOne,sslpmTwo,ssaOne,ssaTwo,ssapmOne,ssapmTwo,ssdOne,ssdTwo,atlOne,atlTwo,tdaOne,tdaTwo,tddOne,tddTwo,subOne,subTwo;
      fighters.forEach(fighter => {
        if(fighter1 === fighter["name"]){
           winsOne=fighter["wins"]
           lossesOne=fighter["losses"]
           drawsOne = fighter["draws"]
           heightOne=fighter["height_cm"]
           weightOne=fighter["weight_in_kg"]
           reachOne=fighter["reach_in_cm"]
           sslpmOne=fighter["significant_strikes_landed_per_minute"]
           ssaOne=fighter["significant_striking_accuracy"]
           ssapmOne=fighter["significant_strikes_absorbed_per_minute"]
           ssdOne=fighter["significant_strike_defence"]
           atlOne=fighter["average_takedowns_landed_per_15_minutes"]
           tdaOne=fighter["takedown_accuracy"]
           tddOne=fighter["takedown_defense"]
           subOne=fighter["average_submissions_attempted_per_15_minutes"]

        }
        if(fighter2 === fighter["name"]){
           winsTwo=fighter["wins"]
           lossesTwo=fighter["losses"]
           drawsTwo = fighter["draws"]
           heightTwo=fighter["height_cm"]
           weightTwo=fighter["weight_in_kg"]
           reachTwo=fighter["reach_in_cm"]
           sslpmTwo=fighter["significant_strikes_landed_per_minute"]
           ssaTwo=fighter["significant_striking_accuracy"]
           ssapmTwo=fighter["significant_strikes_absorbed_per_minute"]
           ssdTwo=fighter["significant_strike_defence"]
           atlTwo=fighter["average_takedowns_landed_per_15_minutes"]
           tdaTwo=fighter["takedown_accuracy"]
           tddTwo=fighter["takedown_defense"]
           subTwo=fighter["average_submissions_attempted_per_15_minutes"]

        }
      
        })

        if(winsOne>winsTwo){
          document.querySelector("#first-stats .wins").style.color="green"
          document.querySelector("#second-stats .wins").style.color="red"
        }
        else if(winsOne<winsTwo){
          document.querySelector("#first-stats .wins").style.color="red"
          document.querySelector("#second-stats .wins").style.color="green"
        }
        if(lossesOne<lossesTwo){
          document.querySelector("#first-stats .losses").style.color="green"
          document.querySelector("#second-stats .losses").style.color="red"
        }
        else if(lossesOne>lossesTwo){
          document.querySelector("#first-stats .losses").style.color="red"
          document.querySelector("#second-stats .losses").style.color="green"
        }
        if(heightOne>heightTwo){
          document.querySelector("#first-stats .height").style.color="green"
          document.querySelector("#second-stats .height").style.color="red"
        }
        else if(heightOne<heightTwo){
          document.querySelector("#first-stats .height").style.color="red"
          document.querySelector("#second-stats .height").style.color="green"
        }
        if(weightOne>weightTwo){
          document.querySelector("#first-stats .weight").style.color="green"
          document.querySelector("#second-stats .weight").style.color="red"
        }
        else if(weightOne<weightTwo){
          document.querySelector("#first-stats .weight").style.color="red"
          document.querySelector("#second-stats .weight").style.color="green"
        }
        if(reachOne>reachTwo){
          document.querySelector("#first-stats .reach").style.color="green"
          document.querySelector("#second-stats .reach").style.color="red"
        }
        else if(reachOne<reachTwo){
          document.querySelector("#first-stats .reach").style.color="red"
          document.querySelector("#second-stats .reach").style.color="green"
        }
        if(sslpmOne>sslpmTwo){
          document.querySelector("#first-stats .sslpm").style.color="green"
          document.querySelector("#second-stats .sslpm").style.color="red"
        }
        else if(sslpmOne<sslpmTwo){
          document.querySelector("#first-stats .sslpm").style.color="red"
          document.querySelector("#second-stats .sslpm").style.color="green"
        }
        if(ssaOne>ssaTwo){
          document.querySelector("#first-stats .ssa").style.color="green"
          document.querySelector("#second-stats .ssa").style.color="red"
        }
        else if(ssaOne<ssaTwo){
          document.querySelector("#first-stats .ssa").style.color="red"
          document.querySelector("#second-stats .ssa").style.color="green"
        }
        if(ssapmOne<ssapmTwo){
          document.querySelector("#first-stats .ssapm").style.color="green"
          document.querySelector("#second-stats .ssapm").style.color="red"
        }
        else if(ssapmOne>ssapmTwo){
          document.querySelector("#first-stats .ssapm").style.color="red"
          document.querySelector("#second-stats .ssapm").style.color="green"
        }
        if(ssdOne>ssdTwo){
          document.querySelector("#first-stats .ssd").style.color="green"
          document.querySelector("#second-stats .ssd").style.color="red"
        }
        else if(ssdOne<ssdTwo){
          document.querySelector("#first-stats .ssd").style.color="red"
          document.querySelector("#second-stats .ssd").style.color="green"
        }
        if(atlOne>atlTwo){
          document.querySelector("#first-stats .atl").style.color="green"
          document.querySelector("#second-stats .atl").style.color="red"
        }
        else if(atlOne<atlTwo){
          document.querySelector("#first-stats .atl").style.color="red"
          document.querySelector("#second-stats .atl").style.color="green"
        }
        if(tdaOne>tdaTwo){
          document.querySelector("#first-stats .tda").style.color="green"
          document.querySelector("#second-stats .tda").style.color="red"
        }
        else if(tdaOne<tdaTwo){
          document.querySelector("#first-stats .tda").style.color="red"
          document.querySelector("#second-stats .tda").style.color="green"
        }
        if(tddOne>tddTwo){
          document.querySelector("#first-stats .tdd").style.color="green"
          document.querySelector("#second-stats .tdd").style.color="red"
        }
        else if(tddOne<tddTwo){
          document.querySelector("#first-stats .tdd").style.color="red"
          document.querySelector("#second-stats .tdd").style.color="green"
        }
        if(subOne>subTwo){
          document.querySelector("#first-stats .sub").style.color="green"
          document.querySelector("#second-stats .sub").style.color="red"
        }
        else if(subOne<subTwo){
          document.querySelector("#first-stats .sub").style.color="red"
          document.querySelector("#second-stats .sub").style.color="green"
        }
    }
  }