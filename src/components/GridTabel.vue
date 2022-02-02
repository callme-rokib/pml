<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="employees"
      key-expr="ID"
      :show-borders="true"
      :show-row-lines="true"
      :show-column-lines="false"
      @exporting="onExporting"
    >
      <DxColumn
        data-field="Picture"
        :width="90"
        cell-template="grid-cell-template"
      />
      <DxColumn data-field="FirstName" />
      <DxColumn data-field="LastName" />
      <DxColumn data-field="Position" />
      <DxColumn data-field="BirthDate" data-type="date" />
      <DxColumn data-field="HireDate" data-type="date" />

      <template #grid-cell-template="{ data }">
        <div>
          <img :src="data.value" />
        </div>
      </template>

      <DxExport :enabled="true" />
    </DxDataGrid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn, DxExport } from 'devextreme-vue/data-grid';
import { exportDataGrid } from 'devextreme/excel_exporter';
import ExcelJS from 'exceljs';
import saveAs from 'file-saver';
/*
  // Use this import for codeSandBox
  import FileSaver from 'file-saver';
*/
import service from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxExport,
  },
  data() {
    return {
      employees: service.getEmployees(),
    };
  },
  methods: {
    addImage(url, workbook, worksheet, excelCell, resolve) {
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
            if (gridCell.column.dataField === 'Picture') {
              excelCell.value = undefined;
              PromiseArray.push(
                new Promise((resolve) => {
                  this.addImage(
                    gridCell.value,
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
              'ExcelJSFormat.xlsx'
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
img {
  height: 100px;
}
</style>
