import { defineStore } from "pinia";

interface IScannerState {
  scannedCodes: string[];
}

const useScannedBarCodesStore = defineStore("scannedBarCodes", {
  state: (): IScannerState => ({ scannedCodes: [] }),
  getters: {
    scannedBarCodes: (state) => state.scannedCodes || [],
  },
  actions: {
    pushBarCodes(scannedCode: string) {
      this.scannedCodes.push(scannedCode);
    },
    spliceBarCodes(index: number) {
      this.scannedCodes.splice(index, 1);
    },
  },
});

export default useScannedBarCodesStore;
