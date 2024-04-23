<template>
  <header id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
             <router-link to="/">Home</router-link>
        </li>
        <li class="nav-item">
         <router-link to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</header>
</template>

<script>
export default {
  name: "Navbar",
}
</script>

<style>
  #nav{
    background: yellow;
    font-size: 1rem;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 2rem; 
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>