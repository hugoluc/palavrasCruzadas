function menuPage(){

  this.yellow = [globalColors.yellow.r,globalColors.yellow.g,globalColors.yellow.b]
  this.alpha = 1
  this.margin = canvasSize.height * 0.08
  this.infoPage = new aditionalInfoPage()

  this.container = document.createElement("div")
  this.container.id = "menu_container"
  this.container.style.position = "absolute"
  this.container.style.top = "0px"
  this.container.style.left = "0px"
  this.container.style.display = "none"
  this.enableBackBtn = true
  document.body.append(this.container)

  var btnSize = {
    width : canvasSize.width - (2 * this.margin ),
    height : canvasSize.height * 0.09,
  }

  this.backBtn = document.createElement("button")
  this.backBtn.style.width = btnSize.width + "px"
  this.backBtn.style.height = btnSize.height + "px"
  this.backBtn.style.top = this.margin + "px"
  this.backBtn.style.left = this.margin + "px"
  this.backBtn.style.position = "absolute"
  this.backBtn.style.borderRadius = btnSize.height + "px"
  this.backBtn.style.borderColor = "rgba(" + this.yellow[0] + "," + this.yellow[1] + "," + this.yellow[2] + "," + this.alpha + ")"
  this.backBtn.style.border = btnSize.height * 0.06 + "px solid";
  this.backBtn.style.fontSize = btnSize.height * 0.35 + "px"
  this.backBtn.style.color = "rgba(" + this.yellow[0] + "," + this.yellow[1] + "," + this.yellow[2] + "," + this.alpha + ")"
  this.backBtn.style.transition = "opacity 1s"
  this.backBtn.style.opacity = 0
  this.backBtn.innerHTML = "Explorar mais palavras"
  this.backBtn.id = "menu_backBtn"
  
  
  this.backBtn.onclick = () => {
    this.toWordsPage()
  }
  this.container.append(this.backBtn)

  this.itemHeight = canvasSize.height * 0.08
  this.marginBottom = 50

  var topOffset = canvasSize.height - (selectedData.menu.length * this.itemHeight) - btnSize.height - (this.margin*1.6)
  this.menuItems = []
  this.menuItemContainer = document.createElement("div")
  this.menuItemContainer.id = "menuItem_container"
  this.menuItemContainer.style.position = "absolute"
  this.menuItemContainer.style.top = -topOffset + "px"
  this.container.append(this.menuItemContainer)


  for(var i = 0; i < selectedData.menu.length; i++){

    var _this = this

    var item = {};
    item.id = i
    
    item.container = document.createElement("div")
    item.container.style.top = (canvasSize.height - this.marginBottom) - ( this.itemHeight * (selectedData.menu.length-i-1) ) + "px"
    item.container.style.position = "absolute"
    item.container.id = i
    item.container.className = "menuItem"
    item.container.style.opacity = 0
    item.container.style.color = "white"
    item.container.style.display = "none"
    item.container.style.width = canvasSize.width + "px"
    item.container.style.paddingLeft = this.margin + "px"
    item.container.style.height = this.itemHeight + "px"
    item.container.style.alignItems = "center"
    item.container.onclick = function() {
      _this.toInfoPage(this.id)
    }

    item.icon = document.getElementById("icon_svg").cloneNode(true)

    item.icon.style.display = "block"
    item.icon.style.width = this.itemHeight * 0.5 + "px"
    item.icon.style.height = this.itemHeight * 0.5 + "px"
    item.container.append(item.icon)

    item.text = document.createElement("div")
    item.text.innerHTML = "teste"
    item.text.style.fontSize = this.itemHeight * 0.3 + "px"
    item.text.style.marginLeft = this.itemHeight * 0.2 + "px"
    item.container.append(item.text)

    this.menuItems.push(item)
    this.menuItemContainer.append(item.container)
  }

    this.reset()

}

menuPage.prototype.init = function(_data){
  
  this.enableBackBtn = true;
  this.container.style.display = "block"
  this.data = _data

  var animationSetupTime = 100
  animating = true
  setTimeout( ()=> {
    console.log("INITIATE MENU ANIMATION");
    this.animateMenus()
  }, animationSetupTime)
  currentPage = this

  setTimeout( ()=> { 
    console.log("ALLOW ANIMATION");
    animating = false 
  }, 600 )

}

menuPage.prototype.animateMenus = function() {
     
    var delay = 0.04
    this.backBtn.style.opacity = 1
    this.backBtn.style.transitionDelay = "translateY(0px)"
    this.backBtn.style.opacity = 1

    for(var i = 0; i < this.data.length; i++){
      this.menuItems[i].container.style.display = "flex"
      this.menuItems[i].data = this.data[i]
      this.menuItems[i].text.innerHTML = this.data[i].titulo
    }

    setTimeout( () => {
      for(var i = 0; i < this.data.length; i++){
        var element = this.menuItems[i]
        element.container.style.transition = "opacity 0.8s, transform 1s cubic-bezier(0, 1, 0, 1)"
        element.container.style.transform = "translateY(-" + this.itemHeight + "px)"
        element.container.style.opacity = 1
        element.container.style.transitionDelay = (this.data.length * delay) - (i * delay) + "s"
      }
    },50)

}

menuPage.prototype.reset = function(){
  
  var animationTime = 0.3
  var delay = 0.04
  this.backBtn.style.opacity = 0
  this.backBtn.style.transitionDelay = "translateY(-10px)"

  for(var i = 0; i < selectedData.menu.length; i++){
    this.menuItems[i].container.style.transitionDuration = animationTime + "s , 1.5s "
    this.menuItems[i].container.style.transitionTimingFunction = "ease, ease"
    this.menuItems[i].container.style.opacity = 0
    this.menuItems[i].container.style.transform = "translateY(0px)"
    this.menuItems[i].container.style.transitionDelay = (selectedData.menu.length * delay) - (i * delay) + "s"
  }

  setTimeout(() => {
    if(this.enableBackBtn) return
    this.container.style.display = "none"
  }, 5000)

}

menuPage.prototype.toInfoPage = function(_data){
  

  if(!this.enableBackBtn) return
  if(animating) return

  this.enableBackBtn = false
  animating = true

  var _this = this
  this.reset()
  setTimeout( () => {
    animating = false
    this.infoPage.init(this.data[_data], () => { _this.init(_this.data) })
  },200)

}

menuPage.prototype.toWordsPage = function(_data){


  if(!this.enableBackBtn) return
  if(animating) return

  console.log("---------------TO WORDS------------");

  animating = true
  this.enableBackBtn = false
  enableCanvas = true
  toDefinition = false
  
  realWordTimes.wordTimeMin = initialWordTimes.wordTimeMin
  realWordTimes.wordTimeMax = initialWordTimes.wordTimeMax

  this.reset()

  setTimeout(() =>
   {
    animating = false
    definitionPage.reset()
    btn.setColorChange(btn.fill,globalColors.yellow)
    btn.setReturn()
    doFirstDraw = true
  },600)

} 