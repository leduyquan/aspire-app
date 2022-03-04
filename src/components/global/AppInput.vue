<template>
  <AppFormItem v-bind="{...$props, ...$attrs}">
    <a-input v-model="model" v-bind="$attrs" >
      <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
    </a-input>
  </AppFormItem>
</template>

<script>
import AppFormItem from '@/components/global/partial/AppFormItem.vue'
import FormMixin from '@/mixins/form'

export default {
  name: 'AppInput',
  components: {
    AppFormItem
  },
  mixins: [
    FormMixin
  ]
}
</script>