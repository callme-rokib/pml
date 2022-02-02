<template>
  <div>
    <v-row>
      <v-col>
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
        <v-divider></v-divider>
        <v-card class="mt-4">
          <v-toolbar color="primary" dark>
            <v-toolbar-title> Daftar Users </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text dark @click="tambahUser"> Tambah User </v-btn>
          </v-toolbar>
          <v-card-title class="d-none d-sm-flex"> </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-if="infoRespon">
              <v-alert
                border="left"
                color="primary"
                dark
                close-text="Close Alert"
                dismissible
              >
                {{ pesan }}
              </v-alert>
            </div>
            <div class="text-center" v-if="loading">
              <h3>Loading...</h3>
            </div>
            <div v-else>
              <v-data-table
                :headers="headers"
                :items="listUsers"
                :items-per-page="10"
                item-key="id"
                class="mt-4"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon class="text-center" small @click="updateUser(item.id)"
                    >mdi-sync</v-icon
                  >
                  |
                  <v-icon class="text-center" small @click="deleteUser(item.id)"
                    >mdi-delete</v-icon
                  >
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card>
            <v-card-title>
              <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="user.name"
                      label="Nama*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="user.ndk"
                      label="NDK*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="user.password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      label="Password"
                      counter
                      required
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>
                <p>
                  *Wajib diisi <br />
                  -Nama Wajib diisi minimal 4 Karakter <br />
                  -Ndk Wajib diisi minimal 4 Karakter <br />
                  -Password Wajib diisi minimal 6 karakter
                </p>
              </small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="tutupUser">
                Tutup
              </v-btn>
              <v-btn color="blue darken-1" text @click.prevent="submit">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoRespon: false,
      dialog: false,
      pesan: '',
      valid: true,
      show1: false,
      show2: false,
      user: {
        name: '',
        ndk: '',
        password: '',
      },

      items: [
        {
          text: 'Home',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Master',
          disabled: false,
        },
        {
          text: 'Users',
          disabled: true,
          href: 'users',
        },
      ],
      listUsers: [],
      iduser: '',
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id',
          width: 'auto',
        },
        { text: 'Nama', value: 'name', width: 'auto' },
        { text: 'NDK', value: 'ndk', width: 'auto' },
        { text: 'Dibuat Pada', value: 'created_at', width: 'auto' },
        { text: 'Diperbaharui Pada', value: 'updated_at', width: 'auto' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      title: '',
      loading: false,
    };
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    tutupUser() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    tambahUser() {
      this.dialog = true;
      this.title = 'Tambah User Baru';
    },
    submit() {
      if (!this.user.name) {
        this.$refs.form.reset();
        this.infoRespon = true;
        this.pesan = 'Nama Wajib diisi';
        this.dialog = false;
      } else if (!this.user.ndk) {
        this.$refs.form.reset();
        this.infoRespon = true;
        this.pesan = 'Nama Wajib diisi';
        this.dialog = false;
      } else if (!this.user.password) {
        this.$refs.form.reset();
        this.infoRespon = true;
        this.pesan = 'Password Wajib diisi';
        this.dialog = false;
      } else {
        this.axios
          .post('/add-users', this.user)
          .then((response) => {
            this.$refs.form.reset();
            this.infoRespon = true;
            this.pesan = response.data.data;
            this.loadUser();
            this.dialog = false;
          })
          .catch(() => {
            this.$refs.form.reset();
            this.infoRespon = true;
            this.pesan =
              'Gagal menambahkan users, Periksa kembali inputan anda';
            this.dialog = false;
          });
      }
    },
    loadUser() {
      this.loading = true;
      this.axios.get(`/get-users`).then((response) => {
        this.listUsers = response.data.data;
        this.loading = false;
      });
    },

    deleteUser(id) {
      this.axios
        .delete(`/delete-user/${id}`)
        .then(() => {
          this.infoRespon = true;
          this.pesan = 'Berhasil menghapus User';
          this.loadUser();
        })
        .catch(() => {
          this.infoRespon = true;
          this.pesan = 'Gagal menghapus users';
          this.dialog = false;
        });
    },
    updateUser(id) {
      this.axios
        .get(`/update-users/${id}`)
        .then((response) => {
          this.infoRespon = true;
          this.pesan = response.data.data;
          this.loadUser();
          this.dialog = false;
        })
        .catch(() => {
          this.infoRespon = true;
          this.pesan = 'Gagal menambahkan users, Periksa kembali inputan anda';
          this.dialog = false;
        });
    },
  },
};
</script>
