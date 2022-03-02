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
  },
  mounted() {
    this.listeners = Object.keys(this.$listeners)
      .filter(key => key !== 'input')
      .reduce((obj, key) => {
        obj[key] = this.$listeners[key]
        return obj
      }, {})
  }
}
