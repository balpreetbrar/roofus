<script lang="ts" >
import CreateProperty from './CreateProperty.vue';
import axios from 'axios';
export default {
    components: {
        CreateProperty
    },
    data() {
        return {
            parentMessage: 'Property',
            items: [{ visitor_amount: '', id: '', property_id: '', name: '' }]
        }
    },
    mounted() {


    }, methods: {
        getPropertyList: function () {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            // console.log(userData)
            let token = userData.data.access_token
            axios
                .get(`https://api-angad.networkon.in/roofus/property/list?limit=10&skip=0`, { headers: { "access_token": ` ${token}` } })
                .then((response: any) => (this.items = response.data.data))
        },

        handleRemoveProperty: function (property_id: any) {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            let token = userData.data.access_token
            axios.put('https://api-angad.networkon.in/roofus/property/remove', { property_id: property_id }, { headers: { "access_token": ` ${token}` } })
                .then((response: any) => {
                    if (response.status === 200) {
                        alert('Successfully propery removed')
                        this.getPropertyList();
                    }
                }).catch((err: any) => {
                    alert(`Some error occured Try again later`)
                })
        },


    },

    created() {
        this.getPropertyList();
    },
}
</script>
<template>
    <CreateProperty :getOutputPropertyList="getPropertyList" />
    <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <ul class="bg-white rounded-lg  border-gray-200  text-gray-900 d-flex flex-wrap property-list">


            <li class="flex justify-between py-5 px-5 border-gray-200 w-96 rounded-t-lg box-border"
                v-for="(item, index) in items">

                {{ item.visitor_amount }} {{ item.name }}

                <button @click="handleRemoveProperty(item.property_id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Remove
                </button>
            </li>
        </ul>
    </div>
</template>
<style>
.property-list {
    gap: 20px;
    margin-left: 10px;
}

.box-border {
    border: 1px solid #d3d3d3;
    border-radius: 10px;
}
</style>