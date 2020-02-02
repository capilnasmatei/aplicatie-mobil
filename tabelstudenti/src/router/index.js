import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewStud from '@/components/NewStud'
import ViewStud from '@/components/ViewStud'
import EditStud from '@/components/EditStud'
import Login from '@/components/Login'
import Register from '@/components/Register'
import LoginAdmin from '@/components/LoginAdmin'
import RegisterAdmin from '@/components/RegisterAdmin'
import firebase from 'firebase'


Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-stud',
      component: NewStud,
      meta: {
        requiresAuth: true,
        permission: 'owner'
      }
    },
    {
      path: '/edit/:stud_id',
      name: 'edit-stud',
      component: EditStud,
      meta: {
        requiresAuth: true,
        permission: 'owner'
      }
    },
    {
      path: '/:stud_id',
      name: 'view-stud',
      component: ViewStud,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (!firebase.auth().currentUser){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser){
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next();
    }
    } else {
      next();
  }
});

export default router;
