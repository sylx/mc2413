<template>
  <div class="home">
    <b-row class="mb-2 pianoroll-control">
      <b-col md="2" lg="1">
        scale:{{ Number(pianoroll_scale).toFixed(2) }}
      </b-col>
      <b-col sm="4">
        <b-form-input
          type="range"
          v-model.number="pianoroll_scale"
          min="0.5"
          max="4"
          step="0.25"
          variant="secondary"
        />
      </b-col>
      <b-col sm="4">
        <b-dropdown :text="`grid:${pianoroll_quantize}`">
          <b-dropdown-item
            v-for="o in pianoroll_quantize_options"
            :key="o"
            @click="pianoroll_quantize = o"
            >{{ o }}
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-row>
    <piano-roll
      class="piano-roll mb-4"
      :scale="pianoroll_scale"
      :quantize="pianoroll_quantize"
    />
    <b-row class="mb-4 tranport">
      <b-col sm="12">
        <b-button-group>
          <b-button variant="success" @click="playTransport">Play</b-button>
          <b-button @click="stopTransport">Stop</b-button>
        </b-button-group>
        <b-button disabled>
          <b-spinner small type="grow" v-if="transportPlaying"></b-spinner>
          {{ transportPosition.replace(/\.\d+?$/, "") }}
        </b-button>
      </b-col>
    </b-row>

    <mml-editor />
  </div>
</template>

<style lang="scss">
.home {
  text-align: left;
  .pianoroll-control {
    height: 48px;
    & > div:first-child {
      padding-top: 12px;
    }
    & > div:nth-child(2) {
      padding-top: 6px;
    }
  }
  .piano-roll {
    height: 300px;
  }
}
</style>
<script>
// @ is an alias to /src
import MmlEditor from "@/components/MmlEditor.vue";
import PianoRoll from "@/components/PianoRoll.vue";

import { mapState } from "vuex";

// require styles
export default {
  name: "home",
  components: {
    MmlEditor,
    PianoRoll
  },
  data() {
    return {
      pianoroll_scale: 2.0,
      pianoroll_quantize: 16,
      pianoroll_quantize_options: [32, 24, 16, 12, 9, 8, 4, 3, 2, 1],
      transportPosition: "-"
    };
  },
  computed: {
    ...mapState("synth", {
      transportPlaying: "transportPlaying"
    })
  },
  mounted() {
    this.$store.subscribeAction((action, state) => {
      if (action.type == "synth/tickSequence") {
        this.transportPosition = action.payload;
      }
    });
  },
  methods: {
    playTransport() {
      this.$store.dispatch("synth/playSequence");
    },
    stopTransport() {
      this.$store.dispatch("synth/stopSequence");
    }
  }
};
</script>
