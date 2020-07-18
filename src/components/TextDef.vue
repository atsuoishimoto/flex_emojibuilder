<template>
  <div class="row">
    <div
      class="col-sm-12"
      style="padding-left: 2em; background-color:gainsboro"
    >
      <div class="row">
        <div class="form-group">
          <FontDef :font="format.font" />
        </div>
      </div>

      <div class="row">
        <div class="form-group" style="padding-right:1em;">
          <label>背景色</label>
          <ColorPicker
            :color="format.backgroundcolor"
            @color_updated="color_updated"
          />
        </div>
        <div class="form-group" style="padding-right:1em;">
          <label>方向</label>
          <select class="form-control" v-model="format.direction">
            <option value="row">行</option>
            <option value="column">列</option>
          </select>
        </div>
        <div class="form-group" style="padding-right:1em;">
          <label>justify-content</label>
          <select class="form-control" v-model="format.justifycontent">
            <option value="flex-start">Flex start</option>
            <option value="flex-end">Flex end</option>
            <option value="center">Center</option>
            <option value="space-between">Space between</option>
            <option value="space-around">Space around</option>
          </select>
        </div>

        <div class="form-group" style="padding-right:1em;">
          <label>align-items</label>
          <select
            id="align_content"
            class="form-control"
            v-model="format.alignitems"
          >
            <option value="flex-start">Flex start</option>
            <option value="flex-end">Flex end</option>
            <option value="center">Center</option>
            <option value="baseline">Baseline</option>
            <option value="stretch">Stretch</option>
          </select>
        </div>

        <div class="form-group" style="padding-right:1em;">
          <label>align-content</label>
          <select
            id="align_items"
            class="form-control"
            v-model="format.aligncontent"
          >
            <option value="flex-start">Flex start</option>
            <option value="flex-end">Flex end</option>
            <option value="center">Center</option>
            <option value="baseline">Baseline</option>
            <option value="stretch">Stretch</option>
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

  props: ["format"],
  methods: {
    color_updated: function(event) {
      Vue.set(this.format, "backgroundcolor", event);
    },
  },
};
</script>

<style scoped></style>
