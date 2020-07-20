<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12" style="margin: 2em 0;">
          <a id="top" />
          <h2 class="display-3">
            <div style="font-family: Arial Black;text-align:center;">Flex</div>
            <div class="display-4" style="text-align:center;">絵文字ビルダー</div>
          </h2>

          <p
            style="margin-top: 1em;font-family: Arial Black;text-align:center;"
          >Slack/Discordの絵文字作成にどうぞ。</p>

          <p style="margin-top: 1em;font-family: Arial Black;text-align:center;">
            <a href="#usage">使い方</a>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2">
          <div class="form-group">
            <div style="padding:10px;background-color:dodgerblue;">
              <label style="font-size:2em;font-weight:bold;color:white;">テキスト</label>
              <textarea v-model="src" rows="3" class="form-control" placeholder="絵文字のテキストをここに"></textarea>
            </div>
            <Preview :divstyle="divstyle" :html="html" scale="1" />
          </div>
        </div>

        <div class="col-sm-10">
          <TextDef :format="this.format" />
          <LetterDef
            v-for="(letter, index) in visible_letters"
            v-bind:letter="letter"
            v-bind:idx="index"
            :key="letter.id"
          ></LetterDef>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <hr />
        <a id="usage" />
        <div
          style="width:80%; font-family: Arial; font-size: 1.5rem; margin: 0 2rem;
            margin-top: 2em; border-top: solid 4px #b78c8c;"
        >
          <h2 style="font-size: 3rem;  margin: 0.5em 0; ">Flex絵文字ビルダーの使い方</h2>

          <ul>
            <li>テキストを入力すると、リアルタイムに画像を生成します。</li>
            <li>
              <p>ローカルにインストールされているフォントも指定できます。</p>
              <p>Macの場合は</p>
              <div style="padding-left: 3em; margin-bottom: 1rem;">
                <code
                  style="font-family:'ヒラギノ丸ゴ ProN'; font-weight:bold;font-size: 1.2em;"
                >ヒラギノ丸ゴ ProN</code>
              </div>

              <p>Windowsなら</p>
              <div style="padding-left: 3em; margin-bottom: 1rem;">
                <code style="font-family:'游ゴシック'; font-weight:bold;font-size: 1.2em;">游ゴシック</code>
                や
                <code
                  style="font-family:'游明朝'; font-weight:bold;font-size: 1.2em;"
                >游明朝</code>
              </div>などを指定してみてください。
            </li>
            <li>
              Windowsでは、
              <a href="http://jikasei.me/font/rounded-mplus/">Rounded M+ フォント</a>
              などを「すべてのユーザに対してインストール」でインストールすると、
              <code>Rounded M+ 1C</code> のように指定して利用できます。
            </li>
            <li>文字のレイアウトは、全てCSSのプロパティとして指定しています。</li>
            <li>
              文字はそれぞれ
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#The_flex_container"
              >Flex container</a>の独立したFlex item要素となっていますので、Flexboxのプロパティを指定して自由にレイアウトを指定できます。
            </li>
          </ul>
          <a href="#top">戻る</a>
        </div>
      </div>
      <div class="row">
        <p style="margin-top:10em;font-size: 9pt; text-align:center;">
          Copyright (C)
          <a href="https://twitter.com/atsuoishimoto">
            <img src="../../public/twitter.png" width="16px" /> atsuoishimoto
          </a>&nbsp;
          <a
            href="https://github.com/atsuoishimoto/flex_emojibuilder"
          >https://github.com/atsuoishimoto/flex_emojibuilder</a>
          <br />当サイトのパフォーマンスと、利用者の経験の改善のために、Cookieを用いたユーザ情報の収集を行っていません。してないってば。
        </p>
      </div>
    </div>
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
    let family = font.family;
    if (family.indexOf(" ") != -1) {
      family = `'${family}'`;
    }
    styles += `font-family:${family};`;
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

  if ("line_height" in font) {
    styles += `line-height: ${font.line_height}em;`;
  } else {
    styles += `line-height: 1em;`;
  }

  if ("letter_spacing" in font) {
    styles += `letter-spacing: ${font.letter_spacing}pt;`;
  }
  return styles;
}

export default {
  name: "EmojiBuilder",
  components: {
    TextDef,
    LetterDef,
    Preview
  },
  props: [],
  data: function() {
    return {
      src: "なる\nほど",
      format: {
        font: {
          family: "Sans Serif",
          size: 45,
          color: "#000000",
          bold: true,
          italic: false,
          underline: false,
          strikethrough: false
        },
        direction: "row",
        justifycontent: "center",
        alignitems: "center",
        aligncontent: "center"
      },
      letters: []
    };
  },
  methods: {
    generate_letters: function() {
      if (!this.src) {
        this.letters = [];
        return;
      }
      let arr = splitter.splitGraphemes(this.src);

      this.letters = arr.map((letter, index) => {
        return {
          text: letter,
          id: index,
          font: {},
          alignself: "auto"
        };
      });
    }
  },
  mounted: function() {
    this.generate_letters();
  },
  watch: {
    src: {
      handler: function() {
        this.generate_letters();
      }
    }
  },
  computed: {
    visible_letters: function() {
      return this.letters.filter(letter => letter.text != "\n");
    },
    divstyle: function() {
      let style = "";
      if (this.format.backgroundcolor) {
        style += `background-color: ${this.format.backgroundcolor};`;
      }
      let fontstyle = fontToStyle(this.format.font);

      let flexstyle = `
flex-direction: ${this.format.direction};
justify-content: ${this.format.justifycontent};
align-items: ${this.format.alignitems};
align-content: ${this.format.aligncontent};
`;
      return style + flexstyle + fontstyle;
    },
    html: function() {
      const elems = this.letters.map(letter => {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
code {
  font-family: monospace;
  color: #e83e8c;
  font-size: 1em;
}
li {
  margin-bottom: 1em;
}
</style>
