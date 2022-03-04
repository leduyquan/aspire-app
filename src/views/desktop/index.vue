<template>
  <div id="components-layout">
    <a-layout>
      <the-sidebar></the-sidebar>
      <a-layout>
        <a-layout-content>
          <div class="content-wrapper">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  components: {
    TheSidebar
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>