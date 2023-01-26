<script lang="ts">
import axios from "axios"
export default {
    data() {
        return {
            name: '',
            address: '',
            dialog: false,



        }
    },
    props: ['getOutputPropertyList'],
    methods: {

        createProperty: function () {
            let userData: any = localStorage.getItem("user");
            userData = JSON.parse(userData)
            let token = userData.data.access_token
            axios
                .post('https://api-angad.networkon.in/roofus/property/create', {
                    name: this.name,
                    address: this.address,


                }, { headers: { "access_token": ` ${token}` } })
                .then((response) => {
                    if (response.status === 200) {
                        this.getOutputPropertyList();
                        alert('Property successfully Created')
                    }
                })
                .catch((err: any) => {
                    alert('some error occured try again later')
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
                    Create Property
                </v-btn>
            </template>
            <v-card>
                <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
                    <form @submit.prevent="createProperty" class="w-full max-w-sm">

                        <div class="mb-6">
                            <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
                            <input type="text"
                                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                                v-model="name" placeholder="enter name" required />
                        </div>

                        <div class="mb-6">
                            <label class="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                            <input type="text"
                                class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                                v-model="address" placeholder="enter address" required />
                        </div>

                        <button @click="dialog = false" type="submit"
                            class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">Create
                            Property</button>
                    </form>
                </div>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </v-row>
</template>
<!-- <template>

    <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
        <form @submit.prevent="createProperty" class="w-full max-w-sm">

            <div class="mb-6">
                <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
                <input type="text"
                    class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                    v-model="name" placeholder="enter email" required />
            </div>

            <div class="mb-6">
                <label class="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                <input type="text"
                    class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
                    v-model="address" placeholder="enter address" required />
            </div>

            <button type="submit"
                class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">Create
                Property</button>
        </form>
    </div>

</template> -->

<style>
#preview {
    display: flex;
    justify-content: center;
    align-items: center;
}

#preview img {
    max-width: 100%;
    max-height: 500px;
}
</style>