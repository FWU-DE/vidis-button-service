<template>
  <div id="teleportsTarget" />
  <div class="entrance-overLine" :class="{ 'mb-3': size !== 'L' }" />
  <div
    class="grid-nogutter flex"
    v-if="size === 'L'"
    :class="{ 'mb-3': size === 'L' }"
  >
    <h2 class="entrance-overlinetexts">{{ $t("entrance.banner") }}</h2>
    <div class="col" />
    <Button
      class="p-button-link linkButton flex align-content-center"
      @click="toggleHelp(true)"
      style="margin-top: 8px; height: 100%; padding-top: 0"
    >
      <span class="linkButtonLabel">{{ $t("general.help") }}</span>
      <img class="openArrow" :src="openArrow" />
    </Button>
  </div>
  <div class="grid-nogutter flex">
    <img
      style="height: 55px"
      :src="logo"
      :alt="$t('general.branding_accessibility')"
    />
    <div class="col" />
    <div class="entrance-button-position">
      <entryButton @clicked="toggleDialog(true)" />
    </div>
  </div>
  <idpDialog
    :visible="showDialog"
    class="p-dialog-maximized"
    @closed="toggleDialog(false)"
    style="background: d2eeff"
  />
  <helpDialog :visible="showHelp" @closed="toggleHelp(false)" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import idpDialog from "@/components/idpSelection/idpDialog.ce.vue";
import entryButton from "@/components/entrance/entryButton.ce.vue";
import Button from "primevue/button";
import helpDialog from "@/components/help/helpDialog.ce.vue";

import openArrow from "@/assets/svgs/openArrow.svg";
import logo from "@/assets/svgs/Logo.svg";
import lockIcon from "@/assets/svgs/lockIcon.svg";
import lockIconInverted from "@/assets/svgs/lockIcon_inverted.svg";
import logoNoText from "@/assets/svgs/LogoNoText.svg";
import logoNoText_inverted from "@/assets/svgs/LogoNoText_inverted.svg";

import handleOverflow from "@/mixins/handleOverflow";

export default defineComponent({
  name: "entranceButton",
  components: { idpDialog, entryButton, Button, helpDialog },
  mixins: [handleOverflow],
  data() {
    return {
      showDialog: false,
      logo,
      lockIcon,
      lockIconInverted,
      logoNoText,
      logoNoText_inverted,
      buttonHovered: false,
      showHelp: false,
      openArrow,
    };
  },
  computed: {
    size() {
      return this.$store.getters.size;
    },
    startwithidpselection() {
      return this.$store.getters.startwithidpselection;
    },
  },
  watch: {
    startwithidpselection: {
      handler(startwithidpselectionValue) {
        console.log("???", startwithidpselectionValue, this.showDialog);
        this.toggleDialog(startwithidpselectionValue);
        console.log("????", this.showDialog);
      },
      immediate: true,
    },
  },
  methods: {
    toggleDialog(mode?: boolean) {
      this.showDialog = mode ?? false;
      this.handleOverflowOfHostpage(this.showDialog);
    },
    toggleHelp(show: boolean): void {
      this.showHelp = show;
      this.handleOverflowOfHostpage(this.showHelp);
    },
  },
});
</script>
