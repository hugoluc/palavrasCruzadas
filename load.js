function loadImages(){
  for(i = 0; i <selectedData.menu.length; i++){
    for(j = 0; j <selectedData.menu[i].imagens.length; j++){

      var res = document.createElement("link")
      res.rel = "preload"
      res.as = "image"
      res.href = "imagens/" +selectedData.menu[i].imagens[j]
      document.head.appendChild(res)
    }
  }
}

function loadAudios(){
  for(i = 0; i <selectedData.palavras.length; i++){

    var res = document.createElement("link")
    res.rel = "preload"
    res.as = "audio"
    res.href = "audios/" +selectedData.palavras[i].audio
    document.head.appendChild(res)

    var res = document.createElement("link")
    res.rel = "preload"
    res.as = "audio"
    res.href = "audios/" +selectedData.palavras[i].audioOriginal
    document.head.appendChild(res)


}


loadAudios()
loadImages()
