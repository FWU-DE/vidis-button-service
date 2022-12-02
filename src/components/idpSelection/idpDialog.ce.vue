<template>
  <Dialog
    v-if="ready"
    v-model:visible="showDialog"
    class="p-dialog-maximized"
    :style="dialogStyles"
    :closable="false"
    :appendTo="teleportTarget"
    ref="vidis-dialog"
    :contentStyle="{ overflow: _showScrollbars }"
  >
    <template #header="">
      <vbtnHeader @closeDialog="showDialog = false" />
    </template>
    <div class="layout blue-background">
      <div style="width: 100%" class="blue-background standard-padding">
        <div class="grid-nogutter flex justify-content-center blue-background">
          <div class="col-12 sm:col-12 md:col-8 lg:col-6 xl:col-6">
            <IdpAutoComplete
              class="idp-autocomplete"
              @emitSelectedIdp="onIdpSelected"
            />
          </div>
        </div>
        <div class="grid-nogutter flex justify-content-center blue-background">
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
      </div>
      <vbtnFooter @helpStatusUpdated="updateShowScrollbars" />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Cookie from "@/mixins/cookie";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import IdpAutoComplete from "@/components/idpSelection/idpAutocomplete.ce.vue";
import ProgressSpinner from "primevue/progressspinner";
import vbtnHeader from "@/components/layoutElements/vbtnHeader.ce.vue";
import vbtnFooter from "@/components/layoutElements/vbtnFooter.ce.vue";
import breakpoints from "@/mixins/breakpoints";

export default defineComponent({
  name: "idp-dialog",
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
      teleportTarget: null,
      ready: false,
      showScrollbars: true,
    };
  },
  mounted() {
    this.teleportTarget = this.$el.parentNode.children[0];
    this.ready = true;
  },
  computed: {
    dialogStyles() {
      let styles = {
        width: `${this.viewportWidth}px` || "100%",
      };
      return styles;
    },
    resetSelectionIconClass() {
      return this.showMobile && this.allowTeleportToMobile
        ? "resetSelectionIcon-mobile"
        : "resetSelectionIcon";
    },
    loginurl() {
      return this.$store.getters.loginurl;
    },
    cookie() {
      return this.$store.getters.cookie;
    },
    idphintname() {
      return this.$store.getters.idphintname;
    },
    requestmethod() {
      return this.$store.getters.requestmethod;
    },
    _showScrollbars() {
      return this.showScrollbars ? "" : "hidden";
    },
  },
  watch: {
    showDialog(newVal: boolean): void {
      if (!newVal) this.$emit("closed");
    },
    async visible(newVal: boolean): Promise<void> {
      this.showDialog = newVal;
    },
  },
  methods: {
    updateShowScrollbars(helpStatus: boolean) {
      this.showScrollbars = !helpStatus;
    },
    async redirectToIdpLogin(): Promise<void> {
      this.loading = true;
      try {
        let url = this.loginurl + `?${this.idphintname}=${this.receivedIdp.id}`;
        this.setCookie(this.receivedIdp.id);
        if (this.requestmethod === "GET") window.location.href = url;
        else if (this.requestmethod !== "GET") {
          await axios({ method: this.requestmethod, url: url });
        }

        this.loading = false;
      } catch (e) {
        console.error("Couldn't redirect to selected IdP ", e); //TODO show Error Toastnotification
        this.loading = false;
      }
    },
    onIdpSelected(value: string): void {
      this.receivedIdp = value;
      this.showButton = !!this.receivedIdp;
    },
  },
});
</script>
