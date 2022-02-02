<template>
  <v-col cols="12">
    <v-form ref="form">
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            :items="jalurs"
            v-model="inspeksi.id_jalur"
            item-text="jalur"
            item-value="id"
            label="Jalur *"
            @change="selectJalur"
          >
            <template v-slot:item="{ item }">
              {{ item.jalur }}
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-autocomplete
            :items="kms"
            v-model="inspeksi.id_km"
            item-text="km"
            item-value="id"
            label="KM *"
          >
            <template v-slot:item="{ item }">
              {{ item.km }}
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12">
          <div class="text-subtitle-1 text--secondary">Lokasi Aset</div>
        </v-col>
        <v-col cols="12">
          <v-simple-table dense>
            <thead>
              <tr>
                <th class="text-center font-weight-black text-h6" rowspan="2">
                  METER
                </th>
                <th class="text-center font-weight-black text-h6" colspan="8">
                  JALUR {{ selectedJalur }}
                </th>
              </tr>
              <tr>
                <th class="text-left">ROW</th>
                <th class="text-left">OS</th>
                <th class="text-left">L1</th>
                <th class="text-left">L2</th>
                <th class="text-left">L3</th>
                <th class="text-left">L4</th>
                <th class="text-left">IS</th>
                <th class="text-left">Median</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in meters" :key="item.id">
                <td class="text-center">{{ item.meter }}</td>
                <td class="my-check">
                  <v-checkbox
                    v-model="row"
                    :value="item.id"
                    @click="selectedRow(item.meter)"
                    :disabled="disabledRow"
                  ></v-checkbox>
                </td>
                <td class="my-check">
                  <v-checkbox
                    v-model="os"
                    :value="item.id"
                    @click="selectedOs(item.meter)"
                    :disabled="disabledOs"
                  ></v-checkbox>
                </td>
                <td class="my-check">
                  <v-checkbox
                    v-model="l1"
                    :value="item.id"
                    @click="selectedL1(item.meter)"
                    :disabled="disabledL1"
                  ></v-checkbox>
                </td>
                <td class="my-check">
                  <v-checkbox
                    v-model="l2"
                    :value="item.id"
                    @click="selectedL2(item.meter)"
                    :disabled="disabledL2"
                  ></v-checkbox>
                </td>
                <td class="my-check">
                  <v-checkbox
                    v-model="l3"
                    :value="item.id"
                    @click="selectedL3(item.meter)"
                    :disabled="disabledL3"
                  ></v-checkbox>
                </td>
                <td class="my-check">
                  <v-checkbox
                    v-model="l4"
                    :value="item.id"
                    @click="selectedL4(item.meter)"
                    :disabled="disabledL4"
                  ></v-checkbox>
                </td>
                <td class="my-check">
                  <v-checkbox
                    v-model="is"
                    :value="item.id"
                    @click="selectedIs(item.meter)"
                    :disabled="disabledIs"
                  ></v-checkbox>
                </td>
                <td class="my-check">
                  <v-checkbox
                    v-model="md"
                    :value="item.id"
                    @click="selectedMd(item.meter)"
                    :disabled="disabledMd"
                  ></v-checkbox>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :value="nilaiKodeAset"
            label="Kode Aset"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            :items="jeniskerusakans"
            v-model="inspeksi.id_jenis_kerusakan"
            item-text="jenis_kerusakan"
            item-value="id"
            label="Kondisi Aset *"
          >
            <template v-slot:item="{ item }">
              {{ item.jenis_kerusakan }}
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12">
          <div class="text-subtitle-1 text--secondary">
            Aset Yang Perlu Diperbaiki
          </div>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="LINE POST (M) *"
            v-model="inspeksi.panjang"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="EXCLUDER (Bh)*"
            v-model="inspeksi.panjang"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="BOBBIN (Bh)*"
            v-model="inspeksi.panjang"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="POSTCAP (Bh)*"
            v-model="inspeksi.panjang"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="PONDASI (Bh)*"
            v-model="inspeksi.panjang"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-file-input
            show-size
            label="Photo *"
            accept="image/*"
            @change="selectImage"
            v-model="inspeksi.photo"
          ></v-file-input>
        </v-col>
        <v-col cols="12" v-if="previewImage">
          <img
            class="preview"
            :src="previewImage"
            max-height="150"
            max-width="250"
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Keterangan *"
            v-model="inspeksi.keterangan"
          ></v-textarea>
        </v-col>
        <v-col cols="12"
          ><small class="text--disabled">*Wajib diisi</small></v-col
        >
        <v-col cols="12">
          <v-btn
            color="blue darken-1"
            dark
            @click.prevent="simpanInspeksi"
            :loading="loading"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-col>
