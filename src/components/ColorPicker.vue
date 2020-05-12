<template>
  <div>
    <div class="input-group color-picker" @click.stop="() => {}" @focusin.stop="() => {}">
      <input
        :value="color"
        type="text"
        class="form-control"
        @focus="show_picker = true"
        @click="$event.currentTarget.focus()"
        @input="emitEvent($event.target.value)"
      />
      <div class="input-group-append" @click.stop="show_picker=true">
        <span class="input-group-text">
          <span class="sample-color" :style="'background-color: ' + color"></span>
        </span>
        <color-picker :value="current_color" v-if="show_picker" @input="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import { Chrome } from "vue-color";
export default {
  name: "ColorPicker",
  components: {
    "color-picker": Chrome
  },
  props: ["color", "default_color"],
  data() {
    return {
      //      newcolor: "#000000",
      show_picker: false
    };
  },
  mounted() {
    document.addEventListener("click", this.documentClick);
    document.addEventListener("focusin", this.documentClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.documentClick);
    document.removeEventListener("focusin", this.documentClick);
  },
  computed: {
    current_color: function() {
      if (!this.color) {
        if (!this.default_color) {
          return "#000000";
        }
        return this.default_color();
      }
      return this.color;
    }
  },
  methods: {
    documentClick: function() {
      this.show_picker = false;
    },
    updated: function(event) {
      this.emitEvent(event.hex);
    },
    emitEvent: function(color) {
      this.$emit("color_updated", color);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vc-chrome {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
}

.sample-color {
  display: inline-block;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
