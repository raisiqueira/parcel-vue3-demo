import { computed } from "vue"
import { fieldElText, fieldElCheckbox } from "../vee-validate/fields"

const fieldMapping = computed(() => {
  return {
    'text': fieldElText,
    'checkbox': fieldElCheckbox,
  };
})

export { fieldMapping };