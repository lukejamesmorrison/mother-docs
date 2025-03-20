import{_ as o,c as p,a as s,b as t,e as n,d as i,w as l,r as c,o as r}from"./app-COrgWIto.js";const d={};function u(m,a){const e=c("RouteLink");return r(),p("div",null,[a[12]||(a[12]=s("h1",{id:"examples",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#examples"},[s("span",null,"Examples")])],-1)),s("p",null,[a[1]||(a[1]=n("Let's look at some examples and how Mother simplifies them. See the ")),i(e,{to:"/IngameScript/CommandCheatsheet.html"},{default:l(()=>a[0]||(a[0]=[n("Command Cheatsheet")])),_:1}),a[2]||(a[2]=n(" for a complete list of available commands."))]),a[13]||(a[13]=t(`<ol><li><a href="#drill-deployment">Drill Deployment</a></li><li><a href="#welder-arm-actuation">Welder Arm Actuation</a></li><li><a href="#multi-destination-flight-automation">Multi-destination Flight Automation</a></li><li><a href="#dispatch-ship-to-a-landing-site-via-a-flight-plan">Dispatch Ship to a Landing Site via a Flight Plan</a></li></ol><h2 id="drill-deployment" tabindex="-1"><a class="header-anchor" href="#drill-deployment"><span>Drill Deployment</span></a></h2><p>In our drill deployment we want to:</p><ol><li>Open a hatch connected by a hinge (<code>DrillHinge</code>)</li><li>Rotate a rotor (<code>DrillRotor</code>) to 65 degrees</li><li>Begin extending piston (<code>DrillPiston</code>) to a specific distance, at a specific speed</li></ol><p>Lets break this down into a routine:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Open the hatch (move to zero degrees)</span></span>
<span class="line">hinge/rotate DrillHinge <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment"># Rotate the rotor to 65 degrees</span></span>
<span class="line">rotor/rotate DrillRotor <span class="token number">65</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment"># Extend the piston to 10 meters, at 0.2 m/s</span></span>
<span class="line">piston/distance DrillPiston <span class="token number">10</span> <span class="token parameter variable">--speed</span><span class="token operator">=</span><span class="token number">0.2</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>Putting these together, you can create a routine by adding the following to the <code>[Commands]</code> section of the grid&#39;s <strong>Custom Data</strong>.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Commands</span><span class="token punctuation">]</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">; We can take advantage of the multi-line syntax</span></span>
<span class="line"><span class="token key attr-name">DeployDrill</span><span class="token punctuation">=</span></span>
<span class="line">| hinge/rotate DrillHinge 0;</span>
<span class="line">| rotor/rotate DrillRotor 65;</span>
<span class="line"><span class="token key attr-name">| piston/distance DrillPiston 10 --speed</span><span class="token punctuation">=</span><span class="token value attr-value">0.2;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>Now we can run the Programmable Block with the argument <code>DeployDrill</code> and your system should begin to operate. This can easily be assigned to a button now.</p><div class="hint-container important"><p class="hint-container-title">Important</p><p>Don&#39;t forget to <code>Recompile</code> Mother when you update the Custom Data in the Programmable Block.</p></div><h2 id="welder-arm-actuation" tabindex="-1"><a class="header-anchor" href="#welder-arm-actuation"><span>Welder Arm Actuation</span></a></h2><p>As you begin building larger grids, it is likely that you will create a dedicated grid for welding. One method to increase productivity is to mount forward-facing welders on hinges, to simplify welding up, down or forward. Though we can achieve this with the <code>Rotate to Angle</code> action released with the Signals update, the process to update these automations is still laborious via game menus. Let&#39;s take a look at a simple implementation with Mother:</p><p>We want our welder arm to actuate to the following angles:</p><ul><li>90 degrees (up)</li><li>45 degrees</li><li>0 degrees (fwd)</li><li>-45 degrees</li><li>-90 degrees (down)</li></ul><p>Let&#39;s set these as custom commands within the Programmable Block&#39;s <strong>Custom Data</strong>:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Commands</span><span class="token punctuation">]</span></span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">hinges90</span><span class="token punctuation">=</span><span class="token value attr-value">hinge/rotate &quot;WelderHinges&quot; 90 --speed=3;</span></span>
<span class="line"><span class="token key attr-name">hinges45</span><span class="token punctuation">=</span><span class="token value attr-value">hinge/rotate &quot;WelderHinges&quot; 45 --speed=3;</span></span>
<span class="line"><span class="token key attr-name">hinges0</span><span class="token punctuation">=</span><span class="token value attr-value">hinge/rotate &quot;WelderHinges&quot; 0 --speed=3;</span></span>
<span class="line"><span class="token key attr-name">hinges-45</span><span class="token punctuation">=</span><span class="token value attr-value">hinge/rotate &quot;WelderHinges&quot; -45 --speed=3;</span></span>
<span class="line"><span class="token key attr-name">hinges-90</span><span class="token punctuation">=</span><span class="token value attr-value">hinge/rotate &quot;WelderHinges&quot; -90 --speed=3;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,16)),s("p",null,[a[4]||(a[4]=n("Now, we can run the programmable block with the argument ")),a[5]||(a[5]=s("code",null,"hinges90",-1)),a[6]||(a[6]=n(" to actuate the welder arm to 90 degrees, ")),a[7]||(a[7]=s("code",null,"hinges45",-1)),a[8]||(a[8]=n(" to actuate to 45 degrees, etc. This can easily be assigned to a button or toolbar action using the ")),a[9]||(a[9]=s("code",null,"Run",-1)),a[10]||(a[10]=n(" action. Also note that we can customize the speed of rotation via a command option. See the ")),i(e,{to:"/IngameScript/Modules/Extension/HingeModule.html"},{default:l(()=>a[3]||(a[3]=[n("Hinge Module")])),_:1}),a[11]||(a[11]=n(" for more information."))]),a[14]||(a[14]=t(`<div class="hint-container important"><p class="hint-container-title">Important</p><p>Don&#39;t forget to <code>Recompile</code> Mother when you update the Custom Data in the Programmable Block.</p></div><h2 id="automatically-flying-to-a-resource-node" tabindex="-1"><a class="header-anchor" href="#automatically-flying-to-a-resource-node"><span>Automatically Flying to a Resource Node</span></a></h2><p>As resource demands rise, you will innevitibly mark locations with GPS points for future reference. To fly to these points automatically, we must either create one AI Flight block per waypoint/route, or go into the AI block&#39;s menu, and manually update the preferred waypoint before enabing autopilot. This is a cumbersome process, especially if you have many waypoints to visit. Mother allows you to create commands for each of these waypoints, and then simply trigger them with a button press, requiring only the Programmable Block running Mother, and a Remote Control block.</p><p>Our GPS waypoints:</p><ol><li><code>GPS:Iron#1:1023697:182968.67:1599556.3:#FF75C9F1:</code></li><li><code>GPS:Ice#1:1023697:182968.67:1599556.3:#FF75C9F1:</code></li><li><code>GPS:Silicon#1:1023763.18:183342.72:1600143.03:#FF75C9F1:</code></li></ol><div class="hint-container note"><p class="hint-container-title">Note</p><p>We are using the GPS waypoint string, which you can get by copying the waypoint to your clipboard via the <code>GPS</code> tab.</p></div><p>Let&#39;s create a routine to fly to each waypoints In the progammable block&#39;s <strong>Custom Data</strong>. We can take advantage of the <code>fcs/start</code> command to enable autopilot:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Commands</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">fe1</span><span class="token punctuation">=</span></span>
<span class="line">| nav/set-flight-plan &quot;GPS:Iron#1:1023697:182968.67:1599556.3:#FF75C9F1:&quot;;</span>
<span class="line"><span class="token key attr-name">| fcs/start --speed</span><span class="token punctuation">=</span><span class="token value attr-value">100;</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">ice1</span><span class="token punctuation">=</span></span>
<span class="line">| nav/set-flight-plan &quot;GPS:Ice#1:1023697:182968.67:1599556.3:#FF75C9F1:&quot;;</span>
<span class="line"><span class="token key attr-name">| fcs/start --speed</span><span class="token punctuation">=</span><span class="token value attr-value">100;</span></span>
<span class="line"></span>
<span class="line"><span class="token key attr-name">si1</span><span class="token punctuation">=</span></span>
<span class="line">| nav/set-flight-plan &quot;GPS:Silicon1:1023763.18:183342.72:1600143.03:#FF75C9F1:&quot;;</span>
<span class="line"><span class="token key attr-name">| fcs/start --speed</span><span class="token punctuation">=</span><span class="token value attr-value">100;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>Now, we can run Mother with the argument <code>fe1</code> to automatically begin flying to our iron vein, <code>ice1</code> to begin flying towards ice, or <code>si1</code> to fly to silicon. This is a much more intuitive way to control your ship than the base game&#39;s AI block. You can even create waypoints above your home base&#39;s docks to enable autopiloted return trips. Now we can easily tweak where the grid flies, how fast, etc. from a central location.</p><div class="hint-container important"><p class="hint-container-title">Important</p><p>Don&#39;t forget to <code>Recompile</code> Mother when you update the Custom Data in the Programmable Block.</p></div><h2 id="dispatch-ship-to-a-landing-site-via-a-flight-plan" tabindex="-1"><a class="header-anchor" href="#dispatch-ship-to-a-landing-site-via-a-flight-plan"><span>Dispatch Ship to a Landing Site via a Flight Plan</span></a></h2><p>Mother allows players to queue commands for execution from within the flight plan string. This allows players to change aircraft configuration and behavior at each waypoint. Let&#39;s look at an example where we dispatch a ship to a landing site, and change the ship&#39;s configuration at each waypoint using the familiar <code>routine</code> sytnax.</p><p>Our routine:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token key attr-name">FlyToLandingSite</span><span class="token punctuation">=</span></span>
<span class="line">| nav/set-flight-plan</span>
<span class="line">| &quot;</span>
<span class="line">|     { door/close MainDoor; light/blink SignalLights med; }</span>
<span class="line">|</span>
<span class="line">|     GPS:MothershipExit:226963.8:226982.08:227068.34:#FF75C9F1: </span>
<span class="line">|     { ExtendWings; light/blink SignalLights off; block/off BoosterThrusters; }</span>
<span class="line">|</span>
<span class="line">|     GPS:HyperionOutpost:227001.34:227004.02:227021.9:#FF75C9F1: </span>
<span class="line">|</span>
<span class="line">|     GPS:LandingSite:227081.47:226948.41:227068.73:#FF75C9F1:</span>
<span class="line"><span class="token key attr-name">|     { fcs/start --speed</span><span class="token punctuation">=</span><span class="token value attr-value">10; RectractWings; light/blink SignalLights med; }</span></span>
<span class="line">| &quot;;</span>
<span class="line"><span class="token key attr-name">| fcs/start --speed</span><span class="token punctuation">=</span><span class="token value attr-value">5;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>We can see 4 distinct steps in the flight plan. We will omit the pipe <code>|</code> character for ease of readibility in this example. Terms must always we separated by a space <code></code>.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># preflight</span></span>
<span class="line"><span class="token punctuation">{</span> door/close MainDoor<span class="token punctuation">;</span> light/blink SignalLights med<span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## first wayoint</span></span>
<span class="line">GPS:MothershipExit:226963.8:226982.08:227068.34:<span class="token comment">#FF75C9F1:</span></span>
<span class="line"> <span class="token punctuation">{</span> ExtendWings<span class="token punctuation">;</span> light/blink SignalLights off<span class="token punctuation">;</span> block/off BoosterThrusters<span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## second waypoint</span></span>
<span class="line">GPS:HyperionOutpost:227001.34:227004.02:227021.9:<span class="token comment">#FF75C9F1:</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">## final waypoint</span></span>
<span class="line">GPS:LandingSite:227081.47:226948.41:227068.73:<span class="token comment">#FF75C9F1:</span></span>
<span class="line"> <span class="token punctuation">{</span> fcs/start <span class="token parameter variable">--speed</span><span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span> RectractWings<span class="token punctuation">;</span> light/blink SignalLights med<span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="preflight" tabindex="-1"><a class="header-anchor" href="#preflight"><span>Preflight</span></a></h3><p>The preflight is run as soon as the <code>nav/set-flight-plan</code> command is executed. We can see that we are closing our <code>MainDoor</code> door block, and blinking our <code>SignalLights</code> - safety first.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token punctuation">{</span> door/close MainDoor<span class="token punctuation">;</span> light/blink SignalLights med<span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h3 id="waypoints" tabindex="-1"><a class="header-anchor" href="#waypoints"><span>Waypoints</span></a></h3><p>At the <code>MothershipExit</code> GPS waypoint we want to extend our wings with our custom method <code>ExtendWings</code>, and also turn off our <code>BoosterThrusters</code> group.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">GPS:MothershipExit:226963.8:226982.08:227068.34:<span class="token comment">#FF75C9F1: </span></span>
<span class="line"> <span class="token punctuation">{</span> ExtendWings<span class="token punctuation">;</span> light/blink SignalLights off<span class="token punctuation">;</span> block/off BoosterThrusters<span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></div><p>There is no routine defined at the <code>HyperionOutpost</code> waypoint so we simply fly to it before proceeding to the <code>LandingSite</code>.</p><p>As we approach the <code>LandingSite</code>, we will slow down, and retract our wings. We can do this by setting the speed to 10 m/s, and calling our <code>RetractWings</code> method.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">GPS:LandingSite:227081.47:226948.41:227068.73:<span class="token comment">#FF75C9F1:</span></span>
<span class="line"> <span class="token punctuation">{</span> fcs/start <span class="token parameter variable">--speed</span><span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">;</span> RectractWings<span class="token punctuation">;</span> light/blink SignalLights med<span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></div>`,25))])}const v=o(d,[["render",u],["__file","Examples.html.vue"]]),g=JSON.parse('{"path":"/IngameScript/Examples.html","title":"Examples","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Drill Deployment","slug":"drill-deployment","link":"#drill-deployment","children":[]},{"level":2,"title":"Welder Arm Actuation","slug":"welder-arm-actuation","link":"#welder-arm-actuation","children":[]},{"level":2,"title":"Automatically Flying to a Resource Node","slug":"automatically-flying-to-a-resource-node","link":"#automatically-flying-to-a-resource-node","children":[]},{"level":2,"title":"Dispatch Ship to a Landing Site via a Flight Plan","slug":"dispatch-ship-to-a-landing-site-via-a-flight-plan","link":"#dispatch-ship-to-a-landing-site-via-a-flight-plan","children":[{"level":3,"title":"Preflight","slug":"preflight","link":"#preflight","children":[]},{"level":3,"title":"Waypoints","slug":"waypoints","link":"#waypoints","children":[]}]}],"git":{"updatedTime":1742503231000,"contributors":[{"name":"Luke Morrison","username":"","email":"lukejamesmorrison@gmail.com","commits":2}],"changelog":[{"hash":"c8cf40a8705ec6403d9c49f965678cbd9e3d5f98","time":1742503231000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Update docs for v0.2.8"},{"hash":"7c2fb0716f1b3a7b9765a5e6872cb915206257b5","time":1742428082000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Initial commit"}]},"filePathRelative":"IngameScript/Examples.md"}');export{v as comp,g as data};
