<template>
  <div class="card-page">
    <div class="card-page__header">
      <div class="card-title">{{ $t('card.available_balance')}}</div>
      <div class="card-figures">
        <div class="card-balance">
          <div class="card-balance__icon card-balance__icon--active"> S$ </div>
          <div class="card-balance__number">{{ balanceFormat }}</div>
        </div>
        <app-button :label="$t('card.new_card')" @click="openAddCardModal">
           <img class="card-logo svg-render" :src="iconPath(`icons/global/plus.svg`)" />
        </app-button>
      </div>
    </div>
    <div class="card-page__content">
      <a-tabs default-active-key="debit-cards">
        <a-tab-pane key="debit-cards" :tab="$t('card.my_debit_cards')">
          <card-debit
            :cards="cards"
            :recent-transactions="recentTransactions"
            @onFreezeCard="onFreezeCard"
            @onDeleteCard="onDeleteCard"
            @onShowNumberCard="onShowNumberCard">
          </card-debit>
        </a-tab-pane>
        <a-tab-pane key="company-cards" :tab="$t('card.all_company_cards')">
          <card-company></card-company>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-modal
      :visible="addCardModal.visible"
      wrapClassName="modal-form desktop"
      @cancel="handleCancel('invoice')">
      <validation-observer ref="observer_card">
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
      </validation-observer>
      <template slot="footer">
        <a-button key="submit" type="primary" class="btn-register btn-opacity" :loading="addCardModal.isLoading" @click="onSaveCard">
          {{$t('app.submit')}}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import CardDebit from '@/components/desktop/card/CardDebit.vue';
import CardCompany from '@/components/desktop/card/CardCompany.vue';
import CardService from '../../services/card.service'
import TransactionService from '../../services/transaction.service'
import moment from 'moment'
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    CardDebit,
    CardCompany,
    ValidationObserver,
  },
  data() {
    return {
      cards: [],
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
    balanceFormat() {
      return this._numberWithCommas(this.balance)
    }
  },
  mounted() {
    this.getCardAll();
    this.getTransactionRecent();
  },
  methods: {
    async getCardAll() {
      const response = await CardService.getCardAll();
      this.cards = response.data.map(item => ({
        ...item,
        isShowNumber: false
      }));
    },
    getTransactionRecent() {
      try {
        const response = TransactionService.getTransactionRecent();
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
          if (response.statusText === 'Created') {
            this.notification('success', this.$t('messages.create_card_success'))
            this.getCardAll();
          }
        } catch(err) {
          this.notification('error', this.$t('messages.create_card_failed'))
        } finally {
          this.addCardModal.isLoading = false;
          this.handleCancel();
        }
      }
    },
    async onFreezeCard(data, index) {
      try {
        if (data) {
          const payload = { ...data };
          payload.status = !data.status;
          const response = await CardService.updateCard(payload.id, payload);
          if (response.statusText === "OK") {
            this.cards[index]['status'] = payload.status;
          }
        }
      } catch (error) {
        this.notification('success', this.$t('messages.update_card_failed'));
      }
    },
    async onDeleteCard(data, index){
      try {
        if (data) {
          const response = await CardService.deleteCard(data.id, index);
          if (response.statusText === "OK") {
            this.notification('success', this.$t('messages.delete_card_success'));
            this.cards.splice(index, 1);
          }
        }
      } catch (error) {
        this.notification('success', this.$t('messages.delete_card_failed'));
      }
    },
    onShowNumberCard(id) {
      const card = this.cards.find(item => item.id === id);
      card.isShowNumber = !card.isShowNumber;
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
<style lang="scss">
@import "@/assets/scss/components/desktop/card.scss";
</style>