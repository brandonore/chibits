import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
