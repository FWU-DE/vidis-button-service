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
  components: { Button },
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
  async created() {
    await this.loadIdpsSelection();
  },
  computed: {
    size() {
      return this.$store.getters.size;
    },
    idpdatafile() {
      return this.$store.getters.idpdatafile;
    },
    idphintname() {
      return this.$store.getters.idphintname;
    },
    loginurl() {
      return this.$store.getters.loginurl;
    },
    idp() {
      return this.$store.getters.idp;
    },
    icon() {
      if (this.size === "S")
        return this.buttonHovered ? this.logoNoText_inverted : this.logoNoText;
      else return this.buttonHovered ? this.lockIconInverted : this.lockIcon;
    },
    idpPreselected() {
      return !!this.idp || this.cookieIdp.length > 0;
    },
  },
  watch: {
    idpdatafile: {
      async handler() {
        IdP.deleteAll();
        await this.loadIdpsSelection();
      },
      immediate: true,
    },
    idpPreselected: {
      async handler() {
        IdP.deleteAll();
        await this.loadIdpsSelection();
      },
      immediate: true,
    },
    cookieIdp: {
      async handler() {
        if (this.idpPreselected && IdP.all().length === 0)
          await this.loadIdpsSelection();
        else if (this.idpPreselected) {
          this.selectedIdP = IdP.find(this.cookieIdp || this.idp);
          this.buttonLabel =
            this.$t("entrance.buttonSelectedIdp") + this.selectedIdP.name;
        } else this.buttonLabel = this.$t("entrance.button");
      },
      immediate: true,
    },
    idp: {
      async handler() {
        if (this.idpPreselected && IdP.all().length === 0)
          await this.loadIdpsSelection();
        else if (this.idpPreselected) {
          this.selectedIdP = IdP.find(this.idp);
          this.buttonLabel =
            this.$t("entrance.buttonSelectedIdp") + this.selectedIdP.name;
        } else this.buttonLabel = this.$t("entrance.button");
      },
      immediate: true,
    },
  },
  methods: {
    openIdpSelection() {
      this.$emit("clicked");
    },
    clicked() {
      if (this.idpPreselected) {
        this.loading = true;
        try {
          let url =
            this.loginurl + `?${this.idphintname}=${this.selectedIdP.id}`;
          window.location.href = url;
          this.loading = false;
        } catch (e) {
          console.log("Couldn't redirect to selected IdP ", e);
          this.loading = false;
        }
      } else {
        this.openIdpSelection();
      }
    },
    async loadIdpsSelection(): Promise<void> {
      if (this.idpPreselected) {
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
        this.selectedIdP = IdP.find(this.cookieIdp || this.idp);
        this.buttonLabel =
          this.$t("entrance.buttonSelectedIdp") + this.selectedIdP.name;
      } else {
        this.buttonLabel = this.$t("entrance.button");
      }
    },
  },
});
</script>
