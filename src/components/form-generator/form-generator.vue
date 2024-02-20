<script setup lang="ts">
import { defineProps, watch } from "vue";
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"

import { fieldMapping } from "./useFieldMapping"
import { type FormGeneratorSchema } from "./types"
import { toZodSchema } from "./utils";
import fieldArray from "./field-array.vue"
import { mergeSchemaProperties } from "../../validators/lmr-schema";

interface FormGeneratorProps {
  /** Form submission handler. */
  onSubmit: (values: Record<string, any>) => void;
  /** Schema to mount the form. */
  schema: FormGeneratorSchema;
}

const props = defineProps<FormGeneratorProps>()

const mergedSchemaFields = mergeSchemaProperties(props.schema)
console.log(mergedSchemaFields)
const validationSchema = toZodSchema(mergedSchemaFields)

const { resetForm, handleSubmit, meta, values } = useForm({
  initialValues: {
    ...props.schema.fields.reduce((acc, field) => {
      acc[field.name] = field.initialValue
      return acc
    }, {} as Record<string, any>)
  },
  validationSchema: toTypedSchema(validationSchema),
});

const onSubmit = handleSubmit((values: Record<string, any>) => {
  console.log("values from fg: ", values)
  props.onSubmit(values);
})

watch(values, (values) => {
  console.log("formValue:", values);
})


</script>
<template>
  <el-form @submit="onSubmit" label-position="top">
    <div v-for="field in props.schema.fields" :key="field.name">
      <fieldArray v-if="field.as === 'array'" :name="field.name" :fields="field?.fields">
        <!-- TODO: add the add and remove buttons. -->
      </fieldArray>
      <component
        v-else
        :is="fieldMapping[field.as]"
        :name="field.name"
        :label="field.label ? field.label : field.name"
      />
  </div>
    <!-- TODO: let the parent component execute the submission and the reset. -->
    <el-button type="primary" native-type="submit">Submit</el-button>
    <el-button type="outline" native-type="button" @click="resetForm()">
        Reset
    </el-button>
  </el-form>
  <pre>{{ JSON.stringify(meta) }}</pre>
</template>