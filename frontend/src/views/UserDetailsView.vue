<script lang="ts" >
import CreateProperty from './CreateProperty.vue';
import axios from 'axios';
import baseURL from '../api/url'
export default {
    data() {
        return {
            props: ['id'],
            parentMessage: 'Property',
            items: [{ visitor_amount: '', id: '', property_id: '', name: '' }]
        }
    },
    mounted() {
        let userData: any = localStorage.getItem("user");
        userData = JSON.parse(userData)
        // console.log(userData)
        let token = userData.data.access_token
        axios
            .get(baseURL+`tenant/details?tenant_id=${this.$route.params.id}`, { headers: { "access_token": ` ${token}` } })
            .then((response: any) => (this.items = response.data.data))
    }
}
</script>
<template>

    <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">

            <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg" v-for="(item, index) in items">
                {{ item.visitor_amount }} {{ item.name }}


            </li>

        </ul>
    </div>
</template>