<template>
  <div class="row">
    <div class="col-sm-0 col-md-1"></div>
    <div class="col-sm-12 col-md-10">
      <div class="container-fluid w-100 comicPageHolderDiv">
        <img class="comicPage" :src="this.image" />
      </div>
    </div>
    <div class="col-sm-0 col-md-1"></div>
  </div>
  
</template>

<script>
export default {
  props: ["page"],
  name: "ComicPage",
  data(){
    return{
      id: this.page.id,
      image: this.page.imagePath
    }
  }
}
</script>

<style>
  .comicPage{
    width: 100%;
    margin: 0 auto; 
  }

  .comicPageHolderDiv{ 
    margin-bottom: 20px;
    margin-bottom: 10px; 
    width: 100%;
  }
</style>