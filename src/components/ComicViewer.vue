<template>
  <div id="comicViewer">
     <div class="container-fluid row my-2" id="menu" v-show="selectedEpisodeId == 0">
      <div class="col-sm-12 col-md-6 mt-1">
        <button value="1" class="btn btn-success w-100 p-3 fs-1" @click="onSelectEpisodeClick($event)">Episode 1</button>
      </div>
      <div class="col-sm-12 col-md-6 mt-1">
        <button value="2" class="btn btn-success w-100 p-3 fs-1" @click="onSelectEpisodeClick($event)">Episode 2</button>
      </div>
    </div>
    <div class="container-fluid row my-2" id="menu" v-show="selectedEpisodeId == 0">
      <div class="col-sm-12 col-md-6 mt-1">
        <button value="3" class="btn btn-success w-100 p-3 fs-1" @click="onSelectEpisodeClick($event)">Episode 3</button>
      </div>
    </div>
    <div class="container-fluid row" id="menu" v-show="selectedEpisodeId != 0">
      <div class="col-sm-12 col-md-6">
        <button value="0" class="btn btn-success w-100 p-3 fs-1" @click="onSelectEpisodeClick($event)">Return to Menu</button>
      </div>
      <div class="col-sm-12 col-md-6">
      </div>
    </div>
      <div v-for="episode in comic[0]" :key="episode.id" class="w-100">
        <ComicEpisode :episodeNum="episode.id" :selectedEpisodeId="selectedEpisodeId" @update-episode="onPageAction" :latestEpisode="latestEpisode"/>
      </div>   
  </div>
</template>

<script>
 import ComicEpisode from './ComicEpisode.vue'
 
export default { 
  name: "ComicViewer",
  data(){
    return {
      comic:[],
      selectedEpisodeId: 0,
      latestEpisode: [],
      mobileVersion: true
    }
  },
  components: {
    ComicEpisode
  },
  computed:{

  },
  methods: {
    scrollToTop() {
      window.scrollTo(0,0);
    },
   onSelectEpisodeClick: function (e)
    {
      this.selectedEpisodeId = e.target.value; 
      return this.selectedEpisodeId; 
    },
    onPageAction(episodeNum, turnPageStatus)
    {
        if(this.mobileVersion == true){
          this.onPageActionMobileVersion(episodeNum, turnPageStatus)
        }
    },
    onPageActionMobileVersion(episodeNum, turnPageStatus)
    {
      // latest episode set up 
        this.latestEpisode = this.comic[0].slice(-1);   
        let latestEpisodeId = this.latestEpisode[0].id;

      // Next 
      if(turnPageStatus == "next")
      {
        episodeNum++;

        if(!(episodeNum >= latestEpisodeId)){ this.scrollToTopOfPage(episodeNum); } 
        else 
        {   
          if(episodeNum == latestEpisodeId){ this.scrollToTopOfPage(episodeNum); }
          else
          {
            Swal.fire({
                title: 'AW SHUCKS & CANDY CANES',
                text: 'YOU HAVE REACH THE LATEST EPISODE!',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
          }
        }
        return this.selectedEpisodeId; 
      }

      // Previous
      else if(turnPageStatus == "prev")
      {
         episodeNum--; 
         if(episodeNum != 0) { this.scrollToTopOfPage(episodeNum); return this.selectedEpisodeId; }
         else
         {
           Swal.fire({
                title: 'AW SHUCKS & CANDY CANES',
                text: 'SORRY YOU HAVE REACH THE BEGINNING OF THE COMIC',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
         }
      }
    },
    scrollToTopOfPage(episodeNum)
    {
      this.selectedEpisodeId = episodeNum;
      this.scrollToTop(); 
    },
    getAllOfComic(){
      try{
        fetch(`${process.env.VUE_APP_URL}/api/comic`)
        .then(res => res.json())
        .then(data => this.comic = data)
        .catch(err => console.log(err.message))
      }
      catch(error){console.log(error);}
    },
    getLatestEpisode(){
      try {
        // console.log("LATEST EPISODE ID ===V"); 
        // console.log(this.comic[0].slice(-1)); 
        // fetch(`${process.env.VUE_APP_URL}/api/comic/episode/latest`)
        // .then(res => res.json())
        // .then(data => this.latestEpisode = data)
        // .catch(err => console.log(err.message))
        // this.latestEpisode = this.comic[0].slice(-1); 
      }
      catch(error) {console.log(error);}
    },
  },
  mounted(){
    // mounted hooks
    this.getAllOfComic();
  }
}
</script>