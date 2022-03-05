<template>
    <app-desktop></app-desktop>
</template>

<script>
import AppDesktop from '@/views/desktop/index.vue'

export default {
  name: 'App',
  components: {
    AppDesktop
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
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');
@import "@/assets/scss/styles.scss";
#components-layout {
  height: 100%;
}
</style>