<template>
  <span class="p-fluid">
    <AutoComplete
      type="search"
      forceSelection
      :modelValue="selectedIdP"
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
        <div class="grid-nogutter flex align-items-center">
          <img :src="schoolIcon" class="idp-item-icon" />
          <div>
            <div class="idp-item-label">{{ slotProps.item.name }}</div>
            <div class="autocomplete-small-item">
              {{ slotProps.item.address.city }}
            </div>
          </div>
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
import schoolIcon from "@/assets/svgs/school_icon.svg";
import cookie from "@/mixins/cookie";
import AutoComplete from "primevue/autocomplete";
import IdP from "@/store/ORM-Stores/models/idps";
import axios from "axios";
import cross from "@/assets/svgs/cross.svg";
import _ from "lodash";
import { FilterService, FilterMatchMode } from "primevue/api";

export default defineComponent({
  name: "idp-autocomplete",
  props: {},
  mixins: [cookie],
  components: { AutoComplete },
  data() {
    return {
      schoolIcon,
      cross,
      idps: null,
      suggestions: [],
      availableIdps: [],
      selectedIdP: null,
      filteredIdps: null,
      notGroupedIdps: null,
      loadingIdps: false,
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
  },
  methods: {
    async loadIdps(): Promise<void> {
      if (IdP.all().length === 0) {
        try {
          this.loadingIdps = true;
          let res = await axios.get(
            "https://fwu-nexus.intension.eu/repository/vidis-cdn/data/idps2.json"
          );
          console.log("??", res);
          this.availableIdps = res.data.idp;
          IdP.insert({
            data: this.availableIdps,
          });
          this.loadingIdps = false;
        } catch (e) {
          console.log("??", e);
          this.loadingIdps = false;
          throw new Error("Couldn't load IdPs " + e);
        }
      }
      this.selectedIdP = IdP.find(this.cookieIdp);
      if (this.selectedIdP) this.emitToParent();
    },
    emitToParent(): void {
      this.$emit("emitSelectedIdp", this.selectedIdP);
    },
    searchGroupedIdps(event: any): void {
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
    getIdpsForState(state: string): any[] {
      let idpsForParticularState = _.filter(
        this.idpsInStore,
        function (el: any) {
          return el.address.state === state;
        }
      );
      return idpsForParticularState;
    },
    getIdpsWithoutState(): any[] {
      const hasNoState = _.filter(this.idpsInStore, function (el: any) {
        return !el.address.state;
      });
      return hasNoState;
    },
    getListOfStates(): _.Collection<any> {
      let statesList = this.idpsInStore.map(
        (value: any) => value.address.state
      );
      statesList.push("Sonstige");
      return _(statesList).uniq().compact();
    },
    groupIdps(): any[] {
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
