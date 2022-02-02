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
        </v-toolbar>
      </v-card>
      <v-card class="mt-4">
        <v-card-title>
          <h4>Filter Laporan</h4>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-title>
          <v-col cols="12" md="3">
            <v-menu
              v-model="menuAwal"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="assets.periodeAwal"
                  label="Pilih Periode Awal Temuan*"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="assets.periodeAwal"
                @input="menuAwal = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="3">
            <v-menu
              v-model="menuAkhir"
              :close-on-content-click="false"
              transition="scale-transition"
              :nudge-right="40"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="assets.periodeAkhir"
                  label="Pilih Sampai dengan*"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="assets.periodeAkhir"
                @input="menuAkhir = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              :items="itemSpm"
              v-model="assets.spm"
              label="Pilih Status SPM*"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              color="primary"
              dark
              block
              :loading="loading"
              @click="loadPostsData"
              >Tampilkan</v-btn
            >
          </v-col>
        </v-card-title>
      </v-card>
      <v-card class="mt-4">
        <v-card-text>
          <div>
            <DxDataGrid
              :data-source="listItems"
              key-expr="id"
              id="gridContainer"
              :show-borders="false"
              :show-row-lines="true"
              :show-column-lines="false"
              @exporting="onExporting"
              :column-auto-width="true"
            >
              <DxGroupPanel :visible="true" />
              <DxGrouping :auto-expand-all="true" />
              <DxExport :enabled="true" :allow-export-selected-data="true" />
              <DxSelection mode="multiple" />
              <DxColumn
                data-field="tanggal_temuan"
                caption="Tanggal Temuan"
                header-cell-template="tanggal-header"
              />
              <DxColumn
                data-field="kode_aset"
                caption="Kode Aset"
                header-cell-template="kode-aset-header"
              />
              <DxColumn
                data-field="nama_aset"
                caption="Nama Aset"
                header-cell-template="nama-aset-header"
              />
              <DxColumn
                data-field="spm"
                caption="SPM"
                header-cell-template="spm-header"
              />

              <DxColumn
                data-field="lokasi"
                caption="Lokasi"
                header-cell-template="lokasi-header"
              />

              <DxColumn
                data-field="jenis_kerusakan"
                caption="Jenis Kerusakan"
                header-cell-template="jenis-kerusakan-header"
              />

              <DxColumn
                data-field="panjang_temuan"
                caption="Panjang"
                header-cell-template="panjang-temuan-header"
              />

              <DxColumn
                data-field="lebar_temuan"
                caption="Lebar"
                header-cell-template="lebar-temuan-header"
              />

              <DxColumn
                data-field="tebal_temuan"
                caption="Tebal"
                header-cell-template="tebal-temuan-header"
              />
              <DxColumn
                data-field="photo_temuan"
                caption="Photo"
                :width="75"
                header-cell-template="photo-temuan-header"
                cell-template="grid-cell-photo-temuan"
              />

              <DxColumn
                data-field="keterangan_temuan"
                caption="Keterangan Temuan"
                header-cell-template="keterangan-temuan-header"
              />
              <DxColumn
                data-field="tanggal_pemenuhan"
                caption="Tanggal Pemenuhan"
                header-cell-template="tanggal-pemenuhan-header"
              />
              <DxColumn
                data-field="panjang_pemenuhan"
                caption="Panjang"
                header-cell-template="panjang-pemenuhan-header"
              />
              <DxColumn
                data-field="lebar_pemenuhan"
                caption="Lebar"
                header-cell-template="lebar-pemenuhan-header"
              />
              <DxColumn
                data-field="tebal_pemenuhan"
                caption="Tebal"
                header-cell-template="tebal-pemenuhan-header"
              />
              <DxColumn
                data-field="photo_pemenuhan"
                caption="Photo Pemenuhan"
                width="auto"
                header-cell-template="photo-pemenuhan-header"
                cell-template="grid-cell-template"
              />

              <DxColumn
                data-field="keterangan_pemenuhan"
                caption="Keterangan Pemenuhan"
                header-cell-template="keterangan-pemenuhan-header"
              />
              <DxColumn
                data-field="pemenuhan_spm"
                caption="Pemenuhan SPM"
                header-cell-template="pemenuhan-spm-header"
              />
              <template #pemenuhan-spm-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #keterangan-pemenuhan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #photo-pemenuhan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #panjang-pemenuhan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #lebar-pemenuhan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #tebal-pemenuhan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #tanggal-pemenuhan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #keterangan-temuan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #photo-temuan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #panjang-temuan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #lebar-temuan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #tebal-temuan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #spm-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #lokasi-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #jenis-kerusakan-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>
              <template #tanggal-header="{ data }">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>

              <template #kode-aset-header="{data}">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>

              <template #nama-aset-header="{data}">
                <strong style="color: black">{{ data.column.caption }}</strong>
              </template>

              <template #grid-cell-photo-temuan="{ data }">
                <div>
                  <img :src="url_inspeksi + data.value" :alt="data.value" />
                </div>
              </template>

              <template #grid-cell-template="{ data }">
                <div>
                  <img :src="url_temuan + data.value" :alt="data.value" />
                </div>
              </template>

              <!-- <DxExport :enabled="true" /> -->
            </DxDataGrid>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment';
