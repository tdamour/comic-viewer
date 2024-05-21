<template>
<Transition name="fade">
  <div id="episodeHolderDiv" ref="episodeHolderDiv" v-if="episodeNum == selectedEpisodeId">
    <div v-for="page in pagesArray" :key="page.episodePageNum">
      <ComicPage :page="page" />
    </div>

    <div class="container-fluid row d-flex justify-content-center">
      <div class="col-6" v-if="episodeNum != 1">
        <button value="prev" ref="prevEpBtn" id="prevEpBtn" @click="turnPageAction($event)" class="btn btn-primary w-100 p-3 fs-1 directBtns">
          Prev
        </button>
      </div>

      <div class="col-6">
        <button value="next" ref="nextEpBtn" id="nextEpBtn" @click="turnPageAction($event)" class="btn btn-primary w-100 p-3 fs-1 directBtns">
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
       pagesArray: []
      }
  },
  components:{
    ComicPage
  },
  methods:{
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
    },
    turnPageAction(e){
      this.$emit('update-episode', e, this.episodeNum);
    }
  },
  beforeMount () {
    this.callPage(this.episodeNum);
  }
};
</script>

<style>
  #episodeHolderDiv{
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