import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import setupFontAwesome from './font-awesome' // Import the Font Awesome setup

const app = createApp(App)

app.use(createPinia())
app.use(router)

setupFontAwesome(app) // Call the setup function

app.mount('#app')
