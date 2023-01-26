<template>
    <div>
        <component :is="loginOrRegister" />
        <a class="auth-link space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4 underline "
            v-show="isNewUser" @click="toggleComponent">Don't have an account? Create one.</a>
        <a class='auth-link space-y-4 text-sm text-gray-900 sm:flex sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4'
            v-show="!isNewUser" @click="toggleComponent">Already have an account? Login.</a>
    </div>
</template>

<script lang="ts">
import SignUpView from './SignUpView.vue'
import LoginView from './LoginView.vue'

export default {
    components: { SignUpView, LoginView },
    computed: {
        isNewUser() {
            return this.$store.state.isNewUser
        },
        loginOrRegister() {
            return this.isNewUser ? LoginView : SignUpView
        }
    },
    methods: {
        toggleComponent() {
            this.$store.dispatch('isNewUser', !this.isNewUser)
        }
    }
}
</script>

<style scoped>
.auth-link {
    font-size: 0.8em;
    text-decoration: underline;
    color: #2c3e50;
    cursor: pointer;
}
</style>