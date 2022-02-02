<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title
                >Selamat Datang, Silahkan login terlebih dahulu</v-toolbar-title
              >
            </v-toolbar>
            <div class="pl-5 pt-5" v-if="errors">
              <h5 color="primary">{{ errors }}</h5>
            </div>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="submit"
              >
                <v-text-field
                  prepend-icon="mdi-account-circle"
                  name="ndk"
                  label="NDK"
                  type="text"
                  v-model="ndk"
                  :rules="ndkRules"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-shield-lock"
                  name="password"
                  label="Password"
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[passwordRules.required, passwordRules.min]"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="mt-4"
                @click="submit"
                dark
                :loading="loading"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    show1: false,
    password: '',
    errors: '',
    infoError: false,
    passwordRules: {
      required: (value) => !!value || 'Password wajib diisi.',
      min: (v) => v.length >= 6 || 'Min 6 karakter',
    },
    ndk: '',
    ndkRules: [(v) => !!v || 'NDK wajib diisi'],
  }),

  methods: {
    submit() {
      this.loading = true;
      this.$refs.form.validate();
      if (!this.ndk) {
        this.loading = false;
        this.infoError = true;
        this.errors = 'NDK wajib diisi';
      } else if (!this.password) {
        this.loading = false;
        this.infoError = true;
        this.errors = 'Password wajib diisi';
      } else {
        this.axios
          .post('/login', {
            ndk: this.ndk,
            password: this.password,
          })
          .then((response) => {
            let data = response.data;
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('jwt', data.token);
            this.$emit('setData');
            this.loading = false;
            this.$router.push({
              name: 'Home',
              params: { userId: data.user.id },
            });
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
