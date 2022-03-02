<template>
  <a-layout-header class="app-header">
    <div class="header-title">
      <span>Giáo lý hiệp thông</span>
    </div>
    <account-dropdown />
  </a-layout-header>
</template>

<script>
  import AccountDropdown from '@/components/header/AccountDropdown'

  export default {
    components: {
      AccountDropdown
    }
  }
</script>

<style scoped>

</style>
