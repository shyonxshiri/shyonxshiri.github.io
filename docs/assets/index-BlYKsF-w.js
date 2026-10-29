import{r as we,a as r,j as e,A as Z,u as me,m as j,b as ye,c as ie,d as xe}from"./vendor-DeZ2j9FL.js";(function(){const h=document.createElement("link").relList;if(h&&h.supports&&h.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const m of i.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();var J={},oe;function ve(){if(oe)return J;oe=1;var t=we();return J.createRoot=t.createRoot,J.hydrateRoot=t.hydrateRoot,J}var ke=ve();function Se({realmSupported:t,onViewOverview:h}){const s=r.useRef(null),[l,n]=r.useState(!1),i=()=>{const m=s.current;m&&(n(!0),m.focus(),m.play().catch(()=>m.focus()))};return r.useEffect(()=>{const m=s.current;if(!m)return;const g=new IntersectionObserver(([p])=>{p.isIntersecting||m.pause()}),f=()=>{document.hidden&&m.pause()};return g.observe(m),document.addEventListener("visibilitychange",f),()=>{g.disconnect(),document.removeEventListener("visibilitychange",f)}},[]),e.jsxs("section",{className:"ss-about-view","aria-labelledby":"ss-bio-heading",children:[e.jsxs("div",{className:"ss-about-hero",children:[e.jsx("figure",{className:"ss-about-photo",children:e.jsx("img",{src:"/assets/Shyon_Studio_3298.jpg",srcSet:"/assets/Shyon_Studio_1000.jpg 662w, /assets/Shyon_Studio_1800.jpg 1192w, /assets/Shyon_Studio_3298.jpg 2184w",sizes:"(max-width: 640px) 100vw, (max-width: 900px) max(48vw, 464px), max(50vw, 47.7vh, 477px)",width:"2184",height:"3298",alt:"Shyon Shiri seated in a black jacket against a studio backdrop",decoding:"async"})}),e.jsxs("div",{className:"ss-about-intro",children:[e.jsx("h2",{id:"ss-bio-heading",children:"About Me."}),e.jsx("p",{className:"ss-about-lead",children:"I am a Graphic Designer and Developer."}),e.jsx("div",{className:"ss-about-description",children:e.jsx("p",{children:"My work combines visual design with hands-on development and fabrication. I take projects from the first sketches through prototyping, testing, and production."})}),e.jsxs("p",{className:"ss-about-education",children:["BA in Graphic Design",e.jsx("br",{}),"San Jose State University, 2025"]})]})]}),e.jsxs("section",{className:"ss-about-film","aria-labelledby":"ss-film-heading",children:[e.jsx("header",{className:"ss-about-film-heading",children:e.jsxs("h3",{id:"ss-film-heading",children:[e.jsx("span",{children:"My First"})," ",e.jsx("span",{children:"Creative Outlet"})]})}),e.jsxs("div",{className:"ss-about-film-stage",children:[e.jsx("div",{className:"ss-about-film-meta",children:e.jsx("time",{dateTime:"2013-10-15",children:"October 15, 2013"})}),e.jsxs("figure",{className:"ss-about-film-player",children:[e.jsxs("video",{ref:s,controls:l,tabIndex:l?0:-1,playsInline:!0,preload:"none",width:"1920",height:"1080",poster:"/assets/my-first-lego-movie.jpg","aria-labelledby":"ss-film-heading",children:[e.jsx("source",{src:"/assets/my-first-lego-movie.mp4",type:"video/mp4"}),e.jsx("a",{href:"/assets/my-first-lego-movie.mp4",children:"Watch My First LEGO Film"})]}),!l&&e.jsxs("button",{className:"ss-about-film-play",type:"button",onClick:i,"aria-label":"Play LEGO stop-motion film",children:[e.jsx("svg",{viewBox:"0 0 24 24",width:"20",height:"20","aria-hidden":"true",children:e.jsx("path",{d:"M8 5v14l11-7z",fill:"currentColor"})}),e.jsx("span",{children:"Play Film"})]})]})]}),e.jsxs("div",{className:"ss-about-film-note",children:[e.jsx("p",{children:"This LEGO stop-motion film was the starting point for the work I do today. It sparked my interest in design and technology and encouraged me to explore other creative disciplines. The interactive LEGO portfolio on this site builds on that foundation, bringing together the skills I’ve developed since."}),t?e.jsx("a",{className:"ss-about-film-link",href:"/lego.html",children:"View My LEGO Portfolio"}):e.jsx("button",{className:"ss-about-film-link",type:"button",onClick:h,children:"View My LEGO Portfolio"})]})]})]})}function K(t){return t.replace(/^\/assets\//,"").replace(/\.[^.]+$/,"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}function ne(t,h){const[s,l,n]=t.replace(/^#\/?/,"").split("/");if(s!=="work")return{page:s==="about"||s==="contact"?s:"home"};const i=h.find(g=>g.id===l);if(!i)return{page:"work"};const m=i.media.find(g=>K(g.src)===n);return{page:"work",projectId:i.id,...m?{mediaId:K(m.src)}:{}}}function re(t){return t.page!=="work"||!t.projectId?`#${t.page}`:`#work/${t.projectId}${t.mediaId?`/${t.mediaId}`:""}`}const M=[{id:"creative-projects",title:"Selected Works",tag:"Design, 3D & Craft",img:"/assets/Airpod_Case.JPG",size:"tall",objectPosition:"center",media:[{type:"video",src:"/assets/Porsche_GT3_RS.mp4",poster:"/assets/Porsche_GT3_RS.jpg",title:"Car Animation",credit:"Independent Project · Blender",year:2022,desc:"An independent automotive animation created in Blender in 2022. I assembled the scene and developed the environment layout, animation, rendering, color grading, and compositing to bring a Porsche GT3 RS into an urban street sequence. The car and city models were sourced from free third-party asset libraries; scene assembly and animation production were completed independently.",aspectRatio:"16/9"},{type:"image",src:"/assets/resume-design/business-card-mockup.jpg",title:"Résumé Design",credit:"SJSU · DSGD 83 · Digital Applications: Basics",year:2022,aspectRatio:"2092/1392",desc:"A unique résumé and coordinating business card designed from scratch, with a consistent visual identity across both pieces. A Photoshop mockup presents the cards in a realistic setting.",pages:["/assets/resume-design/resume.png","/assets/resume-design/business-card-front.png","/assets/resume-design/business-card-back.png","/assets/resume-design/business-card-mockup.jpg"],pageLabels:["Résumé","Business Card, Front","Business Card, Back","Business Card Mockup"]},{type:"image",src:"/assets/procrastination-booklet/page-01.png",title:"Procrastination Booklet",credit:"SJSU · DSGD 83 · Digital Applications: Basics",year:2022,aspectRatio:"1786/2200",desc:"A final project for my 2022 DSGD course at SJSU. I drew and developed the entire booklet from scratch in Adobe Illustrator, combining original illustrations, typography, and page layouts.",pages:Array.from({length:10},(t,h)=>`/assets/procrastination-booklet/page-${String(h+1).padStart(2,"0")}.png`)},{type:"image",src:"/assets/Beta_Theta_Pi_Rush.svg",title:"Rush Event Illustration",credit:"Independent project · Beta Theta Pi",year:2023,desc:"An illustration drawn from scratch for a Beta Theta Pi rush event in 2023, using the Lyrical Lemonade logo as a visual reference.",aspectRatio:"364/556"},{type:"image",src:"/assets/Cow_Abduction_1.jpg",title:"Cow Abduction",credit:"SJSU · ART 102 · 3D Modeling and Printing",year:2024,desc:"A Blender scene of a cow suspended beneath a flying saucer, created as an opening exercise to demonstrate my existing 3D skills. The project established a baseline in modeling, composition, and lighting for the studies that followed.",aspectRatio:"1/1",pages:["/assets/Cow_Abduction_1.jpg","/assets/Cow_Abduction_2.jpg","/assets/Cow_Abduction_3.jpg"],pageLabels:["Three-Quarter View","Overhead View","Front View"],relatedItems:["Character Design","The Broken NPC"]},{type:"video",src:"/assets/Broken_NPC.MP4",poster:"/assets/Broken_NPC.jpg",title:"The Broken NPC",credit:"SJSU · ART 102 · 3D Modeling and Printing",year:2024,desc:"A final Blender animation depicting in-game rendering errors from GTA San Andreas. The project brings together the modeling foundations demonstrated in Cow Abduction, the detailed sculpting developed through Venom, and the camera animation and rendering explored in BMW Street Render.",aspectRatio:"16/9",relatedItems:["Cow Abduction","Character Design","BMW Street Render"]},{type:"video",src:"/assets/Blender_Case_Video.mp4",poster:"/assets/Blender_Case.jpg",title:"Apple Accessory Concepts",credit:"SJSU · ART 102 · 3D Modeling and Printing",year:2024,desc:"Concept designs for Apple accessory cases, modeled and rendered in Blender.",aspectRatio:"16/9",relatedItems:["AirPods Max, In Blender","Phone and AirPods, In Blender","AirPods Case Concept","Phone Case Concept"]},{type:"image",src:"/assets/AirPods_Max_In_Blender.jpg",title:"AirPods Max, In Blender",credit:"SJSU · ART 102 · 3D Modeling and Printing",year:2024,desc:"A photo I took of the AirPods Max accessory concept in Blender after designing it. The viewport shows the sculptural shell fitted around the ear cup.",aspectRatio:"3/4",hidden:!0,relatedItems:["Apple Accessory Concepts","Phone and AirPods, In Blender"]},{type:"image",src:"/assets/Apple_Accessories_In_Blender.jpg",title:"Phone and AirPods, In Blender",credit:"SJSU · ART 102 · 3D Modeling and Printing",year:2024,desc:"A classroom photo I took of the phone and AirPods accessory concepts in Blender after designing them. It documents the digital models in my workspace.",aspectRatio:"3/4",hidden:!0,relatedItems:["Apple Accessory Concepts","AirPods Max, In Blender"]},{type:"video",src:"/assets/Masking_And_Color_Grading.mp4",poster:"/assets/Masking_And_Color_Grading.jpg",title:"Masking and Color Grading Study",credit:"SJSU · ART 105 · Advanced Digital Video",year:2024,desc:"A compositing study combining three separate performances into one scene through masking and color grading in Adobe Premiere Pro and After Effects.",aspectRatio:"16/9"},{type:"video",src:"/assets/Shiri_Video_Game.mp4",poster:"/assets/Shiri_VIdeo_Game.jpg",title:"Video Game Demo",credit:"SJSU · ART 105 · Advanced Digital Video",year:2024,desc:"A mock retro driving game, animated and cut together in Adobe After Effects from pixel art frames of a neon city at night.",aspectRatio:"16/9"},{type:"image",src:"/assets/Venom.webp",title:"Character Design",credit:"SJSU · ART 102 · 3D Modeling and Printing",year:2024,desc:"A sculpt of Venom’s head, modeled and rendered in Blender to develop greater detail and precision. Building on the opening Cow Abduction exercise, the project focused on more intricate forms, surface materials, and lighting.",aspectRatio:"16/9",relatedItems:["Cow Abduction","BMW Street Render","The Broken NPC"]},{type:"image",src:"/assets/My_Case.JPG",title:"Phone Case Concept",credit:"Started at SJSU · Independently developed",year:2025,desc:"An accessory design developed beyond its original coursework into a finished 3D-printed case. An open lattice wraps around the camera and side buttons.",aspectRatio:"5/6",relatedItems:["Apple Accessory Concepts"]},{type:"image",src:"/assets/Airpod_Case.JPG",title:"AirPods Case Concept",credit:"Started at SJSU · Independently developed",year:2026,desc:"An accessory design developed beyond its original coursework into a finished 3D-printed sleeve. An open lattice wraps an AirPods Pro case, leaving the status light and hinge accessible.",aspectRatio:"4/5",relatedItems:["Apple Accessory Concepts"]},{type:"image",src:"/assets/New_Radar_Sensor_front.jpg",title:"Ultrasonic Sensor, Front View",year:2024,desc:"Front of the ultrasonic sensor enclosure. Paired ultrasonic transducers, a 16x2 character LCD, and a recessed speaker cone, all set into a 3D-printed shell.",aspectRatio:"4/3",hidden:!0,relatedItems:["Ultrasonic Sensor, Back View","Ultrasonic Sensor and RGB Controller","HMI Sensor System"]},{type:"image",src:"/assets/New_Radar_Sensor_Back.jpg",title:"Ultrasonic Sensor, Back View",year:2024,desc:"Back of the ultrasonic sensor enclosure, showing the access panel, wiring routing, and the power and control cutouts.",aspectRatio:"4/3",hidden:!0,relatedItems:["Ultrasonic Sensor, Front View","Ultrasonic Sensor and RGB Controller","HMI Sensor System"]},{type:"image",src:"/assets/New_LED_Box_Front.jpg",title:"RGB Box, Front View",year:2024,desc:"Front of the RGB controller. A faceted 3D-printed shell with the addressable LED strip seated in a chamfered channel.",aspectRatio:"4/3",hidden:!0,relatedItems:["RGB Box, Back View","Ultrasonic Sensor and RGB Controller","RGB Controller"]},{type:"image",src:"/assets/New_LED_Box_Back.jpg",title:"RGB Box, Back View",year:2024,desc:"Back of the RGB controller, with the potentiometer, mode button, and toggle switch mounted through the top panel.",aspectRatio:"4/3",hidden:!0,relatedItems:["RGB Box, Front View","Ultrasonic Sensor and RGB Controller","RGB Controller"]},{type:"image",src:"/assets/Programming_Cover_Pic.jpg",title:"Ultrasonic Sensor and RGB Controller",year:2024,desc:"Both enclosures side by side. Each was modeled around its own board, display, and controls, then 3D printed and finished by hand.",aspectRatio:"4/3",hidden:!0,relatedItems:["HMI Sensor System","RGB Controller"]},{type:"image",src:"/assets/Max_Pic.JPG",title:"Studio Portrait",credit:"SJSU · PHOT 125 · Advanced Photographic Media",year:2024,desc:"Caught mid-laugh on a gelled teal backdrop, with the background light hot behind the head so the subject separates from it.",aspectRatio:"2/3"},{type:"image",src:"/assets/Photography_1.jpg",title:"Studio Photography",credit:"SJSU · PHOT 121 · Introduction to Studio Lighting",year:2022,desc:"A hand-drawn wordmark set over a cropped apparel shot, chains and acid-washed corduroy, framed close so the type sits on the garment rather than beside it.",aspectRatio:"1/1"},{type:"video",src:"/assets/New_Radar_Sensor.mp4",poster:"/assets/New_Radar_Sensor_front.jpg",title:"HMI Sensor System",credit:"SJSU · ART 106 · The Human Machine Interface",year:2024,desc:"An ultrasonic sensing device with an LCD, speaker, and 3D-printed enclosure that translates sensor readings into visual and audio feedback.",aspectRatio:"4/3",builds:[{src:"/assets/HMI_Sensor_Original_Build.mp4",poster:"/assets/HMI_Sensor_Original_Build.jpg",label:"Original Build",aspectRatio:"16/9"},{src:"/assets/New_Radar_Sensor.mp4",poster:"/assets/New_Radar_Sensor_front.jpg",label:"Redesigned Build",aspectRatio:"4/3"}],relatedItems:["HMI Sensor System, Tools and Components","HMI Sensor System, Speaker Development","Ultrasonic Sensor, Front View","Ultrasonic Sensor, Back View","Ultrasonic Sensor and RGB Controller"]},{type:"video",src:"/assets/New_LED_Box.mp4",poster:"/assets/New_LED_Box_Front.jpg",title:"RGB Controller",credit:"SJSU · ART 106 · The Human Machine Interface",year:2024,desc:"An LED controller with physical controls and a 3D-printed enclosure, designed around the electronics inside.",aspectRatio:"4/3",builds:[{src:"/assets/RGB_Controller_Original_Build.mp4",poster:"/assets/RGB_Controller_Original_Build.jpg",label:"Original Build",aspectRatio:"16/9"},{src:"/assets/New_LED_Box.mp4",poster:"/assets/New_LED_Box_Front.jpg",label:"Redesigned Build",aspectRatio:"4/3"}],relatedItems:["RGB Controller, Early Development","RGB Box, Front View","RGB Box, Back View","Ultrasonic Sensor and RGB Controller"]},{type:"image",src:"/assets/Radar_Tools_And_Components.jpg",title:"HMI Sensor System, Tools and Components",credit:"SJSU · ART 106 · The Human Machine Interface",year:2024,desc:"Tools and electronic components used during development of the ultrasonic distance sensor system, including breadboards, soldering equipment, a multimeter, and wiring supplies.",aspectRatio:"3024/2266",hidden:!0,relatedItems:["HMI Sensor System","HMI Sensor System, Speaker Development"]},{type:"video",src:"/assets/Radar_Speaker_Development.mp4",poster:"/assets/Radar_Speaker_Development.jpg",title:"HMI Sensor System, Speaker Development",credit:"SJSU · ART 106 · The Human Machine Interface",year:2024,desc:"An early speaker prototype for the ultrasonic distance sensor system, shown with its breadboard circuit before integration into the finished enclosure. Enable sound to hear the demonstration.",aspectRatio:"9/16",hidden:!0,relatedItems:["HMI Sensor System"]},{type:"image",src:"/assets/RGB_Controller_Development.jpg",title:"RGB Controller, Early Development",credit:"SJSU · ART 106 · The Human Machine Interface",year:2024,desc:"An early stage of the RGB controller project, showing the microcontroller and LED on a breadboard alongside wiring, components, and assembly tools.",aspectRatio:"3/4",hidden:!0,relatedItems:["RGB Controller"]},{type:"image",src:"/assets/Glass_Project_3127.jpg",title:"DNA-Inspired Kinetic Sculpture",credit:"SJSU · ART 141 · Topics in Advanced Glass",year:2023,desc:"A DNA-inspired sculpture combining liquid-metal forms designed in Blender and 3D printed with a connecting wire framework. The printed forms create a tubular path for a separately printed ball, with the structure designed to guide its movement through the piece.",aspectRatio:"3/4"},{type:"image",src:"/assets/Glass_Project_3130.jpg",title:"Wire-Framed Glass Vase",credit:"SJSU · ART 141 · Topics in Advanced Glass",year:2023,desc:"A glass vase shaped through heating and glassblowing within a handmade wire frame. The frame served as a boundary for the expanding glass, guiding the form of the vessel.",aspectRatio:"3/4",scale:1.15},{type:"image",src:"/assets/Shyon_Sculpture.jpg",title:"Product, Not Consumer",credit:"SJSU · ART 68 · Beginning Sculpture",year:2024,desc:"Hand-fabricated steel sculpture referencing consumer tech culture, welded, ground, sanded, and finished.",aspectRatio:"5/4",relatedItems:["Before Assembly"]},{type:"image",src:"/assets/Product_Not_Consumer_Before.jpg",title:"Before Assembly",credit:"SJSU · ART 68 · Beginning Sculpture",year:2024,desc:"Steel components laid out before welding and sculpting the finished piece.",aspectRatio:"3/4",hidden:!0,relatedItems:["Product, Not Consumer"]},{type:"image",src:"/assets/Adverstisement_Project.jpg",title:"Advertisement Project",credit:"SJSU · PHOT 125 · Advanced Photographic Media",year:2024,desc:"A spec print advertisement for a fictional shaver brand. The rotary shaver is lit as the hero and its shadow runs back to the bloodied cartridge razor it replaces.",aspectRatio:"16/9"},{type:"video",src:"/assets/BMW_Street_Render.mp4",poster:"/assets/BMW_Street_Render.jpg",playbackRate:.75,title:"BMW Street Render",credit:"SJSU · ART 102 · 3D Modeling and Printing",year:2024,desc:"A detailed BMW M3 street scene combining modeling with camera animation, shot composition, and rendering. I built the car and the entire environment from scratch, extending the focus on detail into an animated scene.",aspectRatio:"16/9",relatedItems:["Character Design","The Broken NPC"]},{type:"image",src:"/assets/Dark_Lane_Demo_Tapes_Homage.jpg",title:"Dark Lane Demo Tapes Homage",credit:"Independent Project",year:2023,desc:"A personal Photoshop tribute to Drake’s Dark Lane Demo Tapes mixtape cover, reimagined in LEGO form. The image recreates the cover’s hooded portrait and dark atmosphere.",aspectRatio:"1179/1182",pages:["/assets/Dark_Lane_Demo_Tapes_Homage.jpg","/assets/Dark_Lane_Demo_Tapes_Original.jpg"],pageLabels:["LEGO Homage","Side-by-Side Comparison"],comparisonCredit:"Original cover: Drake, Dark Lane Demo Tapes. LEGO homage: Shyon Shiri."},{type:"image",src:"/assets/Photoshop_Experiment_1.jpg",title:"First Photoshop Renditions",credit:"SJSU · ART 74 · Introduction to Digital Media",year:2020,desc:"My first Photoshop experiments, combining photographs through layering, repetition, color shifts, and distortion. The two compositions explore fragmented landscapes and altered cityscapes.",aspectRatio:"7/5",pages:["/assets/Photoshop_Experiment_1.jpg","/assets/Photoshop_Experiment_2.jpg"],pageLabels:["Landscape Collage","Cityscape Study"]},{type:"image",src:"/assets/early-portfolio/home.jpg",title:"Early Portfolio Website",credit:"SJSU · ART 101 · Digital Media Art",year:2022,desc:"An early personal portfolio built in Google Sites to present creative coding, 3D, and music projects while learning GitHub.",aspectRatio:"2732/2048",pages:["/assets/early-portfolio/home.jpg","/assets/early-portfolio/creative-coding.jpg","/assets/early-portfolio/coding-study-1.jpg","/assets/early-portfolio/coding-study-2.jpg"],pageLabels:["Homepage","Creative Coding","Coding Study 1","Coding Study 2"]}]},{id:"professional-services",title:"Freelance Projects",tag:"Web & Design",img:"/assets/Everly_Cover_Image-1280.webp",size:"wide",media:[{type:"image",src:"/assets/Mina_Website.webp",title:"Mina’s Elderly Care Homes Website",year:2025,desc:"Website design and React development, with a responsive interface.",link:"https://minasech.net",wide:!0,aspectRatio:"16/9"},{type:"image",src:"/assets/Everly_Cover_Image.webp",title:"Everly Care Home Branding and Website",year:2026,desc:"Brand identity, responsive website design, development, and deployment for a senior care community.",link:"https://everlycarehome.com",wide:!0,aspectRatio:"16/9"},{type:"image",src:"/assets/RealEstate_Luning_Flyer.jpg",title:"Luning Drive Property Flyer",year:2022,desc:"Property marketing flyer designed for Real Estate Experts, pairing a hero listing photo with clean typographic hierarchy, a status badge, and agent branding.",aspectRatio:"3/4"},{type:"image",src:"/assets/RealEstate_Colleen_Flyer.jpg",title:"Colleen Drive Property Flyer",year:2022,desc:"A dual-agent listing flyer combining property details, brand elements, and paired agent headshots in a balanced square format.",aspectRatio:"1/1"},{type:"image",src:"/assets/RealEstate_MorningStar_Flyer.webp",title:"Morning Star Drive Property Flyer",year:2022,desc:"A listing announcement co-branded with Compass, combining pricing, property specifications, and sales highlights.",aspectRatio:"4/5"},{type:"image",src:"/assets/RealEstate_MoskowiteCorner_Concept.jpg",title:"Moskowite Corner Concept Visualization",year:2026,desc:"An AI-generated concept visualization for a real estate redevelopment study at Moskowite Corner, CA. It shows a closed gas station lot rebuilt as a fuel and retail stop, modeled from aerial references for a developer evaluating the property.",aspectRatio:"5/3",relatedItems:["Moskowite Corner, Existing Site"]},{type:"image",src:"/assets/RealEstate_MoskowiteCorner_Before.webp",title:"Moskowite Corner, Existing Site",year:2026,desc:"The existing site before redevelopment. A closed 1.26-acre gas station lot with parking and an office building.",aspectRatio:"16/9",hidden:!0,relatedItems:["Moskowite Corner Concept Visualization"]}]},{id:"nabu",title:"NABU",tag:"Streetwear Brand",img:"/assets/New_NABU_Cover_Card.webp",size:"tall",media:[{type:"video",src:"/assets/Nabu_Poster_Banner.mp4",poster:"/assets/Nabu_Poster_Banner.jpg",title:"Brand Film",year:2023,desc:"Promotional video for NABU clothing, animated in Adobe After Effects.",wide:!0},{type:"video",src:"/assets/NABU_PUFFER_AD.mp4",poster:"/assets/NABU_Puffer_AD.jpg",title:"Puffer Collection Teaser",year:2025,desc:"A teaser edited in 2025 for the 2026 puffer jacket collection.",relatedItems:["Puffer Jacket, Front","Puffer Jacket, Back"]},{type:"video",src:"/assets/NABU_SALE_AD.mp4",poster:"/assets/NABU_SALE_AD.jpg",title:"Summer 2025",year:2025,desc:"Promotional video for the summer drop, camp-collar shirts and rug-pattern shorts, shot as a flat lay on white."},{type:"image",src:"/assets/Stevie_Pic.JPG",title:"Spring 2023",year:2022,desc:"Shot in 2022 for the 2023 spring collection. Two looks on a white cyclorama, the graphic tees worn over the Persian rug trousers, with the raw fringed seams left showing down the leg."},{type:"image",src:"/assets/NABU_Puffer_Front.jpg",title:"Puffer Jacket, Front",year:2025,desc:"Studio still from the puffer collection shoot. Woven bandana panelling across the body, sleeves, and hood, shot on a white cyclorama.",aspectRatio:"9/16",hidden:!0,relatedItems:["Puffer Jacket, Back","Puffer Collection Teaser"]},{type:"image",src:"/assets/NABU_Puffer_Back.jpg",title:"Puffer Jacket, Back",year:2025,desc:"Back of the same puffer, showing how the bandana medallion is centered and mirrored across the shoulders and hem.",aspectRatio:"2/3",hidden:!0,relatedItems:["Puffer Jacket, Front","Puffer Collection Teaser"]},{type:"image",src:"/assets/Digital_Media_Cover.jpg",title:"Persian Rug Pants Relaunch",year:2024,desc:"Promotional campaign for the 2024 rerelease of NABU's Persian rug pants.",aspectRatio:"3/4"}]}],Ee=["home","work","about","contact"],je=`
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
  /* Keep the native pointer until an actual mouse move activates the custom dot. */
  html { cursor: auto; }
  a, button, [role="button"] { cursor: pointer; }
  html.ss-custom-cursor, html.ss-custom-cursor * { cursor: none !important; }
  html.ss-custom-cursor video, html.ss-custom-cursor video *,
  html.ss-custom-cursor select { cursor: auto !important; }
  html.ss-custom-cursor input, html.ss-custom-cursor textarea,
  html.ss-custom-cursor [contenteditable="true"] { cursor: text !important; }

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

  /* Floating glass capsule, inset from the screen with a softly lit rim. */
  .ss-site-header {
    position: fixed; z-index: 10000;
    top: calc(14px + env(safe-area-inset-top));
    right: max(24px, env(safe-area-inset-right));
    border-radius: 999px; padding: 5px 12px;
    background: rgba(24,24,26,.9);
    border: 1px solid rgba(255,255,255,.2);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.3), inset 0 -1px 0 rgba(255,255,255,.04), 0 5px 20px rgba(0,0,0,.12);
  }
  .ss-site-header ul { display:flex; align-items:center; gap:8px; list-style:none; }
  .ss-site-header button { display:block; min-height:44px; padding:0 14px; border-radius:999px; }
  .ss-site-header-light {
    background: rgba(241,239,242,.94);
    border-color: rgba(255,255,255,.65);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 1px rgba(255,255,255,.3), 0 5px 20px rgba(35,35,38,.1);
  }
  @supports ((backdrop-filter: blur(18px)) or (-webkit-backdrop-filter: blur(18px))) {
    .ss-site-header {
      background: linear-gradient(160deg,rgba(255,255,255,.16),rgba(255,255,255,.035) 45%,rgba(255,255,255,.08)),rgba(20,20,22,.32);
      -webkit-backdrop-filter: blur(18px) saturate(145%);
      backdrop-filter: blur(18px) saturate(145%);
    }
    .ss-site-header-light { background: linear-gradient(160deg,rgba(255,255,255,.62),rgba(255,255,255,.15) 48%,rgba(255,255,255,.3)),rgba(241,239,242,.36); }
  }

  /* ─ MOBILE RESPONSIVE (iPhone 17e & similar - max 640px) ─ */
  @media (max-width: 640px) {
    .ss-site-header { left:max(12px,env(safe-area-inset-left)); right:max(12px,env(safe-area-inset-right)); top:calc(10px + env(safe-area-inset-top)); padding:4px 8px; }
    .ss-site-header ul { justify-content:space-between; gap:0; }
    .ss-site-header button { padding:0 12px; }

    /* Work Page - Cards. The floor comes down with the card itself (360 -> 330 wide),
       or a short phone draws a card taller than the desktop proportion. */

    /* Contact Page */
    .ss-contact-heading { font-size: clamp(32px, 6vw, 64px) !important; }
    .ss-contact-description { font-size: clamp(12px, 1.5vw, 14px) !important; }
  }

  /* A small solid dot remains visible over dark, light, and mid-gray media. */
  #ss-cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 99999;
    width: 10px; height: 10px; background: #fff;
    border: 1px solid #171717; border-radius: 50%;
    pointer-events: none; opacity: 0;
    transform: translate(-50%, -50%);
  }
  .ss-gallery-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 20px; }
  .ss-gallery-search { flex: 1 1 240px; min-width: 0; display: flex; align-items: center; border: 1px solid #555; border-radius: 10px; background: #171719; }
  .ss-gallery-search input { width: 100%; min-width: 0; border: 0; background: transparent; color: var(--white); font: inherit; font-size: 14px; padding: 12px; }
  .ss-gallery-search input::placeholder { color: #b5b3b0; }
  .ss-gallery-search:focus-within { outline: 2px solid var(--sky); outline-offset: 3px; }
  .ss-gallery-search input:focus { outline: none; }
  .ss-gallery-tools button, .ss-copy-link { min-height: 44px; padding: 10px 14px; border: 1px solid #555; border-radius: 10px; background: transparent; color: var(--white); font: 500 13px var(--sf); }
  .ss-gallery-tools button[aria-pressed="true"] { background: #ede8e0; color: #171717; border-color: #ede8e0; }
  /* Override the legacy global button reset only for these new controls. */
  #root .ss-gallery-tools button, #root .ss-copy-link, #root .ss-gallery-empty button { border: 1px solid #666 !important; background: #171719 !important; }
  #root .ss-gallery-tools button[aria-pressed="true"] { background: #ede8e0 !important; border-color: #ede8e0 !important; }
  .ss-gallery-filters { display: flex; gap: 8px; }
  .ss-gallery-count { color: #b5b3b0; font-size: 13px; margin: 0 0 14px; }
  .ss-gallery-empty { padding: 24px 0; color: #c8c5c1; font-size: 15px; line-height: 1.6; }
  .ss-gallery-empty button { margin-top: 12px; display: block; min-height: 44px; padding: 10px 16px; background: #252525; color: var(--white); border: 1px solid #666; border-radius: 10px; }
  .ss-share-status { display: block; min-height: 20px; margin-top: 8px; color: #b5b3b0; font-size: 13px; }

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
  .ss-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 22px; margin-top: 24px; }
  .ss-hero-actions button {
    min-height: 46px; font-size: 13px; font-weight: 600;
    transition: background .22s var(--ease-out), color .22s var(--ease-out), transform .22s var(--ease-out);
  }
  .ss-hero-secondary { background: none; color: var(--white); padding: 0 2px; border: 0; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: rgba(245,242,237,.35); }
  .ss-hero-secondary:hover { color: var(--sky); }
  .ss-hero-actions button:focus-visible, .ss-story-cue:focus-visible { outline: 2px solid var(--sky); outline-offset: 5px; }
  #root button:focus-visible { outline: 2px solid var(--sky) !important; outline-offset: 5px; }
  .ss-contact-entry:hover, .ss-contact-entry:focus-visible { background: rgba(56,189,248,.06); }
  @media (max-width: 640px) {
    .ss-home-hero { min-height: 560px; }
    .ss-hero-kicker { margin-bottom: 16px; font-size: 10px; }
    .ss-hero-actions { gap: 4px 16px; margin-top: 18px; }
  }

  /* ── Lego Realm storyboard (home page scroll) ── */
  .ss-home-scroll {
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: none; -ms-overflow-style: none;
    overscroll-behavior: contain;
  }
  .ss-home-scroll[data-locked="true"] .ss-story { display: none; }
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
    background: none; border: 0; cursor: inherit;
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
    padding: 0; border: 0; background: none; text-align: left; cursor: inherit;
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

  /* Keep the complete mansion portrait visible on portrait screens. */
  @media (max-aspect-ratio: 1/1) {
    .ss-slide-open { min-height: auto; padding-top: 84px; }
    .ss-slide-open .ss-slide-inner { width: 100%; padding: 0; }
    .ss-slide-open .ss-open-bg { position: relative; width: 100%; aspect-ratio: 16 / 9; }
    .ss-slide-open .ss-open-img { object-fit: contain; }
    .ss-slide-open .ss-open-veil { display: none; }
    .ss-slide-open .ss-open-copy { padding: 28px 8vw 0; }
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

  .ss-art-comparison { width: 100%; max-height: 100%; display: flex; flex-direction: column; gap: 16px; }
  .ss-art-comparison-pair { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; min-height: 0; }
  .ss-art-comparison-item { min-width: 0; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
  .ss-art-comparison-image { aspect-ratio: 1; min-height: 0; }
  .ss-art-comparison-item p { margin: 0; text-align: center; font-size: 13px; color: var(--white); }
  .ss-art-comparison-credit { margin: 0; text-align: center; font-size: 12px; line-height: 1.5; color: var(--mid); }
  .ss-booklet-reader { width: 100%; height: 100%; display: flex; flex-direction: column; min-height: 0; }
  .ss-booklet-track { display: flex; flex: 1; min-height: 0; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; }
  .ss-booklet-page { flex: 0 0 100%; min-width: 0; height: 100%; scroll-snap-align: start; display: flex; align-items: center; justify-content: center; }
  .ss-media-viewer .ss-booklet-reader .ss-booklet-page img { width: 100% !important; height: 100% !important; max-height: 100% !important; object-fit: contain; border-radius: 0 !important; }
  .ss-booklet-controls { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-top: 12px; font-size: 13px; }
  .ss-booklet-controls button { min-width: 44px; min-height: 44px; color: var(--white); background: #202020; border: 1px solid #555; border-radius: 50%; cursor: inherit; }
  .ss-booklet-controls button:disabled { opacity: .3; cursor: inherit; }
  .ss-media-viewer { width: min(1100px, 92vw); max-height: calc(100dvh - 144px); overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain;
    padding: 16px 12px 24px;
    display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(260px, 1fr); gap: clamp(24px, 3vw, 40px); align-items: center; }
  .ss-media-viewer-close { position: absolute; top: max(16px, env(safe-area-inset-top)); right: max(20px, env(safe-area-inset-right));
    z-index: 3; width: 48px; height: 48px; border-radius: 50%; background: #202020; border: 1px solid #666;
    color: #fff; display: grid; place-items: center; cursor: inherit; }
  .ss-media-viewer-close:hover { background: #343434; }
  .ss-media-viewer-close:focus-visible { outline: 2px solid var(--sky); outline-offset: 4px; }
  .ss-viewer-media { min-width: 0; }
  .ss-viewer-canvas { width: 100%; height: min(60dvh, 560px); display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .ss-viewer-info { min-width: 0; max-width: 480px; padding: 12px 0; }
  .ss-viewer-info .ss-asset-title { font-size: clamp(28px, 2.5vw, 36px); line-height: 1.08; letter-spacing: -.035em; font-weight: 600; margin-bottom: 22px; overflow-wrap: anywhere; }
  @media (max-width: 1023px) {
    .ss-media-viewer { display: block; width: min(600px, calc(100vw - 40px)); max-height: calc(100dvh - 112px); padding: 8px 0 24px; }
    .ss-viewer-canvas { height: auto; aspect-ratio: var(--asset-ratio, 4/3); max-height: 44dvh; }
    .ss-viewer-canvas.ss-booklet-media { height: 48dvh; max-height: 460px; aspect-ratio: auto; }
    .ss-viewer-info { max-width: 600px; padding: 24px 0 8px; margin: 0 auto; }
    .ss-viewer-info .ss-asset-title { font-size: clamp(26px, 5vw, 32px); margin-bottom: 18px; }
  }

  @media (max-width: 768px) {
    .ss-hero-bg { object-position: 78% 5% !important; }

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
  .ss-work-modal { border-radius: 26px !important; overflow-x: hidden; }
  /* masonry gallery (Work modal: creative + professional) — packs mixed
     aspect ratios tightly with no ragged gaps, shows every image uncropped */
  .ss-scell { position: relative; border-radius: 14px; overflow: hidden; background: #111214; border: 1px solid rgba(245,242,237,.1); cursor: inherit; transition: transform .5s var(--ease-out), border-color .4s var(--ease-out), box-shadow .5s var(--ease-out); }
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
  .ss-project-card { border-radius: 22px; }
  .ss-project-card::after { content: ""; position: absolute; inset: 0; border-radius: inherit; border: 1px solid transparent; pointer-events: none; z-index: 4; transition: border-color .22s ease; }
  .ss-project-card-nabu::after { display: none; }
  .ss-project-card[data-active="true"]::after { border-color: rgba(245,242,237,.25); }
  @media (hover: hover) and (pointer: fine) {
    .ss-project-card[data-active="true"]:hover::after { border-color: rgba(245,242,237,.55); }
  }
  .ss-project-card[data-active="true"]:active::after { border-color: rgba(245,242,237,.65); }
  @media (prefers-reduced-motion: reduce) {
    .ss-project-card { transition: none; translate: none !important; scale: none !important; }
    .ss-project-card::after { transition: none; }
  }
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
  .ss-work-modal { max-height: calc(100dvh - 32px) !important; overflow-y: auto; overscroll-behavior-y: contain; -webkit-overflow-scrolling: touch; padding: 20px; }
  .ss-work-modal .ss-modal-grid > * { min-width: 0; }
  .ss-work-modal .ss-modal-close { position: static !important; display: block; align-self: flex-end; min-height: 44px; margin: 0 0 20px auto; flex-shrink: 0; }
  @media (max-width: 1023px), (max-height: 600px) {
    .ss-work-modal { display: block !important; width: calc(100vw - 32px) !important; }
    .ss-work-modal .ss-scroll { overflow: visible !important; }
    .ss-work-modal .ss-modal-grid { display: grid !important; grid-template-columns: repeat(2,minmax(0,1fr)) !important; overflow: visible !important; max-height: none !important; gap: 16px !important; }
    .ss-work-modal .ss-modal-grid > * { width: 100% !important; min-width: 0; }
    .ss-work-modal .ss-scroll-fade { display: none; }
  }
  @media (max-width: 640px) {
    .ss-home-hero { min-height: max(620px,100svh); }
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

  /* Keep the full-width portrait treatment; constrain only the supporting copy. */
  .ss-home-hero .ss-hero-summary { width: min(100%, 30vw, 36ch); }
  .ss-home-hero .ss-hero-summary p { text-wrap: pretty; }
  @media (max-width: 640px) {
    .ss-home-hero .ss-hero-summary { width: 100%; max-width: 36ch; }
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
`;function Te(){const t=r.useRef(null);return r.useEffect(()=>{const h=t.current;if(!h)return;const s=document.documentElement,l=window.matchMedia("(any-hover: hover) and (any-pointer: fine)"),n=()=>{s.classList.remove("ss-custom-cursor"),h.style.opacity="0"},i=o=>{const b=o.target instanceof Element?o.target:null;if(o.pointerType!=="mouse"||!l.matches||b?.closest('video, input, textarea, select, [contenteditable="true"]')){n();return}h.style.left=o.clientX+"px",h.style.top=o.clientY+"px",h.style.opacity="1",s.classList.add("ss-custom-cursor")},m=o=>{o.relatedTarget||n()},g=o=>{o.key==="Tab"&&n()},f=o=>{o.pointerType!=="mouse"&&n()},p=o=>{o.target instanceof Element&&o.target.closest("img, video")&&o.preventDefault()};return window.addEventListener("pointermove",i,{passive:!0}),window.addEventListener("pointerout",m),window.addEventListener("pointerdown",f,{passive:!0}),window.addEventListener("blur",n),window.addEventListener("focus",n),window.addEventListener("keydown",g),document.addEventListener("visibilitychange",n),document.addEventListener("dragstart",p),l.addEventListener("change",n),()=>{n(),window.removeEventListener("pointermove",i),window.removeEventListener("pointerout",m),window.removeEventListener("pointerdown",f),window.removeEventListener("blur",n),window.removeEventListener("focus",n),window.removeEventListener("keydown",g),document.removeEventListener("visibilitychange",n),document.removeEventListener("dragstart",p),l.removeEventListener("change",n)}},[]),e.jsx("div",{id:"ss-cursor-dot",ref:t,"aria-hidden":"true"})}function O(){const t=r.useCallback(()=>document.body.classList.add("ss-hover"),[]),h=r.useCallback(()=>document.body.classList.remove("ss-hover"),[]);return{onMouseEnter:t,onMouseLeave:h}}const D=[.32,.72,0,1],B=typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Ae({page:t,children:h}){const s=me(),[l,n]=r.useState(t),[i,m]=r.useState(null),[g,f]=r.useState(!1),p=r.useRef(null);return r.useEffect(()=>{!i&&t!==l&&(f(!1),m(t))},[t,l,i]),r.useEffect(()=>{if(!i)return;let o=!1;const b=Array.from(p.current?.querySelectorAll("img")||[]);return Promise.all(b.filter(u=>u.loading!=="lazy").map(u=>u.decode().catch(()=>{}))).then(()=>{o||f(!0)}),()=>{o=!0}},[i]),e.jsx(e.Fragment,{children:[l,...i?[i]:[]].map(o=>{const b=o===i;return e.jsx(j.div,{"data-page":o,ref:b?p:void 0,"aria-hidden":i&&!b?!0:void 0,initial:{opacity:b?0:1},animate:{opacity:b&&!g?0:1},transition:{duration:s||!b?0:.38,ease:[.4,0,.2,1]},onAnimationComplete:u=>{b&&g&&typeof u=="object"&&"opacity"in u&&u.opacity===1&&(n(o),m(null))},style:{position:"absolute",inset:0,zIndex:b?2:1,isolation:"isolate",background:"#060606",pointerEvents:i?"none":"auto"},children:h(o)},o)})})}function Re(){const[t,h]=r.useState(()=>ne(window.location.hash,M)),s=t.page,l=M.find(a=>a.id===t.projectId)??null,n=l?.media.find(a=>K(a.src)===t.mediaId)??null,i=r.useRef(`${Date.now()}-${Math.random()}`),m=r.useCallback((a,w=!1)=>{const S=re(a);if(S!==window.location.hash){const N={portfolioParent:window.location.hash||"#home",portfolioSession:i.current};w?window.history.replaceState(N,"",S):window.history.pushState(N,"",S)}h(a)},[]),g=r.useCallback(a=>{window.history.state?.portfolioSession===i.current&&window.history.state?.portfolioParent===re(a)?window.history.back():m(a,!0)},[m]),f=r.useCallback(()=>g({page:"work",projectId:t.projectId}),[g,t.projectId]),p=r.useCallback(()=>g({page:"work"}),[g]),o=r.useCallback(a=>{const w=M.find(S=>S.media.includes(a));w&&m({page:"work",projectId:w.id,mediaId:K(a.src)})},[m]);r.useEffect(()=>{const a=()=>h(ne(window.location.hash,M));return window.addEventListener("popstate",a),window.addEventListener("hashchange",a),()=>{window.removeEventListener("popstate",a),window.removeEventListener("hashchange",a)}},[]),r.useEffect(()=>{const a=n?.title||l?.title||(s==="home"?"Designer & Developer":s.charAt(0).toUpperCase()+s.slice(1));document.title=`${a} · Shyon Shiri`},[s,l,n]);const[b,u]=r.useState("hero"),[k]=r.useState(ge),E=r.useRef(!1),x=s==="about",c=r.useRef(null);r.useLayoutEffect(()=>{c.current&&(c.current.inert=!!l)},[l]),r.useEffect(()=>{if(document.getElementById("ss-global"))return;const a=document.createElement("style");a.id="ss-global",a.innerHTML=je,document.head.appendChild(a)},[]),r.useEffect(()=>{const a=s==="about"?"#f1eff2":"#060606";document.documentElement.style.backgroundColor=a,document.body.style.backgroundColor=a},[s]);const T=r.useCallback((a,w="hero")=>{a!==s&&(E.current=!0,u(w),m({page:a}))},[s,m]);return r.useEffect(()=>{const a=w=>{if(n){w.key==="Escape"&&f();return}if(l){w.key==="Escape"&&p();return}};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[n,l,f,p]),e.jsxs("div",{style:{position:"fixed",inset:0,width:"100%",height:"100dvh",overflow:"hidden",background:"#060606"},children:[e.jsx("svg",{width:"0",height:"0","aria-hidden":"true",focusable:"false",style:{position:"absolute",pointerEvents:"none"},children:e.jsx("defs",{children:e.jsxs("filter",{id:"ss-portrait-detail",x:"0",y:"0",width:"100%",height:"100%",colorInterpolationFilters:"sRGB",children:[e.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:"0.65",edgeMode:"duplicate",result:"soft"}),e.jsx("feComposite",{in:"SourceGraphic",in2:"soft",operator:"arithmetic",k1:"0",k2:"1.35",k3:"-0.35",k4:"0"})]})})}),e.jsx(Te,{}),e.jsxs("div",{ref:c,"aria-hidden":l?!0:void 0,children:[e.jsx("nav",{className:`ss-site-header${x?" ss-site-header-light":""}`,"aria-label":"Main navigation",children:e.jsx("ul",{children:Ee.map(a=>e.jsx("li",{children:e.jsx(Ne,{label:a.charAt(0).toUpperCase()+a.slice(1),active:s===a,onClick:()=>T(a),onLight:x})},a))})}),e.jsx(Ae,{page:s,children:a=>e.jsxs(e.Fragment,{children:[a==="home"&&e.jsx(Pe,{onNavigate:T,intro:!E.current,initialSection:b}),a==="work"&&e.jsx(Ye,{onCardClick:w=>m({page:"work",projectId:w.id})}),a==="about"&&e.jsx(Se,{realmSupported:k.ok,onViewOverview:()=>T("home","open")}),a==="contact"&&e.jsx(qe,{})]})})]}),e.jsx(Z,{children:l&&e.jsx(Ke,{inactive:!!n,project:l,onClose:p,onMediaClick:o},l.id)}),e.jsx(Z,{children:n&&e.jsx(et,{item:n,onClose:f,onItemClick:o})})]})}function Ne({label:t,active:h,onClick:s,onLight:l}){const n=O();return e.jsx("button",{onClick:s,"aria-current":h?"page":void 0,className:"ss-tap",style:{fontFamily:"var(--sf)",fontSize:12,fontWeight:h?650:500,letterSpacing:"0.05em",textTransform:"uppercase",color:l?"#14110b":"var(--white)",background:"none",border:"none",cursor:"inherit",opacity:h?1:.86,textShadow:l?"0 0 2px rgba(255,253,249,1), 0 0 4px rgba(255,253,249,1), 0 0 10px rgba(255,253,249,1), 0 0 20px rgba(255,253,249,.9)":"0 0 2px rgba(0,0,0,.95), 0 1px 3px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,.95)",transition:"opacity .3s var(--ease-out), color .45s var(--ease-out), text-shadow .45s var(--ease-out)",position:"relative"},...n,children:t})}function ge(){const t=window;if(typeof t.__realmSupported!="function")return{ok:!0,why:"",message:""};try{const h=t.__realmSupported();return{ok:!!h.ok,why:h.why||"",message:typeof t.__realmSupportMessage=="function"?t.__realmSupportMessage():""}}catch{return{ok:!0,why:"",message:""}}}const le=["Shyon","Shiri"],Ie=D,Ce={hidden:{},show:{transition:{staggerChildren:.052,delayChildren:.32}}},_e={hidden:{opacity:0,y:"-0.85em",scale:1.06,filter:"blur(3px)"},show:{opacity:1,y:["-0.85em","0.045em","0em"],scale:[1.06,.985,1],filter:["blur(3px)","blur(0px)","blur(0px)"],transition:{duration:.76,times:[0,.72,1],ease:Ie}}};function Be({isMobile:t,intro:h}){return e.jsx(j.h1,{className:"ss-hero-name","aria-label":le.join(" "),variants:Ce,initial:h&&!B?"hidden":!1,animate:"show",style:{fontSize:t?"clamp(46px,7.4vw,74px)":"clamp(68px,9.4vw,148px)"},children:le.map(s=>e.jsx("span",{className:"ss-hero-line","aria-hidden":"true",children:[...s].map((l,n)=>e.jsx(j.span,{className:"ss-hero-ch",variants:_e,children:l},s+n))},s))})}function Pe({onNavigate:t,intro:h,initialSection:s}){const[l,n]=r.useState(!1),[i,m]=r.useState(window.innerWidth<=640),[g]=r.useState(ge),f=O(),p=r.useRef(null),[o,b]=r.useState(s==="open"),u=r.useRef(!1);r.useLayoutEffect(()=>{if(s!=="open")return;const x=p.current,c=x?.querySelector('[data-slide="open"]');!x||!c||(x.scrollTo({top:x.scrollTop+c.getBoundingClientRect().top-x.getBoundingClientRect().top,behavior:"instant"}),u.current=!0,c.focus({preventScroll:!0}))},[s]),r.useEffect(()=>{const x=()=>{m(window.innerWidth<=640)};return window.addEventListener("resize",x),()=>window.removeEventListener("resize",x)},[]);const k=r.useRef(null);r.useEffect(()=>()=>k.current?.(),[]);const E=x=>{k.current?.();const c=p.current;c&&x==="open"&&(c.dataset.locked="false",b(!0));const T=c?.querySelector(`[data-slide="${x}"]`);if(!c||!T)return;const a=c.scrollTop,w=Math.min(c.scrollHeight-c.clientHeight,a+T.getBoundingClientRect().top-c.getBoundingClientRect().top);if(B){c.scrollTo({top:w,behavior:"instant"});return}const S=w-a,N=Math.min(2600,1200+Math.abs(S)*.45)*.75,C=performance.now(),A=c.style.scrollSnapType,L=c.style.scrollBehavior;c.style.scrollSnapType="none",c.style.scrollBehavior="auto";let I=0;const _=()=>{cancelAnimationFrame(I),c.style.scrollSnapType=A,c.style.scrollBehavior=L,c.removeEventListener("wheel",_),c.removeEventListener("touchstart",_),c.removeEventListener("pointerdown",_),window.removeEventListener("keydown",_),k.current=null};k.current=_,c.addEventListener("wheel",_,{passive:!0}),c.addEventListener("touchstart",_,{passive:!0}),c.addEventListener("pointerdown",_,{passive:!0}),window.addEventListener("keydown",_);const P=d=>{const y=Math.min(1,(d-C)/N),v=(1-Math.cos(Math.PI*y))/2;c.scrollTop=a+S*v,y<1?I=requestAnimationFrame(P):_()};I=requestAnimationFrame(P)};return e.jsxs(j.div,{ref:p,className:"ss-home-page ss-home-scroll","data-locked":!o,onScroll:x=>{const c=x.currentTarget;o&&(c.scrollTop>4&&(u.current=!0),u.current&&c.scrollTop<=1&&(k.current?.(),u.current=!1,c.dataset.locked="true",b(!1)))},style:{position:"absolute",inset:0,background:"#060606"},children:[e.jsxs("div",{className:"ss-home-hero ss-snap","data-slide":"hero","data-label":"Top",style:{position:"relative",height:"100dvh",overflow:"hidden"},children:[e.jsx("img",{src:"/assets/New_Shiri_Site_Pic.jpg",decoding:"async",width:"1920",height:"1080",alt:"",onLoad:()=>n(!0),className:l?"ss-hero-bg ss-hero-bg-active":"ss-hero-bg",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"65% 5%",filter:"url(#ss-portrait-detail) brightness(0.62) contrast(1.1)",zIndex:1}}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:2,background:"radial-gradient(ellipse 65% 100% at 72% 50%, transparent 25%, rgba(6,6,6,.65) 70%), linear-gradient(to bottom, rgba(6,6,6,.25) 0%, transparent 30%, transparent 65%, rgba(6,6,6,.85) 100%)"}}),e.jsxs("div",{className:"ss-hero-intro",style:{position:"absolute",bottom:i?"14vh":"24vh",left:"8vw",right:"8vw",zIndex:10,transition:"bottom 0.3s ease"},children:[e.jsx(Be,{isMobile:i,intro:h}),e.jsxs(j.div,{className:"ss-hero-summary",initial:B||!h?!1:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.38,delay:B||!h?0:.5,ease:D},children:[e.jsx("p",{style:{marginTop:20,fontSize:16,lineHeight:1.5,color:"rgba(245,242,237,.82)"},children:"Welcome to my personal website. Explore my work, learn about me, or visit the interactive LEGO world I built to showcase my projects."}),e.jsx("div",{className:"ss-hero-actions",children:e.jsx("button",{type:"button",className:"ss-hero-secondary",onClick:()=>E("open"),...f,children:"View My LEGO Portfolio"})})]})]})]}),e.jsxs("div",{className:"ss-story",style:{position:"relative",background:"#060606",padding:"0 8vw"},children:[e.jsxs(Y,{id:"open",label:"My LEGO Portfolio",className:"ss-slide-open",stagger:.14,children:[e.jsxs("div",{className:"ss-open-bg",children:[e.jsx(j.img,{className:"ss-open-img",variants:ce,src:"/assets/story/story_mansion_portrait.jpg",alt:"My LEGO character facing the camera, with the mansion, upstairs balcony, and four cars behind him.",loading:"lazy",decoding:"async"}),e.jsx("div",{className:"ss-open-veil","aria-hidden":!0})]}),e.jsxs("div",{className:"ss-open-copy",children:[e.jsx(q,{className:"ss-open-title",text:"My LEGO Portfolio",variant:fe,stagger:.07}),e.jsx(q,{className:"ss-open-line",text:"My portfolio, built in LEGO. Walk between buildings to browse projects and learn about me.",variant:de,stagger:.018})]})]}),e.jsxs("div",{style:{maxWidth:1180,margin:"0 auto"},children:[e.jsx(Y,{id:"map",label:"Navigation",className:"ss-slide-map",stagger:.18,children:e.jsxs("div",{className:"ss-map-col",children:[e.jsx(he,{pair:!0,kicker:"Navigation",body:"The coffee shop opens freelance projects, the cottage holds selected works, and the house leads to About. NABU is at the crystal above the ruins."}),e.jsx(Ue,{}),e.jsx("div",{className:"ss-map-hint",children:"Select a building to preview it."})]})}),e.jsxs(Y,{id:"shop",label:"Development",className:"ss-slide-shop",stagger:.18,children:[e.jsx(he,{pair:!0,kicker:"Development",body:"Built in Blender and brought into the browser with Three.js. Compressed models, collision detection, and a day-night cycle make the portfolio a place you can move through. Most builds are my own, alongside a few modified free assets."}),e.jsx(Oe,{})]})]}),e.jsxs(Y,{id:"close",label:"View My LEGO Portfolio",className:"ss-slide-close",stagger:.16,children:[e.jsxs("div",{className:"ss-open-bg",children:[e.jsx(j.img,{className:"ss-open-img",variants:ce,src:"/assets/story/story_aerial_sunset.jpg",alt:"The town from above at sunset, the lampposts coming on.",loading:"lazy",decoding:"async"}),e.jsx("div",{className:"ss-open-veil","aria-hidden":!0})]}),e.jsxs("div",{className:"ss-open-copy",children:[e.jsx(j.dl,{className:"ss-figs",variants:ue,children:ze.map(x=>e.jsxs(j.div,{className:"ss-fig",variants:Fe,children:[e.jsxs("dd",{children:[x.n,e.jsx("i",{children:x.unit})]}),e.jsx("dt",{children:x.label})]},x.label))}),e.jsx(q,{className:"ss-open-line",text:g.ok?"Controls are displayed on entry.":"View My LEGO Portfolio on a supported desktop or laptop. You can browse the same projects in Work on this device.",variant:de,stagger:.018}),e.jsxs(j.div,{variants:be,style:{display:"flex",alignItems:"center",gap:22,flexWrap:"wrap",marginTop:26},children:[g.ok?e.jsxs("a",{href:"/lego.html",...f,className:"ss-contact-btn",style:{display:"inline-flex",alignItems:"center",gap:10,padding:"16px 30px",borderRadius:980,minHeight:46,border:"1px solid rgba(245,242,237,.4)",color:"var(--white)",textDecoration:"none",fontSize:13,fontWeight:600,cursor:"inherit"},children:[e.jsx("span",{children:"View My LEGO Portfolio"}),e.jsx("span",{children:"→"})]}):e.jsxs("p",{style:{maxWidth:430,fontSize:14,lineHeight:1.6,color:"rgba(245,242,237,.62)",fontFamily:"var(--sf)"},children:[e.jsx("span",{style:{display:"block",marginBottom:6,fontFamily:"var(--sf)",fontSize:10.5,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--sky)"},children:"Desktop Only"}),g.message]}),e.jsx("span",{role:"button",tabIndex:0,onClick:()=>t("work"),onKeyDown:x=>{(x.key==="Enter"||x.key===" ")&&t("work")},...f,className:"ss-tap",style:{fontFamily:"var(--sf)",fontSize:11.5,fontWeight:590,letterSpacing:"0.05em",textTransform:"uppercase",color:"rgba(245,242,237,.72)",textDecoration:"underline",textUnderlineOffset:"4px",cursor:"inherit",display:"inline-block"},children:"Browse My Work"})]})]})]})]}),o&&e.jsx(Je,{scrollRef:p})]},"home")}const F=D,Me={hidden:{},show:{transition:{staggerChildren:.04,delayChildren:0}}},ue={hidden:{},show:{transition:{staggerChildren:.03,delayChildren:0}}},fe={hidden:{opacity:0,y:8},show:{opacity:1,y:0,transition:{duration:.36,ease:F}}},de={hidden:{opacity:0,y:5},show:{opacity:1,y:0,transition:{duration:.32,ease:F}}},be={hidden:{opacity:0,y:22},show:{opacity:1,y:0,transition:{duration:.72,ease:F}}},Le={hidden:{opacity:0,y:14,clipPath:"inset(0% 0% 100% 0%)"},show:{opacity:1,y:0,clipPath:"inset(0% 0% -6% 0%)",transition:{duration:.7,ease:F}}},De={hidden:{y:30,borderColor:"rgba(245,242,237,0)"},show:{y:0,borderColor:"rgba(245,242,237,0.16)",transition:{duration:.8,ease:F,staggerChildren:.13,delayChildren:.14}}},ce={hidden:{opacity:0,scale:1.015},show:{opacity:1,scale:1,transition:{duration:1.9,ease:F}}};function q({text:t,variant:h,className:s,style:l}){const n=[];return t.split(`
`).forEach((i,m)=>{m>0&&n.push(e.jsx("br",{},"br"+m));const g=i.split(" ");g.forEach((f,p)=>n.push(e.jsxs("span",{className:"ss-w",style:{display:"inline-block"},children:[f,p<g.length-1?" ":""]},m+"-"+p)))}),e.jsx(j.p,{className:s,style:l,variants:h,children:n})}const He={hidden:{opacity:0,y:22},show:{opacity:1,y:0,transition:{duration:.85,ease:D}}},X=[{scene:"Assembly",src:"/assets/story/story_blender_shop_assembly.jpg",caption:"The coffee shop in progress, assembled from individual bricks on the same stud grid used by the engine."},{scene:"Mesh Editing",src:"/assets/story/story_blender_ruins_edit.jpg",caption:"Building the ruins in Edit Mode. The highlighted brick course forms the next section above the doorway."},{scene:"Sculpting",src:"/assets/story/story_blender_hair_sculpt.jpg",caption:"The character's hair in Sculpt Mode under a clay material. Roughly 8,000 vertices shaped by hand, then exported with cleaned normals for smooth shading."},{scene:"UV and Texturing",src:"/assets/story/story_blender_skull_uv.jpg",caption:"The skull’s UV layout on the left and its mapped texture on the right. Printed details are applied through the same workflow."},{scene:"Figure Assembly",src:"/assets/story/story_blender_figure_exploded.jpg",caption:"The minifig broken into its parts: hair, head, torso, and arms. The legs are a separate asset, attached to the hip pivots at runtime so the walk cycle can swing them."},{scene:"Materials",src:"/assets/story/story_blender_house_nodes.jpg",caption:"The house during construction, with the node graph for its tinted window material below the viewport."},{scene:"Render Preview",src:"/assets/story/story_blender_cottage_render.jpg",caption:"Checking the cottage’s materials and lighting in Blender before export."}];function Oe(){const[t,h]=r.useState(0);return e.jsxs(j.div,{className:"ss-sheet",variants:ue,children:[e.jsx("div",{className:"ss-sheet-grid",children:X.map((s,l)=>e.jsxs(j.button,{className:`ss-cell${l===t?" on":""}`,variants:De,onMouseEnter:()=>h(l),onFocus:()=>h(l),"aria-label":s.scene,children:[e.jsx(j.span,{className:"ss-cell-shot",variants:He,children:e.jsx("img",{src:s.src,alt:s.scene,loading:"lazy",decoding:"async"})}),e.jsx("span",{className:"ss-cell-label",children:s.scene})]},s.src))}),e.jsxs(j.p,{className:"ss-sheet-cap",variants:Le,children:[e.jsx("b",{children:X[t].scene}),X[t].caption]})]})}const ze=[{n:"15.9",unit:"M",label:"Triangles per Frame"},{n:"689",unit:"",label:"Draw Calls"},{n:"35",unit:"",label:"Models Loaded"},{n:"7",unit:"min",label:"Full Day Cycle"}],Fe={hidden:{opacity:0,y:14},show:{opacity:1,y:0,transition:{duration:.6,ease:D}}},Q=[{id:"shop",name:"The Coffee Shop",cat:"Freelance Projects",x:18.2,y:26,flip:!1,src:"/assets/story/story_shop_evening.jpg",line:"Commissioned freelance projects. Full-stack websites, brand and print work for small businesses, and concept visualization."},{id:"cottage",name:"The Cottage",cat:"Selected Works",x:53.5,y:25,flip:!1,src:"/assets/story/story_sunset.jpg",line:"Coursework and independent projects in 3D, physical objects, electronics, and image-making."},{id:"house",name:"The Modern House",cat:"About",x:93.5,y:38,flip:!0,src:"/assets/story/story_lamp_night.jpg",line:"Background and training, and how the disciplines across the rest of the site fit together."},{id:"ruins",name:"The Ruins",cat:"NABU",x:13,y:85,flip:!1,src:"/assets/story/story_crystal_night.jpg",line:"Art direction, promotional video, and campaign photography for the NABU streetwear brand."}],We={hidden:{opacity:0,scale:.55},show:{opacity:1,scale:1,transition:{duration:.55,ease:D}}},Ge={hidden:{opacity:0,y:10},show:{opacity:1,y:0,transition:{duration:.45,ease:D}}};function Ue(){const t=r.useRef(null),h=r.useRef(null),[s,l]=r.useState({left:0,top:0,w:0,h:0}),[n,i]=r.useState({w:0,h:0}),[m,g]=r.useState({l:0,r:0}),[f,p]=r.useState(0),[o,b]=r.useState(null),[u,k]=r.useState(!1);r.useEffect(()=>{const a=t.current;if(!a)return;const w=2400,S=1350,N=()=>{const A=a.getBoundingClientRect();if(!A.width||!A.height)return;const L=Math.min(A.width/w,A.height/S),I=w*L,_=S*L;l({left:(A.width-I)/2,top:(A.height-_)/2,w:I,h:_});const P=document.documentElement.clientWidth;let d=0,y=P;for(let v=a;v&&v!==document.documentElement;v=v.parentElement)if(getComputedStyle(v).overflowX!=="visible"){const z=v.getBoundingClientRect();d=Math.max(d,z.left),y=Math.min(y,z.right)}g({l:d+8-A.left,r:Math.min(y-8,P-64)-A.left}),i({w:A.width,h:A.height})};N();const C=new ResizeObserver(N);return C.observe(a),()=>C.disconnect()},[]),r.useLayoutEffect(()=>{if(!o)return;const a=h.current;a&&p(a.offsetHeight)},[o,n.w]);const E=Q.find(a=>a.id===o)||null,x=E?c(E):void 0;return e.jsxs("div",{className:"ss-map-frame",children:[e.jsxs(j.div,{className:"ss-map-stage",ref:t,variants:be,children:[e.jsx("img",{className:"ss-map-bed",src:"/assets/story/story_aerial_town.jpg",alt:"","aria-hidden":!0,loading:"lazy",decoding:"async"}),e.jsxs("div",{className:"ss-map-fit",style:{left:s.left,top:s.top,width:s.w,height:s.h},children:[e.jsx("img",{className:"ss-map-img",src:"/assets/story/story_aerial_town.jpg",loading:"lazy",alt:"The town from above: the Coffee Shop, the Cottage, the Modern House and the Ruins.",decoding:"async"}),Q.map(a=>e.jsxs(j.button,{variants:We,className:`ss-map-pin${a.flip?" flip":""}${o===a.id?" on":""}`+(o===a.id&&x?.covered?" hushed":""),style:{left:a.x+"%",top:a.y+"%",x:"-50%",y:"-50%"},onMouseEnter:()=>{u||b(a.id)},onMouseLeave:()=>{u||b(null)},onFocus:()=>b(a.id),onClick:()=>{const w=o===a.id&&u;k(!w),b(w?null:a.id)},"aria-label":a.name+", "+a.cat,children:[e.jsx("span",{className:"ss-map-stud","aria-hidden":!0}),e.jsx("span",{className:"ss-map-tag",children:a.cat})]},a.id))]})]}),T()]});function c(a){if(!n.w||!s.w)return;const w=10,S=20,N=16,C=Math.min(n.w*.28,306),A=f||C*9/16+104,L=R=>({x:s.left+s.w*R.x/100,y:s.top+s.h*R.y/100}),I=L(a),_=Q.filter(R=>R.id!==a.id).map(L),P=a.x<50,d=a.y<55,y=[[P,d],[P,!d],[!P,d],[!P,!d]];let v=null;for(const[R,z]of y){const H=Math.min(w,m.l),U=Math.max(n.w-w,m.r),W=Math.max(H,Math.min(R?I.x+S:I.x-S-C,U-C)),G=Math.max(w,Math.min(z?I.y+S:I.y-S-A,n.h-A-w));let V=10*_.filter($=>$.x>W-N&&$.x<W+C+N&&$.y>G-N&&$.y<G+A+N).length;const ee=14+7.6*a.cat.length,te=a.flip?I.x-10-ee:I.x+10,se=te<W+C+4&&te+ee>W-4&&I.y-11<G+A+4&&I.y+11>G-4;se&&V++;const ae={left:W,top:G,hits:V,tag:se};if(!V){v=ae;break}(!v||V<v.hits)&&(v=ae)}return{style:{left:v.left,top:v.top,right:"auto",bottom:"auto"},covered:v.tag}}function T(){return e.jsx(Z,{children:E&&e.jsxs(j.div,{ref:h,className:"ss-map-card",style:x?.style,variants:Ge,initial:"hidden",animate:"show",exit:{opacity:0,transition:{duration:.16}},children:[e.jsx("img",{src:E.src,alt:E.name,decoding:"async"}),e.jsxs("div",{className:"ss-map-card-body",children:[e.jsx("span",{className:"ss-map-card-name",children:E.name}),e.jsx("p",{children:E.line})]})]},E.id)})}}function Y({id:t,label:h,className:s,stagger:l,children:n}){const i=l?{hidden:{},show:{transition:{staggerChildren:.04,delayChildren:0}}}:Me;return e.jsx(j.section,{className:`ss-slide ss-snap${s?" "+s:""}`,"data-slide":t,"data-label":h,tabIndex:t==="open"?-1:void 0,variants:i,initial:"hidden",whileInView:"show",viewport:{amount:.2,once:!0},children:e.jsx("div",{className:"ss-slide-inner",children:n})})}function Ve(t){const[h,s]=r.useState(B?1:0);return r.useEffect(()=>{if(B)return;const l=t.current;if(!l)return;const n=l.closest(".ss-home-scroll");let i=0;const m=()=>{i=0;const f=window.innerHeight||1,p=l.getBoundingClientRect(),o=(f-p.top)/Math.max(1,p.height*.75);s(o<0?0:o>1?1:o)},g=()=>{i||(i=requestAnimationFrame(m))};return(n||window).addEventListener("scroll",g,{passive:!0}),window.addEventListener("resize",g),m(),()=>{i&&cancelAnimationFrame(i),(n||window).removeEventListener("scroll",g),window.removeEventListener("resize",g)}},[t]),h}function $e({text:t,p:h}){const s=t.split(" "),l=s.length;return e.jsx(e.Fragment,{children:s.map((n,i)=>{const m=i/l*.82,g=Math.min(1,Math.max(0,(h-m)/.2));return e.jsxs("span",{style:{color:`rgba(245,242,237,${(.22+.56*g).toFixed(3)})`,transition:"color .12s linear"},children:[n,i<l-1?" ":""]},n+i)})})}function he({kicker:t,body:h,pair:s,children:l}){const n=e.jsx(q,{className:"ss-story-kicker",text:t,variant:fe,stagger:.055}),i=r.useRef(null),m=Ve(i),g=e.jsx($e,{text:h,p:m});return s?e.jsxs("div",{className:"ss-chapter-head",children:[e.jsx("div",{children:n}),e.jsx("div",{className:"ss-chapter-body",ref:i,children:g})]}):e.jsxs("div",{className:"ss-chapter-stack",children:[n,e.jsx("div",{className:"ss-chapter-body",ref:i,children:g}),l]})}function Je({scrollRef:t}){const[h,s]=r.useState([]),[l,n]=r.useState(0),i=r.useRef([]);r.useEffect(()=>{const f=t.current;if(!f)return;const p=Array.from(f.querySelectorAll("[data-slide]"));i.current=p,s(p.map(b=>({id:b.dataset.slide||"",label:b.dataset.label||""})));const o=new IntersectionObserver(b=>{for(const u of b)if(u.isIntersecting){const k=i.current.indexOf(u.target);k>=0&&n(k)}},{root:null,rootMargin:"-48% 0px -48% 0px",threshold:0});return p.forEach(b=>o.observe(b)),()=>o.disconnect()},[t]);const m=f=>{const p=t.current,o=i.current[f];!p||!o||p.scrollTo({top:p.scrollTop+o.getBoundingClientRect().top-p.getBoundingClientRect().top,behavior:B?"auto":"smooth"})};if(h.length<2)return null;const g=l>0;return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`ss-deck-rail${g?" on":""}`,"aria-hidden":!g,children:h.map((f,p)=>e.jsx("button",{type:"button",className:`ss-deck-tick${p===l?" on":""}`,onClick:()=>m(p),"aria-label":f.label,"aria-current":p===l,style:{cursor:"inherit"},children:e.jsx("span",{className:"ss-deck-tip",children:f.label})},f.id))}),e.jsxs("div",{className:`ss-deck-count${g?" on":""}`,children:[e.jsx("b",{children:String(l+1).padStart(2,"0")})," / ",String(h.length).padStart(2,"0")]})]})}function pe({index:t,orbit:h,radius:s,style:l,...n}){const i=ie(h,g=>{const f=(t-g)*2*Math.PI/M.length,p=Math.sin(f)*s/Math.sin(2*Math.PI/M.length),o=(Math.cos(f)-1)*220;return`translate3d(${p}px,0,${o}px) rotateY(${-Math.sin(f)*34}deg) scale(${.9+.1*Math.cos(f)})`}),m=ie(h,g=>Math.round((Math.cos((t-g)*2*Math.PI/M.length)+1)*100)+1);return e.jsx(j.div,{...n,draggable:!1,onDragStart:g=>g.preventDefault(),style:{...l,transform:i,zIndex:m,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden"}})}function Ye({onCardClick:t}){const h=O(),[s,l]=r.useState({width:window.innerWidth,height:window.innerHeight}),n=s.width>=1024;r.useEffect(()=>{const d=()=>{l({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);const i=M.length,[m,g]=r.useState(0),f=(m%i+i)%i,p=ye(0),[o,b]=r.useState(!1),u=d=>{p.stop(),b(!0),xe(p,d,{duration:B?0:.72,ease:[.42,0,.22,1],onComplete:()=>{g(d),b(!1)}})};r.useEffect(()=>()=>p.stop(),[p]);const k=d=>{u(d+Math.round((p.get()-d)/i)*i)},E=r.useRef(null),x=r.useRef(!1),c=r.useRef(null);r.useEffect(()=>{const d=c.current;if(!d)return;let y=0,v=!1,R=0;const z=H=>{if(H.ctrlKey||Math.abs(H.deltaX)<=Math.abs(H.deltaY))return;H.preventDefault();const U=performance.now();U-R>180&&(y=0,v=!1),R=U,y+=H.deltaX*(H.deltaMode===1?16:H.deltaMode===2?d.clientWidth:1),!v&&Math.abs(y)>=32&&(v=!0,u(Math.round(p.get())+Math.sign(y)))};return d.addEventListener("wheel",z,{passive:!1}),()=>d.removeEventListener("wheel",z)},[p]);const T=d=>u(Math.round(p.get())+d),a=s.width<=640,w=n?380:Math.min(s.width*(a?.64:.7),a?290:330),S=Math.min(w*1.32,Math.max(a?230:290,s.height*(a?.42:.5))),N=w*(n?1.4:a?1.08:1.24),C={"creative-projects":{base:"#171619",glow:"radial-gradient(ellipse 70% 72% at 46% 43%, rgba(89,62,108,.34) 0%, rgba(61,48,70,.17) 40%, transparent 78%)"},"professional-services":{base:"#d9d2df",glow:"radial-gradient(ellipse 80% 85% at 72% 58%, rgba(125,78,164,.36) 0%, rgba(125,78,164,.14) 48%, transparent 85%), radial-gradient(ellipse 62% 70% at 18% 22%, rgba(246,242,247,.75) 0%, transparent 85%)"},nabu:{base:"#0a1020",glow:"radial-gradient(ellipse 76% 70% at 42% 40%, rgba(84,120,157,.29) 0%, rgba(43,53,105,.16) 45%, transparent 80%)"}},A=M[f]?.id,L=A==="professional-services",I=L?"#14110b":"var(--white)",_=L?"0 1px 12px rgba(255,255,255,.6)":"0 1px 14px rgba(0,0,0,.6)",P=C[A]||C["creative-projects"];return e.jsx(j.div,{className:"ss-work-page",style:{position:"absolute",inset:0,overflowX:"hidden",overflowY:"auto",overscrollBehaviorY:"none",background:"#0c0d0f"},children:e.jsxs("div",{className:"ss-work-layout",style:{position:"relative",minHeight:"max(660px, 100dvh)",overflow:"hidden"},children:[e.jsx(j.div,{"aria-hidden":"true",animate:{backgroundColor:P.base},transition:{duration:B?0:.65},style:{position:"absolute",inset:0,pointerEvents:"none"}}),Object.entries(C).map(([d,y])=>e.jsx(j.div,{"aria-hidden":"true",animate:{opacity:d===A?1:0},transition:{duration:B?0:.65},style:{position:"absolute",inset:0,pointerEvents:"none",background:y.glow}},d)),e.jsxs("div",{style:{position:"absolute",top:0,left:0,padding:"115px 5vw 0",zIndex:10,maxWidth:780},children:[e.jsx(j.h2,{initial:!1,animate:{opacity:1,y:0},transition:{duration:.34,delay:.04,ease:D},style:{fontFamily:"var(--sf)",fontSize:"clamp(38px,5vw,64px)",letterSpacing:"-0.065em",fontWeight:550,lineHeight:1,color:I,textShadow:_,transition:"color 0.7s ease"},children:"Work"}),e.jsx("p",{id:"ss-work-hint",style:{marginTop:14,maxWidth:290,fontSize:14,lineHeight:1.5,color:I,opacity:.75,transition:"color .7s ease"},children:"Swipe or drag to browse. Select a project to view."})]}),e.jsx("div",{ref:c,className:"ss-work-carousel","aria-describedby":"ss-work-hint",role:"region","aria-label":"Work categories","aria-roledescription":"carousel",style:{position:"absolute",left:0,right:0,top:a?`max(${230+S/2}px, 50%)`:"50%",height:S+64,transform:"translateY(-50%)",display:"flex",alignItems:"center",justifyContent:"center",perspective:1100,touchAction:"pan-y pinch-zoom",userSelect:"none"},onPointerDown:d=>{!d.isPrimary||d.button!==0||E.current||(E.current={id:d.pointerId,x:d.clientX,y:d.clientY,dragging:!1,orbitStart:p.get()},x.current=!1)},onPointerMove:d=>{const y=E.current;if(!y||y.id!==d.pointerId)return;const v=d.clientX-y.x,R=d.clientY-y.y;Math.hypot(v,R)>8&&(x.current=!0),!y.dragging&&Math.abs(v)>8&&Math.abs(v)>Math.abs(R)*1.15&&(y.dragging=!0,p.stop(),b(!0),y.orbitStart=p.get(),d.currentTarget.setPointerCapture(d.pointerId)),y.dragging&&p.set(y.orbitStart-Math.max(-.65,Math.min(.65,v*.65/w)))},onPointerUp:d=>{const y=E.current;if(!y||y.id!==d.pointerId)return;const v=d.clientX-y.x,R=d.clientY-y.y;y.dragging&&Math.abs(v)>=Math.max(22,w*.08)&&Math.abs(v)>Math.abs(R)*1.15?u(Math.round(y.orbitStart)+(v<0?1:-1)):y.dragging&&u(Math.round(p.get())),E.current=null,d.currentTarget.hasPointerCapture(d.pointerId)&&d.currentTarget.releasePointerCapture(d.pointerId)},onPointerCancel:()=>{E.current=null,x.current=!0,u(Math.round(p.get()))},onLostPointerCapture:d=>{E.current?.id===d.pointerId&&(E.current=null,x.current=!0,u(Math.round(p.get())))},onClickCapture:d=>{x.current&&d.detail!==0&&(d.preventDefault(),d.stopPropagation())},onKeyDown:d=>{if(d.key==="ArrowLeft"||d.key==="ArrowRight"){d.preventDefault();const y=(f+(d.key==="ArrowRight"?1:-1)+i)%i,v=d.currentTarget;k(y),requestAnimationFrame(()=>v.querySelectorAll('[role="button"]')[y]?.focus({preventScroll:!0}))}},children:M.map((d,y)=>{const v=(y-f+i)%i;return d.id==="nabu"?e.jsxs(pe,{index:y,orbit:p,radius:N,className:"ss-project-card ss-project-card-nabu","data-active":v===0&&!o,role:"button",tabIndex:0,"aria-label":`${v===0?"Open":"Select"} ${d.title}`,onKeyDown:R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),v===0&&!o?t(d):k(y))},onClick:()=>{x.current||(v===0&&!o?t(d):k(y))},...h,style:{position:"absolute",width:w,height:S,cursor:"inherit",transformStyle:"flat",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("img",{src:d.img,alt:d.title,style:{width:"100%",height:"78%",objectFit:"contain",objectPosition:"center",transform:`translate(${-Math.min(w,S*.78)*25.5/1080}px, ${-Math.min(w,S*.78)*16/1080}px)`,display:"block",pointerEvents:"none",filter:"drop-shadow(0 26px 55px rgba(0,0,0,.55))",transition:"filter .5s ease"}}),e.jsx("div",{style:{textAlign:"center",marginTop:14,pointerEvents:"none"},children:e.jsx("div",{style:{fontSize:24,letterSpacing:-.3,color:I,lineHeight:1.05,fontWeight:600,transition:"color 0.7s ease"},children:d.title})})]},d.id):e.jsxs(pe,{index:y,orbit:p,radius:N,role:"button",tabIndex:0,"aria-label":`${v===0?"Open":"Select"} ${d.title}`,onKeyDown:R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),v===0&&!o?t(d):k(y))},className:"ss-card ss-project-card","data-active":v===0&&!o,onClick:()=>{x.current||(v===0&&!o?t(d):k(y))},...h,style:{position:"absolute",width:w,height:S,borderRadius:22,overflow:"hidden",background:"#111",cursor:"inherit",boxShadow:"0 30px 65px rgba(0,0,0,.5)",transformStyle:"flat"},children:[e.jsx("img",{src:d.img,alt:d.title,style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:d.objectPosition||"center",display:"block",pointerEvents:"none",filter:"brightness(0.95)",transition:"filter .5s ease"}}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(6,6,6,.92) 0%, rgba(6,6,6,.4) 42%, rgba(6,6,6,0) 78%)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:a?"18px 16px":"24px 22px",pointerEvents:"none"},children:e.jsx("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:10},children:e.jsx("div",{style:{fontSize:24,letterSpacing:-.3,color:"var(--white)",lineHeight:1.05,fontWeight:600},children:d.title})})})]},d.id)})}),e.jsxs("div",{className:"ss-work-controls",style:{position:"absolute",bottom:a?20:28,left:0,right:0,display:"flex",justifyContent:"center",alignItems:"center",gap:8,zIndex:20},children:[e.jsx("button",{type:"button","aria-label":"Previous category",onClick:()=>T(-1),style:{color:I,width:44,height:44},children:"←"}),M.map((d,y)=>e.jsx("button",{type:"button","aria-label":`Show ${d.title}`,"aria-pressed":y===f,onClick:()=>k(y),style:{width:44,height:44,display:"grid",placeItems:"center"},children:e.jsx("span",{style:{display:"block",width:y===f?26:8,height:8,borderRadius:980,background:y===f?"#38bdf8":L?"#777":"#aaa",transition:"width .3s ease"}})},d.id)),e.jsx("button",{type:"button","aria-label":"Next category",onClick:()=>T(1),style:{color:I,width:44,height:44},children:"→"})]})]})},"work")}function qe(){const t=O(),h=[{href:"mailto:shyon2001@gmail.com",label:"Email Me",value:"shyon2001@gmail.com",icon:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:e.jsx("path",{d:"M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1"})})},{href:"https://www.linkedin.com/in/shyonshiri/",label:"LinkedIn",value:"in/shyonshiri",target:"_blank",icon:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("path",{d:"M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"})})},{href:"/My Resume.pdf",label:"Résumé",value:"My Resume.pdf",target:"_blank",icon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:[e.jsx("path",{d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"}),e.jsx("polyline",{points:"14 2 14 8 20 8"}),e.jsx("line",{x1:"16",y1:"13",x2:"8",y2:"13"}),e.jsx("line",{x1:"16",y1:"17",x2:"8",y2:"17"})]})}];return e.jsxs(j.div,{className:"ss-contact-page",style:{position:"absolute",inset:0,background:"#060606",display:"flex",flexDirection:"column",justifyContent:"center",overflow:"hidden"},children:[e.jsxs("div",{"aria-hidden":"true",style:{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"},children:[e.jsx("div",{style:{position:"absolute",left:-30,bottom:"-12vh",fontFamily:"var(--sf)",fontSize:"clamp(220px, 34vw, 460px)",lineHeight:.8,letterSpacing:6,color:"rgba(245,242,237,.05)",whiteSpace:"nowrap",filter:"blur(9px)",zIndex:1,userSelect:"none",pointerEvents:"none"},children:"CONTACT"}),e.jsx("div",{style:{position:"absolute",right:"-12vw",top:"-22vh",width:"min(900px, 100vw)",height:"min(900px, 100vw)",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,.35) 0%, rgba(56,189,248,0) 65%)",filter:"blur(65px)",zIndex:1,pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",left:"-15vw",bottom:"-25vh",width:"min(1100px, 120vw)",height:"min(1100px, 120vw)",borderRadius:"50%",background:"radial-gradient(circle, rgba(56,189,248,.15) 0%, rgba(56,189,248,0) 60%)",filter:"blur(75px)",zIndex:1,pointerEvents:"none"}})]}),e.jsxs("div",{className:"ss-contact-content",style:{position:"relative",zIndex:10,width:"100%"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:window.innerWidth<=640?20:40,flexWrap:"wrap",marginBottom:window.innerWidth<=640?24:44},children:[e.jsx("div",{children:e.jsxs(j.h2,{initial:!1,animate:{opacity:1,y:0},transition:{duration:.34,delay:.04,ease:D},className:"ss-contact-heading",style:{fontFamily:"var(--sf)",fontSize:"clamp(46px,6.2vw,96px)",fontWeight:550,letterSpacing:"-0.065em",lineHeight:1,color:"var(--white)"},children:["Get in Touch",e.jsx("span",{style:{color:"var(--white)"},children:"."})]})}),e.jsx(j.p,{initial:!1,animate:{opacity:1},transition:{duration:.34,delay:.04},className:"ss-contact-description",style:{fontFamily:"var(--sf)",fontWeight:400,fontSize:"clamp(15px,1.5vw,18px)",lineHeight:1.5,letterSpacing:"-0.005em",color:"var(--mid)",maxWidth:300,textAlign:"right",marginBottom:8},children:"Open to freelance work, collaborations, and full-time roles."})]}),e.jsx(j.div,{initial:!1,animate:{opacity:1,y:0},transition:{duration:.34,delay:.04,ease:D},style:{display:"flex",flexDirection:"column",borderTop:"1px solid rgba(245,242,237,.14)"},children:h.map(s=>e.jsxs("a",{className:"ss-contact-entry",href:s.href,target:s.target,rel:s.target?"noopener noreferrer":void 0,style:{display:"flex",alignItems:"center",gap:window.innerWidth<=640?16:28,padding:window.innerWidth<=640?"16px 8px":"26px 8px",textDecoration:"none",borderBottom:"1px solid rgba(245,242,237,.14)",transition:"background 0.3s ease, padding-left 0.3s ease",cursor:"inherit"},...t,children:[e.jsx("span",{style:{fontFamily:"var(--sf)",fontSize:window.innerWidth<=640?"clamp(15px,2.4vw,21px)":"clamp(21px,2.8vw,30px)",fontWeight:600,letterSpacing:"-0.02em",color:"var(--white)",width:window.innerWidth<=640?"auto":240,flexShrink:0},children:s.label}),e.jsx("span",{style:{fontFamily:"var(--sf)",fontSize:window.innerWidth<=640?13.5:17,fontWeight:400,letterSpacing:"-0.005em",color:"var(--mid)",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:s.value}),e.jsx("span",{style:{fontFamily:"var(--sf)",fontSize:17,color:"var(--sky)",flexShrink:0},children:"→"})]},s.label))})]})]},"contact")}function Ke({project:t,onClose:h,onMediaClick:s,inactive:l=!1}){const n=O(),[i,m]=r.useState(""),[g,f]=r.useState("all"),p=t.media.filter(c=>!c.hidden),o=p.filter(c=>(g==="all"||c.type===g)&&`${c.title||""} ${c.desc||""} ${c.year||""}`.toLowerCase().includes(i.trim().toLowerCase())),b=()=>{m(""),f("all")},u=r.useRef(null);r.useLayoutEffect(()=>{u.current&&(u.current.inert=l)},[l]),r.useEffect(()=>{const c=Array.from(document.querySelectorAll('[role="button"][aria-label]')).find(w=>w.getAttribute("aria-label")===`Open ${t.title}`)||document.activeElement,T=u.current;T?.querySelector("button")?.focus({preventScroll:!0});const a=w=>{if(w.key!=="Tab"||!T)return;const S=Array.from(T.querySelectorAll('button, input, a[href], video[controls], [tabindex="0"]')).filter(A=>!A.matches(':disabled, [tabindex="-1"]')&&A.getClientRects().length>0),N=S[0],C=S[S.length-1];w.shiftKey&&document.activeElement===N?(w.preventDefault(),C?.focus()):!w.shiftKey&&document.activeElement===C&&(w.preventDefault(),N?.focus())};return T?.addEventListener("keydown",a),()=>{T?.removeEventListener("keydown",a),requestAnimationFrame(()=>{c?.isConnected&&c.focus({preventScroll:!0})})}},[]);const[k,E]=r.useState(window.innerWidth),x=k>=1024;return r.useEffect(()=>(document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}),[]),r.useEffect(()=>{const c=()=>{E(window.innerWidth)};return window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),e.jsx(j.div,{ref:u,role:"dialog","aria-modal":!l,"aria-hidden":l?!0:void 0,"aria-label":t.title,initial:{opacity:0},animate:{opacity:1,pointerEvents:"auto"},exit:{opacity:0,pointerEvents:"none"},transition:{duration:B?.001:.4},onClick:h,style:{position:"fixed",inset:0,zIndex:11e3,background:"rgba(6,6,6,.93)",backdropFilter:"blur(20px)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(j.div,{initial:{opacity:0,scale:B?1:.96},animate:{opacity:1,scale:1},exit:{opacity:0,scale:B?1:.96},transition:{duration:B?.001:.4,ease:D},onClick:c=>c.stopPropagation(),className:"ss-work-modal",style:{position:"relative",width:"76vw",maxWidth:1080,maxHeight:"80dvh",display:"flex",flexDirection:"column"},children:[e.jsx("button",{onClick:h,className:"ss-modal-close","aria-label":"Close project gallery",style:{position:"absolute",top:60,right:20,background:"none",border:"none",cursor:"inherit",fontFamily:"var(--sf)",fontSize:13,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"#b5b3b0",transition:"color 0.3s ease",padding:"4px 8px",zIndex:2001},...n,children:"✕ Close"}),e.jsx("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",paddingBottom:18,borderBottom:"1px solid rgba(245,242,237,.1)",marginBottom:22},children:e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{fontSize:"clamp(36px,4.4vw,64px)",letterSpacing:"-0.02em",fontWeight:700,lineHeight:1,color:"var(--white)"},children:t.title}),e.jsx("div",{style:{fontFamily:"var(--sf)",fontSize:15,fontWeight:400,lineHeight:1.5,letterSpacing:"-0.005em",color:"var(--sky)",marginTop:10},children:t.id==="creative-projects"?"Coursework and independent projects in 3D, physical objects, electronics, and image-making.":t.id==="professional-services"?"Websites, identities, and print work made for clients.":t.id==="nabu"?"Design and creative direction for NABU, a streetwear brand that draws from Persian and Assyrian heritage.":""})]})}),e.jsxs("div",{className:"ss-gallery-tools",children:[e.jsx("label",{className:"ss-gallery-search",children:e.jsx("input",{type:"search","aria-label":"Search projects",placeholder:"Search projects",value:i,onChange:c=>m(c.target.value)})}),e.jsx("div",{className:"ss-gallery-filters",role:"group","aria-label":"Media type",children:["all","image","video"].map(c=>e.jsx("button",{type:"button","aria-pressed":g===c,onClick:()=>f(c),children:c==="all"?"All":c==="image"?"Images":"Videos"},c))})]}),e.jsxs("p",{className:"ss-gallery-count",role:"status",children:[o.length," of ",p.length," projects"]}),o.length===0&&e.jsxs("div",{className:"ss-gallery-empty",children:["No projects match your search.",e.jsx("button",{onClick:b,children:"Clear Filters"})]}),["creative-projects","professional-services"].includes(t.id)?e.jsxs("div",{style:{position:"relative",flex:1,minHeight:0,display:"flex",flexDirection:"column"},children:[e.jsx("div",{className:"ss-scroll",style:{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden",paddingRight:8,display:"flex",gap:14,alignItems:"flex-start"},children:(()=>{const c=o,T=k<=640?2:k<=1023?3:4,a=Array.from({length:T},()=>[]);return c.forEach((w,S)=>a[S%T].push(w)),a.map((w,S)=>e.jsx("div",{style:{flex:1,minWidth:0,display:"flex",flexDirection:"column",gap:14},children:w.map((N,C)=>e.jsx(Xe,{item:N,onClick:()=>s(N)},C))},S))})()}),e.jsx("div",{className:"ss-scroll-fade"})]}):e.jsx("div",{className:"ss-modal-grid",style:{display:"grid",gridTemplateColumns:t.id==="3d-rendering"?"repeat(3, 240px)":t.id==="fabrication"?"repeat(1, 420px)":["3d-modelling","programming"].includes(t.id)?"repeat(2, 300px)":"repeat(4, minmax(0, 220px))",gap:38,overflowY:"auto",overflowX:"hidden",maxHeight:"calc(80dvh - 150px)",paddingRight:8,justifyContent:"center",gridAutoRows:"max-content"},children:o.map((c,T)=>e.jsx(Qe,{item:c,onClick:()=>s(c)},T))}),!x&&e.jsx("div",{style:{marginTop:24,textAlign:"center",fontFamily:"var(--sf)",fontSize:10,letterSpacing:1,color:"#b5b3b0",textTransform:"uppercase"},children:"Scroll to browse."})]})})}function Xe({item:t,onClick:h}){const s=O(),l=t.aspectRatio||"4/3";return e.jsxs("button",{type:"button","aria-label":`View ${t.title}`,className:"ss-scell",onClick:n=>{n.currentTarget.focus({preventScroll:!0}),h()},...s,children:[e.jsxs("div",{className:"ss-sthumb",style:{aspectRatio:l},children:[e.jsx("img",{src:t.type==="video"?t.poster:t.src,alt:t.title,loading:"lazy"}),t.type==="video"&&e.jsx("div",{style:{position:"absolute",top:12,right:12,width:34,height:34,borderRadius:"50%",background:"rgba(6,6,6,.5)",border:"1px solid rgba(245,242,237,.35)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)"},children:e.jsx("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"var(--white)",style:{marginLeft:2},children:e.jsx("path",{d:"M8 5v14l11-7z"})})})]}),e.jsxs("div",{className:"ss-sbody",children:[e.jsx("div",{className:"ss-asset-title",style:{fontSize:13,fontWeight:600,color:"var(--white)",lineHeight:1.25},children:t.title}),e.jsxs("div",{style:{fontFamily:"var(--sf)",fontSize:13,fontWeight:500,fontVariantNumeric:"tabular-nums",color:"#b5b3b0",marginTop:4},children:[t.year,t.credit&&e.jsx("span",{style:{display:"block",lineHeight:1.5},children:t.credit})]})]})]})}function Qe({item:t,onClick:h}){const s=O();return e.jsxs("button",{type:"button","aria-label":`View ${t.title}`,className:"ss-tile",onClick:l=>{l.currentTarget.focus({preventScroll:!0}),h()},style:{position:"relative",overflow:"hidden",background:"#111",minHeight:t.type==="video"?"250px":"auto",cursor:"inherit",borderRadius:12,aspectRatio:t.aspectRatio?t.aspectRatio:void 0},...s,children:[t.type==="video"?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:t.poster,alt:t.title,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(6,6,6,.3)",transition:"background 0.3s ease"},children:e.jsx("div",{style:{width:52,height:52,borderRadius:"50%",border:"1.5px solid rgba(245,242,237,.7)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.3s ease, border-color 0.3s ease"},children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"var(--white)",style:{marginLeft:3},children:e.jsx("path",{d:"M8 5v14l11-7z"})})})})]}):e.jsx("img",{src:t.src,alt:t.title,loading:"lazy",style:{width:"100%",height:"100%",objectFit:t.aspectRatio?"cover":"contain"}}),e.jsxs("div",{style:{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 14px",background:"linear-gradient(to top, rgba(6,6,6,.85) 0%, transparent 100%)",opacity:0,transition:"opacity 0.3s ease"},className:"ss-tile-info",children:[e.jsx("div",{className:"ss-asset-title",style:{fontSize:14,color:"var(--white)",fontWeight:600},children:t.title}),e.jsxs("div",{style:{fontFamily:"var(--sf)",fontSize:13,fontWeight:500,fontVariantNumeric:"tabular-nums",color:"var(--sky)",marginTop:2},children:[t.year,t.credit&&e.jsx("span",{style:{display:"block",lineHeight:1.5},children:t.credit})]})]})]})}function Ze({pages:t,title:h,labels:s,comparisonCredit:l}){const n=r.useRef(null),[i,m]=r.useState(0),g=r.useRef(0),f=me(),p=o=>{const b=n.current;b&&b.scrollTo({left:Math.max(0,Math.min(t.length-1,o))*b.clientWidth,behavior:f?"instant":"smooth"})};return r.useEffect(()=>{const o=n.current;if(!o)return;const b=new ResizeObserver(()=>o.scrollTo({left:g.current*o.clientWidth,behavior:"instant"}));return b.observe(o),()=>b.disconnect()},[]),e.jsxs("div",{className:"ss-booklet-reader",children:[e.jsx("div",{ref:n,className:"ss-booklet-track",tabIndex:0,role:"region","aria-label":`${h}, scroll through ${s?"pieces":"pages"}`,onScroll:o=>{g.current=Math.round(o.currentTarget.scrollLeft/o.currentTarget.clientWidth),m(g.current)},onKeyDown:o=>{(o.key==="ArrowRight"||o.key==="ArrowLeft")&&(o.preventDefault(),p(i+(o.key==="ArrowRight"?1:-1)))},children:t.map((o,b)=>e.jsx("figure",{className:"ss-booklet-page",children:l&&b===1?e.jsxs("div",{className:"ss-art-comparison",children:[e.jsx("div",{className:"ss-art-comparison-pair",children:[{src:o,label:"Original Cover"},{src:t[0],label:"LEGO Homage"}].map(u=>e.jsxs("div",{className:"ss-art-comparison-item",children:[e.jsx("div",{className:"ss-art-comparison-image",children:e.jsx("img",{src:u.src,alt:`${h}, ${u.label}`,loading:"lazy"})}),e.jsx("p",{children:u.label})]},u.label))}),e.jsx("p",{className:"ss-art-comparison-credit",children:l})]}):e.jsx("img",{src:o,alt:s?.[b]?`${h}, ${s[b]}`:`${h}, page ${b+1} of ${t.length}`,loading:b?"lazy":"eager"})},o))}),e.jsxs("div",{className:"ss-booklet-controls",children:[e.jsx("button",{onClick:()=>p(i-1),disabled:i===0,"aria-label":s?"Previous piece":"Previous booklet page",children:"←"}),e.jsx("span",{"aria-live":"polite",children:s?`${s[i]} · ${i+1} of ${t.length}`:`Page ${i+1} of ${t.length}`}),e.jsx("button",{onClick:()=>p(i+1),disabled:i===t.length-1,"aria-label":s?"Next piece":"Next booklet page",children:"→"})]})]})}function et({item:t,onClose:h,onItemClick:s}){const l=O(),[n,i]=r.useState("");r.useEffect(()=>{i("")},[t.src]);const m=async()=>{try{await navigator.clipboard.writeText(window.location.href),i("Project link copied.")}catch{i("Copy the project link from your browser’s address bar.")}},g=r.useRef(null);r.useEffect(()=>{const k=Array.from(document.querySelectorAll(".ss-work-modal button[aria-label]")).find(c=>c.getAttribute("aria-label")===`View ${t.title}`)||document.activeElement,E=g.current;E?.querySelector("button")?.focus({preventScroll:!0});const x=c=>{if(c.key!=="Tab"||!E)return;const T=Array.from(E.querySelectorAll('button, a[href], video[controls], [tabindex="0"]')).filter(S=>!S.matches(':disabled, [tabindex="-1"]')&&S.getClientRects().length>0),a=T[0],w=T[T.length-1];c.shiftKey&&document.activeElement===a?(c.preventDefault(),w?.focus()):!c.shiftKey&&document.activeElement===w&&(c.preventDefault(),a?.focus())};return E?.addEventListener("keydown",x),()=>{E?.removeEventListener("keydown",x),requestAnimationFrame(()=>{k?.isConnected&&k.focus({preventScroll:!0})})}},[]);const[f,p]=r.useState({src:t.src,index:0});r.useEffect(()=>{p({src:t.src,index:0})},[t.src]);const o=f.src===t.src?f.index:0,b=t.builds?.[o],u=b?{...t,...b}:t;return e.jsxs(j.div,{ref:g,role:"dialog","aria-modal":"true","aria-labelledby":"ss-viewer-title",initial:{opacity:0},animate:{opacity:1,pointerEvents:"auto"},exit:{opacity:0,pointerEvents:"none"},transition:{duration:B?.001:.25},onClick:h,style:{position:"fixed",inset:0,zIndex:12e3,background:"rgba(6,6,6,.97)",backdropFilter:"blur(30px)",display:"flex",alignItems:"center",justifyContent:"center"},children:[e.jsx("button",{onClick:h,className:"ss-media-viewer-close","aria-label":"Close asset viewer",...l,children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"m6 6 12 12M18 6 6 18",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round"})})}),e.jsxs("div",{onClick:k=>k.stopPropagation(),className:"ss-media-viewer",children:[e.jsxs("div",{className:"ss-viewer-media",children:[e.jsx("div",{className:`ss-viewer-canvas${u.pages?" ss-booklet-media":""}`,style:{"--asset-ratio":u.aspectRatio||"4/3"},children:u.pages?e.jsx(Ze,{pages:u.pages,title:u.title,labels:u.pageLabels,comparisonCredit:u.comparisonCredit},u.src):u.type==="video"?e.jsx("video",{src:u.src,poster:u.poster,onLoadedMetadata:k=>{k.currentTarget.defaultPlaybackRate=u.playbackRate??1,k.currentTarget.playbackRate=u.playbackRate??1},controls:!0,autoPlay:!0,muted:!0,playsInline:!0,style:{width:"100%",height:"100%",objectFit:"contain",maxWidth:"100%",maxHeight:"100%",display:"block"}},u.src):e.jsx("img",{src:u.src,alt:u.title,style:{width:"100%",height:"100%",objectFit:"contain",transform:u.scale?`scale(${u.scale})`:"scale(1)"}},u.src)}),t.builds&&e.jsxs("div",{className:"ss-booklet-controls",role:"group","aria-label":`${t.title} build comparison`,children:[e.jsx("button",{"aria-label":"Show original build",disabled:o===0,onClick:()=>p({src:t.src,index:o-1}),...l,children:"←"}),e.jsxs("span",{"aria-live":"polite",children:[b?.label," · ",o+1," of ",t.builds.length]}),e.jsx("button",{"aria-label":"Show redesigned build",disabled:o===t.builds.length-1,onClick:()=>p({src:t.src,index:o+1}),...l,children:"→"})]})]}),e.jsxs("div",{className:"ss-viewer-info",children:[e.jsx("button",{type:"button",className:"ss-copy-link",onClick:m,children:"Copy Project Link"}),e.jsx("span",{className:"ss-share-status",role:"status",children:n}),e.jsx("div",{id:"ss-viewer-title",className:"ss-asset-title",children:t.title}),e.jsxs("div",{style:{fontFamily:"var(--sf)",fontSize:13,fontWeight:600,letterSpacing:"0.06em",color:"var(--sky)",textTransform:"uppercase",marginBottom:20},children:[t.year,t.credit&&e.jsx("div",{style:{marginTop:8,textTransform:"none",letterSpacing:0,lineHeight:1.5,color:"#b5b3b0"},children:t.credit})]}),t.desc&&e.jsx("p",{style:{fontFamily:"var(--sf)",fontSize:16,lineHeight:1.55,letterSpacing:"-0.005em",color:"rgba(245,242,237,.75)",fontWeight:400,marginBottom:32},children:t.desc}),t.relatedItems&&t.relatedItems.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,marginTop:48},children:t.relatedItems.map((k,E)=>e.jsxs("button",{onClick:()=>{const x=M.flatMap(c=>c.media).find(c=>c.title===k);x&&s&&s(x)},style:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"var(--sf)",fontSize:13,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--sky)",background:"none",border:"none",borderBottom:"1px solid var(--sky)",paddingBottom:2,cursor:"inherit",textDecoration:"none",textAlign:"left"},...l,children:["View ",k," →"]},E))}):null,t.link&&e.jsx("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,marginTop:28,fontFamily:"var(--sf)",fontSize:13,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--sky)",textDecoration:"none",borderBottom:"1px solid var(--sky)",paddingBottom:2,cursor:"inherit"},...l,children:"Visit Website →"})]})]})]})}ke.createRoot(document.getElementById("root")).render(e.jsx(r.StrictMode,{children:e.jsx(Re,{})}));
