<template>
<Transition name="fade">
  <div id="episodeHolderDiv" ref="episodeHolderDiv" v-if="episodeNum == selectedEpisodeId">
    <div v-for="page in pagesArray" :key="page.episodePageNum">
      <ComicPage :page="page" />
    </div>

    <div class="container-fluid row d-flex justify-content-center">
      <div class="col-6" v-if="episodeNum != 1">
        <button value="prev" ref="prevEpBtn" id="prevEpBtn" @click="episodeAction($event)" @keyup.left="episodeAction($event)" class="btn btn-primary w-100 p-3 fs-1 directBtns">
          Prev
        </button>
      </div>

      <!-- v-if="episodeNum != latestEpisode[0].id" v-show="episodeNum != latestEpisode[0].id" -->
      <!--  @keydown="episodeActionKey($event)"  -->
      <div class="col-6" v-if="episodeNum != 3">
        <button value="next" ref="nextEpBtn" id="nextEpBtn" @click="episodeAction($event)" @keyup.left="episodeAction($event)" class="btn btn-primary w-100 p-3 fs-1 directBtns">
          Next
        </button>
      </div>
    </div>

  </div>
</Transition>
</template>

<script>
import ComicPage from '../components/ComicPage.vue'

// TRANSITIONS! 
export default {
  props: ["episodeNum", "selectedEpisodeId","latestEpisode"],
  name: "ComicEpisode",
  data(){
    return {
       keypressed: "",
       pagesArray: []
      }
  },
  components:{
    ComicPage
  },
  methods:{
    episodeAction(e){
      e.preventDefault(); 
      if (e.type === 'click') {
        let turnPageStatus = e.target.value; 
        this.$emit('update-episode',this.episodeNum, turnPageStatus)
      }
    },
    episodeActionKey(e){

      e.preventDefault(); 

      let turnPageStatus;
      try {
          // left arrow action 
          if (e.type === 'keydown' && e.keyCode === 37) 
          {
            turnPageStatus = "prev";
          }
          // right arrow action 
          else if (e.type === 'keydown' && e.keyCode === 39) 
          {
            turnPageStatus = "next";
          }

            if(this.episodeNum == this.selectedEpisodeId)
            {
              console.log("Test => turnPageStatus: " + turnPageStatus + " and EpisodeNum: " + this.episodeNum)
              return this.$emit('update-episode',this.episodeNum, turnPageStatus)
            }
      }
      catch(error){
        console.log(error);
      }
    },
    callPage(id){
      try {
        fetch(`${process.env.VUE_APP_URL}/api/comic/episode/pages/${id}`)
        .then(res => res.json())
        .then(data => this.pagesArray = data)
        .catch(err => console.log(err.message))
      }
      catch(error){
        console.log(error);
      }
    }
  },
  mounted(){
    // console.log("LATEST EPISODE ====V"); 
    // if(this.latestEpisode[0].id != null || this.latestEpisode[0].id != undefined){
    //   console.log(this.latestEpisode[0].id); 
    // }

    // call page with episode num 
    this.callPage(this.episodeNum)
    // initialize key down action for directional key actions... 
    // window.addEventListener('keydown', this.episodeAction);
    
    window.addEventListener('keyup', function(event) {
      if (event.type === 'keyup' && e.keyCode === 37 || event.type === 'keyup' && e.keyCode === 39) { 
        this.episodeAction(event); 
      }
    });

  },
};
</script>

<style>
  #episodeHolderDiv{
    /* background: #BEBEBE;  */
    background: #000; 
    padding: 10px 5px; 
    margin: 15px 0; 
  }

  /* Transitions CSS */
  /* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>