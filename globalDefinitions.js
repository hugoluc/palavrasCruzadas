//constant definitions

var x = 1
var enableCanvas = false
var toDefinition = false
var selectedData;
var appStart = false

//-------------CONTROLES--------------------

CONTROLS = {

  speedMin : 1,
  speedMax : 1.5,
  wordTimeMin : 1000,
  wordTimeMax : 5000,
  growMultiplyer : 0.1,
  maxWodCount : 30,

}

//-----------------------------------------

let sohne, sohneBold;


var canvasSize = {
  width :  1080 * x,
  height : 1920 * x
}

var globalColors = {
  "yellow" : {
      r : 254,
      g : 241,
      b : 2
  },
  "gray" : {
    r : 26,
    g : 24,
    b : 25
  },
  "white" : {
    r : 255,
    g : 255,
    b : 255
  },
  "black" : {
    r : 0,
    g : 0,
    b : 0
  }
}

//classes instances
var btn, definitionPage, menu, system, sounds;

function mousePressed() {

  if(enableCanvas){
    if(system.checkWordsClick()){
      btn.setColorChange(btn.text,globalColors.yellow)
      btn.setColorChange(btn.outline,globalColors.yellow)
      system.allWords[system.dragId].setPastSpeed()
    }
  }

}

function mouseDragged() {

  if(enableCanvas && system.dragId != null){

      system.allWords[system.dragId].setHover(false)

      if(btn.checkHover()){
        btn.setHover(true, system.allWords[system.dragId].data.palavra )
        system.allWords[system.dragId].setHover(true)
      }else{
        btn.setHover(false)
      }

    }
}

function mouseReleased() {

  if(enableCanvas && system.dragId){

      system.allWords[system.dragId].isBeingDragged = false

      if(system.checkDrag() != null && btn.checkHover()){
        toDefinition = true
        btn.nextPage(() => {
          enableCanvas = false

          definitionPage.init( system.allWords[system.dragId].data, () => {

            setTimeout(() => {
              btn.setColorChange(btn.fill,globalColors.gray)
              menu.init(system.data.menu)
              system.clearDrag()
             }, 300)
          })

        })
      }else{
        btn.setColorChange(btn.text,globalColors.white)
        btn.setColorChange(btn.outline,globalColors.white)
        var id = system.dragId
        system.clearDrag();
        system.allWords[id].getNewSpeed()
      }


  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function startApp() {
  enableCanvas = true
  toDefinition = false
  createCanvas(canvasSize.width, canvasSize.height);
  frameRate(60);
  btn = new inspectionBtn()
  definitionPage = new wordDefinition()
  menu = new menuPage()
  system = new WordSystem(createVector(canvasSize.width/2, canvasSize.height/2 - btn.size.height),selectedData);

  appStart = true

}

function createSelectMenu(){

  var container = document.createElement("div")
  container.id = "selectDataMenu"
  // container.style.display = "flex"
  container.style.width = canvasSize.width + "px"
  document.body.appendChild(container)

  var height = 100

  for (var i = 0; i < data.length; i++) {
    var item = document.createElement("div")
    item.id = i
    item.innerHTML = data[i].nome
    item.style.width = "70%"
    item.style.background = "black"
    item.style.color = "white"
    item.style.marginLeft = "10%"
    item.style.marginTop = "5%"
    item.style.height = height + "px"
    item.style.textAlign = "CENTER"
    item.style.lineHeight = height + "px"
    item.style.fontSize = "30px"
    item.style.fontFamily = "Sohne bold"
    item.onclick = function() {
      console.log(this.parentNode);
      document.body.removeChild(this.parentNode)
      selectedData = data[this.id]
      startApp()
      preload()
    }
    container.appendChild(item)
  }

}
