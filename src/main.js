import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt
} from '@fortawesome/pro-regular-svg-icons'
import { faCircleCheck, faWallet, faHexagonExclamation } from '@fortawesome/pro-solid-svg-icons'
import { faStarShooting } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt, faCircleCheck, faWallet,
     faStarShooting, faHexagonExclamation)

createApp(App).use(Vuex).use(store).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
