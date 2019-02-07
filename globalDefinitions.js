//constant definitions

var x = 1
var enableCanvas = true
var toDefinition = false
var selectedData = data[0]


//-------------CONTROLES--------------------

CONTROLS = {

  speedMin : 1,
  speedMax : 1.5,
  wordTimeMin : 1000,
  wordTimeMax : 5000,
  growMultiplyer : 0.15,
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
  }
}

//classes instances
var btn, definitionPage, menu, system, sounds;

function mousePressed() {

  if(enableCanvas){
    system.checkWordsClick()
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
            btn.toBlack()
            setTimeout(() => { menu.init(system.data.menu) }, 300)
          })

        })

      }else{
        system.clearDrag();
      }

  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
