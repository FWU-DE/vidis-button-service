<template>
  <div style="height: 87vh">
    <div
      style="margin-bottom: 32px"
      class="grid-nogutter helpContent"
      :style="{
        'margin-left': hasCrestArea ? '536px' : '',
        'margin-top': hasCrestArea ? '-350px' : '',
        'padding-left': hasCrestArea ? '24px' : '24px',
        'padding-right': '24px',
        width: hasCrestArea ? 'calc(100% - 536px)' : '100%',
      }"
    >
      <h1 class="headingsLabel">{{ $t("help.heading1") }}</h1>
      <h1 class="headingsLabel" style="margin-top: 12px">
        {{ $t("help.heading2") }}
      </h1>
      <div class="help-overLine" />
      <numberedStep v-bind="number1Step" />
      <numberedStep v-bind="number2Step" />
      <numberedStep v-bind="number3Step" />
      <numberedStep v-bind="number4Step" />
      <helpFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import breakpoints from "@/mixins/breakpoints";
import numberedStep from "@/components/help/numberedStep.vue";
import helpFooter from "@/components/help/helpFooter.vue";

import logo from "@/assets/svgs/Logo.svg";
import shield from "@/assets/svgs/vidis_schield.svg";
import close from "@/assets/svgs/close.svg";

import educationalOfferVisu from "@/assets/svgs/help/educationalOfferVisu.svg";
import portalLoginPageVisu from "@/assets/svgs/help/portalLoginPageVisu.svg";
import vidisLoginVisu from "@/assets/svgs/help/vidisLoginVisu.svg";
import vidisPortalSelectionVisu from "@/assets/svgs/help/vidisPortalSelectionVisu.svg";

export default defineComponent({
  name: "vbtnHeader",
  props: {},
  components: { numberedStep, helpFooter },
  mixins: [breakpoints],
  data() {
    return {
      logo,
      shield,
      close,
      educationalOfferVisu,
      portalLoginPageVisu,
      vidisLoginVisu,
      vidisPortalSelectionVisu,
    };
  },

  computed: {
    hasCrestArea(): boolean {
      return this.breakpoint === "xl";
    },

    invert() {
      return (
        this.breakpoint === "xl" ||
        this.breakpoint === "lg" ||
        this.breakpoint === "md"
      );
    },
    number1Step() {
      return {
        number: 1,
        overline: false,
        picture: this.vidisLoginVisu,
        pictureAlt: "help.steps.pictureAlt1",
        title: "help.steps.title1",
        explanation: "help.steps.explanation1",
      };
    },
    number2Step() {
      return {
        number: 2,
        picture: this.vidisPortalSelectionVisu,
        pictureAlt: "help.steps.pictureAlt2",
        title: "help.steps.title2",
        explanation: "help.steps.explanation2",
        buttonLabel: "help.steps.buttonLabel2",
        buttonTarget: "https://www.vidis.schule/teilnehmende-idps",
        invert: this.invert,
      };
    },
    number3Step() {
      return {
        number: 3,
        picture: this.portalLoginPageVisu,
        pictureAlt: "help.steps.pictureAlt3",
        title: "help.steps.title3",
        explanation: "help.steps.explanation3",
      };
    },
    number4Step() {
      return {
        number: 4,
        picture: this.educationalOfferVisu,
        pictureAlt: "help.steps.pictureAlt4",
        title: "help.steps.title4",
        explanation: "help.steps.explanation4",
        invert: this.invert,
      };
    },
  },
  methods: {
    closeDialog(): void {
      this.$emit("closeDialog");
    },
  },
});
</script>
