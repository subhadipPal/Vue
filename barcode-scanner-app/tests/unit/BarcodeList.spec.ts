import { mount, enableAutoUnmount, VueWrapper } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import useScannedBarCodesStore from "@/stores/scannerStore";

import BarcodeList from "../../src/components/BarcodeList.vue";
describe("HelloWorld.vue", () => {
  let wrapper: VueWrapper<any>, vuetify;
  beforeEach(() => {
    vuetify = {
      mocks: {
        $vuetify: {
          lang: {
            t: (val: string) => val,
          },
        },
      },
    };

    wrapper = mount(BarcodeList, {
      global: {
        plugins: [createTestingPinia()],
      },
      vuetify,
    });
  });
  enableAutoUnmount(afterEach);

  it("renders BarCodeList for scanned codes", () => {
    const barCodeStore = useScannedBarCodesStore();
    barCodeStore.$patch({
      scannedCodes: ["11111111", "222222", "333333"],
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
