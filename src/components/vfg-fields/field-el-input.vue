<script>
import abstractField from "../../plugins/vfg/fields/abstractField";
export default {
  name: "ElInputField",
  mixins: [abstractField],
}
</script>
<template>
  <el-form-item :label="schema.title ? schema.title : ''" :prop="schema.prop">
    <el-input v-model="value" :placeholder="schema.placeholder ? schema.placeholder : ''" />
    </el-form-item>
</template>