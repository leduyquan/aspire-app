<template>
  <div class="card-page">
    <div class="card-page__header">
      <img class="card-logo svg-render" :src="iconPath('logos/dashboard-short.svg')" />
      <div class="card-title">{{ $t('card.account_balance')}}</div>
      <div class="card-figures">
        <div class="card-balance">
          <div class="card-balance__icon card-balance__icon--active"> S$ </div>
          <div class="card-balance__number">{{ balanceFormat }}</div>
        </div>
        <div class="card-btn" @click="openAddCardModal">
           <img class="card-btn__logo svg-render" :src="iconPath(`icons/global/plus.svg`)" />
           <div class="card-btn__label">{{ $t('card.new_card') }}</div>
        </div>
      </div>
    </div>
    <div class="card-page__content">
      <a-tabs default-active-key="debit-cards">
        <a-tab-pane key="debit-cards" :tab="$t('card.my_debit_cards')">
          <CardDebit :cards="cards" :recent-transactions="recentTransactions"></CardDebit>
        </a-tab-pane>
        <a-tab-pane key="company-cards" :tab="$t('card.all_company_cards')">
          <CardCompany></CardCompany>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-modal
      :visible="addCardModal.visible"
      wrapClassName="modal-form"
      @cancel="handleCancel('invoice')"
    >
      <ValidationObserver ref="observer_card">
        <a-form :form="form">
          <app-input
            :vid="$t('card.first_name')"
            v-model="form.firstName"
            rules="required"
            :label="$t('card.first_name')"
          ></app-input>
          <app-input
            :vid="$t('card.last_name')"
            v-model="form.lastName"
            rules="required"
            :label="$t('card.last_name')"
          ></app-input>
        </a-form>
      </ValidationObserver>
      <template slot="footer">
        <a-button key="submit" type="primary" class="btn-register btn-opacity" :loading="addCardModal.isLoading" @click="onSaveCard">
          {{$t('app.submit')}}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import CardDebit from '@/components/mobile/card/CardDebit.vue';
import CardCompany from '@/components/mobile/card/CardCompany.vue';
import CardService from '../../services/card.service'
import TransactionService from '../../services/transaction.service'
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CardDebit,
    CardCompany,
  },
  data() {
    return {
      recentTransactions: [],
      balance: 0,
      form: {
        firstName: '',
        lastName: ''
      },
      addCardModal: {
        isLoading: false,
        visible: false
      }
    };
  },
  computed: {
    ...mapState('card', ['cards']),
    balanceFormat() {
      return this._numberWithCommas(this.balance)
    }
  },
  mounted() {
    this.getCardAll();
    this.getRecentTransactions();
  },
  methods: {
    ...mapActions('card', ['getCardAll']),
    async getRecentTransactions() {
      try {
        const response = await TransactionService.getTransactionRecent();
        const { data } = response;
        this.recentTransactions = data.data;
        this.balance = data.balance;
      } catch (error) {
        console.log(error)
      }
    },
    async onSaveCard() {
      const isValid = await this.$refs.observer_card.validate()
      if (isValid) {
        try {
          this.addCardModal.isLoading = true
          const payload = {
            id: this._getRandomNumber(4),
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            cardNumber: this._getRandomNumber(16),
            expiredDate: moment().add(1, 'years'),
            cvv: '***',
            status: true
          }
          const response = await CardService.createCard(payload);
          if (response.statusText === 'OK')
          this.notification('success', this.$t('messages.create_card_success'))
          this.getCards();
        } catch(err) {
          this.notification('error', this.$t('messages.create_card_failed'))
        } finally {
          this.addCardModal.isLoading = false;
          this.handleCancel();
        }
      }
    },
    openAddCardModal() {
      this.addCardModal.visible = true
    },
    handleCancel() {
      this.addCardModal.visible = false;
      this.$refs.observer_card.reset();
      this._resetForm();
    },

    _numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    _getRandomNumber(digit) {
      return Math.random().toFixed(digit).split('.')[1];
    },
    _resetForm() {
      this.form = {
        firstName: '',
        lastName: ''
      };
    }
  }
}
</script>