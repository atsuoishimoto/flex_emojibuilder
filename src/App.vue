<template>
  <div id="app">
    <EmojiBuilder />
  </div>
</template>

<script>
import EmojiBuilder from "./components/EmojiBuilder.vue";

export default {
  name: "App",
  components: {
    EmojiBuilder,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
