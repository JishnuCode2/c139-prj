AFRAME.registerComponent("poster",{

  schema: {
    state: {type: "string", default: "posters-list"},
    selectedCard: {type: "string", default: "#poster_1"}
  },

  init: function(){
    this.placeContainer = this.el;
    this.createCards()
  },

  createCards: function(){
    const postersRef = [
      {
        id: "poster_1",
        url: "assets/posters/poster_1_img.jpeg" 
      },
      {
        id: "poster_2",
        url: "assets/posters/poster_2_img.jpeg"
      },
      {
        id: "poster_3",
        url: "assets/posters/poster_3_img.jpeg"
      },
      {
        id: "poster_4",
        url: "assets/posters/poster_4_img.jpeg"
      }
    ]

    var previousXPosition = -88
    for (var item of postersRef){
         const posX = previousXPosition + 35;
         const posY = 0;
         const posZ = -40;
         const position = {x:posX, y:posY, z:posZ};
         previousXPosition = posX;

         const poster = this.createThumbNail(item);

         const borderEl = this.createBorder(position, item.id, true);
         borderEl.appendChild(poster);

         this.placeContainer.appendChild(borderEl);
    }
  },

  createBorder: function(position, id, cursor){
    const elementEl = document.createElement("a-entity");

    elementEl.setAttribute("position", position);
    elementEl.setAttribute("material", {
      color: "#000000",
      opacity: "0.3"
    });
    elementEl.setAttribute("geometry",{
      primitive: "plane",
      width: 29,
      height: 36
    });
    if(cursor != false){
      elementEl.setAttribute("cursor-listener",{})
      elementEl.setAttribute("id", id);
    }else{
      elementEl.setAttribute("scale", "0.02 0.02 1")
    }

    return elementEl
  },

  createThumbNail: function(item){
    const elementEl = document.createElement("a-entity");
    elementEl.setAttribute("visible", true)
    elementEl.setAttribute("geometry", {
      primitive: "plane",
      width: 28,
      height: 35
    });
    elementEl.setAttribute("material",{src: item.url})

    return elementEl
  },

  showCardData: function(card){
     console.log(card)
     const postersRef = [
      {
        id: "poster_1",
        url: "assets/posters/poster_1_img.jpeg" 
      },
      {
        id: "poster_2",
        url: "assets/posters/poster_2_img.jpeg"
      },
      {
        id: "poster_3",
        url: "assets/posters/poster_3_img.jpeg"
      },
      {
        id: "poster_4",
        url: "assets/posters/poster_4_img.jpeg"
      }
    ]

    for (var item of postersRef){
     if(item.id == card){
     const posX = 0
     const posY = 0;
     const posZ = -0.5;
     const position = {x:posX, y:posY, z:posZ};

     const poster = this.createThumbNail(item);

     const borderEl = this.createBorder(position, item.id, false);
     borderEl.appendChild(poster);
     
     const cameraEl = document.querySelector("#camera")
     cameraEl.appendChild(borderEl);
     console.log(item)
     }
    }
  },

  tick: function(){
    const {state, selectedCard} = this.el.getAttribute("poster");
    if (state == "view"){
       this.showCardData(selectedCard)
       this.data.state = null
    }
  }

})