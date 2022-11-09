<template>
  <v-no-ssr>
    <v-layout>
      <v-app-bar color="grey-lighten-2">
        <span class="header-text">Barcode scanner app</span>
      </v-app-bar>
      <BarcodeScanner />
    </v-layout>
  </v-no-ssr>
</template>

<script lang="ts">
import BarcodeScanner from "./components/BarcodeScanner.vue";
import "@mdi/font/css/materialdesignicons.css";

export default {
  name: "App",
  components: {
    BarcodeScanner,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header-text {
  margin-left: 20px;
  font-weight: bold;
}
</style>
