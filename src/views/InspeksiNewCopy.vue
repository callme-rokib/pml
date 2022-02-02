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
        <v-card class="mt-4">
          <v-card-title>
            Form Inspeksi New
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
            <!-- ini table new simple table -->
            <v-row>
              <v-col cols="12">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th
                        class="text-center font-weight-black text-h6"
                        rowspan="2"
                      >
                        KM
                      </th>
                      <th
                        class="text-center font-weight-black text-h6"
                        colspan="7"
                      >
                        JALUR A
                      </th>
                      <th
                        class="text-center font-weight-black text-h6"
                        colspan="7"
                      >
                        JALUR B
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
                      <th class="text-left">ROW</th>
                      <th class="text-left">OS</th>
                      <th class="text-left">L1</th>
                      <th class="text-left">L2</th>
                      <th class="text-left">L3</th>
                      <th class="text-left">L4</th>
                      <th class="text-left">IS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>900</td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW900A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS900A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1900A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2900A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3900A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4900A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS900A"></v-checkbox>
                      </td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW900B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS900B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1900B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2900B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3900B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4900B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS900B"></v-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>800</td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW800A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS800A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1800A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2800A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3800A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4800A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS800A"></v-checkbox>
                      </td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW800B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS800B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1800B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2800B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3800B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4800B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS800B"></v-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>700</td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW700A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS700A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1700A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2700A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3700A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4700A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS700A"></v-checkbox>
                      </td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW700B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS700B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1700B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2700B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3700B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4700B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS700B"></v-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>600</td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW600A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS600A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1600A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2600A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3600A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4600A"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS600A"></v-checkbox>
                      </td>
                      <td class="my-check">
                        <v-checkbox v-model="ROW600B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="OS600B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L1600B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L2600B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L3600B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="L4600B"></v-checkbox>
                      </td>
                      <td class="text-center">
                        <v-checkbox v-model="IS600B"></v-checkbox>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-col>
            </v-row>
            <!-- ini table new simple table -->
            <!-- ini new Datatable -->
            <!-- km,name,l1,l2,l3,l4 l1 -->
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :mobile-breakpoint="0"
                  :items="desserts"
                  :hide-default-footer="true"
                  class="elevation-1"
                >
                  <template v-slot:item.km="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.km"
                      @save="save(props.item.km)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.km }}
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.km"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.name="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.name"
                      @save="save(props.item.nam)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.name }}
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.name"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.os="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.os"
                      @save="save(props.item.os)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.os }}
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.os"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.l1="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.l1"
                      @save="save(props.item.l1)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.l1 }}
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.l1"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.l2="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.l2"
                      @save="save(props.item.l2)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.l2 }}
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.l2"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.l3="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.l3"
                      @save="save(props.item.l3)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.l3 }}
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.l3"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                  <template v-slot:item.l4="props">
                    <v-edit-dialog
                      :return-value.sync="props.item.l4"
                      @save="save(props.item.l4)"
                      @cancel="cancel"
                      @open="open"
                      @close="close"
                    >
                      {{ props.item.l4 }}
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.l4"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <!-- /ini new Datatable -->
            <!-- ini textbox -->
            <v-row>
              <v-col cols="4">
                <v-text-field v-model="test"> </v-text-field>
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
export default {
  data() {
    return {
      // ini test new Datatable
      test: '',
      checkbox: '',
      headers: [
        {
          text: 'KM',
          align: 'left',
          sortable: false,
          value: 'km',
        },
        {
          text: 'Row',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'OS', align: 'left', sortable: false, value: 'os' },
        { text: 'L1', align: 'left', sortable: false, value: 'l1' },
        { text: 'L2', align: 'left', sortable: false, value: 'l2' },
        { text: 'L3', align: 'left', sortable: false, value: 'l3' },
        { text: 'L4', align: 'left', sortable: false, value: 'l4' },
      ],
      desserts: [
        {
          id: 1,
          km: 900,
          name: 'Rows 100',
          os: 159,
          l1: 6.0,
          l2: 24,
          l3: 4.0,
          l4: '3',
        },
        {
          id: 2,
          km: 800,
          name: 'Rows 200',
          os: 237,
          l1: 9.0,
          l2: 37,
          l3: 4.3,
          l4: '4',
        },
        {
          id: 3,
          km: 700,
          name: 'Rows 300',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '5',
        },
        {
          id: 4,
          km: 600,
          name: 'Rows 400',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '8',
        },
        {
          id: 5,
          km: 500,
          name: 'Rows 500',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '9',
        },
        {
          id: 6,
          km: 400,
          name: 'Rows 600',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '10',
        },
        {
          id: 7,
          km: 300,
          name: 'Rows 700',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '10',
        },
        {
          id: 8,
          km: 200,
          name: 'Rows 800',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '11',
        },
        {
          id: 9,
          km: 100,
          name: 'Rows 900',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '12',
        },
        {
          id: 10,
          km: 0,
          name: 'Rows 1000',
          os: 262,
          l1: 16.0,
          l2: 23,
          l3: 6.0,
          l4: '13',
        },
      ],
      // ini test new Datatable
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
    // ini test new Datatable
    save(nilai) {
      //   alert('saat save');
      this.test = nilai;
    },
    cancel() {
      //   alert('saat cancel');
    },
    open() {
      //   alert('saat open');
      console.log(this.tabel.km);
    },
    close() {
      //   alert('saat close');
    },
    // ini test new Datatable
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
