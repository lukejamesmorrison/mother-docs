import{_ as q,c as z,o as F,h as j,i as D,a as C,d as K,e as M,b as R,w as O,r as V}from"./app-WBceOhT5.js";const G=.015,X={__name:"MotherOSAnimation",setup(B,{expose:s}){s();const n=j(null);let u="#0000ff",m=200,h=200;class w{constructor({id:e,name:a,x:g,y:f,image:r,pulseColor:o}){this.id=e,this.name=a,this.x=g,this.y=f,this.image=r,this.pulseColor=o,this.targets=[]}connect(e){this.targets.push({target:e,progress:0,active:!1})}trigger(e){this.targets.forEach(a=>{a.progress=0,a.active=!0,a.pulseColor=e})}update(){for(const e of this.targets)e.active&&(e.progress+=G,e.progress>=1&&(e.progress=1,e.active=!1,e.target.trigger(this.pulseColor)))}drawLines(e,a,g){for(const f of this.targets){const{target:r,progress:o,active:p,pulseColor:y}=f,d=this.x*m+a,l=this.y*h+g,_=r.x*m+a,k=r.y*h+g;if(e.lineWidth=4,e.strokeStyle="#ccc",e.beginPath(),e.moveTo(d,l),e.lineTo(_,k),e.stroke(),p){const I=d+(_-d)*o,S=l+(k-l)*o,E=12;e.beginPath(),e.arc(I,S,E,0,Math.PI*2),e.fillStyle=y||"#0000ff",e.fill()}}}drawNode(e,a,g,f=!1){const r=Math.min(m,h)*.8,o=this.x*m+a,p=this.y*h+g,y=o-r/2,d=p-r/2;e.drawImage(this.image,y,d,r,r),e.font="20px sans-serif",e.fillStyle="#333",e.textAlign="center",e.textBaseline="top",e.fillText(this.name,o,d+r+4)}}D(()=>{const c=n.value.getContext("2d"),e=window.devicePixelRatio||1,a=()=>{const t=n.value.getBoundingClientRect();n.value.width=t.width*e,n.value.height=t.height*e,n.value.style.width=`${t.width}px`,n.value.style.height=`${t.height}px`,l.length&&E()},g=[{id:"root1",name:"Button",x:1,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/f/f2/Small_Button_Panel.png",targets:["child1"],pulseColor:"#E3B505"},{id:"root2",name:"Connector",x:1,y:4,img:"https://static.wikia.nocookie.net/spaceengineers/images/7/7c/Icon_Block_Connector.png",targets:["child2"],pulseColor:"#E3B505"},{id:"child1",name:"Mother",x:2,y:3,img:"images/logo-512x512.png",targets:["grand3","grand5","greatgrand1"],pulseColor:"#E3B505"},{id:"child2",name:"",x:2,y:3,img:"images/logo-512x512.png",targets:["grand1","grand4"],pulseColor:"#E3B505"},{id:"grand1",name:"Piston",x:3,y:1,img:"https://static.wikia.nocookie.net/spaceengineers/images/2/28/Icon_Block_Piston.png",targets:[],pulseColor:"#E3B505"},{id:"grand3",name:"Rotor",x:4,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png",targets:[],pulseColor:"#E3B505"},{id:"grand4",name:"Landing Gear",x:4,y:4,img:"https://static.wikia.nocookie.net/spaceengineers/images/2/2d/Icon_Block_Landing_Gear.png",targets:[],pulseColor:"#E3B505"},{id:"grand5",name:"Programmable Block",x:3,y:5,img:"https://static.wikia.nocookie.net/spaceengineers/images/7/76/Icon_Block_Programmable_Block.png",targets:[],pulseColor:"#E3B505"},{id:"greatgrand1",name:"Mother",x:6,y:3,img:"images/logo-512x512.png",targets:["greatgreatgrand1","greatgreatgrand2"],pulseColor:"#E3B505"},{id:"greatgreatgrand1",name:"Sound Block",x:7,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/4/4e/Icon_Block_Sound_Block.png",targets:[],pulseColor:"#E3B505"},{id:"greatgreatgrand2",name:"Light",x:7,y:4,img:"https://static.wikia.nocookie.net/spaceengineers/images/2/21/Icon_Block_Interior_Light.png",targets:[],pulseColor:"#E3B505"}],f={};let r=0,o=0;const p=["root1","root2"];let y=0,d=0,l=[];const _=g.length;for(const t of g){const i=new Image;i.src=t.img,i.onload=()=>{r++,r===_&&A()},t.image=i,f[t.id]=new w(t)}function k(){l.forEach(t=>{t.targets.forEach(i=>{i.progress=0,i.active=!1})})}function I(){k();const t=f[p[o]];u=t.pulseColor||"#0000ff",t.trigger(u)}function S(){return l.every(t=>t.targets.every(i=>i.active===!1))}function E(){const t=n.value.width,i=n.value.height,b=Math.min(...l.map(v=>v.x)),N=Math.max(...l.map(v=>v.x)),L=Math.min(...l.map(v=>v.y)),H=Math.max(...l.map(v=>v.y)),W=N-b+1,T=H-L+1,x=.1;m=t/(W+x*2),h=i/(T+x*2),y=-b*m+t*x,d=-L*h+i*x}function A(){for(const t of g){const i=f[t.id];for(const b of t.targets)i.connect(f[b])}l=Object.values(f),E(),I(),$()}function $(){c.clearRect(0,0,n.value.width,n.value.height),l.forEach(t=>t.update()),l.forEach(t=>t.drawLines(c,y,d)),l.forEach(t=>{t.drawNode(c,y,d,p[o]===t.id)}),S()&&(o=(o+1)%p.length,I()),requestAnimationFrame($)}a(),window.addEventListener("resize",a)});const P={canvas:n,PULSE_SPEED:G,get currentPulseColor(){return u},set currentPulseColor(c){u=c},get unitWidth(){return m},set unitWidth(c){m=c},get unitHeight(){return h},set unitHeight(c){h=c},Node:w,onMounted:D,ref:j};return Object.defineProperty(P,"__isScriptSetup",{enumerable:!1,value:!0}),P}},Y={ref:"canvas",class:"w-full",style:{height:"400px","max-width":"100%",margin:"auto"}};function J(B,s,n,u,m,h){return F(),z("canvas",Y,null,512)}const Q=q(X,[["render",J],["__scopeId","data-v-65b581eb"],["__file","MotherOSAnimation.vue"]]),U=.015,Z={__name:"MotherCoreAnimation",setup(B,{expose:s}){s();const n=j(null);let u=1;window.innerWidth<768||window.innerWidth<1024?u=1.3:u=1;let m=100,h=100;class w{constructor({id:e,name:a,x:g,y:f,image:r,pulseColor:o}){this.id=e,this.name=a,this.x=g,this.y=f,this.image=r,this.pulseColor=o,this.targets=[]}connect(e){this.targets.push({target:e,progress:0,active:!1})}trigger(e){for(const a of this.targets)a.progress=0,a.active=!0,a.pulseColor=e}update(){for(const e of this.targets)e.active&&(e.progress+=U,e.progress>=1&&(e.progress=1,e.active=!1,e.target.trigger(this.pulseColor)))}drawLines(e,a,g){for(const f of this.targets){const{target:r,progress:o,active:p,pulseColor:y}=f,d=this.x*m+a,l=this.y*h+g,_=r.x*m+a,k=r.y*h+g;if(e.lineWidth=4,e.strokeStyle="#ccc",e.beginPath(),e.moveTo(d,l),e.lineTo(_,k),e.stroke(),p){const I=d+(_-d)*o,S=l+(k-l)*o;e.beginPath(),e.arc(I,S,12*u,0,Math.PI*2),e.fillStyle=y||"#0000ff",e.fill()}}}drawNode(e,a,g,f=!1){const r=this.x*m+a,o=this.y*h+g,p=Math.min(m,h)*.4*u,y=r-p/2,d=o-p/2;e.drawImage(this.image,y,d,p,p),e.font=`${14*u}px sans-serif`,e.fillStyle="#333",e.textAlign="center",e.textBaseline="top",e.fillText(this.name,r,d+p+4)}}D(()=>{const c=n.value.getContext("2d"),e=window.devicePixelRatio||1,a=[{id:"mother",name:"Mother",x:3,y:1,img:"images/logo-512x512.png",targets:["module2","module3","module4"],pulseColor:"#E3B505"},{id:"mother2",name:"",x:3,y:1,img:"images/logo-512x512.png",targets:["module3","module5"],pulseColor:"#E3B505"},{id:"module1",name:"Piston Module",x:1,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/f/f2/Small_Button_Panel.png",targets:["mother"],pulseColor:"#E3B505"},{id:"module2",name:"Flight Control Module",x:2,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/7/7c/Icon_Block_Connector.png",targets:[],pulseColor:"#E3B505"},{id:"module3",name:"Weapons Module",x:3,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/2/28/Icon_Block_Piston.png",targets:[],pulseColor:"#E3B505"},{id:"module4",name:"Light Module",x:4,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png",targets:["mother2"],pulseColor:"#E3B505"},{id:"module5",name:"Antenna Module",x:5,y:2,img:"https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png",targets:[],pulseColor:"#E3B505"}],g={},f=a.length;let r=0,o=[],p=0,y=0;const d=["module1","module4"];let l=0;for(const t of a){const i=new Image;i.src=t.img,i.onload=()=>{r++,r===f&&$()},t.image=i,g[t.id]=new w(t)}function _(){const t=n.value.getBoundingClientRect();n.value.width=t.width*e,n.value.height=t.height*e,n.value.style.width=`${t.width}px`,n.value.style.height=`${t.height}px`,c.setTransform(1,0,0,1,0,0),c.scale(e,e),o.length&&k()}function k(){const t=n.value.clientWidth,i=n.value.clientHeight,b=Math.min(...o.map(v=>v.x)),N=Math.max(...o.map(v=>v.x)),L=Math.min(...o.map(v=>v.y)),H=Math.max(...o.map(v=>v.y)),W=N-b+1,T=H-L+1,x=.1;m=Math.min(t/(W+x*2)*u,t/W),h=i/(T+x*2)*u,p=-b*m+t*x,y=-L*h+i*x}function I(){o.forEach(t=>{t.targets.forEach(i=>{i.progress=0,i.active=!1})})}function S(){I();const t=g[d[l]];t.trigger(t.pulseColor||"#0000ff")}function E(){return o.every(t=>t.targets.every(i=>!i.active))}function A(){c.clearRect(0,0,n.value.width,n.value.height),o.forEach(t=>t.update()),o.forEach(t=>t.drawLines(c,p,y)),o.forEach(t=>t.drawNode(c,p,y,d[l]===t.id)),E()&&(l=(l+1)%d.length,S()),requestAnimationFrame(A)}function $(){for(const t of a){const i=g[t.id];for(const b of t.targets)i.connect(g[b])}o=Object.values(g),k(),S(),A()}_(),window.addEventListener("resize",_)});const P={canvas:n,PULSE_SPEED:U,get layoutScale(){return u},set layoutScale(c){u=c},get unitWidth(){return m},set unitWidth(c){m=c},get unitHeight(){return h},set unitHeight(c){h=c},Node:w,ref:j,onMounted:D};return Object.defineProperty(P,"__isScriptSetup",{enumerable:!1,value:!0}),P}},ee={class:"full-width-wrapper"},te={ref:"canvas",class:"canvas-full"};function oe(B,s,n,u,m,h){return F(),z("div",ee,[C("canvas",te,null,512)])}const ne=q(Z,[["render",oe],["__scopeId","data-v-ed775d04"],["__file","MotherCoreAnimation.vue"]]),ae={__name:"index.html",setup(B,{expose:s}){s();const n={MotherOSAnimation:Q,MotherCoreAnimation:ne};return Object.defineProperty(n,"__isScriptSetup",{enumerable:!1,value:!0}),n}};function ie(B,s,n,u,m,h){const w=V("RouteLink");return F(),z("div",null,[s[5]||(s[5]=C("h2",{id:"mother-os",tabindex:"-1"},[C("a",{class:"header-anchor",href:"#mother-os"},[C("span",null,"Mother OS")])],-1)),s[6]||(s[6]=C("p",null,[C("strong",null,"Ingame Script"),M(" for Space Engineers players.")],-1)),s[7]||(s[7]=C("p",null,"Unlock advanced automation, flight planning, and intergrid communication.",-1)),C("p",null,[R(w,{to:"/IngameScript/IngameScript.html"},{default:O(()=>s[0]||(s[0]=[M("Get Started")])),_:1}),s[3]||(s[3]=M(" | ")),R(w,{to:"/IngameScript/CommandCheatsheet.html"},{default:O(()=>s[1]||(s[1]=[M("Command Cheatsheet")])),_:1}),s[4]||(s[4]=M(" | ")),R(w,{to:"/IngameScript/Examples.html"},{default:O(()=>s[2]||(s[2]=[M("Examples")])),_:1})]),C("div",null,[R(u.MotherOSAnimation)]),s[8]||(s[8]=K('<br><br><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>Mother is in beta development. I&#39;m on a quest to reduce the character count, and increase the functionality. Please report any issues you encounter, and expect some of the commands and underlying framework to change.</p></div><h2 id="mother-core" tabindex="-1"><a class="header-anchor" href="#mother-core"><span>Mother Core</span></a></h2><p>Script Framework for custom Space Engineers ingame scripts.</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>Mother Core is coming soon as a downloadable script framework for Space Engineers written in C#6. It depends on <a href="https://github.com/malforge/mdk2/wiki" target="_blank" rel="noopener noreferrer">MDK2</a>. Stay tuned for updates!</p></div><h2 id="about-agentluke" tabindex="-1"><a class="header-anchor" href="#about-agentluke"><span>About Agentluke</span></a></h2><p>I have always been passionate about aviation and space. I studied Aerospace Engineering, and flew in fighter jets in the Air Force for over a decade. I have been writing software since university, and I have always been fascinated by the intersection of software and hardware.</p><p>I discovered Space Engineers several years ago after my brother had been playing it for some time. I was immediately hooked. Sandbox games and builders are my jam, and Space Engineers is an excellent space sandbox. I find the automation capabilties quite clunky and require a lot of menu navigation, but curiousity got the best of me as I explored what the programmable block could do!</p><p>I built Mother to make my ships operate more like intelligent spaceships, rather than just a collection of blocks flying through space. This project has been a labor of love for about 18 months. I hope you enjoy using Mother as much as I enjoyed building it.</p><p><strong>Luke</strong> - Space Engineer 🚀🇨🇦</p><h2 id="thanks" tabindex="-1"><a class="header-anchor" href="#thanks"><span>Thanks</span></a></h2><p><strong>Malware</strong> has made done critical foundational work by building the <a href="https://github.com/malware-dev/MDK-SE/wiki" target="_blank" rel="noopener noreferrer">MDK-SE API Index</a> and <a href="https://github.com/malforge/mdk2/wiki" target="_blank" rel="noopener noreferrer">MDK2</a>. Without these tools, developing a framwork of this complexity would not have been possible. Cheers mate 🍻</p><h2 id="contributions" tabindex="-1"><a class="header-anchor" href="#contributions"><span>Contributions</span></a></h2><p>Contributions are welcome. If you see where this documentation can be improved, please let me know or submit the change request!</p>',15))])}const re=q(ae,[["render",ie],["__file","index.html.vue"]]),le=JSON.parse('{"path":"/","title":"Home","lang":"en-US","frontmatter":{"home":true,"title":"Home","actions":[{"text":"Mother OS","link":"/IngameScript/IngameScript.md","type":"primary"}],"features":[{"title":"Intuitive Command Library","details":"Control most common block operations with a simple command line interface."},{"title":"Dynamic Flight Planning","details":"Create flight plans using GPS waypoints and fly them with ease."},{"title":"Secure Communication","details":"Send encrypted commands to other grids to supercharge cooperation."}],"footer":"MIT Licensed | © 2025 Agentluke | The Empire must grow."},"git":{"updatedTime":1744933175000,"contributors":[{"name":"Luke Morrison","username":"","email":"lukejamesmorrison@gmail.com","commits":3}],"changelog":[{"hash":"15ee173564b47688d911d239bf1296182577deca","time":1744933175000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Update docs"},{"hash":"db312309835110752ea2b209f7c3efbf6e7d9264","time":1744758309000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"dev initial commit"},{"hash":"7c2fb0716f1b3a7b9765a5e6872cb915206257b5","time":1742428082000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Initial commit"}]},"filePathRelative":"README.md"}');export{re as comp,le as data};
