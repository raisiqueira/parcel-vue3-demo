import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueFormGenerator from 'vue3-form-generator'
import 'vue3-form-generator/dist/style.css'

import App from "./App.vue";
import FieldElInput from "./components/vfg-fields/field-el-input.vue"
import FieldElInputComposition from "./components/vfg-fields/field-el-input-composition.vue"
import { schemaDefinitions } from "./definitions/schema-definitions";

const app = createApp(App);
app.use(ElementPlus)
app.use(VueFormGenerator)

// Form Generator custom fields
app.component('fieldElInput', FieldElInput)
app.component('fieldElInputComposition', FieldElInputComposition)

// Global config
app.config.globalProperties.$schemaDefinitions = schemaDefinitions;

if (process.env.NODE_ENV === "development") {
  app.config.devtools = true;
  app.config.performance = true;
}

app.mount("#app");