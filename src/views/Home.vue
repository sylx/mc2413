<template>
  <div class="home">
    <b-row>
      <b-col sm="2"> scale:{{ Number(pianoroll_scale).toFixed(2) }} </b-col>
      <b-col sm="10">
        <b-form-input
          type="range"
          v-model="pianoroll_scale"
          min="0.5"
          max="4"
          step="0.25"
        />
      </b-col>
    </b-row>
    <piano-roll class="piano-roll mb-4" :scale="pianoroll_scale" />
    <mml-editor />
  </div>
</template>

<style lang="scss">
.piano-roll {
  height: 1000px;
}
</style>
<script>
// @ is an alias to /src
import MmlEditor from "@/components/MmlEditor.vue";
import PianoRoll from "@/components/PianoRoll.vue";

// require styles
export default {
  name: "home",
  components: {
    MmlEditor,
    PianoRoll
  },
  data() {
    return {
      pianoroll_scale: 2.0
    };
  }
};
</script>
