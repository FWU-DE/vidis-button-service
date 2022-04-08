<template>
  <span class="p-fluid">
    <AutoComplete
      dropdown
      forceSelection
      v-model="selectedIdP"
      :suggestions="filteredIdps"
      @complete="searchIdps($event)"
      @item-select="emitToParent"
      field="name"
      placeholder="z. B. Bundesland, Stadt, Email, Schule, ..."
    >
      <template #item="slotProps">
        <div class="container">
          <div class="center">
            <img class="school-image" :src="schoolLogo" />
            <div class="autocomplete-main-item">
              {{ slotProps.item.name }}
              <span class="autocomplete-small-item">{{
                slotProps.item.address.city
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </AutoComplete>

    <AutoComplete
      dropdown
      forceSelection
      v-model="selectedCity"
      :suggestions="filteredCities"
      @item-select="emitToParent"
      @complete="searchGroupedIdps($event)"
      field="name"
      optionGroupLabel="label"
      optionGroupChildren="items"
      placeholder="z. B. Bundesland, Stadt, Email, Schule, ..."
    >
      <template #optiongroup="slotProps">
        <div class="autocomplete-small-item">
          <div>{{ slotProps.item.label }}</div>
        </div>
      </template>
    </AutoComplete>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AutoComplete from "primevue/autocomplete";
import IdP from "@/store/ORM-Stores/models/idps";
import axios from "axios";
import schoolSvg from "@/assets/svgs/school_icon.svg";
import _ from "lodash";
import { FilterService, FilterMatchMode } from "primevue/api";

export default defineComponent({
  name: "idp-dialog",
  props: {},
  components: { AutoComplete },
  data() {
    return {
      idps: null,
      filteredIdps: [],
      selectedIdP: "",
      suggestions: [],
      availableIdps: [],
      schoolSvg,
      selectedCity: null,
      filteredCities: null,
      notGroupedIdps: null,
    };
  },
  async created() {
    await this.loadIdps();
    this.getListOfStates();
    this.groupIdps();
  },

  computed: {
    idpsInStore() {
      return IdP.all();
    },
    listOfStates() {
      return this.getListOfStates();
    },
    schoolLogo() {
      return schoolSvg;
    },
  },
  methods: {
    async loadIdps() {
      try {
        let res = await axios.get(
          "https://fwu-nexus.intension.eu/repository/vidis-cdn/data/idps_test4.json"
        );
        this.availableIdps = res.data.idp;
        IdP.insert({
          data: this.availableIdps,
        });
      } catch (e) {
        throw new Error("Couldn't load IdPs " + e);
      }
    },
    emitToParent(event: any) {
      this.$emit("emitSelectedIdp", this.selectedIdP);
    },
    searchIdps(event: any) {
      if (!event.query.trim().length) {
        this.filteredIdps = [...this.idpsInStore];
      } else {
        this.filteredIdps = this.idpsInStore.filter((idp: { name: string }) => {
          return idp.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }
    },

    searchGroupedIdps(event: any) {
      let query = event.query;
      let filteredCities = [];

      for (let state of this.finalGroupedIdps) {
        let filteredItems = FilterService.filter(
          state.items,
          ["name"],
          query,
          FilterMatchMode.CONTAINS
        );
        if (filteredItems && filteredItems.length) {
          filteredCities.push({ ...state, ...{ items: filteredItems } });
        }
      }
      this.filteredCities = filteredCities;
    },
    getIdpsForState(state: string) {
      let idpsForParticularState = _.filter(
        this.idpsInStore,
        function (el: any) {
          return el.address.state === state;
        }
      );
      return idpsForParticularState;
    },
    getListOfStates() {
      let statesList = this.idpsInStore.map(
        (value: any) => value.address.state
      );
      return _.uniq(statesList);
    },
    groupIdps() {
      let finalGroupedIdps = [];
      for (let state of this.getListOfStates()) {
        finalGroupedIdps.push({
          ...{ label: state },
          ...{ items: this.getIdpsForState(state) },
        });
      }
      this.finalGroupedIdps = finalGroupedIdps;
      return finalGroupedIdps;
    },
  },
});
</script>
