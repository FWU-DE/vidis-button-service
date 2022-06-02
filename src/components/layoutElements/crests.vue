<template>
  <div
    class="flex justify-content-around align-items-center"
    :class="classes"
    v-for="crestsInLine in crestsperLine"
    :key="crestsInLine"
  >
    <img
      v-for="(crest, index) of crestsInLine"
      :key="index"
      :src="crest.img"
      :alt="crest.alt"
      class="crest"
      :style="{
        'margin-left': index === 0 ? '0px' : '5px',
        'margin-right': index === crestsInLine.length ? '' : '5px',
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { chunk } from "lodash";

import BW from "@/assets/svgs/crests/Baden-Württemberg.svg";
import Bavaria from "@/assets/svgs/crests/Bayern.svg";
import Berlin from "@/assets/svgs/crests/Berlin.svg";
import Hamburg from "@/assets/svgs/crests/Hamburg.svg";
import Brandenburg from "@/assets/svgs/crests/Brandenburg.svg";
import Bremen from "@/assets/svgs/crests/Bremen.svg";
import Hessen from "@/assets/svgs/crests/Hessen.svg";
import LS from "@/assets/svgs/crests/Lower_Saxony.svg";
import Mecklenburg from "@/assets/svgs/crests/Mecklenburg.svg";
import NRW from "@/assets/svgs/crests/North_Rhine-Westfalia.svg";
import RP from "@/assets/svgs/crests/rheinland-palatinate.svg";
import Saarland from "@/assets/svgs/crests/Saarland.svg";
import SA from "@/assets/svgs/crests/Sachsen-Anhalt.svg";
import Saxony from "@/assets/svgs/crests/Saxony.svg";
import SH from "@/assets/svgs/crests/Schleswig-Holstein.svg";
import Thuringia from "@/assets/svgs/crests/Thuringia.svg";
export default defineComponent({
  name: "vbtn-footer",
  props: {
    lines: { type: Number, default: 1 },
    classes: { type: String },
  },
  components: {},
  data() {
    return {
      crests: [
        { img: BW, alt: this.$t("crests.BW") },
        { img: Bavaria, alt: this.$t("crests.Bavaria") },
        { img: Berlin, alt: this.$t("crests.Berlin") },
        { img: Hamburg, alt: this.$t("crests.Hamburg") },
        { img: Brandenburg, alt: this.$t("crests.Brandenburg") },
        { img: Bremen, alt: this.$t("crests.Bremen") },
        { img: Hessen, alt: this.$t("crests.Hessen") },
        { img: LS, alt: this.$t("crests.LS") },
        { img: Mecklenburg, alt: this.$t("crests.Mecklenburg") },
        { img: NRW, alt: this.$t("crests.NRW") },
        { img: RP, alt: this.$t("crests.RP") },
        { img: Saarland, alt: this.$t("crests.Saarland") },
        { img: SA, alt: this.$t("crests.SA") },
        { img: Saxony, alt: this.$t("crests.Saxony") },
        { img: SH, alt: this.$t("crests.SH") },
        { img: Thuringia, alt: this.$t("crests.Thuringia") },
      ],
      showHelp: false,
    };
  },
  computed: {
    crestsperLine(): Array<any> {
      return chunk(this.crests, this.crests?.length / this.lines);
    },
  },
  methods: {},
});
</script>
