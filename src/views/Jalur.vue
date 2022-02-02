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
            <v-toolbar-title> Data Jalur </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text dark @click="tambahJalur"> Tambah Jalur </v-btn>
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
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.jalur }}</td>
                  </tr>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    class="text-center"
                    small
                    @click="deleteJalur(item.id)"
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
                      label="Jalur *"
                      v-model="jalurnya.jalur"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Wajib diisi</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="tutupJalur">
                Tutup
              </v-btn>
              <v-btn color="blue darken-1" text @click.prevent="SimpanJalur">
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
          text: 'Jalur',
          disabled: true,
        },
      ],
      search: '',
      jalurnya: {
        jalur: '',
      },
      infoRespon: false,
      title: '',
      pesan: '',
      dialog: false,
      loading: false,
      listItems: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Jalur', value: 'jalur' },
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
      this.axios.get(`/get-jalur`).then((response) => {
        this.listItems = response.data;
        this.loading = false;
      });
    },
    tambahJalur() {
      this.dialog = true;
      this.title = 'Tambah Jalur Baru';
    },
    SimpanJalur() {
      this.dialog = false;
      this.axios
        .post('/add-jalur', this.jalurnya)
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
    tutupJalur() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    deleteJalur(id) {
      this.axios.delete(`/delete-jalur/${id}`).then(() => {
        this.infoRespon = true;
        this.pesan = 'Berhasil menghapus Jalur';
        this.loadItems();
      });
    },
  },
};
</script>
