import{h as r}from"../app.14c99a0e.js";const E=e=>{const n=r().format("YYYY-MM-DD"),a=r(e).format("YYYY-MM-DD"),t=r(n).diff(a,"day");return t===0?"\u4ECA\u5929":t===1?"\u6628\u5929":t===2?"\u524D\u5929":t<4?"\u4E09\u5929\u5185":t<7?"\u4E00\u5468\u5185":"\u4E00\u5468\u524D"},i=(e,n=0)=>{if(typeof e.day!="number")return!1;const{year:a,month:t,day:s}=e;return r().isSame(r(`${a}-${t+n}-${s}`),"day")},u=["\u65E5","\u4E00","\u4E8C","\u4E09","\u56DB","\u4E94","\u516D"],c=u.concat(u),D=(e=0)=>c.slice(e,e+7),y=(e=new Date)=>(e.setDate(1),e.getDay()),f=(e=new Date)=>new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),l=(e=0,n=new Date)=>{const a=D(e),t=new Array(y(n)-e),s=[...Array(f(n)).keys()].map(o=>o+=1);return a.concat(t).concat(s)};export{E as c,i,l as s};
