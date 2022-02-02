import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Aset from '../views/Aset.vue';
import Jalur from '../views/Jalur.vue';
import JenisKerusakan from '../views/JenisKerusakan.vue';
import Km from '../views/Km.vue';
import Lajur from '../views/Lajur.vue';
import Meter from '../views/Meter.vue';
import Inspeksi from '../views/Inspeksi.vue';
import Laporan from '../views/Laporan.vue';
import Jadwal from '../views/Jadwal.vue';
import PemenuhanTemuan from '../views/PemenuhanTemuan.vue';
import InspeksiNew from '../views/InspeksiNew.vue';
import Profile from '../views/Profile.vue';
import Users from '../views/Users.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/users/:token',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/aset',
    name: 'Aset',
    component: Aset,
    meta: { requiresAuth: true },
  },
  {
    path: '/jalur',
    name: 'Jalur',
    component: Jalur,
    meta: { requiresAuth: true },
  },
  {
    path: '/jenis-kerusakan',
    name: 'JenisKerusakan',
    component: JenisKerusakan,
    meta: { requiresAuth: true },
  },
  {
    path: '/km',
    name: 'Km',
    component: Km,
    meta: { requiresAuth: true },
  },
  {
    path: '/lajur',
    name: 'Lajur',
    component: Lajur,
    meta: { requiresAuth: true },
  },
  {
    path: '/meter',
    name: 'Meter',
    component: Meter,
    meta: { requiresAuth: true },
  },
  {
    path: '/inspeksi',
    name: 'Inspeksi',
    component: Inspeksi,
    meta: { requiresAuth: true },
  },
  {
    path: '/inspeksi-new',
    name: 'InspeksiNew',
    component: InspeksiNew,
    meta: { requiresAuth: true },
  },
  {
    path: '/laporan',
    name: 'laporan',
    component: Laporan,
    meta: { requiresAuth: true },
  },
  {
    path: '/jadwal',
    name: 'jadwal',
    component: Jadwal,
    meta: { requiresAuth: true },
  },
  {
    path: '/pemenuhan-temuan',
    name: 'PemenuhanTemuan',
    component: PemenuhanTemuan,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt') == null;
  if (to.matched.some((record) => record.meta.guest)) {
    if (!token) next({ name: 'Home' });
    else next();
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
