<template>
  <div class="debit-card">
    <a-row :gutter="24">
      <a-col :md="12">
        <div class="debit-card__info">
          <div class="show-card">
            <img class="show-card__logo" :src="iconPath(`icons/global/show-eye.svg`)" />
            <span>{{ $t('card.show_card_number') }}</span>
          </div>
          <div class="card-list">
            <CardItem :name="'Mark Henry'"></CardItem>
          </div>
          <div class="card-action-wrapper">
            <CardAction icon="freeze-card" :label="$t('card.freeze_card')"></CardAction>
            <CardAction icon="spend-limit" :label="$t('card.set_spend_limit')"></CardAction>
            <CardAction icon="g-pay" :label="$t('card.add_to_gpay')"></CardAction>
            <CardAction icon="replace-card" :label="$t('card.replace_card')"></CardAction>
            <CardAction icon="deactivate-card" :label="$t('card.cancel_card')"></CardAction>
          </div>
        </div>
      </a-col>
      <a-col :md="12">
        <div class="debit-card__history">
          <div class="card-collapse card-detail">
            <CardCollapse
              icon="card-detail"
              :header-label="$t('card.card_details')"
            />
          </div>
          <div class="card-collapse card-transaction">
            <CardCollapse
              icon="recent-transaction"
              :header-label="$t('card.recent_transactions')"
              :action-label="$t('card.view_all_card')"
              @click="onViewCards"
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
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CardItem from '@/components/card/partial/CardItem.vue';
import CardAction from '@/components/card/partial/CardAction.vue';
import CardCollapse from '@/components/card/partial/CardCollapse.vue';
import CardTransaction from '@/components/card/partial/CardTransaction.vue';
import CardService from '../../services/card.service'

export default {
  components: {
    CardItem,
    CardAction,
    CardCollapse,
    CardTransaction
  },
  data() {
    return {
      cards: [],
      recentTransactions: []
    };
  },
  mounted() {
    this.getCards();
    this.getRecentTransactions();
  },
  methods: {
    async getCards() {
      try {
        const response = await CardService.getCardAll();
        const { data } = response;
        this.cards = data
      } catch (error) {
        console.log(error)
      }
    },
    getRecentTransactions() {
      this.recentTransactions = [
        {
          id: 1,
          name: 'Hamleys',
          type: 'file-storage',
          status: true,
          createdDate: '2022-03-1 06:39:21',
          balance: 150
        },
        {
          id: 2,
          name: 'Hamleys',
          type: 'flights',
          status: false,
          createdDate: '2022-03-1 06:39:21',
          balance: 120
        },
        {
          id: 3,
          name: 'Hamleys',
          type: 'megaphone',
          status: true,
          createdDate: '2022-03-1 06:39:21',
          balance: 120
        },
      ]
    },
    onViewCards() {}
  },
};
</script>

