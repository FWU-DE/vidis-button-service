<template>
  <div class="entrance-overLine" :class="{ 'mb-3': size !== 'L' }" />
  <div
    class="grid-nogutter flex"
    v-if="size === 'L'"
    :class="{ 'mb-3': size === 'L' }"
  >
    <h2 class="entrance-overlinetexts">{{ $t("entrance.banner") }}</h2>
    <div class="col" />
    <h2 class="entrance-overlinetexts">{{ $t("entrance.help") }}</h2>
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
    @closed="showDialog = false"
    :style="{ background: d2eeff }"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import idpDialog from "@/components/idpSelection/idpDialog.ce.vue";
import entryButton from "@/components/entrance/entryButton.ce.vue";

import logo from "@/assets/svgs/Logo.svg";
import lockIcon from "@/assets/svgs/lockIcon.svg";
import lockIconInverted from "@/assets/svgs/lockIcon_inverted.svg";
import logoNoText from "@/assets/svgs/LogoNoText.svg";
import logoNoText_inverted from "@/assets/svgs/LogoNoText_inverted.svg";

export default defineComponent({
  name: "entranceButton",
  inject: {
    size: {
      default: "L",
    },
    loginurl: "",
  },
  components: { idpDialog, entryButton },
  data() {
    return {
      showDialog: false,
      logo,
      lockIcon,
      lockIconInverted,
      logoNoText,
      logoNoText_inverted,
      buttonHovered: false,
    };
  },
  methods: {
    toggleDialog(mode?: boolean) {
      this.showDialog = mode ?? false;
    },
  },
});
</script>
