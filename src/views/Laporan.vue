<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
      <v-divider></v-divider>
      <v-card class="mt-2" color="primary" dark>
        <v-card-title class="d-flex justify-space-between">
          <h4>Laporan Temuan</h4>
          <vue-excel-xlsx
            :data="listItems"
            :columns="columns"
            :filename="nameFIle"
            :sheetname="nameSheet"
          >
            <v-btn small color="green darken-4" dark>
              Export To Excel <v-icon dark>mdi-microsoft-excel</v-icon>
            </v-btn>
          </vue-excel-xlsx>
        </v-card-title>
      </v-card>

      <!-- Filter -->
      <v-card class="mt-5">
        <v-row class="mx-4 d-flex justify-space-between align-center">
          <v-col>
            <v-menu
              v-model="tanggal"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tanggalAwal"
                  label="Tanggal Awal *"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="tanggalAwal" @input="tanggal = false">
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-menu
              v-model="tanggalLast"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="tanggalAkhir"
                  label="Tanggal Akhir *"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="tanggalAkhir"
                @input="tanggalLast = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-autocomplete
              :items="asets"
              v-model="id_aset"
              item-text="nama_aset"
              item-value="id"
              label="Pilih Aset *"
            >
              <template v-slot:item="{ item }">
                {{ item.nama_aset }}
              </template>
            </v-autocomplete>
          </v-col>
          <v-col class="d-flex justify-space-between">
            <v-btn small color="red darken-4" dark @click="filterLaporan">
              <v-icon dark>mdi-magnify</v-icon> Filter
            </v-btn>
            <v-btn small color="red darken-4" dark @click="refreshLaporan">
              Refresh <v-icon dark>mdi-database-refresh</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <!-- Filter -->

      <v-card class="mt-5">
        <v-data-table
          :headers="headers"
          :items="listItems"
          :items-per-page="5"
          :loading="loading"
          class="elevation-2"
          sort-by="tanggal_temuan"
          sortDesc
          dense
        >
          <template v-slot:[`item.no`]="{ index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.tanggal_temuan`]="{ item }">
            <span>{{ formatDate(item.tanggal_temuan) }}</span>
          </template>
          <template v-slot:[`item.tanggal_pemenuhan`]="{ item }">
            <span>{{ formatDate(item.tanggal_pemenuhan) }}</span>
          </template>
          <template v-slot:[`item.pemenuhan_spm`]="{ item }">
            <div
              class="d-flex justify-center"
              v-if="item.pemenuhan_spm == 'TERPENUHI'"
            >
              <v-chip class="ma-2" color="blue darken-4" text-color="white">
                <strong>{{ item.pemenuhan_spm }}</strong>
              </v-chip>
            </div>
            <div class="d-flex justify-center" v-else>
              <v-chip class="ma-2" color="red darken-4" text-color="white">
                <strong>{{ item.pemenuhan_spm }}</strong>
              </v-chip>
            </div>
          </template>
          <template v-slot:[`item.photo_temuan`]="{ item }">
            <div class="d-flex justify-center">
              <v-img
                contain
                :lazy-src="url_inspeksi + item.photo_temuan"
                max-height="100"
                max-width="100"
                :src="url_inspeksi + item.photo_temuan"
              ></v-img>
            </div>
          </template>
          <template v-slot:[`item.photo_pemenuhan`]="{ item }">
            <div class="d-flex justify-center">
              <v-img
                contain
                :lazy-src="url_temuan + item.photo_pemenuhan"
                max-height="100"
                max-width="100"
                :src="url_temuan + item.photo_pemenuhan"
              ></v-img>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped>
#gridContainer {
  width: 75%;
}
img {
  height: 100px;
  display: block;
}
</style>
<script>
import moment from 'moment';

