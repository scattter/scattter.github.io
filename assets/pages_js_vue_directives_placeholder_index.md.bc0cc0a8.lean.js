import{t as F}from"./chunks/tooltip.73439271.js";import{_ as y,i as C,o as p,c as o,F as i,k as A,m as b,u as D,b as c,t as m,j as u,a as e,n as d}from"./app.3123c535.js";const v={beforeMount(s,n,a){const r=a.dirs.find(t=>t.value===n.value&&t.value!==void 0);r?(s.innerHTML=r.value||n.arg||n.modifiers.empty&&"- -",s.classList.remove("v-animation-bg"),s.classList.remove("v-animated-bg-text")):(s.classList.add("v-animation-bg"),s.classList.add("v-animated-bg-text"))},updated(s,n){s.classList.remove("v-animation-bg"),s.classList.remove("v-animated-bg-text"),s.innerHTML=n.value||n.arg||n.modifiers.empty&&"- -"||""}};const g={class:"view-demo-component"},_={__name:"placeholder",setup(s){const n="\u6682\u65E0\u6570\u636E",a=C({numbers:[{},{},{},{}]});return setTimeout(()=>{a.numbers=[{id:10,name:"test1"},{id:20,name:""},{id:30,name:"test3"}]},3e3),(r,t)=>(p(),o("div",g,[(p(!0),o(i,null,A(a.numbers,(l,q)=>b((p(),o("div",{key:l.id,class:"item"},[c(m(l.name),1)])),[[D(F),l],[D(v),l.name,n]])),128))]))}},h=y(_,[["__scopeId","data-v-b8aa4ec8"]]),E=e("h1",{id:"placeholder\u6307\u4EE4",tabindex:"-1"},[c("Placeholder\u6307\u4EE4 "),e("a",{class:"header-anchor",href:"#placeholder\u6307\u4EE4","aria-hidden":"true"},"#")],-1),B=e("h2",{id:"_1-\u5B9E\u73B0\u6548\u679C",tabindex:"-1"},[c("1. \u5B9E\u73B0\u6548\u679C "),e("a",{class:"header-anchor",href:"#_1-\u5B9E\u73B0\u6548\u679C","aria-hidden":"true"},"#")],-1),f=d("",14),k=JSON.parse('{"title":"Placeholder\u6307\u4EE4","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u5B9E\u73B0\u6548\u679C","slug":"_1-\u5B9E\u73B0\u6548\u679C","link":"#_1-\u5B9E\u73B0\u6548\u679C","children":[]},{"level":2,"title":"2. \u5177\u4F53\u5B9E\u73B0","slug":"_2-\u5177\u4F53\u5B9E\u73B0","link":"#_2-\u5177\u4F53\u5B9E\u73B0","children":[]}],"relativePath":"pages/js/vue/directives/placeholder/index.md","lastUpdated":1693917276000}'),x={name:"pages/js/vue/directives/placeholder/index.md"},w=Object.assign(x,{setup(s){return(n,a)=>(p(),o("div",null,[E,B,u(h),f]))}});export{k as __pageData,w as default};