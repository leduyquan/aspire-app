<template>
  <div id="components-layout">
    <div v-if="isMobile" class="mobile">
      <a-layout>
        <a-layout-content>
          <div class="content-wrapper">
              <router-view></router-view>
            </div>
        </a-layout-content>
        <a-layout-footer>
          <the-footer></the-footer>
        </a-layout-footer>
      </a-layout>
    </div>
    <div v-else class="desktop">
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
  </div>
</template>

<script>
import TheSidebar from '@/components/desktop/TheSidebar.vue'
import TheFooter from '@/components/mobile/TheFooter.vue'

export default {
  components: {
    TheSidebar,
    TheFooter
  }
};
</script>
    TheFooter