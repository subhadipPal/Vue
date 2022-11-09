<template>
  <div class="container">
    <div class="body-header">
      <span class="scan-title">Scanned Barcodes</span>
      <v-btn class="scan-button" variant="outlined" @click="openOverlay()"
        >Add Barcode</v-btn
      >
    </div>
    <ScannerOverlay :showDialog="isOverlayActive" />
    <div
      class="barcode-list"
      :style="scannedBarcodes.length === 0 ? 'display: none' : 'display: block'"
    >
      <v-list lines="one">
        <template v-for="(item, index) in scannedBarcodes" :key="item">
          <div class="barcode-list-item">
            <v-list-item
              :title="item"
              style="width: 80%; text-align: start"
            ></v-list-item>
            <v-btn variant="plain" @click="removeScannedCode(index)"
              >Delete</v-btn
            >
          </div>
          <v-divider
            v-if="index !== scannedBarcodes.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScannerOverlay from "./ScannerOverlay.vue";
import { BrowserMultiFormatReader } from "@zxing/browser";
const codeReader = new BrowserMultiFormatReader();

export default defineComponent({
  name: "BarcodeScanner",
  components: {
    ScannerOverlay,
  },
  data(): {
    isOverlayActive: boolean;
    scannedBarcodes: Array<string>;
  } {
    return {
      isOverlayActive: false,
      scannedBarcodes: [],
    };
  },
  methods: {
    removeScannedCode(index: number) {
      this.scannedBarcodes.splice(index, 1);
    },
    openOverlay() {
      this.isOverlayActive = !this.isOverlayActive;
      if (this.isOverlayActive) {
        setTimeout(async () => {
          const videoEle = document.getElementById("video");

          await codeReader.decodeFromVideoDevice(
            undefined,
            videoEle as HTMLVideoElement,
            (result, err, controls) => {
              if (result) {
                this.scannedBarcodes.push(result?.getText());
                console.log(this.scannedBarcodes);
                controls.stop();
                this.isOverlayActive = false;
              }
            }
          );
        }, 1);
      }
    },
  },
});
</script>

<style lang="scss">
.container {
  display: block;
  margin: auto;
  width: 100%;
}

.body-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
}
.scan-title {
  width: 80%;
  text-align: start;
}
.scan-button {
  margin-left: 20px;
}
.barcode-list {
  margin: auto 200px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 10px;
}
.barcode-list-item {
  display: flex;
  flex-direction: row;
}
</style>
