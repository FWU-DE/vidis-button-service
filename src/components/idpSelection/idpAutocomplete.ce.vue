<template>
  <span class="p-fluid">
    <Sidebar
      v-model:visible="showMobile"
      position="top"
      :showCloseIcon="false"
      @hide="switchToNormal"
    >
      <div id="mobileAutocompletePlace"></div>
    </Sidebar>
    <teleport
      v-if="ready"
      to="#mobileAutocompletePlace"
      :disabled="disableTeleport"
    >
      <AutoComplete
        v-model="selectedIdP"
        ref="idpAutocomplete"
        :modelValue="selectedIdP"
        :placeholder="$t('idp.placeholder')"
        :suggestions="filteredIdps"
        :inputClass="{ 'mobile-input': allowTeleportToMobile }"
        style="width: 100%"
        @item-select="emitToParent"
        @complete="searchGroupedIdps($event)"
        @click="switchToMobile"
        field="name"
        optionGroupLabel="label"
        optionGroupChildren="items"
        type="search"
        forceSelection
      >
        <template #item="{ item }">
          <div
            v-if="!item.noResult"
            class="flex align-items-center justify-content-between"
            style="padding: 0.75rem 1rem"
          >
            <div class="flex align-items-center">
              <img :src="schoolIcon" class="idp-item-icon" />
              <div>
                <div class="idp-item-label">{{ item.name }}</div>
                <div class="autocomplete-small-item" style="padding: 0">
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
          <div v-if="item.label" class="autocomplete-small-item">
            <div>{{ item.label }}</div>
          </div>
          <div
            v-else
            class="flex align-items-center grid-nogutter idp-noResult"
            @click.prevent=""
          >
            <img
              :src="WarningIcon"
              class="idp-item-icon"
              style="height: 20px"
            />
            <div class="">
              <div class="idp-item-label idp-noResult-label">
                {{ $t("idp.noResult") }}
              </div>
              <br />
              <div class="idp-item-label idp-noResult-label">
                {{ $t("idp.noResult2") }}
              </div>
            </div>
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
import WarningIcon from "@/assets/svgs/Warning.svg";

export default defineComponent({
  name: "idp-autocomplete",
  props: {},
  mixins: [cookie, breakpoints],
  components: { AutoComplete, Sidebar },
  inject: {
    idpdatafile: {
      default: "idps",
    },
  },
  data() {
    return {
      schoolIcon,
      cross,
      WarningIcon,
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
      autocompleteRef: {},
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
      return this.breakpoint === "xs";
    },
  },
  watch: {
    showMobile(newShowMobile) {
      this.disableTeleport = !newShowMobile;
    },
  },
  methods: {
    async switchToMobile() {
      if (this.allowTeleportToMobile && !this.showMobile) {
        this.showMobile = true;
        this.ready = false;
        await this.$nextTick();
        this.disableTeleport = false;
        this.ready = true;
        await this.$nextTick();
        this.$refs.idpAutocomplete.focus();
      }
    },
    switchToNormal() {
      this.showMobile = false;
    },
    async loadIdps(): Promise<void> {
      if (IdP.all().length === 0) {
        try {
          this.loadingIdps = true;
          let url = `https://repo.vidis.schule/repository/vidis-cdn/data/${this.idpdatafile}.json`;
          let res = await axios.get(url);
          this.availableIdps = res.data;
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
            this.contains(this.emailToDomain(item.emailDomain), query) ||
            this.contains(item.additionalInformation, query) ||
            this.contains(item.address.city, query) ||
            this.contains(item.address.state, query) ||
            this.contains(item.address.zip, query) ||
            (item.alternativeSearchTags || []).some((tag: string) =>
              this.contains(tag, query)
            );
          return found;
        });
        if (filteredItems && filteredItems.length) {
          filteredIdps.push({ ...state, ...{ items: filteredItems } });
        }
      }
      if (filteredIdps.length === 0) {
        filteredIdps.push({
          label: "",
          items: [{ noResult: true }],
        });
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
      let idpsForParticularState = _.filter(this.idpsInStore, (el: any) => {
        return el.address.state === state;
      });
      return idpsForParticularState;
    },
    getIdpsWithoutState(): any[] {
      const hasNoState = _.filter(this.idpsInStore, (el: any) => {
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
