<template>
  <app-form-item v-bind="$attrs">
    <a-input v-model="$attrs.value" :placeholder="placeholderItem" @input="$emit('input', $event.target.value)"></a-input>
  </app-form-item>
</template>

<script>
import AppFormItem from '@/components/global/partial/AppFormItem.vue'

export default {
  name: 'AppInput',
  // inheritAttrs: false,
  components: {
    AppFormItem
  },
  computed: {
    placeholderItem() {
      return this.$attrs.placeholder || this.$attrs.label;
    }
  }
}
</script>