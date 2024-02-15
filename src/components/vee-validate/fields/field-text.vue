<script lang="ts">
import { useField } from "vee-validate"

export default {
  name: "fieldElText",
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
    const { value, errorMessage, meta } = useField(props.name);

    return {
      value,
      errorMessage,
      meta,
    }
  },
}
</script>
<template>
  <el-form-item :error="errorMessage" :label="label" :required="meta.required">
    <el-input v-model="value" v-bind="$attrs" :validate-event="false" />
  </el-form-item>
  <pre>{{ JSON.stringify(meta) }}</pre>
</template>