<script setup lang="ts">
import { defineProps } from "vue";
import { Form, FormActions } from "vee-validate"
import { type FormGeneratorSchema } from "./types"

interface FormGeneratorProps {
  /** Form submission handler. */
  onSubmit: (values: Record<string, any>, actions: FormActions<Record<string, any>>) => void;
  /** Schema to mount the form. */
  schema: FormGeneratorSchema;
}

const props = defineProps<FormGeneratorProps>()

</script>
<template>
  <Form as="el-form" @submit="props.onSubmit"></Form>
</template>