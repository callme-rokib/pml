<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
      <v-divider></v-divider>
      <v-form ref="form">
        <v-card class="mt-2">
          <v-card-title>
            Form Inspeksi
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
            <v-row>
              <v-col cols="12">
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
                      label="Tanggal Temuan *"
                      prepend-icon="mdi-calendar"
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
            </v-row>
            <v-row>
              <v-col cols="12">
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
            </v-row>
            <v-row>
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
              <v-col cols="6">
                <v-autocomplete
                  :items="meters"
                  v-model="inspeksi.id_meter"
                  item-text="meter"
                  item-value="id"
                  label="Meter *"
                >
                  <template v-slot:item="{ item }">
                    {{ item.meter }}
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  :items="jalurs"
                  v-model="inspeksi.id_jalur"
                  item-text="jalur"
                  item-value="id"
                  label="Jalur *"
                >
                  <template v-slot:item="{ item }">
                    {{ item.jalur }}
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  :items="lajurs"
                  v-model="inspeksi.id_lajur"
                  item-text="lajur"
                  item-value="id"
                  label="Lajur *"
                >
                  <template v-slot:item="{ item }">
                    {{ item.lajur }}
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items="jeniskerusakans"
                  v-model="inspeksi.id_jenis_kerusakan"
                  item-text="jenis_kerusakan"
                  item-value="id"
                  label="Kondisi Kerusakan *"
                >
                  <template v-slot:item="{ item }">
                    {{ item.jenis_kerusakan }}
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Panjang (m) *"
                  v-model="inspeksi.panjang"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Lebar (m) *"
                  v-model="inspeksi.lebar"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Tebal / Tinggi (m) *"
                  v-model="inspeksi.tebal"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <label>Photo *</label> <br />
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
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  label="Keterangan *"
                  v-model="inspeksi.keterangan"
                ></v-textarea>
              </v-col>
            </v-row>
            <small>*Wajib diisi</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              dark
              @click.prevent="simpanInspeksi"
              :loading="loading"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      tanggal: false,
      loading: false,
      infoRespon: false,
      pesan: '',
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Inspeksi',
          disabled: true,
        },
      ],
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
    loadKm() {
      this.axios
        .get(`/get-km`)
        .then((res) => {
          this.kms = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadMeter() {
      this.axios
        .get(`/get-meter`)
        .then((res) => {
          this.meters = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadJalur() {
      this.axios
        .get(`/get-jalur`)
        .then((res) => {
          this.jalurs = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadLajur() {
      this.axios
        .get(`/get-lajur`)
        .then((res) => {
          this.lajurs = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadJenisKerusakan() {
      this.axios
        .get(`/get-jenis-kerusakan`)
        .then((res) => {
          this.jeniskerusakans = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
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
