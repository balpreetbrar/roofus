<script lang="ts" >
import CreateOpenHouse from './CreateOpenHouse.vue';
import axios from 'axios';
import { h, ref, onUpdated } from 'vue'

export default {
    components: {
        CreateOpenHouse
    },

    data() {
        return {

            items: [{ visitor_amount: '', start_date: '', property_name: '', address: '', property_id: '', id: '' }]
        }
    },
    watch: {

    },

    mounted() {

    },
    methods: {

        handleRemoveOpenHouse: function (id: any) {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            let token = userData.data.access_token
            axios.put('https://api-angad.networkon.in/roofus/openHouse/remove', { id: id }, { headers: { "access_token": ` ${token}` } })
                .then((response: any) => {
                    if (response.status === 200) {
                        alert('Successfully Removed Open House');
                        this.getOpenHouseList()
                    }
                }).catch((err: any) => {
                    alert('some error occurred try again later')
                })
        },
        getOpenHouseList: function () {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            let token = userData.data.access_token
            axios
                .get('https://api-angad.networkon.in/roofus/openHouse/list?limit=10&skip=0&fetch_property_details=true', { headers: { "access_token": ` ${token}` } })
                // .then((response: any) => this.items = (response.data.data))
                .then((response) => {

                    this.items = response.data.data
                })
        },

    },
    created() {
        this.getOpenHouseList();
    },


}
</script>
<template>
    <CreateOpenHouse :getUpdatedOpenHouseList="getOpenHouseList" />
    <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <ul class="bg-white rounded-lg  border-gray-200  text-gray-900 d-flex flex-wrap open-house-list">

            <li class="flex justify-between py-5 px-5 border-gray-200 w-96 rounded-t-lg box-border"
                v-for="(item, index) in items">
                <div class=" row open-house-data">
                    <div>Visitor Amount: {{ item.visitor_amount }}</div>

                    <!-- <span>Start Date: {{ item.start_date }}</span> -->
                    <div>Property Name: {{ item.property_name }}</div>
                </div>
                <!-- {{ Date.parse(item.start_date) }}
                {{ item.property_name }}
                {{ item.address }}
                {{ item.property_id }}
                {{ item.address }} -->

                <button @click="handleRemoveOpenHouse(item.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Remove
                </button>
               <p class="assign-user"> <router-link :to="'/openhouse/' + item.id">Assign Tenants</router-link></p>

            </li>
        </ul>
    </div>
</template>
<style>
.open-house-data {
    display: inline-block;
}

.open-house-list {
    gap: 20px;
    margin-left: 10px;
}

.box-border {
    border: 1px solid #d3d3d3;
    border-radius: 10px;
}
.assign-user{
color: #1394ff;
padding: 10px;
}
</style>