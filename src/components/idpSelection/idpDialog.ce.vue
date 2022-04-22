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
      <div class="center-row" v-if="showButton">
        <Button
          class="idp-choice-button"
          :label="$t('idp.button')"
          :alt="$t('idp.button')"
          @click="redirectToIdpLogin()"
        >
          <span class="idp-button-label font-semibold">{{
            $t("idp.button")
          }}</span>
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dialog from "primevue/dialog";
import AutoComplete from "@/components/idpSelection/idpAutocomplete.ce.vue";

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
  components: { Dialog, AutoComplete },
  data() {
    return {
      showDialog: false,
      receivedIdp: "",
      showButton: false,
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
      let url = this.loginurl + "?idp_hint=" + this.receivedIdp.id;
      window.location.href = url;
    },
    onIdpSelected(value: string) {
      this.receivedIdp = value;
      if (this.receivedIdp) this.showButton = true;
    },
  },
});
</script>
