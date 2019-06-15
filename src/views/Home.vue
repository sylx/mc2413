<template>
  <div class="home">
    <mml-editor />
  </div>
</template>

<script>
// @ is an alias to /src
import MmlEditor from "@/components/MmlEditor.vue";

// require styles
export default {
  name: "home",
  components: {
    MmlEditor
  }
};
</script>
