const csv = require('csvtojson')
const fs = require("fs")

var allData = []
var names = [
  "Línguas Indígenas Tupinambá",
  "Línguas indígenas hoje",
  "Espanhol",
  "Línguas Africanas I KIKONGO ",
  "Línguas Aficanas II e Yorubá",
  "Inglês e Francês",
  "Português no mundo",
]
for (var i = 0; i < names.length; i++) {
  allData[i] = { nome : names[i] }
}

var index = 0
var menuIndex = 0
var wordsDone = false
var menuDone = false
getWords()
getMenus()

function getWords() {
  var csvFilePath = "palavras/"+ index + ".csv"

  //readFile---------------------------------------------------------
  csv().fromFile(csvFilePath).then((jsonObj) => {

    var palavras = []

    for (var l = 0; l < jsonObj.length; l++) {
      var palavra = {}
      palavra.origem = "OUTRA LINGUA"
      palavra.palavra = jsonObj[l]["Palavra PT"]
      palavra.significado = jsonObj[l]["Significado PT"]
      palavra.audio = jsonObj[l]["Audio PT"]

      palavra.tradução = jsonObj[l]["Palavra Original"]
      palavra.significadoOriginal = jsonObj[l]["Significado Original"]
      palavra.audioOriginal = jsonObj[l]["Audio Original"]
      palavras.push(palavra)
    }

    allData[index].palavras = palavras

    if(index < names.length-1){
      index++
      getWords()
    }else{
      wordsDone = true
      saveData()
    }
  })
}




function getMenus() {
  var csvFilePath = "menus/"+ menuIndex + ".csv"
  console.log(menuIndex);
  //readFile---------------------------------------------------------
  csv().fromFile(csvFilePath).then((jsonObj) => {

    var menu = []
    console.log(jsonObj[0]);

    for (var l = 0; l < jsonObj.length; l++) {
      if(jsonObj[l]["titulo"] != ""){
        var item = {}
        item.titulo = jsonObj[l]["titulo"]
        item.text = jsonObj[l]["texto"]
        item.imagens = jsonObj[l]["imagens"].split(",")
        menu.push(item)
      }
    }

    allData[menuIndex].menu = menu

    if(menuIndex < names.length-1){
      menuIndex++
      getMenus()
    }else{
      menuDone = true
      saveData()
    }
  })
}


function saveData() {

  if(!menuDone || !wordsDone ) return

  var data = 'var data = ' + JSON.stringify(allData, null, 1)

  fs.writeFile("../data.js", data, 'utf8', function(error){
    console.log(error)
  })

}
