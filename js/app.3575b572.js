(function(e){function t(t){for(var a,o,n=t[0],l=t[1],c=t[2],p=0,u=[];p<n.length;p++)o=n[p],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&u.push(r[o][0]),r[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);h&&h(t);while(u.length)u.shift()();return i.push.apply(i,c||[]),s()}function s(){for(var e,t=0;t<i.length;t++){for(var s=i[t],a=!0,n=1;n<s.length;n++){var l=s[n];0!==r[l]&&(a=!1)}a&&(i.splice(t--,1),e=o(o.s=s[0]))}return e}var a={},r={app:0},i=[];function o(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=a,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(s,a,function(t){return e[t]}.bind(null,a));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/HexPass/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=t,n=n.slice();for(var c=0;c<n.length;c++)t(n[c]);var h=l;i.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("cd49")},"034f":function(e,t,s){"use strict";var a=s("85ec"),r=s.n(a);r.a},"039f":function(e,t,s){},1:function(e,t){},2:function(e,t){},3:function(e,t){},4:function(e,t){},"85ec":function(e,t,s){},a6c2:function(e,t,s){"use strict";var a=s("039f"),r=s.n(a);r.a},a96e:function(e,t,s){},cd49:function(e,t,s){"use strict";s.r(t);var a=s("2b0e"),r=s("289d"),i=s("4eb5"),o=s.n(i),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app"},[s("div",{staticClass:"columns is-mobile is-gapless"},[s("div",{staticClass:"column is-one-third"},[s("b-dropdown",{attrs:{"aria-role":"list"},model:{value:e.languageSelect,callback:function(t){e.languageSelect=t},expression:"languageSelect"}},[s("button",{staticClass:"language-btn button is-light",attrs:{slot:"trigger"},slot:"trigger"},[s("icon",{attrs:{path:e.mdiTranslate}})],1),s("b-dropdown-item",{attrs:{value:"en","aria-role":"listitem"}},[e._v("English")]),s("b-dropdown-item",{attrs:{value:"zh-Hans","aria-role":"listitem"}},[e._v("简体中文")]),s("b-dropdown-item",{attrs:{value:"zh-Hant","aria-role":"listitem"}},[e._v("繁體中文")])],1)],1),e._m(0),s("div",{staticClass:"column is-one-third"},[s("github-corner",{attrs:{url:"https://github.com/Petrichor/HexPass"}})],1)]),s("div",{staticClass:"columns is-centered is-gapless app-body"},[s("div",{staticClass:"column is-one-third"},[s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v(e._s(e.text.get("label")))]),s("p",{staticClass:"control has-icons-left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.tag,expression:"tag"}],staticClass:"input",domProps:{value:e.tag},on:{input:[function(t){t.target.composing||(e.tag=t.target.value)},e.verify]}}),s("icon",{staticClass:"is-left",attrs:{path:e.mdiTag}})],1)]),s("div",{staticClass:"field"},[s("label",{staticClass:"label"},[e._v(e._s(e.text.get("password")))]),s("p",{staticClass:"control has-icons-left has-icons-right"},["checkbox"===e.passwordInputType?s("input",{directives:[{name:"model",rawName:"v-model",value:e.pwd,expression:"pwd"}],ref:"inputPassword",staticClass:"input",attrs:{"password-reveal":"",type:"checkbox"},domProps:{checked:Array.isArray(e.pwd)?e._i(e.pwd,null)>-1:e.pwd},on:{input:e.verify,change:function(t){var s=e.pwd,a=t.target,r=!!a.checked;if(Array.isArray(s)){var i=null,o=e._i(s,i);a.checked?o<0&&(e.pwd=s.concat([i])):o>-1&&(e.pwd=s.slice(0,o).concat(s.slice(o+1)))}else e.pwd=r}}}):"radio"===e.passwordInputType?s("input",{directives:[{name:"model",rawName:"v-model",value:e.pwd,expression:"pwd"}],ref:"inputPassword",staticClass:"input",attrs:{"password-reveal":"",type:"radio"},domProps:{checked:e._q(e.pwd,null)},on:{input:e.verify,change:function(t){e.pwd=null}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:e.pwd,expression:"pwd"}],ref:"inputPassword",staticClass:"input",attrs:{"password-reveal":"",type:e.passwordInputType},domProps:{value:e.pwd},on:{input:[function(t){t.target.composing||(e.pwd=t.target.value)},e.verify]}}),s("icon",{staticClass:"is-left",attrs:{path:e.mdiTextboxPassword}}),s("icon",{staticClass:"is-right is-clickable",attrs:{id:"password-eye",path:e.iconEye},nativeOn:{click:function(t){return e.togglePasswordVisibility(t)}}})],1)]),s("b-collapse",{staticClass:"card",attrs:{open:!1,"aria-id":"advanced"},scopedSlots:e._u([{key:"trigger",fn:function(t){return[s("div",{staticClass:"card-header",attrs:{role:"button","aria-controls":"advanced"}},[s("p",{staticClass:"card-header-title"},[e._v(e._s(e.text.get("advanced")))]),s("a",{staticClass:"card-header-icon"},[s("icon",{staticClass:"has-text-primary",attrs:{path:t.open?e.mdiMenuDown:e.mdiMenuLeft}})],1)])]}}])},[s("div",{staticClass:"card-content"},[s("label",{staticClass:"label is-small"},[e._v(e._s(e.text.get("length")))]),s("div",{staticClass:"field"},[s("b-slider",{attrs:{min:4,max:32,rounded:""},on:{input:e.verify},model:{value:e.length,callback:function(t){e.length=t},expression:"length"}})],1),s("label",{staticClass:"label is-small"},[e._v(e._s(e.text.get("structure")))]),s("div",{staticClass:"field"},[s("b-checkbox",{on:{input:e.verify},model:{value:e.hasLowerCase,callback:function(t){e.hasLowerCase=t},expression:"hasLowerCase"}},[e._v(e._s(e.text.get("lowercase")))])],1),s("div",{staticClass:"field"},[s("b-checkbox",{on:{input:e.verify},model:{value:e.hasUpperCase,callback:function(t){e.hasUpperCase=t},expression:"hasUpperCase"}},[e._v(e._s(e.text.get("uppercase")))])],1),s("div",{staticClass:"field"},[s("b-checkbox",{on:{input:e.verify},model:{value:e.hasNumber,callback:function(t){e.hasNumber=t},expression:"hasNumber"}},[e._v(e._s(e.text.get("number")))])],1),s("div",{staticClass:"field"},[s("b-checkbox",{on:{input:e.verify},model:{value:e.hasSymbol,callback:function(t){e.hasSymbol=t},expression:"hasSymbol"}},[e._v(e._s(e.text.get("symbol")))])],1),s("div",{staticClass:"field"},[s("b-checkbox",{model:{value:e.avoidAmbChar,callback:function(t){e.avoidAmbChar=t},expression:"avoidAmbChar"}},[e._v(e._s(e.text.get("avoidAmbChar")))])],1)])]),s("div",{staticClass:"generate-btn"},[s("button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.password,expression:"password",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopySuccess,expression:"onCopySuccess",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onCopyError,expression:"onCopyError",arg:"error"}],staticClass:"button is-centered is-primary",attrs:{disabled:e.btnDisabled},on:{click:e.generate}},[e._v(e._s(e.text.get("generate")))])]),s("article",{directives:[{name:"show",rawName:"v-show",value:e.passwordSuccess,expression:"passwordSuccess"}],staticClass:"message"},[s("div",{staticClass:"message-body"},[s("nav",{staticClass:"level column"},[s("p",{ref:"passwordText",staticClass:"level-item title",attrs:{id:"password-text"}},[s("strong",[e._v(e._s(e.password))])])])])])],1)])])},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"column is-one-third has-text-centered"},[a("figure",{staticClass:"image is-128x128 is-inline-block"},[a("img",{attrs:{alt:"HexPass logo",src:s("cf05")}})])])}],c=(s("e260"),s("ddb0"),s("9ab4")),h=s("60a3"),p=s("94ed");class u{constructor(e){this.locale="zh-Hans",this.text=new Map,this.en=new Map([["label","Label"],["password","Password"],["advanced","Advanced"],["length","Length"],["structure","Structure"],["lowercase","Lowercase"],["uppercase","Uppercase"],["number","Number"],["symbol","Symbol"],["avoidAmbChar","Avoid ambiguous characters"],["generate","Generate"],["copySuccess","Copied to clipboard"],["copyError","Automatic copy failed, please copy manually"]]),this.hans=new Map([["label","标签"],["password","密码"],["advanced","高级"],["length","长度"],["structure","结构"],["lowercase","小写字母"],["uppercase","大写字母"],["number","数字"],["symbol","符号"],["avoidAmbChar","排除易混淆"],["generate","生成"],["copySuccess","已复制到剪切板"],["copyError","自动复制失败，请手动复制"]]),this.hant=new Map([["label","標籤"],["password","密碼"],["advanced","高級"],["length","長度"],["lowercase","小寫字母"],["uppercase","大寫字母"],["number","數字"],["symbol","符號"],["avoidAmbChar","排除易混淆"],["generate","生成"],["copySuccess","已複製到剪切板"],["copyError","自動複製失敗，請手動複製"]]),this.locale=e,this.changeString()}setLocale(e){this.locale=e,this.changeString()}changeString(){var e;for(var t of this.hans.keys()){switch(this.locale){case"en":e=this.en.get(t);break;case"zh-Hans":e=this.hans.get(t);break;case"zh-Hant":e=this.hant.get(t);break;default:break}"string"==typeof e&&this.text.set(t,e)}}}s("a434"),s("25f0"),s("1276");var d=s("d6e6"),b=s.n(d),m=s("89a0"),g=s.n(m);class v{static generate(e){var t=b()(e.tag).toString(),s=b()(e.pwd).toString(),a=b()(e.version.toString()).toString(),r=g()(t+a,s).toString().split(""),i=r.splice(parseInt(r[0],16),e.length),o=new Array(e.length);return this.initVariable(),this.getEachTypeCharsNum(e),this.initChars(e.avoidAmbChar),i.forEach((t,s)=>{for(var a=parseInt(t,16),r="",i=0,n=0;n<=a;n++)void 0!=o[i]&&n--,n!=a&&(i=i==e.length-1?0:i+1);r=s<this.symbolNum?this.getChar(this.symbolCharsArray,a):s<this.symbolNum+this.numberNum?this.getChar(this.numberCharsArray,a):s<e.length-this.lowerCaseNum?this.getChar(this.upperCaseCharsArray,a):this.getChar(this.lowerCaseCharsArray,a),o[i]=r}),o.join("")}static initVariable(){this.symbolNum=0,this.numberNum=0,this.upperCaseNum=0,this.lowerCaseNum=0,this.characterTypeNum=3}static initChars(e){e?(this.symbolCharsArray="@#$%^&*+-".split(""),this.numberCharsArray="23456789".split(""),this.upperCaseCharsArray="ABDEFGHJLMNQRTY".split(""),this.lowerCaseCharsArray="abdefghjmnqrty".split("")):(this.symbolCharsArray="!@#$%^&*+-".split(""),this.numberCharsArray="0123456789".split(""),this.upperCaseCharsArray="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),this.lowerCaseCharsArray="abcdefghijklmnopqrstuvwxyz".split(""))}static getCharacterTypeNum(e){var t=[e.hasSymbol,e.hasNumber,e.hasUpperCase,e.hasLowerCase];return t.reduce((e,t)=>t?e+1:e,0)}static getEachTypeCharsNum(e){this.characterTypeNum=this.getCharacterTypeNum(e),e.hasSymbol&&(this.symbolNum=Math.floor(e.length/this.characterTypeNum)),e.hasNumber&&(e.hasUpperCase||e.hasLowerCase?this.numberNum=Math.floor(e.length/this.characterTypeNum):this.numberNum=e.length-this.symbolNum),e.hasUpperCase&&(e.hasLowerCase?this.upperCaseNum=Math.floor((e.length-this.symbolNum-this.numberNum)/2):this.upperCaseNum=e.length-this.symbolNum-this.numberNum),e.hasLowerCase&&(this.lowerCaseNum=e.length-this.symbolNum-this.numberNum-this.upperCaseNum)}static getChar(e,t){return t<e.length?e[t]:e[t%e.length]}}v.symbolNum=0,v.numberNum=0,v.upperCaseNum=0,v.lowerCaseNum=0,v.characterTypeNum=3,v.symbolCharsArray=[],v.numberCharsArray=[],v.upperCaseCharsArray=[],v.lowerCaseCharsArray=[];var C=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("a",{staticClass:"github-corner",attrs:{href:e.url,target:"_blank",rel:"noopener noreferrer","aria-label":"View source on GitHub"}},[s("svg",{staticStyle:{fill:"#63bbd0",color:"#fff",position:"absolute",top:"0",border:"0",right:"0"},attrs:{width:"80",height:"80",viewBox:"0 0 250 250","aria-hidden":"true"}},[s("path",{attrs:{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}}),s("path",{staticClass:"octo-arm",staticStyle:{"transform-origin":"130px 106px"},attrs:{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor"}}),s("path",{staticClass:"octo-body",attrs:{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"}})])])])},f=[],y=class extends h["c"]{};Object(c["a"])([Object(h["b"])()],y.prototype,"url",void 0),y=Object(c["a"])([h["a"]],y);var w=y,x=w,N=(s("a6c2"),s("2877")),S=Object(N["a"])(x,C,f,!1,null,"6ae12004",null),_=S.exports,A=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"icon"},[s("svg",{attrs:{viewBox:"0 0 24 24",fill:e.color}},[s("path",{attrs:{d:e.path}})])])},k=[],T=class extends h["c"]{};Object(c["a"])([Object(h["b"])()],T.prototype,"path",void 0),Object(c["a"])([Object(h["b"])()],T.prototype,"color",void 0),T=Object(c["a"])([h["a"]],T);var P,j=T,O=j,L=Object(N["a"])(O,A,k,!1,null,"284b9a68",null),E=L.exports,M=P=class extends h["c"]{constructor(){super(...arguments),this.mdiTranslate=p["g"],this.mdiTag=p["e"],this.mdiTextboxPassword=p["f"],this.iconEye=p["a"],this.mdiMenuDown=p["c"],this.mdiMenuLeft=p["d"],this.isPasswordVisible=!1,this.passwordInputType="text",this.lang=new u("zh-Hans"),this.tag="",this.pwd="",this.version=1,this.length=10,this.hasSymbol=!1,this.hasNumber=!0,this.hasUpperCase=!0,this.hasLowerCase=!0,this.avoidAmbChar=!1,this.password="",this.btnDisabled=!0,this.passwordSuccess=!1,this.isModalActive=!1,this.languageSelect="zh-Hans",this.text=new Map}created(){this.changeString()}languageChanged(){this.lang.setLocale(this.languageSelect),this.changeString(),this.$forceUpdate()}changeString(){for(var e of this.lang.hans.keys()){var t=this.lang.text.get(e);"string"==typeof t&&this.text.set(e,t)}}verify(){this.params={tag:this.tag,pwd:this.pwd,version:this.version,length:this.length,hasSymbol:this.hasSymbol,hasNumber:this.hasNumber,hasUpperCase:this.hasUpperCase,hasLowerCase:this.hasLowerCase,avoidAmbChar:this.avoidAmbChar},0!=this.tag.length&&0!=this.pwd.length&&0!=v.getCharacterTypeNum(this.params)?this.btnDisabled=!1:(this.btnDisabled=!0,this.passwordSuccess=!1)}generate(){void 0!=this.params&&(this.password=v.generate(this.params),this.passwordSuccess=!0)}static selectText(e){var t=document.createRange();t.selectNode(e);var s=window.getSelection();null!=s&&(s.removeAllRanges(),s.addRange(t))}onCopySuccess(){var e=this.text.get("copySuccess");this.$buefy.toast.open({duration:800,message:e,position:"is-bottom",type:"is-success"})}onCopyError(){P.selectText(this.$refs.passwordText);this.text.get("copyError");this.$buefy.toast.open({duration:3e3,message:"copyErrorText",position:"is-bottom",type:"is-danger"})}togglePasswordVisibility(){this.isPasswordVisible=!this.isPasswordVisible,this.passwordInputType=this.isPasswordVisible?"text":"password",this.iconEye=this.isPasswordVisible?p["b"]:p["a"],this.$nextTick(()=>{this.$refs.inputPassword.focus()})}};Object(c["a"])([Object(h["d"])("languageSelect")],M.prototype,"languageChanged",null),M=P=Object(c["a"])([Object(h["a"])({components:{GithubCorner:_,Icon:E}})],M);var H=M,$=H,U=(s("034f"),Object(N["a"])($,n,l,!1,null,null,null)),V=U.exports,I=s("9483");Object(I["a"])("".concat("/HexPass/","service-worker.js"),{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});s("a96e");a["a"].config.productionTip=!1,a["a"].use(r["a"]),a["a"].use(o.a),new a["a"]({render:e=>e(V)}).$mount("#app")},cf05:function(e,t,s){e.exports=s.p+"img/logo.a0ccb8d4.png"}});