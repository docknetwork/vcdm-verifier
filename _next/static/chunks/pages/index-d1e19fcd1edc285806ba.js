(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{54520:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return J},isString:function(){return I}});var r=e(39227),o=e(809),i=e.n(o),a=e(92447),c=e(26265),s=e(67294),u=e(86010),l=e(41120),p=e(22318),f=e(80624),d=e(32143),h=e(282),g=e(12112),b=e(43832),m=e(63144),v=e.n(m),x=e(29973),w=e(81395),y=e(72063),Z=e(85925),k=e(41749),P=e(95477),O=e(72655),S=e(10421),j=e(1939),C=s.createElement;function N(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function E(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?N(Object(e),!0).forEach((function(t){(0,c.Z)(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):N(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}var W=new O.BT({dock:new O.ZZ(j.ZP)},new O.oz("https://uniresolver.io")),_="wss://mainnet-node.dock.io";function B(n){return D.apply(this,arguments)}function D(){return(D=(0,a.Z)(i().mark((function n(t){var e,r,o,a,c;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,j.ZP.api&&j.ZP.api.isConnected){n.next=5;break}return delete j.ZP.api,n.next=5,j.ZP.init({address:_});case 5:n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.error("Connecting to node failed",n.t0);case 10:if(r={resolver:W,compactProof:!0,forceRevocationCheck:!0,schemaApi:{dock:j.ZP},revocationApi:{dock:j.ZP}},!t.verifiableCredential){n.next=18;break}return o=t.proof,a=o.challenge,c=o.domain,n.next=15,(0,S.hb)(t,E(E({},r),{},{challenge:a,domain:c}));case 15:e=n.sent,n.next=21;break;case 18:return n.next=20,(0,S.Dv)(t,r);case 20:e=n.sent;case 21:if(e){n.next=23;break}throw new Error("No presentation or credential provided");case 23:if(!e.verified){n.next=25;break}return n.abrupt("return",e);case 25:throw e.error.errors||e.error;case 26:case"end":return n.stop()}}),n,null,[[0,7]])})))).apply(this,arguments)}var T=function(n){var t=n.credential,e=n.handleClose,r=(0,s.useState)(),o=r[0],c=r[1],u=(0,s.useState)(),l=u[0],f=u[1];function d(){return(d=(0,a.Z)(i().mark((function n(t){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,B(t);case 3:c(!0),n.next=11;break;case 6:n.prev=6,n.t0=n.catch(0),console.error("Verification failed: ",n.t0),n.t0&&f(n.t0.length?n.t0:[n.t0]),c(!1);case 11:case"end":return n.stop()}}),n,null,[[0,6]])})))).apply(this,arguments)}(0,s.useEffect)((function(){t&&(c(null),f(null),function(n){d.apply(this,arguments)}(t))}),[t]);return C(s.Fragment,null,t&&C(s.Fragment,null,C(Z.Z,{p:3,bgcolor:"background.default"},C(p.Z,{variant:"h6",gutterBottom:!0},"Presentation"),!1),C(Z.Z,{p:3},t.issuer&&C(p.Z,{variant:"body2",noWrap:!0,gutterBottom:!0},"Issuer: ",JSON.stringify(t.issuer)),t.type&&C(p.Z,{variant:"body2",noWrap:!0,gutterBottom:!0},"Type: ",JSON.stringify(t.type)),t.proof&&C(p.Z,{variant:"body2",noWrap:!0,gutterBottom:!0},"Proof type: ",t.proof.type,C("br",null),"Proof date: ",t.proof.created),t.issuanceDate&&C(p.Z,{variant:"body2",noWrap:!0,gutterBottom:!0},"Issue date: ",t.issuanceDate),t.expirationDate&&C(p.Z,{variant:"body2",noWrap:!0,gutterBottom:!0},"Expiration date: ",t.expirationDate),C("br",null),C(k.Z,{container:!0,spacing:1,direction:"row",alignItems:"center"},C(k.Z,{item:!0,xs:2},!0===o?C(w.Z,{color:"primary",style:{width:"54px",height:"54px",transform:"translate(-5px, 0)"}}):!1===o?C(y.Z,{color:"error",style:{width:"54px",height:"54px",transform:"translate(-5px, 0)"}}):C("div",{style:{paddingBottom:"5px",paddingTop:"4px"}},C(P.Z,{thickness:4,size:45}))),C(k.Z,{item:!0,xs:10},C(p.Z,{variant:"body1"},!0===o?"Verified":!1===o?"Credential is not valid":"Verifying the credential..."))),C("br",null),!1===o&&l.map((function(n,t){return C(Z.Z,{bgcolor:"error.light",color:"error.dark",p:2,key:t},C(p.Z,{component:"pre",variant:"body2",gutterBottom:!0,style:{whiteSpace:"pre-wrap",wordWrap:"break-word"}},n.stack||n.name))}))),o&&C(Z.Z,{p:3,style:{marginTop:"auto"}},C(h.Z,{endIcon:C(x.Z,null),variant:"contained",onClick:e,fullWidth:!0},"Verify another credential"))))},z=s.createElement,R=(0,l.Z)((function(n){return{content:(0,c.Z)({justifyContent:"center",flexGrow:1,padding:n.spacing(3),transition:n.transitions.create("margin",{easing:n.transitions.easing.sharp,duration:n.transitions.duration.leavingScreen}),marginRight:0,paddingTop:"100px"},n.breakpoints.down("sm"),{paddingLeft:"0",paddingRight:"0"}),contentShift:{transition:n.transitions.create("margin",{easing:n.transitions.easing.easeOut,duration:n.transitions.duration.enteringScreen}),marginRight:400},dropzone:{transition:"all 0.2s ease-in-out",backgroundColor:n.palette.background.paper,minHeight:"250px",width:"100%"},textInput:{border:0,borderRadius:3,margin:"20px 0 0 0",color:"black"},dropzoneText:{padding:"2.5% 5%",fontSize:12},submitButton:{float:"right"},drawer:{maxWidth:400,width:"100%",flexShrink:0},drawerPaper:{width:"100%",maxWidth:400},bottomLink:{color:"#2887de"}}}));function I(n){return"string"===typeof n||n instanceof String}var J=function(){var n=R(),t=(0,s.useState)(!1),e=t[0],o=t[1],l=(0,s.useState)({json:null,text:""}),m=l[0],x=l[1],w=function(){var n=(0,a.Z)(i().mark((function n(t){var e,r,a;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!(r=t.target.value)){n.next=19;break}if(!I(i=r)||!new RegExp("^\\w+:\\/?\\/?[^\\s]+$").test(i)){n.next=16;break}return n.prev=3,n.next=6,v()(r);case 6:return a=n.sent,n.next=9,a.json();case 9:e=n.sent,n.next=14;break;case 12:n.prev=12,n.t0=n.catch(3);case 14:n.next=17;break;case 16:try{e=JSON.parse(r)}catch(c){}case 17:n.next=20;break;case 19:o(!1);case 20:x({json:e,text:r});case 22:case"end":return n.stop()}var i}),n,null,[[3,12]])})));return function(t){return n.apply(this,arguments)}}();function y(n){n.preventDefault(),o(!0)}var Z=z(s.Fragment,null,z("u",null,"Choose JSON file")," (or drag & drop your file)",z("br",null),z(f.Z,{name:"json",onChange:w,onClick:function(n){n.stopPropagation()},fullWidth:!0,required:!0,multiline:!0,rowsMax:10,rows:1,value:m.text,className:n.textInput,label:"Credential/Presentation URL or JSON",placeholder:"{ ... }",variant:"filled"}));return z(s.Fragment,null,z("div",{className:(0,u.Z)(n.content,(0,c.Z)({},n.contentShift,e))},z(b.Z,{maxWidth:"md"},z("center",null,z(p.Z,{variant:"h1",gutterBottom:!0},"W3C Credential Verifier")),z("br",null),z("form",{onSubmit:y},z(d.A,{acceptedFiles:["application/json"],filesLimit:1,dropzoneText:Z,dropzoneParagraphClass:n.dropzoneText,onDrop:function(){var n=(0,a.Z)(i().mark((function n(t){var e,o,a;return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e=(0,r.Z)(t,1),o=e[0],(a=new FileReader).onload=function(n){var t=JSON.parse(n.target.result);x({json:t,text:JSON.stringify(t,null,2)}),y(n)},a.readAsText(o);case 4:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),showPreviews:!1,showPreviewsInDropzone:!1,showAlerts:!0,rows:1,dropzoneClass:n.dropzone}),z("br",null),z(h.Z,{className:n.submitButton,variant:"contained",color:"primary",type:"submit",disabled:!m.json},"Verify"))),z("br",null),z("br",null),z(b.Z,{maxWidth:"md"},z("center",null,z("br",null),z(p.Z,{variant:"body2"},"This verifier is open source and\xa0",z("a",{href:"https://github.com/docknetwork/vcdm-verifier",target:"_blank",rel:"noreferrer noopener",className:n.bottomLink},"hosted at GitHub"),"."),z("br",null)))),z(g.ZP,{className:n.drawer,variant:"persistent",anchor:"right",open:e,classes:{paper:n.drawerPaper}},z(T,{handleClose:function(){o(!1),x({json:null,text:""})},credential:e&&m.json})))}},78581:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(54520)}])},51557:function(){},93399:function(){},80950:function(){},46601:function(){},89214:function(){},71922:function(){},2363:function(){},8623:function(){},77283:function(){},72200:function(){},69790:function(){},82906:function(){},28981:function(){},82189:function(){},39601:function(){},58391:function(){},73656:function(){},89647:function(){},7748:function(){},85568:function(){},664:function(){},28297:function(){},16924:function(){},6055:function(){},96642:function(){},75877:function(){},56619:function(){},62678:function(){},25819:function(){},24112:function(){},77108:function(){},97670:function(){},10218:function(){},51526:function(){},52361:function(){},94616:function(){}},function(n){n.O(0,[845,121,774,888,179],(function(){return t=78581,n(n.s=t);var t}));var t=n.O();_N_E=t}]);