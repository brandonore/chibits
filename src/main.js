import { createApp, provide } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import './index.css'
import Moralis from './plugins/moralis'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt
} from '@fortawesome/pro-regular-svg-icons'
import { faCircleCheck, faWallet, faHexagonExclamation, faStars, 
    faStarShooting, faStar
} from '@fortawesome/pro-solid-svg-icons'
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt, faCircleCheck, faWallet,
     faStarShooting, faHexagonExclamation, faStars, faSpinnerThird, faStar)

createApp(App).provide('moralis', Moralis).use(Vuex).use(store).use(moshaToast).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
