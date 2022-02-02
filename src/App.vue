<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="isLoggedIn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>PML Aplication V.1.0.0</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="ma-2"
        outlined
        color="white"
        v-if="isLoggedIn"
        text
        @click="logout"
      >
        Log Out
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" v-if="isLoggedIn">
      <v-list-item>
        <v-list-item-content>
          <v-img src="../src/assets/logo_header.png"></v-img>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          link
          :to="{ name: 'Profile', params: { token: user.id } }"
          active-class="bg-active"
        >
          <v-list-item-icon>
            <v-icon left>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">{{
              user.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/home" active-class="bg-active">
          <v-list-item-icon>
            <v-icon left>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="inspeksi" active-class="bg-active">
          <v-list-item-icon>
            <v-icon left>mdi-lead-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Inspeksi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="pemenuhan-temuan" active-class="bg-active">
          <v-list-item-icon>
            <v-icon left>mdi-bullhorn</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pemenuhan Temuan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="laporan" active-class="bg-active">
          <v-list-item-icon>
            <v-icon left>mdi-file</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Laporan</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="jadwal" active-class="bg-active">
          <v-list-item-icon>
            <v-icon left>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Jadwal</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Master -->
        <v-list-group
          no-action
          prepend-icon="mdi-cog-outline"
          v-if="user.level === 1"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title> Master </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item link to="aset" active-class="bg-active">
            <v-list-item-content>
              <v-list-item-title> Aset </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="jenis-kerusakan" active-class="bg-active">
            <v-list-item-content>
              <v-list-item-title> Kondisi Kerusakan </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="jalur" active-class="bg-active">
            <v-list-item-content>
              <v-list-item-title> Jalur </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="lajur" active-class="bg-active">
            <v-list-item-content>
              <v-list-item-title> Lajur </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="km" active-class="bg-active">
            <v-list-item-content>
              <v-list-item-title> KM </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="meter" active-class="bg-active">
            <v-list-item-content>
              <v-list-item-title> Meter </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="users" active-class="bg-active">
            <v-list-item-content>
              <v-list-item-title> Users </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Master -->
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <!-- jika menggunakan vue-router -->
        <v-slide-y-transition>
          <router-view @setData="getData"></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} —
          <strong>Astra Infra | Toll Road [PML]</strong>
        </v-card-text>
      </v-footer>
    </v-card>
  </v-app>
</template>
<style scoped>
.bg-active {
  background-color: #b71c1c;
  color: white !important;
}
</style>
<script>
import update from './mixins/update';
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    updateExists: false,
    user: null,
    isLoggedIn: null,
  }),
  mixins: [update],
  beforeMount() {
    this.getData();
  },
  created() {
    document.addEventListener('swUpdated', this.updateAvailable, {
      once: true,
    });
  },
  methods: {
    updateAvailable(event) {
      this.registration = event.detail;
      this.updateExists = true;
      this.refreshApp();
    },
    getData() {
      this.isLoggedIn = localStorage.getItem('jwt') !== null;
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      this.getData();
      this.$router.push('/');
    },
  },
};
</script>
