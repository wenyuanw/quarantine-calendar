import { createApp } from 'vue'
import App from './App.vue'
import 'v-calendar/dist/style.css'
import SetupCalendar from 'v-calendar'

createApp(App)
  .use(SetupCalendar)
  .mount('#app')
