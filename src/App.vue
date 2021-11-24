<script lang="ts">
import Vue from "vue";
import AttractScreen from "./pages/AttractScreen.vue";

export default Vue.extend({
  name: "WalletExplorer",
  components: {
    AttractScreen
  }
});
</script>

<template>
  <div id="app">
    <attract-screen />
  </div>
</template>

<style>
html {
  font-size: 16px;
}

body {
  height: 100%;
}

hr {
  border: 0;
  clear: both;
  display: block;
  width: 95%;
  background-color: #7c73cb;
  height: 1px;
}

#app {
  background: #000000
    url("https://solana.com/static/d6ab3ce99c22bc21d77d935142b9f8d1/0e783/index_scale_adoption.png");
  padding: 2rem;
}
</style>
