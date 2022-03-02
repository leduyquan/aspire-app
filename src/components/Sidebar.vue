<template>
  <a-layout-sider id="sidebar-main" v-model="collapsed" width="200px">
    <a-button type="primary" style="margin: 8px 0" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <a-menu v-model="activeKey" mode="inline" @click="onChangePage">
      <a-menu-item key="home">
        <i class="icon-home fs-20 w-40" />
        <span v-show="!collapsed">Trang Chủ</span>
      </a-menu-item>
      <a-menu-item v-if="accessBook" key="book">
        <i class="icon-map-view fs-20 w-40" />
        <span v-show="!collapsed">Giáo Trình</span>
      </a-menu-item>
      <a-menu-item v-if="accessSystem" key="system-new-register">
        <i class="icon-settings fs-20 w-40" />
        <span v-show="!collapsed">Hệ Thống</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false,
        activeKey: [this.$route.name]
      }
    },
    computed: {
      accessBook() {
        return this.$auth.hasScope('CUSTOM.BanQuanTri') ||
          this.$auth.hasScope('CUSTOM.BanKiemDuyet') ||
          this.$auth.hasScope('CUSTOM.BanSoanThao')
      },
      accessSystem() {
        return this.$auth.hasScope('CUSTOM.BanQuanTri')
      }
    },
    methods: {
      toggleCollapsed() {
        this.collapsed = !this.collapsed
        this.$nuxt.$emit('collapsed', this.collapsed)
      },
      onChangePage({key}) {
        this.$router.push({name: key})
      }
    }
  }
</script>

<style scoped>

</style>