</template>
<style scoped>
table,
th,
td {
  border: thin solid rgba(0, 0, 0, 0.12);
}

.my-check {
  align-items: center !important;
  justify-content: center !important;
}
</style>
<script>
import moment from 'moment';
export default {
  props: {
    idAset: {
      type: Number,
    },
    tanggalTemuan: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      pesan: '',
      inspeksi: {
        id_aset: this.idAset,
        id_km: '',
        id_meter: '',
        id_jalur: '',
        id_lajur: '',
        id_jenis_kerusakan: '',
        panjang: '',
        lebar: '',
        tebal: '',
        photo: null,
        keterangan: '',
        tanggal_temuan: this.tanggalTemuan,
      },
      asets: [],
      kms: [],
      meters: [],
      jalurs: [],
      lajurs: [],
      jeniskerusakans: [],
      url: '',
      selectedJalur: '',
      namaJalur: '',
      nilaiKodeAset: '',
      row: '',
      os: '',
      l1: '',
      l2: '',
      l3: '',
      l4: '',
      is: '',
      md: '',
      disabledRow: false,
      disabledOs: false,
      disabledL1: false,
      disabledL2: false,
      disabledL3: false,
      disabledL4: false,
      disabledIs: false,
      disabledMd: false,
      currentImage: undefined,
      previewImage: undefined,
    };
  },
  mounted() {
    this.loadAset();
    this.loadKm();
    this.loadMeter();
    this.loadJalur();
    this.loadLajur();
    this.loadJenisKerusakan();
  },
  methods: {
    formatDate(date) {
      moment.locale('id');
      return moment(date, 'YYYY-MM-DD').format('YYYYMMDD');
    },
    getIdLajur(value) {
      this.axios
        .get(`/select-lajur/${value}`)
        .then((res) => {
          this.inspeksi.id_lajur = res.data.data[0].id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectedRow(value) {
      if (this.row) {
        this.disabledOs = true;
        this.disabledL1 = true;
        this.disabledL2 = true;
        this.disabledL3 = true;
        this.disabledL4 = true;
        this.disabledIs = true;
        this.disabledMd = true;
        this.getIdLajur('RW');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'RW';
      } else {
        this.disabledOs = false;
        this.disabledL1 = false;
        this.disabledL2 = false;
        this.disabledL3 = false;
        this.disabledL4 = false;
        this.disabledIs = false;
        this.disabledMd = false;
      }
    },
    selectedOs(value) {
      if (this.os) {
        this.disabledRow = true;
        this.disabledL1 = true;
        this.disabledL2 = true;
        this.disabledL3 = true;
        this.disabledL4 = true;
        this.disabledIs = true;
        this.disabledMd = true;
        this.getIdLajur('OS');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'OS';
      } else {
        this.disabledRow = false;
        this.disabledL1 = false;
        this.disabledL2 = false;
        this.disabledL3 = false;
        this.disabledL4 = false;
        this.disabledIs = false;
        this.disabledMd = false;
      }
    },
    selectedL1(value) {
      if (this.l1) {
        this.disabledRow = true;
        this.disabledOs = true;
        this.disabledL2 = true;
        this.disabledL3 = true;
        this.disabledL4 = true;
        this.disabledIs = true;
        this.disabledMd = true;
        this.getIdLajur('L1');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'L1';
      } else {
        this.disabledRow = false;
        this.disabledOs = false;
        this.disabledL2 = false;
        this.disabledL3 = false;
        this.disabledL4 = false;
        this.disabledIs = false;
        this.disabledMd = false;
      }
    },
    selectedL2(value) {
      if (this.l2) {
        this.disabledRow = true;
        this.disabledOs = true;
        this.disabledL1 = true;
        this.disabledL3 = true;
        this.disabledL4 = true;
        this.disabledIs = true;
        this.disabledMd = true;
        this.getIdLajur('L2');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'L2';
      } else {
        this.disabledRow = false;
        this.disabledOs = false;
        this.disabledL1 = false;
        this.disabledL3 = false;
        this.disabledL4 = false;
        this.disabledIs = false;
        this.disabledMd = false;
      }
    },
    selectedL3(value) {
      if (this.l3) {
        this.disabledRow = true;
        this.disabledOs = true;
        this.disabledL1 = true;
        this.disabledL2 = true;
        this.disabledL4 = true;
        this.disabledIs = true;
        this.disabledMd = true;
        this.getIdLajur('L3');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'L3';
      } else {
        this.disabledRow = false;
        this.disabledOs = false;
        this.disabledL1 = false;
        this.disabledL2 = false;
        this.disabledL4 = false;
        this.disabledIs = false;
        this.disabledMd = false;
      }
    },
    selectedL4(value) {
      if (this.l4) {
        this.disabledRow = true;
        this.disabledOs = true;
        this.disabledL1 = true;
        this.disabledL2 = true;
        this.disabledL3 = true;
        this.disabledIs = true;
        this.disabledMd = true;
        this.getIdLajur('L4');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'L4';
      } else {
        this.disabledRow = false;
        this.disabledOs = false;
        this.disabledL1 = false;
        this.disabledL2 = false;
        this.disabledL3 = false;
        this.disabledIs = false;
        this.disabledMd = false;
      }
    },
    selectedIs(value) {
      if (this.is) {
        this.disabledRow = true;
        this.disabledOs = true;
        this.disabledL1 = true;
        this.disabledL2 = true;
        this.disabledL3 = true;
        this.disabledL4 = true;
        this.disabledMd = true;
        this.getIdLajur('IS');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'IS';
      } else {
        this.disabledRow = false;
        this.disabledOs = false;
        this.disabledL1 = false;
        this.disabledL2 = false;
        this.disabledL3 = false;
        this.disabledL4 = false;
        this.disabledMd = false;
      }
    },
    selectedMd(value) {
      if (this.md) {
        this.disabledRow = true;
        this.disabledOs = true;
        this.disabledL1 = true;
        this.disabledL2 = true;
        this.disabledL3 = true;
        this.disabledL4 = true;
        this.disabledIs = true;
        this.getIdLajur('MD');
        let km;
        let aset;
        aset = this.asets.filter((aset) => aset.id === this.inspeksi.id_aset);
        km = this.kms.filter((km) => km.id === this.inspeksi.id_km);
        this.nilaiKodeAset =
          this.formatDate(this.inspeksi.tanggal_temuan) +
          '-' +
          aset[0].kode_aset +
          '-' +
          km[0].km +
          'KM' +
          value +
          'M' +
          this.namaJalur +
          'MD';
      } else {
        this.disabledRow = false;
        this.disabledOs = false;
        this.disabledL1 = false;
        this.disabledL2 = false;
        this.disabledL3 = false;
        this.disabledL4 = false;
        this.disabledIs = false;
      }
    },
    selectJalur() {
      this.axios
        .get(`/select-jalur/${this.inspeksi.id_jalur}`)
        .then((res) => {
          this.selectedJalur = res.data.data.keterangan;
          this.namaJalur = res.data.data.jalur;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    loadKm() {
      this.axios
        .get(`/get-km`)
        .then((res) => {
          this.kms = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadMeter() {
      this.axios
        .get(`/get-meter`)
        .then((res) => {
          this.meters = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadJalur() {
      this.axios
        .get(`/get-jalur`)
        .then((res) => {
          this.jalurs = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadLajur() {
      this.axios
        .get(`/get-lajur`)
        .then((res) => {
          this.lajurs = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadJenisKerusakan() {
      this.axios
        .get(`/get-jenis-kerusakan`)
        .then((res) => {
          this.jeniskerusakans = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectImage(image) {
      this.currentImage = image;
      this.previewImage = URL.createObjectURL(this.currentImage);
    },

    loadAset() {
      this.axios
        .get(`/get-aset`)
        .then((res) => {
          this.asets = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    simpanInspeksi() {
      this.loading = true;
      this.axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      this.axios
        .post('/add-inspeksi', this.inspeksi)
        .then((res) => {
          this.loading = false;
          this.$refs.form.reset();
          this.infoRespon = true;
          this.pesan = res.data.data;
          this.url = '';
        })
        .catch((error) => {
          this.infoRespon = true;
          this.pesan = error;
          this.loading = false;
        });
    },
  },
};
</script>
