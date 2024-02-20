import devtools from '@vue/devtools'
import { createApp, provide } from "vue";
import ElementPlus from 'element-plus'
import VueFormGenerator from 'vue3-form-generator'
import { defineRule } from "vee-validate"
import { required, min } from "@vee-validate/rules"

import 'element-plus/dist/index.css'
import 'vue3-form-generator/dist/style.css'

import App from "./App.vue";
import FieldElInput from "./components/vfg-fields/field-el-input.vue"
import FieldElInputComposition from "./components/vfg-fields/field-el-input-composition.vue"
import { useSchemaDefinitions } from './global-config';
// import { setupGlobalRules } from './validators/vv-rules';

const app = createApp(App);
app.use(ElementPlus)
app.use(VueFormGenerator)

// Form Generator custom fields
app.component('fieldElInput', FieldElInput)
app.component('fieldElInputComposition', FieldElInputComposition)

// Form Rules
defineRule('required', required);
defineRule("min", min);
// setupGlobalRules();


// Global config
useSchemaDefinitions(app);

if (process.env.NODE_ENV === 'development') {
  // devtools.connect(/* host, port */)
  window.__VUE_PROD_DEVTOOLS__ = true;
  app.config.devtools = true;
  app.config.performance = true;
}

app.mount("#app");