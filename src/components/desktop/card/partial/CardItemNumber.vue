<template>
  <div>
    <div v-show="!isShow" class="card-item-dot">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <span v-show="isShow" class="card-item-show">{{ number }}</span>
  </div>
</template>
<script>
export default {
  props: {
    number: {
      type: String,
      require: true
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>