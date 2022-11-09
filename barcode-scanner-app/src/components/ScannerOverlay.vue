<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    style="max-width: 400px; max-height: 400px"
    @click:outside="close()"
  >
    <v-card>
      <video id="video"></video>
      <v-card-actions class="closeBtn">
        <v-btn icon="mdi-close-circle" @click="close()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScannerOverlay",
  emits: ["update"],
  props: ["showDialog", "scannerControls"],
  data() {
    return {
      dialog: this.showDialog,
    };
  },
  watch: {
    showDialog: function (newValue: boolean) {
      this.dialog = newValue;
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit("update", false);
      this.scannerControls.stop();
    },
  },
});
</script>
<style scoped lang="scss">
.closeBtn {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
