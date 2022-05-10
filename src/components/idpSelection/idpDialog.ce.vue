<template>
  <Dialog
    v-model:visible="showDialog"
    class="p-dialog-maximized"
    @keydown.esc="showDialog = false"
    :closable="false"
  >
    <template #header="">
      <vbtnHeader @closeDialog="showDialog = false" />
    </template>
    <div class="grid-nogutter flex justify-content-center">
      <div class="col-12 sm:col-12 md:col-8 lg:col-6 xl:col-6">
        <IdpAutoComplete
          class="idp-autocomplete"
          @emitSelectedIdp="onIdpSelected"
        />
      </div>
    </div>
    <div class="grid-nogutter flex justify-content-center">
      <div
        class="col-12 sm:col-12 md:col-8 lg:col-6 xl:col-6"
        v-if="showButton"
      >
        <Button
          v-if="showButton"
          class="idp-choice-button"
          :class="{ 'idp-choice-button-loading': loading }"
          :label="$t('idp.button')"
          :alt="$t('idp.button')"
          :disabled="loading"
          @click="redirectToIdpLogin()"
        >
          <ProgressSpinner v-if="loading" class="idp-button-spinner" />
          <div class="idp-button-label font-semibold">
            {{ $t("idp.button") }} {{ this.receivedIdp.name }}
          </div>
        </Button>
      </div>
    </div>
    <template #footer=""><vbtnFooter /></template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cookie from "@/mixins/cookie";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import IdpAutoComplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
import ProgressSpinner from "primevue/progressspinner";
import vbtnHeader from "@/components/layoutElements/vbtnHeader.ce.vue";
import vbtnFooter from "@/components/layoutElements/vbtnFooter.ce.vue";

export default defineComponent({
  name: "idp-dialog",
  inject: {
    loginurl: {
      default: "",
    },
    cookie: {
      default: false,
    },
  },
  props: {
    visible: { type: Boolean, default: false },
  },
  mixins: [Cookie],
  components: {
    Dialog,
    IdpAutoComplete,
    ProgressSpinner,
    Button,
    vbtnHeader,
    vbtnFooter,
  },
  data() {
    return {
      showDialog: false,
      receivedIdp: "",
      showButton: false,
      loading: false,
    };
  },
  watch: {
    showDialog(newVal: boolean): void {
      if (!newVal) this.$emit("closed");
    },
    visible(newVal: boolean): void {
      this.showDialog = newVal;
    },
  },
  methods: {
    redirectToIdpLogin(): void {
      this.loading = true;
      try {
        let url = this.loginurl + "?kc_idp_hint=" + this.receivedIdp.id;
        this.setCookie(this.receivedIdp.id);
        window.location.href = url;
        this.loading = false;
      } catch (e) {
        console.log("Couldn't redirect to selected IdP ", e); //TODO show Error Toastnotification
        this.loading = false;
      }
    },
    onIdpSelected(value: string): void {
      this.receivedIdp = value;
      if (this.receivedIdp) this.showButton = true;
    },
  },
});
</script>
