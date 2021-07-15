//Array of words in the words system
var words = [];

function preload(){

  sohne = loadFont('/Sohne/Sohne-Mager.otf');
  sohneBold = loadFont('/Sohne/Sohne-Halbfett.otf');
  ogum = loadFont('/Ogum/ogum.otf');
  ogumBold = loadFont('/Ogum/ogumbold.otf');
  if(selectedData){
    for(i = 0; i <selectedData.palavras.length; i++){
      selectedData.palavras[i].audioObj = selectedData.palavras[i].audio ? loadSound( "/audios/" + selectedData.palavras[i].audio) : ""
      selectedData.palavras[i].audioOriginalObj = selectedData.palavras[i].audioOriginal ? loadSound( "/audios/" + selectedData.palavras[i].audioOriginal) : ""
    }
  }

}


function setup() {
  createSelectMenu()
  selectExp()
}


function draw() {

  if(appStart){

    if(doFirstDraw){
      doFirstDraw = system.firstDraw()
    }
    
    background(selectedStyleColors.system.bg.r,selectedStyleColors.system.bg.g,selectedStyleColors.system.bg.b);

    if(enableCanvas && !toDefinition){
      system.run();
    }

    btn.show()
  }

}