export default {
  methods: {
    async getData(key) {
      try {
        const {data} = await this.$axios.$get('/master-data/preferences/preferences/', {
          params: {
            key__in: key
          }
        })
        this.data = JSON.parse(data[0].value)
      } catch (e) {
        console.error(key, e)
      }
    }
  }
}
