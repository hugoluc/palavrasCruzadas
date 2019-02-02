function loadImages(){
  for(i = 0; i < data.menu.length; i++){
    for(j = 0; j < data.menu[i].imagens.length; j++){

      var res = document.createElement("link")
      res.rel = "preload"
      res.as = "image"
      res.href = "imagens/" + data.menu[i].imagens[j]
      document.head.appendChild(res)
    }
  }
}

function loadAudios(){
  for(i = 0; i < data.palavras.length; i++){

    var res = document.createElement("link")
    res.rel = "preload"
    res.as = "audio"
    res.href = "audios/" + data.palavras[i].audio
    document.head.appendChild(res)

    var res = document.createElement("link")
    res.rel = "preload"
    res.as = "audio"
    res.href = "audios/" + data.palavras[i].audioOriginal
    document.head.appendChild(res)


}


loadAudios()
loadImages()