export default {
  data() {
    return {
      asets: '',
      tanggalAwal: '',
      tanggalAkhir: '',
      id_aset: '',
      tanggal: false,
      tanggalLast: false,
      selectedBujt: '',
      url_inspeksi: process.env.VUE_APP_API_URL + '/img/items/inspeksi/',
      url_temuan: process.env.VUE_APP_API_URL + '/img/items/temuan/',
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Laporan Temuan',
          disabled: true,
        },
      ],
      listItems: [],
      nameFIle: '',
      nameSheet: '',
      columns: [
        {
          label: 'TANGGAL TEMUAN',
          field: 'tanggal_temuan',
        },
        {
          label: 'KODE',
          field: 'kode_aset',
        },
        {
          label: 'NAMA',
          field: 'nama_aset',
        },
        {
          label: 'SPM',
          field: 'spm',
        },
        {
          label: 'LOKASI',
          field: 'lokasi',
        },
        {
          label: 'KONDISI KERUSAKAN',
          field: 'spm',
        },
        {
          label: 'PANJANG TEMUAN',
          field: 'panjang_temuan',
        },
        {
          label: 'LEBAR TEMUAN',
          field: 'lebar_temuan',
        },
        {
          label: 'TEBAL TEMUAN',
          field: 'tebal_temuan',
        },
        {
          label: 'Photo TEMUAN',
          field: 'photo_temuan',
        },
        {
          label: 'KETERANGAN TEMUAN',
          field: 'keterangan_temuan',
        },
        {
          label: 'TANGGAL PEMENUHAN',
          field: 'tanggal_pemenuhan',
        },
        {
          label: 'PANJANG PEMENUHAN',
          field: 'panjang_pemenuhan',
        },
        {
          label: 'LEBAR PEMENUHAN',
          field: 'lebar_pemenuhan',
        },
        {
          label: 'TEBAL PEMENUHAN',
          field: 'tebal_pemenuhan',
        },
        {
          label: 'KETERANGAN PEMENUHAN',
          field: 'keterangan_pemenuhan',
        },
        {
          label: 'PEMENUHAN SPM',
          field: 'pemenuhan_spm',
        },
      ],
      headers: [
        {
          text: 'NO',
          value: 'no',
          align: 'center',
          class: 'font-weight-bold text-center',
          width: '70px',
          divider: 'true',
        },
        {
          text: 'Tanggal Temuan',
          value: 'tanggal_temuan',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Kode',
          value: 'kode_aset',
          width: '100px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Nama',
          value: 'nama_aset',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'SPM',
          value: 'spm',
          width: '100px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Lokasi',
          value: 'lokasi',
          width: '100px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Kondisi Kerusakan',
          value: 'jenis_kerusakan',
          width: '200px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Panjang Temuan',
          value: 'panjang_temuan',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Lebar Temuan',
          value: 'lebar_temuan',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Tebal Temuan',
          value: 'tebal_temuan',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Photo Temuan',
          value: 'photo_temuan',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Keterangan Temuan',
          value: 'keterangan_temuan',
          width: '200px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Tanggal Pemenuhan',
          value: 'tanggal_pemenuhan',
          width: '200px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Panjang Pemenuhan',
          value: 'panjang_pemenuhan',
          width: '200px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Lebar Pemenuhan',
          value: 'lebar_pemenuhan',
          width: '200px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Tebal Pemenuhan',
          value: 'tebal_pemenuhan',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Photo Pemenuhan',
          value: 'photo_pemenuhan',
          width: '200px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Keterangan Pemenuhan',
          value: 'keterangan_pemenuhan',
          width: '200px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
        {
          text: 'Pemenuhan SPM',
          value: 'pemenuhan_spm',
          width: '150px',
          align: 'center',
          class: 'font-weight-bold text-center',
          divider: 'true',
        },
      ],
      loading: false,
    };
  },

  mounted() {
    this.loadItems();
    this.loadAset();
  },

  methods: {
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
    photoTemuan(value) {
      return this.url_inspeksi + value;
    },
    photoPemenuhan(value) {
      return this.url_temuan + value;
    },
    formatDate(date) {
      moment.locale('id');
      return moment(date, 'YYYY-MM-DD hh:mm:ss').format('ll');
    },
    loadItems() {
      this.loading = true;
      this.axios.get(`/get-laporan-pemenuhan`).then((response) => {
        this.listItems = response.data;
        this.loading = false;
        this.nameFIle =
          new Date().toISOString() +
          ' - LAPORAN TEMUAN - Astra Infra | Toll Road [PML]';
        this.nameSheet = 'PT. Marga Mandalasakti';
      });
    },

    refreshLaporan() {
      this.loadItems();
    },

    filterLaporan() {
      this.loading = true;
      this.axios
        .get(
          `/filter-laporan/${this.tanggalAwal}/${this.tanggalAkhir}/${this.id_aset}`
        )
        .then((response) => {
          this.listItems = response.data.data;
          this.loading = false;
          this.nameFIle =
            new Date().toISOString() +
            ' - LAPORAN TEMUAN - Astra Infra | Toll Road [PML]';
          this.nameSheet = 'PT. Marga Mandalasakti';
          this.loading = false;
        });
    },
  },
};
</script>
