export default {
  data() {
    return {
      pagination: {
        pageSize: 12,
        total: 0,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`
      },
      data: []
    }
  },
  methods: {
    async getData(params = {page: 1, limit: 12}) {
      const query = {
        ...params,
        ...this.$route.query
      }
      const {data, pagination} = await this.getDataFromApi(query)
      this.pagination = {
        ...this.pagination,
        total: pagination.total_items
      }
      this.data = data || []
    },
    onTableChange(pagination) {
      this.pagination = {
        ...this.pagination,
        current: pagination.current
      }
      this.getData({
        page: pagination.current,
        limit: pagination.pageSize
      })
    }
  }
}
