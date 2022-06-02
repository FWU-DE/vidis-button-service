<template>
  <div class="helpFooterArea grid grid-nogutter flex justify-content-center">
    <div
      class="helpFooterLabels helpFooterTitle col-12 xs:col-12 sm:col-10 md:col-8 lg:col-8 xl:col-8"
    >
      {{ $t("help.footerTitle") }}
    </div>
    <div
      class="helpFooterLabels helpFooterExplanation col-12 xs:col-12 sm:col-10 md:col-8 lg:col-8 xl:col-8"
    >
      {{ $t("help.footerText") }}
    </div>
    <div
      class="helpFooterLabels col-12 xs:col-12 sm:col-10 md:col-8 lg:col-8 xl:col-8"
    >
      {{ $t("help.footerPortals") }}
    </div>
    <div
      class="helpFooterLabels col-12 xs:col-12 sm:col-10 md:col-8 lg:col-8 xl:col-8"
    >
      <Button class="p-button-link helpFooterLink" @click="openLink">
        <span class="helpFooterLabels">
          {{ $t("help.footerPortalRedirect") }}
        </span>
        <img class="helpOpenArrowFooter" :src="openArrow" />
      </Button>
    </div>
  </div>
  <div style="width: 100%; overflow: hidden">
    <img
      :src="helpFooterPicture"
      style="float: right; width: 100%; height: 100%"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import breakpoints from "@/mixins/breakpoints";
import Button from "primevue/button";

import openArrow from "@/assets/svgs/openArrowWhite.svg";
import helpFooterPicture from "@/assets/img/helpFooterPicture.png";

export default defineComponent({
  name: "numberedStep",
  props: {},
  components: { Button },
  mixins: [breakpoints],
  data() {
    return { openArrow, helpFooterPicture };
  },

  computed: {
    pictureStyles() {
      let styles = {
        postion: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
      };

      return styles;
    },
  },
  methods: {
    openLink(): void {
      window.location.href = this.buttonTarget;
    },
  },
});
</script>
