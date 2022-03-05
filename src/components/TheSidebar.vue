<template>
  <a-layout-sider :width="sidebarWidth">
    <div class="sidebar">
      <div class="sidebar__info">
          <img class="logo svg-render" :src="iconPath(`logos/aspire.svg`)" />
          <span class="description">
            {{ $t('info.description') }}
          </span>
      </div>
      <div class="sidebar__info--hidden">
          <img class="logo svg-render" :src="iconPath(`logos/aspire.svg`)" />
      </div>
      <ul class="sidebar__tabs">
        <li v-for="item in tabs" :key="item.name">
          <router-link class="sidebar-item" :to="'/' + item.name" :title="item.description">
            <img class="sidebar-item__logo svg-render" :src="iconPath(`tabs/${item.icon}.svg`)" />
            <div class="sidebar-item__title sidebar-item__title--hidden">
              {{ item.description }}
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </a-layout-sider>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "home",
          icon: "home",
          description: this.$t("tabs.home"),
          active: false,
        },
        {
          name: "cards",
          icon: "card",
          description: this.$t("tabs.cards"),
          active: false,
        },
        {
          name: "payments",
          icon: "payment",
          description: this.$t("tabs.payments"),
          active: false,
        },
        {
          name: "credit",
          icon: "credit",
          description: this.$t("tabs.credit"),
          active: false,
        },
        {
          name: "settings",
          icon: "setting",
          description: this.$t("tabs.settings"),
          active: false,
        },
      ],
      screenWidth: 0,
    };
  },
  computed: {
    isCollapse() {
      return this.screenWidth < 992;
    },
    sidebarWidth() {
      return this.isCollapse ? 90 : 340;
    }
  },
  watch: {
    isCollapse() {
      // const cide = document.querySelectorAll('.sidebar-item__title');
      // console.log('cide', cide)
      // cide.classList.add('sidebar-item__title--hidden')
    },
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandle);
    this.resizeHandle();
  },
  methods: {
    resizeHandle() {
      this.screenWidth = window.innerWidth;
      console.log('this.screenWidth', this.screenWidth)
    },
  },
};
</script>
