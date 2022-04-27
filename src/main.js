import { createApp, provide } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'
import './index.css'
import Moralis from './plugins/moralis'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt
} from '@fortawesome/pro-regular-svg-icons'
import { faCircleCheck, faWallet, faHexagonExclamation, faStars, faStarShooting, } from '@fortawesome/pro-solid-svg-icons'
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHashtag, faCoins, faBolt, faGaugeHigh, faGaugeCircleBolt, faCircleCheck, faWallet,
     faStarShooting, faHexagonExclamation, faStars, faSpinnerThird)

store.subscribe((mutation, state) => {
    localStorage.setItem('userAccount', JSON.stringify(state.userAccount))
})

createApp(App).provide('moralis', Moralis).use(Vuex).use(store).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
