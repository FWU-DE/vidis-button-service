<template>
  <ScrollPanel>
    <span v-for="(idp, index) in availableIdps" :key="idp.id">
      <button
        v-if="index < idpLengthToBeDisplayed"
        :class="idpButtonClasses"
        @click="selectIdp(idp)"
      >
        <span class="idp-list-label">
          {{ idp.name }}
        </span>
      </button>
    </span>
    <button
      @click="changeIdpDisplayLength"
      class="idp-button-link idp-button-underline"
    >
      <span
        v-if="initialIdpLengthToBeDisplayed == idpLengthToBeDisplayed"
        class="idp-list-label"
      >
        {{ $t("idp.showAll") }}
      </span>
      <span v-else class="idp-list-label">
        {{ $t("idp.showLess") }}
      </span>
    </button>
  </ScrollPanel>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import IdP from "@/store/ORM-Stores/models/idps";
import cookie from "@/mixins/cookie";
import ScrollPanel from "primevue/scrollpanel";

export default defineComponent({
  name: "ListAllIdp",
  props: {
    availableIdps: { type: Array as PropType<Array<IdP>>, required: true },
  },
  mixins: [cookie],
  components: { ScrollPanel },
  data() {
    return {
      initialIdpLengthToBeDisplayed: 7,
      idpLengthToBeDisplayed: 7,
    };
  },
  methods: {
    changeIdpDisplayLength(event: any): void {
      if (this.idpLengthToBeDisplayed == this.initialIdpLengthToBeDisplayed) {
        this.idpLengthToBeDisplayed = this.availableIdps.length;
      } else {
        this.idpLengthToBeDisplayed = this.initialIdpLengthToBeDisplayed;
      }
      event.stopPropagation();
    },
    selectIdp(idp: IdP): void {
      this.$emit("select-idp", idp);
    },
  },
  computed: {
    idpButtonClasses() {
      return {
        "idp-button-link": true,
        "idp-button-separation":
          this.idpLengthToBeDisplayed != this.initialIdpLengthToBeDisplayed,
      };
    },
  },
});
</script>
