<template>
  <el-form-item :error="errorMessage">
    <el-checkbox v-model="value">
      {{ label }}
    </el-checkbox>
  </el-form-item>
</template>

<script>
import { useField } from "vee-validate";

export default {
  name: "CheckboxWithValidation",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { value, errorMessage } = useField(props.name, undefined, {
      type: "checkbox",
      valueProp: true, // the default "checked" value
      uncheckedValue: false,
    });

    return {
      value,
      errorMessage,
    };
  },
};
</script>