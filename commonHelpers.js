import{a as S,i as y,S as q}from"./assets/vendor-b11e2a50.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const M="https://pixabay.com/api/";async function g(e,o,n){return(await S(M,{params:{key:"44177733-63c355e78480ae17b664c6dfc",q:e,flower:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:n,per_page:15}})).data}document.querySelector(".gallery");function v(e){return`<li class="img-item">
    <a class="img-link" href="${e.largeImageURL}">
    <img class="image" src="${e.webformatURL}" alt="${e.tags}"></a>
<div class="img-info">
    <p class="info"><b>Likes</b> ${e.likes}</p>
    <p class="info"><b>Views</b> ${e.views}</p>
    <p class="info"><b>Comments</b> ${e.comments}</p>
    <p class="info"><b>Downloads</b> ${e.downloads}</p>
   </div>
    </li>`}function b(e){return e.map(v).join("")}const $=document.querySelector(".form"),d=document.querySelector(".gallery"),L=document.querySelector(".loader"),f=document.querySelector(".btn-load-more");$.addEventListener("submit",T);f.addEventListener("click",x);let s=1,i="",m;function O(){m=new q(".gallery a",{captionsData:"alt",captionDelay:250})}O();p();async function T(e){if(e.preventDefault(),d.innerHTML="",p(),w(),s=1,i=e.target.elements.query.value.trim(),!i){u(),l();return}try{const o=await g(i,s);if(o.hits.length===0)l();else{const n=b(o.hits);d.innerHTML=n,m.refresh(),B()}}catch{l()}finally{e.target.reset(),u()}}async function x(){s+=1,w();try{const e=await g(i,s),o=b(e.hits);d.insertAdjacentHTML("beforeend",o),m.refresh(),F();const n=Math.ceil(e.totalHits/e.hits.length);s>=n&&(p(),h())}catch{h()}finally{u()}}function w(){L.style.display="block"}function u(){L.style.display="none"}function B(){f.classList.remove("hidden")}function p(){f.classList.add("hidden")}function l(){y.error({message:"Sorry, there are no images matching your search query.",messageColor:"#FAFAFB",color:"#EF4040",position:"topRight"})}function h(){y.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function F(){const o=document.querySelector(".img-item").getBoundingClientRect().height;window.scrollBy({left:0,top:o,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
