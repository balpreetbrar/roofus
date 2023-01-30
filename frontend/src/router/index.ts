import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from "../views/SignUpView.vue"
import LoginView from "../views/LoginView.vue"
import OpenHouseListing from "../views/OpenHouseListing.vue"
import PropertyListing from "../views/PropertyListing.vue"
import AuthenticateViewVue from '../views/AuthenticateView.vue'
import UserListing from "../views/UserListing.vue"
import UserDetailsView from "../views/UserDetailsView.vue"
import PropertyDetailView from "../views/PropertyDetailView.vue"
import OpenHouseDetails from "../views/OpenHouseDetails.vue"

import SidebarMenuAkahon from "../components/Sidebar/Sidebar.vue"
import mainHeader from "../components/Header/Header.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: SidebarMenuAkahon
    },
    {
      path: '/mainHeadewr',
      name: 'mainHeadewr',
      component: mainHeader
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path:'/authenticate',
      name: '/authenticate',
      component: () => import('../views/AuthenticateView.vue')

    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
      
      {
        path: '/openhouselist',
        name: 'openhouselist',
        component: () => import('../views/OpenHouseListing.vue')
      },
      
        {
          path: '/propertylist',
          name: 'propertylist',
          component: () => import('../views/PropertyListing.vue')
        },
      
      {
        path:'/users',
        name:'/users',
        component:() => import('../views/UserListing.vue')
      },
      {
        path:'/user/:id?',
        name:'singleuser',
        component:() => import('../views/UserDetailsView.vue'),
        props:true
      },
      {
        path:'/property/:id?',
        name:'single property',
        component:() => import('../views/PropertyDetailView.vue'),
        props:true
      },
      {
        path:'/openhouse/:id?',
        name:'single openhouse',
        component:() => import('../views/OpenHouseDetails.vue'),
        props:true
      }
    
  ]
 
})
router.beforeEach((to, from, next) => {
  // redirect to login page if user is not logged in and trying to access a restricted page
  const publicPages = ['/authenticate', '/']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/authenticate')
  }

  next()
})
export default router
