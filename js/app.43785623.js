(function(t){function e(e){for(var a,i,s=e[0],c=e[1],u=e[2],l=0,h=[];l<s.length;l++)i=s[l],r[i]&&h.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);f&&f(e);while(h.length)h.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},o=[];function i(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"c41ea382"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise(function(e,a){n=r[t]=[e,a]});e.push(n[2]=a);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(t),o=function(e){c.onerror=c.onload=null,clearTimeout(u);var n=r[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+a+": "+o+")");i.type=a,i.request=o,n[1](i)}r[t]=void 0}};var u=setTimeout(function(){o({type:"timeout",target:c})},12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/mc2413/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var f=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("64a9"),r=n.n(a);r.a},"21bb":function(t,e,n){"use strict";var a=n("bcc9"),r=n.n(a);r.a},5556:function(t,e,n){"use strict";var a=n("7c30"),r=n.n(a);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("744f"),n("6c7b"),n("7514"),n("20d6"),n("1c4c"),n("6762"),n("cadf"),n("e804"),n("55dd"),n("d04f"),n("c8ce"),n("217b"),n("7f7f"),n("f400"),n("7f25"),n("536b"),n("d9ab"),n("f9ab"),n("32d7"),n("25c9"),n("9f3c"),n("042e"),n("c7c6"),n("f4ff"),n("049f"),n("7872"),n("a69f"),n("0b21"),n("6c1a"),n("c7c62"),n("84b4"),n("c5f6"),n("2e37"),n("fca0"),n("7cdf"),n("ee1d"),n("b1b1"),n("87f3"),n("9278"),n("5df2"),n("04ff"),n("f751"),n("4504"),n("fee7"),n("ffc1"),n("0d6d"),n("9986"),n("8e6e"),n("25db"),n("e4f7"),n("b9a1"),n("64d5"),n("9aea"),n("db97"),n("66c8"),n("57f0"),n("165b"),n("456d"),n("cf6a"),n("fd24"),n("8615"),n("551c"),n("097d"),n("df1b"),n("2397"),n("88ca"),n("ba16"),n("d185"),n("ebde"),n("2d34"),n("f6b3"),n("2251"),n("c698"),n("a19f"),n("9253"),n("9275"),n("3b2b"),n("3846"),n("4917"),n("a481"),n("28a5"),n("386d"),n("6b54"),n("4f7f"),n("8a81"),n("ac4d"),n("8449"),n("9c86"),n("fa83"),n("48c0"),n("a032"),n("aef6"),n("d263"),n("6c37"),n("9ec8"),n("5695"),n("2fdb"),n("d0b0"),n("5df3"),n("b54a"),n("f576"),n("ed50"),n("788d"),n("14b9"),n("f386"),n("f559"),n("1448"),n("673e"),n("242a"),n("c66f"),n("b05c"),n("34ef"),n("6aa2"),n("15ac"),n("af56"),n("b6e4"),n("9c29"),n("63d9"),n("4dda"),n("10ad"),n("c02b"),n("4795"),n("130f"),n("ac6a"),n("96cf"),n("0cdd");var a=n("2b0e"),r=n("5f5b");n("c9c9"),n("2dd8");a["default"].use(r["a"]);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",[n("b-navbar",{staticClass:"mb-2",attrs:{type:"dark",variant:"dark"}},[n("b-navbar-brand",[t._v("MC2413")]),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[t._v("Home")]),n("b-nav-item",{attrs:{to:"/about"}},[t._v("About")])],1)],1)],1)],1),n("b-container",[n("router-view")],1)],1)},i=[],s=n("8cc4"),c=n.n(s);function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function f(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}var h=function(){function t(){u(this,t),this.initSynth()}return f(t,[{key:"initSynth",value:function(){this.masterChannel=new c.a.Channel({volume:0}).toMaster(),this.tone=new c.a.Synth({oscillator:{type:"sine"},portamento:.05}).connect(this.masterChannel)}},{key:"noteOn",value:function(t,e,n){this.tone.triggerAttack(t,n,e)}},{key:"noteChange",value:function(t,e){this.tone.setNote(t,e)}},{key:"noteOff",value:function(t){this.tone.triggerRelease(t)}},{key:"connectStore",value:function(t){var e=this,n=null;t.subscribeAction(function(t,a){var r=t.type,o=t.payload;switch(r){case"synth/noteOnTestTone":n!=o&&(null===n?e.noteOn(o,.5):e.noteChange(o)),n=o;break;case"synth/noteOffTestTone":e.noteOff(),n=null;break;default:break}})}}]),t}(),d=function(){function t(e){u(this,t),this.synth=e}return f(t,[{key:"connectStore",value:function(t){t.subscribe(function(t,e){})}}]),t}(),p=function(){function t(){u(this,t),this.synth=new h,this.sequencer=new d(this.synth)}return f(t,[{key:"connectStore",value:function(t){this.synth.connectStore(t),this.sequencer.connectStore(t)}}]),t}(),m=p,g=new m,b={name:"root",mounted:function(){g.connectStore(this.$store)}},v=b,y=(n("034f"),n("2877")),w=Object(y["a"])(v,o,i,!1,null,null,null),C=w.exports,_=n("8c4f"),E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("b-row",{staticClass:"mb-2 pianoroll-control"},[n("b-col",{attrs:{md:"2",lg:"1"}},[t._v("\n      scale:"+t._s(Number(t.pianoroll_scale).toFixed(2))+"\n    ")]),n("b-col",{attrs:{sm:"4"}},[n("b-form-input",{attrs:{type:"range",min:"0.5",max:"4",step:"0.25",variant:"secondary"},model:{value:t.pianoroll_scale,callback:function(e){t.pianoroll_scale=t._n(e)},expression:"pianoroll_scale"}})],1),n("b-col",{attrs:{sm:"4"}},[n("b-dropdown",{attrs:{text:"grid:"+t.pianoroll_quantize}},t._l(t.pianoroll_quantize_options,function(e){return n("b-dropdown-item",{key:e,on:{click:function(n){t.pianoroll_quantize=e}}},[t._v(t._s(e)+"\n        ")])}),1)],1)],1),n("piano-roll",{staticClass:"piano-roll mb-4",attrs:{scale:t.pianoroll_scale,quantize:t.pianoroll_quantize}}),n("mml-editor")],1)},x=[],k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("codemirror",{ref:"cm",attrs:{value:t.mml,options:t.cmOptions}}),t.mmlError?n("b-alert",{staticClass:"mt-4",attrs:{show:"",variant:"danger"}},[t._v(t._s(t.mmlError.msg))]):t._e()],1)},D=[],G=n("2f62"),O=n("8f94"),A=(n("a7be"),n("8c2e"),n("56b3")),q=n.n(A);function S(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){B(t,e,n[e])})}return t}function B(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}q.a.defineMode("text/mml",function(){return{token:function(t,e){return t.match(/[a-g][+#-]*/i)?null:t.match(/[\d^&]+/)?"variable":t.match(/[tlvqo]/i)?"keyword":(t.next(),null)}}});var F={name:"mml-editor",components:{codemirror:O["codemirror"]},data:function(){return{cmOptions:{mode:"text/mml",theme:"base16-dark",lineNumbers:!0,line:!0,lineWrapping:!0}}},computed:S({codemirror:function(){return this.$refs.cm.codemirror}},Object(G["c"])("synth",{mml:"mml",mmlError:"mmlError"})),mounted:function(){this.initCodeMirror(this.codemirror)},methods:{initCodeMirror:function(t){var e=this;t.on("change",function(t,n){e.$store.dispatch("synth/changeMML",t.getValue())})}}},z=F,T=(n("cb7f"),Object(y["a"])(z,k,D,!1,null,null,null)),j=T.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"wrapper",attrs:{ondragstart:"return false;",ondrop:"return false;"}},[n("svg",[n("defs",[n("pattern",{attrs:{id:"ptn-grid",width:t.quantize_width*t.quantize,height:"112",patternUnits:"userSpaceOnUse",patternContentUnits:"userSpaceOnUse",x:32+t.grid_offset}},t._l(t.util.range(t.quantize),function(e){return n("g",{key:e,attrs:{transform:t.getTransform(e*t.quantize_width,0)}},[n("rect",{staticClass:"a",attrs:{y:"0",width:t.quantize_width,height:"112"}}),n("rect",{staticClass:"b",attrs:{y:"10",width:t.quantize_width,height:"9"}}),n("rect",{staticClass:"b",attrs:{y:"28",width:t.quantize_width,height:"9"}}),n("rect",{staticClass:"b",attrs:{y:"46",width:t.quantize_width,height:"9"}}),n("rect",{staticClass:"b",attrs:{y:"74",width:t.quantize_width,height:"10"}}),n("rect",{staticClass:"b",attrs:{y:"94",width:t.quantize_width,height:"9"}}),n("line",{class:t.getLineClass(e,t.quantize),attrs:{x1:"0",y1:"0",x2:"0",y2:"112"}}),n("line",{staticClass:"d",attrs:{x1:"0",y1:"0",x2:t.quantize_width,y2:"0"}}),n("line",{staticClass:"c",attrs:{x1:"0",y1:"64",x2:t.quantize_width,y2:"64"}})])}),0)]),n("g",{attrs:{transform:t.getTransform(0,-1*t.stage_pos.y,t.scale)}},[n("rect",{attrs:{x:"32",width:t.stage_width,height:112*t.octaves,fill:"url(#ptn-grid)"},on:{mousedown:function(e){return t.onDrag("start",e)},mouseup:function(e){return t.onDrag("end",e)},mousemove:function(e){return t.onDrag("move",e)},wheel:function(e){return e.preventDefault(),t.onDrag("wheel",e)}}}),n("g",{attrs:{id:"note",transform:t.getTransform(-1*t.stage_pos.x,0)}},t._l(t.note,function(e){return n("g",{key:e.id,attrs:{transform:t.getTransform(t.getXfromLength(e.time)+32,t.getYfromNote(e.interval))}},[n("rect",{staticClass:"note",attrs:{width:t.getXfromLength(e.duration),height:t.getHeightfromNote(e.interval),fill:t.getNoteColor(e),stroke:t.getNoteColor(e,!0)}}),t.scale>=2?n("text",{attrs:{transform:"translate(2 6.5)"}},[t._v("\n            "+t._s(t.getNoteName(e.interval))+"\n          ")]):t._e()])}),0),n("g",{attrs:{id:"piano"}},t._l(t.util.range(t.octaves),function(e){return n("g",{key:"key-"+e,attrs:{transform:t.getTransform(0,112*(9-e)),"data-octave":e},on:{mousedown:function(e){return t.onKeyboard("down",e)},mousemove:function(e){return t.onKeyboard("move",e)},mouseup:function(e){return t.onKeyboard("up",e)},mouseout:function(e){return t.onKeyboard("out",e)}}},[n("rect",{staticClass:"a",attrs:{y:"96",width:"32",height:"16","data-note":"c"}}),n("rect",{staticClass:"a",attrs:{y:"80",width:"32",height:"16","data-note":"d"}}),n("rect",{staticClass:"a",attrs:{y:"64",width:"32",height:"16","data-note":"e"}}),n("rect",{staticClass:"a",attrs:{y:"48",width:"32",height:"16","data-note":"f"}}),n("rect",{staticClass:"a",attrs:{y:"32",width:"32",height:"16","data-note":"g"}}),n("rect",{staticClass:"a",attrs:{y:"16",width:"32",height:"16","data-note":"a"}}),n("rect",{staticClass:"a",attrs:{y:"0",width:"32",height:"16","data-note":"b"}}),n("rect",{staticClass:"b",attrs:{y:"94",width:"20",height:"8","data-note":"c#"}}),n("rect",{staticClass:"b",attrs:{y:"74",width:"20",height:"8","data-note":"d#"}}),n("rect",{staticClass:"b",attrs:{y:"46",width:"20",height:"8","data-note":"f#"}}),n("rect",{staticClass:"b",attrs:{y:"28",width:"20",height:"8","data-note":"g#"}}),n("rect",{staticClass:"b",attrs:{y:"10",width:"20",height:"8","data-note":"a#"}}),n("text",{staticClass:"c",attrs:{transform:"translate(22 108)"}},[t._v("C"+t._s(e))])])}),0)])])])},N=[],P=n("6929"),L=n.n(P),$=n("2ef0"),R=n.n($);function W(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){Y(t,e,n[e])})}return t}function Y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var U={C:{y:103,height:9},D:{y:84,height:10},E:{y:64,height:10},F:{y:55,height:9},G:{y:37,height:9},A:{y:19,height:9},B:{y:0,height:10},"C#":{y:94,height:9},"D#":{y:74,height:10},"F#":{y:46,height:9},"G#":{y:28,height:9},"A#":{y:10,height:9}},X="#2283e5",K="#855181",H="#e42222",I={name:"piano-roll",props:{scale:{type:Number,default:2},quantize:{type:Number,default:8},x:{type:Number,default:0},y:{type:String,default:"b4"}},data:function(){return{util:R.a,octaves:10,stage_pos:{x:0,y:0},stage_width:1e4,last_pos:null}},mounted:function(){window.addEventListener("resize",this.updateStageWidth),this.updateStageWidth(),this.setStagePos(this.x*this.scale,this.getYfromNote(this.y)*this.scale)},beforeDestroy:function(){window.removeEventListener("resize",this.updateStageWidth)},computed:W({quantize_width:function(){return 256/this.quantize},grid_offset:function(){return this.stage_pos.x%(this.quantize_width*this.quantize)*-1}},Object(G["b"])("synth",{note:"noteSequence"})),watch:{scale:function(t,e){this.stage_pos.x*=t/e,this.stage_pos.y*=t/e,this.updateStageWidth()}},methods:{getTransform:function(t,e,n){var a="";return null!==t&&null!==e&&(a+="translate(".concat(t,",").concat(e,")")),n&&(a+=" scale(".concat(n,")")),a},getLineClass:function(t,e){return 0==t?"measure":t%(e/4)==0?"beat":"tick"},onDrag:function(t,e){switch(t){case"start":this.last_pos={x:e.offsetX,y:e.offsetY};break;case"move":e.buttons||(this.last_pos=null),null!==this.last_pos&&(this.setStagePos(this.stage_pos.x+(this.last_pos.x-e.offsetX)/this.scale,this.stage_pos.y+(this.last_pos.y-e.offsetY)/this.scale),this.last_pos={x:e.offsetX,y:e.offsetY});break;case"end":this.last_pos=null;break;case"wheel":this.setStagePos(this.stage_pos.x,this.stage_pos.y+e.deltaY/2/this.scale);break}},onKeyboard:function(t,e){var n=e.target.dataset.note+e.target.parentNode.dataset.octave;switch(t){case"down":this.$store.dispatch("synth/noteOnTestTone",n);break;case"up":this.$store.dispatch("synth/noteOffTestTone");break;case"move":e.buttons&&this.$store.dispatch("synth/noteOnTestTone",n);break;case"out":this.$store.dispatch("synth/noteOffTestTone");break}},updateStageWidth:function(){this.stage_width=this.$refs.wrapper.offsetWidth/this.scale},setStagePos:function(t,e){this.stage_pos.x=Math.max(0,t),this.stage_pos.y=Math.min(Math.max(0,e),1120*this.scale-this.$refs.wrapper.offsetHeight)},normalizeNote:function(t){var e={"A+":"A#","A-":"G#","B+":"C","B-":"A#","C+":"C#","C-":"B","D+":"D#","D-":"C#","E+":"F","E-":"D#","F+":"F#","F-":"E","G+":"G#","G-":"F#"},n=t.toUpperCase().match(/([A-G][#+-]*)(\d+)/);if(!n)return null;var a=n[1];return e[n[1]]&&(a=e[n[1]]),{name:a,org_name:n[1].toUpperCase(),octave:n[2]}},getNoteName:function(t){var e=this.normalizeNote(t);return e?e.org_name:""},getYfromNote:function(t){var e=this.normalizeNote(t);return e?112*(9-e.octave)+U[e.name].y:0},getHeightfromNote:function(t){var e=this.normalizeNote(t);return U[e.name].height},getXfromLength:function(t){return 16*t*4},getNoteColor:function(t,e){var n,a=t.velocity;return a>.5?(n=L()(K),n=n.mix(L()(H),2*(a-.5))):(n=L()(X),n=n.mix(L()(K),2*a)),e?n.darken(.5).rgb().string():n.rgb().string()}}},J=I,V=(n("5556"),Object(y["a"])(J,M,N,!1,null,null,null)),Q=V.exports,Z={name:"home",components:{MmlEditor:j,PianoRoll:Q},data:function(){return{pianoroll_scale:2,pianoroll_quantize:16,pianoroll_quantize_options:[32,24,16,12,9,8,4,3,2,1]}}},tt=Z,et=(n("21bb"),Object(y["a"])(tt,E,x,!1,null,null,null)),nt=et.exports;a["default"].use(_["a"]);var at=new _["a"]({routes:[{path:"/",name:"home",component:nt},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),rt=n("ce47"),ot=n.n(rt);function it(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function st(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function ct(t,e,n){return e&&st(t.prototype,e),n&&st(t,n),t}var ut=ot.a.regexp(/[ \t:\r\n]*/),lt=ot.a.regexp(/\d+/).map(function(t){return parseInt(t)}),ft=ot.a.of("").node("empty"),ht=ot.a.regexp(/[a-g][#+-]*/i).map(function(t){return t.toLowerCase()}).node("interval").desc("note"),dt=ot.a.regexp(/r/i).node("rest").desc("R"),pt=ot.a.alt(lt,ot.a.regexp(/[.^+\-\\]/)).many().node("length").desc("length"),mt=ot.a.string("&").node("slur"),gt=ot.a.seq(ot.a.alt(ht,dt),pt.or(ft).skip(ut),mt.or(ft).skip(ut)),bt=ot.a.seq(ot.a.alt(ot.a.regexp(/l/i).map(function(t){return t.toLowerCase()}).node("length_set").desc("L")),pt),vt=ot.a.seq(ot.a.alt(ot.a.regexp(/o/i).node("octave_set").desc("O"),ot.a.regexp(/q/i).node("quantize_set").desc("Q"),ot.a.regexp(/t/i).node("tempo_set").desc("T"),ot.a.regexp(/v/i).node("velocity_set").desc("V")),lt.node("amount")),yt=ot.a.alt(ot.a.string(">").node("octave_shift"),ot.a.string("<").node("octave_shift"));function wt(t){if(t.name&&"empty"==t.name)return!0;if(t.value){var e=t.value;if(e.hasOwnProperty("length")&&0==e.length)return!0}return!t}var Ct=ot.a.alt(gt,bt,vt,yt).skip(ut).many().map(function(t){return t.flat().filter(function(t){return!wt(t)})}),_t=function(){function t(e){it(this,t),this.token=e,this.index=0}return ct(t,[{key:"hasNext",value:function(){return this.index<this.token.length}},{key:"peek",value:function(){return this.token[this.index]||null}},{key:"next",value:function(){return this.token[this.index++]}},{key:"match",value:function(t){var e=this.peek();return e&&e.name===t}},{key:"expect",value:function(t){var e=this.peek();if(e&&e.name==t)return this.next();throw new SyntaxError("compile error: Invalid token! expected ".concat(t))}}]),t}(),Et=function(t){var e=1,n=0,a=4,r=1,o=8/15,i=1,s=!1,c=function(t,e){return t*e},u=function(t,e){var n=0,a=null,r=1;if(t.forEach(function(t){switch(t){case 0:break;case"+":case"^":r=1;break;case"-":case"\\":r=-1;break;case".":n+=a=a/2*r;break;default:n+=a=4/t*r;break}}),n<=0)throw new SyntaxError("compile error: Invalid length!");return n},l=[],f=function(t){l.push(R.a.merge({id:e++},t))},h=Ct.parse(t);if(!1===h.status){var d=h.expected.join(" or "),p=0,m=0;throw new SyntaxError("parse error: expected ".concat(d," line:").concat(p," col:").concat(m))}var g=new _t(h.value);while(g.hasNext()){var b=g,v=b.next(),y=void 0;switch(v.name){case"interval":y=b.match("length")?u(b.next().value):r,f({type:s?"pitch":"note",interval:String(v.value)+String(a),time:n,duration:b.match("slur")?y:c(y,i),velocity:o}),n+=y,s=!1;break;case"rest":y=b.match("length")?u(b.next().value):r,n+=y;break;case"octave_set":a=b.expect("amount").value;break;case"octave_shift":a+=">"==v.value?1:-1;break;case"length_set":r=u(b.expect("length").value);break;case"velocity_set":o=b.expect("amount").value/15;break;case"quantize_set":i=b.expect("amount").value/8;break;case"slur":s=!0;break}}return l},xt="T90L16REA>C<BEB>DC8E8<G+8>E8<AEA>C<BEB>DC8<A8R4R>ECE<A>C<EGF8A8>D8F8.D<B>D<GBDFE8G8>C8E8.C<A>C<F8>D8.<BGBE8>C8.<AFAD8B8>C4R4<RG>CED<G>DFE8G8<B8>G8C<G>CED<G>DFE8C8G8E8>C<AEACE<A>CD8F+8A8>C8<BGDG<B>D<GB>C8E8G8B8AF+D+F+<B>D<F+AG8>G8.ECE<A8>F+8.D<B>D<G8>E8.C<A>C<F+>GF+ED+F+<B>D+E4R4<<E2L16O2A8>A4G+8AEA>C<BEB>DC8<A8G+8E8AEA>C<BEB>DC8<A8>C8<A8>D<AFADF<A>C<B8>D8G8B8.GEGCE<GBA8>C8DF<B>D<G8B8>CE<A>C<F8D8G>GFGCG>CED<G>DFE8C8<B8G8>C<G>GED<G>DFE8C8R4RGEGCE<GBA8>C8E8G8F+ADF+<A>D<F+AG8B8>D8F+8EGCE<G>C<EGF+8A8B8>D+8RECE<A>CEGF+D<B>D<GB>DF+EC<A>C<F+A>C8.<B>C<AB8<B8>E>E<BGE<BGBE2",kt={namespaced:!0,state:{mml:xt,mmlError:null,sequence:Et(xt)},getters:{noteSequence:function(t){return t.sequence.filter(function(t){return"note"==t.type||"pitch"==t.type})}},mutations:{updateSequence:function(t,e){t.sequence=e},updateMml:function(t,e){t.mml=e},updateMmlError:function(t,e){t.mmlError=e}},actions:{noteOnTestTone:function(t,e){},noteOffTestTone:function(t){},changeMML:function(t,e){t.commit("updateMml",e);try{t.commit("updateSequence",Et(e)),t.commit("updateMmlError",null)}catch(n){t.dispatch("errorMML",n)}},errorMML:function(t,e){console.error(e.toString()),t.commit("updateMmlError",{msg:e.toString()})},changePianoRoll:function(t,e){t.commit("updateSequence",e)}}};a["default"].use(G["a"]);var Dt=new G["a"].Store({modules:{synth:kt}});a["default"].config.productionTip=!1,new a["default"]({router:at,store:Dt,render:function(t){return t(C)}}).$mount("#app")},"64a9":function(t,e,n){},"7c30":function(t,e,n){},bcc9:function(t,e,n){},c9c9:function(t,e,n){},cb7f:function(t,e,n){"use strict";var a=n("d316"),r=n.n(a);r.a},d316:function(t,e,n){}});
//# sourceMappingURL=app.43785623.js.map