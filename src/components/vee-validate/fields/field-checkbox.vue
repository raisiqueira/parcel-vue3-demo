<template>
  <el-form-item :error="errorMessage" :required="meta.required">
    <el-checkbox v-model="value" :checked="value" :validate-event="false" v-bind="$attrs">
      {{ label }}
    </el-checkbox>
  </el-form-item>
  <pre>{{ JSON.stringify(meta) }}</pre>
</template>

<script>
import { useField, FormContextKey } from "vee-validate";
import { inject } from "vue";

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
    const { value, errorMessage, checked, meta, ...rest } = useField(() => props.name, undefined, {
      type: "checkbox",
      checkedValue: true,
      uncheckedValue: false,
    });

    const x = inject(FormContextKey)
    console.log({x})

    return {
      value,
      errorMessage,
      meta,
    };
  },
};
</script>