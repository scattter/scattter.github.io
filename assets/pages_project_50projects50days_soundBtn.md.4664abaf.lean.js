import{_ as F,e as D,o as p,c as e,p as y,g as i,a as s,j as u,b as t,m as d}from"./app.14c99a0e.js";const l=a=>(y("data-v-252c1668"),a=a(),i(),a),C={class:"main-area view-demo-component"},A=l(()=>s("audio",{class:"tada",src:"./viewComponent/SoundBtn/tada.mp3"},null,-1)),b=l(()=>s("audio",{class:"wrong",src:"./viewComponent/SoundBtn/wrong.mp3"},null,-1)),_=l(()=>s("button",{class:"btn btn1",value:"tada"},"click me listen tada music",-1)),m=l(()=>s("button",{class:"btn btn2",value:"wrong"},"click me listen wrong music",-1)),h=[A,b,_,m],g={__name:"SoundBtn",setup(a){return D(()=>{let n;document.querySelectorAll(".btn").forEach(c=>{c.addEventListener("click",r=>{n&&(n.pause(),n.currentTime=0),n=document.querySelector(`.${r.target.value}`),n.play()})})}),(n,o)=>(p(),e("div",C,h))}},v=F(g,[["__scopeId","data-v-252c1668"]]),E=s("h1",{id:"sound-board",tabindex:"-1"},[t("Sound Board "),s("a",{class:"header-anchor",href:"#sound-board","aria-hidden":"true"},"#")],-1),S=s("h2",{id:"_1-\u5B9E\u73B0\u6548\u679C",tabindex:"-1"},[t("1. \u5B9E\u73B0\u6548\u679C "),s("a",{class:"header-anchor",href:"#_1-\u5B9E\u73B0\u6548\u679C","aria-hidden":"true"},"#")],-1),q=d("",8),B=JSON.parse('{"title":"Sound Board","description":"","frontmatter":{},"headers":[{"level":2,"title":"1. \u5B9E\u73B0\u6548\u679C","slug":"_1-\u5B9E\u73B0\u6548\u679C","link":"#_1-\u5B9E\u73B0\u6548\u679C","children":[]},{"level":2,"title":"2. \u5177\u4F53\u5B9E\u73B0","slug":"_2-\u5177\u4F53\u5B9E\u73B0","link":"#_2-\u5177\u4F53\u5B9E\u73B0","children":[]}],"relativePath":"pages/project/50projects50days/soundBtn.md","lastUpdated":1693917276000}'),w={name:"pages/project/50projects50days/soundBtn.md"},k=Object.assign(w,{setup(a){return(n,o)=>(p(),e("div",null,[E,S,u(v),q]))}});export{B as __pageData,k as default};
