<script>
import { provide, defineProps } from 'vue'
import { useId } from 'radix-vue'
import { FORM_ITEM_INJECTION_KEY } from "./constants"

const props = defineProps({
  class: {
    type: String,
    default: 'space-y-2'
  }
})

const id = useId()
provide(FORM_ITEM_INJECTION_KEY, id)
</script>

<template>
  <div :class="props.class">
    <slot />
  </div>
</template>

<style scoped>
.space-y-2 > * + * {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>