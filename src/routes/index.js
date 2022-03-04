import Vue from "vue";
import VueRouter from "vue-router";
import Card from '../views/desktop/Card.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/cards',
  },
  {
    path: '/cards',
    name: 'Cards',
    component: Card
  },
  // {
  //   path: '/Todo/:index',
  //   name: 'Todo',
  //   component: Todo
  // }

]

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;