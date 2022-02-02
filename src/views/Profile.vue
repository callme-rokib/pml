<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
      <v-divider></v-divider>
      <v-card class="mt-2">
        <v-card-title class="text-uppercase">
          Detail Profil {{ user.name }}
        </v-card-title>
        <v-divider></v-divider>
        <div v-if="errors">
          <v-card-title class="text-uppercase">
            <h6>{{ errors }}</h6>
          </v-card-title>
          <v-divider></v-divider>
        </div>
        <v-row class="mx-2 mt-2">
          <v-col cols="6">
            <v-text-field
              label="NAMA"
              v-model="user.name"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="NDK"
              v-model="user.ndk"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mx-2 mt-2">
          <v-col cols="12">
            <v-text-field
              label="Password Baru"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[passwordRules.required, passwordRules.min]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-2 pb-5">
          <v-btn
            class="ma-2"
            :loading="loading"
            :disabled="loading"
            color="primary"
            @click="update"
          >
            Update Password
          </v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      user: '',
      errors: '',
      id: '',
      password: '',
      loading: false,
      show1: false,
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Profile',
          disabled: false,
        },
      ],
      passwordRules: {
        required: (value) => !!value || 'Password wajib diisi.',
        min: (v) => v.length >= 6 || 'Min 6 karakter',
      },
    };
  },
  beforeMount() {
    this.axios
      .get(`/users/${this.$route.params.token}`)
      .then((response) => {
        this.user = response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    update() {
      this.loading = true;
      this.loading = false;
      if (!this.password) {
        this.loading = false;
        this.errors = 'Password wajib diisi';
      } else {
        this.axios
          .post('/update-profile', {
            id: this.$route.params.token,
            password: this.password,
          })
          .then((response) => {
            this.errors = response.data.data;
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            this.infoError = true;
            this.errors = error.response.data.error;
          });
      }
    },
  },
};
</script>
