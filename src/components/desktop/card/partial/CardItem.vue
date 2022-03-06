<template>
  <div class="card-item" :class="{'card-item--inactive': !status}">
    <div class="card-item__logo-wrapper">
      <img class="card-item__logo svg-render" :src="iconPath(`logos/dashboard.svg`)" />
    </div>
    <div class="card-item__name">{{ fullName }}</div>
    <div class="card-item__number">
      <card-item-number :number="firstCardNumber" :is-show="isShowNumber"/>
      <card-item-number :number="secondCardNumber" :is-show="isShowNumber"/>
      <card-item-number :number="thirdCardNumber" :is-show="isShowNumber"/>
      <card-item-number :number="lastCardNumber" :is-show="true"/>
    </div>
    <div class="card-item__date-cvv">
      <div class="card-date">
        <div class="card-date__label">{{ dayCard }}</div>:
        <div class="card-date__code">{{ monthCard }}</div>
      </div>
      <div class="card-cvv">
        <div class="card-cvv__label">{{ $t('card.cvv') }}:</div>
        <div class="card-cvv__code">***</div>
      </div>
    </div>
    <img class="card-item__visa" :src="iconPath(`icons/cards/visa.svg`)" />
  </div>
</template>

<script>
import CardItemNumber from './CardItemNumber.vue'

export default {
  components: {
    CardItemNumber
  },
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    cardNumber: {
      type: String,
      required: true
    },
    dateTime: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    isShowNumber: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    dayCard() {
      return this.formatDateTime(this.dateTime, 'ddd');
    },
    monthCard() {
      return this.formatDateTime(this.dateTime, 'MM/YY');
    },
    firstCardNumber() {
      return this.cardNumber.slice(0, 4);
    },
    secondCardNumber() {
      return this.cardNumber.slice(4, 8);
    },
    thirdCardNumber() {
      return this.cardNumber.slice(8, 12);
    },
    lastCardNumber() {
      return this.cardNumber.slice(this.cardNumber.length - 4);
    },
  },
  mounted() {
    document.querySelectorAll('img.svg-render').forEach(function(img){
      var imgID = img.id;
      var imgClass = img.className;
      var imgURL = img.src;
      fetch(imgURL).then(function(response) {
          return response.text();
      }).then(function(text){
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(text, "text/xml");
          var svg = xmlDoc.getElementsByTagName('svg')[0];
          if(typeof imgID !== 'undefined') {
              svg.setAttribute('id', imgID);
          }
          if(typeof imgClass !== 'undefined') {
              svg.setAttribute('class', imgClass+' replaced-svg');
          }
          svg.removeAttribute('xmlns:a');
          if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
              svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
          }
          img.parentNode.replaceChild(svg, img);
      });
    });
  }
}
</script>