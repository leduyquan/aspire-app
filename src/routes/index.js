import Vue from "vue";
import VueRouter from "vue-router";
import Card from '../views/desktop/Card.vue'
import CardMobile from '../views/mobile/Card.vue'
Vue.use(VueRouter);
Vue.prototype.isMobile = true
console.log('isdd', Vue.prototype.isMobile)
const path = path => Vue.prototype.isMobile ? `${path}/mobile` : path
const routes = [
  {
    path: '/',
    redirect: path('/cards'),
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card
  },
  {
    path: '/cards/mobile',
    name: 'Cards',
    component: CardMobile
  },

]

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;