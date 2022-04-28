<template>
  <Dialog
    v-model:visible="showDialog"
    class="p-dialog-maximized"
    header="Header"
    footer="Footer"
  >
    <div>
      <div class="center-row">
        <AutoComplete
          class="idp-autocomplete"
          v-on:emitSelectedIdp="onIdpSelected"
        />
      </div>
      <div class="center-row" v-if="showButton && !loading">
        <Button
          class="idp-choice-button"
          :label="$t('idp.button')"
          :alt="$t('idp.button')"
          @click="redirectToIdpLogin()"
        >
          <span class="idp-button-label font-semibold"
            >{{ $t("idp.button") }} {{ this.receivedIdp.name }}</span
          >
        </Button>
      </div>
      <div class="center-row" v-if="showButton && loading">
        <Button class="idp-choice-button-loading" :alt="$t('idp.button')">
          <ProgressSpinner class="center-row overlay"></ProgressSpinner>
          <span class="idp-button-label font-semibold"
            >{{ $t("idp.button") }} {{ this.receivedIdp.name }}</span
          >
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dialog from "primevue/dialog";
import AutoComplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  name: "idp-dialog",
  inject: {
    loginurl: {
      default: "",
    },
  },
  props: {
    visible: { type: Boolean, default: false },
  },
  components: { Dialog, AutoComplete, ProgressSpinner },
  data() {
    return {
      showDialog: false,
      receivedIdp: "",
      showButton: false,
      loading: false,
    };
  },
  watch: {
    showDialog(newVal: boolean) {
      if (!newVal) this.$emit("closed");
    },
    visible(newVal: boolean) {
      this.showDialog = newVal;
    },
  },
  methods: {
    redirectToIdpLogin() {
      this.loading = true;
      try {
        let url = this.loginurl + "?idp_hint=" + this.receivedIdp.id;
        window.location.href = url;
      } catch (e) {
        console.log("Couldn't redirect to selected IdP ");
        this.loading = false;
      }
    },
    onIdpSelected(value: string) {
      this.receivedIdp = value;
      if (this.receivedIdp) this.showButton = true;
    },
  },
});
</script>
