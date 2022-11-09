<template>
  <div class="container">
    <div class="body-header">
      <span class="scan-title">Scanned Barcodes</span>
      <v-btn class="scan-button" variant="outlined" @click="openOverlay()"
        >Add Barcode</v-btn
      >
    </div>
    <ScannerOverlay
      :showDialog="isOverlayActive"
      :scannerControls="scannerControls"
      @update="updateOverlay"
    />
    <BarcodeList :scannedBarcodes="scannedBarcodes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import ScannerOverlay from "./ScannerOverlay.vue";
import BarcodeList from "./BarcodeList.vue";

const codeReader = new BrowserMultiFormatReader();

export default defineComponent({
  name: "BarcodeScanner",
  components: {
    ScannerOverlay,
    BarcodeList,
  },
  data(): {
    isOverlayActive: boolean;
    scannedBarcodes: Array<string>;
    scannerControls?: IScannerControls;
  } {
    return {
      isOverlayActive: false,
      scannedBarcodes: [],
      scannerControls: undefined,
    };
  },
  methods: {
    updateOverlay(newOverlayState: boolean) {
      this.isOverlayActive = newOverlayState;
    },
    openOverlay() {
      this.isOverlayActive = !this.isOverlayActive;
      if (this.isOverlayActive) {
        setTimeout(async () => {
          const videoEle = document.getElementById("video");

          await codeReader.decodeFromVideoDevice(
            undefined,
            videoEle as HTMLVideoElement,
            (result, _err, controls) => {
              this.scannerControls = controls;
              if (result) {
                this.scannedBarcodes.push(result?.getText());
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
</style>
