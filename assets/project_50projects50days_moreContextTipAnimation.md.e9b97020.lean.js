import{q as D,e as F,o,c as e,d as t,_ as y,i as C,a,b as c}from"./app.f534a971.js";const A={class:"wrapper view-demo-component"},i=t('<div class="main" data-v-72f29f3a><div class="card" data-v-72f29f3a>1</div><div class="card" data-v-72f29f3a>2</div><div class="card" data-v-72f29f3a>3</div><div class="card" data-v-72f29f3a>4</div><div class="card" data-v-72f29f3a>5</div><div class="card" data-v-72f29f3a>6</div><div class="card" data-v-72f29f3a>7</div></div><div class="tip" data-v-72f29f3a><div class="tip-text" data-v-72f29f3a>more</div><div class="tip-icon" data-v-72f29f3a><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16" data-v-72f29f3a><path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" data-v-72f29f3a></path><path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" data-v-72f29f3a></path></svg></div></div>',2),b=[i],u=D({__name:"MoreContextTipAnimation",setup(r){return F(()=>{const s=document.getElementsByClassName("card");let l=s.item(s.length-1);const n=document.querySelector(".tip");new IntersectionObserver(function(p){p[0].intersectionRatio<.8?n.classList.contains("tip-hidden")&&n.classList.remove("tip-hidden"):p[0].intersectionRatio===1&&!n.classList.contains("tip-hidden")&&n.classList.add("tip-hidden")},{root:document.querySelector(".main"),threshold:[.8,1]}).observe(l)}),(s,l)=>(o(),e("div",A,b))}});const d=y(u,[["__scopeId","data-v-72f29f3a"]]),m=a("h1",{id:"more-context-tip-animation",tabindex:"-1"},[c("More Context Tip Animation "),a("a",{class:"header-anchor",href:"#more-context-tip-animation","aria-hidden":"true"},"#")],-1),v=a("h2",{id:"_1-\u5B9E\u73B0\u6548\u679C",tabindex:"-1"},[c("1. \u5B9E\u73B0\u6548\u679C "),a("a",{class:"header-anchor",href:"#_1-\u5B9E\u73B0\u6548\u679C","aria-hidden":"true"},"#")],-1),E=t("",16),f=JSON.parse('{"title":"More Context Tip Animation","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u5B9E\u73B0\u6548\u679C","slug":"_1-\u5B9E\u73B0\u6548\u679C","link":"#_1-\u5B9E\u73B0\u6548\u679C","children":[]},{"level":2,"title":"2. \u5177\u4F53\u5B9E\u73B0\u4E00(\u5355\u6587\u4EF6\u5E94\u7528)","slug":"_2-\u5177\u4F53\u5B9E\u73B0\u4E00-\u5355\u6587\u4EF6\u5E94\u7528","link":"#_2-\u5177\u4F53\u5B9E\u73B0\u4E00-\u5355\u6587\u4EF6\u5E94\u7528","children":[]},{"level":2,"title":"3. \u5177\u4F53\u5B9E\u73B0\u4E8C(\u57FA\u4E8EcreatApp\u6DFB\u52A0\u6307\u4EE4)","slug":"_3-\u5177\u4F53\u5B9E\u73B0\u4E8C-\u57FA\u4E8Ecreatapp\u6DFB\u52A0\u6307\u4EE4","link":"#_3-\u5177\u4F53\u5B9E\u73B0\u4E8C-\u57FA\u4E8Ecreatapp\u6DFB\u52A0\u6307\u4EE4","children":[]},{"level":2,"title":"4. \u5177\u4F53\u5B9E\u73B0\u4E09(\u65B0\u5EFA\u7EC4\u4EF6)","slug":"_4-\u5177\u4F53\u5B9E\u73B0\u4E09-\u65B0\u5EFA\u7EC4\u4EF6","link":"#_4-\u5177\u4F53\u5B9E\u73B0\u4E09-\u65B0\u5EFA\u7EC4\u4EF6","children":[]}],"relativePath":"project/50projects50days/moreContextTipAnimation.md","lastUpdated":1669989209000}'),g={name:"project/50projects50days/moreContextTipAnimation.md"},_=Object.assign(g,{setup(r){return(s,l)=>(o(),e("div",null,[m,v,C(d),E]))}});export{f as __pageData,_ as default};