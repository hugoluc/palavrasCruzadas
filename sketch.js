//Array of words in the words system
var words = [];

function preload(){

  sohne = loadFont('Söhne/Söhne-Mager.otf');
  sohneBold = loadFont('Söhne/Söhne-Halbfett.otf');
  for(i = 0; i <selectedData.palavras.length; i++){
   selectedData.palavras[i].audioObj = loadSound( "audios/" +selectedData.palavras[i].audio)
   selectedData.palavras[i].audioOriginalObj = loadSound( "audios/" +selectedData.palavras[i].audioOriginal)

  }

}


function setup() {
  createSelectMenu()
}


function draw() {

  if(appStart){
    background(26, 24, 25);

    if(enableCanvas && !toDefinition){
      system.run();
    }x
    btn.show()
  }

}
