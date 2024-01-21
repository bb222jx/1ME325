//
//Belhda Beganovic
//Uppgift 1
//Kurs : 1ME325
//
//Strict mode
"use strict";

/*Skapar grundstruktur och startar DiceAppllikation,
lägger till ett ljud när man klickar på kanppen 
för att öppna Dice applikation.
Genom att klicka på knappen skapas ett nytt objekt (Dice applikation).
*/
var Main = {

  newApplikation: null,
  iconDice:null,
  init: function () {
   
    Main.iconDice = document.getElementById("icon-dice");
    Main.iconDice.addEventListener("click", Main.startDiceApp);
  },
    startDiceApp: function () {
    Main.newApplikation = new Applikation();// den sparas inte någonstans, minneslecka, objektet skaras inte globalt. grafiken är borta och objektet är kvar, man ska spra den i varia el för att kunna tabort den sen. 
    Main.newApplikation.buttonSound(); // skpa en funtion som  
  }
};
window.addEventListener("load", Main.init);
