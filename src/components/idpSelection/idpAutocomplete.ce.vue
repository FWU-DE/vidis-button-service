<template>
  <span class="p-fluid">
    <AutoComplete
      type="search"
      forceSelection
      v-model="selectedIdP"
      :suggestions="filteredIdps"
      @item-select="emitToParent"
      @complete="searchGroupedIdps($event)"
      field="name"
      optionGroupLabel="label"
      optionGroupChildren="items"
      :placeholder="$t('idp.placeholder')"
    >
      <template #item="slotProps">
        <div>{{ slotProps.item.name }}</div>
        <div class="autocomplete-small-item">
          {{ slotProps.item.address.city }}
        </div>
      </template>
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
import cross from "@/assets/svgs/cross.svg";
import _ from "lodash";
import { FilterService, FilterMatchMode } from "primevue/api";

export default defineComponent({
  name: "idp-autocomplete",
  props: {},
  components: { AutoComplete },
  data() {
    return {
      idps: null,
      suggestions: [],
      availableIdps: [],
      schoolSvg,
      cross,
      selectedIdP: null,
      filteredIdps: null,
      notGroupedIdps: null,
    };
  },
  async created() {
    await this.loadIdps();
    this.groupIdps();
  },

  computed: {
    idpsInStore() {
      return IdP.all();
    },
    schoolLogo() {
      return schoolSvg;
    },
    crossSvg() {
      return cross;
    },
  },
  methods: {
    async loadIdps() {
      try {
        let res = await axios.get(
          "https://fwu-nexus.intension.eu/repository/vidis-cdn/data/idps2.json"
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
    searchGroupedIdps(event: any) {
      let query = event.query;
      let filteredIdps = [];
      for (let state of this.finalGroupedIdps) {
        let filteredItems = FilterService.filter(
          state.items,
          ["name"],
          query,
          FilterMatchMode.CONTAINS
        );
        if (filteredItems && filteredItems.length) {
          filteredIdps.push({ ...state, ...{ items: filteredItems } });
        }
      }
      this.filteredIdps = filteredIdps;
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
    getIdpsWithoutState() {
      const hasNoState = _.filter(this.idpsInStore, function (el: any) {
        return !el.address.state;
      });
      return hasNoState;
    },
    getListOfStates() {
      let statesList = this.idpsInStore.map(
        (value: any) => value.address.state
      );
      statesList.push("Sonstige");
      return _(statesList).uniq().compact();
    },
    groupIdps() {
      let finalGroupedIdps = [];
      for (let state of this.getListOfStates()) {
        if (state !== "Sonstige") {
          finalGroupedIdps.push({
            ...{ label: state },
            ...{
              items: this.getIdpsForState(state),
            },
          });
        } else {
          finalGroupedIdps.push({
            ...{ label: "Sonstige" },
            ...{
              items: this.getIdpsWithoutState(),
            },
          });
        }
      }
      this.finalGroupedIdps = finalGroupedIdps;
      return finalGroupedIdps;
    },
  },
});
</script>
