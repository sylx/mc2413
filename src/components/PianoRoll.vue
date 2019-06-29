<template>
  <div class="wrapper">
    <svg>
      <defs>
        <pattern
          id="ptn-grid"
          :width="16 * (quantize / 4)"
          height="112"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x="32"
        >
          <g
            v-for="b in util.range(quantize / 4)"
            :key="b"
            :transform="getTranslate(b * 16, 0)"
          >
            <rect class="a" width="16" height="112" />
            <rect class="b" y="10" width="16" height="9" />
            <rect class="b" y="28" width="16" height="9" />
            <rect class="b" y="46" width="16" height="9" />
            <rect class="b" y="74" width="16" height="10" />
            <rect class="b" y="94" width="16" height="9" />
            <line :class="b == 0 ? 'd' : 'c'" x1="0" y1="0" x2="0" y2="112" />
            <line class="d" x1="0" y1="0" x2="16" y2="0" />
            <line class="c" x1="0" y1="64" x2="16" y2="64" />
          </g>
        </pattern>
      </defs>
      <g :transform="`scale(${scale})`">
        <rect
          x="32"
          width="100%"
          :height="octaves * 112"
          fill="url(#ptn-grid)"
        ></rect>
        <g id="piano">
          <g
            v-for="o in util.range(octaves)"
            :key="o"
            :transform="getTranslate(0, (9 - o) * 112)"
          >
            <rect class="a" y="96" width="32" height="16" />
            <rect class="a" y="80" width="32" height="16" />
            <rect class="a" y="64" width="32" height="16" />
            <rect class="a" y="48" width="32" height="16" />
            <rect class="a" y="32" width="32" height="16" />
            <rect class="a" y="16" width="32" height="16" />
            <rect class="a" y="0" width="32" height="16" />
            <rect class="b" y="94" width="20" height="8" />
            <rect class="b" y="74" width="20" height="8" />
            <rect class="b" y="46" width="20" height="8" />
            <rect class="b" y="28" width="20" height="8" />
            <rect class="b" y="10" width="20" height="8" />
            <text class="c" transform="translate(22 108)">C{{ o }}</text>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss">
svg {
  width: 100%;
  height: 100%;
  #ptn-grid {
    .a {
      fill: #25282b;
    }
    .b {
      fill: #212326;
    }
    .c,
    .d {
      fill: none;
      stroke-miterlimit: 10;
      stroke-width: 1px;
    }
    .c {
      stroke: #36393b;
    }
    .d {
      stroke: #595b5d;
    }
  }
  #ptn-piano,
  #piano {
    .a {
      fill: #b7c1cc;
      stroke: #5f6f7f;
      stroke-miterlimit: 10;
      stroke-width: 0.25px;
    }
    .b {
      fill: #5f6f7f;
    }
    .c {
      font-size: 6px;
      fill: #212326;
      font-family: ArialMT, Arial;
    }
  }
}
</style>
<script>
import _ from "lodash";
export default {
  name: "piano-roll",
  props: {
    scale: {
      type: Number,
      default: 2.0
    },
    quantize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      util: _,
      octaves: 10
    };
  },
  computed: {},
  methods: {
    getTranslate(x, y) {
      return `translate(${x},${y})`;
    }
  }
};
</script>
