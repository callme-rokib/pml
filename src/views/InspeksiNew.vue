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
      <v-card>
        <v-tabs v-model="tab" color="primary accent-4" show-arrows>
          <v-tabs-slider color="primary darken-4"></v-tabs-slider>
          <v-tab v-for="item in tabs" :key="item.id" @click="getTab(item.name)">
            {{ item.name }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-guardrail :name="selectedTab" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Guardrail from '../components/Inspeksi/Guardrail.vue';

export default {
  components: {
    'v-guardrail': Guardrail,
  },
  data() {
    return {
      selectedTab: 'Guardrail',
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
      tab: null,
      tabs: [
        { id: 1, name: 'Guardrail' },
        { id: 2, name: 'Pagar' },
        { id: 3, name: 'Wire Rope' },
        { id: 4, name: 'Drainase' },
        { id: 5, name: 'Rumput' },
        { id: 6, name: 'TRC' },
        { id: 7, name: 'Rambu' },
        { id: 8, name: 'Perkerasan Jalan' },
      ],
    };
  },
  methods: {
    getTab(name) {
      this.selectedTab = name;
    },
  },
};
</script>
