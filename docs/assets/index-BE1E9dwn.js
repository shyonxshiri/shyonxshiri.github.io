import{r as F,a as o,j as e,A as R,m as c}from"./vendor-DCHKMGkb.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))d(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function d(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();var S={},_;function T(){if(_)return S;_=1;var t=F();return S.createRoot=t.createRoot,S.hydrateRoot=t.hydrateRoot,S}var W=T();const M=[{id:"creative-projects",title:"Creative Projects",tag:"Design, 3D & Craft",img:"/assets/3D_Models_Cover_Pic.jpg",size:"tall",objectPosition:"45% 90%",media:[{type:"video",src:"/assets/Broken_NPC.MP4",poster:"/assets/Broken_NPC.jpg",title:"The Broken NPC",year:2024,desc:"A detailed 3D scene depicting in-game rendering errors from GTA San Andreas, created entirely using Blender.",aspectRatio:"16/9",relatedItems:[]},{type:"video",src:"/assets/Blender_Case_Video.mp4",poster:"/assets/Blender_Case.jpg",title:"Apple Accessory Prototypes",year:2024,desc:"3D designed Apple product case prototypes developed using Blender.",aspectRatio:"16/9",relatedItems:["Custom Airpod Case","Custom Phone Case"]},{type:"video",src:"/assets/Shiri_Video_Game.mp4",poster:"/assets/Shiri_VIdeo_Game.jpg",title:"Video Game Demo",year:2024,desc:"Animated and assembled collection of images created in Adobe After Effects.",aspectRatio:"16/9"},{type:"image",src:"/assets/Venom.PNG",title:"Rendered 3D Model",year:2024,desc:"High-quality 3D rendered movie character with detailed modeling and texturing in Blender.",aspectRatio:"16/9"},{type:"image",src:"/assets/My_Case.jpg",title:"Custom Phone Case",year:2025,desc:"Finalized rendition of the iPhone case prototype, designed to resemble liquid metal.",aspectRatio:"5/6",relatedItems:["Apple Accessory Prototypes"]},{type:"image",src:"/assets/Airpod_Case.JPG",title:"Custom Airpod Case",year:2026,desc:"Finalized rendition of the Airpod case prototype, designed to resemble liquid metal.",aspectRatio:"4/5",relatedItems:["Apple Accessory Prototypes"]},{type:"image",src:"/assets/New_Radar_Sensor_front.jpg",title:"Radar — Front View",year:2024,hidden:!0},{type:"image",src:"/assets/New_Radar_Sensor_Back.jpg",title:"Radar — Back View",year:2024,hidden:!0},{type:"image",src:"/assets/New_LED_Box_Front.jpg",title:"RGB Box — Front View",year:2024,hidden:!0},{type:"image",src:"/assets/New_LED_Box_Back.jpg",title:"RGB Box — Back View",year:2024,hidden:!0},{type:"image",src:"/assets/Max_Pic.JPG",title:"Candid Studio Portrait",year:2024,desc:"A vibrant portrait capturing authentic moments with professional lighting.",aspectRatio:"2/3"},{type:"image",src:"/assets/Photography_1.jpg",title:"Studio Photography",year:2024,desc:"Professional photography exploring composition and lighting techniques.",aspectRatio:"1/1"},{type:"video",src:"/assets/New_Radar_Sensor.mp4",poster:"/assets/New_Radar_Sensor_front.jpg",title:"HMI Sensor System",year:2024,desc:"Interactive radar module converting ultrasonic data into real-time feedback. Custom 3D printed enclosure with LCD and speaker.",aspectRatio:"4/3",relatedItems:["Radar — Front View","Radar — Back View"]},{type:"video",src:"/assets/New_LED_Box.mp4",poster:"/assets/New_LED_Box_Front.jpg",title:"Custom RGB Controller",year:2024,desc:"Functional system built from scratch. 3D printed geometric casing housing the microcontroller.",aspectRatio:"4/3",relatedItems:["RGB Box — Front View","RGB Box — Back View"]},{type:"image",src:"/assets/Shyon_Sculpture.jpg",title:"Product, not Consumer",year:2024,desc:"Hand-fabricated steel sculpture referencing consumer tech culture — welded, ground, sanded and finished.",aspectRatio:"5/4"},{type:"image",src:"/assets/Adverstisement_Project.jpg",title:"Campaign Project",year:2024,desc:"Conceptual brand advertisement utilizing environmental storytelling and scenic composition.",aspectRatio:"16/9"}]},{id:"professional-services",title:"Professional Services",tag:"Web & Design",img:"/assets/Digital_Media_Cover.jpg",size:"wide",media:[{type:"image",src:"/assets/Mina_Website.png",title:"UI/UX — minasech.net",year:2025,desc:"Full-stack website design including React frontend and responsive interface.",link:"https://minasech.net",wide:!0,aspectRatio:"16/9"},{type:"image",src:"/assets/Everly_Cover_Image.png",title:"Everly Care Home",year:2026,desc:"Full-stack website design and development including branding, responsive interface, and complete deployment for a senior care community business.",link:"https://everlycarehome.com",wide:!0,aspectRatio:"16/9"}]},{id:"nabu",title:"NABU",tag:"Clothing Brand",img:"/assets/New_NABU_Site_Cover_Card.jpg",size:"tall",media:[{type:"video",src:"/assets/Nabu_Poster_Banner.mp4",poster:"/assets/Nabu_Poster_Banner.jpg",title:"NABU Promotional Video",year:2023,desc:"Dynamic promotional video for NABU clothing, crafted with professional animation in Adobe After Effects.",wide:!0},{type:"video",src:"/assets/NABU_PUFFER_AD.mp4",poster:"/assets/NABU_Puffer_AD.jpg",title:"NABU 2026 Teaser",year:2025,desc:"Professional promotional video for NABU's puffer jacket collection shot with cinematic quality."},{type:"video",src:"/assets/NABU_SALE_AD.mp4",poster:"/assets/NABU_SALE_AD.jpg",title:"NABU 2025 Summer Collection",year:2025,desc:"Engaging promotional content showcasing NABU's latest collection."},{type:"image",src:"/assets/Stevie_Pic.JPG",title:"NABU 2023 Spring Collection",year:2022,desc:"Professional portrait photography showcasing design systems and visual aesthetics."},{type:"image",src:"/assets/Digital_Media_Cover.jpg",title:"NABU 2024 Rerelease Promotion",year:2024,desc:"Promotional campaign showcasing the return of our Persian rug pants, reimagined for 2024.",aspectRatio:"3/4"}]}],u=["home","work","about","contact"],D=`
  :root {
    --black: #060606;
    --white: #f5f2ed;
    --cream: #ede8e0;
    --sky: #38bdf8;
    --cyan: #22d3ee;
    --accent: #ff4d1c;
    --mid: #8a8a8a;
    --ease-out: cubic-bezier(0.16,1,0.3,1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 100%; height: 100%;
    overflow: hidden;
    background: var(--black);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
    cursor: none !important;
  }

  * { cursor: none !important; }

  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  div::-webkit-scrollbar { display: none; }
  html, body { scrollbar-width: none; -ms-overflow-style: none; }

  /* noise overlay */
  body::after {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none; z-index: 99998;
    opacity: 0.032;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  @media (max-width: 768px) {
    body::after { display: none; }
  }

  /* ─ MOBILE RESPONSIVE (iPhone 17e & similar - max 640px) ─ */
  @media (max-width: 640px) {
    /* Navigation */
    nav ul { gap: 16px !important; }
    nav { padding-left: max(16px, calc(16px + env(safe-area-inset-left))) !important; padding-right: max(16px, calc(16px + env(safe-area-inset-right))) !important; }

    /* Work Page - Cards */
    .ss-card { min-height: 420px !important; }

    /* About Page */
    .ss-about-subtitle { font-size: 9px !important; }
    .ss-about-page h2 { font-size: 28px !important; }
    .ss-about-page p { font-size: 12px !important; line-height: 1.8 !important; }

    /* Contact Page */
    .ss-contact-heading { font-size: clamp(32px, 6vw, 64px) !important; }
    .ss-contact-subtitle { font-size: 8px !important; letter-spacing: 3px !important; }
    .ss-contact-description { font-size: clamp(12px, 1.5vw, 14px) !important; }
  }

  /* cursor */
  #ss-cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 99999;
    width: 8px; height: 8px;
    background: var(--white);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%,-50%);
    opacity: 0.8;
  }

  /* work rail drag cursor */
  .ss-rail { cursor: none; }
  .ss-rail:active { cursor: none; }

  @media (max-width: 1023px) {
    /* WorkPage grid adjusts for tablet */
    .ss-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 640px) {
    /* WorkPage grid is single column on mobile */
    .ss-grid {
      grid-template-columns: 1fr !important;
    }
  }

  /* modal / viewer scrollbar hide */
  .ss-modal-grid { scrollbar-width: none; }
  .ss-modal-grid::-webkit-scrollbar { display: none; }

  /* scroll hint wheel */
  @keyframes ss-wheel {
    0%,100% { top: 5px; opacity: 1; }
    60%      { top: 18px; opacity: .15; }
  }
  .ss-wheel-dot { animation: ss-wheel 1.8s ease-in-out infinite; }

  /* scroll hint arrow (mobile) */
  @keyframes ss-arrow-bounce {
    0%,100% { transform: translateY(0); opacity: 1; }
    50%      { transform: translateY(8px); opacity: .3; }
  }

  /* drag hint arrow */
  @keyframes ss-drift {
    0%,100% { transform: translateX(0); }
    50%      { transform: translateX(8px); }
  }
  .ss-drift { animation: ss-drift 2s ease-in-out infinite; }

  /* contact btn fill */
  .ss-contact-btn {
    position: relative; overflow: hidden;
    transition: color .4s ease, border-color .4s ease;
  }
  .ss-contact-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--sky);
    transform: translateX(-105%);
    transition: transform .5s var(--ease-out);
    z-index: 0;
  }
  .ss-contact-btn:hover { color: var(--black) !important; border-color: var(--sky) !important; }
  .ss-contact-btn:hover::before { transform: translateX(0); }
  .ss-contact-btn > * { position: relative; z-index: 1; }
  .ss-contact-btn span { position: relative; z-index: 1; }

  /* tile hover scale */
  .ss-tile img, .ss-tile video {
    transform: scale(1.06);
    transition: transform .6s var(--ease-out);
  }
  .ss-tile:hover img, .ss-tile:hover video { transform: scale(1); }

  /* 3d rendering card zoom hover */
  .ss-3d-rendering:hover img {
    transform: scale(1.14) !important;
  }

  /* work card image */
  .ss-card-img {
    transform: scale(1.08);
    transition: transform .7s var(--ease-out), filter .4s ease;
    filter: brightness(.65) saturate(.85);
  }
  .ss-card:hover .ss-card-img {
    transform: scale(1);
    filter: brightness(.88) saturate(1);
  }
  .ss-card-overlay {
    opacity: 0;
    transition: opacity .35s ease;
  }
  .ss-card:hover .ss-card-overlay { opacity: 1; }

  /* about photo */
  .ss-about-photo {
    transform: scale(1.12);
    transition: transform 10s ease;
  }
  .ss-about-photo-active { transform: scale(1) !important; }

  /* hero bg */
  .ss-hero-bg {
    transform: scale(1.06);
    transition: transform 8s ease;
  }
  .ss-hero-bg-active { transform: scale(1) !important; }

  /* Responsive modal sizing before mobile breakpoint */
  @media (max-width: 1200px) {
    .ss-work-modal {
      max-width: 1100px !important;
    }
  }

  @media (max-width: 1100px) {
    .ss-work-modal {
      max-width: 900px !important;
    }
  }

  @media (max-width: 1024px) {
    .ss-work-modal {
      max-width: 700px !important;
      max-height: 70dvh !important;
    }
  }

  @media (max-width: 1023px) {
    .ss-work-modal {
      width: 95vw !important;
      max-width: 100% !important;
      max-height: 65dvh !important;
    }
    .ss-modal-grid { 
      display: flex !important;
      flex-direction: row !important;
      gap: 16px;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      padding-right: 16px !important;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .ss-modal-grid > * {
      flex-shrink: 0;
      width: 140px;
      scroll-snap-align: start;
    }
  }

  /* media viewer responsive */
  @media (max-width: 1023px) {
    .ss-media-viewer {
      position: relative !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: flex-start !important;
      gap: 20px !important;
      maxHeight: 95dvh !important;
      maxWidth: 100vw !important;
      padding: 20px !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
    }
    .ss-media-viewer > button:first-child {
      position: static !important;
      order: -1 !important;
      margin-bottom: 12px !important;
      align-self: flex-start !important;
    }
    .ss-media-viewer > div:nth-child(2) {
      order: 2 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
    }
    .ss-media-viewer > div:nth-child(3) {
      order: 1 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
      padding-right: 12px !important;
      padding-top: 20px !important;
      padding-left: 16px !important;
    }
    .ss-media-viewer > div:nth-child(2) > div {
      width: 100% !important;
      height: auto !important;
      max-height: 35dvh !important;
    }
    .ss-media-viewer > div:nth-child(2) video,
    .ss-media-viewer > div:nth-child(2) img {
      max-height: 35dvh !important;
      width: auto !important;
      height: auto !important;
    }
  }

  @media (max-width: 768px) {
    html, body { cursor: grab; }
    #ss-cursor-dot, #ss-cursor-ring { display: none !important; }
    .ss-hero-bg { object-position: 78% 5% !important; }
    /* about page font sizing on tablet */
    .ss-about-page .ss-about-subtitle { font-size: 8px !important; }
    .ss-about-page h2 { font-size: clamp(56px, 7vw, 120px) !important; }
    .ss-about-page p { font-size: 15px !important; }
    /* close button fix on mobile */
    .ss-media-viewer > button:first-child {
      position: static !important;
      top: auto !important;
      right: auto !important;
      order: -1 !important;
      margin-bottom: 12px !important;
      align-self: flex-start !important;
      padding: 12px 16px !important;
      width: fit-content !important;
      pointer-events: auto !important;
    }
  }

  @media (max-width: 700px) {
    .ss-hero-bg { object-position: 82% 5% !important; }
  }

  @media (max-width: 640px) {
    .ss-hero-bg { object-position: 75% 5% !important; }
    html, body { cursor: grab; }
    #ss-cursor-dot, #ss-cursor-ring { display: none !important; }
    /* homepage content positioning on mobile */
    .ss-home-page > div > div { bottom: 18vh !important; }
    /* navigation hint on mobile */
    .ss-nav-hint { right: 150px !important; }
    .ss-nav-hint svg { width: 11px !important; height: 19px !important; }
    /* modal close button positioning */
    .ss-modal-close { top: 20px !important; }
    /* media viewer close button positioned above title on all devices */
    .ss-media-viewer-close { top: 100px !important; }
    /* contact page text sizing on mobile */
    .ss-contact-subtitle { font-size: 16px !important; }
    .ss-contact-heading { font-size: clamp(90px,12vw,200px) !important; }
    .ss-contact-description { font-size: clamp(22px,4vw,36px) !important; }
    /* about page font sizing on mobile */
    .ss-about-page .ss-about-subtitle { font-size: 6px !important; }
    .ss-about-page h2 { font-size: clamp(42px, 5vw, 90px) !important; }
    .ss-about-page p { 
      font-size: 13px !important; 
      line-height: 1.4 !important;
      margin-top: 8px !important;
    }
    .ss-about-text-column { padding-top: 100px !important; }
    /* reduce about page image cropping on mobile */
    .ss-about-photo { object-position: center 25% !important; }
  }

  /* Ensure pages extend behind safe areas on all devices */
  [key] {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100dvh !important;
  }
`;function H(){const t=o.useRef(null);return o.useEffect(()=>{const n=r=>{t.current&&(t.current.style.left=r.clientX+"px",t.current.style.top=r.clientY+"px")};return window.addEventListener("mousemove",n),()=>window.removeEventListener("mousemove",n)},[]),e.jsx("div",{id:"ss-cursor-dot",ref:t})}function v(){const t=o.useCallback(()=>document.body.classList.add("ss-hover"),[]),n=o.useCallback(()=>document.body.classList.remove("ss-hover"),[]);return{onMouseEnter:t,onMouseLeave:n}}const C={initial:{opacity:0},animate:{opacity:1,transition:{duration:.6}},exit:{opacity:0,transition:{duration:.45}}};function V(){const[t,n]=o.useState("home"),[r,d]=o.useState(null),[i,a]=o.useState(null),[p,h]=o.useState(window.innerWidth>=1024),[z,w]=o.useState(!0),l=u.indexOf(t),g=o.useRef(!1),x=v(),y=o.useRef(!1);o.useEffect(()=>{if(document.getElementById("ss-global"))return;const s=document.createElement("style");s.id="ss-global",s.innerHTML=D,document.head.appendChild(s)},[]),o.useEffect(()=>{const s=()=>{h(window.innerWidth>=1024)};return window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]),o.useEffect(()=>{const s=t==="about"?"#ede8e0":"#060606";document.documentElement.style.backgroundColor=s,document.body.style.backgroundColor=s},[t]);const j=o.useRef(l);o.useEffect(()=>{j.current=l},[l]);const B=o.useRef(t);o.useEffect(()=>{B.current=t},[t]);const E=o.useCallback(s=>{s!==t&&(d(null),a(null),n(s))},[t]);o.useEffect(()=>{const s=m=>{if(y.current||(y.current=!0,w(!1)),g.current||B.current==="work"&&window.innerWidth<1024)return;const f=m.target;if(f.closest(".ss-modal-grid")||f.closest(".ss-media-viewer")||Math.abs(m.deltaX)>Math.abs(m.deltaY)*.5)return;const k=m.deltaY>0?1:-1,b=Math.max(0,Math.min(u.length-1,j.current+k));b!==j.current&&(g.current=!0,n(u[b]),setTimeout(()=>{g.current=!1},1100))};return window.addEventListener("wheel",s,{passive:!0}),()=>window.removeEventListener("wheel",s)},[]);const P=o.useRef(0),I=o.useRef(0);return o.useEffect(()=>{const s=f=>{P.current=f.touches[0].clientY,I.current=f.touches[0].clientX},m=f=>{if(y.current||(y.current=!0,w(!1)),g.current||B.current==="work")return;const k=f.target;if(k.closest(".ss-rail")||k.closest(".ss-modal-grid"))return;const b=P.current-f.changedTouches[0].clientY,A=I.current-f.changedTouches[0].clientX;if(Math.abs(b)<120||Math.abs(b)<Math.abs(A)*3)return;const L=b>0?1:-1,N=Math.max(0,Math.min(u.length-1,j.current+L));N!==j.current&&(g.current=!0,n(u[N]),setTimeout(()=>{g.current=!1},1100))};return window.addEventListener("touchstart",s,{passive:!0}),window.addEventListener("touchend",m,{passive:!0}),()=>{window.removeEventListener("touchstart",s),window.removeEventListener("touchend",m)}},[]),o.useEffect(()=>{const s=m=>{if(i){m.key==="Escape"&&a(null);return}if(r){m.key==="Escape"&&d(null);return}(m.key==="ArrowDown"||m.key==="ArrowRight")&&n(u[Math.min(u.length-1,l+1)]),(m.key==="ArrowUp"||m.key==="ArrowLeft")&&n(u[Math.max(0,l-1)])};return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[l,i,r]),e.jsxs("div",{style:{position:"fixed",inset:0,width:"100%",height:"100dvh",overflow:"hidden",fontFamily:"'Cormorant Garamond', serif",background:"#060606"},children:[e.jsx(H,{}),e.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e4,display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"max(28px, calc(28px + env(safe-area-inset-top)))",paddingBottom:"28px",paddingLeft:"max(48px, calc(48px + env(safe-area-inset-left)))",paddingRight:"max(48px, calc(48px + env(safe-area-inset-right)))",mixBlendMode:t==="about"?"normal":"difference"},children:[e.jsx("div",{style:{visibility:"hidden"}}),e.jsx("ul",{style:{display:"flex",gap:40,listStyle:"none"},children:u.map(s=>e.jsx("li",{children:e.jsx(G,{label:s.charAt(0).toUpperCase()+s.slice(1),active:t===s,onClick:()=>E(s),currentPage:t})},s))})]}),e.jsx("div",{style:{position:"fixed",right:"max(32px, calc(32px + env(safe-area-inset-right)))",top:"50%",transform:"translateY(-50%)",zIndex:400,display:"flex",flexDirection:"column",gap:12,mixBlendMode:t==="about"?"normal":"difference"},children:u.map((s,m)=>e.jsx("button",{onClick:()=>E(s),style:{width:10,height:10,borderRadius:"50%",border:"1px solid rgba(245,242,237,0.4)",background:t===s?"var(--white)":"transparent",transform:t===s?"scale(1.5)":"scale(1)",transition:"all 0.4s ease",cursor:"none"},...x},s))}),e.jsxs(R,{mode:"wait",children:[t==="home"&&e.jsx(U,{onNavigate:E},"home"),t==="work"&&e.jsx(O,{onCardClick:d},"work"),t==="about"&&e.jsx(X,{},"about"),t==="contact"&&e.jsx(q,{},"contact")]}),e.jsx(R,{children:r&&e.jsx(Y,{project:r,onClose:()=>d(null),onMediaClick:a})}),e.jsx(R,{children:i&&e.jsx(K,{item:i,onClose:()=>a(null),onItemClick:a})})]})}function G({label:t,active:n,onClick:r,currentPage:d}){const i=v(),a=d==="about";return e.jsxs("button",{onClick:r,style:{fontFamily:"'Space Mono', monospace",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:a?"#000000":"var(--white)",background:"none",border:"none",cursor:"none",opacity:a||n?1:.55,transition:"opacity 0.3s ease, color 0.3s ease",position:"relative"},...i,children:[t,e.jsx("span",{style:{position:"absolute",bottom:-4,left:0,height:1,background:"var(--sky)",width:n?"100%":0,transition:"width 0.4s cubic-bezier(0.16,1,0.3,1)",display:"none"}})]})}function U({onNavigate:t}){const[n,r]=o.useState(!1),[d,i]=o.useState(window.innerWidth<=640);return o.useEffect(()=>{const a=()=>{i(window.innerWidth<=640)};return window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)},[]),e.jsxs(c.div,{...C,className:"ss-home-page",style:{position:"absolute",inset:0,background:"#060606",overflow:"hidden"},children:[e.jsx("img",{src:"/assets/New_Shiri_Site_Pic.jpg",alt:"",onLoad:()=>r(!0),className:n?"ss-hero-bg ss-hero-bg-active":"ss-hero-bg",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"65% 5%",filter:"brightness(0.62) contrast(1.1)",zIndex:1}}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:2,background:"radial-gradient(ellipse 65% 100% at 72% 50%, transparent 25%, rgba(6,6,6,.65) 70%), linear-gradient(to bottom, rgba(6,6,6,.25) 0%, transparent 30%, transparent 65%, rgba(6,6,6,.85) 100%)"}}),e.jsxs("div",{style:{position:"absolute",bottom:d?"18vh":"36vh",left:"12vw",zIndex:10,transition:"bottom 0.3s ease"},children:[e.jsxs(c.h1,{initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:.9,delay:.35,ease:[.16,1,.3,1]},style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:d?"clamp(48px,7vw,72px)":"clamp(72px,10vw,160px)",lineHeight:.92,letterSpacing:4,color:"var(--white)"},children:["Shyon",e.jsx("br",{}),"Shiri"]}),!d&&e.jsxs(c.a,{href:"/studio.html",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.7,ease:[.16,1,.3,1]},className:"ss-contact-btn",style:{display:"inline-flex",alignItems:"center",gap:12,marginTop:32,padding:"16px 34px",border:"1px solid rgba(245,242,237,.35)",color:"var(--white)",textDecoration:"none",fontFamily:"'Space Mono', monospace",fontSize:12,letterSpacing:4,textTransform:"uppercase",cursor:"none"},children:[e.jsx("span",{children:"Explore the Studio"}),e.jsx("span",{children:"→"})]})]})]},"home")}function O({onCardClick:t}){const n=v(),[r,d]=o.useState(window.innerWidth>=1024);return o.useEffect(()=>{const i=()=>{d(window.innerWidth>=1024)};return window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[]),e.jsxs(c.div,{...C,style:{position:"absolute",inset:0,background:"#1a1a1a",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,padding:"60px 8vw 0 5vw",zIndex:10,display:"flex",alignItems:"flex-end",justifyContent:"space-between"},children:e.jsx(c.h2,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.8,delay:.1,ease:[.16,1,.3,1]},style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(40px,6vw,120px)",letterSpacing:4,lineHeight:1,color:"var(--white)"},children:"Work"})}),e.jsx("div",{className:"ss-grid",style:{position:"absolute",inset:0,top:window.innerWidth<=640?100:140,display:"grid",gridTemplateColumns:r?"repeat(3, 1fr)":window.innerWidth<=640?"1fr":"repeat(2, 1fr)",gap:20,padding:"0 8vw 72px",overflowY:"auto",overflowX:"hidden",scrollbarWidth:"none"},children:M.map((i,a)=>e.jsxs(c.div,{className:`ss-card ${i.id==="3d-rendering"?"ss-3d-rendering":""}`,initial:{opacity:0,y:60},animate:{opacity:1,y:0},transition:{duration:.6,delay:.15+a*.1,ease:[.16,1,.3,1]},onClick:()=>t(i),...n,style:{position:"relative",overflow:"hidden",background:"#111",cursor:"none",border:"1px solid transparent",transition:"border-color 0.4s ease",height:"auto"},whileHover:{borderColor:"var(--sky)"},children:[e.jsx("img",{className:"ss-card-img",src:i.img,alt:i.title,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:i.objectPosition||"center",display:"block",...i.id==="3d-rendering"&&{transform:"scale(1.22)"}}}),e.jsx("div",{className:"ss-card-overlay",style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(6,6,6,.9) 0%, rgba(6,6,6,.3) 50%, transparent 100%)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"28px 24px"},children:e.jsx("div",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:28,letterSpacing:2,color:"var(--white)",lineHeight:1},children:i.title})})]},i.id))})]},"work")}function X(){const[t,n]=o.useState(!1),[r,d]=o.useState(window.innerWidth<=640);return o.useEffect(()=>{const i=()=>{d(window.innerWidth<=640)};return window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[]),e.jsx(c.div,{...C,style:{position:"absolute",inset:0,background:"var(--cream)",overflow:"hidden"},className:"ss-about-page",children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",height:"100%",width:"100%"},children:[e.jsxs("div",{className:"ss-about-text-column",style:{display:"flex",flexDirection:"column",justifyContent:"center",padding:window.innerWidth<=640?"60px 3vw 60px 3vw":"80px 60px 80px 8vw",overflow:"hidden"},children:[e.jsx(c.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.7,delay:.1,ease:[.16,1,.3,1]},className:"ss-about-subtitle",style:{fontFamily:"'Space Mono', monospace",fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"var(--accent)",marginBottom:16},children:"Designer & Maker"}),e.jsx(c.h2,{initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{duration:.8,delay:.2,ease:[.16,1,.3,1]},style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(96px,12vw,180px)",letterSpacing:4,lineHeight:.92,color:"#060606",marginBottom:16},children:"About"}),e.jsx(c.div,{initial:{width:0},animate:{width:80},transition:{duration:1,delay:.5,ease:[.16,1,.3,1]},style:{height:1,background:"#060606",margin:"16px 0"}}),e.jsx(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.55,ease:[.16,1,.3,1]},children:e.jsx("p",{style:{fontFamily:"'Cormorant Garamond', serif",fontSize:20,fontWeight:300,lineHeight:1.75,color:"#3a3a3a",maxWidth:480},children:"I am a graphic designer who specializes in countless mediums ranging through 3D Design, Motion Graphics, UI/UX, Fabrication, Cinematography, Coding, and etc. This variety developed naturally, driven by a lifelong curiosity that started with Lego stop-motion films and never really stopped. What stayed constant through all of it is a perfectionist mindset that I'd describe as both my greatest asset and my most relentless quality. The work isn't done until it's done right, not by anyone else's measure, but by my own."})})]}),e.jsxs(c.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.9,delay:.1},style:{position:"relative",overflow:"hidden",background:"#1a1a1a"},children:[e.jsx("img",{src:"/assets/Shyon_About.png",alt:"Shyon Shiri",onLoad:()=>n(!0),className:t?"ss-about-photo ss-about-photo-active":"ss-about-photo",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 10%",filter:"grayscale(20%) contrast(1.05)"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to right, rgba(237,232,224,.2) 0%, transparent 30%), linear-gradient(to bottom, rgba(6,6,6,.35) 0%, transparent 30%, transparent 60%, rgba(6,6,6,.18) 100%)"}})]})]})},"about")}function q(){const t=v(),n=[{href:"mailto:shyon2001@gmail.com",label:"Email Me",value:"shyon2001@gmail.com",icon:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:e.jsx("path",{d:"M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1"})})},{href:"https://www.linkedin.com/in/shyonshiri/",label:"LinkedIn",value:"in/shyonshiri",target:"_blank",icon:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"})})},{href:"/My Resume.pdf",label:"Resume",value:"My Resume.pdf",target:"_blank",icon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[e.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]})}];return e.jsxs(c.div,{...C,style:{position:"absolute",inset:0,background:"#060606",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",left:-30,bottom:"-12vh",fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(220px, 34vw, 460px)",lineHeight:.8,letterSpacing:6,color:"rgba(245,242,237,.035)",whiteSpace:"nowrap",zIndex:1,userSelect:"none",pointerEvents:"none"},children:"CONTACT"}),e.jsx("div",{style:{position:"absolute",right:"-12vw",top:"-22vh",width:"min(900px, 100vw)",height:"min(900px, 100vw)",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,.35) 0%, rgba(56,189,248,0) 65%)",filter:"blur(65px)",zIndex:1,pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",left:"-15vw",bottom:"-25vh",width:"min(1100px, 120vw)",height:"min(1100px, 120vw)",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,.15) 0%, rgba(56,189,248,0) 60%)",filter:"blur(75px)",zIndex:1,pointerEvents:"none"}}),e.jsxs("div",{style:{position:"relative",zIndex:10,padding:window.innerWidth<=640?"0 18px":"0 9vw",width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:window.innerWidth<=640?20:40,flexWrap:"wrap",marginBottom:window.innerWidth<=640?24:44},children:[e.jsxs("div",{children:[e.jsx(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.7,delay:.2,ease:[.16,1,.3,1]},className:"ss-contact-subtitle",style:{fontFamily:"'Space Mono', monospace",fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"var(--sky)",marginBottom:20},children:"Available for projects"}),e.jsxs(c.h2,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.9,delay:.35,ease:[.16,1,.3,1]},className:"ss-contact-heading",style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(64px,9vw,128px)",letterSpacing:5,lineHeight:.86,color:"var(--white)"},children:["Let's Work",e.jsx("span",{style:{color:"var(--white)"},children:"."})]})]}),e.jsx(c.p,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.8,delay:.5},className:"ss-contact-description",style:{fontFamily:"'Cormorant Garamond', serif",fontStyle:"italic",fontWeight:300,fontSize:"clamp(18px,2vw,22px)",color:"var(--mid)",maxWidth:280,textAlign:"right",marginBottom:8},children:"Open to freelance, collaborations & full-time roles."})]}),e.jsx(c.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.65,ease:[.16,1,.3,1]},style:{display:"flex",flexDirection:"column",borderTop:"1px solid rgba(245,242,237,.14)"},children:n.map((r,d)=>e.jsxs("a",{href:r.href,target:r.target,rel:r.target?"noopener noreferrer":void 0,style:{display:"flex",alignItems:"center",gap:window.innerWidth<=640?16:28,padding:window.innerWidth<=640?"16px 8px":"26px 8px",textDecoration:"none",borderBottom:"1px solid rgba(245,242,237,.14)",transition:"background 0.3s ease, padding-left 0.3s ease",cursor:"none"},onMouseEnter:i=>{i.currentTarget.style.background="rgba(56,189,248,.07)",i.currentTarget.style.paddingLeft="24px"},onMouseLeave:i=>{i.currentTarget.style.background="transparent",i.currentTarget.style.paddingLeft="8px"},...t,children:[e.jsx("span",{style:{fontFamily:"'Space Mono', monospace",fontSize:window.innerWidth<=640?10:12,letterSpacing:2,color:"var(--sky)",width:34,flexShrink:0},children:String(d+1).padStart(2,"0")}),e.jsx("span",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:window.innerWidth<=640?"clamp(18px,3vw,28px)":"clamp(28px,4vw,40px)",letterSpacing:2,color:"var(--white)",width:window.innerWidth<=640?"auto":240,flexShrink:0},children:r.label}),e.jsx("span",{style:{fontFamily:"'Cormorant Garamond', serif",fontSize:window.innerWidth<=640?14:20,color:"var(--mid)",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:r.value}),e.jsx("span",{style:{fontFamily:"'Space Mono', monospace",fontSize:18,color:"var(--sky)",flexShrink:0},children:"→"})]},r.label))})]})]},"contact")}function Y({project:t,onClose:n,onMediaClick:r}){const d=v(),[i,a]=o.useState(window.innerWidth>=1024);return o.useEffect(()=>(document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}),[]),o.useEffect(()=>{const p=()=>{a(window.innerWidth>=1024)};return window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[]),e.jsx(c.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4},onClick:n,style:{position:"fixed",inset:0,zIndex:2e3,background:"rgba(6,6,6,.93)",backdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(c.div,{initial:{opacity:0,scale:.96},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.96},transition:{duration:.4,ease:[.16,1,.3,1]},onClick:p=>p.stopPropagation(),className:"ss-work-modal",style:{position:"relative",width:"90vw",maxWidth:1300,maxHeight:"88dvh",display:"flex",flexDirection:"column"},children:[e.jsx("button",{onClick:n,className:"ss-modal-close",style:{position:"absolute",top:60,right:20,background:"none",border:"none",cursor:"none",fontFamily:"'Space Mono', monospace",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--mid)",transition:"color 0.3s ease",padding:"4px 8px",zIndex:2001},...d,children:"✕ Close"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",paddingBottom:24,borderBottom:"1px solid rgba(245,242,237,.1)",marginBottom:32},children:e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(48px,6vw,96px)",letterSpacing:3,lineHeight:1,color:"var(--white)"},children:t.title}),e.jsx("div",{style:{fontFamily:"'Cormorant Garamond', serif",fontSize:20,color:"var(--sky)",marginTop:12},children:t.id==="creative-projects"?"A selection of projects that demonstrate my range across various creative disciplines and mediums.":t.id==="professional-services"?"Client-focused work including UI/UX, web development, branding and marketing assets.":t.id==="nabu"?"Design and creative direction for NABU, a streetwear brand that draws from Persian and Assyrian heritage.":"testing"})]})}),e.jsx("div",{className:"ss-modal-grid",style:{display:"grid",gridTemplateColumns:["creative-projects","professional-services"].includes(t.id)?"repeat(auto-fit, minmax(420px, 1fr))":t.id==="3d-rendering"?"repeat(3, 300px)":t.id==="fabrication"?"repeat(1, 500px)":["3d-modelling","programming"].includes(t.id)?"repeat(2, 380px)":"repeat(4, 280px)",gap:56,overflowY:"auto",overflowX:"hidden",maxHeight:"calc(88dvh - 180px)",paddingRight:8,justifyContent:"center",width:t.id==="creative-projects"?"100%":"auto",gridAutoRows:"max-content"},children:t.media.filter(p=>!p.hidden).map((p,h)=>e.jsx(J,{item:p,onClick:()=>r(p)},h))}),!i&&e.jsx("div",{style:{marginTop:24,textAlign:"center",fontFamily:"'Space Mono', monospace",fontSize:10,letterSpacing:1,color:"var(--mid)",textTransform:"uppercase"},children:"↻ Swipe to explore"})]})})}function J({item:t,onClick:n}){const r=v();return e.jsxs("div",{className:"ss-tile",onClick:n,style:{position:"relative",overflow:"hidden",background:"#111",minHeight:t.type==="video"?"250px":"auto",cursor:"none",borderRadius:12,aspectRatio:t.aspectRatio?t.aspectRatio:void 0},...r,children:[t.type==="video"?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:t.poster,alt:t.title,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(6,6,6,.3)",transition:"background 0.3s ease"},children:e.jsx("div",{style:{width:52,height:52,borderRadius:"50%",border:"1.5px solid rgba(245,242,237,.7)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.3s ease, border-color 0.3s ease"},children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"var(--white)",style:{marginLeft:3},children:e.jsx("path",{d:"M8 5v14l11-7z"})})})})]}):e.jsx("img",{src:t.src,alt:t.title,loading:"lazy",style:{width:"100%",height:"100%",objectFit:t.aspectRatio?"cover":"contain"}}),e.jsxs("div",{style:{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 14px",background:"linear-gradient(to top, rgba(6,6,6,.85) 0%, transparent 100%)",opacity:0,transition:"opacity 0.3s ease"},className:"ss-tile-info",children:[e.jsx("div",{style:{fontFamily:"'Cormorant Garamond', serif",fontSize:14,color:"var(--white)"},children:t.title}),e.jsx("div",{style:{fontFamily:"'Space Mono', monospace",fontSize:10,color:"var(--sky)",letterSpacing:1,marginTop:2},children:t.year})]})]})}function K({item:t,onClose:n,onItemClick:r}){const d=v(),i=[t];t.relatedItems&&t.relatedItems.length>0&&t.relatedItems.forEach(l=>{const g=M.flatMap(x=>x.media).find(x=>x.title===l);g&&i.push(g)});const[a,p]=o.useState(0),h=i[a],z=()=>{p((a+1)%i.length)},w=()=>{p((a-1+i.length)%i.length)};return o.useEffect(()=>{const l=g=>{g.key==="ArrowRight"&&z(),g.key==="ArrowLeft"&&w()};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[a,i.length]),e.jsx(c.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.35},onClick:n,style:{position:"fixed",inset:0,zIndex:3e3,background:"rgba(6,6,6,.97)",backdropFilter:"blur(30px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(c.div,{initial:{opacity:0,scale:.96},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.96},transition:{duration:.35,ease:[.16,1,.3,1]},onClick:l=>l.stopPropagation(),className:"ss-media-viewer",style:{position:"relative",maxWidth:"92vw",maxHeight:"88dvh",display:"flex",alignItems:"flex-start",gap:48},children:[e.jsx("button",{onClick:n,className:"ss-media-viewer-close",style:{position:"absolute",top:100,right:20,background:"none",border:"none",cursor:"none",fontFamily:"'Space Mono', monospace",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--mid)",transition:"color 0.3s ease",padding:"4px 8px",zIndex:3001},...d,children:"✕ Close"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,flexShrink:0},children:[e.jsx("div",{style:{width:"60vw",height:"80dvh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",borderRadius:20,flexShrink:0,backgroundColor:h.removeBackground?"transparent":"inherit",position:"relative"},children:h.type==="video"?e.jsx("video",{src:h.src,poster:h.poster,controls:!0,autoPlay:!0,muted:!0,playsInline:!0,style:{width:"100%",height:"100%",objectFit:"contain",maxWidth:"100%",maxHeight:"100%",display:"block"}},h.src):e.jsx("img",{src:h.src,alt:h.title,style:{width:"100%",height:"100%",objectFit:"contain",transform:h.scale?`scale(${h.scale})`:"scale(1)"}},h.src)}),i.length>1&&!(t.title==="Custom Airpod Case"||t.title==="Custom Phone Case"||t.title==="Apple Accessory Prototypes")&&e.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{style:{fontFamily:"'Space Mono', monospace",fontSize:9,color:"var(--mid)",letterSpacing:1},children:[a+1," / ",i.length]}),e.jsxs("div",{style:{display:"flex",gap:6,flex:1},children:[e.jsx("button",{onClick:w,style:{flex:1,padding:"8px 12px",fontFamily:"'Space Mono', monospace",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:"var(--white)",border:"1px solid rgba(245,242,237,.3)",background:"rgba(245,242,237,.05)",borderRadius:2,cursor:"none",transition:"all 0.3s ease"},onMouseEnter:l=>{l.currentTarget.style.borderColor="rgba(245,242,237,.6)",l.currentTarget.style.background="rgba(245,242,237,.1)"},onMouseLeave:l=>{l.currentTarget.style.borderColor="rgba(245,242,237,.3)",l.currentTarget.style.background="rgba(245,242,237,.05)"},...d,children:"← Prev"}),e.jsx("button",{onClick:z,style:{flex:1,padding:"8px 12px",fontFamily:"'Space Mono', monospace",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:"var(--white)",border:"1px solid rgba(245,242,237,.3)",background:"rgba(245,242,237,.05)",borderRadius:2,cursor:"none",transition:"all 0.3s ease"},onMouseEnter:l=>{l.currentTarget.style.borderColor="rgba(245,242,237,.6)",l.currentTarget.style.background="rgba(245,242,237,.1)"},onMouseLeave:l=>{l.currentTarget.style.borderColor="rgba(245,242,237,.3)",l.currentTarget.style.background="rgba(245,242,237,.05)"},...d,children:"Next →"})]})]})]}),e.jsxs("div",{style:{flex:1,minWidth:200,maxWidth:340,paddingTop:140},children:[e.jsx("div",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:64,letterSpacing:2,lineHeight:1,color:"var(--white)",marginBottom:24},children:t.title}),e.jsx("div",{style:{fontFamily:"'Space Mono', monospace",fontSize:10,letterSpacing:2,color:"var(--sky)",textTransform:"uppercase",marginBottom:20},children:t.year}),t.desc&&e.jsx("p",{style:{fontFamily:"'Cormorant Garamond', serif",fontSize:18,lineHeight:1.7,color:"rgba(245,242,237,.75)",fontWeight:300,marginBottom:32},children:t.desc}),t.relatedItems&&t.relatedItems.length>0&&!(t.title==="HMI Sensor System"||t.title==="Custom RGB Controller")?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:48},children:t.relatedItems.map((l,g)=>e.jsxs("button",{onClick:()=>{const x=M.flatMap(y=>y.media).find(y=>y.title===l);x&&r&&r(x)},style:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'Space Mono', monospace",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",background:"none",border:"none",borderBottom:"1px solid var(--sky)",paddingBottom:2,cursor:"none",textDecoration:"none",textAlign:"left"},...d,children:["View ",l," →"]},g))}):null,t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,marginTop:28,fontFamily:"'Space Mono', monospace",fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"var(--sky)",textDecoration:"none",borderBottom:"1px solid var(--sky)",paddingBottom:2,cursor:"none"},...d,children:"Visit Website →"})]})]})})}W.createRoot(document.getElementById("root")).render(e.jsx(o.StrictMode,{children:e.jsx(V,{})}));
