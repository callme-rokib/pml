<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12">
      <v-card class="mt-4">
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
                      v-model="tanggal_temuan"
                      label="Tanggal *"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tanggal_temuan"
                    @input="tanggal = false"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  :items="asets"
                  v-model="id_aset"
                  item-text="nama_aset"
                  item-value="id"
                  label="Pilih Aset *"
                  @change="getAset"
                >
                  <template v-slot:item="{ item }">
                    {{ item.nama_aset }}
                  </template>
                </v-autocomplete>
              </v-col>
              <div v-if="aset === 'Guardrail'">
                <v-guardrail
                  :tanggalTemuan="tanggal_temuan"
                  :idAset="id_aset"
                />
              </div>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Guardrail from '../components/Form/Guardrail.vue';
export default {
  components: {
    'v-guardrail': Guardrail,
  },
  data() {
    return {
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
      infoRespon: false,
      pesan: '',
      tanggal: false,
      id_aset: '',
      tanggal_temuan: '',
      asets: [],
      aset: '',
    };
  },
  mounted() {
    this.loadAset();
  },
  methods: {
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

    getAset() {
      this.axios
        .get(`/get-aset/${this.id_aset}`)
        .then((res) => {
          this.aset = res.data.data.nama_aset;
        })
        .catch((err) => {
          console.log(err);
        });

      // alert(this.tanggal_temuan);
      // alert(this.id_aset);
    },
  },
};
</script>
