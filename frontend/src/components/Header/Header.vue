<template>
    <!-- <header className="main-header"> -->
    <div className="header">
        .
        <span class="logoutButton">
            <button type="button" class="logoutButton" @click="logout">
                Log out
            </button></span>
    </div>
    <!-- </header> -->
</template>

<script>
// import CMenu from '../Menu/Menu.vue'
export default {
    name: 'mainHeader',
    components: {
        //    CMenu
    },
    /**
     * @inheritDoc
     */
    watch: {
        /**
         * Change parameters f route changes
         */
        $route() {
            this.showSearch = false;
            this.search = null;
        },
    },
    /**
     * @inheritDoc
     */
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    /**
     * @inheritDoc
     */
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        /**
         *  add class to menu in scroll page and remove it
         */
        handleScroll() {
            const header = document.querySelector('.main-header');
            if (window.scrollY > 10 && !header.className.includes('fixed')) {
                header.classList.add('fixed');
            } else if (window.scrollY < 10) {
                header.classList.remove('fixed');
            }
        },
        /**
       * Menu toggle
       */
        menuToggle() {
            this.isMenuOpen = !this.isMenuOpen;
            document.querySelector('.menu-wrapper')
                .classList.toggle('mobile-nav-open');
        },
        logout() {
            this.$store.dispatch('logout')
        }
    },
};
</script>

<style>
.header {
    background-color: #11101d;
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    min-height: 60px;
    max-height: 60px;
}

.main-header {
    min-height: 100%;
}

.logoutButton {
    color: white;
    float: right;
    padding: 8px;
}
</style>