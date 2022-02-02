<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
        <v-divider></v-divider>
        <v-card class="mt-4">
          <v-toolbar color="primary" dark>
            <v-toolbar-title> Data Aset </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text dark @click="tambahAset"> Tambah Aset </v-btn>
          </v-toolbar>
          <v-card-text>
            <div v-if="infoRespon">
              <v-alert
                border="left"
                color="warning"
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
                :items="listItems"
                :items-per-page="10"
                :search="search"
                item-key="id"
                class="mt-4"
              >
                <template v-slot:top>
                  <v-text-field
                    v-model="search"
                    label="Masukan kata pencarian"
                    class="mx-4"
                  ></v-text-field>
                </template>
                <template slot="items" slot-scope="props">
                  <tr>
                    <td>{{ props.item.kode_aset }}</td>
                    <td>{{ props.item.nama_aset }}</td>
                    <td>{{ props.item.spm }}</td>
                  </tr>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon class="text-center" small @click="deleteAset(item.id)"
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
        <v-form ref="form">
          <v-card>
            <v-card-title>
              <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Aset *"
                      v-model="aset.kode_aset"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Nama Aset *"
                      v-model="aset.nama_aset"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="SPM (Hari) *"
                      v-model="aset.spm"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Wajib diisi</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="tutupAset">
                Tutup
              </v-btn>
              <v-btn color="blue darken-1" text @click.prevent="SimpanAset">
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
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Master',
          disabled: false,
        },
        {
          text: 'Aset',
          disabled: true,
        },
      ],
      search: '',
      aset: {
        kode_aset: '',
        nama_aset: '',
        spm: '',
      },
      infoRespon: false,
      title: '',
      pesan: '',
      dialog: false,
      loading: false,
      listItems: [],
      headers: [
        { text: 'Aset', value: 'kode_aset' },
        { text: 'Nama Aset', value: 'nama_aset' },
        { text: 'SPM (Hari)', value: 'spm' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.loading = true;
      this.axios.get(`/get-aset/`).then((response) => {
        this.listItems = response.data;
        this.loading = false;
      });
    },
    tambahAset() {
      this.dialog = true;
      this.title = 'Tambah Aset Baru';
    },
    SimpanAset() {
      this.dialog = false;
      this.axios
        .post('/add-aset', this.aset)
        .then((res) => {
          this.$refs.form.reset();
          this.loadItems();
          this.infoRespon = true;
          this.pesan = res.data.data;
        })
        .catch((error) => {
          this.infoRespon = true;
          this.pesan = error;
        });
    },
    tutupAset() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    deleteAset(id) {
      this.axios.delete(`/delete-aset/${id}`).then(() => {
        this.infoRespon = true;
        this.pesan = 'Berhasil menghapus Aset';
        this.loadItems();
      });
    },
  },
};
</script>
