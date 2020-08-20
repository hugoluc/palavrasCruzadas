//constant definitions

var x = 1
var enableCanvas = false
var toDefinition = false
var selectedData;
var appStart = false

//-------------CONTROLES--------------------



CONTROLS = {

  speedMin : 0.8,
  speedMax : 0.8,
  wordTimeMin : 3000,
  wordTimeMax : 4000,
  growMultiplyer : 0.2,
  maxWodCount : 30,
  sizeTrashhold : 300,
}

var initialWordTimes = {

  wordTimeMin : 3000,
  wordTimeMax : 4000,

}

var realWordTimes = {}
realWordTimes.wordTimeMin = initialWordTimes.wordTimeMin
realWordTimes.wordTimeMax = initialWordTimes.wordTimeMax

//-----------------------------------------


let sohne, sohneBold;

var canvasSize = {
  width :  1080 * x,
  height : 1920 * x
}

//Color Schemes
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
var style = [
{
  "system" : {
    "bg" : globalColors.gray,

    "word" : globalColors.white,
    "selectedWord" : globalColors.yellow,
    "hoverWord" : globalColors.gray,

    "btn" : globalColors.white,
    "selectedBtn" : globalColors.yellow,
    "hoverdBtn" : globalColors.gray,

    "particle" : globalColors.white,
    "selectedParticle" : globalColors.yellow

  },
  "description" : {
    "bg" : globalColors.yellow,
    "contect" : globalColors.gray,
  },
  "menu" : {
    "bg" : globalColors.gray,
    "btn" : globalColors.yellow,
    "menuItem" : globalColors.white,
  },
  "infoPage" : {
    "content" : globalColors.white,
  },
},
{
  "system" : {
    "bg" : globalColors.yellow,

    "word" : globalColors.gray,
    "selectedWord" : globalColors.white,
    "hoverWord" : globalColors.gray,

    "btn" : globalColors.gray,
    "selectedBtn" : globalColors.white,
    "hoverdBtn" : globalColors.gray,

    "particle" : globalColors.gray,
    "selectedParticle" : globalColors.white

  },
  "description" : {
    "bg" : globalColors.yellow,
    "contect" : globalColors.gray,
  },
  "menu" : {
    "bg" : globalColors.gray,
    "btn" : globalColors.yellow,
    "menuItem" : globalColors.white,
  },
  "infoPage" : {
    "content" : globalColors.white,
  },
},

]

var selectedStyle = 0
var selectedselectedStyleColors;
var menuColorStyles = [0,0,0,0,0,0,0,1]

//classes instances
var btn, definitionPage, menu, system, sounds;

//globalFunctions
function mousePressed() {

  if(enableCanvas){
    if(system.checkWordsClick()){
      btn.wordSelected()
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
            btn.setColorChange(btn.text,globalColors.gray,0)
            menu.init(system.data.menu)
            system.clearDrag()
           }, 300)
        })

      })
    }else{
      var id = system.dragId
      btn.wordReleased()
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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
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
  
  
  selectedStyle = 0
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
      
      document.body.removeChild(this.parentNode)
      selectedData = data[this.id]
      selectedStyleColors = style[this.dataset.style]

      startApp()
      preload()

    }

    item.dataset.style = 0
    item.dataset.style = menuColorStyles[i]

    container.appendChild(item)
  }

}

Element.prototype.insertChildAtIndex = function(child, index) {
  if (!index) index = 0
  if (index >= this.children.length) {
    this.appendChild(child)
  } else {
    this.insertBefore(child, this.children[index])
  }
}