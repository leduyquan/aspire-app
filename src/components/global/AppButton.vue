<template>
  <button class="app-btn btn-opacity" :class="size" type="primary" :disabled="disabled" @click="onClick">
    <slot></slot>
    <span class="app-btn__label">{{ label }}</span>
  </button>
</template>

<script>
  export default {
    name: 'AppButton',
    props: {
      label: {
        type: String,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: ''
      },
    },
    methods: {
      onClick() {
        this.$emit('click')
      }
    }
  }
</script>
