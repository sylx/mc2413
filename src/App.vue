<template>
  <div id="app">
    <div>
      <b-navbar class="mb-2" type="dark" variant="dark">
        <b-navbar-brand>MC2413</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*   color: #2c3e50; */
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Engine from "./lib/engine.js";

const engine = new Engine();
import sample from "../examples/ff3.mml";

export default {
  name: "app",
  mounted() {
    engine.connectStore(this.$store);
    this.$store.dispatch("engine/changeMML", sample);
  }
};
</script>
