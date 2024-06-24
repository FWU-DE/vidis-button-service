<template>
  <span class="p-fluid">
    <Dialog
      v-if="mobileAutoReady"
      v-model:visible="showMobile"
      id="mobileIDPInput"
      position="top"
      :showCloseIcon="false"
      :appendTo="globalTeleportTarget"
      :modal="true"
      :dismissableMask="true"
      :showHeader="false"
      @hide="switchToNormal"
      :style="mobileInputStyle"
    >
      <div
        class="flex justify-content-center grid-nogutter"
        style="width: 100%"
      >
        <div
          id="mobileAutocompletePlace"
          style="height: 300px"
          class="col-12"
        />
      </div>
    </Dialog>
    <teleport
      v-if="mobileAutoReady && ready"
      :to="teleportIntoMobileDialog"
      :disabled="disableTeleport"
    >
      <div :style="labelStyle">
        <span class="idpAutocompleteLabel">
          {{ $t("idp.label") }}
        </span>
      </div>

      <AutoComplete
        v-if="autoready"
        v-model="selectedIdP"
        ref="idpAutocomplete"
        :placeholder="$t('idp.placeholder')"
        :suggestions="filteredIdps"
        :inputClass="{ 'mobile-input': allowTeleportToMobile }"
        :inputStyle="{
          'font-size': '18px',
          'padding-right': '0px',
          'padding-left': '0px',
        }"
        :class="{ idpAutocomplete: focused && !showMobile }"
        :elevate="elevate"
        :mobileMode="mobileMode"
        style="width: 100%"
        @item-select="emitToParent"
        @complete="searchGroupedIdps($event)"
        @clicked="switchToMobile"
        @focus="focused = true"
        @blur="focused = false"
        @reset="resetSelection"
        field="name"
        optionGroupLabel="label"
        optionGroupChildren="items"
        forceSelection
      >
        <template #preppend>
          <img :src="searchIcon" class="preppendIcon flex-none" />
        </template>
        <template #item="{ item }">
          <div
            v-if="!item.noResult"
            class="flex align-items-center justify-content-between idpAutocompleteItem"
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
            <div class="grid">
              <img
                :src="WarningIcon"
                class="idp-item-icon"
                style="height: auto"
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
              <div class="col-12 no-left-margin">
                <hr class="divider" />
              </div>
              <div class="col-12">
                <ListAllIdp
                  :availableIdps="availableIdps"
                  @select-idp="selectIdp"
                />
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
import { filter, Collection, uniq, compact } from "lodash";
import cookie from "@/mixins/cookie";
import breakpoints from "@/mixins/breakpoints";
import Dialog from "primevue/dialog";
import AutoComplete from "@/components/idpSelection/Autocomplete/AutoComplete.vue";
import ListAllIdp from "@/components/idpSelection/ListAllIdp/ListAllIdp.vue";
import IdP from "@/store/ORM-Stores/models/idps";
import axios from "axios";
import cross from "@/assets/svgs/cross.svg";
import schoolIcon from "@/assets/svgs/school_icon.svg";
import WarningIcon from "@/assets/svgs/Warning.svg";
import searchIcon from "@/assets/svgs/search.svg";

