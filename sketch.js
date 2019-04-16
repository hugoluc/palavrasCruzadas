//Array of words in the words system
var words = [];

function preload(){

  sohne = loadFont('Sohne/Sohne-Mager.otf');
  sohneBold = loadFont('Sohne/Sohne-Halbfett.otf');
  if(selectedData){
    for(i = 0; i <selectedData.palavras.length; i++){
      selectedData.palavras[i].audioObj = selectedData.palavras[i].audio ? loadSound( "audios/" + selectedData.palavras[i].audio) : ""
      selectedData.palavras[i].audioOriginalObj = selectedData.palavras[i].audioOriginal ? loadSound( "audios/" + selectedData.palavras[i].audioOriginal) : ""
    }
  }

}


function setup() {
  createSelectMenu()
}


function draw() {


  if(appStart){
    background(selectedStyleColors.system.bg.r,selectedStyleColors.system.bg.g,selectedStyleColors.system.bg.b);

    if(enableCanvas && !toDefinition){
      system.run();
    }

    btn.show()
  }

}
