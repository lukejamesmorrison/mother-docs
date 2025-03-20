import{_ as d,c as r,a as e,b as c,e as t,d as s,w as o,r as l,o as p}from"./app-COrgWIto.js";const m={},u={class:"hint-container caution"},h={class:"table-of-contents"};function g(k,n){const a=l("RouteLink"),i=l("router-link");return p(),r("div",null,[n[8]||(n[8]=e("h1",{id:"docking-module",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docking-module"},[e("span",null,"Docking Module")])],-1)),n[9]||(n[9]=e("p",null,"The Docking Module handles docking procedures for the grid.",-1)),e("div",u,[n[5]||(n[5]=e("p",{class:"hint-container-title"},"Caution",-1)),e("p",null,[n[2]||(n[2]=t("Docking is only recommended in space at this time. Undocking is not supported, but is coming soon. If undocking is just thrusting away from the connector, consider leveraging the ")),s(a,{to:"/IngameScript/Modules/Extension/ThrusterModule.html#thrust"},{default:o(()=>n[0]||(n[0]=[e("code",null,"thrust",-1)])),_:1}),n[3]||(n[3]=t(" command with the ")),s(a,{to:"/IngameScript/CommandLineInterface.html#delaying-command-execution"},{default:o(()=>n[1]||(n[1]=[e("code",null,"wait",-1)])),_:1}),n[4]||(n[4]=t(" command."))])]),e("nav",h,[e("ul",null,[e("li",null,[s(i,{to:"#commands"},{default:o(()=>n[6]||(n[6]=[t("Commands")])),_:1}),e("ul",null,[e("li",null,[s(i,{to:"#dock"},{default:o(()=>n[7]||(n[7]=[t("dock")])),_:1})])])])])]),n[10]||(n[10]=c(`<h2 id="commands" tabindex="-1"><a class="header-anchor" href="#commands"><span>Commands</span></a></h2><h3 id="dock" tabindex="-1"><a class="header-anchor" href="#dock"><span>dock</span></a></h3><p>Dock with a grid and specify optional connectors. If you do not provide a connector, the grids will automatically select the connectors to use. This is most useful when you are building drones, and utility vehicles with only one connector.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">dock &lt;Grid Name&gt; [--options]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Options</p><table><thead><tr><th>Option</th><th>Values</th><th>Unit</th><th>Description</th></tr></thead><tbody><tr><td><code>local</code></td><td>string</td><td></td><td>The name of the connector you wish to use on the local grid.</td></tr><tr><td><code>remote</code></td><td>string</td><td></td><td>The name of the connector you wish to use on the remote grid.</td></tr></tbody></table><p><strong>Example</strong></p><p>We want to dock with a grid named <code>Mothership</code> using the local grid&#39;s connector named <code>MainConnector</code>, and the remote grid&#39;s connector named <code>Connector - MS.P1</code>.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Specify both connectors by name</span></span>
<span class="line">dock Mothership <span class="token parameter variable">--local</span><span class="token operator">=</span>MainConnector <span class="token parameter variable">--remote</span><span class="token operator">=</span><span class="token string">&quot;Connector - MS.P1&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># If there is one connector on our grid, we only specify the remote connector</span></span>
<span class="line">dock Mothership <span class="token parameter variable">--remote</span><span class="token operator">=</span><span class="token string">&quot;Connector - MS.P1&quot;</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Or we let the grids decide which connectors to use</span></span>
<span class="line">dock Mothership<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,9))])}const b=d(m,[["render",g],["__file","DockingModule.html.vue"]]),f=JSON.parse('{"path":"/IngameScript/Modules/Extension/DockingModule.html","title":"Docking Module","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Commands","slug":"commands","link":"#commands","children":[{"level":3,"title":"dock","slug":"dock","link":"#dock","children":[]}]}],"git":{"updatedTime":1742503231000,"contributors":[{"name":"Luke Morrison","username":"","email":"lukejamesmorrison@gmail.com","commits":1}],"changelog":[{"hash":"c8cf40a8705ec6403d9c49f965678cbd9e3d5f98","time":1742503231000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Update docs for v0.2.8"}]},"filePathRelative":"IngameScript/Modules/Extension/DockingModule.md"}');export{b as comp,f as data};
