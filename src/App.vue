<template>
  <div id="app" class="bs-component">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">NYC Building Data Analyzer</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor03">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item"><router-link class="nav-link" to="/">Permit Data</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/forecast">Price Forecast</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
      </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>

</style>
