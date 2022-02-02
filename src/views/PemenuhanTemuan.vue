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
            Pemenuhan Temuan
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
                      v-model="pemenuhan.tanggal_pemenuhan"
                      label="Tanggal Pemenuhan *"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="pemenuhan.tanggal_pemenuhan"
                    @input="tanggal = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  :items="inspeksi"
                  v-model="pemenuhan.id_inspeksi"
                  item-text="kode_inspeksi"
                  item-value="id"
                  label="Kode Inpeksi *"
                  @change="loadChooseInspeksi"
                >
                  <template v-slot:item="{ item }">
                    {{ item.kode_inspeksi }}
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :value="nilaiKm"
                  label="KM *"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :value="nilaiMeter"
                  label="Meter *"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :value="nilaiJalur"
                  label="Jalur *"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :value="nilaiLajur"
                  label="Lajur *"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :value="nilaiJenisKerusakan"
                  label="Kondisi Kerusakan *"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Panjang (m) *"
                  v-model="pemenuhan.panjang"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Lebar (m) *"
                  v-model="pemenuhan.lebar"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Tebal / Tinggi (m) *"
                  v-model="pemenuhan.tebal"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <label>Photo Temuan :</label> <br />
                <v-img :src="nilaiPhoto" class="mt-2"></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <label>Photo Pemenuhan Temuan *</label> <br />
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
                  v-model="pemenuhan.keterangan"
                ></v-textarea>
              </v-col>
            </v-row>
            <small>*Wajib diisi</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              dark
              @click.prevent="simpanPemenuhan"
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
          text: 'Pemenuhan Temuan',
          disabled: true,
        },
      ],
      pemenuhan: {
        tanggal_pemenuhan: '',
        id_inspeksi: '',
        panjang: '',
        lebar: '',
        tebal: '',
        photo: '',
        keterangan: '',
      },
      inspeksi: [],
      url: '',
      nilaiKm: '',
      nilaiMeter: '',
      nilaiJalur: '',
      nilaiLajur: '',
      nilaiJenisKerusakan: '',
      nilaiPhoto: '',
    };
  },
  mounted() {
    this.loadInspeksi();
  },
  methods: {
    loadInspeksi() {
      this.axios
        .get(`/get-inspeksi-open`)
        .then((res) => {
          this.inspeksi = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadChooseInspeksi() {
      this.axios
        .get(`/get-inspeksi-detail/${this.pemenuhan.id_inspeksi}`)
        .then((res) => {
          this.nilaiPhoto =
            process.env.VUE_APP_API_URL +
            '/img/items/inspeksi/' +
            res.data[0].photo;
          this.nilaiKm = res.data[0].km;
          this.nilaiMeter = res.data[0].meter;
          this.nilaiJalur = res.data[0].jalur;
          this.nilaiLajur = res.data[0].lajur;
          this.nilaiJenisKerusakan = res.data[0].jenis_kerusakan;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Preview_image() {
      this.pemenuhan.photo = this.$refs.image.files[0];
      if (this.pemenuhan.photo) {
        this.url = URL.createObjectURL(this.pemenuhan.photo);
      }

      let fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.image.files[0]);
      fileReader.onload = (e) => {
        this.pemenuhan.photo = e.target.result;
      };
    },

    simpanPemenuhan() {
      this.loading = true;
      // console.log(this.pemenuhan);
      this.axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      this.axios
        .post('/add-pemenuhan-temuan', this.pemenuhan)
        .then((res) => {
          this.loading = false;
          this.$refs.form.reset();
          this.infoRespon = true;
          this.pesan = res.data.data;
          // console.log(res.data.data);
          this.url = '';
          this.nilaiPhoto = '';
          this.nilaiKm = '';
          this.nilaiMeter = '';
          this.nilaiJalur = '';
          this.nilaiLajur = '';
          this.nilaiJenisKerusakan = '';
          this.$refs.image.value = '';
          this.loadInspeksi();
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
