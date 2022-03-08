export default {
  props: {
    value: {
      type: null,
      default: ''
    }
  },
  data() {
    return {
      model: undefined,
      listeners: {}
    }
  },
  watch: {
    value(val) {
      this.model = val
    },
    model(val) {
      this.$emit('input', val)
    }
  },
  created() {
    if (this.value) {
      this.model = this.value
    }
  }
}
