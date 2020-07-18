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
        style="margin:  0.5em 2em; padding:5px; width:64px; height:64px; border: solid 1px #c0c0c0;"
        @load="imgloaded"
      />
      <img
        ref="img_32"
        style="margin:  0.5em 2em;  padding:5px; width:28px; height:28px; border: solid 1px #c0c0c0;"
        @load="imgloaded"
      />
    </div>
    <div>
      <img
        ref="img_64_gray"
        style="margin: 0.5em 2em; padding:5px; width:64px; height:64px; border: solid 1px #c0c0c0;background-color:#d5dcf4;"
        @load="imgloaded"
      />
      <img
        ref="img_32_gray"
        style="margin: 0.5em 2em;  padding:5px; width:28px; height:28px; border: solid 1px #c0c0c0;background-color:#d5dcf4;"
        @load="imgloaded"
      />
    </div>
    <div>
      <img
        ref="img_64_black"
        style="margin: 0.5em 2em; padding:5px; width:64px; height:64px; border: solid 1px #c0c0c0;background-color:#485d6d;"
        @load="imgloaded"
      />
      <img
        ref="img_32_black"
        style="margin: 0.5em 2em;  padding:5px; width:28px; height:28px; border: solid 1px #c0c0c0;background-color:#485d6d;"
        @load="imgloaded"
      />
    </div>
  </div>
</template>

<script>
function GFontToDataURI(url) {
  return fetch(url) // first fecth the embed stylesheet page
    .then((resp) => resp.text()) // we only need the text of it
    .then((text) => {
      // now we need to parse the CSSruleSets contained
      // but chrome doesn't support styleSheets in DOMParsed docs...
      let s = document.createElement("style");
      s.innerHTML = text;
      document.head.appendChild(s);
      let styleSheet = s.sheet;

      // this will help us to keep track of the rules and the original urls
      let FontRule = (rule) => {
        let src =
          rule.style.getPropertyValue("src") ||
          rule.style.cssText.match(/url\(.*?\)/g)[0];
        if (!src) return null;
        let url = src.split("url(")[1].split(")")[0];
        return {
          rule: rule,
          src: src,
          url: url.replace(/"/g, ""),
        };
      };
      let fontRules = [],
        fontProms = [];

      // iterate through all the cssRules of the embedded doc
      // Edge doesn't make CSSRuleList enumerable...
      for (let i = 0; i < styleSheet.cssRules.length; i++) {
        let r = styleSheet.cssRules[i];
        let fR = FontRule(r);
        if (!fR) {
          continue;
        }
        fontRules.push(fR);
        fontProms.push(
          fetch(fR.url) // fetch the actual font-file (.woff)
            .then((resp) => resp.blob())
            .then((blob) => {
              return new Promise((resolve) => {
                // we have to return it as a dataURI
                //   because for whatever reason,
                //   browser are afraid of blobURI in <img> too...
                let f = new FileReader();
                f.onload = (e) => resolve(f.result);
                f.readAsDataURL(blob);
              });
            })
            .then((dataURL) => {
              // now that we have our dataURI version,
              //  we can replace the original URI with it
              //  and we return the full rule's cssText
              return fR.rule.cssText.replace(fR.url, dataURL);
            })
        );
      }
      document.head.removeChild(s); // clean up
      return Promise.all(fontProms); // wait for all this has been done
    });
}

export default {
  name: "TextDef",

  props: ["divstyle", "html"],
  data: function() {
    return {
      imageurl: null,
      cssRules: "",
    };
  },
  mounted: function() {
    console.log("mounted");
    const url =
      "https://fonts.googleapis.com/css?family=M PLUS Rounded 1c&text='なるほど'";
    const url2 = "https://fonts.googleapis.com/css?family=Pangolin";
    GFontToDataURI(url).then((cssRules) => {
      //      this.cssRules = "<style>" + cssRules.join("\n") + "</style>";
      //      console.log(cssRules.length, 4444444444444);
      const svgNS = "http://www.w3.org/2000/svg";
      const defs = document.createElementNS(svgNS, "defs");
      const style = document.createElementNS(svgNS, "style");
      style.innerHTML = cssRules.join("\n");
      defs.appendChild(style);
      this.$refs.svg.appendChild(defs);
      console.log(11111, this.$refs.svg);
    });
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
