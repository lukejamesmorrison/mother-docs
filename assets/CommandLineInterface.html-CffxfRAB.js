import{_ as l,c as r,a as e,b as s,e as a,d as o,w as i,r as d,o as m}from"./app-BAyOkzRw.js";const c="/mother-docs/assets/terminal-1-Buyi68xU.png",p="/mother-docs/assets/run-terminal-1-CSJ7PZzn.png",u="/mother-docs/assets/run-terminal-2-B8VitJkE.png",h="/mother-docs/assets/run-terminal-3-B-6faYgo.png",g="/mother-docs/assets/run-toolbar-1-BmsVdlxm.png",b="/mother-docs/assets/run-toolbar-2-DOF1w8PY.png",v="/mother-docs/assets/run-toolbar-3-BQH_ia74.png",k="/mother-docs/assets/run-toolbar-4-DKujnhuI.png",f="/mother-docs/assets/run-button-1-PQ5ja5EU.png",y="/mother-docs/assets/run-button-2-D0HHt_vP.png",w="/mother-docs/assets/run-button-3-reZGyVn4.png",C="/mother-docs/assets/run-button-4-Cz3E8TBq.png",T="/mother-docs/assets/run-button-5-CbnGrXEr.png",x="/mother-docs/assets/run-button-6-Dz6lz2gT.png",L={},A={class:"hint-container tip"};function M(B,n){const t=d("RouteLink");return m(),r("div",null,[n[23]||(n[23]=e("h1",{id:"command-line-interface-cli",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#command-line-interface-cli"},[e("span",null,"Command Line Interface (CLI)")])],-1)),n[24]||(n[24]=e("p",null,[a("Mother's command line interface allows you to interact with your grid. We can pass in "),e("em",null,"arguments"),a(" to the script to perform different actions. The CLI is available in the programmable block terminal, and you can run it by hitting the "),e("code",null,"Run"),a(" button.")],-1)),e("div",A,[n[3]||(n[3]=e("p",{class:"hint-container-title"},"Tips",-1)),e("p",null,[n[1]||(n[1]=a("See the ")),o(t,{to:"/IngameScript/CommandCheatsheet.html"},{default:i(()=>n[0]||(n[0]=[a("Command Cheatsheet")])),_:1}),n[2]||(n[2]=a(" to get started!"))])]),n[25]||(n[25]=s(`<p><strong>Command Syntax</strong></p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token operator">&lt;</span>Command<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>Argument,<span class="token operator">&gt;</span> <span class="token punctuation">[</span>Option,<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Multple commands together form a <em>routine</em>:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># commmand - set a light color</span></span>
<span class="line">light/color LandingLight red<span class="token punctuation">;</span> </span>
<span class="line"></span>
<span class="line"><span class="token comment"># routine - set a light color and make it blink</span></span>
<span class="line">light/color LandingLight red<span class="token punctuation">;</span> light/blink LandingLight fast<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><br><p><a href="https://www.youtube.com/watch?v=Ax5bhoeutcA" target="_blank" rel="noopener noreferrer"><img src="https://img.youtube.com/vi/Ax5bhoeutcA/0.jpg" alt="Running a Command"></a></p><h2 id="anatomy-of-a-command" tabindex="-1"><a class="header-anchor" href="#anatomy-of-a-command"><span>Anatomy of a Command</span></a></h2><p>Commands are similar to a traditional command line interface, and consist of 3 <em>terms</em>:</p>`,8)),e("table",null,[n[13]||(n[13]=e("thead",null,[e("tr",null,[e("th",null,"Term Type"),e("th",null,"Example"),e("th",null,"Description")])],-1)),e("tbody",null,[e("tr",null,[n[9]||(n[9]=e("td",null,"Command",-1)),n[10]||(n[10]=e("td",null,[e("code",null,"hinge/rotate"),e("br"),e("code",null,"light/color"),e("br"),e("code",null,"help")],-1)),e("td",null,[n[5]||(n[5]=a("The command determines which action is performced by Mother. See the ")),o(t,{to:"/IngameScript/CommandCheatsheet.html"},{default:i(()=>n[4]||(n[4]=[a("Command Cheetsheet")])),_:1}),n[6]||(n[6]=a(" for a complete list of commands, or run Mother with the ")),n[7]||(n[7]=e("code",null,"help",-1)),n[8]||(n[8]=a(" command."))])]),n[11]||(n[11]=e("tr",null,[e("td",null,"Argument"),e("td",null,[e("code",null,"Hinge"),e("br"),e("code",null,"red"),e("br"),e("code",null,"45"),e("br"),e("code",null,'"Rotor 1"')]),e("td",null,[a("Arguments are expected by most commands and contain the details they require to operate. This is usually values like angle, color or a GPS waypoint. Use double quotes when your arguments include spaces. In most cases, the first argument of command will target a "),e("strong",null,"Block"),a(" or "),e("strong",null,"Group"),a(" by its name.")])],-1)),n[12]||(n[12]=e("tr",null,[e("td",null,"Option"),e("td",null,[e("code",null,"--speed=2"),e("br"),e("code",null,"--offset=0.1"),e("br"),e("code",null,"--force")]),e("td",null,"Options can be used with commands to trigger specific modifications like rotational speed or blink offset. Sometimes they may be used without a set value.")],-1))])]),n[26]||(n[26]=s(`<p>Let&#39;s start with an simple example:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">hinge/rotate Hinge <span class="token number">45</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><p>We can see the <code>hinge/rotate</code> command targets the block named <code>Hinge</code>, and rotates it to <code>45</code> degrees. If we wanted to rotate the hinge at 2 RPM, we can add the <code>speed</code> option:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">hinge/rotate Hinge <span class="token number">45</span> <span class="token parameter variable">--speed</span><span class="token operator">=</span><span class="token number">2</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h2 id="running-multiple-commands" tabindex="-1"><a class="header-anchor" href="#running-multiple-commands"><span>Running Multiple Commands</span></a></h2><h3 id="using-the-terminal" tabindex="-1"><a class="header-anchor" href="#using-the-terminal"><span>Using the Terminal</span></a></h3><p>Sometimes it is useful to group commands in series to operate a system of blocks. A <code>Routine</code> is simply a group of commands separated by a semi-colon <code>;</code>. The following example changes the color of our <code>LandingLight</code>, and also initates a blinking effect.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">light/color LandingLight red<span class="token punctuation">;</span> light/blink LandingLight <span class="token number">0.5</span> <span class="token parameter variable">--length</span><span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><p>The light will blink for 0.25s, every 0.5s (50% duty cycle).</p><h3 id="custom-commands-and-routines" tabindex="-1"><a class="header-anchor" href="#custom-commands-and-routines"><span>Custom Commands and Routines</span></a></h3><p>The command syntax can get verbose in the terminal, so it is recommended that you define routines in the <code>Commands</code> section of Mother&#39;s <strong>CustomData</strong>. We can use a multi-line syntax to make it much more readable:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Mother &gt; Custom Data">Mother &gt; Custom Data</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token punctuation">[</span>Commands<span class="token punctuation">]</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">ActivateLandingLight</span><span class="token operator">=</span></span>
<span class="line"><span class="token operator">|</span> light/color LandingLight red<span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">|</span> light/blink LandingLight <span class="token number">0.5</span> <span class="token parameter variable">--length</span><span class="token operator">=</span><span class="token number">0.5</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">ExtendArm</span><span class="token operator">=</span>piston/distance LandingArm <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>The pipe character <code>|</code> is used to indicate a new line within Custom Data. This is not required in the Programmable Block terminal. This only allows us to organize our commands and routines across multiple lines within CustomData.</p></div>`,13)),e("p",null,[n[15]||(n[15]=a("Now we can run ")),n[16]||(n[16]=e("code",null,"ActivateLandingLight",-1)),n[17]||(n[17]=a(" in the terminal to execute the routine, or get clever and set it as an ")),n[18]||(n[18]=e("em",null,"Action",-1)),n[19]||(n[19]=a(" in an Event Controller, or a ")),n[20]||(n[20]=e("em",null,"hook",-1)),n[21]||(n[21]=a(" on a ")),o(t,{to:"/IngameScript/Modules/Extension/SensorModule.html"},{default:i(()=>n[14]||(n[14]=[a("Sensor")])),_:1}),n[22]||(n[22]=a("."))]),n[27]||(n[27]=s(`<div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">ActivateLandingLight<span class="token punctuation">;</span> ExtendArm<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h2 id="delaying-command-execution" tabindex="-1"><a class="header-anchor" href="#delaying-command-execution"><span>Delaying Command Execution</span></a></h2><p>Mother comes with a <code>wait</code> command that allow you to delays a command for execution in seconds.</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">door/open AirlockDoor<span class="token punctuation">;</span></span>
<span class="line"><span class="token function">wait</span> <span class="token number">10</span><span class="token punctuation">;</span></span>
<span class="line">door/close AirlockDoor<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>This works remotely as well:</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="Terminal">Terminal</span></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">@StealthMissile fcs/start<span class="token punctuation">;</span> <span class="token function">wait</span> <span class="token number">10</span><span class="token punctuation">;</span> _Arm<span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h2 id="the-terminal-window" tabindex="-1"><a class="header-anchor" href="#the-terminal-window"><span>The Terminal Window</span></a></h2><p>The terminal window act as the primary interface for Mother. You can run commands directly in the terminal, and you will receive immediate feedback from the script. The window also shows several indicators as relevant:</p><table><thead><tr><th>Indicator</th><th>Description</th></tr></thead><tbody><tr><td>#</td><td>A number showing how many grids Mother is currently storing in the Almanac. Mother stores the position and status of other grids automatically as long as they are running Mother locally as well.</td></tr><tr><td>M</td><td>Shows a mechanical system is currently in motion and tracked by the Activity Monitor. Blocks like rotors, hinges and pistons will be monitored, and locked when finished to protect Space Engineers from the Almighty Clang.</td></tr><tr><td>C</td><td>Indicates a communication is current in progress. Girds running Mother will frequently communicate to share information automatically.</td></tr><tr><td>Q</td><td>Indicates that a command is queued for future execution at a waypoint.</td></tr><tr><td>A</td><td>Indicates that autopilot is currently enabled.</td></tr><tr><td>W</td><td>Indicates that a command is currently waiting to be exeucuted at a later time via the <code>wait</code> command.</td></tr></tbody></table><p><img src="`+c+'" alt="The terminal window"></p><h2 id="running-commands-automatically" tabindex="-1"><a class="header-anchor" href="#running-commands-automatically"><span>Running Commands Automatically</span></a></h2><p>You can run commands via several methods:</p><ol><li><a href="#programmable-block-terminal-mother">Programmable Block terminal</a></li><li><a href="#cockpitcontrol-station-toolbar">Cockpit or Control Station toolbar action</a></li><li><a href="#button">Button action</a></li><li>Event Controller action</li><li>Timer Block action</li></ol><h3 id="programmable-block-terminal-mother" tabindex="-1"><a class="header-anchor" href="#programmable-block-terminal-mother"><span>Programmable Block Terminal (Mother)</span></a></h3><p>From within your Programmable Block terminal, you can run commands directly. This is the easiest way to interact with Mother and you will receive immediate feedback in the terminal window.</p><p><img src="'+p+'" alt="Open Programmable Block"></p><p><img src="'+u+'" alt="Enter Command"></p><p><img src="'+h+'" alt="Run Command"></p><h3 id="cockpit-control-station-toolbar" tabindex="-1"><a class="header-anchor" href="#cockpit-control-station-toolbar"><span>Cockpit/Control Station Toolbar</span></a></h3><p>When you&#39;re flying a ship or sitting at a control station, you can add a button to your toolbar that will run a command when pressed. This is useful for quick actions like toggling lights or opening doors. To do this, assign the Programmable Block running Mother to the toolbar, and use the <code>Run</code> action. A window will appear asking you for an argument - type your command here and click <code>Confirm</code>. You can also set a short label for the button to make it easier to identify.</p><p><img src="'+g+'" alt="Open Toolbar"></p><p><img src="'+b+'" alt="Select Run Action"></p><p><img src="'+v+'" alt="Enter Command as Argument"></p><p><img src="'+k+'" alt="Confirm Toolbar Command"></p><h3 id="button" tabindex="-1"><a class="header-anchor" href="#button"><span>Button</span></a></h3><p>Like a toolbar, you can also assign a command to a button. This is useful for quick actions like toggling lights, or initiating a return-to-base procedure for a wandering grid. To do this, assign the Programmable Block running Mother to the button action, and use the <code>Run</code> action. A window will appear asking you for an argument - type your command here and click <code>Confirm</code>. You can also set a short label for the button.</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>Due to the way Space Engineers shows button actions to the player, we are unable to see which command the button runs. It is recommended to make your button positions intuitive, or to label them with a sign.</p></div><p><img src="'+f+'" alt="Open Button"></p><p><img src="'+y+'" alt="Select Programmable Block"></p><p><img src="'+w+'" alt="Select Button Action"></p><p><img src="'+C+'" alt="Enter Command"></p><p><img src="'+T+'" alt="Confirm Assignment"></p><p><img src="'+x+'" alt="Label Button"></p>',33))])}const I=l(L,[["render",M],["__file","CommandLineInterface.html.vue"]]),E=JSON.parse('{"path":"/IngameScript/CommandLineInterface.html","title":"Command Line Interface (CLI)","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Anatomy of a Command","slug":"anatomy-of-a-command","link":"#anatomy-of-a-command","children":[]},{"level":2,"title":"Running Multiple Commands","slug":"running-multiple-commands","link":"#running-multiple-commands","children":[{"level":3,"title":"Using the Terminal","slug":"using-the-terminal","link":"#using-the-terminal","children":[]},{"level":3,"title":"Custom Commands and Routines","slug":"custom-commands-and-routines","link":"#custom-commands-and-routines","children":[]}]},{"level":2,"title":"Delaying Command Execution","slug":"delaying-command-execution","link":"#delaying-command-execution","children":[]},{"level":2,"title":"The Terminal Window","slug":"the-terminal-window","link":"#the-terminal-window","children":[]},{"level":2,"title":"Running Commands Automatically","slug":"running-commands-automatically","link":"#running-commands-automatically","children":[{"level":3,"title":"Programmable Block Terminal (Mother)","slug":"programmable-block-terminal-mother","link":"#programmable-block-terminal-mother","children":[]},{"level":3,"title":"Cockpit/Control Station Toolbar","slug":"cockpit-control-station-toolbar","link":"#cockpit-control-station-toolbar","children":[]},{"level":3,"title":"Button","slug":"button","link":"#button","children":[]}]}],"git":{"updatedTime":1742428082000,"contributors":[{"name":"Luke Morrison","username":"","email":"lukejamesmorrison@gmail.com","commits":1}],"changelog":[{"hash":"7c2fb0716f1b3a7b9765a5e6872cb915206257b5","time":1742428082000,"email":"lukejamesmorrison@gmail.com","author":"Luke Morrison","message":"Initial commit"}]},"filePathRelative":"IngameScript/CommandLineInterface.md"}');export{I as comp,E as data};
