<template>
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
          <v-toolbar-title> Laporan Temuan</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text dark @click="tableToExcel('table', 'Laporan Temuan')">
            Export To Excel
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="listItems"
            :items-per-page="5"
            :loading="loading"
            class="elevation-1"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}
            </template>
          </v-data-table>

          <div class="text-center" v-if="loading">
            <h3>Loading...</h3>
          </div>
          <div v-else>
            <table ref="table" class="styled-table">
              <thead>
                <tr>
                  <th
                    colspan="11"
                    style="text-align:center;height:50px;border-right:1px solid #dddddd"
                  >
                    TEMUAN
                  </th>
                  <th colspan="7" style="text-align:center;height:50px;">
                    PEMENUHAN TEMUAN
                  </th>
                </tr>
                <tr>
                  <th style="width: 100px;">Tanggal</th>
                  <th>Kode</th>
                  <th>Nama</th>
                  <th style="width: 60px;">SPM</th>
                  <th>Lokasi</th>
                  <th style="width: 140px;">Kondisi Kerusakan</th>
                  <th>Panjang</th>
                  <th>Lebar</th>
                  <th>Tebal</th>
                  <th>Photo</th>
                  <th>Keterangan</th>
                  <th style="width: 100px;">Tanggal</th>
                  <th>Panjang</th>
                  <th>Lebar</th>
                  <th>Tebal</th>
                  <th>Photo</th>
                  <th>Keterangan</th>
                  <th style="width: 150px;">Pemenuhan SPM</th>
                </tr>
              </thead>
              <tbody v-for="item in listItems" :key="item.id">
                <tr style="text-align:center">
                  <td>
                    {{ item.tanggal_temuan }}
                  </td>
                  <td>{{ item.kode_aset }}</td>
                  <td>{{ item.nama_aset }}</td>
                  <td>{{ item.spm }}</td>
                  <td>{{ item.lokasi }}</td>
                  <td>{{ item.jenis_kerusakan }}</td>
                  <td>{{ item.panjang_temuan }}</td>
                  <td>{{ item.lebar_temuan }}</td>
                  <td>{{ item.tebal_temuan }}</td>
                  <td>
                    <img
                      :src="url_inspeksi + item.photo_temuan"
                      style="width: 50px; height: 50px"
                    />
                  </td>
                  <td>{{ item.keterangan_temuan }}</td>
                  <td>{{ item.tanggal_pemenuhan }}</td>
                  <td>{{ item.panjang_pemenuhan }}</td>
                  <td>{{ item.lebar_pemenuhan }}</td>
                  <td>{{ item.tebal_pemenuhan }}</td>
                  <td>
                    <img
                      :src="url_temuan + item.photo_pemenuhan"
                      style="width: 50px; height: 50px"
                    />
                  </td>
                  <td>{{ item.keterangan_pemenuhan }}</td>
                  <td>
                    <b>{{ item.pemenuhan_spm }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      uri: 'data:application/vnd.ms-excel;base64,',
      template:
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64: function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format: function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        });
      },
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
      headers: [
        { text: 'NO', value: 'no' },
        { text: 'Tanggal Temuan', value: 'tanggal_temuan' },
        { text: 'Kode', value: 'kode_aset' },
        { text: 'Nama', value: 'nama_aset' },
        { text: 'SPM', value: 'spm' },
        { text: 'Lokasi', value: 'lokasi' },
        { text: 'Kondisi Kerusakan', value: 'jenis_kerusakan' },
        { text: 'Panjang Temuan', value: 'panjang_temuan' },
        { text: 'Lebar Temuan', value: 'lebar_temuan' },
        { text: 'Tebal', value: 'tebal_temuan' },
        { text: 'Photo Temuan', value: 'photo_pemenuhan' },
        { text: 'Keterangan Temuan', value: 'keterangan_temuan' },
        { text: 'Tanggal Pemenuhan', value: 'tanggal_pemenuhan' },
        { text: 'Panjang Pemenuhan', value: 'panjang_pemenuhan' },
        { text: 'Lebar Pemenuhan', value: 'lebar_pemenuhan' },
        { text: 'Tebal Pemenuhan', value: 'tebal_pemenuhan' },
        { text: 'Photo Pemenuhan', value: 'photo_pemenuhan' },
        { text: 'Keterangan Pemenuhan', value: 'keterangan_pemenuhan' },
        { text: 'Pemenuhan SPM', value: 'pemenuhan_spm' },
      ],
      loading: false,
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      this.loading = true;
      this.axios.get(`/pml/get-laporan-pemenuhan`).then((response) => {
        this.listItems = response.data;
        this.loading = false;
      });
    },
    tableToExcel(table, name) {
      if (!table.nodeType) table = this.$refs.table;
      var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
      window.location.href =
        this.uri + this.base64(this.format(this.template, ctx));
    },
  },
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

tr:nth-of-type(odd) {
  background: #eee;
}
th {
  background: #fb8c00;
  color: white;
  font-weight: bold;
}
td,
th {
  padding: 6px;
  border: 1px solid #ccc;
}

@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  td:nth-of-type(1):before {
    content: 'Tanggal Temuan';
  }
  td:nth-of-type(2):before {
    content: 'Kode Aset';
  }
  td:nth-of-type(3):before {
    content: 'Nama Aset';
  }
  td:nth-of-type(4):before {
    content: 'SPM';
  }
  td:nth-of-type(5):before {
    content: 'Lokasi';
  }
  td:nth-of-type(6):before {
    content: 'Kondisi Kerusakan';
  }
  td:nth-of-type(7):before {
    content: 'Panjang Temuan';
  }
  td:nth-of-type(8):before {
    content: 'Lebar Temuan';
  }
  td:nth-of-type(9):before {
    content: 'Tebal Temuan';
  }
  td:nth-of-type(10):before {
    content: 'Photo Temuan';
  }
  td:nth-of-type(11):before {
    content: 'Keterangan Temuan';
  }
  td:nth-of-type(12):before {
    content: 'Tanggal Pemenuhan';
  }
  td:nth-of-type(13):before {
    content: 'Panjang Pemenuhan';
  }
  td:nth-of-type(14):before {
    content: 'Lebar Pemenuhan';
  }
  td:nth-of-type(15):before {
    content: 'Tebal Pemenuhan';
  }
  td:nth-of-type(16):before {
    content: 'Photo Pemenuhan';
  }
  td:nth-of-type(17):before {
    content: 'Keterangan';
  }
  td:nth-of-type(18):before {
    content: 'Pemenuhan SPM';
  }
}
</style>
