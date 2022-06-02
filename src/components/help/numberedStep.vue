<template>
  <div
    :style="{
      'border-top': overline ? '2px solid #0000c4' : '',
      height: buttonLabel ? '713px' : '612px',
    }"
    class="flex align-items-center"
  >
    <div class="grid grid-nogutter flex" style="width: 100%">
      <div
        class="col-12 xl:col-6 lg:col-6 mb:col-6 sm:col-6"
        :class="{ 'flex-order-1': invert }"
        :style="{
          'padding-right': !invert && breakpoint !== 'xs' ? '72px' : '',
        }"
      >
        <h2 class="helpStepNumber">{{ `0${number}` }}</h2>
        <h3 class="helpStepTitle">{{ $t(title) }}</h3>
        <p class="helpStepExplanation">{{ $t(explanation) }}</p>
      </div>
      <div
        class="col-12 xl:col-6 lg:col-6 mb:col-6 sm:col-6"
        :class="{ 'flex-order-0': invert }"
        :style="{
          'padding-right': invert && breakpoint !== 'xs' ? '72px' : '',
          'padding-top': breakpoint === 'xs' ? '32px' : '',
        }"
      >
        <img
          style="max-height: 490px"
          :style="{
            height: visiualizationHeight,
            width: visiualizationHeight ? '' : '100%',
          }"
          :src="picture"
          :alt="$t(pictureAlt)"
        />
        <Button
          v-if="buttonLabel"
          class="p-button-link helpStepButton"
          @click="openLink"
        >
          <span class="helpStepButtonLabel">{{ $t(buttonLabel) }}</span>
          <img class="helpOpenArrow" :src="openArrow" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import breakpoints from "@/mixins/breakpoints";
import Button from "primevue/button";

import openArrow from "@/assets/svgs/openArrow.svg";

export default defineComponent({
  name: "numberedStep",
  props: {
    number: { type: Number, default: 1 },
    picture: {},
    pictureAlt: { type: String, default: "" },
    title: { type: String, default: "" },
    explanation: { type: String, default: "" },
    buttonLabel: { type: String, default: "" },
    buttonTarget: { type: String, default: "" },
    overline: { type: Boolean, default: true },
    invert: { type: Boolean, default: false },
  },
  components: { Button },
  mixins: [breakpoints],
  data() {
    return { openArrow };
  },

  computed: {
    visiualizationHeight(): string {
      if (this.breakpoint === "sm") return "250px";
      else if (this.breakpoint === "xs") return "200px";
      else if (this.breakpoint === "md") return "300px";
      else return "";
    },
    hasCrestArea(): boolean {
      return this.breakpoint === "xl";
    },
  },
  methods: {
    openLink(): void {
      window.location.href = this.buttonTarget;
    },
  },
});
</script>
