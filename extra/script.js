const csv = require('csvtojson')
const fs = require("fs")

var names = [
  "Línguas Indígenas Tupinambá",
  "Línguas indígenas hoje",
  "Espanhol",
  "Línguas Africanas I KIKONGO ",
  "Línguas Aficanas II e Yorubá",
  "Inglês e Francês",
  "Línguas de imigrantes",
  "Português no mundo",
]

var index = 0
var allData = {}

// var csvFilePath = "../" + names[0] + ".csv"
getWords(index)


function getWords() {

  console.log(index);
  var csvFilePath = "CSVs/"+ index + ".csv"

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

    allData[names[index]] = { palavras : palavras }

    if(index < names.length-1){
      index++
      getWords()
    }else{
      saveData()
    }

  })
}


function saveData() {

  var data = 'var data = ' + JSON.stringify(allData, null, 1)

  fs.writeFile("../data.js", data, 'utf8', function(error){
    console.log(error)
  })

}
