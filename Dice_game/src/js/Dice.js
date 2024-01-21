//
//Belhda Beganovic
//Inlämningsuppgift 1 
//Kurs : 1ME325
//Strict mode
"use strict";

/*Tar fram slumpmäsig nummer/tärning samt raderar */
function Dice() {
  this.value= null;
  this.createNewDice = null;
    this.diceArray = ["dice-side-one", "dice-side-two", "dice-side-three", "dice-side-four", "dice-side-five", "dice-side-six"];
    this.createNewDice = document.createElement("li");// namn på dice.Deklarera högst upp variabel
    
    console.log(this.createNewDice);
    //Metoden slumpar fram nummer till tärning, metoden används också för att kasta om alla tärningar som finns fram på applikationen. 
Dice.prototype.randomDice = function () {
    this.value = Math.ceil(Math.random() * 6);// Deklarera högst upp variabel. 
    this.createNewDice.className = "";
    this.createNewDice.classList.add("dice");
    this.createNewDice.classList.add(this.diceArray[this.value - 1]);
    this.createNewDice.value = this.value;
  };
//Tar bort en tärning från applikationen. 
Dice.prototype.remove= function(){
  console.log(this.createNewDice);
  this.createNewDice.parentNode.removeChild(this.createNewDice);
};

}
