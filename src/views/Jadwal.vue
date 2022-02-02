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
      </v-col>
    </v-row>
    <div v-if="infoRespon">
      <v-row>
        <v-col>
          <v-alert
            border="left"
            color="warning"
            dark
            close-text="Close Alert"
            dismissible
          >
            {{ pesan }}
          </v-alert>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-col>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Daftar Jadwal Kegiatan</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text dark @click="tambahJadwal">
            Tambah Jadwal
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-date-picker
            ref="picker"
            v-model="date"
            :picker-date.sync="pickerDate"
            full-width
          ></v-date-picker>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-text>
            <div class="title">Jadwal {{ this.bulan || 'ubah bulan...' }}</div>
            <div class="subheading">
              <small>Ubah bulan untuk melihat jadwal lainnya</small>
            </div>
            <div class="text-center" v-if="loading">
              <h3>Loading...</h3>
            </div>
            <div v-else>
              <div v-if="listPekerjaan.length">
                <ul class="ma-2">
                  <li v-for="item in listPekerjaan" :key="item.id">
                    {{ formatHari(item.tanggal) }},
                    {{ formatDate(item.tanggal) }}
                    -
                    {{ item.keterangan }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <ul class="ma-2">
                  <li>
                    Belum ada jadwal pada bulan ini
                  </li>
                </ul>
              </div>
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
                    <v-menu
                      v-model="tanggal_kegiatan"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="jadwal.tanggal"
                          label="Tanggal Kegiatan *"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="jadwal.tanggal"
                        @input="tanggal_kegiatan = false"
                      >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      :items="asets"
                      v-model="jadwal.id_aset"
                      item-text="nama_aset"
                      item-value="id"
                      label="Pilih Aset *"
                    >
                      <template v-slot:item="{ item }">
                        {{ item.nama_aset }}
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-autocomplete
                      :items="jenisPekerjaan"
                      v-model="jadwal.id_pekerjaan"
                      item-text="nama"
                      item-value="id"
                      label="Jenis Pekerjaan *"
                      @change="loadJenisPekerjaan"
                    >
                      <template v-slot:item="{ item }">
                        {{ item.nama }}
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" v-if="seen">
                    <v-autocomplete
                      :items="inspeksi"
                      v-model="jadwal.id_inspeksi"
                      item-text="kode_inspeksi"
                      item-value="id"
                      label="Kode Inpeksi *"
                    >
                      <template v-slot:item="{ item }">
                        {{ item.kode_inspeksi }}
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      label="Keterangan *"
                      v-model="jadwal.keterangan"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Wajib diisi</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="tutupJadwal">
                Tutup
              </v-btn>
              <v-btn color="primary" text @click.prevent="simpanJadwal">
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
import moment from 'moment';
export default {
  data() {
    return {
      loading: false,
      seen: false,
      title: '',
      dialog: false,
      tanggal_kegiatan: false,
      date: new Date().toISOString().substr(0, 10),
      pickerDate: null,
      asets: [],
      inspeksi: [],
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Jadwal',
          disabled: true,
        },
      ],
      jenisPekerjaan: [],
      jadwal: {
        tanggal: '',
        id_aset: '',
        id_pekerjaan: '',
        id_inspeksi: '',
        keterangan: '',
      },
      infoRespon: false,
      pesan: '',
      listPekerjaan: [],
      bulan: '',
    };
  },
  watch: {
    pickerDate() {
      moment.locale('id');
      this.bulan = moment(this.pickerDate).format('MMM YYYY');
      this.loadDaftarPekerjaan(this.pickerDate);
    },
  },
  mounted() {
    this.loadJenisKerjaan();
    this.loadAset();
    this.loadInspeksi();
  },
  methods: {
    formatDate(date) {
      moment.locale('id');
      return moment(date, 'YYYY-MM-DD').format('LL');
    },
    formatHari(date) {
      moment.locale('id');
      return moment(date, 'YYYY-MM-DD').format('dddd');
    },
    loadDaftarPekerjaan(val) {
      this.loading = true;
      this.axios
        .get(`/get-daftar-pekerjaan/${val}`)
        .then((res) => {
          this.listPekerjaan = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadJenisKerjaan() {
      this.axios
        .get(`/get-jenis-pekerjaan`)
        .then((res) => {
          this.jenisPekerjaan = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadAset() {
      this.axios
        .get(`/get-aset`)
        .then((res) => {
          this.asets = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadInspeksi() {
      this.axios
        .get(`/get-inspeksi-open`)
        .then((res) => {
          this.inspeksi = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadJenisPekerjaan() {
      if (this.jadwal.id_pekerjaan === 1) {
        this.seen = false;
      } else {
        this.seen = true;
      }
    },
    tambahJadwal() {
      this.dialog = true;
      this.title = 'Tambah Jadwal Baru';
    },
    tutupJadwal() {
      this.$refs.form.reset();
      this.dialog = false;
    },
    simpanJadwal() {
      this.dialog = false;
      this.axios
        .post('/add-jadwal-pekerjaan', this.jadwal)
        .then((res) => {
          this.$refs.form.reset();
          this.loadDaftarPekerjaan(this.pickerDate);
          this.infoRespon = true;
          this.pesan = res.data.data;
        })
        .catch((error) => {
          this.infoRespon = true;
          this.pesan = error;
        });
    },
  },
};
</script>