export default defineComponent({
  name: "idp-autocomplete",
  props: {},
  mixins: [cookie, breakpoints],
  components: { AutoComplete, Dialog, ListAllIdp },
  data() {
    return {
      schoolIcon,
      cross,
      WarningIcon,
      searchIcon,
      idps: null,
      suggestions: [],
      availableIdps: [],
      selectedIdP: null,
      filteredIdps: [],
      notGroupedIdps: null,
      loadingIdps: false,
      showMobile: true,
      ready: false,
      mobileAutoReady: false,
      disableTeleport: true,
      autocompleteRef: {},
      focused: false,
      globalTeleportTarget: null,
      teleportIntoMobileDialog: null,
      autoready: false,
      elevate: false,
      whitelistedIdps: [],
    };
  },
  async created() {
    await this.loadIdps();
  },
  async mounted() {
    const shadow = document.querySelector("vidis-login")?.shadowRoot;
    this.globalTeleportTarget = shadow?.querySelector("#teleportsTarget");
    this.autoready = true;
    this.mobileAutoReady = true;
    this.showMobile = false;
    this.ready = true;
    if (!this.selectedIdP) await this.switchToMobile();
    this.focusAutocomplete();
  },
  computed: {
    mobileInputStyle() {
      let styles = {
        width: `${this.viewportWidth}px` || "100%",
        margin: 0,
        "background-color": "rgba(0, 0, 0, 0.4) !important",
        position: "inherit",
        left: "0px",
      };
      return styles;
    },
    idpdatafile() {
      return this.$store.getters.idpdatafile;
    },
    idp() {
      return this.$store.getters.idp;
    },
    msfilterurl() {
      return this.$store.getters.msfilterurl;
    },
    idpsInStore() {
      return IdP.all();
    },
    allowTeleportToMobile(): boolean {
      return this.breakpoint === "xs";
    },
    labelStyle() {
      return {
        "margin-bottom": !this.showMobile ? "17px" : "",
        "padding-top": this.showMobile ? "20px" : "",
        "padding-left": this.showMobile ? "20px" : "2px",
      };
    },
    mobileMode() {
      return this.showMobile && this.allowTeleportToMobile;
    },
    serviceproviderid() {
      return this.$store.getters.serviceproviderid;
    },
  },
  watch: {
    idpdatafile: {
      async handler() {
        IdP.deleteAll();
        await this.loadIdps();
      },
    },
    idpPreselected: {
      async handler() {
        IdP.deleteAll();
        await this.loadIdps();
      },
    },
    cookieIdp: {
      async handler() {
        if (this.idpPreselected && IdP.all().length === 0)
          await this.loadIdps();
        else if (this.idpPreselected) this.selectedIdP = IdP.find(this.idp);
      },
      immediate: true,
    },
    idp: {
      async handler() {
        if (this.idpPreselected && IdP.all().length === 0)
          await this.loadIdps();
        else if (this.idpPreselected) this.selectedIdP = IdP.find(this.idp);
      },
      immediate: true,
    },
  },
  methods: {
    async switchToMobile() {
      const shadow = document.querySelector("vidis-login")?.shadowRoot;
      if (this.allowTeleportToMobile && !this.showMobile) {
        this.showMobile = true;
        this.teleportIntoMobileDialog = null;
        await this.$nextTick();
        this.teleportIntoMobileDialog = shadow?.querySelector(
          "#mobileAutocompletePlace"
        );
        this.disableTeleport = false;
        await this.$nextTick();
        this.elevate = false;
        this.focusAutocomplete();
      }
    },
    focusAutocomplete() {
      const shadow = document.querySelector("vidis-login")?.shadowRoot;
      let elementToFocus = shadow?.querySelector(
        ".p-autocomplete-input"
      ) as any;
      elementToFocus?.focus();
    },
    switchToNormal() {
      this.elevate = true;
      this.disableTeleport = true;

      this.showMobile = false;
    },
    async loadIdps(): Promise<void> {
      if (IdP.all().length === 0) {
        try {
          this.loadingIdps = true;
          let url = `https://repo.vidis.schule/repository/vidis-cdn/data/${this.idpdatafile}.json`;
          let res = await axios.get(url);
          this.availableIdps = await this.filterOutIdps(res.data);
          IdP.insert({
            data: this.availableIdps,
          });
          this.groupIdps();
          this.loadingIdps = false;
        } catch (e) {
          this.loadingIdps = false;
          throw new Error("Couldn't load IdPs " + e);
        }
      } else this.groupIdps();
      this.selectedIdP = IdP.find(this.cookieIdp || this.idp);
      if (this.selectedIdP) this.emitToParent();
    },
    async filterOutIdps(idps = []) {
      if (this.serviceproviderid) {
        if (this.whitelistedIdps.length === 0) {
          const url = `${this.msfilterurl}/service-provider/${this.serviceproviderid}/idp-assignments`;
          this.whitelistedIdps = (await axios.get(url)).data;
        }
        const filteredIdps = idps.filter((idpElem: any) => {
          return (this.whitelistedIdps || []).some((whiteIdp: any) => {
            return whiteIdp === idpElem.id;
          });
        });
        return filteredIdps;
      } else {
        return idps;
      }
    },
    emitToParent(): void {
      this.switchToNormal();
      this.$emit("emitSelectedIdp", this.selectedIdP);
    },
    searchGroupedIdps({ query }: { query: string }): void {
      let filteredIdps = [];
      const localFinalGroupedIdps = this.finalGroupedIdps || [];
      for (let state of localFinalGroupedIdps) {
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
      let idpsForParticularState = filter(this.idpsInStore, (el: any) => {
        return el.address.state === state;
      });
      return idpsForParticularState;
    },
    getIdpsWithoutState(): any[] {
      const hasNoState = filter(this.idpsInStore, (el: any) => {
        return !el.address.state;
      });
      return hasNoState;
    },
    getListOfStates(): Collection<any> {
      let statesList = this.idpsInStore.map(
        (value: any) => value.address.state
      );
      statesList.push("Sonstige");
      statesList = compact(uniq(statesList));
      return statesList;
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
    resetSelection(): void {
      this.selectedIdP = "";
      this.focused = true;
      this.$emit("emitSelectedIdp", this.selectedIdP);
    },
    selectIdp(idp: IdP): void {
      this.selectedIdP = idp;
      this.emitToParent();
    },
  },
});
</script>
