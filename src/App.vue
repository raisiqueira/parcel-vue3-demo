<script>
import { computed } from "vue";
export default {
  name: "MainApp",
}
</script>
<script setup>
import { reactive, computed } from "vue";
import vfgNative from "./examples/vfg-native.vue";
import vfgElementUi from "./examples/vfg-element-ui.vue";
import vvElementUi from "./examples/vv-element-ui.vue";
import vvCustomField from "./examples/vv-custom-field.vue";
import vvFormGenerator from "./examples/vv-form-generator.vue";

const state = reactive({
  count: 0,
  double: computed(() => state.count * 2),
});

function increment() {
  state.count++;
}

</script>
<template>
  <h1>Hello</h1>
  <el-button @click="increment">
    Count is: {{ state.count }} Double is: {{
      state?.double }}
  </el-button>
  <!-- <div>
    <h3>Native VFG</h3>
    <vfgNative />
  </div> -->
  <!-- <div>
    <h3>ElementUI VFG</h3>
    <vfgElementUi />
  </div> -->

  <!-- <div>
    <h3>ElementUI Vee Validate</h3>
    <vvElementUi />
  </div> -->
  <!-- <div>
    <h3>Vee Validate Custom Field</h3>
    <vvCustomField />
  </div> -->
  <div>
    <h3>Vee Validate Form Generator</h3>
    <vvFormGenerator />
  </div>
</template>