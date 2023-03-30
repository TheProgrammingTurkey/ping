let buttons = document.getElementById("difficulty-buttons");
let hardStats = document.getElementById("hardMode");
let mediumStats = document.getElementById("mediumMode");
let easyStats = document.getElementById("easyMode");

function startUserVsUserGame() {
  window.location.replace("twoPlayer.html")
}
  
function startComputerVsComputerGame() {
  window.location.replace("cpuVsCpu.html")
}
  
function showDifficultyButtons() {
  buttons.style.display = "block";
}
  
function startEasyGame() {
  window.location.replace("easyMode.html")  
}
  
function startMediumGame() {
  window.location.replace("mediumMode.html")
}
  
function startHardGame() {
  window.location.replace("hardMode.html")
}


function stats() {
  let popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
function HardStats() {
  hardStats.style.display = ("block")
  mediumStats.style.display = ("none")
  easyStats.style.display = ("none")
}
function MediumStats() {
  mediumStats.style.display = ("block")
  easyStats.style.display = ("none")
  hardStats.style.display = ("none")
}
function EasyStats() {
  easyStats.style.display = ("block")
  mediumStats.style.display = ("none")
  hardStats.style.display = ("none")
}

if (localStorage.getItem("ovrHardLeft") == null){
  ovrHardLeft = 0
}
else{
  ovrHardLeft = parseInt(localStorage.getItem("ovrHardLeft"))
}
if (localStorage.getItem("ovrHardRight") == null){
  ovrHardRight = 0
}
else{
  ovrHardRight = parseInt(localStorage.getItem("ovrHardRight"))
}
document.getElementById("ovrHardRight").innerHTML = "Goals For: "+ovrHardRight
document.getElementById("ovrHardLeft").innerHTML = "Goals Against: "+ovrHardLeft
if (localStorage.getItem("ovrMediumLeft") == null){
  ovrMediumLeft = 0
}
else{
  ovrMediumLeft = parseInt(localStorage.getItem("ovrMediumLeft"))
}
if (localStorage.getItem("ovrMediumRight") == null){
  ovrMediumRight = 0
}
else{
  ovrMediumRight = parseInt(localStorage.getItem("ovrMediumRight"))
}
document.getElementById("ovrMediumRight").innerHTML = "Goals For: "+ovrMediumRight
document.getElementById("ovrMediumLeft").innerHTML = "Goals Against: "+ovrMediumLeft
if (localStorage.getItem("ovrEasyLeft") == null){
  ovrEasyLeft = 0
}
else{
  ovrEasyLeft = parseInt(localStorage.getItem("ovrEasyLeft"))
}
if (localStorage.getItem("ovrEasyRight") == null){
  ovrEasyRight = 0
}
else{
  ovrEasyRight = parseInt(localStorage.getItem("ovrEasyRight"))
}
document.getElementById("ovrEasyRight").innerHTML = "Goals For: "+ovrEasyRight
document.getElementById("ovrEasyLeft").innerHTML = "Goals Against: "+ovrEasyLeft