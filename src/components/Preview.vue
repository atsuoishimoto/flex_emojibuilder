<template>
  <div>
    <div
      :style="
        `
            margin-top: 2em;
            border: solid 1px #c0c0c0;
            width: 128px;
            height: 128px;
            transform-origin: top center;
          `
      "
    >
      <svg width="128px" height="128px" ref="svg">
        <foreignObject width="128px" height="128px">
          <div
            :style="
              `
                  width: 128px;
                  height: 128px;
                  display: flex;
                  line-height: 1em;
                  flex-wrap: wrap;
                ` + divstyle
            "
            v-html="html"
          />
        </foreignObject>
      </svg>
    </div>
    <div style="margin-top:2em; text-align:left;">
      <a
        download="emoji.png"
        :href="imageurl"
        style="font-weight:bold; font-size:1.1em"
        v-if="imageurl"
      >
        絵文字ダウンロード
        <br />
      </a>
      <a download="emoji.png" :href="imageurl">
        <img
          ref="img_128"
          style="padding:5px; width:132px; height:132px;border: solid 1px #c0c0c0;"
          @load="imgloaded"
        />
      </a>
    </div>

    <div style="margin-top: 2em;">
      <img
        ref="img_64"
        style="margin:  0.5em 1.5em; padding:5px; width:64px; height:64px; border: solid 1px #c0c0c0;"
        @load="imgloaded"
      />
      <img
        ref="img_32"
        style="margin:  0.5em 1.5em;  padding:5px; width:32px; height:32px; border: solid 1px #c0c0c0;"
        @load="imgloaded"
      />
    </div>
    <div>
      <img
        ref="img_64_gray"
        style="margin: 0.5em 1.5em; padding:5px; width:64px; height:64px; border: solid 1px #c0c0c0;background-color:#d5dcf4;"
        @load="imgloaded"
      />
      <img
        ref="img_32_gray"
        style="margin: 0.5em 1.5em;  padding:5px; width:32px; height:32px; border: solid 1px #c0c0c0;background-color:#d5dcf4;"
        @load="imgloaded"
      />
    </div>
    <div>
      <img
        ref="img_64_black"
        style="margin: 0.5em 1.5em; padding:5px; width:64px; height:64px; border: solid 1px #c0c0c0;background-color:#485d6d;"
        @load="imgloaded"
      />
      <img
        ref="img_32_black"
        style="margin: 0.5em 1.5em;  padding:5px; width:32px; height:32px; border: solid 1px #c0c0c0;background-color:#485d6d;"
        @load="imgloaded"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextDef",

  props: ["divstyle", "html"],
  data: function() {
    return {
      imageurl: null,
    };
  },
  updated: function() {
    const svg = this.$refs.svg;
    const bytes = new XMLSerializer().serializeToString(svg);
    const enc = window.encodeURIComponent(bytes);
    const uri = `data:image/svg+xml;charset=utf-8,${enc}`;

    this.$refs.img_128.src = uri;
    this.$refs.img_64.src = uri;
    this.$refs.img_32.src = uri;
    this.$refs.img_64_gray.src = uri;
    this.$refs.img_32_gray.src = uri;
    this.$refs.img_64_black.src = uri;
    this.$refs.img_32_black.src = uri;
  },

  methods: {
    imgloaded: function() {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      const img = this.$refs.img_128;
      ctx.drawImage(img, 0, 0);
      this.imageurl = canvas.toDataURL("image/png", 1);
    },
  },
};
</script>

<style scoped></style>
