import{m as h,i as r,T as g,t as w}from"./mermaid.esm.min-Bb8mQZlS.js";var $=h((e,t)=>{let i;return t==="sandbox"&&(i=r("#i"+e)),(t==="sandbox"?r(i.nodes()[0].contentDocument.body):r("body")).select(`[id="${e}"]`)},"getDiagramElement"),u=h((e,t,i,a)=>{e.attr("class",i);let{width:d,height:n,x:s,y:x}=c(e,t);g(e,n,d,a);let o=l(s,x,d,n,t);e.attr("viewBox",o),w.debug(`viewBox configured: ${o} with padding: ${t}`)},"setupViewPortForSVG"),c=h((e,t)=>{var a;let i=((a=e.node())==null?void 0:a.getBBox())||{width:0,height:0,x:0,y:0};return{width:i.width+t*2,height:i.height+t*2,x:i.x,y:i.y}},"calculateDimensionsWithPadding"),l=h((e,t,i,a,d)=>`${e-d} ${t-d} ${i} ${a}`,"createViewBox");export{u as $,$ as w};
