<script>
import { provide } from 'vue'
import { useId } from 'radix-vue'

const props = defineProps({
  class: {
    type: String,
    default: 'space-y-2'
  }
})

export const FORM_ITEM_INJECTION_KEY
  = Symbol()

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