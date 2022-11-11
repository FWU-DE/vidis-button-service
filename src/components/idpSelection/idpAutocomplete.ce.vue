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
      style="
        width: 100%;
        margin: 0;
        background-color: rgba(0, 0, 0, 0.4) !important;
      "
    >
      <div id="mobileAutocompletePlace" style="height: 300px"></div>
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
        <Button :class="resetSelectionIconClass" @click="resetSelection">
          <img
            :src="cross"
            :alt="$t('idp.resetSelection')"
            :title="$t('idp.resetSelection')"
          />
        </Button>
      </div>

      <AutoComplete
        v-if="autoready"
        v-model="selectedIdP"
        ref="idpAutocomplete"
        :modelValue="selectedIdP"
        :placeholder="$t('idp.placeholder')"
        :suggestions="filteredIdps"
        :inputClass="{ 'mobile-input': allowTeleportToMobile }"
        :inputStyle="'font-size: 18px'"
        :class="{ idpAutocomplete: focused && !showMobile }"
        :elevate="elevate"
        style="width: 100%"
        @item-select="emitToParent"
        @complete="searchGroupedIdps($event)"
        @clicked="switchToMobile"
        @focus="focused = true"
        @blur="focused = false"
        field="name"
        optionGroupLabel="label"
        optionGroupChildren="items"
        forceSelection
      >
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
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import AutoComplete from "@/components/idpSelection/Autocomplete/AutoComplete.vue";
import IdP from "@/store/ORM-Stores/models/idps";
import axios from "axios";
import cross from "@/assets/svgs/cross.svg";
import schoolIcon from "@/assets/svgs/school_icon.svg";
import WarningIcon from "@/assets/svgs/Warning.svg";

export default defineComponent({
  name: "idp-autocomplete",
  props: {},
  mixins: [cookie, breakpoints],
  components: { AutoComplete, Dialog, Button },
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
      mobileAutoReady: false,
      disableTeleport: true,
      autocompleteRef: {},
      focused: false,
      globalTeleportTarget: null,
      teleportIntoMobileDialog: null,
      autoready: false,
      elevate: false,
    };
  },
  async mounted() {
    await this.loadIdps();
    const shadow = document.querySelector("vidis-login")?.shadowRoot;
    this.globalTeleportTarget = shadow?.querySelector("#teleportsTarget");
    this.autoready = true;
    this.mobileAutoReady = true;
    this.showMobile = false;
    this.ready = true;
    if (!this.selectedIdP) await this.switchToMobile();
  },
  computed: {
    idpdatafile() {
      return this.$store.getters.idpdatafile;
    },
    idp() {
      return this.$store.getters.idp;
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
    resetSelectionIconClass() {
      return this.showMobile && this.allowTeleportToMobile
        ? "resetSelectionIcon-mobile"
        : "resetSelectionIcon";
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

        let elementToFocus = shadow?.querySelector(
          ".p-autocomplete-input"
        ) as any;
        elementToFocus?.focus();
      }
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
          this.availableIdps = res.data;
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
    async resetSelection(): Promise<void> {
      this.selectedIdP = "";
      this.focused = true;
      this.$emit("emitSelectedIdp", this.selectedIdP);
    },
  },
});
</script>
