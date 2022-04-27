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
        <AutoComplete
          class="idp-autocomplete"
          v-on:emitSelectedIdp="onIdpSelected"
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
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import AutoComplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
import ProgressSpinner from "primevue/progressspinner";
import vbtnHeader from "@/components/layoutElements/vbtnHeader.ce.vue";
import vbtnFooter from "@/components/layoutElements/vbtnFooter.ce.vue";

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
  components: {
    Dialog,
    AutoComplete,
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
