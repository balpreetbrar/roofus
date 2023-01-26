<script lang="ts" >
import AddUser from './AddUser.vue';
import axios from 'axios';
import { h, ref, onUpdated } from 'vue'
export default {
    components: {
        AddUser,
    },
    data() {

        return {

            items: [{ name: '', tenant_id: '' }],
            snackbar: false,
            texts: '',

        }
    },
    watch: {

    },


    mounted() {

    }, methods: {
        handleRemoveUser: function (tenant_id: any) {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            let token = userData.data.access_token
            axios.put('https://api-angad.networkon.in/roofus/tenant/remove', { tenant_id: tenant_id }, { headers: { "access_token": ` ${token}` } })
                .then((response: any) => {
                    if (response.status === 200) {
                        alert('Tenant Successfully Removed')

                        this.getUserList();
                    }
                })
                .catch((err: any) => {

                    alert('Some error occurred Try again later')


                })
        },
        getUserList: function () {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            // console.log(userData)
            let token = userData.data.access_token
            axios
                .get('https://api-angad.networkon.in/roofus/tenant/list?limit=10&skip=0'

                    , { headers: { "access_token": ` ${token}` } })
                .then((response: any) => this.items = response.data.data)
        }
    },
    created() {
        this.getUserList();
    },


}
</script>
<template>
    <SnackbarVue :isSnackbar="snackbar" :texts="texts" />
    <AddUser :getUpdatedList="getUserList" />
    <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">


        <ul class="bg-white rounded-lg  border-gray-200  text-gray-900 d-flex flex-wrap user-list">
            <li class="flex justify-between py-5 px-5 border-gray-200 w-96 rounded-t-lg box-border"
                v-for=" (item, index) in items" :key="item.tenant_id">

                {{ item.name }}

                <!-- </router-link> -->

                <button @click="handleRemoveUser(item.tenant_id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Remove
                </button>
            </li>
        </ul>




    </div>
</template>
<style>
.user-list {
    gap: 20px;
    margin-left: 10px;
}

.box-border {
    border: 1px solid #d3d3d3;
    border-radius: 10px;
}
</style>