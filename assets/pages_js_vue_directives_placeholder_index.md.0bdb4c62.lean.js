import{_ as i,i as C,o as t,c as r,F as A,k as b,x as u,u as F,b as D,t as m,j as d,a as c,m as v}from"./app.14c99a0e.js";let a=null;const g={mounted(s,n){s.__tip=n.value;const l=()=>{a&&(a=null);const{width:e,left:p,top:o}=s.getBoundingClientRect();a=document.createElement("div"),a.innerHTML=s.__tip,a.classList.add("v-tooltip"),a.style.width=`${e}px`,a.style.left=`${p}px`,o-s.scrollHeight-20<0?a.style.top=o+40+"px":a.style.top=o-s.scrollHeight-20+"px",document.documentElement.classList.contains("dark")?(a.style.backgroundColor="#9ea0a5",a.style.color="#242424"):a.style.backgroundColor="#fff",document.body.appendChild(a)};(s.scrollWidth>s.offsetWidth||n.modifiers.show||s.scrollHeight>s.offsetHeight||n.modifiers.force)&&(s.addEventListener("mouseenter",()=>{s.style.cursor="pointer",l();const e=()=>{a&&a.remove()},p=y(s);p&&p.addEventListener("scroll",e)}),s.addEventListener("mouseleave",()=>{a&&a.remove()}))},updated(s,n){s.__tip=n.value},beforeUnmount(){a&&a.remove()}},y=s=>{if(!s||!s.parentElement)return null;const n=s.parentElement,l=window.getComputedStyle(n,null).overflow;if(n.scrollWidth>n.clientHeight&&(l==="auto"||l==="scroll"))return n;y(n)},h={beforeMount(s,n,l){const e=l.dirs.find(p=>p.value===n.value&&p.value!==void 0);e?(s.innerHTML=e.value||n.arg||n.modifiers.empty&&"- -",s.classList.remove("v-animation-bg"),s.classList.remove("v-animated-bg-text")):(s.classList.add("v-animation-bg"),s.classList.add("v-animated-bg-text"))},updated(s,n){s.classList.remove("v-animation-bg"),s.classList.remove("v-animated-bg-text"),s.innerHTML=n.value||n.arg||n.modifiers.empty&&"- -"||""}};const _={class:"view-demo-component"},E={__name:"placeholder",setup(s){const n="\u6682\u65E0\u6570\u636E",l=C({numbers:[{},{},{},{}]});return setTimeout(()=>{l.numbers=[{id:10,name:"test1"},{id:20,name:""},{id:30,name:"test3"}]},3e3),(e,p)=>(t(),r("div",_,[(t(!0),r(A,null,b(l.numbers,(o,T)=>u((t(),r("div",{key:o.id,class:"item"},[D(m(o.name),1)])),[[F(g),o],[F(h),o.name,n]])),128))]))}},f=i(E,[["__scopeId","data-v-b8aa4ec8"]]),B=c("h1",{id:"placeholder\u6307\u4EE4",tabindex:"-1"},[D("Placeholder\u6307\u4EE4 "),c("a",{class:"header-anchor",href:"#placeholder\u6307\u4EE4","aria-hidden":"true"},"#")],-1),x=c("h2",{id:"_1-\u5B9E\u73B0\u6548\u679C",tabindex:"-1"},[D("1. \u5B9E\u73B0\u6548\u679C "),c("a",{class:"header-anchor",href:"#_1-\u5B9E\u73B0\u6548\u679C","aria-hidden":"true"},"#")],-1),q=v("",14),k=JSON.parse('{"title":"Placeholder\u6307\u4EE4","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u5B9E\u73B0\u6548\u679C","slug":"_1-\u5B9E\u73B0\u6548\u679C","link":"#_1-\u5B9E\u73B0\u6548\u679C","children":[]},{"level":2,"title":"2. \u5177\u4F53\u5B9E\u73B0","slug":"_2-\u5177\u4F53\u5B9E\u73B0","link":"#_2-\u5177\u4F53\u5B9E\u73B0","children":[]}],"relativePath":"pages/js/vue/directives/placeholder/index.md","lastUpdated":1693917276000}'),L={name:"pages/js/vue/directives/placeholder/index.md"},H=Object.assign(L,{setup(s){return(n,l)=>(t(),r("div",null,[B,x,d(f),q]))}});export{k as __pageData,H as default};
