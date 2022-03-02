export default {
  data() {
    return {
      screenWidth: 0,
      responsiveCols: []
    }
  },
  computed: {
    expandCols() {
      return this.responsiveCols.filter(x => x.minScreen <= this.screenWidth)
    },
    collapseCols() {
      return this.responsiveCols.filter(x => x.minScreen > this.screenWidth)
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.resizeHandle)
      this.resizeHandle()
    })
  },
  methods: {
    resizeHandle() {
      this.screenWidth = window.innerWidth
    }
  }
}
