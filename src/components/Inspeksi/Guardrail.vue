<template>
  <v-row>
    <v-col cols="12">
      <!-- Title -->
      <v-col cols="12">
        <v-card>
          <v-card-title class="justify-lg-start">
            Form Inspeksi {{ name }}
          </v-card-title>
          <v-divider></v-divider>
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
          </v-card-text>
        </v-card>
      </v-col>
      <!-- /Title -->

      <!-- Form -->
      <v-col cols="12">
        <v-card>
          <v-form ref="form">
            <v-row>
              <v-col cols="6">
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
                      v-model="inspeksi.tanggal_temuan"
                      label="Tanggal *"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="inspeksi.tanggal_temuan"
                    @input="tanggal = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  :items="asets"
                  v-model="inspeksi.id_aset"
                  item-text="nama_aset"
                  item-value="id"
                  label="Pilih Aset *"
                >
                  <template v-slot:item="{ item }">
                    {{ item.nama_aset }}
                  </template>
                </v-autocomplete>
              </v-col>
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
                      <th
                        class="text-center font-weight-black text-h6"
                        rowspan="2"
                      >
                        METER
                      </th>
                      <th
                        class="text-center font-weight-black text-h6"
                        colspan="8"
                      >
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
                  v-model="filesPhoto"
                ></v-file-input>
              </v-col>
              <v-col cols="12" v-if="previewImage">
                <img class="preview my-3" :src="previewImage" alt="" />
              </v-col>
              <v-col cols="12">
                <label class="text-subtitle-1 text--secondary">Photo *</label>
                <br />
                <input
                  type="file"
                  @change="Preview_image"
                  ref="image"
                  name="image"
                  id="image"
                  required
                  class="mt-2"
                />
                <v-img :src="url" class="mt-2"></v-img>
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
        </v-card>
      </v-col>
    </v-col>
  </v-row>
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
  props: ['name'],
  data() {
    return {
      tanggal: false,
      loading: false,
      infoRespon: false,
      pesan: '',
      inspeksi: {
        id_aset: '',
        id_km: '',
        id_meter: '',
        id_jalur: '',
        id_lajur: '',
        id_jenis_kerusakan: '',
        panjang: '',
        lebar: '',
        tebal: '',
        photo: '',
        keterangan: '',
        tanggal_temuan: '',
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
      filesPhoto: null,
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
      this.getIdLajur('RW');
      // alert(km[0].km); nilai km
      // alert(this.inspeksi.id_aset);
      // alert(this.inspeksi.id_km);
      // alert(this.inspeksi.id_jalur);
      // console.log(this.selectedLajur); id_lajur
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
    },
    selectedOs(value) {
      alert(value);
    },
    selectedL1(value) {
      alert(value);
    },
    selectedL2(value) {
      alert(value);
    },
    selectedL3(value) {
      alert(value);
    },
    selectedL4(value) {
      alert(value);
    },
    selectedIs(value) {
      alert(value);
    },
    selectedMd(value) {
      alert(value);
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

      console.log(this.filesPhoto);
    },

    Preview_image() {
      this.inspeksi.photo = this.$refs.image.files[0];
      if (this.inspeksi.photo) {
        this.url = URL.createObjectURL(this.inspeksi.photo);
      }

      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.image.files[0]);
      fileReader.onload = (e) => {
        this.inspeksi.photo = e.target.result;
      };

      console.log(this.inspeksi.photo);
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
