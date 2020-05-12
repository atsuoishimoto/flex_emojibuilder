<template>
  <div class="row" :style="`background-color: ${(letter.id % 2) == 0?'white': '#f5f3f3'}`">
    <div class="col-sm-1">
      <span class="letter_text">{{letter.text}}</span>
    </div>
    <div class="col-sm-11">
      <div class="row">
        <div class="col-sm-12 form-group">
          <FontDef :font="letter.font" v-if="letter.font" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2 form-group">
          <label>align-self</label>
          <select class="form-control" v-model="letter.alignself">
            <option value="auto">Auto</option>
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
        <div class="col-sm-2 form-group">
          <label>scale(x)</label>
          <input type="number" class="form-control" v-model="letter.scalex" placeholder="e.g. 2.5" />
        </div>
        <div class="col-sm-2 form-group">
          <label>scale(y)</label>
          <input type="number" class="form-control" v-model="letter.scaley" placeholder="e.g. 2.5" />
        </div>
        <div class="col-sm-2 form-group">
          <label>rotate(角度)</label>
          <input type="number" class="form-control" v-model="letter.rotate" placeholder="0~360" />
        </div>
        <div class="col-sm-2 form-group">
          <label>skew(x)(角度)</label>
          <input type="number" class="form-control" v-model="letter.skewx" placeholder="0~360" />
        </div>
        <div class="col-sm-2 form-group">
          <label>skew(y)(角度)</label>
          <input type="number" class="form-control" v-model="letter.skewy" placeholder="0~360" />
        </div>
      </div>
    </div>
  </div>
</template>


align-self

<script>
import FontDef from "./FontDef.vue";

export default {
  name: "LetterDef",
  components: {
    FontDef
  },
  props: ["idx", "letter"]
};
</script>

<style scoped>
.letter_text {
  display: inline-block;
  margin-top: 10px;
  font-size: 20pt;
  font-weight: bold;
  padding: 5px;
  border: solid 5px black;
}
</style>
