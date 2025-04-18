import{_ as r,c as u,a as s,b as e,d as l,e as a,w as t,r as i,o as d}from"./app-WBceOhT5.js";const m={},k={class:"table-of-contents"};function v(h,n){const o=i("router-link"),p=i("Mermaid"),c=i("RouteLink");return d(),u("div",null,[n[17]||(n[17]=s("h1",{id:"architecture-overview",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#architecture-overview"},[s("span",null,"Architecture Overview")])],-1)),n[18]||(n[18]=s("div",{class:"hint-container warning"},[s("p",{class:"hint-container-title"},"Warning"),s("p",null,[a("Mother requires a "),s("strong",null,"Remote Control block"),a(" to function. This allows us to leverage autopilot and flight data across our modules easily.")])],-1)),s("nav",k,[s("ul",null,[s("li",null,[e(o,{to:"#entity-diagram"},{default:t(()=>n[0]||(n[0]=[a("Entity Diagram")])),_:1})]),s("li",null,[e(o,{to:"#program-lifecycle"},{default:t(()=>n[1]||(n[1]=[a("Program Lifecycle")])),_:1}),s("ul",null,[s("li",null,[e(o,{to:"#booting-the-program"},{default:t(()=>n[2]||(n[2]=[a("Booting the Program")])),_:1})]),s("li",null,[e(o,{to:"#running-the-program-each-cycle"},{default:t(()=>n[3]||(n[3]=[a("Running the Program each cycle")])),_:1})])])]),s("li",null,[e(o,{to:"#command-lifecycle"},{default:t(()=>n[4]||(n[4]=[a("Command Lifecycle")])),_:1})]),s("li",null,[e(o,{to:"#mother-instance"},{default:t(()=>n[5]||(n[5]=[a("Mother Instance")])),_:1}),s("ul",null,[s("li",null,[e(o,{to:"#system-attributes"},{default:t(()=>n[6]||(n[6]=[a("System Attributes")])),_:1})]),s("li",null,[e(o,{to:"#boot"},{default:t(()=>n[7]||(n[7]=[a("Boot")])),_:1})]),s("li",null,[e(o,{to:"#run"},{default:t(()=>n[8]||(n[8]=[a("Run")])),_:1})])])])])]),n[19]||(n[19]=s("h2",{id:"entity-diagram",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#entity-diagram"},[s("span",null,"Entity Diagram")])],-1)),e(p,{id:"mermaid-16",code:"eJytU++PmkAQ/e5fsaExfKnQem3a2NPk/NEL6ZEz9dIv5NIsMMJG2CW766mp/u/dBQ4QNU1zYmKWnffezLwZut0/HYQIJXKA9AkhU8aQgjlApo8FmO8bl78wJ9hPQKhoAc5jGScp5rsJSxjXvHfjcf9z/2tJbUKeYCtr2HK5PIMZMx4Cr1FfJh/U0wSmmNDxKtLRTUzka415jLIQCgUd5hA2gwmhUAn7CQ5WzaiAgNGw2ciJegVpFXmiJYFLcuTJ977+ncOc1cphB/V/6By63U4n4jiL0cPP/N5lahz8ceEZxQk9LoznXm+0n0IGNBSI0T2ac6ZI6REBadCEpRkTECK23CNntpVABWHUZeE6Ac9o3xjP/5KYMA4Vu35RxJzZuEJWb4ScCnuUoJ33ElY/Gi/WfmFKQ78yd+L2PUNVmWIajteiTFFEbrxbjGIOy6Fp2VN4gYRlwO1aRdh3iSLiwIplmphIyF0CQzPQExqgfD7fkFSr3AvVPnAsVc0DRBkFc1Qyb208aub85BmWZb06ombU7qHVfEWduR89Y06EbI2jiN14xgOJYnkmVGWsEuancitqC2IpMzGw7YjIeO1bAUvtFCcbzEF192K70x+9xczekBWxF8pMn20tle1u7lgOjXAKlru75yQsdU0kMY9ADo3fyie6Mv7LvFKkNq+80DuH5sqJ61XtuDuHqi8wUrXrPVlTEuS1LHZCwhv7cO4nl3poLN81etDWPwFPCcXJNSo/1bvUSLVffwGJQu9f"}),n[20]||(n[20]=l(`<h2 id="program-lifecycle" tabindex="-1"><a class="header-anchor" href="#program-lifecycle"><span>Program Lifecycle</span></a></h2><p>Mother runs at a default speed of 6 ticks per second (Update10). This tolerance should be acceptable for most use cases. Each program cycle we <em>run</em> Mother.</p><h3 id="booting-the-program" tabindex="-1"><a class="header-anchor" href="#booting-the-program"><span>Booting the Program</span></a></h3><p>We boot Mother when instatiating the Program. We instantiate Mother and register the extension modules we wish to include. Finally, we boot Mother to ensure all of the modules are configured and ready to run.</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title="Program.cs"><span>Program.cs</span></div><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre><code><span class="line"><span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">Program</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyGridProgram</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">Mother</span> mother<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token function">Program</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// Instantiate Mother</span></span>
<span class="line">        mother <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Mother</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// Register Extension Modules</span></span>
<span class="line">        mother<span class="token punctuation">.</span><span class="token function">RegisterModules</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>IExtensionModule<span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span> </span>
<span class="line">            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RotorModule</span><span class="token punctuation">(</span>mother<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FlightControlModule</span><span class="token punctuation">(</span>mother<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token range operator">..</span><span class="token punctuation">.</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// Boot Mother</span></span>
<span class="line">        mother<span class="token punctuation">.</span><span class="token function">Boot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="hint-container important"><p class="hint-container-title">Important</p><p>Extension Modules must conform the the <code>IExtensionModule</code> interface.</p></div><h3 id="running-the-program-each-cycle" tabindex="-1"><a class="header-anchor" href="#running-the-program-each-cycle"><span>Running the Program each cycle</span></a></h3>`,7)),s("p",null,[n[10]||(n[10]=a("The ")),n[11]||(n[11]=s("code",null,"Run",-1)),n[12]||(n[12]=a(" method is responsible for running all Extension Modules, managing incoming communications, and running scheduled actions. See ")),e(c,{to:"/Framework/Developer/CoreModules/Clock.html"},{default:t(()=>n[9]||(n[9]=[a("Clock")])),_:1}),n[13]||(n[13]=a(" for more information on scheduling and delaying actions. We ensure the program calls this method"))]),n[21]||(n[21]=l(`<div class="code-block-with-title"><div class="code-block-title-bar" data-title="Program.cs"><span>Program.cs</span></div><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre><code><span class="line"><span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">Program</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MyGridProgram</span></span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// The game will run this method every cycle</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> argument<span class="token punctuation">,</span> <span class="token class-name">UpdateType</span> updateSource<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// So we delegate to Mother</span></span>
<span class="line">        Mother<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>argument<span class="token punctuation">,</span> updateSource<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>`,1)),e(p,{id:"mermaid-42",code:"eJyFj9FKwzAUhu/7FAek9maDORBlgmI6lV1446o3ZRdpc9aFtUk5SdWx7d1tO+uiK9hCCOf//o8T3996AFJJO4HmBhDYFRYYTCBIuMFg4AzfOEme5Gjq9AC3WUmy4LQJda6p6Z0xNr4cX39XXSTCT3vElstlD8M0CaQjdRWO6s8FCy4VW2dN+rGSttuxzZQWeDA0MaFww1wq/BEnOU/Xbmow1Ur8esjjuPl7oT9rntgskpX/yDqm19Vi+/rce3vf97yMeLmCaNrO7+OXSi1gOLzdnavElDdTrGVF/T6oSsEtznVFKR6yHbCtO4VoU+JdowZgjiNqDTwfQEQyy5AGME9JlrbThHGoi4IrwSqzOKnPnsIOnMYzVe+TkRTPaAzPcI70LlM8bb22i12MuupDHOY6XS+8L/Q0wSk="}),n[22]||(n[22]=l(`<div class="code-block-with-title"><div class="code-block-title-bar" data-title="Mother.cs"><span>Mother.cs</span></div><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> argument<span class="token punctuation">,</span> <span class="token class-name">UpdateType</span> updateSource<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span></span>
<span class="line">        <span class="token operator">!</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrWhiteSpace</span><span class="token punctuation">(</span>argument<span class="token punctuation">)</span> </span>
<span class="line">        <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>updateSource <span class="token operator">==</span> UpdateType<span class="token punctuation">.</span>Terminal <span class="token operator">||</span> updateSource <span class="token operator">==</span> UpdateType<span class="token punctuation">.</span>Trigger <span class="token operator">||</span> updateSource <span class="token operator">==</span> UpdateType<span class="token punctuation">.</span>Script<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token generic-method"><span class="token function">GetModule</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>CommandBus<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RunTerminalCommand</span><span class="token punctuation">(</span>argument<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token generic-method"><span class="token function">GetModule</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Terminal<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UpdateTerminal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>updateSource <span class="token operator">==</span> UpdateType<span class="token punctuation">.</span>IGC<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token generic-method"><span class="token function">GetModule</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IntergridMessageService<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">HandleIncomingIGCMessages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Otherwise we run all modules and assume a runtime update.</span></span>
<span class="line">    <span class="token function">RunModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="code-block-with-title"><div class="code-block-title-bar" data-title="Mother.cs"><span>Mother.cs</span></div><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre><code><span class="line"><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RunModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    AllModules<span class="token punctuation">.</span>Values<span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ForEach</span><span class="token punctuation">(</span>module <span class="token operator">=&gt;</span> module<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="command-lifecycle" tabindex="-1"><a class="header-anchor" href="#command-lifecycle"><span>Command Lifecycle</span></a></h2>`,3)),s("p",null,[n[15]||(n[15]=a("When a player runs a command, it is passed to the ")),e(c,{to:"/Framework/Developer/CoreModules/CommandBus.html"},{default:t(()=>n[14]||(n[14]=[a("Command Bus")])),_:1}),n[16]||(n[16]=a(". The Command Bus then executes the command on the appropriate module. The module may then emit an event, which is received by subscribed modules."))]),e(p,{id:"mermaid-51",code:"eJx1j09rhDAQxe9+ikARL93LQqF4WGi2ll4KpYXeYxx2h80fG+O2S/G7N8boxmoRROf93ps3afqTEIIKbU76L0IyewQJWU6ykjWQ3UbDD2aQlQIapw6w12qDkpnLXgttet8Npdu77X2wxgjVpgIzgQaqGJIMFT0deuXriHbc7TWlKxjcK0aBCqbQUjB+itUGuFZVXHCRPiF/Ci6yLBiLs1uftv2zxqxmeaxz7y7p0jRJGvhsQXF4RHYwTHq5Zi6AY82UJa+CXcAsxnstJVMVbZuF9KKrVsDDYl6cQdn/DTTxQvjZ7HYjn5P3tmy4wRKI1UPMwA7dHHptk5NCufvHfh67qg4N7Rz3Dby1MCODOFteSAzdPTIKmymLOqYfkjfggGeIo/o7JurZrREQsn4BvmfjXQ=="}),n[23]||(n[23]=l(`<h2 id="mother-instance" tabindex="-1"><a class="header-anchor" href="#mother-instance"><span>Mother Instance</span></a></h2><h3 id="system-attributes" tabindex="-1"><a class="header-anchor" href="#system-attributes"><span>System Attributes</span></a></h3><p>Mother makes most common <a href="https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.MyGridProgram" target="_blank" rel="noopener noreferrer">Program</a> properties available to assist with common lookups.</p><div class="code-block-with-title"><div class="code-block-title-bar" data-title="MissileGuidanceModule.cs"><span>MissileGuidanceModule.cs</span></div><div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre><code><span class="line"><span class="token comment">// via Mother (recommended)</span></span>
<span class="line"><span class="token class-name">IMyCubeGrid</span> Grid <span class="token operator">=</span> Mother<span class="token punctuation">.</span>Grid</span>
<span class="line"><span class="token class-name">IMyGridTerminalSystem</span> GridTerminalSystem <span class="token operator">=</span> Mother<span class="token punctuation">.</span>GridTerminalSystem</span>
<span class="line"><span class="token class-name">IMyProgrammableBlock</span> ProgrammableBlock <span class="token operator">=</span> Mother<span class="token punctuation">.</span>ProgrammableBlock</span>
<span class="line"></span>
<span class="line"><span class="token comment">// via the Program instance</span></span>
<span class="line"><span class="token class-name">IMyCubeGrid</span> Grid <span class="token operator">=</span> Mother<span class="token punctuation">.</span>Program<span class="token punctuation">.</span>Me<span class="token punctuation">.</span>CubeGrid</span>
<span class="line"><span class="token class-name">IMyGridTerminalSystem</span> GridTerminalSystem <span class="token operator">=</span> Mother<span class="token punctuation">.</span>Program<span class="token punctuation">.</span>GridTerminalSystem</span>
<span class="line"><span class="token class-name">IMyProgrammableBlock</span> ProgrammableBlock <span class="token operator">=</span> Mother<span class="token punctuation">.</span>Program<span class="token punctuation">.</span>Me</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="boot" tabindex="-1"><a class="header-anchor" href="#boot"><span>Boot</span></a></h3><p>When Mother boots, many of the core modules do most of their work. This aims to save a great deal of computation at runtime, reducing impact on gameplay. During boot, the <code>Boot</code> method is called on all Core Modules, then all Extension Modules.</p>`,6)),e(p,{id:"mermaid-68",code:"eJxtkMFKxDAQhu95igEpvbiXgiB7EEzVmxcRL4uHdDO0w7aZZRJRkb67bard7LYEQpjvmz+TZNmPAiBHYQvjCSAPDXaYbyGvjMf8Oim+GSFTtegHOsmRHYU6I98ltyxj35XWxU1x+9eaKprFosyioE2lzpDTh3oknw2F/7sjc2xx6l5pbMnhHFq1Zn9Iqcc9O5sOuEiflYsBF1kBJdDZW5+Kca05q1lR64e9V32WKVWLOTbwqmP9fveCNfkhAEoWhGe2H8Nvv08QNps70Cfl8Sug88Ru9iCKOorlTjOHlZwy4ocJLzPUL/7KlP0="}),n[24]||(n[24]=s("h3",{id:"run",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#run"},[s("span",null,"Run")])],-1)),e(p,{id:"mermaid-72",code:"eJxtkUGLwjAQhe/9FQNL6WW9FBYWDwubsnvSiwcv4iE1gx1sE5lGVKT/3SbVkGoTSIZ573tJSJreEgDSZOfgKoDMVthgNoeslC1mn1FzLZlkWWPbq4PZa0emRvK1MLVhx30IkX/l3w80tgjDCjkYGVVsaiRpcdg75VyRfZ7tNW0UDvQEWJPGEFrWcneI1RZ3Rqv4gm/pwfJywbcsi2xp9Nb/3M0pz2SWt3X92iVdmiZ7lscKFivf/t2sTno7lDCb/YDYhNReCXVhGGFp1Kn/Cd/cgt+Eh4oRNChu/F0s6paMHqPJHUSOhes="})])}const g=r(m,[["render",v],["__file","ArchitectureOverview.html.vue"]]),f=JSON.parse('{"path":"/Framework/Developer/GettingStarted/ArchitectureOverview.html","title":"Architecture Overview","lang":"en-US","frontmatter":{},"git":{"updatedTime":1744933175000,"contributors":[{"name":"Luke Morrison","username":"","email":"lukejamesmorrison@gmail.com","commits":4}],"changelog":[{"hash":"15ee173564b47688d911d239bf1296182577deca","time":1744933175000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Update docs"},{"hash":"db312309835110752ea2b209f7c3efbf6e7d9264","time":1744758309000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"dev initial commit"},{"hash":"f894df28734323dfee730c0dd29c28fed9ffa424","time":1744056546000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"v0.2.10 Update"},{"hash":"7c2fb0716f1b3a7b9765a5e6872cb915206257b5","time":1742428082000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Initial commit"}]},"filePathRelative":"Framework/Developer/GettingStarted/ArchitectureOverview.md"}');export{g as comp,f as data};
