<template>
  <div style="width: 100%" class="grid-nogutter">
    <div class="col-12 flex justify-content-center grid-nogutter">
      <div
        class="col-12 sm:col-12 md:col-8 lg:col-6 xl:col-6 sm:flex md:flex lg:flex xl:flex justify-content-between grid-nogutter align-items-center"
      >
        <div class="col-12 sm:col-4 md:col-4 lg:col-5 xl:col-5">
          <Button class="p-button-link linkButton flex align-content-center">
            <span class="linkButtonLabel">{{ $t("general.help") }}</span>
            <img class="openArrow" :src="openArrow" />
          </Button>
        </div>
        <div>
          <a
            class="footer-links"
            href="https://www.vidis.schule/datenschutzerklaerung/"
            style="margin-left: 0"
            >{{ $t("general.dataprivacy") }}</a
          >
          <a class="footer-links">{{ $t("general.terms") }}</a>
          <a class="footer-links">{{ $t("general.languages") }}</a>
        </div>
      </div>
    </div>
    <div v-if="breakpoint !== 'xs'" class="col-12">
      <div class="footer-overLine" style="margin-bottom: 32px" />
    </div>
    <div class="col-12 flex justify-content-center grid-nogutter">
      <div class="md:col-2 lg:col-3 xl:col-3 flex">
        <img
          v-if="
            breakpoint !== 'xs' && breakpoint !== 'sm' && breakpoint !== 'md'
          "
          :src="digitalPakt"
          :alt="$t('general.digitalPaktAlt')"
        />
      </div>
      <div
        v-if="breakpoint !== 'xs'"
        class="col-12 sm:col-12 md:col-8 lg:col-6 xl:col-6 flex justify-content-around align-items-center"
      >
        <img
          v-for="(crest, index) of crests"
          :key="index"
          :src="crest.img"
          :alt="crest.alt"
          class="crest"
        />
      </div>
      <div class="md:col-2 lg:col-3 xl:col-3"></div>
    </div>
    <div
      v-if="breakpoint !== 'xs' && breakpoint !== 'lg' && breakpoint !== 'xl'"
      class="col-12 flex justify-content-center"
      style="margin-top: 10px"
    >
      <img :src="digitalPakt" :alt="$t('general.digitalPaktAlt')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import breakpoints from "@/mixins/breakpoints";
import Button from "primevue/button";

import digitalPakt from "@/assets/img/digitalPakt.png";
import openArrow from "@/assets/svgs/openArrow.svg";
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
  props: {},
  mixins: [breakpoints],
  components: { Button },
  data() {
    return {
      digitalPakt,
      openArrow,
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
    };
  },
  computed: {},
  methods: {},
});
</script>
