<script lang="ts">



export default {


  name: 'RegisterUser',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      status: null,
      country_code: '+1',
      phone_number: '',
    }
  },

  methods: {
    register() {
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          country_code: this.country_code,
          phone_number: this.phone_number

        })
        .then(() => { this.$router.push({ name: 'login' }) })
        .catch((err: any) => { this.status = err.response.status })
    }
  }

}
</script>
<script lang="ts" setup>

</script>
<template>
  <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">

    <form @submit.prevent="register" class="w-full max-w-sm">
      <!-- <p>Email: {{ username }}</p> -->
      <div class="mb-6">
        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
        <input type="email"
          class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          v-model="email" placeholder="enter email" required />
      </div>
      <!-- <p>Password: {{ password }}</p> -->
      <div class="mb-6">
        <label class="block text-sm font-semibold leading-6 text-gray-900">Password</label>
        <input type="password"
          class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          v-model="password" placeholder="enter password" required />
      </div>
      <div class="mb-6">
        <label for="text" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
        <input type="text"
          class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          v-model="name" placeholder="Enter name" required />
      </div>

      <div class="mb-6">
        <label for="number" class="block text-sm font-semibold leading-6 text-gray-900">Phone Number</label>
        <input type="number"
          class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          v-model="phone_number" placeholder="Enter phone number" required />

      </div>
      <div style="display:none">
        <input v-model="country_code" type="text" />

      </div>

      <button type="submit"
        class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">Sign
        in to account</button>
    </form>

  </div>
</template>

