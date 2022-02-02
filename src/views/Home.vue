<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-forward</v-icon>
        </template>
      </v-breadcrumbs>
      <v-divider></v-divider>
      <v-card class="mt-2" color="primary" dark>
        <v-card-title> Monitoring SPM Terbaru </v-card-title>
      </v-card>
      <v-card class="mt-2">
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab v-for="item in itemsTab" :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </v-card>
      <v-card class="mt-2">
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in itemsTab" :key="item.tab">
            <div v-if="item.content === 1">
              <v-sudah-diperbaiki />
            </div>
            <div v-if="item.content === 2">
              <v-belum-diperbaiki />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import axios from 'axios'
import SudahDiperbaiki from '../components/Home/SudahDiperbaiki.vue';
import BelumDiperbaiki from '../components/Home/BelumDiperbaiki.vue';
export default {
  components: {
    'v-sudah-diperbaiki': SudahDiperbaiki,
    'v-belum-diperbaiki': BelumDiperbaiki,
  },
  data() {
    return {
      tab: null,
      employee: [],
      items: [
        {
          text: 'Home',
          disabled: true,
        },
      ],
      itemsTab: [
        { tab: 'Belum Diperbaiki', content: 1 },
        { tab: 'Sudah Diperbaiki', content: 2 },
      ],
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // axios.get('http://192.168.26.130:3000/employee/1')
      //   .then(response => {
      //   console.log(response.data);
      // });
    },
  },
};
</script>
