<template>
  <Button
    class="col-12 entrance-button"
    :label="$t('entrance.button')"
    :alt="$t('entrance.button')"
    :class="{ 'small-entrance-button': this.size === 'S' }"
    :disabled="loading"
    @click="clicked"
    @mouseover="buttonHovered = true"
    @mouseleave="buttonHovered = false"
  >
    <ProgressSpinner v-if="loading" class="idp-button-spinner" />
    <img alt="logo" :src="icon" style="width: 1.5rem" />
    <span class="ml-2 font-semibold">{{ this.buttonLabel }}</span>
  </Button>
  <Button
    v-if="idpPreselected"
    class="col-12 p-button-link changeIdpButton flex align-content-center"
    @click="openIdpSelection"
  >
    <span class="changeIdpButtonLabel">
      {{ $t("entrance.cookieSelectIdp") }}
    </span>
  </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Button from "primevue/button";
import ProgressSpinner from "primevue/button";
import Cookie from "@/mixins/cookie";
import IdP from "@/store/ORM-Stores/models/idps";
import logo from "@/assets/svgs/Logo.svg";
import lockIcon from "@/assets/svgs/vidis_schield.svg";
import lockIconInverted from "@/assets/svgs/vidis_schield_inverted.svg";
import logoNoText from "@/assets/svgs/LogoNoText.svg";
import logoNoText_inverted from "@/assets/svgs/LogoNoText_inverted.svg";
export default defineComponent({
  name: "entryButton",
  props: {},
  mixins: [Cookie],
  components: { Button, ProgressSpinner },
  data() {
    return {
      logo,
      lockIcon,
      lockIconInverted,
      logoNoText,
      logoNoText_inverted,
      buttonHovered: false,
      buttonLabel: "",
      availableIdps: [],
      selectedIdP: null,
      loadingIdps: false,
      loading: false,
    };
  },
  async mounted() {
    await this.loadIdpsSelection();
  },
  computed: {
    size(): string {
      return this.$store.getters.size;
    },
    idpdatafile(): string {
      return this.$store.getters.idpdatafile;
    },
    idphintname(): string {
      return this.$store.getters.idphintname;
    },
    loginurl(): string {
      return this.$store.getters.loginurl;
    },
    idp(): string {
      return this.$store.getters.idp;
    },
    _idp() {
      return IdP.find(this.idp);
    },
    requestmethod() {
      return this.$store.getters.requestmethod;
    },
    icon() {
      if (this.size === "S")
        return this.buttonHovered ? this.logoNoText_inverted : this.logoNoText;
      else return this.buttonHovered ? this.lockIconInverted : this.lockIcon;
    },
    idpPreselected(): boolean {
      return !!this._idp?.name || this.cookieIdp.length > 0;
    },
    idpPreConfigured(): boolean {
      return this.cookieIdp.length > 0 || !!this.idp;
    },
  },
  watch: {
    idpdatafile: {
      async handler(): Promise<void> {
        IdP.deleteAll();
        await this.loadIdpsSelection();
      },
      immediate: true,
    },
    cookieIdp: {
      async handler(): Promise<void> {
        await this.reloadPreselectedIdp(true);
      },
      immediate: true,
    },
    idp: {
      async handler(): Promise<void> {
        await this.reloadPreselectedIdp(false);
      },
      immediate: true,
    },
  },
  methods: {
    async reloadPreselectedIdp(cookiePriority = true): Promise<void> {
      if (this.idpPreConfigured && IdP.all().length === 0)
        await this.loadIdpsSelection();
      else if (this.idpPreConfigured) {
        if (cookiePriority)
          this.selectedIdP = IdP.find(this.cookieIdp) || this._idp;
        else this.selectedIdP = this._idp || IdP.find(this.cookieIdp);
        if (this.selectedIdP) {
          this.buttonLabel =
            this.$t("entrance.buttonSelectedIdp") + this.selectedIdP.name;
        } else this.buttonLabel = this.$t("entrance.button");
      } else this.buttonLabel = this.$t("entrance.button");
    },
    openIdpSelection(): void {
      this.$emit("clicked");
    },
    async clicked(): Promise<void> {
      if (this.idpPreselected) {
        this.loading = true;
        try {
          let url =
            this.loginurl + `?${this.idphintname}=${this.selectedIdP.id}`;
          if (this.requestmethod === "GET") window.location.href = url;
          else if (this.requestmethod === "POST") {
            const headers = {
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
              "Content-Type": "application/x-www-form-urlencoded",
            };

            await axios({ method: "POST", url: url, headers });
          }
          this.loading = false;
        } catch (e) {
          console.error("Couldn't redirect to selected IdP ", e);
          this.loading = false;
        }
      } else {
        this.openIdpSelection();
      }
    },
    async loadIdpsSelection(): Promise<void> {
      if (this.idpPreConfigured) {
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
        this.selectedIdP = IdP.find(this.cookieIdp) || IdP.find(this.idp);
        if (this.selectedIdP) {
          this.buttonLabel =
            this.$t("entrance.buttonSelectedIdp") + this.selectedIdP.name;
        } else this.buttonLabel = this.$t("entrance.button");
      } else {
        this.buttonLabel = this.$t("entrance.button");
      }
    },
  },
});
</script>
