<template>
  <app-form-item v-bind="{...$props, ...$attrs}">
    <a-input v-model="model" v-bind="$attrs" :placeholder="placeholderItem">
      <slot v-for="slot in Object.keys($slots)" :slot="slot" :name="slot" />
    </a-input>
  </app-form-item>
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
  ],
  computed: {
    placeholderItem() {
      return this.$attrs.placeholder || this.$attrs.label;
    }
  }
}
</script>