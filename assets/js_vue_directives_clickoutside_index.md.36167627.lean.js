import{_,q as m,o as y,c as D,a as l,j as d,u as k,b as e,y as H,i as T,d as w}from"./app.bea34d0c.js";const E=function(){return function(s,n,a){s.addEventListener(n,a,!1)}}(),p="@@clickOutsideZK";let x=0,B,r=[];const g=(s,n)=>function(a,t){var i,u,b;const o=a.target,c=t.target,C=!n||!n.instance,A=!o||!c,v=s===o,f=s.contains(o)||s.contains(c),F=(i=n.instance)==null?void 0:i.$refs.popoverRef,h=F&&(F.contains(o)||F.contains(c));C||A||f||v||h||(u=s[p])!=null&&u.documentFn&&((b=s[p])==null||b.documentFn())},L={beforeMount(){E(document,"mousedown",s=>B=s),E(document,"mouseup",s=>{r.forEach(n=>n[p].documentHandler(s,B))})},mounted(s,n){r.push(s);const a=x++;s[p]={id:a,documentHandler:g(s,n),documentFn:n.value}},updated(s,n){s[p].documentHandler=g(s,n),s[p].documentFn=n.value},unmounted(s){const n=r.length;for(let a=0;a<n;a++)if(r[a][p].id===s[p].id){r.splice(a,1);break}}};const M={class:"view-demo-component"},O={class:"wrapper"},q={__name:"demo",setup(s){const n=L,a=m(!1),t=m(),o=()=>{a.value=!0},c=()=>{a.value=!1};return(C,A)=>(y(),D("div",M,[l("div",O,[d((y(),D("button",{class:"trigger",onClick:o},[e("click me")])),[[k(n),c]]),d(l("div",{ref_key:"popoverRef",ref:t,class:"popper"},"this is popper area",512),[[H,a.value]])])]))}},R=_(q,[["__scopeId","data-v-df72220e"]]),I=l("h1",{id:"clickoutside\u6307\u4EE4",tabindex:"-1"},[e("Clickoutside\u6307\u4EE4 "),l("a",{class:"header-anchor",href:"#clickoutside\u6307\u4EE4","aria-hidden":"true"},"#")],-1),N=l("h2",{id:"_1-\u5B9E\u73B0\u6548\u679C",tabindex:"-1"},[e("1. \u5B9E\u73B0\u6548\u679C "),l("a",{class:"header-anchor",href:"#_1-\u5B9E\u73B0\u6548\u679C","aria-hidden":"true"},"#")],-1),P=l("p",null,[e("\u5728"),l("code",null,"popper"),e(" \u8282\u70B9\u5C55\u793A\u540E\u70B9\u51FB\u84DD\u8272\u533A\u57DF\u540E"),l("code",null,"popper"),e(" \u8282\u70B9\u624D\u4F1A\u6D88\u5931")],-1),S=w("",19),j=JSON.parse('{"title":"Clickoutside\u6307\u4EE4","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u5B9E\u73B0\u6548\u679C","slug":"_1-\u5B9E\u73B0\u6548\u679C","link":"#_1-\u5B9E\u73B0\u6548\u679C","children":[]},{"level":2,"title":"2. \u5177\u4F53\u5B9E\u73B0","slug":"_2-\u5177\u4F53\u5B9E\u73B0","link":"#_2-\u5177\u4F53\u5B9E\u73B0","children":[]},{"level":2,"title":"3. element-plus \u7684\u5B9E\u73B0","slug":"_3-element-plus-\u7684\u5B9E\u73B0","link":"#_3-element-plus-\u7684\u5B9E\u73B0","children":[]}],"relativePath":"js/vue/directives/clickoutside/index.md","lastUpdated":1681310007000}'),U={name:"js/vue/directives/clickoutside/index.md"},K=Object.assign(U,{setup(s){return(n,a)=>(y(),D("div",null,[I,N,P,T(R),S]))}});export{j as __pageData,K as default};
