// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css"

export default function (Vue, { appOptions }) {
  // Set default layout as a global component
  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify({})
  Vue.component('Layout', DefaultLayout)
}
