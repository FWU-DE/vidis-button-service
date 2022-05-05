<template>
  <span class="p-fluid">
    <!-- <div id="mobileAutocompletePlace"></div> -->
    <Sidebar v-model:visible="showMobile" position="top" :showCloseIcon="false">
      <div id="mobileAutocompletePlace"></div>
    </Sidebar>
    <teleport
      v-if="ready"
      to="#mobileAutocompletePlace"
      :disabled="disableTeleport"
    >
      <AutoComplete
        v-model="selectedIdP"
        :modelValue="selectedIdP"
        :placeholder="$t('idp.placeholder')"
        :suggestions="filteredIdps"
        :class="{}"
        :inputClass="{ 'mobile-input': allowTeleportToMobile }"
        style="width: 100%"
        @item-select="emitToParent"
        @complete="searchGroupedIdps($event)"
        @focus="switchToMobile"
        field="name"
        optionGroupLabel="label"
        optionGroupChildren="items"
        type="search"
        forceSelection
      >
        <template #item="{ item }">
          <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center">
              <img :src="schoolIcon" class="idp-item-icon" />
              <div>
                <div class="idp-item-label">{{ item.name }}</div>
                <div class="autocomplete-small-item">
                  {{ item.address?.city }}
                </div>
              </div>
            </div>
            <div
              v-if="item.emailDomain"
              class="idp-item-label"
              style="font-size: 12px"
            >
              {{ emailToDomain(item.emailDomain) }}
            </div>
          </div>
        </template>
        <template #optiongroup="{ item }">
          <div class="autocomplete-small-item">
            <div>{{ item.label }}</div>
          </div>
        </template>
      </AutoComplete>
    </teleport>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import _ from "lodash";
import cookie from "@/mixins/cookie";
import breakpoints from "@/mixins/breakpoints";

import Sidebar from "primevue/sidebar";
import AutoComplete from "primevue/autocomplete";
import IdP from "@/store/ORM-Stores/models/idps";
import axios from "axios";
import cross from "@/assets/svgs/cross.svg";
import schoolIcon from "@/assets/svgs/school_icon.svg";

export default defineComponent({
  name: "idp-autocomplete",
  props: {},
  mixins: [cookie, breakpoints],
  components: { AutoComplete, Sidebar },
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
      showMobile: true,
      ready: false,
      disableTeleport: true,
    };
  },
  async created() {
    await this.loadIdps();
    this.groupIdps();
  },
  mounted() {
    this.ready = true;
    this.showMobile = false;
  },
  computed: {
    idpsInStore() {
      return IdP.all();
    },
    allowTeleportToMobile(): boolean {
      return this.breakpoint === "xs" || this.breakpoint === "sm";
    },
  },
  methods: {
    switchToMobile() {
      if (this.allowTeleportToMobile && !this.showMobile) {
        this.showMobile = true;
        this.ready = false;
        setTimeout(() => {
          this.disableTeleport = false;
          this.ready = true;
          console.log("teleported");
        }, 1);
      }
    },
    switchToNormal() {
      this.showMobile = false;
      this.disableTeleport = true;
    },
    async loadIdps(): Promise<void> {
      if (IdP.all().length === 0) {
        try {
          this.loadingIdps = true;
          let res = await axios.get(
            "https://fwu-nexus.intension.eu/repository/vidis-cdn/data/idps.json"
          );
          this.availableIdps = res.data.idp;
          IdP.insert({
            data: this.availableIdps,
          });
          this.loadingIdps = false;
        } catch (e) {
          this.loadingIdps = false;
          throw new Error("Couldn't load IdPs " + e);
        }
      }
      this.selectedIdP = IdP.find(this.cookieIdp);
      if (this.selectedIdP) this.emitToParent();
    },
    emitToParent(): void {
      this.switchToNormal();
      this.$emit("emitSelectedIdp", this.selectedIdP);
    },
    searchGroupedIdps({ query }: { query: string }): void {
      let filteredIdps = [];
      for (let state of this.finalGroupedIdps) {
        let filteredItems = state.items.filter((item: any) => {
          let found =
            this.contains(item.name, query) ||
            this.contains(item.emailDomain, query) ||
            this.contains(item.additionalInformation, query) ||
            this.contains(item.address.city, query) ||
            this.contains(item.address.state, query) ||
            this.contains(item.address.zip, query) ||
            this.contains(item.address.street, query) ||
            (item.alternativeSearchTags || []).some((tag: string) =>
              this.contains(tag, query)
            );
          return found;
        });
        if (filteredItems && filteredItems.length) {
          filteredIdps.push({ ...state, ...{ items: filteredItems } });
        }
      }
      this.filteredIdps = filteredIdps;
    },
    contains(value = "", query = ""): boolean {
      let _value = value.toUpperCase();
      let _query = query.toUpperCase();
      return !!_value && !!_query && _value.includes(_query);
    },
    emailToDomain(email: string): string {
      return `@${email.split("@").pop()}`;
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
