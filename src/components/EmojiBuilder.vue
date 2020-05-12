<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12" style="margin: 4em 0;">
          <h2 class="display-3">
            <div style="font-family: Arial Black;text-align:center;">Flex</div>
            <div class="display-4" style="text-align:center;">
              絵文字ビルダー
            </div>
          </h2>

          <p
            style="margin-top: 2em;font-family: Arial Black;text-align:center;"
          >
            Slack/Discordの絵文字作成にどうぞ。
          </p>
          <p
            style="margin-top: 2em;font-family: Arial Black;text-align:center;"
          >
            Safariだとダメっぽいです。Chrome/Firefoxでご利用ください。
          </p>
          <p
            style="margin-top: 2em;font-family: Arial Black;text-align:center;"
          >
            あと、使えないフォントもけっこうあるっぽいです。いろいろお試しください。
          </p>
          <p
            style="margin-top: 2em;font-family: Arial Black;text-align:center;"
          >
            <a href="https://twitter.com/atsuoishimoto"
              ><img src="../../public/twitter.png" width="16px" />
              atsuoishimoto</a
            >
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3">
          <div class="form-group">
            <div style="padding:10px;background-color:dodgerblue;">
              <label style="font-size:2em;font-weight:bold;color:white;"
                >テキスト</label
              >
              <textarea
                v-model="text.src"
                rows="3"
                class="form-control"
                placeholder="絵文字のテキストをここに"
              ></textarea>
            </div>
            <Preview :divstyle="divstyle" :html="html" scale="1" />
          </div>
        </div>

        <div class="col-sm-9">
          <TextDef :text="this.text" />
          <LetterDef
            v-for="letter in visible_letters"
            v-bind:letter="letter"
            :key="letter.id"
          ></LetterDef>
        </div>
      </div>
    </div>

    <p style="margin-top:10em;font-size: 9pt; text-align:center;">
      Copyright (C)
      <a href="https://twitter.com/atsuoishimoto"
        ><img src="../../public/twitter.png" width="16px" /> atsuoishimoto</a
      >
      当サイトのパフォーマンスと、利用者の経験の改善のために、Cookieを用いたユーザ情報の収集を行っていません。してないってば。
    </p>
  </div>
</template>

<script>
import TextDef from "./TextDef.vue";
import LetterDef from "./LetterDef.vue";
import Preview from "./Preview.vue";
import GraphemeSplitter from "grapheme-splitter";

var splitter = new GraphemeSplitter();

function escapeHtml(unsafe) {
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fontToStyle(font) {
  let styles = "";
  if ("family" in font) {
    styles += `font-family:${font.family};`;
  }
  if ("size" in font) {
    styles += `font-size:${font.size}pt;`;
  }

  if ("color" in font) {
    styles += `color:${font.color};`;
  }

  if ("bold" in font) {
    if (font.bold) {
      styles += `font-weight:bold;`;
    } else {
      styles += `font-weight:normal;`;
    }
  }

  if ("italic" in font) {
    if (font.italic) {
      styles += `font-style:italic;`;
    } else {
      styles += `font-style:normal;`;
    }
  }

  let decoration = "";
  let has_decoration = false;
  if ("underline" in font) {
    has_decoration = true;
    if (font.underline) {
      decoration += " underline";
    }
  }

  if ("strikethrough" in font) {
    has_decoration = true;
    if (font.strikethrough) {
      decoration += " line-through";
    }
  }

  if (has_decoration && !decoration) {
    decoration = "none";
  }

  if (decoration) {
    styles += `text-decoration: ${decoration};`;
  }

  return styles;
}

export default {
  name: "EmojiBuilder",
  components: {
    TextDef,
    LetterDef,
    Preview,
  },
  props: [],
  data: function() {
    return {
      text: {
        src: "なる\nほど",
        font: {
          family: "Sans Serif",
          size: 45,
          color: "#000000",
          bold: true,
          italic: false,
          underline: false,
          strikethrough: false,
        },
        direction: "row",
        justifycontent: "space-around",
        alignitems: "center",
        aligncontent: "stretch",
      },
      letters: [],
    };
  },
  methods: {
    generate_letters: function() {
      if (!this.text.src) {
        this.letters = [];
        return;
      }
      let arr = splitter.splitGraphemes(this.text.src);

      this.letters = arr.map((letter, index) => {
        return {
          text: letter,
          id: index,
          font: {},
          alignself: "auto",
        };
      });
    },
  },
  mounted: function() {
    this.generate_letters();
  },
  watch: {
    text: {
      handler: function() {
        this.generate_letters();
      },
      deep: true,
    },
  },
  computed: {
    visible_letters: function() {
      return this.letters.filter((letter) => letter.text != "\n");
    },
    divstyle: function() {
      let style = "";
      if (this.text.backgroundcolor) {
        style += `background-color: ${this.text.backgroundcolor};`;
      }
      let fontstyle = fontToStyle(this.text.font);

      let flexstyle = `
flex-direction: ${this.text.direction};
justify-content: ${this.text.justifycontent};
align-items: ${this.text.alignitems};
align-content: ${this.text.aligncontent};
`;
      return style + flexstyle + fontstyle;
    },
    html: function() {
      const elems = this.letters.map((letter) => {
        let c;
        if (letter.text === "\n") {
          return `<span style="width:100%;"></span>`;
        } else if (letter.text === " ") {
          c = "&nbsp;";
        } else {
          c = escapeHtml(letter.text);
        }

        let style = "";
        if ("alignself" in letter) {
          if (letter.alignself) {
            style += `align-self: ${letter.alignself};`;
          }
        }

        if ("font" in letter) {
          style += fontToStyle(letter.font);
        }

        let transform = "";
        if (letter.scalex) {
          transform += ` scaleX(${letter.scalex})`;
        }
        if (letter.scaley) {
          transform += ` scaleY(${letter.scaley})`;
        }
        if (letter.rotate) {
          transform += ` rotate(${letter.rotate}deg)`;
        }
        if (letter.skewx) {
          transform += ` skewx(${letter.skewx}deg)`;
        }
        if (letter.skewy) {
          transform += ` skewy(${letter.skewy}deg)`;
        }

        if (transform) {
          style += `transform: ${transform}`;
        }
        style = escapeHtml(style);
        return `<span style="${style}">${c}</span>`;
      });

      return elems.join("");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
