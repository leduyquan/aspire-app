<template>
  <div class="debit-card">
    <div class="debit-card__info">
      <div class="card-list">
        <VueSlickCarousel ref="carousel" :key="carouselKey" @afterChange="currentCarouselIndex = $event" v-if="cards.length > 0" class="card-carousel" v-bind="carouselSettings" >
          <template v-for="(card) in cardData">
            <div class="card-item-wrapper" :key="card.id">
              <div class="show-card-wrapper">
                <div class="show-card" @click="onShowNumberCard(card.id)">
                  <img class="show-card__logo" :src="iconPath(`icons/global/show-eye.svg`)" />
                  <span class="show-card__label">{{ $t('card.show_card_number') }}</span>
                </div>
              </div>
              <CardItem
                :first-name="card.firstName"
                :last-name="card.lastName"
                :dateTime="card.expiredDate"
                :card-number="card.cardNumber"
                :status="card.status"
                :is-show-number="card.isShowNumber"
              ></CardItem>

            </div>
          </template>
          </VueSlickCarousel>
      </div>
      <div class="card-action-wrapper">
        <CardAction icon="freeze-card" :label="freezeLabel" @click="onFreezeCard"></CardAction>
        <CardAction icon="spend-limit" :label="$t('card.set_spend_limit')"></CardAction>
        <CardAction icon="g-pay" :label="$t('card.add_to_gpay')"></CardAction>
        <CardAction icon="replace-card" :label="$t('card.replace_card')"></CardAction>
        <a-popconfirm
          :title="$t('card.sure_delete_card')"
          :ok-text="$t('app.yes')"
          :cancel-text="$t('app.no')"
          @confirm="onDeleteCard"
        >
          <CardAction icon="deactivate-card" :label="$t('card.cancel_card')"></CardAction>
        </a-popconfirm>
      </div>
    </div>
    <div class="debit-card__history">
      <div class="card-collapse card-detail">
        <CardCollapse
          icon="card-detail"
          :header-label="$t('card.card_details')"
        >
          <CardDetail></CardDetail>
        </CardCollapse>
      </div>
      <div class="card-collapse card-transaction">
        <CardCollapse
          icon="recent-transaction"
          :header-label="$t('card.recent_transactions')"
          :action-label="$t('card.view_all_card')"
          :is-open="true"
        >
          <div class="card-collapse-content">
            <CardTransaction
              v-for="transaction in recentTransactions"
              :key="transaction.id"
              :name="transaction.name"
              :type="transaction.type"
              :status="transaction.status"
              :created-date="transaction.createdDate"
              :balance="transaction.balance"
            />
          </div>
        </CardCollapse>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from '@/components/desktop/card/partial/CardItem.vue';
import CardAction from '@/components/desktop/card/partial/CardAction.vue';
import CardCollapse from '@/components/desktop/card/partial/CardCollapse.vue';
import CardTransaction from '@/components/desktop/card/partial/CardTransaction.vue';
import CardDetail from '@/components/desktop/card/partial/CardDetail.vue';
import CardService from '@/services/card.service';
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
        centerMode: true,
        // centerPadding: "16px",
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
    cardData: {
      get() {
        return this.cards;
      },
      set(data) {
        return data;
      }
    },
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
    async onFreezeCard() {
      try {
        if (this.cardSelected) {
          const payload = { ...this.cardSelected };
          payload.status = !this.cardSelected.status;
          const response = await CardService.updateCard(payload.id, payload);
          if (response.statusText === "OK") {
            this.cards[this.currentCarouselIndex]['status'] = payload.status;
          }
        }
      } catch (error) {
        this.notification('success', this.$t('messages.update_card_failed'));
      }
    },
    async onDeleteCard() {
      try {
        if (this.cardSelected) {
          const response = await CardService.deleteCard(this.cardSelected.id);
          if (response.statusText === "OK") {
            this.cards.splice(this.currentCarouselIndex, 1);
            this.notification('success', this.$t('messages.delete_card_success'));
          }
        }
      } catch (error) {
        this.notification('success', this.$t('messages.delete_card_failed'));
      }
    },
    onShowNumberCard(cardId) {
      this.cardData = this.cardData.map(item => {
        if (item.id === cardId) {
          item.isShowNumber = !item.isShowNumber;
        }
        return item;
      })
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

