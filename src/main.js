import '@/assets/scss/app.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Google reCAPTCHA v3
app.use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '',
    loaderOptions: {
        autoHideBadge: false,
        explicitRenderParameters: {
            badge: 'bottomright'
        }
    }
})

app.mount('#app')
