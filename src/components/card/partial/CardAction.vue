<template>
  <div class="card-action" @click="onClick">
    <img class="card-action__icon" :src="iconPath(`icons/cards/${icon}.svg`)" />
    <div class="card-action__label">{{ label }}</div>
  </div>
</template>

<script>
  export default {
    name: 'CardAction',
    props: {
      label: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    },
    methods: {
      onClick() {
        this.$emit('click');
      }
    }
  }
</script>