<template>
  <div ref="wrapper" ondragstart="return false;" ondrop="return false;">
    <svg>
      <defs>
        <pattern
          id="ptn-grid"
          :width="quantize_width * quantize"
          height="112"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          :x="32 + grid_offset"
        >
          <g
            v-for="b in util.range(quantize)"
            :key="b"
            :transform="getTransform(b * quantize_width, 0)"
          >
            <rect class="a" y="0" :width="quantize_width" height="112" />
            <rect class="b" y="10" :width="quantize_width" height="9" />
            <rect class="b" y="28" :width="quantize_width" height="9" />
            <rect class="b" y="46" :width="quantize_width" height="9" />
            <rect class="b" y="74" :width="quantize_width" height="10" />
            <rect class="b" y="94" :width="quantize_width" height="9" />
            <line
              :class="getLineClass(b, quantize)"
              x1="0"
              y1="0"
              x2="0"
              y2="112"
            />
            <line class="d" x1="0" y1="0" :x2="quantize_width" y2="0" />
            <line class="c" x1="0" y1="64" :x2="quantize_width" y2="64" />
          </g>
        </pattern>
      </defs>
      <g :transform="getTransform(0, stage_pos.y * -1, scale)" ref="stage">
        <rect
          x="32"
          :width="stage_width"
          :height="octaves * 112"
          fill="url(#ptn-grid)"
          @mousedown="onDrag('start', $event)"
          @mouseup="onDrag('end', $event)"
          @mousemove="onDrag('move', $event)"
          @wheel.prevent="onDrag('wheel', $event)"
        ></rect>
        <g id="note" :transform="getTransform(stage_pos.x * -1, 0)" ref="note">
          <g
            v-for="n in note"
            :key="n.id"
            :transform="
              getTransform(getXfromTime(n.time) + 32, getYfromNote(n.interval))
            "
            @click="onClickNote($event, n)"
          >
            <rect
              class="note"
              :width="getXfromTime(n.duration)"
              :height="getHeightfromNote(n.interval)"
              :fill="getNoteColor(n, n.selected)"
              :stroke="getNoteColor(n, true)"
            />
            <text v-if="scale >= 2.0" transform="translate(2 6.5)">
              {{ getNoteName(n.interval) }}
            </text>
          </g>
        </g>
        <rect
          v-if="cursorX"
          class="cursor trans"
          :transform="getTransform(stage_pos.x * -1, 0)"
          :x="cursorX + 32"
          :width="Math.max(2, 4 / scale)"
          :height="octaves * 112"
          ref="cursor"
        />

        <g id="piano" ref="piano">
          <g
            v-for="o in util.range(octaves)"
            :key="`key-${o}`"
            :transform="getTransform(0, (9 - o) * 112)"
            :data-octave="o"
            @mousedown="onKeyboard('down', $event)"
            @mousemove="onKeyboard('move', $event)"
            @mouseup="onKeyboard('up', $event)"
            @mouseout="onKeyboard('out', $event)"
          >
            <rect class="a" y="96" width="32" height="16" data-note="c" />
            <rect class="a" y="80" width="32" height="16" data-note="d" />
            <rect class="a" y="64" width="32" height="16" data-note="e" />
            <rect class="a" y="48" width="32" height="16" data-note="f" />
            <rect class="a" y="32" width="32" height="16" data-note="g" />
            <rect class="a" y="16" width="32" height="16" data-note="a" />
            <rect class="a" y="0" width="32" height="16" data-note="b" />
            <rect class="b" y="94" width="20" height="8" data-note="c#" />
            <rect class="b" y="74" width="20" height="8" data-note="d#" />
            <rect class="b" y="46" width="20" height="8" data-note="f#" />
            <rect class="b" y="28" width="20" height="8" data-note="g#" />
            <rect class="b" y="10" width="20" height="8" data-note="a#" />
            <text class="c" transform="translate(22 108)">C{{ o }}</text>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss">
svg {
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
  #ptn-grid {
    .a {
      fill: #25282b;
    }
    .b {
      fill: #212326;
    }
    line {
      fill: none;
      stroke-miterlimit: 10;
      stroke-width: 1px;
    }
    .c,
    .tick {
      stroke: #36393b;
    }
    .d,
    .beat {
      stroke: #595b5d;
    }
    .measure {
      stroke-width: 2px;
      stroke: lighten(#595b5d, 15%);
    }
  }
  text {
    user-select: none;
  }
  #piano {
    $whole-tone-color: #b7c1cc;
    $half-tone-color: #5f6f7f;
    .a {
      fill: $whole-tone-color;
      stroke: $half-tone-color;
      stroke-miterlimit: 10;
      stroke-width: 0.25px;
      &:hover,
      &.active {
        fill: lighten($whole-tone-color, 15%);
      }
    }
    .b {
      fill: $half-tone-color;
      &:hover,
      &.active {
        fill: lighten($half-tone-color, 15%);
      }
    }
    .c {
      font-size: 6px;
      fill: #212326;
      font-family: ArialMT, Arial;
    }
    text {
      pointer-events: none;
    }
  }
  #note {
    .note {
      /*       fill: #855181; */
      /*       stroke: #422f40; */
      stroke-miterlimit: 10;
      stroke-width: 0.25px;
    }
    text {
      font-size: 5px;
      fill: #f7f7f8;
      font-family: ArialMT, Arial;
      pointer-events: none;
    }
  }
  .cursor {
    stroke-miterlimit: 10;
    stroke-width: 0.5px;
    fill: #000;
    stroke: #fff; /* #b14f70;*/
  }
  .trans {
    transition: all 0.5s ease-in-out;
  }
}
</style>
<script src="./PianoRoll.js"></script>
