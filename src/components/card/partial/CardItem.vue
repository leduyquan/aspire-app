<template>
  <div class="card-item">
    <img class="card-item__logo svg-render" :src="iconPath(`logos/aspire.svg`)" />
    <div class="card-item__name">{{ name }}</div>
    <div class="card-item__number">
      <CardItemNumber/>
      <CardItemNumber/>
      <CardItemNumber/>
      <span class="card-item-year">2020</span>
    </div>
    <div class="card-item__date-cvv">
      <div class="card-date">
        <div class="card-date__label">Thru:</div>
        <div class="card-date__code">12/20</div>
      </div>
      <div class="card-cvv">
        <div class="card-cvv__label">CVV:</div>
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
    name: {
      type: String,
      // required: true
    },
    cardNumber: {
      type: String,
      default: ''
    }
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