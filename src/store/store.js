import { createStore } from 'vuex'
import wallet from "./modules/walletState/";

export default createStore({
	modules: {
		wallet: wallet
	},
});
