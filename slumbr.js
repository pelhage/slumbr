//Obtaining current Time
var now = new Date(); //Gets current Time
var cycle = 90 * 60000; //This is the length of a sleep cycle, expressed in milliseconds
function sleepNow() {
document.getElementById("1").innerHTML = "";
document.getElementById("2").innerHTML = "";
document.getElementById("3").innerHTML = ""; 
document.getElementById("4").innerHTML = "";
document.getElementById("5").innerHTML = "";
document.getElementById("6").innerHTML = "";                
var i = 0;
for (i = 1; i < 7; i++) {
var d = new Date(now.getTime() + 900000+i * cycle); //Adding a cycle for each loop
var hh = d.getHours();
var m = d.getMinutes();
var dd = 'AM';
var h = hh;
if (h >= 12){
h = hh - 12;
dd = 'PM';
}
if (h == 0) {
h = 12;
} 
if (m < 10) {
m = "0" + m;
}
if (i==1){    
document.getElementById("6").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
else if (i==2){    
document.getElementById("5").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}                
else if (i==3){    
document.getElementById("4").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}                
else if (i==4){    
document.getElementById("3").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
else if(i==5){
document.getElementById("2").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
else if (i==6){
document.getElementById("1").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}    
}
}

function wakeUp() {
//RETRIEVE TIMES FROM PERSON
var hourInput = parseInt(document.getElementById('hourInput').value);
var minInput = parseInt(document.getElementById('minInput').value);
//MAKE SURE IT IS EMPTY EACH TIME YOU ARE PRESSING CALC
document.getElementById("1").innerHTML = "";
document.getElementById("2").innerHTML = "";
document.getElementById("3").innerHTML = ""; 
document.getElementById("4").innerHTML = "";
document.getElementById("5").innerHTML = "";
document.getElementById("6").innerHTML = "";                


//CHECKING TO MAKE SURE INPUTS ARE CORRECT
if ((isNaN(hourInput || minInput) ) || (hourInput > 12 || minInput <0 || minInput>59 || hourInput===""))  {
document.getElementById("xxx").innerHTML = "Please use the correct HH:MM format"
}

if (document.getElementById('myonoffswitch').checked && hourInput == 12){
hourInput = 0;
}

//CHECKS TO SEE IF PM; IF SO, ADD 12 HOURS
/*        if (!(document.getElementById('myonoffswitch').checked) && hourInput < 12){
hourInput += 12;
alert('This is the new hour input'+hourInput)
} */

var wakeTime = new Date(0, 0, 0, hourInput, minInput);

//IF SET TO WAKE UP, THEN DO THIS
if (document.getElementById('myonoffswitch2').checked){
for (i = 6; i > 0; i--){
var d = new Date(wakeTime.getTime() - i * cycle);
var hh = d.getHours();
var m = d.getMinutes();
var dd = 'AM';
var h = hh;
if (h >= 12){
h = hh - 12;
dd = 'PM';
}
if (h == 0) {
h = 12;
} 
if (m < 10) {
m = "0" + m;
}
else if (i==1){    
document.getElementById("6").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
else if (i==2){    
document.getElementById("5").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}                
else if (i==3){    
document.getElementById("4").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}                
else if (i==4){    
document.getElementById("3").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
else if (i==5){
document.getElementById("2").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
else if (i==6){
document.getElementById("1").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}    
}
}
//IF SET TO SLEEP, THEN DO THIS
if (!(document.getElementById('myonoffswitch2').checked)){
for (i = 1; i < 7; i++) {
var d = new Date(wakeTime.getTime() + i * cycle);
var hh = d.getHours();
var m = d.getMinutes();
var dd = 'AM';
var h = hh;
if (h >= 12){
h = hh - 12;
dd = 'PM';
}
if (h == 0) {
h = 12;
} 
if (m < 10) {
m = "0" + m;
}
if (i==1){    
document.getElementById("6").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}                
if (i==2){    
document.getElementById("5").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
if (i==3){    
document.getElementById("4").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}

if (i==4){    
document.getElementById("3").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
if(i==5){
document.getElementById("2").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}
if(i==6){
document.getElementById("1").innerHTML += h + ":" + m + " " + dd + "<br>  ";
}    

}        
}
}
