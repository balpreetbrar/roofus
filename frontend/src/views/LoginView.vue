<script lang="ts">
export default {
  name: 'LoginUser',
  data() {
    return {
      email: '',
      password: '',
      status: null
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => { this.$router.push({ name: 'propertylist' }) })
        .catch((err: any) => {
          this.status = err.response.status
          console.log(err.response.status)
          if (err.response.status === 503) {
            alert('Service unavailable, Please try again later')
          }
          if (err.response.status === 401) {
            alert('Invalid Credentials!')
          }

        })
    }
  }
}
</script>
<template>
  <div class="relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">

    <form @submit.prevent="login" class="w-full max-w-sm">
      <!-- <p>Email: {{ username }}</p> -->
      <div class="mb-6">
        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
        <input type="email"
          class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          v-model="email" placeholder="enter name" />
      </div>

      <!-- <p>Password: {{ password }}</p> -->
      <div class="mb-6">
        <label class="block text-sm font-semibold leading-6 text-gray-900">Password</label>
        <input type="password"
          class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          v-model="password" placeholder="enter password" required />
      </div>
      <p v-if="status === 400">
        Invalid login info.
      </p>
      <button type="submit"
        class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
        Login
        to account</button>
    </form>

  </div>
</template>