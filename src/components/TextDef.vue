<template>
  <div class="row">
    <div
      class="col-sm-12"
      style="padding-left: 2em; background-color:gainsboro"
    >
      <div class="row">
        <div class="form-group">
          <FontDef :font="text.font" />
        </div>
      </div>

      <div class="row">
        <div class="form-group" style="padding-right:1em;">
          <label>背景色</label>
          <ColorPicker
            :color="text.backgroundcolor"
            @color_updated="color_updated"
          />
        </div>
        <div class="form-group" style="padding-right:1em;">
          <label>方向</label>
          <select class="form-control" v-model="text.direction">
            <option value="row">行</option>
            <option value="column">列</option>
          </select>
        </div>
        <div class="form-group" style="padding-right:1em;">
          <label>justify-content</label>
          <select class="form-control" v-model="text.justifycontent">
            <option value="normal">Normal</option>
            <option value="center">Center</option>
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="flex-start">Flex start</option>
            <option value="flex-end">Flex end</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="space-between">Space between</option>
            <option value="space-around">Space around</option>
            <option value="space-evenly">space evenly</option>
            <option value="stretch">stretch</option>
            <option value="baseline">Baseline</option>
            <option value="first baseline">First baseline</option>
            <option value="last baseline">Last baseline</option>
          </select>
        </div>

        <div class="form-group" style="padding-right:1em;">
          <label>align-items</label>
          <select
            id="align_content"
            class="form-control"
            v-model="text.alignitems"
          >
            <option value="normal">Normal</option>
            <option value="stretch">Stretch</option>
            <option value="center">Center</option>
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="flex-start">Flex start</option>
            <option value="flex-end">Flex end</option>
            <option value="self-start">Self start</option>
            <option value="self-end">Self end</option>
            <option value="baseline">Baseline</option>
            <option value="first baseline">First baseline</option>
            <option value="last baseline">Last baseline</option>
          </select>
        </div>

        <div class="form-group" style="padding-right:1em;">
          <label>align-content</label>
          <select
            id="align_items"
            class="form-control"
            v-model="text.aligncontent"
          >
            <option value="normal">Normal</option>
            <option value="stretch">Stretch</option>
            <option value="center">Center</option>
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="flex-start">Flex start</option>
            <option value="flex-end">Flex end</option>
            <option value="self-start">Self start</option>
            <option value="self-end">Self end</option>
            <option value="baseline">Baseline</option>
            <option value="first baseline">First baseline</option>
            <option value="last baseline">Last baseline</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import FontDef from "./FontDef.vue";
import ColorPicker from "./ColorPicker.vue";

export default {
  name: "TextDef",
  components: {
    FontDef,
    ColorPicker,
  },

  props: ["text"],
  methods: {
    color_updated: function(event) {
      Vue.set(this.text, "backgroundcolor", event);
    },
  },
};
</script>

<style scoped></style>
