import Vue from 'vue'
import Router from 'vue-router'
import PagosView from '@/views/PagosView.vue'
import MultipleChoiceView from '@/views/MultipleChoiceView.vue'

// Registro del Router como plugin de Vue
Vue.use(Router)

// Exportar una nueva instancia de Router con las rutas configuradas
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pagos',
      component: PagosView
    },
    {
      path: '/multiple-choice',
      name: 'MultipleChoice',
      component: MultipleChoiceView
    }
  ]
})