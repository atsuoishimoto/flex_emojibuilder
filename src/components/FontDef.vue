<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>フォント名</label>
          <input type="text" class="form-control" v-model="font.family" />
        </div>
      </div>
      <div class="col-sm-2">
        <div class="form-group">
          <label>サイズ</label>
          <input type="number" class="form-control" v-model="font.size" />
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label>色</label>
          <ColorPicker :color="font.color" @color_updated="color_updated" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" :id="$id('bold')" v-model="font.bold" />
            <label class="form-check-label" :for="$id('bold')">
              <b>Bold</b>
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="checkbox"
              class="form-check-input"
              :id="$id('italic')"
              v-model="font.italic"
            />
            <label class="form-check-label" :for="$id('italic')">
              <b>Italic</b>
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="checkbox"
              class="form-check-input"
              :id="$id('underline')"
              v-model="font.underline"
            />
            <label class="form-check-label" :for="$id('underline')">
              <u>Underline</u>
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input
              type="checkbox"
              class="form-check-input"
              :id="$id('strikethrough')"
              v-model="font.strikethrough"
            />
            <label class="form-check-label" :for="$id('strikethrough')">
              <s>Strikethrough</s>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker.vue";
import Vue from "vue";

export default {
  name: "FontDef",
  props: ["font"],
  components: {
    ColorPicker
  },
  methods: {
    color_updated: function(event) {
      Vue.set(this.font, "color", event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
