import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

/* Import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* Import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Import specific icons */
import { faChevronDown, faXmark, faFilter, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

/* Add icons to the library */
library.add(faChevronDown, faXmark, faFilter, faChevronLeft, faChevronRight)


const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')