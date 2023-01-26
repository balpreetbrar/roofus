declare module '@vue-hero-icons/outline';
declare module 'axios'
declare module 'vue3-tel-input'
declare module 'vue-multiselect'
declare module 'SidebarMenuAkahon'
declare module 'mainHeader'
import {Store} from "./store.js"

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $store: Store;
    }
  }