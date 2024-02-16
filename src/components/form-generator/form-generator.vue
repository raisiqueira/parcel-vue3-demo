<script setup lang="ts">
import { defineProps } from "vue";
import { useForm } from "vee-validate"
import { fieldMapping } from "./useFieldMapping"
import { type FormGeneratorSchema } from "./types"
import fieldArray from "./field-array.vue"
import { toTypedSchema } from "../../validators/lmr-schema";

interface FormGeneratorProps {
  /** Form submission handler. */
  onSubmit: (values: Record<string, any>) => void;
  /** Schema to mount the form. */
  schema: FormGeneratorSchema;
}

const props = defineProps<FormGeneratorProps>()

const validationSchema = toTypedSchema(props.schema)

const { resetForm, handleSubmit } = useForm({
  initialValues: {
    ...props.schema.fields.reduce((acc, field) => {
      acc[field.name] = field.initialValue
      return acc
    }, {} as Record<string, any>)
  },
  validationSchema: {
  name: 'required',
  description: 'required',
},
});

const onSubmit = handleSubmit((values: Record<string, any>) => {
  props.onSubmit(values);
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
</template>