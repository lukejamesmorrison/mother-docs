import{_ as l,c as i,a as s,b as u,d as e,w as a,r as o,o as r,e as n}from"./app-COrgWIto.js";const p={},c={class:"table-of-contents"};function m(M,t){const d=o("router-link");return r(),i("div",null,[t[4]||(t[4]=s("h1",{id:"sound-module",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#sound-module"},[s("span",null,"Sound Module")])],-1)),t[5]||(t[5]=s("p",null,"The sound module allows the user to control sound blocks on the grid. Players can play, stop, and set the sound of sound blocks. Use this to add alerts, and music to your grids to crank up the vibe! 🪩",-1)),s("nav",c,[s("ul",null,[s("li",null,[e(d,{to:"#commands"},{default:a(()=>t[0]||(t[0]=[n("Commands")])),_:1}),s("ul",null,[s("li",null,[e(d,{to:"#play"},{default:a(()=>t[1]||(t[1]=[n("play")])),_:1})]),s("li",null,[e(d,{to:"#stop"},{default:a(()=>t[2]||(t[2]=[n("stop")])),_:1})]),s("li",null,[e(d,{to:"#set"},{default:a(()=>t[3]||(t[3]=[n("set")])),_:1})])])])])]),t[6]||(t[6]=u(`<h2 id="commands" tabindex="-1"><a class="header-anchor" href="#commands"><span>Commands</span></a></h2><h3 id="play" tabindex="-1"><a class="header-anchor" href="#play"><span>play</span></a></h3><p>Play the sound block with an optional sound.</p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini"><pre><code><span class="line"><span class="token comment">; play to block</span></span>
<span class="line">sound/play &lt;SoundBlock|Group&gt;</span>
<span class="line"></span>
<span class="line"><span class="token comment">; play the block with a specific sound</span></span>
<span class="line">sound/play &lt;SoundBlock|Group&gt; &lt;sound&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>See the <a href="#set"><code>set</code></a> command for a list of available sounds.</p><p><strong>Example</strong></p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">sound/play MainSpeaker <span class="token string">&quot;Danger Music 04&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h3 id="stop" tabindex="-1"><a class="header-anchor" href="#stop"><span>stop</span></a></h3><p>Stop the sound block from playing.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">sound/stop &lt;SoundBlock|Group&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">sound/stop MainSpeaker<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set"><span>set</span></a></h3><p>Set the sound of the sound block.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">sound/set &lt;SoundBlock|Group&gt; &lt;sound&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>Example</strong></p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">sound/set MainSpeaker MusDanger_04<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><p>You may use the sound as it appears in the sound block list or, for default sounds, using their ID below.</p><h4 id="default-sounds" tabindex="-1"><a class="header-anchor" href="#default-sounds"><span>Default Sounds</span></a></h4><table><thead><tr><th>ID</th><th></th><th></th><th></th></tr></thead><tbody><tr><td>SoundBlockLightsOn</td><td>SoundBlockLightsOff</td><td>SoundBlockEnemyDetected</td><td>SoundBlockObjectiveComplete</td></tr><tr><td>SoundBlockAlert1</td><td>SoundBlockAlert2</td><td>SoundBlockAlert3</td><td>DroneLoopSmall</td></tr><tr><td>DroneLoopMedium</td><td>DroneLoopLarge</td><td>DroneLoopHuge</td><td>MusCalm_01</td></tr><tr><td>MusCalm_02</td><td>MusCalm_03</td><td>MusCalm_04</td><td>MusCalm_05</td></tr><tr><td>MusCalm_06</td><td>MusCalm_07</td><td>MusCalm_08</td><td>MusCalm_09</td></tr><tr><td>MusCalm_10</td><td>MusCalm_11</td><td>MusCalm_12</td><td>MusCalm_13</td></tr><tr><td>MusMystery_01</td><td>MusMystery_02</td><td>MusMystery_03</td><td>MusMystery_04</td></tr><tr><td>MusMystery_05</td><td>MusMystery_06</td><td>MusMystery_07</td><td>MusMystery_08</td></tr><tr><td>MusBuild_01</td><td>MusBuild_02</td><td>MusBuild_03</td><td>MusBuild_04</td></tr><tr><td>MusBuild_05</td><td>MusBuild_06</td><td>MusBuild_07</td><td>MusSpace_01</td></tr><tr><td>MusSpace_02</td><td>MusSpace_03</td><td>MusSpace_04</td><td>MusSpace_05</td></tr><tr><td>MusSpace_06</td><td>MusSpace_07</td><td>MusSpace_08</td><td>MusSpace_09</td></tr><tr><td>MusSpace_10</td><td>MusSpace_11</td><td>MusSpace_12</td><td>MusLightFight_01</td></tr><tr><td>MusLightFight_02</td><td>MusLightFight_03</td><td>MusLightFight_04</td><td>MusLightFight_05</td></tr><tr><td>MusLightFight_06</td><td>MusLightFight_07</td><td>MusLightFight_08</td><td>MusLightFight_09</td></tr><tr><td>MusLightFight_10</td><td>MusLightFight_11</td><td>MusLightFight_12</td><td>MusLightFight_13</td></tr><tr><td>MusLightFight_14</td><td>MusHeavyFight_01</td><td>MusHeavyFight_02</td><td>MusHeavyFight_03</td></tr><tr><td>MusHeavyFight_04</td><td>MusHeavyFight_05</td><td>MusHeavyFight_06</td><td>MusHeavyFight_07</td></tr><tr><td>MusHeavyFight_08</td><td>MusHeavyFight_09</td><td>MusHeavyFight_10</td><td>MusHeavyFight_11</td></tr><tr><td>MusHeavyFight_12</td><td>MusHeavyFight_13</td><td>MusHeavyFight_14</td><td>MusDanger_01</td></tr><tr><td>MusDanger_02</td><td>MusDanger_03</td><td>MusDanger_04</td><td>MusDanger_05</td></tr><tr><td>MusDanger_06</td><td>MusEarthlike_01</td><td>MusEarthlike_02</td><td>MusEarthlike_03</td></tr><tr><td>MusEarthlike_04</td><td>MusEarthlike_05</td><td>MusEarthlike_06</td><td>MusPlanet_01</td></tr><tr><td>MusPlanet_02</td><td>MusPlanet_03</td><td>MusPlanet_04</td><td>MusPlanet_05</td></tr><tr><td>MusPlanet_06</td><td>MusAlien_01</td><td>MusAlien_02</td><td>MusAlien_03</td></tr><tr><td>MusAlien_04</td><td>MusAlien_05</td><td>MusFun</td><td>MusComp_01</td></tr><tr><td>MusComp_02</td><td>MusComp_03</td><td>MusComp_04</td><td>MusComp_05</td></tr><tr><td>MusComp_06</td><td>MusComp_07</td><td>MusComp_08</td><td>MusComp_09</td></tr><tr><td>MusComp_10</td><td>MusComp_11</td><td>MusComp_12</td><td>MusComp_13</td></tr><tr><td>MusComp_14</td><td>MusComp_15</td><td>MusComp_16</td><td>MusComp2_01</td></tr><tr><td>MusComp2_02</td><td>MusComp2_03</td><td>MusComp2_04</td><td>MusComp2_05</td></tr><tr><td>MusComp2_06</td><td>MusComp2_07</td><td>MusComp2_08</td><td>MusComp2_09</td></tr><tr><td>MusComp2_10</td><td>MusComp2_11</td><td>MusComp2_12</td><td>MusComp2_13</td></tr><tr><td>MusComp2_14</td><td>MusComp2_15</td><td>MusComp2_16</td><td>MusConcert_2</td></tr><tr><td>MusConcert_3</td><td>MusConcert_4</td><td>MusConcert_5</td><td>MusConcert_6</td></tr><tr><td>MusConcert_7</td><td>MusConcert_8</td><td>MusConcert_9</td><td>MusConcert_10</td></tr></tbody></table><p><strong>Example</strong></p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># default sound with sound id</span></span>
<span class="line">sound/set MainSpeaker MusDanger_04<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment"># default sound with ingame name</span></span>
<span class="line">sound/set MainSpeaker <span class="token string">&quot;Danger Music 04&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># other sound</span></span>
<span class="line">sound/play MainSpeaker <span class="token string">&quot;Space Funk&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,22))])}const _=l(p,[["render",m],["__file","SoundModule.html.vue"]]),g=JSON.parse('{"path":"/IngameScript/Modules/Extension/SoundModule.html","title":"Sound Module","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Commands","slug":"commands","link":"#commands","children":[{"level":3,"title":"play","slug":"play","link":"#play","children":[]},{"level":3,"title":"stop","slug":"stop","link":"#stop","children":[]},{"level":3,"title":"set","slug":"set","link":"#set","children":[]}]}],"git":{"updatedTime":1742503231000,"contributors":[{"name":"Luke Morrison","username":"","email":"lukejamesmorrison@gmail.com","commits":2}],"changelog":[{"hash":"c8cf40a8705ec6403d9c49f965678cbd9e3d5f98","time":1742503231000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Update docs for v0.2.8"},{"hash":"7c2fb0716f1b3a7b9765a5e6872cb915206257b5","time":1742428082000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Initial commit"}]},"filePathRelative":"IngameScript/Modules/Extension/SoundModule.md"}');export{_ as comp,g as data};
