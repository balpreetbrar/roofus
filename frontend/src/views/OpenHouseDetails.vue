<script lang="ts" >
import axios from 'axios';
// import Multiselect from 'vue-multiselect';
export default {

    data() {
        return {
            props: ['id'],
            items: [{ visitor_amount: '', id: '', property_id: '', start_date: '' }],
            dialog: false,
            tenants: [{ tenant_id: '', name: '' }],
            open_house_id: '',
            favorties: [],
            value: []



        }
    },
    mounted() {
        let userData: any = localStorage.getItem("user");
        userData = JSON.parse(userData)
        let token = userData.data.access_token

        axios
            .get(`https://api-angad.networkon.in/roofus/openHouse/details?id=${this.$route.params.id}`, { headers: { "access_token": ` ${token}` } })
            .then((response: any) => this.items = response.data.data.data)
        axios
            .get('https://api-angad.networkon.in/roofus/tenant/list?limit=10&skip=0', { headers: { "access_token": ` ${token}` } })
            .then((response: any) => {
                console.log(response.data.data)
                let responseArray = response.data.data
                responseArray = responseArray.map((item: any) => {
                    item['title'] = item['name']
                    item['value'] = item['tenant_id']
                    delete item['name']
                    delete item['tenant_id']
                    return item
                })
                console.log(responseArray)
                this.favorties = responseArray;

            })

    }, methods: {
        enrollTentantHandler: function () {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            let token = userData.data.access_token

            axios.post('https://api-angad.networkon.in/roofus/openHouse/enroll', {

                open_house_id: Number(this.$route.params.id),
                tenant_id: this.value

            }, { headers: { "access_token": ` ${token}` } },

            )
                .then((response: any) => {
                    if (response.status === 200) {
                        alert('Tenant is successfully enrolled')
                    }
                })
                .catch((error: any) => {
                    alert('Some error occured Try again later')
                })


        }
    }
}
</script>
<template>

    <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props">
                        Create Open House
                    </v-btn>
                </template>
                <v-card>
                    <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">

                        <form @submit.prevent="enrollTentantHandler" class="mb-6">



                            <label class="block text-sm font-semibold leading-6 text-gray-900" for="property">Select
                                Tenants</label>
                            <v-container fluid>
                                <v-select v-model="value" :items="favorties" chips label="Tenants" multiple>
                                    <template v-slot:selection="{ item, index }">
                                        <v-chip v-if="index < 2">
                                            <span>{{ item.title }}</span>
                                        </v-chip>
                                        <span v-if="index === 2" class="text-grey text-caption align-self-center">
                                            (+{{ value.length - 2 }} others)
                                        </span>
                                    </template>
                                </v-select>
                            </v-container>



                            <button block @click="dialog = false"
                                class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">Create
                                Enroll User to Open House</button>
                        </form>
                        <v-card-actions>
                            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                        </v-card-actions>

                    </div>

                </v-card>

            </v-dialog>
        </v-row>

        <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">

            <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg" v-for="(item, index) in items">

                <h1>Visitor Amount: {{ item.visitor_amount }}</h1> {
                <h1>Property ID {{ item.property_id }}</h1>
                <h1>Start Date {{ item.start_date }}</h1>

            </li>
        </ul>
    </div>
</template>