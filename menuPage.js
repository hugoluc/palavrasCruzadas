function menuPage(){

  this.backBtn = document.createElement("div")
  this.menuItems = []

  this.menuItemContainer = document.createElement("div")

  this.itemHeight = canvasSize.height / 10

  for(var i = 0; i < 7; i++){
    var item = {};
    item.container = document.createElement("div")
    item.container.style.display = "none"
    item.container.style.position = "absolute"
    item.container.style.top = canvasSize.height - ( this.itemHeight * i )
    item.icon = document.createElement("div")
    item.text = document.createElement("div")
    this.menuItems.push(item)
  }

}


menuPage.prototype.init = function(_data){

  var delay = 0.3

  for(var i = 0; i < _data.length; i++){
    this.menuItems[i].text = _data[i].titulo
    this.menuItems[i].container.style.top = canvasSize.height - ( this.itemHeight * (i + 1) )
    this.menuItems[i].container.animationDelay = (_data.length * delay) - (i * delay)

  }

}
