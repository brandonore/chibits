import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import './index.css'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHashtag, faBolt, faGaugeHigh, faGaugeCircleBolt, faCircleInfo, faUser, faHouse, faCoins, faCoinFront, faStore
} from '@fortawesome/pro-regular-svg-icons'
import { faCircleCheck, faWallet, faCircleExclamation, faStars, 
    faStarShooting, faStar, faCheck, faCircle, faCircleX
} from '@fortawesome/pro-solid-svg-icons'
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHashtag, faBolt, faGaugeHigh, faGaugeCircleBolt, faCircleCheck, faWallet,
     faStarShooting, faCircleExclamation, faStars, faSpinnerThird, faStar, faCircleInfo,
     faEthereum, faCheck, faCircle, faCircleX, faUser, faHouse, faCoins, faCoinFront, faStore)

createApp(App).use(Vuex).use(store).use(moshaToast).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
