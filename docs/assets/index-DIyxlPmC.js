import{r as pe,u as me,j as e,m as b,a as d,A as $}from"./vendor-C7ylLrkt.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&l(h)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();var V={},se;function ge(){if(se)return V;se=1;var t=pe();return V.createRoot=t.createRoot,V.hydrateRoot=t.hydrateRoot,V}var ue=ge();function fe(){const t=me();return e.jsx(b.section,{className:"ss-about-view","aria-labelledby":"ss-bio-heading",initial:t?!1:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:t?0:.3},children:e.jsxs("div",{className:"ss-about-hero",children:[e.jsx("figure",{className:"ss-about-photo",children:e.jsx("img",{src:"/assets/Shyon_Studio_3298.jpg",srcSet:"/assets/Shyon_Studio_1000.jpg 662w, /assets/Shyon_Studio_1800.jpg 1192w, /assets/Shyon_Studio_3298.jpg 2184w",sizes:"(max-width: 640px) 100vw, (max-width: 900px) max(48vw, 464px), max(50vw, 47.7vh, 477px)",width:"2184",height:"3298",alt:"Shyon Shiri seated in a black jacket against a studio backdrop",decoding:"async"})}),e.jsxs("div",{className:"ss-about-intro",children:[e.jsx("h2",{id:"ss-bio-heading",children:"About me."}),e.jsx("p",{className:"ss-about-lead",children:"I’m a graphic designer and developer based in the Bay Area."}),e.jsx("p",{children:"My experience includes visual communication, front-end development, 3D modeling, and physical fabrication. I work with both the design and technical requirements of a project, including typography, layout, prototyping, and production."}),e.jsxs("p",{className:"ss-about-education",children:["BA in Graphic Design",e.jsx("br",{}),"San Jose State University, 2025"]})]})]})})}const we=[{title:"Everly Care Home",mediaTitle:"Everly Care Home",role:"Branding & web development",description:"Designed the identity and built the website for a senior care community.",image:"/assets/Everly_Cover_Image.webp",preview:"/assets/Everly_Cover_Image",alt:"The Everly Care Home website, with a pale blue identity and a welcoming introduction.",width:2560,height:1382,style:"web"},{title:"NABU",mediaTitle:"NABU Puffer Front",role:"Clothing & creative direction",description:"A streetwear brand drawing on my Persian and Assyrian heritage.",image:"/assets/NABU_Puffer_Front.jpg",alt:"A woven bandana-pattern puffer jacket from the NABU collection.",width:1290,height:2293,style:"clothing"},{title:"RGB controller",mediaTitle:"RGB Box, Front View",role:"Hardware & 3D design",description:"Built the controller and its custom 3D-printed enclosure from scratch.",image:"/assets/New_LED_Box_Front.jpg",alt:"A hand-built RGB controller with a black geometric enclosure, toggle, button and dial.",width:1920,height:2560,style:"hardware"}];function ye({onOpen:t,onAllWork:o}){return e.jsx("section",{className:"ss-selected-work","aria-labelledby":"ss-selected-heading","data-slide":"selected","data-label":"Selected work",children:e.jsxs("div",{className:"ss-selected-inner",children:[e.jsxs("div",{className:"ss-selected-header",children:[e.jsx("div",{children:e.jsx("h2",{id:"ss-selected-heading",children:"Selected work."})}),e.jsx("button",{className:"ss-selected-all",type:"button",onClick:o,children:"All work"})]}),e.jsx("div",{className:"ss-selected-grid",children:we.map(s=>e.jsx("article",{className:`ss-selected-item ss-selected-${s.style}`,children:e.jsxs("button",{className:"ss-selected-project",type:"button",onClick:()=>t(s.mediaTitle),"aria-label":`View ${s.title} project`,children:[e.jsxs("span",{className:"ss-selected-media",children:[e.jsx("img",{src:s.image,srcSet:s.preview?`${s.preview}-640.webp 640w, ${s.preview}-1280.webp 1280w`:void 0,sizes:"(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 50vw, 40vw",alt:s.alt,width:s.width,height:s.height,loading:"lazy",decoding:"async"}),e.jsx("span",{className:"ss-selected-view","aria-hidden":"true",children:"View project"})]}),e.jsx("span",{className:"ss-selected-title",children:s.title}),e.jsx("span",{className:"ss-selected-role",children:s.role})]})},s.title))})]})})}const O=[{id:"creative-projects",title:"Personal Projects",tag:"Design, 3D & Craft",img:"/assets/3D_Models_Cover_Pic.jpg",size:"tall",objectPosition:"50% 37%",media:[{type:"video",src:"/assets/Broken_NPC.MP4",poster:"/assets/Broken_NPC.jpg",title:"The Broken NPC",year:2024,desc:"A detailed 3D scene depicting in-game rendering errors from GTA San Andreas, created entirely using Blender.",aspectRatio:"16/9",relatedItems:[]},{type:"video",src:"/assets/Blender_Case_Video.mp4",poster:"/assets/Blender_Case.jpg",title:"Apple Accessory Prototypes",year:2024,desc:"3D designed Apple product case prototypes developed using Blender.",aspectRatio:"16/9",relatedItems:["Custom AirPods Case","Custom Phone Case"]},{type:"video",src:"/assets/Shiri_Video_Game.mp4",poster:"/assets/Shiri_VIdeo_Game.jpg",title:"Retro Driving Animation",year:2024,desc:"A mock retro driving game, animated and cut together in Adobe After Effects from pixel art frames of a neon city at night.",aspectRatio:"16/9"},{type:"image",src:"/assets/Venom.webp",title:"Creature Head Sculpt",year:2024,desc:"A movie creature's head, sculpted and rendered in Blender. A wet, high gloss skin shader over the sculpt, lit with a single key against black.",aspectRatio:"16/9"},{type:"image",src:"/assets/My_Case.jpg",title:"Custom Phone Case",year:2025,desc:"The finished case, printed in a metallic blue. An organic lattice replaces the flat back, its apertures shaped around the camera array and the side buttons.",aspectRatio:"5/6",relatedItems:["Apple Accessory Prototypes"]},{type:"image",src:"/assets/Airpod_Case.JPG",title:"Custom AirPods Case",year:2026,desc:"The finished sleeve, printed in purple. The same melted lattice wraps an AirPods Pro case, left open at the status light and along the hinge.",aspectRatio:"4/5",relatedItems:["Apple Accessory Prototypes"]},{type:"image",src:"/assets/New_Radar_Sensor_front.jpg",title:"Radar, Front View",year:2024,desc:"Front of the radar enclosure. Paired ultrasonic transducers, a 16x2 character LCD, and a recessed speaker cone, all set into a 3D-printed shell.",aspectRatio:"4/3",hidden:!0,relatedItems:["Radar, Back View","Radar and RGB Controller","HMI Sensor System"]},{type:"image",src:"/assets/New_Radar_Sensor_Back.jpg",title:"Radar, Back View",year:2024,desc:"Back of the radar enclosure, showing the access panel, wiring routing, and the power and control cutouts.",aspectRatio:"4/3",hidden:!0,relatedItems:["Radar, Front View","Radar and RGB Controller","HMI Sensor System"]},{type:"image",src:"/assets/New_LED_Box_Front.jpg",title:"RGB Box, Front View",year:2024,desc:"Front of the RGB controller. A faceted 3D-printed shell with the addressable LED strip seated in a chamfered channel.",aspectRatio:"4/3",hidden:!0,relatedItems:["RGB Box, Back View","Radar and RGB Controller","Custom RGB Controller"]},{type:"image",src:"/assets/New_LED_Box_Back.jpg",title:"RGB Box, Back View",year:2024,desc:"Back of the RGB controller, with the potentiometer, mode button, and toggle switch mounted through the top panel.",aspectRatio:"4/3",hidden:!0,relatedItems:["RGB Box, Front View","Radar and RGB Controller","Custom RGB Controller"]},{type:"image",src:"/assets/Programming_Cover_Pic.jpg",title:"Radar and RGB Controller",year:2024,desc:"Both enclosures side by side. Each was modeled around its own board, display and controls, then 3D printed and finished by hand.",aspectRatio:"4/3",hidden:!0,relatedItems:["HMI Sensor System","Custom RGB Controller"]},{type:"image",src:"/assets/Max_Pic.JPG",title:"Candid Studio Portrait",year:2024,desc:"Caught mid laugh on a gelled teal backdrop, with the background light hot behind the head so the subject separates from it.",aspectRatio:"2/3"},{type:"image",src:"/assets/Photography_1.jpg",title:"Shiri Wordmark",year:2024,desc:"A hand drawn wordmark set over a cropped apparel shot, chains and acid washed corduroy, framed close so the type sits on the garment rather than beside it.",aspectRatio:"1/1"},{type:"video",src:"/assets/New_Radar_Sensor.mp4",poster:"/assets/New_Radar_Sensor_front.jpg",title:"HMI Sensor System",year:2024,desc:"Interactive radar module converting ultrasonic data into real-time feedback. Custom 3D-printed enclosure with LCD and speaker.",aspectRatio:"4/3",relatedItems:["Radar, Front View","Radar, Back View","Radar and RGB Controller"]},{type:"video",src:"/assets/New_LED_Box.mp4",poster:"/assets/New_LED_Box_Front.jpg",title:"Custom RGB Controller",year:2024,desc:"A working LED controller with physical controls and a custom 3D-printed enclosure for the microcontroller.",aspectRatio:"4/3",relatedItems:["RGB Box, Front View","RGB Box, Back View","Radar and RGB Controller"]},{type:"image",src:"/assets/Shyon_Sculpture.jpg",title:"Product, not Consumer",year:2024,desc:"Hand-fabricated steel sculpture referencing consumer tech culture, welded, ground, sanded and finished.",aspectRatio:"5/4"},{type:"image",src:"/assets/Adverstisement_Project.jpg",title:"Ultron Shaver Campaign",year:2024,desc:"A spec print advertisement for a fictional shaver brand. The rotary shaver is lit as the hero and its shadow runs back to the bloodied cartridge razor it replaces.",aspectRatio:"16/9"}]},{id:"professional-services",title:"Professional Services",tag:"Web & Design",img:"/assets/Everly_Cover_Image-1280.webp",size:"wide",media:[{type:"image",src:"/assets/Mina_Website.webp",title:"UI/UX, minasech.net",year:2025,desc:"Website design and React development, with a responsive interface.",link:"https://minasech.net",wide:!0,aspectRatio:"16/9"},{type:"image",src:"/assets/Everly_Cover_Image.webp",title:"Everly Care Home",year:2026,desc:"Brand identity, responsive website design, development, and deployment for a senior care community.",link:"https://everlycarehome.com",wide:!0,aspectRatio:"16/9"},{type:"image",src:"/assets/RealEstate_Luning_Flyer.jpg",title:"Luning Dr Flyer",year:2022,desc:"Property marketing flyer designed for Real Estate Experts, pairing a hero listing photo with clean typographic hierarchy, a status badge, and agent branding.",aspectRatio:"3/4"},{type:"image",src:"/assets/RealEstate_Colleen_Flyer.jpg",title:"Colleen Dr Flyer",year:2022,desc:"A dual-agent listing flyer combining property details, brand elements, and paired agent headshots in a balanced square format.",aspectRatio:"1/1"},{type:"image",src:"/assets/RealEstate_MorningStar_Flyer.webp",title:"Morning Star Dr Flyer",year:2022,desc:"A listing announcement co-branded with Compass, combining pricing, property specifications, and sales highlights.",aspectRatio:"4/5"},{type:"image",src:"/assets/RealEstate_MoskowiteCorner_Concept.jpg",title:"Moskowite Corner, Concept Visualization",year:2026,desc:"An AI-generated concept visualization for a real estate redevelopment study at Moskowite Corner, CA. It shows a closed gas station lot rebuilt as a fuel and retail stop, modeled from aerial references for a developer evaluating the property.",aspectRatio:"5/3",relatedItems:["Moskowite Corner, Existing Site"]},{type:"image",src:"/assets/RealEstate_MoskowiteCorner_Before.webp",title:"Moskowite Corner, Existing Site",year:2026,desc:"The existing site before redevelopment. A closed 1.26 acre gas station lot with parking and an office building.",aspectRatio:"16/9",hidden:!0,relatedItems:["Moskowite Corner, Concept Visualization"]}]},{id:"nabu",title:"NABU",tag:"Streetwear Brand",img:"/assets/New_NABU_Cover_Card.webp",size:"tall",media:[{type:"video",src:"/assets/Nabu_Poster_Banner.mp4",poster:"/assets/Nabu_Poster_Banner.jpg",title:"NABU Promotional Video",year:2023,desc:"Promotional video for NABU clothing, animated in Adobe After Effects.",wide:!0},{type:"video",src:"/assets/NABU_PUFFER_AD.mp4",poster:"/assets/NABU_Puffer_AD.jpg",title:"NABU 2026 Teaser",year:2025,desc:"A teaser edited in 2025 for the 2026 puffer jacket collection.",relatedItems:["NABU Puffer Front","NABU Puffer Back"]},{type:"video",src:"/assets/NABU_SALE_AD.mp4",poster:"/assets/NABU_SALE_AD.jpg",title:"NABU 2025 Summer Collection",year:2025,desc:"Promotional video for the summer drop, camp collar shirts and rug pattern shorts, shot as a flat lay on white."},{type:"image",src:"/assets/Stevie_Pic.JPG",title:"NABU 2023 Spring Collection",year:2022,desc:"Shot in 2022 for the 2023 spring collection. Two looks on a white cyclorama, the graphic tees worn over the Persian rug trousers, with the raw fringed seams left showing down the leg."},{type:"image",src:"/assets/NABU_Puffer_Front.jpg",title:"NABU Puffer Front",year:2025,desc:"Studio still from the puffer collection shoot. Woven bandana panelling across the body, sleeves, and hood, shot on a white cyclorama.",aspectRatio:"9/16",hidden:!0,relatedItems:["NABU Puffer Back","NABU 2026 Teaser"]},{type:"image",src:"/assets/NABU_Puffer_Back.jpg",title:"NABU Puffer Back",year:2025,desc:"Back of the same puffer, showing how the bandana medallion is centered and mirrored across the shoulders and hem.",aspectRatio:"2/3",hidden:!0,relatedItems:["NABU Puffer Front","NABU 2026 Teaser"]},{type:"image",src:"/assets/Digital_Media_Cover.jpg",title:"NABU 2024 Rerelease Promotion",year:2024,desc:"Promotional campaign for the 2024 rerelease of NABU's Persian rug pants.",aspectRatio:"3/4"}]}],be=["home","work","about","contact"],xe=`
  :root {
    --black: #060606;
    --white: #f5f2ed;
    --cream: #ede8e0;
    --sky: #38bdf8;
    --cyan: #22d3ee;
    --accent: #ff4d1c;
    --mid: #8a8a8a;
    /* THE SITE'S ONE EASE. It was cubic-bezier(0.16,1,0.3,1), an expo-style curve that
       spends most of its travel in the first fifth of its duration: measured, that one
       is 27% of the way home at 10% of the time against this one's 17.6%. Front-loading
       that hard reads as SNAP, and snap is the opposite of what weight feels like. This
       is Apple's curve: gentler off the mark, and a long glide into the stop.
       Every transition in the sheet references the token, and the JS side is APPLE_EASE,
       which carries the same four numbers for framer-motion. There is no second ease.
       Two curves in the file are deliberately NOT this and must not be folded in:
       the map pin's pulse, which is an infinite loop rather than an arrival.
       NOTE this comment carries no backticks on purpose: GLOBAL_CSS is a template
       literal, so one backtick anywhere in here ends the string. */
    --ease-out: cubic-bezier(0.32,0.72,0,1);
    /* ONE FAMILY, EVERYWHERE (user, 2026-09-09: "i dont see any apple style font usage
       like anywhere on the actual site", and it should read as "some off part of the
       official apple website"). It was FOUR faces: Bebas Neue on the display headings,
       Space Grotesk on the kickers, Space Mono on every small label and Cormorant
       Garamond on the body copy. Apple runs one family and distinguishes by SIZE,
       WEIGHT and TRACKING alone, so that is what this is.
       The -apple-system keyword resolves to the real San Francisco on Apple hardware,
       served by the OS. SF Pro may NOT be self-hosted as a webfont (Apple's licence covers
       building for Apple platforms), so Inter is the SIL OFL near-clone that carries
       the same shape everywhere else, and it is the one face still downloaded. */
    --sf: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
          "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 100%; height: 100%;
    overflow: hidden;
    background: var(--black);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  /* ── THE POINTER ───────────────────────────────────────────────────────────────────
     cursor is an INHERITED property, so hiding it is one declaration on html plus an
     explicit inherit on the few elements the UA sheet gives a cursor of their own. It
     was a star rule carrying !important, which is the same anti-pattern the type cascade
     already documents: a universal selector beats INHERITANCE, and an !important in a
     stylesheet beats an inline style, so nothing downstream could ever put the pointer
     back. Two rules were silently dead because of it, and one of them mattered. */
  html { cursor: none; }
  a, button, input, textarea, select, label, summary, [role="button"] { cursor: inherit; }

  /* THE POINTER IS HIDDEN FOR A MOUSE, NOT FOR A NARROW WINDOW. This used to ride the
     768px and 640px layout breakpoints, which asks the wrong question exactly as the old
     innerWidth gate on the Realm did: a desktop browser dragged under 768 got the dot
     hidden by the media query AND the native arrow suppressed by the star rule above, so
     it had NO POINTER AT ALL. Measured before the fix at 760 / 700 / 640 / 500. A finger
     is a property of the DEVICE, so ask about the device. */
  @media (hover: none), (pointer: coarse) {
    html { cursor: auto; }
    #ss-cursor-dot { display: none !important; }
  }

  /* A picture is natively draggable, and an HTML5 drag is the one state where the browser
     draws its OWN cursor over the page and ignores cursor:none entirely: the arrow comes
     back, with a translucent ghost of the image under it, until the button is released.
     The Work coverflow is dragged across card artwork, so that was the most-used gesture
     on the site. dragstart is cancelled in JS as well, which is what covers Firefox. */
  img, video { -webkit-user-drag: none; user-drag: none; }

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

    /* Work Page - Cards. The floor comes down with the card itself (360 -> 330 wide),
       or a short phone draws a card taller than the desktop proportion. */
    .ss-card { min-height: 385px !important; }

    /* Contact Page */
    .ss-contact-heading { font-size: clamp(32px, 6vw, 64px) !important; }
    .ss-contact-description { font-size: clamp(12px, 1.5vw, 14px) !important; }
  }

  /* ── THE CURSOR IS THE PLAIN WHITE DOT AGAIN ────────────────────────────────────────
     Reverted at Shyon's request (2026-09-10). It wore the Realm's glass bubble for a day,
     ported across on 2026-09-09; the Realm still wears that shape, this surface goes back
     to the solid difference dot it had before.
     WHAT COMES BACK WITH IT is the mix-blend-mode: difference trade, and it is accepted
     rather than overlooked. Over a backdrop B a difference dot composites to B + a*(255-2B),
     so it INVERTS (magenta over the green card artwork, cyan over the studio wall) and it
     cancels exactly at B=127.5, measured at 26.8 dLum over the Work card art against 200+
     on the flat page grounds. Work is the one page made entirely of mid-tone imagery, so
     that is where it is thinnest. Do not "fix" this by adding a rim or a shadow: a
     difference dot with either is neither thing. Put the bubble back instead, it is in
     the Realm and in git.
     NONE OF THE FOUR DEFECTS THAT PASS FIXED COMES BACK, because not one of them was the
     dot's appearance: the pointer is still gated on (hover: none) rather than on a width
     breakpoint, images and video still refuse a native HTML5 drag, the transition is still
     held behind .ss-cursor-ready so the injected sheet cannot animate the first paint, and
     the dot is still revealed by real movement rather than parking in the top left corner
     of a fresh load. */
  #ss-cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 99999;
    width: 9px; height: 9px;
    background: #ffffff;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%,-50%);
    opacity: 0;   /* shown on the first real pointer move, see the Cursor component */
    mix-blend-mode: difference; /* always contrasts, on white or on dark */
  }
  /* THE TRANSITION IS HELD BACK UNTIL AFTER THE FIRST PAINT, and that is not a nicety.
     This whole sheet is injected by a useEffect, so it lands AFTER the dot has already
     rendered at the UA default opacity of 1: with the transition declared in the rule
     above, the arrival of opacity:0 was ANIMATED, and the dot faded out of the top left
     corner over .18s on every single load. Measured at 0.739 opacity a second after a
     settled load, with no pointer event having fired at all. The class is added on the
     frame after mount, so the first application of opacity:0 snaps and everything after
     it eases. The Realm has no such rule because its CSS is a style block in the head,
     parsed before its cursor element exists. */
  #ss-cursor-dot.ss-cursor-ready { transition: opacity .18s ease; }
  /* NO HOVER RULE, and that is the revert too: the prior pointer did not react to what it
     was over. useCursorHover still puts .ss-hover on the body (it always did, and nothing
     styled it then either), so a hover state is one rule away if it is ever wanted. A
     scale on a difference dot is the one thing not to reach for: 2.2x of pure inversion
     is a blob rather than a pointer. */

  /* modal / viewer scrollbar hide */
  .ss-modal-grid { scrollbar-width: none; }
  .ss-modal-grid::-webkit-scrollbar { display: none; }

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

  /* hero bg */
  .ss-hero-bg {
    transform: scale(1.06);
    transition: transform 8s ease;
  }
  .ss-hero-bg-active { transform: scale(1) !important; }

  /* ── THE NAME ──
     Bebas Neue, which is the face the About and Contact display headings were always
     written in, so the name stops being the one big piece of type on the site still
     falling through to Apple's system font. It is a CONDENSED CAPS face and has to be
     set as one: positive tracking (a condensed face runs its letters together at
     negative), a line height under 1 (caps have no descenders to leave room for, so
     0.86 closes the two lines into one block), and a larger size than the old sans
     needed, because the same point size in a condensed face covers far less width.
     One weight ships, so no font-weight is stated. NO !important anywhere: see the
     type cascade note further down, where the universal selector that used to make
     one necessary was removed. */
  .ss-hero-name {
    font-family: var(--sf);
    font-weight: 700;
    line-height: 1.02;
    letter-spacing: -0.035em;
    color: var(--white);
  }
  /* Each letter is its own inline-block so it can be transformed on its own; without
     this the spans are inline boxes and every transform is silently dropped. */
  .ss-hero-name .ss-hero-ch { display: inline-block; will-change: transform, opacity, filter; }
  .ss-hero-name .ss-hero-line { display: block; white-space: nowrap; }
  .ss-home-hero { min-height: 620px; }
  .ss-hero-intro { max-width: 570px; }
  .ss-hero-kicker {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 22px; color: rgba(245,242,237,.82);
    font-size: 12px; font-weight: 600; letter-spacing: .16em;
    text-transform: uppercase;
  }
  .ss-hero-kicker::before {
    content: ''; width: 27px; height: 1px; background: var(--sky);
  }
  .ss-hero-description {
    margin-top: 24px; max-width: 435px; font-size: 16px; line-height: 1.55;
    color: rgba(245,242,237,.82);
  }
  .ss-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 22px; margin-top: 24px; }
  .ss-hero-actions button {
    min-height: 46px; font-size: 13px; font-weight: 600;
    transition: background .22s var(--ease-out), color .22s var(--ease-out), transform .22s var(--ease-out);
  }
  .ss-hero-primary { background: var(--white); color: #060606; padding: 0 23px; border: 0; border-radius: 999px; }
  /* The legacy button reset clears backgrounds and focus with !important. */
  #root .ss-hero-primary { background: var(--white) !important; }
  .ss-hero-secondary { background: none; color: var(--white); padding: 0 2px; border: 0; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: rgba(245,242,237,.35); }
  .ss-hero-primary:hover { background: #dbeef5; transform: translateY(-2px); }
  #root .ss-hero-primary:hover { background: #dbeef5 !important; }
  .ss-hero-secondary:hover { color: var(--sky); }
  .ss-hero-actions button:focus-visible, .ss-story-cue:focus-visible { outline: 2px solid var(--sky); outline-offset: 5px; }
  #root button:focus-visible { outline: 2px solid var(--sky) !important; outline-offset: 5px; }
  .ss-contact-entry:hover, .ss-contact-entry:focus-visible { background: rgba(56,189,248,.06); }
  @media (max-width: 640px) {
    .ss-home-hero { min-height: 560px; }
    .ss-hero-kicker { margin-bottom: 16px; font-size: 10px; }
    .ss-hero-description { margin-top: 18px; }
    .ss-hero-actions { gap: 4px 16px; margin-top: 18px; }
  }

  /* ── Lego Realm storyboard (home page scroll) ── */
  .ss-home-scroll {
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: none; -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .ss-home-scroll::-webkit-scrollbar { display: none; }
  /* ── A FINGER-SIZED TAP TARGET THAT MOVES NOTHING (user, 2026-09-02).
     The site's controls are drawn as small type: measured across ten viewports,
     the nav buttons render 17px tall and the page dots 10px, against Apple's
     44px minimum, so on touch they are all but unhittable. Growing them would
     redraw the design, so the HIT AREA is a transparent ::after laid over the
     element instead: layout, spacing and the drawn size are all untouched.
     width is max(100%,44px) rather than 44px so a WIDE control keeps its own
     width and only a narrow one is padded out. Needs position:relative on the
     element it is used on. */
  .ss-tap { position: relative; }
  .ss-tap::after {
    content: ''; position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: max(100%, 44px); height: 44px;
  }
  .ss-story-cue {
    position: absolute; left: 50%; bottom: max(22px, calc(22px + env(safe-area-inset-bottom)));
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    background: none; border: none; color: var(--white);
    opacity: .78; transition: opacity .3s ease;
    z-index: 12;
    /* the arrow itself draws 11x15; this is the part a thumb has to find */
    padding: 15px 22px;
  }
  .ss-story-cue:hover { opacity: 1; }
  .ss-story-cue .ss-cue-arrow {
    font-size: 15px; line-height: 1;
    animation: ss-cue-drop 1.9s ease-in-out infinite;
  }
  @keyframes ss-cue-drop {
    0%, 100% { transform: translateY(0); opacity: .9; }
    55% { transform: translateY(7px); opacity: .45; }
  }
  /* The chapter heading, in SPACE GROTESK (user, 2026-09-01, replacing Bebas Neue).
     A grotesk with engineered, slightly odd letterforms, which is the right voice for
     copy about a thing that was built rather than styled, and it sits naturally beside
     the mono head strips on the frames below.
     It is NOT a swap of the face alone: Bebas is condensed and caps only, so at the
     same size a normal-width grotesk in mixed case runs roughly 1.6x the line length
     and would have wrapped every kicker. The size comes down accordingly, the tracking
     goes NEGATIVE (Bebas needed +0.04em to breathe, Grotesk needs pulling in), and the
     uppercase transform comes off so the kickers read as written.
     Deliberately still the question ("What it is"), never an answer, so the body below
     is what actually tells you anything. */
  .ss-story-kicker {
    font-family: var(--sf);
    font-size: clamp(34px, 4.1vw, 62px);
    font-weight: 700;
    line-height: 1.02; letter-spacing: -0.022em; text-transform: none;
    color: var(--sky);
  }
  /* the kicker's own words fly up one at a time, so it needs a per word box to turn in */
  /* THE TITLE IS FILLED WITH A GRADIENT, NOT A FLAT BLUE (user, 2026-09-03: "can you add
     some styling to the blue titles"). One sky blue at this size is a large flat area of a
     single value, which on black reads as unlit. The ramp runs light at the cap height to a
     deeper blue at the baseline, which is the direction light falls, and the whole title
     then carries a faint bloom of its own colour. That bloom is not invented for this: the
     deck rail's active tick already glows in exactly this blue, and the Realm's own crystal
     is an emissive material, so a lit heading is the page agreeing with what it is about.
     The gradient sits on the WORD SPANS and not on the paragraph. Each span is a transformed
     inline-block, and a background clipped to text on the parent has to survive every one of
     those transforms; per word it cannot be broken by them. Every span shares one line box
     height, so the ramp is identical across a line and no word is a different blue. */
  .ss-story-kicker .ss-w {
    display: inline-block; transform-origin: 50% 100%;
    background-image: linear-gradient(180deg, #a9e2fd 0%, #3fc0f8 48%, #0b86c9 100%);
    -webkit-background-clip: text; background-clip: text;
    color: transparent;
    /* THE DESCENDER WAS BEING CUT OFF, and background-clip is why (user, 2026-09-09: the
       Y is cut off at the bottom). The glyph is painted by a background CLIPPED to the
       text, so paint exists only inside the element's own box. This span is an
       inline-block, so that box is its line box, and .ss-chapter-head sets line-height
       0.92: at 96px that is an 88px box holding a face whose descenders reach past 100px.
       Everything below the box simply is not painted, so the tail of the y in "Why"
       vanished while the rest of the word looked fine.
       The padding grows the PAINT box and the negative margin takes the same amount back
       out of layout, so the descender is drawn and the two lines close up exactly as
       before. It has to be in em, not px: the size is a clamp running 36 to 96. */
    padding-bottom: 0.16em;
    margin-bottom: -0.16em;
  }
  .ss-story-kicker { filter: drop-shadow(0 0 26px rgba(56,189,248,.20)); }

  /* ── THE DECK ─────────────────────────────────────────────────────────────────────
     The storyboard is a DECK (user, 2026-09-01). Every chapter and every frame row
     holds the full viewport and locks there until you scroll past it, so a block is
     never read half arrived: you land on it, it stages itself in, and only then does
     the next one come. This deliberately REVERSES the earlier revert of a snap deck.
     Mandatory snapping is only honest while a slide is guaranteed to FIT ON ONE
     SCREEN, and nothing here guarantees that on its own: a two up frame row stacks
     to one column under 760px, and the stills are 16/9 and 4/3 mixed. So the media
     carries a vh cap (cropping at the cap rather than distorting, hence object-fit)
     and the whole mechanism stands down to free scrolling on a narrow or a short
     window, where the cap would have to eat most of the picture to fit. */
  .ss-home-scroll { scroll-snap-type: y proximity; }
  .ss-snap { scroll-snap-align: start; scroll-snap-stop: always; }
  .ss-slide {
    position: relative;
    min-height: 100dvh;
    display: flex; flex-direction: column; justify-content: center;
    /* The gutters are vh based because the CONTENT is: the stills are capped in vh, so
       on a short window the padding has to give way with them or the slide stops fitting
       and a mandatory snap point traps you above its own bottom. */
    padding: clamp(58px, 8.6vh, 92px) 0 clamp(54px, 8.2vh, 88px);
    /* Clipped so an entrance that begins outside the box (the head strip's wipe, a still
       driving in from the left) can never add scrollable height under that snap point.
       Nothing real is ever clipped by this: scratchpad/verify_deck_sizes.cjs measures the
       actual content against the slide box at nine window sizes. */
    overflow: hidden;
  }
  .ss-slide-inner { position: relative; z-index: 1; width: 100%; }
  /* A CHAPTER IS A TITLE AND A PARAGRAPH. NOTHING ELSE (user, 2026-09-03: "why is the
     chapter number even here, why is it not just a title", and he did not like it stating
     "two frames"). Three things were carrying no information and have gone:
     · ".ss-chapter-num" / ".ss-chapter-ghost", the 01 to 04 numbering. It numbered four
       sections that are already told apart by their titles, and a reader counting chapters
       is a reader who has stopped reading.
     · ".ss-chapter-rule", the blue dash it hung off. With nothing to anchor it was
       decoration on decoration.
     · ".ss-chapter-meta", "TWO FRAMES · FR 05 – 06". That is a shot list. It told the
       visitor how many pictures were about to appear, which they can see, in the private
       vocabulary of the person who assembled the page.
     The FR numbers on the frames themselves went with them: their only job was to key into
     that contents line, so with it gone "FR 05" referenced nothing. The frames keep the
     half of the strip that is real information, which is what the picture is OF. */
  /* two frames on one screen read as a pair when they end on the same line */
  /* a lone still is narrowed rather than cropped: at the full 1180 a 16/9 shot is 663
     tall and the vh cap would have to eat into it on any normal window. */
  /* ── CHAPTER + TWO STILLS ON ONE SCREEN. The deck's rule since it was cut from 12
     slides to 7 (user, 2026-09-01): a blue kicker is never on screen without at least
     two frames beside it. That means a chapter header and a two-up frame row have to
     share one 100dvh slide, so the header becomes a BAND (kicker left, body right,
     aligned on their baselines) instead of a column, and the stills give up some of
     their height cap. 34vh against the 43vh a frame row gets when it has the screen to
     itself: two captions and a head strip still have to fit under them. */
  /* THE BAND IS THREE PARTS ON TWO ROWS, AND THE TOP ROW SPANS BOTH COLUMNS. That span is
     what puts the title and the body copy on ONE LINE with no magic number holding them
     there: the number and its rule take a row of their own, and the two columns under it
     start together at whatever the clamped type resolves to on this window.
     What it replaces is what the layout was really being blamed for. The band was two
     columns aligned on "end" with the rule stacked ABOVE them, so the rule sat at the top
     of the block while the kicker, bottom aligned against a paragraph three times its
     height, hung 130px below it with nothing in between: a chapter opened on an orphaned
     blue dash over a void. The contents line landed under the BODY on the right, where it
     labelled the paragraph instead of the chapter it belongs to. */
  .ss-chapter-head {
    display: grid;
    grid-template-columns: minmax(0, .78fr) minmax(0, 1.22fr);
    column-gap: clamp(34px, 4.4vw, 58px);
    /* CENTRE, and this is the whole reason the band can be two things and not three. A one
       line title beside a five line paragraph leaves a column two thirds empty, and top
       aligned that empty runs along the BOTTOM of the title, which is a hole. Split evenly
       above and below it, the same emptiness is air: the title sits on the paragraph's
       middle and the band reads as balanced rather than as unfinished. It is what the
       contents line was really propping up. */
    align-items: center;
  }
  /* A measure, not a column width: the body is set to read, and the column it sits in is
     wider than a comfortable line at the top of the clamp.
     THE SIZE IS SET HERE AND NOT INLINE, and that is what makes it able to give way. A
     chapter band is the tallest thing on the deck and the copy is what makes it tall: at
     a flat 16px the body ran to 8 lines on a 1024 wide window and the slide finished 53px
     past a viewport it is snap-locked to, which is the one failure the deck may not have.
     Falling to 14.4px at the narrow end costs nothing anyone reads and buys most of that
     back. At 1333px and over it resolves to the same 16px it always was. */
  .ss-chapter-body {
    max-width: 58ch;
    font-size: 16px; line-height: 1.62; color: rgba(245,242,237,.78);
  }
  .ss-chapter-head .ss-chapter-body { font-size: clamp(14.4px, 1.2vw, 16px); }
  /* the chapter that does NOT share its band with a frame row (04, which sits beside a
     single still) keeps the plain stack, and its parts are simply spaced. */
  .ss-chapter-stack .ss-story-kicker { margin-bottom: 22px; font-size: clamp(34px, 5vw, 76px); }
  .ss-chapter-stack .ss-chapter-body { max-width: 44ch; font-size: 18px; }
  /* IT HAS TO BE BIG ENOUGH TO OWN THE COLUMN IT SITS IN (user, 2026-09-03: "why is it just
     sitting in an open black space if it doesnt even need that space"). At 52px on one line
     the title was a 225px object in a 505px column with 90px of black above and below it,
     which is not a heading beside a paragraph, it is a heading lost next to one. At 96px on
     two deliberate lines the block is about 380 by 180, so it fills its column across and
     stands as tall as the copy it is centred against: the space stops being empty because
     something is finally in it. Its two lines are set by hand in the kicker text, never by
     letting the column wrap it. */
  .ss-chapter-head .ss-story-kicker {
    font-size: clamp(36px, 6.4vw, 96px);
    line-height: 0.92; letter-spacing: -0.035em;
  }
  /* the header lost the number, the rule and the contents line, so the pictures take the
     height back: 34vh to 38vh, about 34px more picture on a laptop. */
  /* A short window is where a chapter band and a frame row stop fitting together, and the
     picture is the only part of a slide that can give height back without anything being
     cut. Nothing above 760px tall is touched, so the approved framing on a laptop and up
     is exactly what it was. */
  @media (max-width: 900px) {
    .ss-chapter-head { grid-template-columns: 1fr; row-gap: 20px; }
  }

  /* ── THE OPENER ───────────────────────────────────────────────────────────────────
     THE FIRST THING PAST THE HERO IS THE WORLD, FULL BLEED (user, 2026-09-03: "who is
     coming to my website and intrigued to learn about my lego world when this is the
     opener"). It was a chapter header reading "01 · What it is" over a contents line over
     two bordered panels about a third of the screen tall, one of a figure standing in a
     rubble field. That is a filing card. Nobody walks into a world because a heading told
     them a section was about to describe one.
     So the deck now opens on story_aerial_town.jpg, which was shot in engine and sitting
     unused: the whole town at once, the river, all four structures, the real fog. It runs
     edge to edge and the type sits on it. The other unused still, story_world_midday.jpg,
     was considered and is not usable: it is an old flat Blender render with mint coloured
     trees and no atmosphere, and it is nothing like what the Realm looks like now. It stays
     on disk only because it is still the Realm's og:image.
     THE BLEED IS DONE WITH CANCELLING MARGINS, NOT 100vw, and that is deliberate. The
     slide sits inside ".ss-story", whose padding is "0 8vw", so a content box of width W is
     "client - 16vw" and "-8vw" either side widens the slide to exactly "client" again: the
     two vw terms cancel, whatever the window and whatever the scrollbar. "width: 100vw"
     does NOT cancel, because vw counts the scrollbar the scroller's client width does not,
     which is up to 15px of horizontal overflow on any machine that draws one. The slide
     then clips the picture at the viewport edge with the "overflow: hidden" it already has,
     so nothing inside needs a viewport unit at all. The type is brought back onto the
     deck's own 1180 column by the inner. */
  .ss-slide-open {
    justify-content: flex-end;
    padding-bottom: clamp(46px, 7vh, 76px);
    margin-left: -8vw; margin-right: -8vw;
  }
  /* static, so the picture's "inset: 0" resolves against the SLIDE and covers all of it.
     The inner is pushed to the foot of the slide by "flex-end", and an absolute child of it
     would have covered the words alone. */
  .ss-slide-open .ss-slide-inner {
    position: static;
    max-width: calc(1180px + 16vw); margin: 0 auto; padding: 0 8vw;
  }
  .ss-open-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
  .ss-open-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%; object-fit: cover;
    will-change: transform;
  }
  /* THE VEIL IS A FOOTING FOR THE WORDS, NOT A FILTER OVER THE WORLD. The first attempt
     was a full height left to right ramp at .72 on top of a bottom ramp reaching 58% up
     the frame, and between them they greyed the whole picture: the point of the slide is
     that the place looks worth walking into, and a scrim over the whole of it is the one
     thing that guarantees it does not. The world's own fog is already low contrast, so it
     has no contrast to spare.
     So the top 55% is left completely alone, the bottom band carries the type, and a soft
     ellipse in the corner the words actually occupy does the rest. Radial and not a second
     linear ramp, because the words are a block in one corner and not a stripe across the
     frame. */
  .ss-open-veil {
    position: absolute; inset: 0;
    background:
      linear-gradient(to top, rgba(6,6,6,.94) 0%, rgba(6,6,6,.78) 14%, rgba(6,6,6,.3) 32%, rgba(6,6,6,0) 48%),
      radial-gradient(105% 78% at 4% 104%, rgba(6,6,6,.62) 0%, rgba(6,6,6,.22) 45%, rgba(6,6,6,0) 72%);
    /* THE BAND UNDER THE NAV IS GONE, AND THE FROSTED NAV IS WHY. It was a solved
       gradient, .82 falling to .76 across the top 7%: this is the only slide on the deck
       whose top is not black, the world under the nav sampled a flat 170,140,140, and the
       nav's dim items measured 2.4:1 against it, so the PICTURE had to be darkened to
       carry type that had no ground of its own.
       The bar brings its own ground now, so darkening the photograph to serve it is
       paying twice, and stacked the two put a heavy black stripe across the top of the
       one full bleed image on the deck. Contrast is now measured against the bar's own
       fill; see the note on the nav itself. */
  }
  .ss-open-copy { position: relative; z-index: 1; max-width: 760px; }
  .ss-open-title {
    font-family: var(--sf);
    font-size: clamp(42px, 6.6vw, 96px);
    font-weight: 700; line-height: 0.98; letter-spacing: -0.035em;
    color: var(--white);
  }
  .ss-open-title .ss-w { display: inline-block; transform-origin: 50% 100%; }
  .ss-open-line {
    margin-top: clamp(16px, 2.4vh, 26px);
    max-width: 54ch;
    font-size: clamp(15px, 1.35vw, 19px); line-height: 1.55;
    color: rgba(245,242,237,.82);
  }

  /* ── THE TOWN MAP ─────────────────────────────────────────────────────────────────
     Type column left, one interactive object right. Deliberately NOT full bleed like the
     opener: the opener already spent that shot on drama, and this is the same shot doing
     the opposite job. A legend has to be read, and every one of the four pins has to be on
     screen at once, which a cover crop cannot promise. */
  /* the map slide buys its height back from the gutters: it is one picture and two lines,
     and it is the picture that has to be big */
  .ss-slide-map { padding: 62px 0 58px; }
  .ss-slide-map .ss-chapter-head { align-items: center; margin-bottom: clamp(20px, 3vh, 34px); }
  .ss-slide-map .ss-story-kicker { font-size: clamp(32px, 4.2vw, 64px); line-height: 1; }
  .ss-slide-map .ss-chapter-body { max-width: 62ch; }
  /* WIDTH IS DRIVEN BY THE HEIGHT LEFT OVER, not the other way round. The picture is 16/9
     and the slide is snap locked to one screen, so the stage takes whatever vertical it can
     have and derives its width from that; capped at 100% it simply goes full column on a
     tall window. Sizing by width instead overflows the slide on anything short. */
  .ss-map-col { width: min(100%, calc(58vh * 16 / 9)); margin: 0 auto; }
  .ss-slide-map .ss-chapter-head { grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); }
  .ss-map-stage {
    position: relative; aspect-ratio: 16 / 9; width: 100%;
    overflow: hidden; background: #05070b;
    border: 1px solid rgba(245,242,237,.14);
  }
  .ss-map-hint {
    margin-top: 11px; text-align: right;
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.34);
  }
  .ss-map-bed {
    position: absolute; left: -6%; top: -6%; width: 112%; height: 112%;
    object-fit: cover; filter: blur(26px) saturate(.75) brightness(.42);
  }
  .ss-map-fit { position: absolute; }
  .ss-map-img { display: block; width: 100%; height: 100%; }
  /* A PIN IS A STUD SEEN FROM ABOVE, which is what the whole world is made of, and it is
     the 44px target the tap rules ask for with a 15px stud drawn in the middle of it. */
  /* THE BUTTON IS A FIXED 44 SQUARE CENTRED ON THE BUILDING AND THE LABEL HANGS OUTSIDE
     IT. Laid out in flow beside the stud the label is part of the button's width, so
     "translate(-50%)" centres the STUD PLUS THE LABEL on the point and the stud itself
     lands well to the left of the thing it is pointing at: measured, the four pins sat at
     31.2 / 64.7 / 100.5 / 15.5 against the 17.8 / 53.3 / 95.0 / 10.5 they were given, and
     the mansion's ran clean off the picture. Absolutely positioned, the label cannot move
     the anchor whatever it says. 44 is the tap target the rest of the site holds to. */
  /* NOTE the centring is NOT here. "sbPin" animates "scale", and framer-motion writes the
     whole "transform" inline, so a "translate(-50%, -50%)" in this rule is silently
     overwritten the moment the variant runs and every stud lands 22px down and right of
     its building. It is passed as motion's own "x" / "y" instead, which motion composes
     with the scale rather than replacing. */
  .ss-map-pin {
    position: absolute;
    width: 44px; height: 44px; padding: 0;
    display: grid; place-items: center;
    background: none; border: 0; cursor: none;
  }
  /* A PIN HAS TO LOOK LIVE OR NOBODY FINDS OUT IT IS ONE. Four small blue dots on a
     photograph read as part of the photograph; the ring pushing out of each one is the only
     thing that says the picture answers back. The four are offset in time so they read as
     four separate things rather than one blinking pattern, and the ring stops on the pin
     you are actually on, where it would be noise. */
  .ss-map-stud {
    position: relative; flex: none; width: 15px; height: 15px; border-radius: 50%;
    border: 2px solid var(--sky); background: rgba(56,189,248,.22);
    box-shadow: 0 0 0 4px rgba(6,6,6,.5), 0 0 14px rgba(56,189,248,.5);
    transition: transform .18s var(--ease-out), background .18s var(--ease-out);
  }
  .ss-map-stud::after {
    content: ''; position: absolute; inset: -3px; border-radius: 50%;
    border: 1px solid rgba(56,189,248,.6);
    animation: ss-pin-pulse 2.8s cubic-bezier(.2,.7,.3,1) infinite;
  }
  .ss-map-pin:nth-child(3) .ss-map-stud::after { animation-delay: .7s; }
  .ss-map-pin:nth-child(4) .ss-map-stud::after { animation-delay: 1.4s; }
  .ss-map-pin:nth-child(5) .ss-map-stud::after { animation-delay: 2.1s; }
  .ss-map-pin:hover .ss-map-stud::after, .ss-map-pin.on .ss-map-stud::after { animation: none; opacity: 0; }
  @keyframes ss-pin-pulse {
    0% { transform: scale(.75); opacity: .85; }
    72% { transform: scale(2.3); opacity: 0; }
    100% { transform: scale(2.3); opacity: 0; }
  }
  .ss-map-tag {
    position: absolute; left: calc(100% - 12px); top: 50%;
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .05em; text-transform: uppercase;
    color: rgba(245,242,237,.86); white-space: nowrap;
    padding: 3px 7px; border-radius: 3px;
    background: rgba(6,6,6,.66); backdrop-filter: blur(6px);
    opacity: 0; transform: translateY(-50%) translateX(-5px);
    transition: opacity .2s var(--ease-out), transform .2s var(--ease-out);
  }
  .ss-map-pin:hover .ss-map-tag, .ss-map-pin:focus-visible .ss-map-tag, .ss-map-pin.on .ss-map-tag {
    opacity: 1; transform: translateY(-50%) translateX(0);
  }
  .ss-map-pin:hover .ss-map-stud, .ss-map-pin.on .ss-map-stud {
    transform: scale(1.25); background: var(--sky);
  }
  /* the card is standing on this one, so it is taken away rather than left with its end
     showing from under a corner. Solved in the component, since only it knows where the
     card landed; it has to come AFTER the two rules above, which match on as many classes
     as it does. */
  .ss-map-pin.hushed.on .ss-map-tag { opacity: 0; }
  /* the mansion sits at 95% of the frame, so its label opens to the LEFT or it runs off
     the picture. Driven by the data and not by :nth-child, which would re-point at the
     wrong building the moment the four are reordered. */
  .ss-map-pin.flip .ss-map-tag {
    left: auto; right: calc(100% - 12px);
    transform: translateY(-50%) translateX(5px);
  }
  .ss-map-pin.flip:hover .ss-map-tag,
  .ss-map-pin.flip:focus-visible .ss-map-tag,
  .ss-map-pin.flip.on .ss-map-tag { transform: translateY(-50%) translateX(0); }
  /* THE CARD OPENS BESIDE THE PIN IT BELONGS TO, not in a fixed corner (user, 2026-09-09:
     they all show up in the right hand corner and it is not user friendly). All four
     structures shared one slot bottom right, so opening the Coffee Shop, which sits top
     left, put its picture and its name as far from the building as the frame allows and
     made every card look like the same card. The offset is solved in JS against the pin's
     own point in the fitted image, since only the component knows where that landed, and
     it is clamped so a card can never hang off the stage. This rule keeps the bottom right
     placement as the FALLBACK for the frame before it has been measured. */
  .ss-map-frame { position: relative; }
  .ss-map-card {
    position: absolute; right: 2.6%; bottom: 3.6%; width: min(28%, 306px);
    background: rgba(8,9,12,.9); backdrop-filter: blur(12px);
    border: 1px solid rgba(245,242,237,.18);
    box-shadow: 0 18px 40px rgba(0,0,0,.5);
  }
  .ss-map-card img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
  .ss-map-card-body { padding: 12px 13px 14px; display: flex; flex-direction: column; gap: 5px; }
  .ss-map-card-name {
    font-family: var(--sf);
    font-size: 17px; font-weight: 700; letter-spacing: -0.01em; color: var(--white);
  }
  .ss-map-card p { font-size: 12.5px; line-height: 1.45; color: rgba(245,242,237,.66); margin-top: 3px; }
  /* NARROW: the map takes the whole screen width by cancelling the story's gutters, the
     way the opener does, and the card drops below it instead of lying on it. Laid out side
     on, so a phone shows the still and the words without a scroll. */
  @media (max-width: 900px) {
    /* the map slide's own header override is more specific than the shared stack rule, so
       it has to be stacked again here or the title and the copy stay side by side on a
       phone in a column 150px wide */
    .ss-slide-map .ss-chapter-head { grid-template-columns: 1fr; gap: 16px; align-items: start; }
    .ss-map-col { width: 100%; }
    .ss-map-frame { margin-left: -8vw; margin-right: -8vw; }
    .ss-map-stage { border-left: 0; border-right: 0; }
    .ss-map-card {
      position: static; width: auto; margin: 0 8vw;
      display: grid; grid-template-columns: 40% 1fr; align-items: start;
      border-top: 0;
    }
    .ss-map-card img { height: 100%; }
    .ss-map-card-body { padding: 10px 12px 12px; }
    .ss-map-hint { text-align: left; }
  }

  /* ── THE QUIET SLIDE ──────────────────────────────────────────────────────────────
     A chapter band over one bordlerless plate. Everything either side of this screen is
     loud, so it is the one that is allowed to be nearly empty. */
  /* ══ THE THREE CHAPTER SLIDES ARE THREE DIFFERENT KINDS OF SCREEN ══════════════════
     (user, 2026-09-09: "the layout is still so similar ??????")
     THE REPETITION WAS THE BAND, NOT WHAT SAT UNDER IT. All three carried the identical
     chapter head: the same two line blue title in the same corner with the same paragraph
     beside it, filling the top third of three consecutive screens. Two passes were spent
     rearranging the CONTENT below that band, which was never what made them look alike.
     The deck's own rule is that no two slides in a row share a measure, and three did.
     Each now has a structure the others do not, and none of them reuses the two
     treatments already on the deck (the opener and closer are type on a full bleed
     picture) or the About page's 50/50 split:
       · WHAT IT IS   centred. A narrow header centred over a full width map.
       · WHY I MADE IT a side rail. The words in a narrow column, the picture taking the
                       rest of the width and the height.
       · HOW I MADE IT inverted. No display title at the top at all: the sheet leads, and
                       the title sits small at the foot beside the running caption.
     Below 1100 all three collapse to the stacked band they always had, because that is
     the arrangement that fits a 700px viewport under mandatory snapping. */

  /* ── WHY: THE SIDE RAIL ── */
  .ss-quiet { display: grid; row-gap: clamp(20px, 3.4vh, 38px); }
  @media (min-width: 1100px) {
    .ss-quiet {
      grid-template-columns: minmax(240px, 300px) 1fr;
      column-gap: clamp(30px, 3.4vw, 60px);
      align-items: center;
      row-gap: 0;
    }
    /* the rail: title, paragraph and caption stacked small, in reading order */
    .ss-slide-why .ss-chapter-head {
      grid-template-columns: 1fr;
      row-gap: clamp(12px, 1.8vh, 20px);
    }
    /* the rail is 300px, so the display size the other slides use cannot live here. That
       is the point rather than a compromise: a title at 44px reads as a different KIND of
       heading from one at 96px, which is half of what makes this screen its own. */
    .ss-slide-why .ss-story-kicker { font-size: clamp(32px, 3vw, 46px); line-height: 1.02; }
    .ss-slide-why .ss-chapter-body { font-size: 14px; line-height: 1.6; max-width: none; }
    /* the picture takes everything left over, and its caption goes back underneath it */
    .ss-quiet .ss-plate { grid-template-columns: 1fr; justify-items: stretch; }
    .ss-quiet .ss-plate-shot, .ss-quiet .ss-plate figcaption { max-width: 100%; }
    .ss-quiet .ss-plate-shot img { height: clamp(320px, 54vh, 540px); }
  }

  /* ── HOW I MADE IT: INVERTED ── the sheet leads and the words follow it */
  @media (min-width: 1100px) {
    /* The order property needs a flex or grid parent, and .ss-slide-inner is a plain
       block, so the
       shop slide's inner box is made a flex column HERE and nowhere else, rather than
       reordering the JSX: the source order is the reading order a screen reader and a
       keyboard get, and the sheet's caption line only makes sense after its grid. */
    .ss-slide-shop .ss-slide-inner { display: flex; flex-direction: column; }
    .ss-slide-shop .ss-chapter-head {
      order: 2;
      grid-template-columns: minmax(0, 300px) 1fr;
      column-gap: clamp(26px, 3vw, 52px);
      align-items: baseline;
      margin-top: clamp(14px, 2vh, 24px);
    }
    /* small enough to read as a caption's heading rather than as the screen's title */
    .ss-slide-shop .ss-story-kicker { font-size: clamp(26px, 2.4vw, 36px); line-height: 1.04; }
    .ss-slide-shop .ss-chapter-body { font-size: 13.5px; line-height: 1.6; max-width: 92ch; }
    .ss-slide-shop .ss-sheet { order: 1; margin-top: 0; }
    .ss-slide-shop .ss-sheet-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .ss-slide-shop .ss-cell-shot img { height: clamp(96px, 17vh, 178px); }
  }

  /* ── WHAT IT IS: CENTRED ── the only centred screen on the site */
  @media (min-width: 1100px) {
    .ss-slide-map .ss-chapter-head {
      grid-template-columns: 1fr;
      justify-items: center;
      text-align: center;
      row-gap: clamp(10px, 1.4vh, 16px);
    }
    .ss-slide-map .ss-chapter-body { max-width: 68ch; margin: 0 auto; }
    .ss-slide-map .ss-map-hint { text-align: center; }
  }
  .ss-plate { margin: 0; display: grid; row-gap: 11px; justify-items: start; }
  .ss-plate-label {
    font-family: var(--sf);
    font-size: 10.5px; font-weight: 600; letter-spacing: .07em; text-transform: uppercase;
    color: rgba(245,242,237,.5);
  }
  /* ── THE PLATE IS NO LONGER A LETTERBOX STRIP (user, 2026-09-09: the player figure
     screenshot is too thin). IT IS AN ASPECT PROBLEM AND THE NUMBERS SAY SO.
     story_figure_front.jpg is 2400 x 1350, so 16:9, i.e. 1.78:1. It was rendered full
     bleed across the story column at 36vh, which at a 900px window is about 1560 x 414,
     or 3.63:1. object-fit cover then has to throw away 51% OF THE IMAGE'S HEIGHT to
     fill that box, and what it throws away is the bottom half of a STANDING FIGURE: he
     was cut at the waist, which is the one thing this particular still cannot afford,
     since the caption beside it is about how his parts were assembled.
     The fix is to stop asking a 16:9 photograph to fill a 3.6:1 hole. The width is capped
     and the height raised, which brings the box to roughly 1.9:1 and cuts the discarded
     height from 51% to about 7%. There was room for it: this slide was measured with
     about 16% of its own screen empty under the caption, so the picture grew into space
     that was doing nothing.
     Width is capped in CH-INDEPENDENT units on purpose. The caption under it is set to a
     reading measure, and matching the two by eye drifts the moment either changes. */
  .ss-plate-shot {
    display: block; overflow: hidden;
    width: 100%; max-width: min(100%, 780px);
  }
  /* THE CROP WINDOW IS STILL SET, NOT LEFT AT CENTRE, and it still matters at 1.9:1:
     centred, the little that is cropped comes off the top and takes the crown of his
     head. 30% down now rather than 24%, because a taller box needs less pulling up. */
  .ss-plate-shot img {
    display: block; width: 100%;
    height: clamp(230px, 46vh, 430px);
    object-fit: cover; object-position: 50% 30%;
  }
  /* Under 900 the deck stands down to free scrolling and the column narrows, so the cap
     stops doing anything useful and the picture goes back to full width. */
  @media (max-width: 1099px) {
    .ss-plate-shot { max-width: 100%; }
    .ss-plate-shot img { height: clamp(200px, 34vh, 340px); }
  }
  /* the caption sits under the picture, so it takes the picture's measure */
  .ss-plate figcaption {
    max-width: min(100%, 780px);
    max-width: 74ch; font-size: 15px; line-height: 1.5; color: rgba(245,242,237,.62);
  }

  /* ── THE WORKSHOP SHEET ───────────────────────────────────────────────────────────
     Four across, two rows, seven cells. Cell HEIGHT is driven by vh and the picture is
     cropped to it, because the sheet shares a snap locked screen with a chapter band and
     an aspect ratio would have made the height a function of the window's WIDTH, which is
     the one thing that cannot be traded for the band above it. */
  .ss-sheet { margin-top: clamp(18px, 3vh, 34px); }
  .ss-sheet-grid {
    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(9px, 1vw, 15px);
  }
  .ss-cell {
    display: grid; row-gap: 7px; justify-items: start;
    padding: 0; border: 0; background: none; text-align: left; cursor: none;
  }
  .ss-cell-shot {
    display: block; width: 100%; overflow: hidden;
    border: 1px solid rgba(245,242,237,.12);
    transition: border-color .2s var(--ease-out);
  }
  .ss-cell-shot img {
    display: block; width: 100%; height: clamp(78px, 14.5vh, 150px); object-fit: cover;
    filter: saturate(.72) brightness(.72);
    transition: filter .25s var(--ease-out), transform .25s var(--ease-out);
  }
  .ss-cell-label {
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.42);
    transition: color .2s var(--ease-out);
  }
  /* the cell you are on is the only one at full strength, which is what makes a sheet of
     seven read as one thing being examined rather than seven competing for you */
  .ss-cell.on .ss-cell-shot { border-color: rgba(56,189,248,.55); }
  .ss-cell.on .ss-cell-shot img { filter: none; transform: scale(1.04); }
  .ss-cell.on .ss-cell-label { color: var(--sky); }
  .ss-sheet-cap {
    margin-top: clamp(13px, 2vh, 22px);
    max-width: 96ch; min-height: 3.1em;
    font-size: 14px; line-height: 1.55; color: rgba(245,242,237,.66);
  }
  .ss-sheet-cap b {
    font-family: var(--sf); font-weight: 600;
    font-size: 10px; letter-spacing: .06em; text-transform: uppercase;
    color: var(--sky); margin-right: 12px;
  }
  @media (max-width: 900px) {
    .ss-sheet-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .ss-sheet-cap { min-height: 5em; }
  }
  @media (max-width: 560px) {
    .ss-sheet-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  /* ── THE MEASURED FIGURES, on the closing slide over the picture ──────────────────── */
  .ss-figs {
    display: flex; flex-wrap: wrap; gap: clamp(24px, 3.6vw, 54px);
    margin: 0 0 clamp(20px, 3vh, 32px);
    padding-bottom: clamp(16px, 2.4vh, 26px);
    border-bottom: 1px solid rgba(245,242,237,.16);
  }
  .ss-fig { display: flex; flex-direction: column-reverse; gap: 4px; }
  .ss-fig dd {
    margin: 0;
    font-family: var(--sf);
    font-size: clamp(26px, 3vw, 44px); font-weight: 700;
    line-height: 1; letter-spacing: -0.03em; color: var(--white);
  }
  .ss-fig dd i {
    font-style: normal; font-size: .52em; color: var(--sky); margin-left: 2px;
  }
  .ss-fig dt {
    font-family: var(--sf);
    font-size: 10px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.52);
  }
  /* the closer is the opener's twin: same bleed, same veil, same type block */
  .ss-slide-close {
    justify-content: flex-end;
    padding-bottom: clamp(46px, 7vh, 76px);
    margin-left: -8vw; margin-right: -8vw;
  }
  .ss-slide-close .ss-slide-inner {
    position: static;
    max-width: calc(1180px + 16vw); margin: 0 auto; padding: 0 8vw;
  }
  .ss-close-title { font-size: clamp(38px, 5.4vw, 78px); }
  /* THE CLOSER'S VEIL HAS TO REACH HIGHER THAN THE OPENER'S, because its block is taller.
     The opener carries a title and one line and starts about 72% down; this one carries the
     four figures as well and starts at 52.8%, measured, which is above everything the
     opener's ramp was tuned for. Left on the shared veil the mono labels sat on open
     meadow: TRIANGLES A FRAME and FULL DAY CYCLE were unreadable. The figures' own labels
     also come up from .52 to .72 here, since a 9.5px mono line over a picture is the
     smallest thing on the deck and has the least contrast to spare. */
  .ss-slide-close .ss-open-veil {
    background:
      linear-gradient(to top, rgba(6,6,6,.95) 0%, rgba(6,6,6,.9) 34%, rgba(6,6,6,.74) 48%, rgba(6,6,6,.32) 62%, rgba(6,6,6,0) 78%),
      radial-gradient(105% 70% at 4% 104%, rgba(6,6,6,.5) 0%, rgba(6,6,6,.18) 48%, rgba(6,6,6,0) 74%),
      linear-gradient(to bottom, rgba(6,6,6,.82) 0%, rgba(6,6,6,.76) 7%, rgba(6,6,6,.34) 13%, rgba(6,6,6,0) 24%);
  }
  .ss-slide-close .ss-fig dt { color: rgba(245,242,237,.72); }

  /* ── THE INTERSTITIAL EYEBROW ─────────────────────────────────────────────────────
     The three slides that are frames alone had nothing on them but the two panels, which
     left them floating in the middle of a black screen with no top edge and no relation
     to the chapter they belong to. This is the smallest thing that anchors them: the same
     blue rule a chapter hangs off, at half the length, over the same mono the frames label
     themselves with. Deliberately NOT a kicker: a blue heading is a chapter, and these
     are the frames between them. */
  /* a light passes down the still as it lands. Sits inside the shot window, which is
     already overflow:hidden, so it is clipped to the picture and never the border. */

  /* ── DECK RAIL ────────────────────────────────────────────────────────────────────
     Where you are in the deck and a way to jump. The active tick is the only blue
     thing on the right hand side, so it reads without a legend. Ticks are real
     buttons; the label only appears on hover, so the resting state is four pixels of
     chrome rather than a menu. */
  .ss-deck-rail {
    position: fixed; right: max(20px, 2.4vw); top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; align-items: flex-end; gap: 12px; z-index: 60;
    opacity: 0; pointer-events: none; transition: opacity .5s var(--ease-out);
  }
  .ss-deck-rail.on { opacity: 1; pointer-events: auto; }
  .ss-deck-tick { position: relative; display: block; width: 24px; height: 12px; padding: 0; border: 0; background: none; }
  .ss-deck-tick::after {
    content: ''; position: absolute; right: 0; top: 50%; transform: translateY(-50%);
    width: 11px; height: 2px; border-radius: 2px; background: rgba(245,242,237,.24);
    transition: width .5s var(--ease-out), background .5s var(--ease-out), box-shadow .5s var(--ease-out);
  }
  .ss-deck-tick:hover::after { width: 24px; background: rgba(245,242,237,.66); }
  .ss-deck-tick.on::after { width: 24px; background: var(--sky); box-shadow: 0 0 12px rgba(56,189,248,.55); }
  .ss-deck-tip {
    position: absolute; right: 34px; top: 50%;
    transform: translateY(-50%) translateX(8px); white-space: nowrap;
    font-family: var(--sf);
    font-size: 10.5px; font-weight: 590; letter-spacing: .06em; text-transform: uppercase;
    color: rgba(245,242,237,.75);
    opacity: 0; pointer-events: none;
    transition: opacity .35s var(--ease-out), transform .35s var(--ease-out);
  }
  .ss-deck-tick:hover .ss-deck-tip { opacity: 1; transform: translateY(-50%) translateX(0); }
  .ss-deck-count {
    position: fixed; right: max(20px, 2.4vw); bottom: 26px; z-index: 60;
    font-family: var(--sf);
    font-size: 10.5px; font-weight: 590; letter-spacing: .05em; color: rgba(245,242,237,.38);
    opacity: 0; transition: opacity .5s var(--ease-out);
  }
  .ss-deck-count.on { opacity: 1; }
  .ss-deck-count b { color: var(--sky); font-weight: 400; }

  /* Narrow or short: a slide cannot be made to fit without gutting the picture, so
     the deck stands down to ordinary scrolling and the rail goes with it. */
  @media (max-width: 860px), (max-height: 620px) {
    .ss-home-scroll { scroll-snap-type: none; }
    .ss-slide { min-height: auto; display: block; padding: 58px 0; overflow: visible; }
    .ss-deck-rail, .ss-deck-count { display: none; }
    /* THE OPENER KEEPS ITS HEIGHT WHEN THE REST OF THE DECK STANDS DOWN. The stand down
       exists because a chapter band and a two up frame row cannot be made to share one
       screen on a narrow or short window; the opener is one picture and two lines and has
       no such problem. Collapsed to "min-height: auto" with the rest it became a 270px
       strip with the title jammed under the nav, which is the one slide on the deck that
       is nothing but its own size. It does not snap here (the container's snap is off at
       this width), so a viewport height costs the visitor nothing. */
    .ss-slide-open {
      min-height: 74vh;
      display: flex; justify-content: flex-end;
      padding: 58px 0 clamp(34px, 5vh, 56px);
      overflow: hidden;
    }
  }

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
      max-height: 92dvh !important;
      max-width: 100vw !important;
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
      order: 1 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
    }
    .ss-media-viewer > div:nth-child(3) {
      order: 2 !important;
      flex-shrink: 0 !important;
      width: 100% !important;
      padding-right: 4px !important;
      padding-top: 20px !important;
      padding-left: 4px !important;
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
    .ss-media-viewer .ss-asset-title { font-size: 34px !important; margin-bottom: 16px !important; }
  }

  @media (max-width: 768px) {
    .ss-hero-bg { object-position: 78% 5% !important; }
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
    /* homepage content positioning on mobile */
    .ss-home-page .ss-hero-intro { bottom: 17vh !important; }
    /* navigation hint on mobile */
    /* modal close button positioning */
    .ss-modal-close { top: 20px !important; }
    /* media viewer close button positioned above title on all devices */
    .ss-media-viewer-close { top: 100px !important; }
    /* contact page text sizing on mobile */
    .ss-contact-heading { font-size: clamp(90px,12vw,200px) !important; }
    .ss-contact-description { font-size: clamp(22px,4vw,36px) !important; }
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

  /* ═══════════════════════════════════════════════════════════
     APPLE-STYLE PASS — fonts + rounded corners only.
     Layout, spacing and structure are untouched. Remove this
     block to revert entirely.
  ═══════════════════════════════════════════════════════════ */
  /* ── THE BASE FACE ──
     Apple's system font (SF Pro on Mac) is the DEFAULT here, and it used to be an
     !important on the UNIVERSAL selector, which is two separate mistakes and both of
     them bite. An !important in a stylesheet beats an INLINE style, so every font
     family written in a style prop in this file was dead and rendered as SF Pro: the
     Space Mono labels, the Cormorant Garamond body copy, the Bebas Neue headings, all
     of it. And a universal selector beats INHERITANCE, so even a rule that did win on a
     parent could not reach the children, because every child matched the star directly
     and took SF Pro from it.
     Declared on html instead it is what it was meant to be: a default that inherits
     down and that anything more specific can override. Form controls do not inherit a
     font family on their own, which is the one thing the star was really buying, so
     they are given it explicitly.
     NOTE the comment above carries no backticks on purpose. GLOBAL_CSS is a template
     literal, so one backtick anywhere in here ends the string and breaks the file. */
  html {
    font-family: var(--sf);
  }
  button, input, select, textarea, optgroup { font-family: inherit; }
  /* The Apple pass also pulled the two big display headings to -0.02em and 700, which
     was right while they were SF Pro and is wrong now that they render in the Bebas
     Neue they were always written in: a condensed caps face needs POSITIVE tracking
     (they carry their own, 4px and 5px) and Bebas ships one weight, so 700 bought
     nothing and the negative tracking ran the letters into each other. Removed rather
     than retuned, because each heading already states what it wants inline. */

  /* smooth, rounded surfaces instead of sharp corners */
  .ss-card {
    border-radius: 22px !important;
    overflow: hidden !important;
  }
  .ss-tile { border-radius: 18px !important; }
  .ss-work-modal { border-radius: 26px !important; overflow: hidden !important; }
  /* masonry gallery (Work modal: creative + professional) — packs mixed
     aspect ratios tightly with no ragged gaps, shows every image uncropped */
  .ss-scell { position: relative; border-radius: 14px; overflow: hidden; background: #111214; border: 1px solid rgba(245,242,237,.1); cursor: none; transition: transform .5s var(--ease-out), border-color .4s var(--ease-out), box-shadow .5s var(--ease-out); }
  .ss-scell:hover { transform: translateY(-4px); border-color: var(--sky); box-shadow: 0 18px 44px rgba(0,0,0,.5); }
  .ss-scell .ss-sthumb { position: relative; width: 100%; background: #0a0a0c; overflow: hidden; }
  .ss-scell .ss-sthumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s var(--ease-out); }
  .ss-scell:hover .ss-sthumb img { transform: scale(1.05); }
  .ss-scell .ss-sbody { padding: 10px 12px 12px; }
  /* scroll affordances: a visible slim scrollbar + a bottom fade */
  .ss-scroll { scrollbar-width: thin; scrollbar-color: rgba(245,242,237,.28) transparent; }
  .ss-scroll::-webkit-scrollbar { width: 8px; }
  .ss-scroll::-webkit-scrollbar-track { background: transparent; }
  .ss-scroll::-webkit-scrollbar-thumb { background: rgba(245,242,237,.22); border-radius: 8px; }
  .ss-scroll::-webkit-scrollbar-thumb:hover { background: rgba(56,189,248,.55); }
  .ss-scroll-fade { position: absolute; left: 0; right: 8px; bottom: 0; height: 54px; background: linear-gradient(to top, rgba(6,6,6,.92), transparent); pointer-events: none; }
  /* Work page background: ONE continuous drift; only the colours change per slide
     (registered custom props so the colours interpolate; motion never resets) */
  @property --wbc1 { syntax: "<color>"; inherits: true; initial-value: rgba(0,0,0,0); }
  @property --wbc2 { syntax: "<color>"; inherits: true; initial-value: rgba(0,0,0,0); }
  @property --wbc3 { syntax: "<color>"; inherits: true; initial-value: rgba(0,0,0,0); }
  @keyframes ssFloatA { 0%,100% { transform: translate(-10%,-6%) scale(1); } 33% { transform: translate(9%,11%) scale(1.16); } 66% { transform: translate(15%,-8%) scale(1.08); } }
  @keyframes ssFloatB { 0%,100% { transform: translate(12%,9%) scale(1.1); } 33% { transform: translate(-10%,-7%) scale(1); } 66% { transform: translate(-15%,11%) scale(1.15); } }
  @keyframes ssFloatC { 0%,100% { transform: translate(3%,-12%) scale(1.05); } 33% { transform: translate(-12%,7%) scale(1.17); } 66% { transform: translate(11%,13%) scale(1); } }
  .ss-media-viewer img,
  .ss-media-viewer video { border-radius: 22px !important; }
  .ss-contact-btn { border-radius: 980px !important; }

  /* Work page: hover "View" cue on cards + CTA link */

  .ss-contact-page { overflow-y: auto !important; justify-content: flex-start !important; overscroll-behavior: contain; }
  .ss-contact-content { flex-shrink: 0; margin: auto 0; padding: 120px max(24px, 8vw) 72px !important; }
  @media (max-width: 640px) {
    .ss-contact-page .ss-contact-heading { font-size: clamp(42px, 11vw, 64px) !important; }
    .ss-contact-page .ss-contact-description { font-size: 16px !important; text-align: left !important; }
    .ss-contact-content > div:first-child { align-items: flex-start !important; flex-direction: column; gap: 18px !important; }
  }

  .ss-work-page [role="button"]:focus-visible { outline: 2px solid var(--sky); outline-offset: 5px; }
  .ss-home-hero { min-height: max(620px, 100svh); }
  @media (max-height: 560px) and (min-width: 641px) {
    .ss-home-page .ss-hero-intro { bottom: 85px !important; }
    .ss-hero-name { font-size: 70px !important; }
  }
  @media (pointer: coarse) {
    button, a, [role="button"] { touch-action: manipulation; }
  }
  @media (max-width: 400px) {
    .ss-media-viewer .ss-asset-title { font-size: 28px !important; overflow-wrap: anywhere; }
  }

  .ss-scell, .ss-tile { display: block; width: 100%; text-align: left; padding: 0; font: inherit; }
  .ss-tile:focus-visible .ss-tile-info { opacity: 1; }
  @media (hover: none) { .ss-tile-info { opacity: 1 !important; } }
  .ss-work-modal { max-height: calc(100dvh - 32px) !important; overflow-y: auto; padding: 20px; }
  .ss-work-modal .ss-modal-close { position: static !important; display: block; align-self: flex-end; min-height: 44px; margin: 0 0 20px auto; flex-shrink: 0; }
  @media (max-width: 1023px), (max-height: 600px) {
    .ss-work-modal { display: block !important; width: calc(100vw - 32px) !important; }
    .ss-work-modal .ss-scroll { overflow: visible !important; }
    .ss-work-modal .ss-modal-grid { display: grid !important; grid-template-columns: repeat(2,minmax(0,1fr)) !important; overflow: visible !important; max-height: none !important; gap: 16px !important; }
    .ss-work-modal .ss-modal-grid > * { width: 100% !important; min-width: 0; }
    .ss-work-modal .ss-scroll-fade { display: none; }
  }
  @media (max-width: 640px) {
    .ss-home-hero { min-height: max(760px,100svh); }
    .ss-home-page .ss-hero-intro { bottom: 60px !important; }
    .ss-home-hero .ss-hero-bg { height: 62% !important; object-position: 75% 5% !important; mask-image: linear-gradient(#000 60%,transparent); }
    .ss-work-modal { padding: 14px; }
    .ss-work-modal .ss-tile { min-height: 160px !important; }
  }

  /* Chapter titles must fit their actual column, including intermediate window widths. */
  .ss-chapter-head > * { min-width: 0; }
  .ss-chapter-head .ss-story-kicker { overflow-wrap: anywhere; }
  .ss-chapter-head .ss-story-kicker .ss-w { max-width: 100%; line-height: inherit; }
  .ss-slide-map .ss-chapter-head { row-gap: 24px; }
  @media (max-width: 1099px) {
    .ss-chapter-head, .ss-slide-map .ss-chapter-head {
      grid-template-columns: minmax(0, 1fr); gap: 22px; align-items: start;
    }
    .ss-chapter-head .ss-story-kicker { font-size: clamp(32px, 5.3vw, 58px); line-height: 1.05; }
    .ss-chapter-head .ss-chapter-body { max-width: 68ch; }
  }
  /* Contact sizing follows CSS breakpoints even when the window changes without remounting. */
  .ss-contact-entry > span:nth-child(2) { white-space: normal !important; overflow-wrap: anywhere; }
  @media (max-width: 640px) {
    .ss-contact-entry { gap: 16px !important; padding: 16px 8px !important; }
    .ss-contact-entry > span:first-child { width: auto !important; font-size: 16px !important; }
    .ss-contact-entry > span:nth-child(2) { font-size: 13.5px !important; }
  }

  /* asset titles: rounded "iPhone bubble" font (SF Pro Rounded) */
  /* was SF Pro Rounded, the iMessage bubble face. One family means one family. */
  .ss-asset-title { font-weight: 590; letter-spacing: -0.01em; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    /* the storyboard's entrances are inline transforms from framer-motion, which the rules
       above cannot reach: pin every part at its finished state instead */
    .ss-story, .ss-story * { opacity: 1 !important; transform: none !important; clip-path: none !important; }
    /* The hero name is per letter and driven by framer-motion, so its transforms are
       INLINE and the duration rules above cannot reach them either. Pin it finished:
       the letters are the name, and a visitor who asked for less motion still has to
       be able to read it. */
    .ss-hero-name, .ss-hero-name * { opacity: 1 !important; transform: none !important; filter: none !important; }
    .ss-hero-bg { transform: none !important; }
    /* and the deck itself: snapping is motion the visitor did not ask for */
    .ss-home-scroll { scroll-snap-type: none !important; }
  }
`;function ve(){const t=d.useRef(null);return d.useEffect(()=>{const o=t.current;if(!o)return;const s=requestAnimationFrame(()=>o.classList.add("ss-cursor-ready"));let l=-1,n=-1;const a=r=>{o.style.left=r.clientX+"px",o.style.top=r.clientY+"px",l>=0&&(r.clientX!==l||r.clientY!==n)&&(o.style.opacity="1"),l=r.clientX,n=r.clientY},h=()=>{o.style.opacity="0"},p=r=>r.preventDefault();return window.addEventListener("mousemove",a),document.addEventListener("mouseleave",h),document.addEventListener("dragstart",p),()=>{cancelAnimationFrame(s),window.removeEventListener("mousemove",a),document.removeEventListener("mouseleave",h),document.removeEventListener("dragstart",p)}},[]),e.jsx("div",{id:"ss-cursor-dot",ref:t})}function _(){const t=d.useCallback(()=>document.body.classList.add("ss-hover"),[]),o=d.useCallback(()=>document.body.classList.remove("ss-hover"),[]);return{onMouseEnter:t,onMouseLeave:o}}const C=[.32,.72,0,1],k=typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,J={initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:k?.001:.28,ease:"linear"}};function ke(){const[t,o]=d.useState("home"),[s,l]=d.useState(null),[n,a]=d.useState(null),h=t==="about";d.useEffect(()=>{if(document.getElementById("ss-global"))return;const i=document.createElement("style");i.id="ss-global",i.innerHTML=xe,document.head.appendChild(i)},[]),d.useEffect(()=>{const i=t==="about"?"#f1eff2":"#060606";document.documentElement.style.backgroundColor=i,document.body.style.backgroundColor=i},[t]);const p=d.useCallback(i=>{i!==t&&(l(null),a(null),o(i))},[t]),r=d.useCallback(i=>{const u=O.flatMap(m=>m.media).find(m=>m.title===i);u&&a(u)},[]);return d.useEffect(()=>{const i=u=>{if(n){u.key==="Escape"&&a(null);return}if(s){u.key==="Escape"&&l(null);return}};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[n,s]),e.jsxs("div",{style:{position:"fixed",inset:0,width:"100%",height:"100dvh",overflow:"hidden",background:"#060606"},children:[e.jsx("svg",{width:"0",height:"0","aria-hidden":"true",focusable:"false",style:{position:"absolute",pointerEvents:"none"},children:e.jsx("defs",{children:e.jsxs("filter",{id:"ss-portrait-detail",x:"0",y:"0",width:"100%",height:"100%",colorInterpolationFilters:"sRGB",children:[e.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"0.65",edgeMode:"duplicate",result:"soft"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"soft",operator:"arithmetic",k1:"0",k2:"1.35",k3:"-0.35",k4:"0"})]})})}),e.jsx(ve,{}),e.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,zIndex:1e4,display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"max(28px, calc(28px + env(safe-area-inset-top)))",paddingBottom:"28px",paddingLeft:"max(48px, calc(48px + env(safe-area-inset-left)))",paddingRight:"max(48px, calc(48px + env(safe-area-inset-right)))",pointerEvents:"none"},children:[e.jsx("div",{style:{visibility:"hidden"}}),e.jsx("ul",{style:{display:"flex",gap:40,listStyle:"none",pointerEvents:"auto"},children:be.map(i=>e.jsx("li",{children:e.jsx(Ee,{label:i.charAt(0).toUpperCase()+i.slice(1),active:t===i,onClick:()=>p(i),onLight:h})},i))})]}),e.jsxs($,{children:[t==="home"&&e.jsx(Re,{onNavigate:p,onMediaClick:r},"home"),t==="work"&&e.jsx(Ue,{onCardClick:l},"work"),t==="about"&&e.jsx(fe,{},"about"),t==="contact"&&e.jsx(Ve,{},"contact")]}),e.jsx($,{children:s&&e.jsx(Ye,{project:s,onClose:()=>l(null),onMediaClick:a})}),e.jsx($,{children:n&&e.jsx(qe,{item:n,onClose:()=>a(null),onItemClick:a})})]})}function Ee({label:t,active:o,onClick:s,onLight:l}){const n=_();return e.jsxs("button",{onClick:s,className:"ss-tap",style:{fontFamily:"var(--sf)",fontSize:12,fontWeight:590,letterSpacing:"0.05em",textTransform:"uppercase",color:l?"#14110b":"var(--white)",background:"none",border:"none",cursor:"none",opacity:o?1:.86,textShadow:l?"0 0 2px rgba(255,253,249,1), 0 0 4px rgba(255,253,249,1), 0 0 10px rgba(255,253,249,1), 0 0 20px rgba(255,253,249,.9)":"0 0 2px rgba(0,0,0,.95), 0 1px 3px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,.95)",transition:"opacity .3s var(--ease-out), color .45s var(--ease-out), text-shadow .45s var(--ease-out)",position:"relative"},...n,children:[t,e.jsx("span",{style:{position:"absolute",bottom:-4,left:0,height:1,background:"var(--sky)",width:o?"100%":0,transition:"width 0.4s var(--ease-out)",display:"block"}})]})}function Se(){const t=window;if(typeof t.__realmSupported!="function")return{ok:!0,why:"",message:""};try{const o=t.__realmSupported();return{ok:!!o.ok,why:o.why||"",message:typeof t.__realmSupportMessage=="function"?t.__realmSupportMessage():""}}catch{return{ok:!0,why:"",message:""}}}const ae=["Shyon","Shiri"],Te=C,je={hidden:{},show:{transition:{staggerChildren:.052,delayChildren:.32}}},Ne={hidden:{opacity:0,y:"-0.85em",scale:1.06,filter:"blur(3px)"},show:{opacity:1,y:["-0.85em","0.045em","0em"],scale:[1.06,.985,1],filter:["blur(3px)","blur(0px)","blur(0px)"],transition:{duration:.76,times:[0,.72,1],ease:Te}}};function Ae({isMobile:t}){return e.jsx(b.h1,{className:"ss-hero-name","aria-label":ae.join(" "),variants:je,initial:"hidden",animate:"show",style:{fontSize:t?"clamp(46px,7.4vw,74px)":"clamp(68px,9.4vw,148px)"},children:ae.map(o=>e.jsx("span",{className:"ss-hero-line","aria-hidden":"true",children:[...o].map((s,l)=>e.jsx(b.span,{className:"ss-hero-ch",variants:Ne,children:s},o+l))},o))})}function Re({onNavigate:t,onMediaClick:o}){const[s,l]=d.useState(!1),[n,a]=d.useState(window.innerWidth<=640),[h]=d.useState(Se),p=_(),r=d.useRef(null);d.useEffect(()=>{const m=()=>{a(window.innerWidth<=640)};return window.addEventListener("resize",m),()=>window.removeEventListener("resize",m)},[]);const i=d.useRef(null);d.useEffect(()=>()=>i.current?.(),[]);const u=m=>{i.current?.();const g=r.current,T=g?.querySelector(`[data-slide="${m}"]`);if(!g||!T)return;const S=g.scrollTop,A=Math.min(g.scrollHeight-g.clientHeight,S+T.getBoundingClientRect().top-g.getBoundingClientRect().top);if(k){g.scrollTo({top:A,behavior:"instant"});return}const I=A-S,z=Math.min(2600,1200+Math.abs(I)*.45),w=performance.now(),j=g.style.scrollSnapType,v=g.style.scrollBehavior;g.style.scrollSnapType="none",g.style.scrollBehavior="auto";let c=0;const f=()=>{cancelAnimationFrame(c),g.style.scrollSnapType=j,g.style.scrollBehavior=v,g.removeEventListener("wheel",f),g.removeEventListener("touchstart",f),g.removeEventListener("pointerdown",f),window.removeEventListener("keydown",f),i.current=null};i.current=f,g.addEventListener("wheel",f,{passive:!0}),g.addEventListener("touchstart",f,{passive:!0}),g.addEventListener("pointerdown",f,{passive:!0}),window.addEventListener("keydown",f);const y=N=>{const E=Math.min(1,(N-w)/z),H=(1-Math.cos(Math.PI*E))/2;g.scrollTop=S+I*H,E<1?c=requestAnimationFrame(y):f()};c=requestAnimationFrame(y)};return e.jsxs(b.div,{...J,ref:r,className:"ss-home-page ss-home-scroll",style:{position:"absolute",inset:0,background:"#060606"},children:[e.jsxs("div",{className:"ss-home-hero ss-snap","data-slide":"hero","data-label":"Top",style:{position:"relative",height:"100dvh",overflow:"hidden"},children:[e.jsx("img",{src:"/assets/New_Shiri_Site_Pic.jpg",decoding:"async",width:"1920",height:"1080",alt:"",onLoad:()=>l(!0),className:s?"ss-hero-bg ss-hero-bg-active":"ss-hero-bg",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"65% 5%",filter:"url(#ss-portrait-detail) brightness(0.62) contrast(1.1)",zIndex:1}}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:2,background:"radial-gradient(ellipse 65% 100% at 72% 50%, transparent 25%, rgba(6,6,6,.65) 70%), linear-gradient(to bottom, rgba(6,6,6,.25) 0%, transparent 30%, transparent 65%, rgba(6,6,6,.85) 100%)"}}),e.jsxs("div",{className:"ss-hero-intro",style:{position:"absolute",bottom:n?"14vh":"24vh",left:"8vw",right:"8vw",zIndex:10,transition:"bottom 0.3s ease"},children:[e.jsx(b.p,{className:"ss-hero-kicker",initial:k?!1:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:k?0:.4,delay:k?0:.2,ease:C},children:"Designer & developer"}),e.jsx(Ae,{isMobile:n}),e.jsxs(b.div,{className:"ss-hero-summary",initial:k?!1:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.38,delay:k?0:.5,ease:C},children:[e.jsx("p",{className:"ss-hero-description",children:"Brand identity, web development, and 3D design. Based in the Bay Area."}),e.jsxs("div",{className:"ss-hero-actions",children:[e.jsx("button",{type:"button",className:"ss-hero-primary",onClick:()=>t("work"),...p,children:"View my work"}),e.jsx("button",{type:"button",className:"ss-hero-secondary",onClick:()=>u("open"),...p,children:"Explore the Lego Realm"})]})]})]}),e.jsx(b.button,{initial:k?!1:{opacity:0},animate:{opacity:1},transition:{duration:.35,delay:k?0:.7},className:"ss-story-cue",onClick:()=>u("selected"),"aria-label":"Scroll to selected work",...p,style:{cursor:"none"},children:e.jsx("span",{className:"ss-cue-arrow",children:"▼"})})]}),e.jsx(ye,{onOpen:o,onAllWork:()=>t("work")}),e.jsxs("div",{className:"ss-story",style:{position:"relative",background:"#060606",padding:"0 8vw"},children:[e.jsxs(Y,{id:"open",label:"My Lego Realm",className:"ss-slide-open",stagger:.14,children:[e.jsxs("div",{className:"ss-open-bg",children:[e.jsx(b.img,{className:"ss-open-img",variants:oe,src:"/assets/story/story_sunset.jpg",alt:"The cottage and footbridge beside the river at sunset.",loading:"lazy",decoding:"async"}),e.jsx("div",{className:"ss-open-veil","aria-hidden":!0})]}),e.jsxs("div",{className:"ss-open-copy",children:[e.jsx(X,{className:"ss-open-title",text:"My Lego Realm",variant:le,stagger:.07}),e.jsx(X,{className:"ss-open-line",text:"A real-time 3D environment you can walk through in your browser. Cross the river, climb the ruins, and find projects inside the buildings.",variant:ie,stagger:.018})]})]}),e.jsxs("div",{style:{maxWidth:1180,margin:"0 auto"},children:[e.jsx(Y,{id:"map",label:"Navigation",className:"ss-slide-map",stagger:.18,children:e.jsxs("div",{className:"ss-map-col",children:[e.jsx(ne,{pair:!0,kicker:"Navigation",body:"The coffee shop opens client work, the cottage holds personal projects, and the house leads to About. NABU is at the crystal above the ruins."}),e.jsx(Le,{}),e.jsx("div",{className:"ss-map-hint",children:"Select a building to preview it"})]})}),e.jsxs(Y,{id:"shop",label:"Development",className:"ss-slide-shop",stagger:.18,children:[e.jsx(ne,{pair:!0,kicker:"Development",body:"Blender handles the modeling and materials; Three.js handles the real-time scene. Compressed glTF files keep the models manageable. Collision follows the brick geometry, terrain controls each step, and the lighting changes as you explore. Most builds are my own, alongside a few modified free assets."}),e.jsx(He,{})]})]}),e.jsxs(Y,{id:"close",label:"Enter the Realm",className:"ss-slide-close",stagger:.16,children:[e.jsxs("div",{className:"ss-open-bg",children:[e.jsx(b.img,{className:"ss-open-img",variants:oe,src:"/assets/story/story_aerial_sunset.jpg",alt:"The town from above at sunset, the lampposts coming on.",loading:"lazy",decoding:"async"}),e.jsx("div",{className:"ss-open-veil","aria-hidden":!0})]}),e.jsxs("div",{className:"ss-open-copy",children:[e.jsx(b.dl,{className:"ss-figs",variants:re,children:Pe.map(m=>e.jsxs(b.div,{className:"ss-fig",variants:_e,children:[e.jsxs("dd",{children:[m.n,e.jsx("i",{children:m.unit})]}),e.jsx("dt",{children:m.label})]},m.label))}),e.jsx(X,{className:"ss-open-line",text:h.ok?"Controls are displayed on entry.":"Open this page on a supported desktop or laptop to explore the environment. All portfolio projects are also available in Work.",variant:ie,stagger:.018}),e.jsxs(b.div,{variants:de,style:{display:"flex",alignItems:"center",gap:22,flexWrap:"wrap",marginTop:26},children:[h.ok?e.jsxs("a",{href:"/lego.html",...p,className:"ss-contact-btn",style:{display:"inline-flex",alignItems:"center",gap:10,padding:"16px 30px",borderRadius:980,minHeight:46,border:"1px solid rgba(245,242,237,.4)",color:"var(--white)",textDecoration:"none",fontSize:13,fontWeight:600,cursor:"none"},children:[e.jsx("span",{children:"Enter the Realm"}),e.jsx("span",{children:"→"})]}):e.jsxs("p",{style:{maxWidth:430,fontSize:14,lineHeight:1.6,color:"rgba(245,242,237,.62)",fontFamily:"var(--sf)"},children:[e.jsx("span",{style:{display:"block",marginBottom:6,fontFamily:"var(--sf)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--sky)"},children:"Desktop only"}),h.message]}),e.jsx("span",{role:"button",tabIndex:0,onClick:()=>t("work"),onKeyDown:m=>{(m.key==="Enter"||m.key===" ")&&t("work")},...p,className:"ss-tap",style:{fontFamily:"var(--sf)",fontSize:11.5,fontWeight:590,letterSpacing:"0.05em",textTransform:"uppercase",color:"rgba(245,242,237,.72)",textDecoration:"underline",textUnderlineOffset:"4px",cursor:"none",display:"inline-block"},children:h.ok?"or browse the work":"Browse the work"})]})]})]})]}),e.jsx(We,{scrollRef:r})]},"home")}const L=C,Ie={hidden:{},show:{transition:{staggerChildren:.04,delayChildren:0}}},re={hidden:{},show:{transition:{staggerChildren:.03,delayChildren:0}}},le={hidden:{opacity:0,y:8},show:{opacity:1,y:0,transition:{duration:.36,ease:L}}},ie={hidden:{opacity:0,y:5},show:{opacity:1,y:0,transition:{duration:.32,ease:L}}},de={hidden:{opacity:0,y:22},show:{opacity:1,y:0,transition:{duration:.72,ease:L}}},Ce={hidden:{opacity:0,y:14,clipPath:"inset(0% 0% 100% 0%)"},show:{opacity:1,y:0,clipPath:"inset(0% 0% -6% 0%)",transition:{duration:.7,ease:L}}},Be={hidden:{y:30,borderColor:"rgba(245,242,237,0)"},show:{y:0,borderColor:"rgba(245,242,237,0.16)",transition:{duration:.8,ease:L,staggerChildren:.13,delayChildren:.14}}},oe={hidden:{opacity:0,scale:1.015},show:{opacity:1,scale:1,transition:{duration:1.9,ease:L}}};function X({text:t,variant:o,className:s,style:l}){const n=[];return t.split(`
`).forEach((a,h)=>{h>0&&n.push(e.jsx("br",{},"br"+h));const p=a.split(" ");p.forEach((r,i)=>n.push(e.jsxs("span",{className:"ss-w",style:{display:"inline-block"},children:[r,i<p.length-1?" ":""]},h+"-"+i)))}),e.jsx(b.p,{className:s,style:l,variants:o,children:n})}const ze={hidden:{opacity:0,y:22},show:{opacity:1,y:0,transition:{duration:.85,ease:C}}},q=[{scene:"Assembly",src:"/assets/story/story_blender_shop_assembly.jpg",caption:"The coffee shop in progress, assembled from individual bricks on the same stud grid used by the engine."},{scene:"Mesh editing",src:"/assets/story/story_blender_ruins_edit.jpg",caption:"Building the ruins in Edit Mode. The highlighted brick course forms the next section above the doorway."},{scene:"Sculpting",src:"/assets/story/story_blender_hair_sculpt.jpg",caption:"The character's hair in Sculpt Mode under a clay material. Roughly 8,000 vertices shaped by hand, then exported with cleaned normals for smooth shading."},{scene:"UV and texturing",src:"/assets/story/story_blender_skull_uv.jpg",caption:"The skull’s UV layout on the left and its mapped texture on the right. Printed details are applied through the same workflow."},{scene:"Figure assembly",src:"/assets/story/story_blender_figure_exploded.jpg",caption:"The minifig broken into its parts: hair, head, torso, and arms. The legs are a separate asset, attached to the hip pivots at runtime so the walk cycle can swing them."},{scene:"Materials",src:"/assets/story/story_blender_house_nodes.jpg",caption:"The house during construction, with the node graph for its tinted window material below the viewport."},{scene:"Render preview",src:"/assets/story/story_blender_cottage_render.jpg",caption:"Checking the cottage’s materials and lighting in Blender before export."}];function He(){const[t,o]=d.useState(0);return e.jsxs(b.div,{className:"ss-sheet",variants:re,children:[e.jsx("div",{className:"ss-sheet-grid",children:q.map((s,l)=>e.jsxs(b.button,{className:`ss-cell${l===t?" on":""}`,variants:Be,onMouseEnter:()=>o(l),onFocus:()=>o(l),"aria-label":s.scene,children:[e.jsx(b.span,{className:"ss-cell-shot",variants:ze,children:e.jsx("img",{src:s.src,alt:s.scene,loading:"lazy",decoding:"async"})}),e.jsx("span",{className:"ss-cell-label",children:s.scene})]},s.src))}),e.jsxs(b.p,{className:"ss-sheet-cap",variants:Ce,children:[e.jsx("b",{children:q[t].scene}),q[t].caption]})]})}const Pe=[{n:"15.9",unit:"M",label:"Triangles a frame"},{n:"689",unit:"",label:"Draw calls"},{n:"35",unit:"",label:"Models loaded"},{n:"7",unit:"min",label:"Full day cycle"}],_e={hidden:{opacity:0,y:14},show:{opacity:1,y:0,transition:{duration:.6,ease:C}}},K=[{id:"shop",name:"The Coffee Shop",cat:"Professional Services",x:18.2,y:26,flip:!1,src:"/assets/story/story_shop_evening.jpg",line:"Commissioned client work. Full-stack websites, brand and print for small businesses, and concept visualization."},{id:"cottage",name:"The Cottage",cat:"Personal Projects",x:53.5,y:25,flip:!1,src:"/assets/story/story_sunset.jpg",line:"Self-directed work. 3D modeling and rendering, product prototypes, custom hardware, photography and fabrication."},{id:"house",name:"The Modern House",cat:"About",x:93.5,y:38,flip:!0,src:"/assets/story/story_lamp_night.jpg",line:"Background and training, and how the disciplines across the rest of the site fit together."},{id:"ruins",name:"The Ruins",cat:"NABU",x:13,y:85,flip:!1,src:"/assets/story/story_crystal_night.jpg",line:"Art direction, promotional video and campaign photography for the NABU streetwear brand."}],De={hidden:{opacity:0,scale:.55},show:{opacity:1,scale:1,transition:{duration:.55,ease:C}}},Oe={hidden:{opacity:0,y:10},show:{opacity:1,y:0,transition:{duration:.45,ease:C}}};function Le(){const t=d.useRef(null),o=d.useRef(null),[s,l]=d.useState({left:0,top:0,w:0,h:0}),[n,a]=d.useState({w:0,h:0}),[h,p]=d.useState({l:0,r:0}),[r,i]=d.useState(0),[u,m]=d.useState(null),[g,T]=d.useState(!1);d.useEffect(()=>{const w=t.current;if(!w)return;const j=2400,v=1350,c=()=>{const y=w.getBoundingClientRect();if(!y.width||!y.height)return;const N=Math.min(y.width/j,y.height/v),E=j*N,H=v*N;l({left:(y.width-E)/2,top:(y.height-H)/2,w:E,h:H});const x=document.documentElement.clientWidth;let B=0,P=x;for(let R=w;R&&R!==document.documentElement;R=R.parentElement)if(getComputedStyle(R).overflowX!=="visible"){const W=R.getBoundingClientRect();B=Math.max(B,W.left),P=Math.min(P,W.right)}p({l:B+8-y.left,r:Math.min(P-8,x-64)-y.left}),a({w:y.width,h:y.height})};c();const f=new ResizeObserver(c);return f.observe(w),()=>f.disconnect()},[]),d.useLayoutEffect(()=>{if(!u)return;const w=o.current;w&&i(w.offsetHeight)},[u,n.w]);const S=K.find(w=>w.id===u)||null,A=S?I(S):void 0;return e.jsxs("div",{className:"ss-map-frame",children:[e.jsxs(b.div,{className:"ss-map-stage",ref:t,variants:de,children:[e.jsx("img",{className:"ss-map-bed",src:"/assets/story/story_aerial_town.jpg",alt:"","aria-hidden":!0,loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"ss-map-fit",style:{left:s.left,top:s.top,width:s.w,height:s.h},children:[e.jsx("img",{className:"ss-map-img",src:"/assets/story/story_aerial_town.jpg",loading:"lazy",alt:"The town from above: the Coffee Shop, the Cottage, the Modern House and the Ruins.",decoding:"async"}),K.map(w=>e.jsxs(b.button,{variants:De,className:`ss-map-pin${w.flip?" flip":""}${u===w.id?" on":""}`+(u===w.id&&A?.covered?" hushed":""),style:{left:w.x+"%",top:w.y+"%",x:"-50%",y:"-50%"},onMouseEnter:()=>{g||m(w.id)},onMouseLeave:()=>{g||m(null)},onFocus:()=>m(w.id),onClick:()=>{const j=u===w.id&&g;T(!j),m(j?null:w.id)},"aria-label":w.name+", "+w.cat,children:[e.jsx("span",{className:"ss-map-stud","aria-hidden":!0}),e.jsx("span",{className:"ss-map-tag",children:w.cat})]},w.id))]})]}),z()]});function I(w){if(!n.w||!s.w)return;const j=10,v=20,c=16,f=Math.min(n.w*.28,306),y=r||f*9/16+104,N=D=>({x:s.left+s.w*D.x/100,y:s.top+s.h*D.y/100}),E=N(w),H=K.filter(D=>D.id!==w.id).map(N),x=w.x<50,B=w.y<55,P=[[x,B],[x,!B],[!x,B],[!x,!B]];let R=null;for(const[D,W]of P){const ce=Math.min(j,h.l),he=Math.max(n.w-j,h.r),F=Math.max(ce,Math.min(D?E.x+v:E.x-v-f,he-f)),M=Math.max(j,Math.min(W?E.y+v:E.y-v-y,n.h-y-j));let G=10*H.filter(U=>U.x>F-c&&U.x<F+f+c&&U.y>M-c&&U.y<M+y+c).length;const Z=14+7.6*w.cat.length,Q=w.flip?E.x-10-Z:E.x+10,ee=Q<F+f+4&&Q+Z>F-4&&E.y-11<M+y+4&&E.y+11>M-4;ee&&G++;const te={left:F,top:M,hits:G,tag:ee};if(!G){R=te;break}(!R||G<R.hits)&&(R=te)}return{style:{left:R.left,top:R.top,right:"auto",bottom:"auto"},covered:R.tag}}function z(){return e.jsx($,{children:S&&e.jsxs(b.div,{ref:o,className:"ss-map-card",style:A?.style,variants:Oe,initial:"hidden",animate:"show",exit:{opacity:0,transition:{duration:.16}},children:[e.jsx("img",{src:S.src,alt:S.name,decoding:"async"}),e.jsxs("div",{className:"ss-map-card-body",children:[e.jsx("span",{className:"ss-map-card-name",children:S.name}),e.jsx("p",{children:S.line})]})]},S.id)})}}function Y({id:t,label:o,className:s,stagger:l,children:n}){const a=l?{hidden:{},show:{transition:{staggerChildren:.04,delayChildren:0}}}:Ie;return e.jsx(b.section,{className:`ss-slide ss-snap${s?" "+s:""}`,"data-slide":t,"data-label":o,variants:a,initial:"hidden",whileInView:"show",viewport:{amount:.2,once:!0},children:e.jsx("div",{className:"ss-slide-inner",children:n})})}function Fe(t){const[o,s]=d.useState(k?1:0);return d.useEffect(()=>{if(k)return;const l=t.current;if(!l)return;const n=l.closest(".ss-home-scroll");let a=0;const h=()=>{a=0;const r=window.innerHeight||1,i=l.getBoundingClientRect(),u=(r-i.top)/Math.max(1,i.height*.75);s(u<0?0:u>1?1:u)},p=()=>{a||(a=requestAnimationFrame(h))};return(n||window).addEventListener("scroll",p,{passive:!0}),window.addEventListener("resize",p),h(),()=>{a&&cancelAnimationFrame(a),(n||window).removeEventListener("scroll",p),window.removeEventListener("resize",p)}},[t]),o}function Me({text:t,p:o}){const s=t.split(" "),l=s.length;return e.jsx(e.Fragment,{children:s.map((n,a)=>{const h=a/l*.82,p=Math.min(1,Math.max(0,(o-h)/.2));return e.jsxs("span",{style:{color:`rgba(245,242,237,${(.22+.56*p).toFixed(3)})`,transition:"color .12s linear"},children:[n,a<l-1?" ":""]},n+a)})})}function ne({kicker:t,body:o,pair:s,children:l}){const n=e.jsx(X,{className:"ss-story-kicker",text:t,variant:le,stagger:.055}),a=d.useRef(null),h=Fe(a),p=e.jsx(Me,{text:o,p:h});return s?e.jsxs("div",{className:"ss-chapter-head",children:[e.jsx("div",{children:n}),e.jsx("div",{className:"ss-chapter-body",ref:a,children:p})]}):e.jsxs("div",{className:"ss-chapter-stack",children:[n,e.jsx("div",{className:"ss-chapter-body",ref:a,children:p}),l]})}function We({scrollRef:t}){const[o,s]=d.useState([]),[l,n]=d.useState(0),a=d.useRef([]);d.useEffect(()=>{const r=t.current;if(!r)return;const i=Array.from(r.querySelectorAll("[data-slide]"));a.current=i,s(i.map(m=>({id:m.dataset.slide||"",label:m.dataset.label||""})));const u=new IntersectionObserver(m=>{for(const g of m)if(g.isIntersecting){const T=a.current.indexOf(g.target);T>=0&&n(T)}},{root:null,rootMargin:"-48% 0px -48% 0px",threshold:0});return i.forEach(m=>u.observe(m)),()=>u.disconnect()},[t]);const h=r=>{const i=t.current,u=a.current[r];!i||!u||i.scrollTo({top:i.scrollTop+u.getBoundingClientRect().top-i.getBoundingClientRect().top,behavior:k?"auto":"smooth"})};if(o.length<2)return null;const p=l>0;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`ss-deck-rail${p?" on":""}`,"aria-hidden":!p,children:o.map((r,i)=>e.jsx("button",{type:"button",className:`ss-deck-tick${i===l?" on":""}`,onClick:()=>h(i),"aria-label":r.label,"aria-current":i===l,style:{cursor:"none"},children:e.jsx("span",{className:"ss-deck-tip",children:r.label})},r.id))}),e.jsxs("div",{className:`ss-deck-count${p?" on":""}`,children:[e.jsx("b",{children:String(l+1).padStart(2,"0")})," / ",String(o.length).padStart(2,"0")]})]})}function Ge({base:t,emit:o}){const s=d.useRef(null),l=d.useRef({base:t,emit:o});return d.useEffect(()=>{l.current={base:t,emit:o}},[t,o]),d.useEffect(()=>{const n=s.current;if(!n)return;const a=n.getContext("2d");if(!a)return;const h=Math.min(window.devicePixelRatio||1,2);let p=0,r=0,i=0,u=performance.now();const m=()=>{p=n.clientWidth,r=n.clientHeight,n.width=Math.max(1,Math.floor(p*h)),n.height=Math.max(1,Math.floor(r*h)),a.setTransform(h,0,0,h,0,0)};m(),window.addEventListener("resize",m);const g=Array.from({length:12},()=>({x:Math.random(),y:Math.random(),r:110+Math.random()*280,vx:(Math.random()-.5)*.024,vy:(Math.random()-.5)*.024,ph:Math.random()*Math.PI*2,sp:.07+Math.random()*.12,a:.14+Math.random()*.12})),T=j=>{const v=j.replace("#",""),c=parseInt(v.length===3?v.split("").map(f=>f+f).join(""):v,16);return{r:c>>16&255,g:c>>8&255,b:c&255}},S=j=>{const v=j.split(",").map(Number);return{r:v[0],g:v[1],b:v[2]}},A=T(t),I=S(o),z=j=>{const v=Math.min(.05,(j-u)/1e3);u=j;const c=T(l.current.base),f=S(l.current.emit),y=Math.min(1,v*1.3);A.r+=(c.r-A.r)*y,A.g+=(c.g-A.g)*y,A.b+=(c.b-A.b)*y,I.r+=(f.r-I.r)*y,I.g+=(f.g-I.g)*y,I.b+=(f.b-I.b)*y,a.fillStyle=`rgb(${A.r|0},${A.g|0},${A.b|0})`,a.fillRect(0,0,p,r);const N=I.r|0,E=I.g|0,H=I.b|0;for(const x of g){x.x+=x.vx*v,x.y+=x.vy*v,x.ph+=x.sp*v,x.x<-.2&&(x.x=1.2),x.x>1.2&&(x.x=-.2),x.y<-.2&&(x.y=1.2),x.y>1.2&&(x.y=-.2);const B=(x.x+Math.sin(x.ph)*.02)*p,P=(x.y+Math.cos(x.ph*.8)*.02)*r,R=a.createRadialGradient(B,P,0,B,P,x.r);R.addColorStop(0,`rgba(${N},${E},${H},${x.a})`),R.addColorStop(1,`rgba(${N},${E},${H},0)`),a.fillStyle=R,a.beginPath(),a.arc(B,P,x.r,0,Math.PI*2),a.fill()}i=requestAnimationFrame(z)},w=()=>{cancelAnimationFrame(i),document.hidden||(u=performance.now(),i=requestAnimationFrame(z))};return w(),document.addEventListener("visibilitychange",w),()=>{cancelAnimationFrame(i),window.removeEventListener("resize",m),document.removeEventListener("visibilitychange",w)}},[]),e.jsx("canvas",{ref:s,"aria-hidden":!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",display:"block",zIndex:0}})}function Ue({onCardClick:t}){const o=_(),[s,l]=d.useState({width:window.innerWidth,height:window.innerHeight}),n=s.width>=1024;d.useEffect(()=>{const c=()=>{l({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]);const[a,h]=d.useState(0),p=O.length,r=d.useRef(0),i=d.useRef(!1),u=c=>h(f=>(f+c+p)%p),m=s.width<=640,g=n?380:Math.min(s.width*.7,330),T=Math.min(g*1.32,Math.max(290,s.height*.5)),S=g*(n?1.12:.7),A={"creative-projects":{base:"#030b05",emit:"65,119,86"},"professional-services":{base:"#ffffff",emit:"150,152,158"},nabu:{base:"#0d1015",emit:"84,168,255"}},I=O[a]?.id,z=I==="professional-services",w=z?"#14110b":"var(--white)",j=z?"0 1px 12px rgba(255,255,255,.6)":"0 1px 14px rgba(0,0,0,.6)",v=A[I]||A["creative-projects"];return e.jsx(b.div,{...J,className:"ss-work-page",style:{position:"absolute",inset:0,overflowX:"hidden",overflowY:"auto",background:"#0c0d0f"},children:e.jsxs("div",{className:"ss-work-layout",style:{position:"relative",minHeight:"max(730px, 100dvh)",overflow:"hidden"},children:[k?e.jsx("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,background:v.base}}):e.jsx(Ge,{base:v.base,emit:v.emit}),e.jsx("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,pointerEvents:"none",opacity:.03,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wn)'/%3E%3C/svg%3E")`,backgroundSize:"180px"}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,padding:"115px 5vw 0",zIndex:10,maxWidth:780},children:e.jsx(b.h2,{initial:k?!1:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.34,delay:.04,ease:C},style:{fontSize:"clamp(38px,5vw,64px)",letterSpacing:"-0.02em",fontWeight:700,lineHeight:1,color:w,textShadow:j,transition:"color 0.7s ease"},children:"Work"})}),e.jsx("div",{style:{position:"absolute",left:0,right:0,top:220,bottom:65,display:"flex",alignItems:"center",justifyContent:"center",perspective:1800,touchAction:"pan-y",userSelect:"none"},onPointerDown:c=>{r.current=c.clientX,i.current=!1},onPointerMove:c=>{Math.abs(c.clientX-r.current)>8&&(i.current=!0)},onPointerUp:c=>{const f=c.clientX-r.current;f<-48?u(1):f>48&&u(-1)},children:O.map((c,f)=>{const y=(f-a+p)%p,N=y===0?{x:0,scale:1,rotateY:0,opacity:1,z:3}:y===1?{x:S,scale:.82,rotateY:-14,opacity:1,z:2}:{x:-S,scale:.82,rotateY:14,opacity:1,z:2};return c.id==="nabu"?e.jsxs(b.div,{role:"button",tabIndex:0,"aria-label":`${y===0?"Open":"Select"} ${c.title}`,onKeyDown:E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),y===0?t(c):h(f))},animate:{x:N.x,scale:N.scale,rotateY:N.rotateY,opacity:N.opacity},transition:{duration:k?0:.45,ease:C},onClick:()=>{i.current||(y===0?t(c):h(f))},...o,style:{position:"absolute",width:g,height:T,zIndex:N.z,cursor:"none",transformStyle:"preserve-3d",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("img",{src:c.img,alt:c.title,style:{width:"100%",height:"78%",objectFit:"contain",objectPosition:"center",display:"block",pointerEvents:"none",filter:y===0?"drop-shadow(0 26px 55px rgba(0,0,0,.55))":"none",transition:"filter .5s ease"}}),e.jsxs("div",{style:{textAlign:"center",marginTop:14,pointerEvents:"none"},children:[e.jsx("div",{style:{fontSize:24,letterSpacing:-.3,color:w,lineHeight:1.05,fontWeight:600,transition:"color 0.7s ease"},children:c.title}),e.jsx("div",{style:{fontSize:12,letterSpacing:1.5,color:"var(--sky)",textTransform:"uppercase",fontWeight:500,marginTop:7},children:c.tag})]})]},c.id):e.jsxs(b.div,{role:"button",tabIndex:0,"aria-label":`${y===0?"Open":"Select"} ${c.title}`,onKeyDown:E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),y===0?t(c):h(f))},className:"ss-card",animate:{x:N.x,scale:N.scale,rotateY:N.rotateY,opacity:N.opacity},transition:{duration:k?0:.45,ease:C},onClick:()=>{i.current||(y===0?t(c):h(f))},...o,style:{position:"absolute",width:g,height:T,zIndex:N.z,borderRadius:22,overflow:"hidden",background:"#111",cursor:"none",boxShadow:y===0?"0 40px 90px rgba(0,0,0,.6)":"0 20px 50px rgba(0,0,0,.5)",transformStyle:"preserve-3d"},children:[e.jsx("img",{src:c.img,alt:c.title,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:c.objectPosition||"center",display:"block",pointerEvents:"none",filter:"brightness(0.95)",transition:"filter .5s ease"}}),e.jsxs("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(6,6,6,.92) 0%, rgba(6,6,6,.4) 42%, rgba(6,6,6,0) 78%)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"24px 22px",pointerEvents:"none"},children:[e.jsx("div",{style:{fontSize:12,letterSpacing:1.5,color:"var(--sky)",textTransform:"uppercase",fontWeight:500,marginBottom:6},children:c.tag}),e.jsxs("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:10},children:[e.jsx("div",{style:{fontSize:24,letterSpacing:-.3,color:"var(--white)",lineHeight:1.05,fontWeight:600},children:c.title}),y===0&&e.jsx("span",{style:{fontSize:13,color:"var(--white)",whiteSpace:"nowrap",fontWeight:500},children:"View →"})]})]})]},c.id)})}),e.jsxs("div",{className:"ss-work-controls",style:{position:"absolute",bottom:m?20:28,left:0,right:0,display:"flex",justifyContent:"center",alignItems:"center",gap:8,zIndex:20},children:[e.jsx("button",{type:"button","aria-label":"Previous category",onClick:()=>u(-1),style:{color:w,width:44,height:44},children:"←"}),O.map((c,f)=>e.jsx("button",{type:"button","aria-label":`Show ${c.title}`,"aria-pressed":f===a,onClick:()=>h(f),style:{width:44,height:44,display:"grid",placeItems:"center"},children:e.jsx("span",{style:{display:"block",width:f===a?26:8,height:8,borderRadius:980,background:f===a?"#38bdf8":z?"#777":"#aaa",transition:"width .3s ease"}})},c.id)),e.jsx("button",{type:"button","aria-label":"Next category",onClick:()=>u(1),style:{color:w,width:44,height:44},children:"→"})]})]})},"work")}function Ve(){const t=_(),o=[{href:"mailto:shyon2001@gmail.com",label:"Email Me",value:"shyon2001@gmail.com",icon:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:e.jsx("path",{d:"M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1"})})},{href:"https://www.linkedin.com/in/shyonshiri/",label:"LinkedIn",value:"in/shyonshiri",target:"_blank",icon:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"})})},{href:"/My Resume.pdf",label:"Resume",value:"My Resume.pdf",target:"_blank",icon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[e.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]})}];return e.jsxs(b.div,{...J,className:"ss-contact-page",style:{position:"absolute",inset:0,background:"#060606",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden"},children:[e.jsxs("div",{"aria-hidden":"true",style:{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"},children:[e.jsx("div",{style:{position:"absolute",left:-30,bottom:"-12vh",fontFamily:"var(--sf)",fontSize:"clamp(220px, 34vw, 460px)",lineHeight:.8,letterSpacing:6,color:"rgba(245,242,237,.05)",whiteSpace:"nowrap",filter:"blur(9px)",zIndex:1,userSelect:"none",pointerEvents:"none"},children:"CONTACT"}),e.jsx("div",{style:{position:"absolute",right:"-12vw",top:"-22vh",width:"min(900px, 100vw)",height:"min(900px, 100vw)",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,.35) 0%, rgba(56,189,248,0) 65%)",filter:"blur(65px)",zIndex:1,pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",left:"-15vw",bottom:"-25vh",width:"min(1100px, 120vw)",height:"min(1100px, 120vw)",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,.15) 0%, rgba(56,189,248,0) 60%)",filter:"blur(75px)",zIndex:1,pointerEvents:"none"}})]}),e.jsxs("div",{className:"ss-contact-content",style:{position:"relative",zIndex:10,width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:window.innerWidth<=640?20:40,flexWrap:"wrap",marginBottom:window.innerWidth<=640?24:44},children:[e.jsx("div",{children:e.jsxs(b.h2,{initial:k?!1:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.34,delay:.04,ease:C},className:"ss-contact-heading",style:{fontFamily:"var(--sf)",fontSize:"clamp(46px,6.2vw,96px)",fontWeight:700,letterSpacing:"-0.038em",lineHeight:1.02,color:"var(--white)"},children:["Get in touch",e.jsx("span",{style:{color:"var(--white)"},children:"."})]})}),e.jsx(b.p,{initial:k?!1:{opacity:0},animate:{opacity:1},transition:{duration:.34,delay:.04},className:"ss-contact-description",style:{fontFamily:"var(--sf)",fontWeight:400,fontSize:"clamp(15px,1.5vw,18px)",lineHeight:1.5,letterSpacing:"-0.005em",color:"var(--mid)",maxWidth:300,textAlign:"right",marginBottom:8},children:"Open to freelance, collaborations & full-time roles."})]}),e.jsx(b.div,{initial:k?!1:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.34,delay:.04,ease:C},style:{display:"flex",flexDirection:"column",borderTop:"1px solid rgba(245,242,237,.14)"},children:o.map(s=>e.jsxs("a",{className:"ss-contact-entry",href:s.href,target:s.target,rel:s.target?"noopener noreferrer":void 0,style:{display:"flex",alignItems:"center",gap:window.innerWidth<=640?16:28,padding:window.innerWidth<=640?"16px 8px":"26px 8px",textDecoration:"none",borderBottom:"1px solid rgba(245,242,237,.14)",transition:"background 0.3s ease, padding-left 0.3s ease",cursor:"none"},...t,children:[e.jsx("span",{style:{fontFamily:"var(--sf)",fontSize:window.innerWidth<=640?"clamp(15px,2.4vw,21px)":"clamp(21px,2.8vw,30px)",fontWeight:600,letterSpacing:"-0.02em",color:"var(--white)",width:window.innerWidth<=640?"auto":240,flexShrink:0},children:s.label}),e.jsx("span",{style:{fontFamily:"var(--sf)",fontSize:window.innerWidth<=640?13.5:17,fontWeight:400,letterSpacing:"-0.005em",color:"var(--mid)",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:s.value}),e.jsx("span",{style:{fontFamily:"var(--sf)",fontSize:17,color:"var(--sky)",flexShrink:0},children:"→"})]},s.label))})]})]},"contact")}function Ye({project:t,onClose:o,onMediaClick:s}){const l=_(),n=d.useRef(null);d.useEffect(()=>{const r=document.activeElement,i=n.current;i?.querySelector("button")?.focus({preventScroll:!0});const u=m=>{if(m.key!=="Tab"||!i)return;const g=Array.from(i.querySelectorAll('button, a[href], video[controls], [tabindex="0"]')).filter(A=>A.getClientRects().length>0),T=g[0],S=g[g.length-1];m.shiftKey&&document.activeElement===T?(m.preventDefault(),S?.focus()):!m.shiftKey&&document.activeElement===S&&(m.preventDefault(),T?.focus())};return i?.addEventListener("keydown",u),()=>{i?.removeEventListener("keydown",u),r?.isConnected&&r.focus({preventScroll:!0})}},[]);const[a,h]=d.useState(window.innerWidth),p=a>=1024;return d.useEffect(()=>(document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}),[]),d.useEffect(()=>{const r=()=>{h(window.innerWidth)};return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]),e.jsx(b.div,{ref:n,role:"dialog","aria-modal":"true","aria-label":t.title,initial:{opacity:0},animate:{opacity:1,pointerEvents:"auto"},exit:{opacity:0,pointerEvents:"none"},transition:{duration:k?.001:.4},onClick:o,style:{position:"fixed",inset:0,zIndex:11e3,background:"rgba(6,6,6,.93)",backdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(b.div,{initial:{opacity:0,scale:k?1:.96},animate:{opacity:1,scale:1},exit:{opacity:0,scale:k?1:.96},transition:{duration:k?.001:.4,ease:C},onClick:r=>r.stopPropagation(),className:"ss-work-modal",style:{position:"relative",width:"76vw",maxWidth:1080,maxHeight:"80dvh",display:"flex",flexDirection:"column"},children:[e.jsx("button",{onClick:o,className:"ss-modal-close","aria-label":"Close project gallery",style:{position:"absolute",top:60,right:20,background:"none",border:"none",cursor:"none",fontFamily:"var(--sf)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--mid)",transition:"color 0.3s ease",padding:"4px 8px",zIndex:2001},...l,children:"✕ Close"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",paddingBottom:18,borderBottom:"1px solid rgba(245,242,237,.1)",marginBottom:22},children:e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:"clamp(36px,4.4vw,64px)",letterSpacing:"-0.02em",fontWeight:700,lineHeight:1,color:"var(--white)"},children:t.title}),e.jsx("div",{style:{fontFamily:"var(--sf)",fontSize:15,fontWeight:400,lineHeight:1.5,letterSpacing:"-0.005em",color:"var(--sky)",marginTop:10},children:t.id==="creative-projects"?"Personal projects in 3D, photography, electronics, and physical materials.":t.id==="professional-services"?"Websites, identities, and print work made for clients.":t.id==="nabu"?"Design and creative direction for NABU, a streetwear brand that draws from Persian and Assyrian heritage.":""})]})}),["creative-projects","professional-services"].includes(t.id)?e.jsxs("div",{style:{position:"relative",flex:1,minHeight:0,display:"flex",flexDirection:"column"},children:[e.jsx("div",{className:"ss-scroll",style:{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden",paddingRight:8,display:"flex",gap:14,alignItems:"flex-start"},children:(()=>{const r=t.media.filter(m=>!m.hidden),i=a<=640?2:a<=1023?3:4,u=Array.from({length:i},()=>[]);return r.forEach((m,g)=>u[g%i].push(m)),u.map((m,g)=>e.jsx("div",{style:{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:14},children:m.map((T,S)=>e.jsx($e,{item:T,onClick:()=>s(T)},S))},g))})()}),e.jsx("div",{className:"ss-scroll-fade"})]}):e.jsx("div",{className:"ss-modal-grid",style:{display:"grid",gridTemplateColumns:t.id==="3d-rendering"?"repeat(3, 240px)":t.id==="fabrication"?"repeat(1, 420px)":["3d-modelling","programming"].includes(t.id)?"repeat(2, 300px)":"repeat(4, 220px)",gap:38,overflowY:"auto",overflowX:"hidden",maxHeight:"calc(80dvh - 150px)",paddingRight:8,justifyContent:"center",gridAutoRows:"max-content"},children:t.media.filter(r=>!r.hidden).map((r,i)=>e.jsx(Xe,{item:r,onClick:()=>s(r)},i))}),!p&&e.jsx("div",{style:{marginTop:24,textAlign:"center",fontFamily:"var(--sf)",fontSize:10,letterSpacing:1,color:"var(--mid)",textTransform:"uppercase"},children:"Scroll to browse"})]})})}function $e({item:t,onClick:o}){const s=_(),l=t.aspectRatio||"4/3";return e.jsxs("button",{type:"button","aria-label":`View ${t.title}`,className:"ss-scell",onClick:o,...s,children:[e.jsxs("div",{className:"ss-sthumb",style:{aspectRatio:l},children:[e.jsx("img",{src:t.type==="video"?t.poster:t.src,alt:t.title,loading:"lazy"}),t.type==="video"&&e.jsx("div",{style:{position:"absolute",top:12,right:12,width:34,height:34,borderRadius:"50%",background:"rgba(6,6,6,.5)",border:"1px solid rgba(245,242,237,.35)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)"},children:e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"var(--white)",style:{marginLeft:2},children:e.jsx("path",{d:"M8 5v14l11-7z"})})})]}),e.jsxs("div",{className:"ss-sbody",children:[e.jsx("div",{className:"ss-asset-title",style:{fontSize:13,fontWeight:600,color:"var(--white)",lineHeight:1.25},children:t.title}),e.jsx("div",{style:{fontFamily:"var(--sf)",fontSize:11,fontWeight:500,fontVariantNumeric:"tabular-nums",color:"var(--mid)",marginTop:4},children:t.year})]})]})}function Xe({item:t,onClick:o}){const s=_();return e.jsxs("button",{type:"button","aria-label":`View ${t.title}`,className:"ss-tile",onClick:o,style:{position:"relative",overflow:"hidden",background:"#111",minHeight:t.type==="video"?"250px":"auto",cursor:"none",borderRadius:12,aspectRatio:t.aspectRatio?t.aspectRatio:void 0},...s,children:[t.type==="video"?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:t.poster,alt:t.title,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(6,6,6,.3)",transition:"background 0.3s ease"},children:e.jsx("div",{style:{width:52,height:52,borderRadius:"50%",border:"1.5px solid rgba(245,242,237,.7)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.3s ease, border-color 0.3s ease"},children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"var(--white)",style:{marginLeft:3},children:e.jsx("path",{d:"M8 5v14l11-7z"})})})})]}):e.jsx("img",{src:t.src,alt:t.title,loading:"lazy",style:{width:"100%",height:"100%",objectFit:t.aspectRatio?"cover":"contain"}}),e.jsxs("div",{style:{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 14px",background:"linear-gradient(to top, rgba(6,6,6,.85) 0%, transparent 100%)",opacity:0,transition:"opacity 0.3s ease"},className:"ss-tile-info",children:[e.jsx("div",{className:"ss-asset-title",style:{fontSize:14,color:"var(--white)",fontWeight:600},children:t.title}),e.jsx("div",{style:{fontFamily:"var(--sf)",fontSize:11,fontWeight:500,fontVariantNumeric:"tabular-nums",color:"var(--sky)",marginTop:2},children:t.year})]})]})}function qe({item:t,onClose:o,onItemClick:s}){const l=_(),n=d.useRef(null);d.useEffect(()=>{const h=document.activeElement,p=n.current;p?.querySelector("button")?.focus({preventScroll:!0});const r=i=>{if(i.key!=="Tab"||!p)return;const u=Array.from(p.querySelectorAll('button, a[href], video[controls], [tabindex="0"]')).filter(T=>T.getClientRects().length>0),m=u[0],g=u[u.length-1];i.shiftKey&&document.activeElement===m?(i.preventDefault(),g?.focus()):!i.shiftKey&&document.activeElement===g&&(i.preventDefault(),m?.focus())};return p?.addEventListener("keydown",r),()=>{p?.removeEventListener("keydown",r),h?.isConnected&&h.focus({preventScroll:!0})}},[]);const a=t;return e.jsx(b.div,{ref:n,role:"dialog","aria-modal":"true","aria-labelledby":"ss-viewer-title",initial:{opacity:0},animate:{opacity:1,pointerEvents:"auto"},exit:{opacity:0,pointerEvents:"none"},transition:{duration:k?.001:.25},onClick:o,style:{position:"fixed",inset:0,zIndex:12e3,background:"rgba(6,6,6,.97)",backdropFilter:"blur(30px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(b.div,{initial:{opacity:0,scale:k?1:.985},animate:{opacity:1,scale:1},exit:{opacity:0,scale:1},transition:{duration:k?.001:.25,ease:C},onClick:h=>h.stopPropagation(),className:"ss-media-viewer",style:{position:"relative",maxWidth:"92vw",maxHeight:"88dvh",display:"flex",alignItems:"flex-start",gap:48},children:[e.jsx("button",{onClick:o,className:"ss-media-viewer-close",style:{position:"absolute",top:100,right:20,background:"none",border:"none",cursor:"none",fontFamily:"var(--sf)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--mid)",transition:"color 0.3s ease",padding:"4px 8px",zIndex:3001},...l,children:"✕ Close"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:16,flexShrink:0},children:e.jsx("div",{style:{width:"60vw",height:"80dvh",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",borderRadius:20,flexShrink:0,backgroundColor:a.removeBackground?"transparent":"inherit",position:"relative"},children:a.type==="video"?e.jsx("video",{src:a.src,poster:a.poster,controls:!0,autoPlay:!0,muted:!0,playsInline:!0,style:{width:"100%",height:"100%",objectFit:"contain",maxWidth:"100%",maxHeight:"100%",display:"block"}},a.src):e.jsx("img",{src:a.src,alt:a.title,style:{width:"100%",height:"100%",objectFit:"contain",transform:a.scale?`scale(${a.scale})`:"scale(1)"}},a.src)})}),e.jsxs("div",{style:{flex:1,minWidth:200,maxWidth:340,paddingTop:140},children:[e.jsx("div",{id:"ss-viewer-title",className:"ss-asset-title",style:{fontSize:64,letterSpacing:.5,lineHeight:1.02,color:"var(--white)",marginBottom:24,fontWeight:600},children:t.title}),e.jsx("div",{style:{fontFamily:"var(--sf)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",color:"var(--sky)",textTransform:"uppercase",marginBottom:20},children:t.year}),t.desc&&e.jsx("p",{style:{fontFamily:"var(--sf)",fontSize:16,lineHeight:1.55,letterSpacing:"-0.005em",color:"rgba(245,242,237,.75)",fontWeight:400,marginBottom:32},children:t.desc}),t.relatedItems&&t.relatedItems.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:48},children:t.relatedItems.map((h,p)=>e.jsxs("button",{onClick:()=>{const r=O.flatMap(i=>i.media).find(i=>i.title===h);r&&s&&s(r)},style:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--sf)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--sky)",background:"none",border:"none",borderBottom:"1px solid var(--sky)",paddingBottom:2,cursor:"none",textDecoration:"none",textAlign:"left"},...l,children:["View ",h," →"]},p))}):null,t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,marginTop:28,fontFamily:"var(--sf)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--sky)",textDecoration:"none",borderBottom:"1px solid var(--sky)",paddingBottom:2,cursor:"none"},...l,children:"Visit Website →"})]})]})})}ue.createRoot(document.getElementById("root")).render(e.jsx(d.StrictMode,{children:e.jsx(ke,{})}));
