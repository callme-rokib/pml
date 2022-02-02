<template>
  <v-card>
    <v-card-text>
      <div class="text-center" v-if="loading">
        <h3>Loading...</h3>
      </div>
      <div v-else>
        <v-data-table
          :headers="headers"
          :items="listItems"
          :items-per-page="10"
          item-key="id"
          class="mt-4"
        >
          <template v-slot:[`item.photo_temuan`]="{ item }">
            <img
              :src="url_inspeksi + item.photo_temuan"
              style="width: 50px; height: 50px"
            />
          </template>
        </v-data-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Tanggal', value: 'tanggal_temuan' },
        { text: 'Aset', value: 'kode_aset' },
        { text: 'Nama Aset', value: 'nama_aset' },
        { text: 'SPM', value: 'spm' },
        { text: 'Lokasi', value: 'lokasi' },
        { text: 'Kondisi Kerusakan', value: 'jenis_kerusakan' },
        { text: 'Panjang', value: 'panjang_temuan' },
        { text: 'Lebar', value: 'lebar_temuan' },
        { text: 'Tebal', value: 'tebal_temuan' },
        { text: 'Photo', value: 'photo_temuan' },
        { text: 'Keterangan', value: 'keterangan_temuan' },
      ],
      listItems: [],
      loading: false,
      url_inspeksi: process.env.VUE_APP_API_URL + '/img/items/inspeksi/',
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.loading = true;
      this.axios.get(`/done-inspeksi`).then((response) => {
        this.listItems = response.data;
        this.loading = false;
      });
    },
  },
};
</script>
