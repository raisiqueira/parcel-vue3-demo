<script setup lang="ts">
import { defineProps } from "vue"
import { useFieldArray } from "vee-validate"
import { fieldMapping } from "./useFieldMapping"
import { FormGeneratorField } from "./types"

interface FieldArrayProps {
  name: string;
  fields?: FormGeneratorField[];
}

const props = defineProps<FieldArrayProps>()

const { fields, remove, push } = useFieldArray(props.name)

function getFieldByIndex(index: number) {
  if (props.fields) {
    return props.fields[index]
  }
}

</script>
<template>
    <div v-for="(field, index) in fields" :key="field.key">
      <!-- TODO: Finish the implementation -->
        <component
          :is="props.fields?.length ? fieldMapping[props.fields[index].as] : 'div'"
        />
      <slot :field="field" :index="index" :remove="remove" :push="push" />
    </div>
</template>