import {
  DxDataGrid,
  DxColumn,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
} from 'devextreme-vue/data-grid';
import { exportDataGrid } from 'devextreme/excel_exporter';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
  },
  data() {
    return {
      menuAwal: false,
      menuAkhir: false,
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
      loading: false,
      assets: {
        periodeAwal: new Date().toISOString().substr(0, 10),
        periodeAkhir: new Date().toISOString().substr(0, 10),
        spm: '',
      },
      itemSpm: [
        { value: null, text: '-' },
        { value: 'TIDAK', text: 'TIDAK TERPENUHI' },
        { value: 'TERPENUHI', text: 'TERPENUHI' },
        { value: 'ALL', text: 'SEMUA' },
      ],
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadPostsData() {
      this.loading = true;
      this.axios
        .get(
          `/filter-laporan/${this.assets.periodeAwal}/${this.assets.periodeAkhir}/${this.assets.spm}`
        )
        .then((res) => {
          this.listItems = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
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
      });
    },

    addImagePhotoTemuan(url, workbook, worksheet, excelCell, resolve) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = function() {
        let reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onloadend = function() {
          let base64data = reader.result;
          const image = workbook.addImage({
            base64: base64data,
            extension: 'png',
          });

          worksheet.getRow(excelCell.row).height = 75;
          worksheet.addImage(image, {
            tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
            br: { col: excelCell.col, row: excelCell.row },
          });

          resolve();
        };
      };
      xhr.onerror = function() {
        console.error('could not add image to excel cell');
      };
      xhr.send();
    },

    onExporting(e) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Main sheet');
      const PromiseArray = [];
      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        autoFilterEnabled: true,
        topLeftCell: { row: 2, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          if (gridCell.rowType === 'data') {
            if (gridCell.column.dataField === 'photo_temuan') {
              excelCell.value = undefined;
              PromiseArray.push(
                new Promise((resolve) => {
                  this.addImagePhotoTemuan(
                    this.url_inspeksi + gridCell.value,
                    workbook,
                    worksheet,
                    excelCell,
                    resolve
                  );
                })
              );
            }
          }
        },
      }).then(() => {
        Promise.all(PromiseArray).then(() => {
          workbook.xlsx.writeBuffer().then(function(buffer) {
            saveAs(
              new Blob([buffer], { type: 'application/octet-stream' }),
              new Date().toISOString() +
                ' - LAPORAN TEMUAN - Astra Infra | Toll Road [PML]' +
                '.xlsx'
            );
          });
        });
      });
      e.cancel = true;
    },
  },
};
</script>
<style scoped>
#gridContainer {
  height: 500px;
}

.dx-row img {
  height: 90px;
}

#gridContainer tr.main-row td:not(:first-child) {
  height: 21px;
}

#gridContainer tr.notes-row {
  white-space: normal;
  vertical-align: top;
}

#gridContainer tr.notes-row td {
  height: 70px;
  color: #999;
}

.dark #gridContainer tr.notes-row td {
  color: #777;
}

#gridContainer tbody.employee:hover {
  background-color: #ebebeb;
}

.dark #gridContainer tbody.employee:hover {
  background-color: #484848;
}

#gridContainer tbody.employee:hover tr.main-row td {
  color: #000;
}

.dark #gridContainer tbody.employee:hover tr.main-row td {
  color: #ccc;
}

#gridContainer tbody.employee:hover tr.notes-row td {
  color: #888;
}
</style>
