<template>
  <div
    style="width: 100%; padding-bottom: 32px"
    :style="{ 'padding-top': pushdown }"
    class="grid-nogutter flex justify-content-center blue-background standard-padding"
  >
    <div class="col-12 sm:col-12 md:col-8 lg:col-6 xl:col-6">
      <Button
        name="vbtn"
        class="p-button-link backButton"
        v-esc="closeDialog"
        @click="closeDialog"
      >
        {{ $t("general.back") }}
      </Button>
      <div
        class="header-overLine"
        style="margin-bottom: 32px"
        :class="{ 'mb-3': size !== 'L' }"
      />
      <div
        class="grid-nogutter flex justify-content-between align-items-center"
      >
        <img
          style="height: 45px"
          :src="logo"
          :alt="$t('general.branding_accessibility')"
        />
        <div style="display: inline" class="flex align-items-center">
          <span class="secureLoginLabel">
            {{ $t("general.secureLoginLabel") }}
          </span>
          <img style="height: 18px; opacity: 0.7" :src="shield" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import esc from "@/directives/v-esc";
import breakpoints from "@/mixins/breakpoints";
import Button from "primevue/button";
import logo from "@/assets/svgs/Logo.svg";
import shield from "@/assets/svgs/vidis_schield.svg";

export default defineComponent({
  name: "vbtnHeader",
  props: {},
  mixins: [breakpoints],
  components: { Button },
  data() {
    return { logo, shield };
  },

  computed: {
    size() {
      return this.$store.getters.size;
    },
    pushdown(): string {
      return this.breakpoint === "xs" ||
        this.breakpoint === "sm" ||
        this.breakpoint === "md"
        ? ""
        : "150px";
    },
  },
  methods: {
    closeDialog(): void {
      this.$emit("closeDialog");
    },
  },
  directives: {
    esc,
  },
});
</script>
