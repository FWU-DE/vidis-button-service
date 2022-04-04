<template>
  <span class="p-fluid">
    <AutoComplete
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
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AutoComplete from "primevue/autocomplete";
import IdP from "@/store/ORM-Stores/models/idps";
import axios from "axios";
import schoolSvg from "@/assets/svgs/school_icon.svg";

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
    };
  },
  created() {
    this.loadIdps();
  },

  computed: {
    idpsInStore() {
      return IdP.all();
    },
    schoolLogo() {
      return schoolSvg;
    },
  },
  methods: {
    async loadIdps() {
      try {
        await axios
          .get(
            "https://fwu-nexus.intension.eu/repository/vidis-cdn/data/idps_test3.json"
          )
          .then((res) => {
            this.availableIdps = res.data.idp;
            IdP.insert({
              data: this.availableIdps,
            });
          });
      } catch (e) {
        throw new Error("Couldn't load IdPs" + e);
      }
    },
    emitToParent(event: any) {
      this.$emit("emitSelectedIdp", this.selectedIdP);
    },
    searchIdps(event: any) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredIdps = [...this.idpsInStore];
        } else {
          this.filteredIdps = this.idpsInStore.filter(
            (idp: { name: string }) => {
              return idp.name.toLowerCase().includes(event.query.toLowerCase());
            }
          );
        }
      }, 5);
    },
  },
});
</script>
