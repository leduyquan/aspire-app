<template>
  <div class="debit-card">
    <a-row :gutter="24">
      <a-col :lg="24" :xl="12">
        <div class="debit-card__info">
          <div class="card-list">
            <vue-slick-carousel ref="carousel" :key="carouselKey" @afterChange="currentCarouselIndex = $event" v-if="cards.length > 0" class="card-carousel" v-bind="carouselSettings" >
              <div v-for="(card) in cards" :key="card.id">
                <div class="show-card-wrapper">
                  <div class="show-card" @click="onShowNumberCard(card.id)">
                    <img class="show-card__logo" :src="iconPath(`icons/global/show-eye.svg`)" />
                    <span class="show-card__label">{{ $t('card.show_card_number') }}</span>
                  </div>
                </div>
                <card-item
                  :first-name="card.firstName"
                  :last-name="card.lastName"
                  :dateTime="card.expiredDate"
                  :card-number="card.cardNumber"
                  :status="card.status"
                  :is-show-number="card.isShowNumber"
                ></card-item>
              </div>
              </vue-slick-carousel>
          </div>
          <div class="card-action-wrapper">
            <card-action icon="freeze-card" :label="freezeLabel" @click="onFreezeCard"></card-action>
            <card-action icon="spend-limit" :label="$t('card.set_spend_limit')"></card-action>
            <card-action icon="g-pay" :label="$t('card.add_to_gpay')"></card-action>
            <card-action icon="replace-card" :label="$t('card.replace_card')"></card-action>
            <card-action icon="deactivate-card" :label="$t('card.cancel_card')" @click="showDeleteCardConfirm"></card-action>
          </div>
        </div>
      </a-col>
      <a-col :lg="24" :xl="12">
        <div class="debit-card__history">
          <div class="card-collapse card-detail">
            <card-collapse
              icon="card-detail"
              :header-label="$t('card.card_details')"
            >
              <card-detail></card-detail>
            </card-collapse>
          </div>
          <div class="card-collapse card-transaction">
            <card-collapse
              icon="recent-transaction"
              :header-label="$t('card.recent_transactions')"
              :action-label="$t('card.view_all_card')"
              :is-open="true"
            >
              <div class="card-collapse-content">
                <card-transaction
                  v-for="transaction in recentTransactions"
                  :key="transaction.id"
                  :name="transaction.name"
                  :type="transaction.type"
                  :status="transaction.status"
                  :created-date="transaction.createdDate"
                  :balance="transaction.balance"
                />
              </div>
            </card-collapse>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CardItem from '@/components/desktop/card/partial/CardItem.vue';
import CardAction from '@/components/desktop/card/partial/CardAction.vue';
import CardCollapse from '@/components/desktop/card/partial/CardCollapse.vue';
import CardTransaction from '@/components/desktop/card/partial/CardTransaction.vue';
import CardDetail from '@/components/desktop/card/partial/CardDetail.vue';
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    CardItem,
    CardAction,
    CardCollapse,
    CardDetail,
    CardTransaction,
    VueSlickCarousel
  },
  props: {
    cards: {
      type: Array,
      required: true
    },
    recentTransactions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentCarouselIndex: 0,
      carouselSettings: {
        arrows: false,
        dots: true,
        dotsClass: "slick-dots custom-dot-class",
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      carouselKey: 0
    };
  },
  computed: {
    cardSelected() {
      return this.cards[this.currentCarouselIndex];
    },
    freezeLabel() {
      if (this.cardSelected) {
        return this.cardSelected.status ? this.$t('card.freeze_card') : this.$t('card.unfreeze_card');
      }
      return this.$t('card.freeze_card')
    },
  },
  watch: {
    cards() {
      this.forceCarouselRerender()
    }
  },
  methods: {
    onFreezeCard() {
      this.$emit('onFreezeCard', this.cardSelected, this.currentCarouselIndex);
    },
    onDeleteCard() {
      this.$emit('onDeleteCard', this.cardSelected, this.currentCarouselIndex);
    },
    onShowNumberCard(cardId) {
      this.$emit('onShowNumberCard', cardId);
    },
    showDeleteCardConfirm() {
      const self = this;
      this.$confirm({
        class: 'delete-card-modal',
        title: this.$t('card.sure_delete_card'),
        okText: this.$t('app.yes'),
        okType: 'danger',
        cancelText: this.$t('app.no'),
        onOk() {
          self.onDeleteCard();
        },
        onCancel() {
        },
      });
    },
    onSlideClick() {
    },
    forceCarouselRerender() {
      this.carouselKey += 1;
      // this.$refs.carousel.goTo(this.currentCarouselIndex);
    }
  },
};
</script>

