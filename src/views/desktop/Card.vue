<template>
  <div class="card-page">
    <div class="card-page__header">
      <div class="card-title">{{ $t('card.available_balance')}}</div>
      <div class="card-figures">
        <div class="card-balance">
          <div class="card-balance__icon card-balance__icon--active">
            S$
          </div>
          <div class="card-balance__number">3,000</div>
        </div>
        <app-button :label="$t('card.new_card')" @click="openAddCardModal">
           <img class="sidebar-item__logo" :src="iconPath(`icons/global/plus.svg`)" />
        </app-button>
      </div>
    </div>
    <div class="card-page__content">
      <a-tabs default-active-key="debit-cards">
        <a-tab-pane key="debit-cards" :tab="$t('card.my_debit_cards')">
          <CardDebit></CardDebit>
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
            v-model="form.cardName"
            vid="title"
            rules="required"
            label="Tên giáo trình"
            placeholder="Tên giáo trình"
          ></app-input>
        </a-form>
      </ValidationObserver>
      <template slot="footer">
        <a-button key="submit" type="primary" class="btn-register" :loading="addCardModal.isLoading" @click="onSaveCard">
          {{$t('app.submit')}}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import CardDebit from '@/components/card/CardDebit.vue';
import CardCompany from '@/components/card/CardCompany.vue';
import CardService from '../../services/card.service'
import { ValidationObserver } from 'vee-validate';

export default {
  components: {
    CardDebit,
    CardCompany,
    ValidationObserver,
  },
  data() {
    return {
      form: {
        cardName: ''
      },
      addCardModal: {
        isLoading: false,
        visible: false
      }
    };
  },
  mounted() {
  },
  methods: {
    async onSaveCard() {
      const isValid = await this.$refs.observer_card.validate()
      if (isValid) {
        try {
          console.log('this', this.form.cardName)
          this.addCardModal.isLoading = true
          const response = CardService.getCardAll();
          console.log('re', response)
          this.notification('success', this.$t('messages.create_invoice_success'))
         
          // this.getInvoiceData()
        } catch(err) {
          this.notification('error', this.$t('messages.update_invoice_failed'))
        } finally {
          this.addCardModal.isLoading = false;
          this.addCardModal.visible = false;
        }
      }
    },
    openAddCardModal() {
      console.log('kka')
      this.addCardModal.visible = true
    },
    handleCancel() {
      this.addCardModal.visible = false;
    }
  }
}
</script>