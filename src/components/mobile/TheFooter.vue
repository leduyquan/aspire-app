<template>
  <div class="footer">
    <ul class="footer__tabs">
      <li v-for="item in tabs" :key="item.name">
        <router-link class="footer-item" :to="'/' + item.name" :title="item.description">
          <img class="footer-item__logo svg-render" :src="iconPath(`tabs/${item.icon}.svg`)" />
          <div class="footer-item__title">
            {{ item.description }}
          </div>
        </router-link>
      </li>
    </ul>
  </div>
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
          name: "profiles",
          icon: "setting",
          description: this.$t("tabs.profiles"),
          active: false,
        },
      ],
    };
  },
};
</script>
