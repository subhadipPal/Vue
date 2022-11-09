<template>
  <div class="barcode-list-container">
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
    <span
      :style="scannedBarcodes.length === 0 ? 'display: block' : 'display: none'"
      >No barcodes yet</span
    >
  </div>
</template>
<script>
export default {
  name: "BarcodeList",
  props: {
    scannedBarcodes: Array,
  },
  methods: {
    removeScannedCode(index) {
      const barcodes = this.scannedBarcodes;
      this.$emit("scannedBarcodes", barcodes.splice(index, 1));
    },
  },
};
</script>
<style lang="scss">
.barcode-list-container {
  margin-top: 50px;
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
