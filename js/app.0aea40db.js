(function(t){function e(e){for(var a,i,s=e[0],c=e[1],u=e[2],l=0,h=[];l<s.length;l++)i=s[l],r[i]&&h.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);f&&f(e);while(h.length)h.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},o=[];function i(t){return s.p+"js/"+({about:"about"}[t]||t)+"."+{about:"dee836ec"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise(function(e,a){n=r[t]=[e,a]});e.push(n[2]=a);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(t),o=function(e){c.onerror=c.onload=null,clearTimeout(u);var n=r[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+a+": "+o+")");i.type=a,i.request=o,n[1](i)}r[t]=void 0}};var u=setTimeout(function(){o({type:"timeout",target:c})},12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/mc2413/",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var f=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("64a9"),r=n.n(a);r.a},"21bb":function(t,e,n){"use strict";var a=n("bcc9"),r=n.n(a);r.a},5556:function(t,e,n){"use strict";var a=n("7c30"),r=n.n(a);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("744f"),n("6c7b"),n("7514"),n("20d6"),n("1c4c"),n("6762"),n("cadf"),n("e804"),n("55dd"),n("d04f"),n("c8ce"),n("217b"),n("7f7f"),n("f400"),n("7f25"),n("536b"),n("d9ab"),n("f9ab"),n("32d7"),n("25c9"),n("9f3c"),n("042e"),n("c7c6"),n("f4ff"),n("049f"),n("7872"),n("a69f"),n("0b21"),n("6c1a"),n("c7c62"),n("84b4"),n("c5f6"),n("2e37"),n("fca0"),n("7cdf"),n("ee1d"),n("b1b1"),n("87f3"),n("9278"),n("5df2"),n("04ff"),n("f751"),n("4504"),n("fee7"),n("ffc1"),n("0d6d"),n("9986"),n("8e6e"),n("25db"),n("e4f7"),n("b9a1"),n("64d5"),n("9aea"),n("db97"),n("66c8"),n("57f0"),n("165b"),n("456d"),n("cf6a"),n("fd24"),n("8615"),n("551c"),n("097d"),n("df1b"),n("2397"),n("88ca"),n("ba16"),n("d185"),n("ebde"),n("2d34"),n("f6b3"),n("2251"),n("c698"),n("a19f"),n("9253"),n("9275"),n("3b2b"),n("3846"),n("4917"),n("a481"),n("28a5"),n("386d"),n("6b54"),n("4f7f"),n("8a81"),n("ac4d"),n("8449"),n("9c86"),n("fa83"),n("48c0"),n("a032"),n("aef6"),n("d263"),n("6c37"),n("9ec8"),n("5695"),n("2fdb"),n("d0b0"),n("5df3"),n("b54a"),n("f576"),n("ed50"),n("788d"),n("14b9"),n("f386"),n("f559"),n("1448"),n("673e"),n("242a"),n("c66f"),n("b05c"),n("34ef"),n("6aa2"),n("15ac"),n("af56"),n("b6e4"),n("9c29"),n("63d9"),n("4dda"),n("10ad"),n("c02b"),n("4795"),n("130f"),n("ac6a"),n("96cf"),n("0cdd");var a=n("2b0e"),r=n("5f5b");n("c9c9"),n("2dd8");a["default"].use(r["a"]);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",[n("b-navbar",{staticClass:"mb-2",attrs:{type:"dark",variant:"dark"}},[n("b-navbar-brand",[t._v("MC2413")]),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{to:"/"}},[t._v("Home")]),n("b-nav-item",{attrs:{to:"/about"}},[t._v("About")])],1)],1)],1)],1),n("b-container",[n("router-view")],1)],1)},i=[],s=n("8cc4"),c=n.n(s);function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function f(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}window.Tone=c.a;var h=function(){function t(){u(this,t),this.initSynth()}return f(t,[{key:"initSynth",value:function(){this.masterChannel=new c.a.Channel({volume:-10}).toMaster(),this.tone=new c.a.Synth({oscillator:{type:"square"},envelope:{attack:.005,decay:.1,sustain:.3,release:.01},portamento:0}).connect(this.masterChannel)}},{key:"noteOn",value:function(t,e,n){this.tone.triggerAttack(t,n,e)}},{key:"noteChange",value:function(t,e){this.tone.setNote(t,e)}},{key:"noteOff",value:function(t){this.tone.triggerRelease(t)}},{key:"noteOnOff",value:function(t,e,n,a){this.tone.triggerAttackRelease(t,e,n,a)}},{key:"connectStore",value:function(t){var e=this,n=null;t.subscribeAction(function(t,a){var r=t.type,o=t.payload;switch(r){case"synth/noteOnTestTone":n!=o&&(null===n?e.noteOn(o,.5):e.noteChange(o)),n=o;break;case"synth/noteOffTestTone":e.noteOff(),n=null;break;default:break}})}}]),t}(),d=c.a.Transport,p=function(){function t(e){u(this,t),this.synth=e,d.PPQ=192,d.loop=!1}return f(t,[{key:"connectStore",value:function(t){var e=this;this.store=t,t.subscribeAction(function(t,n){var a=t.type;t.payload;switch(a){case"synth/playSequence":"started"==d.state&&d.stop(0),e.storeEvent(n),d.start();break;case"synth/stopSequence":d.stop();break}})}},{key:"storeEvent",value:function(t){var e=this,n=this.synth;d.cancel(),this.indicator=new c.a.Loop(function(t){c.a.Draw.schedule(function(){e.store.dispatch("synth/tickSequence",c.a.Time(d.position).toTicks()/192)},t)}.bind(this),.01).start();t.synth.sequence.forEach(function(t){switch(t.type){case"bpm":d.bpm.value=t.bpm;break;case"note":case"pitch":d.schedule(function(a){n.noteOnOff(t.interval.replace(/\+/,"#"),c.a.Time(192*t.duration,"i"),a,t.velocity),c.a.Draw.schedule(function(){e.store.dispatch("synth/noteOn",t)},a),c.a.Draw.schedule(function(){e.store.dispatch("synth/noteOff",t)},c.a.Time(c.a.Time(a).toTicks()+192*t.duration,"i"))},c.a.Time(192*t.time,"i"));break}}.bind(this))}}]),t}(),m=function(){function t(){u(this,t),this.synth=new h,this.sequencer=new p(this.synth)}return f(t,[{key:"connectStore",value:function(t){this.synth.connectStore(t),this.sequencer.connectStore(t)}}]),t}(),b=m,y=new b,g={name:"root",mounted:function(){y.connectStore(this.$store)}},v=g,w=(n("034f"),n("2877")),C=Object(w["a"])(v,o,i,!1,null,null,null),_=C.exports,k=n("8c4f"),x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("b-row",{staticClass:"mb-2 pianoroll-control"},[n("b-col",{attrs:{xs:"4"}},[n("b-button",{attrs:{disabled:""}},[t._v("\n        scale:"+t._s(Number(t.pianoroll_scale).toFixed(2))+"\n      ")])],1),n("b-col",{attrs:{xs:"8"}},[n("b-form-input",{attrs:{type:"range",min:"0.5",max:"4",step:"0.25",variant:"secondary"},model:{value:t.pianoroll_scale,callback:function(e){t.pianoroll_scale=t._n(e)},expression:"pianoroll_scale"}})],1),n("b-col",{attrs:{xs:"4"}},[n("b-dropdown",{staticClass:"float-right",attrs:{text:"grid:"+t.pianoroll_quantize}},t._l(t.pianoroll_quantize_options,function(e){return n("b-dropdown-item",{key:e,on:{click:function(n){t.pianoroll_quantize=e}}},[t._v(t._s(e)+"\n        ")])}),1)],1)],1),n("piano-roll",{staticClass:"piano-roll mb-4",attrs:{scale:t.pianoroll_scale,quantize:t.pianoroll_quantize}}),n("b-row",{staticClass:"mb-4 tranport"},[n("b-col",{attrs:{sm:"12"}},[n("b-button-group",[n("b-button",{attrs:{variant:"success",id:"start-context"},on:{click:t.playTransport}},[t._v("Play")]),n("b-button",{on:{click:t.stopTransport}},[t._v("Stop")])],1),n("b-button",{attrs:{disabled:""}},[t.transportPlaying?n("b-spinner",{attrs:{small:"",type:"grow"}}):t._e(),t._v("\n        "+t._s(t.transportPositionBars)+"\n      ")],1)],1)],1),n("mml-editor")],1)},E=[],O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("codemirror",{ref:"cm",attrs:{value:t.mml,options:t.cmOptions}}),t.mmlError?n("b-alert",{staticClass:"mt-4",attrs:{show:"",variant:"danger"}},[t._v(t._s(t.mmlError.msg))]):t._e()],1)},S=[],D=n("2f62"),A=n("8f94"),q=(n("a7be"),n("5aeb"),n("31c5"),n("9948"),n("56b3")),G=n.n(q);function P(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){T(t,e,n[e])})}return t}function T(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}G.a.defineMode("text/mml",function(){return{token:function(t,e){return t.match(/[a-gr][+#-]*/i)?"operator":t.match(/[\d^&]+/)?"number":t.match(/[><tlvqo]/i)?"keyword":(t.next(),null)}}});var B={name:"mml-editor",components:{codemirror:A["codemirror"]},data:function(){return{cmOptions:{mode:"text/mml",theme:"mid-school2",lineNumbers:!0,line:!0,lineWrapping:!0,styleActiveLine:!0,styleSelectedText:!0}}},computed:P({codemirror:function(){return this.$refs.cm.codemirror}},Object(D["c"])("synth",{mml:"mml",mmlError:"mmlError"})),mounted:function(){var t=this.codemirror;this.initCodeMirror(t),this.$store.subscribeAction(function(e,n){if("synth/noteOn"==e.type){var a=e.payload,r=new G.a.Pos(a.start.line-1,a.start.column-1),o=new G.a.Pos(a.end.line-1,a.end.column-1);t.getDoc().setSelection(r,o)}})},methods:{initCodeMirror:function(t){var e=this;t.on("change",function(t,n){e.$store.dispatch("synth/changeMML",t.getValue())})}}},F=B,z=(n("cb7f"),Object(w["a"])(F,O,S,!1,null,null,null)),j=z.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"wrapper",attrs:{ondragstart:"return false;",ondrop:"return false;"}},[n("svg",[n("defs",[n("pattern",{attrs:{id:"ptn-grid",width:t.quantize_width*t.quantize,height:"112",patternUnits:"userSpaceOnUse",patternContentUnits:"userSpaceOnUse",x:32+t.grid_offset}},t._l(t.util.range(t.quantize),function(e){return n("g",{key:e,attrs:{transform:t.getTransform(e*t.quantize_width,0)}},[n("rect",{staticClass:"a",attrs:{y:"0",width:t.quantize_width,height:"112"}}),n("rect",{staticClass:"b",attrs:{y:"10",width:t.quantize_width,height:"9"}}),n("rect",{staticClass:"b",attrs:{y:"28",width:t.quantize_width,height:"9"}}),n("rect",{staticClass:"b",attrs:{y:"46",width:t.quantize_width,height:"9"}}),n("rect",{staticClass:"b",attrs:{y:"74",width:t.quantize_width,height:"10"}}),n("rect",{staticClass:"b",attrs:{y:"94",width:t.quantize_width,height:"9"}}),n("line",{class:t.getLineClass(e,t.quantize),attrs:{x1:"0",y1:"0",x2:"0",y2:"112"}}),n("line",{staticClass:"d",attrs:{x1:"0",y1:"0",x2:t.quantize_width,y2:"0"}}),n("line",{staticClass:"c",attrs:{x1:"0",y1:"64",x2:t.quantize_width,y2:"64"}})])}),0)]),n("g",{attrs:{transform:t.getTransform(0,-1*t.stage_pos.y,t.scale)}},[n("rect",{attrs:{x:"32",width:t.stage_width,height:112*t.octaves,fill:"url(#ptn-grid)"},on:{mousedown:function(e){return t.onDrag("start",e)},mouseup:function(e){return t.onDrag("end",e)},mousemove:function(e){return t.onDrag("move",e)},wheel:function(e){return e.preventDefault(),t.onDrag("wheel",e)}}}),n("g",{attrs:{id:"note",transform:t.getTransform(-1*t.stage_pos.x,0)}},t._l(t.note,function(e){return n("g",{key:e.id,attrs:{transform:t.getTransform(t.getXfromLength(e.time)+32,t.getYfromNote(e.interval))}},[n("rect",{staticClass:"note",attrs:{width:t.getXfromLength(e.duration),height:t.getHeightfromNote(e.interval),fill:t.getNoteColor(e),stroke:t.getNoteColor(e,!0)}}),t.scale>=2?n("text",{attrs:{transform:"translate(2 6.5)"}},[t._v("\n            "+t._s(t.getNoteName(e.interval))+"\n          ")]):t._e()])}),0),n("g",{attrs:{id:"piano"}},t._l(t.util.range(t.octaves),function(e){return n("g",{key:"key-"+e,attrs:{transform:t.getTransform(0,112*(9-e)),"data-octave":e},on:{mousedown:function(e){return t.onKeyboard("down",e)},mousemove:function(e){return t.onKeyboard("move",e)},mouseup:function(e){return t.onKeyboard("up",e)},mouseout:function(e){return t.onKeyboard("out",e)}}},[n("rect",{staticClass:"a",attrs:{y:"96",width:"32",height:"16","data-note":"c"}}),n("rect",{staticClass:"a",attrs:{y:"80",width:"32",height:"16","data-note":"d"}}),n("rect",{staticClass:"a",attrs:{y:"64",width:"32",height:"16","data-note":"e"}}),n("rect",{staticClass:"a",attrs:{y:"48",width:"32",height:"16","data-note":"f"}}),n("rect",{staticClass:"a",attrs:{y:"32",width:"32",height:"16","data-note":"g"}}),n("rect",{staticClass:"a",attrs:{y:"16",width:"32",height:"16","data-note":"a"}}),n("rect",{staticClass:"a",attrs:{y:"0",width:"32",height:"16","data-note":"b"}}),n("rect",{staticClass:"b",attrs:{y:"94",width:"20",height:"8","data-note":"c#"}}),n("rect",{staticClass:"b",attrs:{y:"74",width:"20",height:"8","data-note":"d#"}}),n("rect",{staticClass:"b",attrs:{y:"46",width:"20",height:"8","data-note":"f#"}}),n("rect",{staticClass:"b",attrs:{y:"28",width:"20",height:"8","data-note":"g#"}}),n("rect",{staticClass:"b",attrs:{y:"10",width:"20",height:"8","data-note":"a#"}}),n("text",{staticClass:"c",attrs:{transform:"translate(22 108)"}},[t._v("C"+t._s(e))])])}),0)])])])},N=[],L=n("6929"),$=n.n(L),R=n("2ef0"),K=n.n(R);function W(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){Y(t,e,n[e])})}return t}function Y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var U={C:{y:103,height:9},D:{y:84,height:10},E:{y:64,height:10},F:{y:55,height:9},G:{y:37,height:9},A:{y:19,height:9},B:{y:0,height:10},"C#":{y:94,height:9},"D#":{y:74,height:10},"F#":{y:46,height:9},"G#":{y:28,height:9},"A#":{y:10,height:9}},X="#2283e5",H="#855181",I="#e42222",J={name:"piano-roll",props:{scale:{type:Number,default:2},quantize:{type:Number,default:8},x:{type:Number,default:0},y:{type:String,default:"b4"}},data:function(){return{util:K.a,octaves:10,stage_pos:{x:0,y:0},stage_width:1e4,last_pos:null}},mounted:function(){var t=this;window.addEventListener("resize",this.updateStageWidth),this.updateStageWidth(),this.setStagePos(this.x*this.scale,this.getYfromNote(this.y)*this.scale),this.$store.subscribeAction(function(e,n){if("synth/tickSequence"==e.type){var a=e.payload,r=16*a*4;t.setStagePos(r>0?r:0,t.stage_pos.y)}if("synth/noteOn"==e.type){var o=e.payload;t.flushKeyboard(!0,o)}if("synth/noteOff"==e.type){var i=e.payload;t.flushKeyboard(!1,i,100)}})},beforeDestroy:function(){window.removeEventListener("resize",this.updateStageWidth)},computed:W({quantize_width:function(){return 256/this.quantize},grid_offset:function(){return this.stage_pos.x%(this.quantize_width*this.quantize)*-1}},Object(D["b"])("synth",{note:"noteSequence"})),watch:{scale:function(t,e){this.stage_pos.x*=t/e,this.stage_pos.y*=t/e,this.updateStageWidth()}},methods:{getTransform:function(t,e,n){var a="";return null!==t&&null!==e&&(a+="translate(".concat(t,",").concat(e,")")),n&&(a+=" scale(".concat(n,")")),a},getLineClass:function(t,e){return 0==t?"measure":t%(e/4)==0?"beat":"tick"},onDrag:function(t,e){switch(t){case"start":this.last_pos={x:e.offsetX,y:e.offsetY};break;case"move":e.buttons||(this.last_pos=null),null!==this.last_pos&&(this.setStagePos(this.stage_pos.x+(this.last_pos.x-e.offsetX)/this.scale,this.stage_pos.y+(this.last_pos.y-e.offsetY)/this.scale),this.last_pos={x:e.offsetX,y:e.offsetY});break;case"end":this.last_pos=null;break;case"wheel":this.setStagePos(this.stage_pos.x,this.stage_pos.y+e.deltaY/2/this.scale);break}},onKeyboard:function(t,e){var n=e.target.dataset.note+e.target.parentNode.dataset.octave;switch(t){case"down":this.$store.dispatch("synth/noteOnTestTone",n);break;case"up":this.$store.dispatch("synth/noteOffTestTone");break;case"move":e.buttons&&this.$store.dispatch("synth/noteOnTestTone",n);break;case"out":this.$store.dispatch("synth/noteOffTestTone");break}},updateStageWidth:function(){this.stage_width=this.$refs.wrapper.offsetWidth/this.scale},setStagePos:function(t,e){this.stage_pos.x=Math.max(0,t),this.stage_pos.y=Math.min(Math.max(0,e),1120*this.scale-this.$refs.wrapper.offsetHeight)},normalizeNote:function(t){var e={"A+":"A#","A-":"G#","B+":"C","B-":"A#","C+":"C#","C-":"B","D+":"D#","D-":"C#","E+":"F","E-":"D#","F+":"F#","F-":"E","G+":"G#","G-":"F#"},n=t.toUpperCase().match(/([A-G][#+-]*)(\d+)/);if(!n)return null;var a=n[1];return e[n[1]]&&(a=e[n[1]]),{name:a,org_name:n[1].toUpperCase(),octave:n[2]}},getNoteName:function(t){var e=this.normalizeNote(t);return e?e.org_name:""},getYfromNote:function(t){var e=this.normalizeNote(t);return e?112*(9-e.octave)+U[e.name].y:0},getHeightfromNote:function(t){var e=this.normalizeNote(t);return U[e.name].height},getXfromLength:function(t){return 16*t*4},getNoteColor:function(t,e){var n,a=t.velocity;return a>.5?(n=$()(H),n=n.mix($()(I),2*(a-.5))):(n=$()(X),n=n.mix($()(H),2*a)),e?n.darken(.5).rgb().string():n.rgb().string()},flushKeyboard:function(t,e,n){var a=this.normalizeNote(e.interval),r=a.name.toLowerCase(),o=a.octave,i=document.querySelector('#piano g[data-octave="'.concat(o,'"] rect[data-note="').concat(r,'"]'));i&&(n?setTimeout(function(){t?i.classList.add("active"):i.classList.remove("active")},n):t?i.classList.add("active"):i.classList.remove("active"))}}},Q=J,V=(n("5556"),Object(w["a"])(Q,M,N,!1,null,null,null)),Z=V.exports,tt=n("a8bf"),et=n.n(tt);function nt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){at(t,e,n[e])})}return t}function at(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var rt={name:"home",components:{MmlEditor:j,PianoRoll:Z},data:function(){return{pianoroll_scale:2,pianoroll_quantize:16,pianoroll_quantize_options:[32,24,16,12,9,8,4,3,2,1],transportPosition:0,initializedContext:!1}},computed:nt({transportPositionBars:function(){var t=K.a.padStart(Math.floor(this.transportPosition/4),3,"0"),e=Math.floor(this.transportPosition%4),n=K.a.padStart(Math.floor(this.transportPosition%1*16),2,"0");return"".concat(t,":").concat(e,":").concat(n)}},Object(D["c"])("synth",{transportPlaying:"transportPlaying"})),mounted:function(){var t=this;this.$store.subscribeAction(function(e,n){"synth/tickSequence"==e.type&&(t.transportPosition=e.payload)})},methods:{playTransport:function(){var t=this;this.initializedContext||et()(window.Tone.context,"#start-context").then(function(){t.initializedContext=!0}.bind(this)),this.$store.dispatch("synth/playSequence")},stopTransport:function(){this.$store.dispatch("synth/stopSequence")}}},ot=rt,it=(n("21bb"),Object(w["a"])(ot,x,E,!1,null,null,null)),st=it.exports;a["default"].use(k["a"]);var ct=new k["a"]({routes:[{path:"/",name:"home",component:st},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}]}),ut=n("ce47"),lt=n.n(ut);function ft(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ht(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function dt(t,e,n){return e&&ht(t.prototype,e),n&&ht(t,n),t}var pt=lt.a.regexp(/[ \t:\r\n]*/),mt=lt.a.regexp(/\d+/).map(function(t){return parseInt(t)}),bt=lt.a.of("").node("empty"),yt=lt.a.regexp(/[a-g][#+-]*/i).map(function(t){return t.toLowerCase()}).node("interval").desc("note"),gt=lt.a.regexp(/r/i).node("rest").desc("R"),vt=lt.a.alt(mt,lt.a.regexp(/[.^+\-\\]/)).many().node("length").desc("length"),wt=lt.a.string("&").node("slur"),Ct=lt.a.seq(lt.a.alt(yt,gt),vt.or(bt).skip(pt),wt.or(bt).skip(pt)),_t=lt.a.seq(lt.a.alt(lt.a.regexp(/l/i).map(function(t){return t.toLowerCase()}).node("length_set").desc("L")),vt),kt=lt.a.seq(lt.a.alt(lt.a.regexp(/o/i).node("octave_set").desc("O"),lt.a.regexp(/q/i).node("quantize_set").desc("Q"),lt.a.regexp(/t/i).node("bpm_set").desc("T"),lt.a.regexp(/v/i).node("velocity_set").desc("V")),mt.node("amount")).desc("number"),xt=lt.a.alt(lt.a.string(">").node("octave_shift"),lt.a.string("<").node("octave_shift"));function Et(t){if(t.name&&"empty"==t.name)return!0;if(t.value){var e=t.value;if(e.hasOwnProperty("length")&&0==e.length)return!0}return!t}var Ot=lt.a.alt(Ct,_t,kt,xt).skip(pt).many().map(function(t){return t.flat().filter(function(t){return!Et(t)})}),St=function(){function t(e){ft(this,t),this.token=e,this.index=0}return dt(t,[{key:"hasNext",value:function(){return this.index<this.token.length}},{key:"peek",value:function(){return this.token[this.index]||null}},{key:"prev",value:function(){return this.index>0&&this.token[this.index-1]||null}},{key:"next",value:function(){return this.token[this.index++]}},{key:"match",value:function(t){var e=this.peek();return e&&e.name===t}},{key:"expect",value:function(t){var e=this.peek();if(e&&e.name==t)return this.next();throw new SyntaxError("compile error: Invalid token! expected ".concat(t))}}]),t}(),Dt=function(t){var e=1,n=0,a=4,r=1,o=8/15,i=1,s=!1,c=function(t,e){return t*e},u=function(t,e){var n=0,a=null,r=1;if(t.forEach(function(t){switch(t){case 0:break;case"+":case"^":r=1;break;case"-":case"\\":r=-1;break;case".":n+=a=a/2*r;break;default:n+=a=4/t*r;break}}),n<=0)throw new SyntaxError("compile error: Invalid length!");return n},l=[],f=function(t){l.push(K.a.merge({id:e++},t))},h=Ot.parse(t);if(!1===h.status){var d=h.expected.join(" or "),p=0,m=0;throw new SyntaxError("parse error: expected ".concat(d," line:").concat(p," col:").concat(m))}var b=new St(h.value);while(b.hasNext()){var y=b,g=y.next(),v=void 0;switch(g.name){case"interval":v=y.match("length")?u(y.next().value):r,f({type:s?"pitch":"note",interval:String(g.value)+String(a),time:n,duration:y.match("slur")?v:c(v,i),velocity:o,start:g.start,end:y.prev().end}),n+=v,s=!1;break;case"rest":v=y.match("length")?u(y.next().value):r,n+=v;break;case"octave_set":a=y.expect("amount").value;break;case"octave_shift":a+=">"==g.value?1:-1;break;case"length_set":r=u(y.expect("length").value);break;case"velocity_set":o=y.expect("amount").value/15;break;case"quantize_set":i=y.expect("amount").value/8;break;case"slur":s=!0;break;case"bpm_set":f({type:"bpm",time:n,bpm:parseInt(y.expect("amount").value),start:g.start,end:y.prev().end});break}}return l},At="T90L16\nREA>C<BEB>DC8E8<G+8>E8 <AEA>C <BEB>DC8<A8R4R\n>ECE<A>C<EGF8A8>D8F8. D<B>D<GBDFE8G8>C8E8. C<A>C<F8>D8. <BGBE8>C8. <AFAD8B8>C4R4\n<RG>CED<G>DFE8G8<B8>G8 C<G>CED<G>DFE8C8G8E8 >C<AEACE<A>CD8F+8A8>C8< BGDG<B>D<GB>C8E8G8B8\nAF+D+F+<B>D<F+AG8>G8.ECE<A8>F+8.D<B>D<G8>E8.C<A>C<F+>GF+ED+F+<B>D+E4R4\n<<E2L16O2A8>A4G+8AEA>C<BEB>DC8<A8G+8E8AEA>C<BEB>DC8<A8>C8<A8>D<AFADF<A>C<B8>D8G8B8.\nGEGCE<GBA8>C8DF<B>D<G8B8>CE<A>C<F8D8G>GFGCG>CED<G>DFE8C8<B8G8>C<G>GED<G>DFE8C8R4RGEGCE<GBA8>C8E8G8\nF+ADF+<A>D<F+AG8B8>D8F+8EGCE<G>C<EGF+8A8B8>D+8RECE<A>CEGF+D<B>D<GB>DF+EC<A>C<F+A>C8.<B>C<AB8<B8>E>E<BGE<BGBE2",qt={namespaced:!0,state:{mml:At,mmlError:null,sequence:Dt(At),transportPlaying:!1},getters:{noteSequence:function(t){return t.sequence.filter(function(t){return"note"==t.type||"pitch"==t.type})}},mutations:{updateSequence:function(t,e){t.sequence=e},updateMml:function(t,e){t.mml=e},updateMmlError:function(t,e){t.mmlError=e},updateTransportPlaying:function(t,e){t.transportPlaying=e}},actions:{noteOnTestTone:function(t,e){},noteOffTestTone:function(t){},changeMML:function(t,e){t.commit("updateMml",e);try{t.commit("updateSequence",Dt(e)),t.commit("updateMmlError",null)}catch(n){t.dispatch("errorMML",n)}},errorMML:function(t,e){console.error(e.toString()),t.commit("updateMmlError",{msg:e.toString()})},changePianoRoll:function(t,e){t.commit("updateSequence",e)},playSequence:function(t){t.commit("updateTransportPlaying",!0)},stopSequence:function(t){t.commit("updateTransportPlaying",!1)},tickSequence:function(t,e){},noteOn:function(t,e){},noteOff:function(t,e){}}};a["default"].use(D["a"]);var Gt=new D["a"].Store({modules:{synth:qt}});a["default"].config.productionTip=!1,new a["default"]({router:ct,store:Gt,render:function(t){return t(_)}}).$mount("#app")},"5aeb":function(t,e,n){},"64a9":function(t,e,n){},"7c30":function(t,e,n){},bcc9:function(t,e,n){},c9c9:function(t,e,n){},cb7f:function(t,e,n){"use strict";var a=n("d316"),r=n.n(a);r.a},d316:function(t,e,n){}});
//# sourceMappingURL=app.0aea40db.js.map