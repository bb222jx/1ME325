//Belhda Beganovic
//Uppgift 1
//Kurs : 1ME325
//Strict mode
"use strict";

/*Klassen innehåller DOM struktur för Dice applikationen.
Händelsehanterare för knappar som finns på Dice applikation.
Metoder som hanterar knappar som tillhör Dice applikation.
*/
function Applikation() {

  this.pageContetntWrapper= null;
  this.diceWindowWrapper = null;
  this.diceMenubarWrapper = null;
  this.close = null;
  this.diceToolbarWrapper = null;
  this.liAdd = null;
  this.liRemove = null;
  this.liRoll = null;
  this.liZero = null;
  this.diceTOolbarCounterWrapper= null;
  this.diceArr = null;
  this.diceContentWrapper=null;
  this.ulDice = null;
  this.sound = null;

  this.createApplication();
  this.dragAndDrop = new DragnDrop();
  this.dragAndDrop.add(this.diceWindowWrapper, this.diceMenubarWrapper);
  this.diceArray= [];
}
/*Funtionen skapar DOM struktur samt hanterear händelsehanterere */
Applikation.prototype.createApplication = function () {
  var that = this;
  this.pageContetntWrapper = document.getElementById("page-content-wrapper");
  this.pageContetntWrapper.setAttribute('draggable', true);
  document.body.appendChild(this.pageContetntWrapper);

  this.diceWindowWrapper = document.createElement("div");
  this.diceWindowWrapper.setAttribute("class", "dice-window-wrapper");
  this.pageContetntWrapper.appendChild(this.diceWindowWrapper);
  //this.diceWindowWrapper.style.position = 'absolute';

  //Meny rad för att stänga applikationen.
  this.diceMenubarWrapper = document.createElement("div");
  this.diceMenubarWrapper.setAttribute("class", "dice-menubar-wrapper");
  this.diceWindowWrapper.appendChild(this.diceMenubarWrapper);

  this.close = document.createElement("div");
  this.close.setAttribute("class", "close");
  this.diceMenubarWrapper.appendChild(this.close);


  /*Menyrad för hantering av tärning,.. lägga till, ta bort och kasta om */
  this.diceToolbarWrapper = document.createElement("div");
  this.diceToolbarWrapper.setAttribute("class", "dice-toolbar-wrapper");
  this.diceWindowWrapper.appendChild(this.diceToolbarWrapper);

  this.ulMeni = document.createElement("ul");
  this.diceToolbarWrapper.appendChild(this.ulMeni);

  this.liAdd = document.createElement("li");
  this.liAdd.setAttribute("class", "add");
  this.ulMeni.appendChild(this.liAdd);

  this.liRemove = document.createElement("li", "remove");
  this.liRemove.setAttribute("class", "remove");
  this.ulMeni.appendChild(this.liRemove);


  this.liRoll = document.createElement("li");
  this.liRoll.setAttribute("class", "roll");
  this.ulMeni.appendChild(this.liRoll);

  this.liZero = document.createElement("li");
  this.liZero.setAttribute("class", "zero");
  this.ulMeni.appendChild(this.liZero);

  this.diceTOolbarCounterWrapper = document.createElement("ul");
  this.diceTOolbarCounterWrapper.setAttribute("class", "dice-toolbar-counter-wrapper");
  this.liZero.appendChild(this.diceTOolbarCounterWrapper);
  this.diceArr= [];

  for (var i = 0; i < 5; i++) {
       this.zero = document.createElement("li");
       this.zero.setAttribute("class", "zero");
       this.diceTOolbarCounterWrapper.appendChild(this.zero);
  }

  this.diceContentWrapper = document.createElement("div");
  this.diceContentWrapper.setAttribute("class", "dice-contetnt-wrapper");
  this.diceWindowWrapper.appendChild(this.diceContentWrapper);


  this.ulDice = document.createElement("ul");
  this.diceContentWrapper.appendChild(this.ulDice);
  

  this.liAdd.addEventListener("click", function (event) {
    that.createNewDices();
  });
  this.close.addEventListener("click", function (event) {
    that.closeDiceWindow();
  });

  this.liRoll.addEventListener("click", function (event) {
    that.rollDice();
  });
  this.liRemove.addEventListener("click", function (event) {
    that.removeDice();
  });
};

/*Funtionen kontrollerar om det finns 40 tärningar, om det inte finns så läggs till 
flera annars returnerars och räknas om resultat av tärningar*/
Applikation.prototype.createNewDices = function () {
  this.buttonSound();

  if (this.ulDice.childNodes.length == 40) {
      alert("Max antal tärningar är 40 st");
  } else {
    var addNewDice = new Dice();
    addNewDice.randomDice();
    this.ulDice.appendChild(addNewDice.createNewDice);
    this.diceArr.push(addNewDice);
  }
  this.sumDice();
};
/*Funtionen som stänger ner Dice applikationen.*/
Applikation.prototype.closeDiceWindow = function () {
  this.diceWindowWrapper.parentNode.removeChild(this.diceWindowWrapper);
  this.buttonSound();
};
/*Funtionen för att ta bort en eller flera tärningar från Dice applikationen*/
Applikation.prototype.removeDice = function () {
  this.buttonSound();
  for(var i=0; i<this.diceArr.length; i++){
    if (this.diceArr[i] == undefined) { //använd samma 
    console.log(this.diceArr);
    // använd diceArr för att kunna tabort dice. genom att använda ulDice där man tabort bara grafiken. 
    return;
  } else {
  this.diceArr[this.diceArr.length -1].remove();
  this.diceArr.splice(-1);
   }
  }
  this.sumDice();
};
/*Funtionen som ändrar värde på alla tärningar som finns i Dice applikation (kastar om)*/
Applikation.prototype.rollDice = function () {
  console.log(this.diceArr);
  for (var i = 0; i < this.diceArr.length; i++) {
       this.diceArr[i].randomDice();
   }
  this.buttonSound();
  this.sumDice();
};

/*Funtionen som summerar värde och returnerar resultat från alla tärningar.*/
Applikation.prototype.sumDice = function () {
  this.sum = 0;
  var summan = 0;
for (var i = 0; i < this.ulDice.childNodes.length; i++) {
    this.sum += this.ulDice.childNodes[i].value;
  }
  this.randomSum = this.sum.toString().split("");
  for (var i = 0; i < this.diceTOolbarCounterWrapper.childNodes.length; i++) {
    this.diceTOolbarCounterWrapper.childNodes[i].className = "zero";
    if (i < this.diceTOolbarCounterWrapper.childNodes.length - this.    randomSum.length)
      continue;

    if (this.randomSum != 0) {
      switch (Number(this.randomSum[summan])) {
        case 0:
          return this.diceTOolbarCounterWrapper.childNodes[i].className = "zero";
          summan++;
          break;
        case 1:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "one";
          summan++;
          break;
        case 2:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "two";
          summan++;
          break;
        case 3:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "three";
          summan++;
          break;
        case 4:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "four";
          summan++;
          break;
        case 5:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "five";
          summan++;
          break;
        case 6:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "six";
          summan++;
          break;
        case 7:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "seven";
          summan++;
          break;
        case 8:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "eight";
          summan++;
          break;
        case 9:
          this.diceTOolbarCounterWrapper.childNodes[i].className = "nine";
          summan++;
          break;
      }
    }
 }
};

Applikation.prototype.buttonSound = function(){
  this.sound = document.createElement("AUDIO");
  this.sound.type = "audio/wav";
  this.sound.src = ("src/wav/add.wav");
  this.sound.play();
}; 
