// vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/store'

// other
import './index.css'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { DateTime } from "luxon";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { v4 as uuidv4 } from 'uuid'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
    faHashtag, faBolt, faGaugeHigh, faGaugeCircleBolt, faCircleExclamation, faCircleInfo, faUser, faHouse, faCoins, faCoinFront, faStore
} from '@fortawesome/pro-regular-svg-icons'
import { faCircleCheck, faWallet, faStars, 
    faStarShooting, faStar, faCheck, faCircle, faCircleX, faWifiSlash, faCircleDollar
} from '@fortawesome/pro-solid-svg-icons'
import { faSpinnerThird } from '@fortawesome/pro-light-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHashtag, faBolt, faGaugeHigh, faGaugeCircleBolt, faCircleCheck, faWallet,
     faStarShooting, faCircleExclamation, faStars, faSpinnerThird, faStar, faCircleInfo,
     faEthereum, faCheck, faCircle, faCircleX, faUser, faHouse, faCoins, faCoinFront, faCircleDollar, faStore, faWifiSlash)

createApp(App).use(Vuex).use(store).use(moshaToast).component('Datepicker', Datepicker).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')
