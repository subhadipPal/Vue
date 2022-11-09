<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    style="max-width: 400px; max-height: 400px"
  >
    <v-card>
      <video id="video"></video>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
export default {
  name: "ScannerOverlay",
  props: {
    showDialog: Boolean,
  },
};
</script>
<style lang=""></style>
