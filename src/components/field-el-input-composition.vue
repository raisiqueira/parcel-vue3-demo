<script>
import abstractField from "../plugins/vfg/fields/abstractField";
export default {
  name: "ElInputFieldComposition",
  mixins: [abstractField],
  onMounted() {
    console.log("ElInputFieldComposition mounted");
  },
  computed: {
    isRequired() {
        if (this.schema["x-nullable"] || this.schema.default) return false;
        return true;
      },
      customRules() {
        const rules = [];
        if (this.isRequired) {
          rules.push({
            required: true,
            message: `Please input ${this.schema.title}`,
            trigger: "blur",
          });
        }
        return rules;
      }
  },
}
</script>
<template>
  <el-form-item :label="schema.title ? schema.title : ''" :prop="schema.prop">
    <el-input v-model="value" :placeholder="schema.placeholder ? schema.placeholder : ''" :required="isRequired" :minlength="schema.min" />
    </el-form-item>
</template>