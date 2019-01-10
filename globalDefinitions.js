//constant definitions

var x = 1
var enableCanvas = true

var canvasSize = {
  width : 800 * x,
  height : 1280 * x
}

var globalColors = {
  "yellow" : {
      r : 254,
      g : 241,
      b : 2
  }
}

//classes instances
var btn, definitionPage, menu, system;

function mousePressed() {

  if(enableCanvas){
    system.checkWordsClick();
  }

}

function mouseDragged() {

  if(enableCanvas){
    if(btn.checkHover() && system.dragId != null){
      btn.setHover(true, system.words[system.dragId].data.palavra )
    }else{
      btn.setHover(false)
    }
  }

}

function mouseReleased() {
  if(enableCanvas){

    if (system.dragId) system.words[system.dragId].isBeingDragged = false

    console.log(system.dragId, btn.checkHover())

    if(system.checkDrag() != null && btn.checkHover()){

      btn.nextPage(() => {

        enableCanvas = false
        definitionPage.init( system.words[system.dragId].data, () => {

          btn.toBlack()
          setTimeout(() => { menu.init(data.menu) }, 300)

        })
      })

    }else{
      system.clearDrag();
    }

  }

}
