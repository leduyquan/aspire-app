<template>
  <a-layout-sider width="340">
    <div class="sidebar">
      <div class="sidebar__info">
          <img class="logo svg-render" :src="iconPath(`logos/aspire.svg`)" />
          <span class="description">
            {{ $t('info.description') }}
          </span>
      </div>
      <ul class="sidebar__tabs">
        <li v-for="item in tabs" :key="item.name">
          <router-link class="sidebar-item" :to="'/' + item.name" :title="item.description">
            <img class="sidebar-item__logo svg-render" :src="iconPath(`tabs/${item.icon}.svg`)" />
            <div class="sidebar-item__title">
              {{ item.description }}
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </a-layout-sider>
</template>

<script>
// import LogoAspireSVG from '../assets/img/logos/aspire.svg?inline'

export default {
  components: {
    // LogoAspireSVG
  },
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
    };
  },
  mounted() {
    
  },
  methods: {
    // iconPath(name) {
    //   return require(`@/assets/img/${name}`).default;
    // }
  },
};
</script>
