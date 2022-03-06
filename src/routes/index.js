import Vue from "vue";
import VueRouter from "vue-router";
import Card from '@/views/desktop/Card.vue'
import CardMobile from '@/views/mobile/Card.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter);
// Vue.prototype.isMobile = true
Vue.prototype.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
    name: 'CardsMobile',
    component: CardMobile
  },
  {
     path: '*',
     component: NotFound
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;