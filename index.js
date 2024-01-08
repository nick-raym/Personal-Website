/*const h2 = document.createElement("h2");
h2.textContent = "Some of my Favorite Artists";
const artists=getElementById("artists");
document.querySelector(artists).append(h2);
//h2.insertBefore(getElementById("images"));
h2.id="javas";*/

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
  