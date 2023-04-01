AFRAME.registerComponent("cursor-listener",{
    init: function () {
        if(this.el.getAttribute("visible") == true){
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
        this.handleClickEvents();            
        }
      },
    schema:{
        selectedItemId: {default:"", type:"string"}
    },

    handlePlaceListState: function(){
        const id = this.el.getAttribute("id");
        const postersId = ["poster_1", "poster_2", "poster_3","poster_4"];

        if (postersId.includes(id)){
            const posterContainer = document.querySelector("#posters-container");
            posterContainer.setAttribute("cursor-listener", {
                selectedItemId: id
            });
            this.el.setAttribute("material",{
                color: "#fff",
                opacity: 10
            });
            const cursorEl = document.querySelector("#camera-cursor");
            cursorEl.setAttribute("material",{color: "orange"});
            cursorEl.setAttribute("scale", "2 2 1");
            cursorEl.setAttribute("geometry", {radiusInner: 0.005})
        }
    },

    handleMouseEnterEvents: function(){
        this.el.addEventListener("mouseenter", ()=>{
            this.handlePlaceListState()
        });
    },

    handleMouseLeaveEvents: function(){
        this.el.addEventListener("mouseleave",()=>{
            const {selectedItemId} = this.data;
            if (selectedItemId){
                const el = document.querySelector(`#${selectedItemId}`);
                const id = el.getAttribute("id");
                if (id == selectedItemId){
                    el.setAttribute("material",{
                        color: "#000",
                        opacity: 0.3
                    });
                    const cursorEl = document.querySelector("#camera-cursor");
                    cursorEl.setAttribute("material",{color: "black"});
                    cursorEl.setAttribute("scale", "1 1 1")
                    cursorEl.setAttribute("geometry", {radiusInner: 0.04})
                }
            }
        })
    },

    handleClickEvents: function(){
        this.el.addEventListener("click", e =>{
          const placesContainer = document.querySelector("#posters-container")
          const {state} = placesContainer.getAttribute("poster");
          if (state === "posters-list"){
            const id = this.el.getAttribute("id");
            const postersId = ["poster_1", "poster_2", "poster_3", "poster_4"];
            if(postersId.includes(id)){
              const fadeEl = document.querySelector("#fadeBackground")
              const cursorEl = document.querySelector("#camera-cursor")
              cursorEl.setAttribute("visible", false)
              cursorEl.setAttribute("position", "0 0 1")

              if (!fadeEl.getAttribute("visible")){
                fadeEl.setAttribute("visible", true)
              }
              console.log(id)
              placesContainer.setAttribute("poster",{
                state: "view",
                selectedCard: id
              })
            }
          }
        })
      }


})