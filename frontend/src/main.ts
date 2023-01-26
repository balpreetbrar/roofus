import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css"
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import VueSidebarMenu from 'vue-sidebar-menu'
import SidebarMenuAkahon from "../src/components/Sidebar/Sidebar.vue"

const app = createApp(App);

app.use(store);
app.use(SidebarMenuAkahon);
app.use(router);
app.use(vuetify)


app.mount("#app");

