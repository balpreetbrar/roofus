<script lang="ts" >
import axios from "axios"
export default {

    data() {
        return {
            visitor_amount: '',
            start_date: '',
            selected: '',
            dialog: false,
            property: [{ name: '', property_id: '' }]
        }
    },
    props: ['getUpdatedOpenHouseList'],
    mounted() {
        let userData: any = localStorage.getItem("user");
        userData = JSON.parse(userData)
        let token = userData.data.access_token
        axios
            .get('https://api-angad.networkon.in/roofus/property/list?limit=10&skip=0', { headers: { "access_token": ` ${token}` } })
            .then((response: any) => this.property = response.data.data)
    }, methods: {
        createOpenHouse: function () {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            let token = userData.data.access_token
            axios
                .post('https://api-angad.networkon.in/roofus/openHouse/create', {
                    visitor_amount: this.visitor_amount,
                    start_date: this.start_date,
                    property_id: this.selected


                }, { headers: { "access_token": ` ${token}` } })
                .then((response) => {
                    if (response.status === 200) {
                        this.getUpdatedOpenHouseList();
                        alert('Open House Successfully Created')
                    }
                })
                .catch((err: any) => {
                    alert('Some error occured try again later')
                })
        }
    }

}

</script>

<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="500px">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                    Create Open House
                </v-btn>
            </template>
            <v-card>
                <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">

                    <form @submit.prevent="createOpenHouse" class="w-full max-w-sm">
                        <div class="mb-6">
                            <label for="number" class="block text-sm font-semibold leading-6 text-gray-900">
                                Vistor Amount</label>
                            <input
                                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                                v-model="visitor_amount" placeholder="vistor amount" type="number" />
                        </div>
                        <div class="mb-6">
                            <label for="date" class="block text-sm font-semibold leading-6 text-gray-900">Enter Start
                                Date</label>

                            <input
                                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                                v-model="
                                start_date" type="date" name="date" />

                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-semibold leading-6 text-gray-900" for="property">Select
                                Property</label>
                            <select v-model="selected" id="property"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="option in property" :value="option.property_id">
                                    {{ option.name }}
                                </option>

                            </select>

                        </div>

                        <button block @click="dialog = false"
                            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">Create
                            Open House</button>
                    </form>
                    <v-card-actions>
                        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                    </v-card-actions>

                </div>

            </v-card>

        </v-dialog>
    </v-row>
</template>

<style>
.sign-up {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>