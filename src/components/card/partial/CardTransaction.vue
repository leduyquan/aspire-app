<template>
  <div class="transaction">
    <div class="transaction__icon-wrapper" :class="getTypeBackground(type)">
      <img class="icon" :src="iconPath(`icons/cards/transactions/${type}.svg`)" />
    </div>
    <div class="transaction__content">
      <div class="transaction-info-wrapper">
        <div class="transaction-info">
          <div class="transaction-info__name">{{ name }}</div>
          <div class="transaction-info__balance" :class="{'transaction-info__balance--status': status}">
            <div class="balance-status">{{ balanceStatus }}</div>S$
            <div class="balance-number">{{ balance }}</div>
          </div>
        </div>
        <div class="transaction-date">{{ balanceDatetime }}</div>
      </div>
      <div class="transaction-refund">
        <div class="transaction-refund__icon-wrapper">
          <img class="icon" :src="iconPath(`icons/cards/transactions/business-and-finance.svg`)" />
        </div>
        <span class="transaction-refund__label">{{ debitCardLabel }}</span>
      </div>
    </div>
    <img class="transaction__collapse" :src="iconPath(`icons/global/next.svg`)" />
  </div>
</template>

<script>
  export default {
    name: 'CardTransaction',
    props: {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        required: true,
        default: true
      },
      createdDate: {
        type: String,
        required: true
      },
      balance: {
        type: Number,
        required: true
      }
    },
    computed: {
      balanceStatus() {
        return this.status ? '+' : '-'
      },
      balanceDatetime() {
        return this.formatDateTime(this.createdDate, 'DD MMM YYYY')
      },
      debitCardLabel() {
        return this.status ? this.$t('card.refund_debit_card') : this.$t('card.charged_debit_card')
      }
    },
    methods: {
      getTypeBackground(type) {
        return {
          'file-storage': 'blue',
          'flights': 'green',
          'megaphone': 'red',
        }[type]
      }
    }

  }
</script>