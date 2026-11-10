// === Traductions EN (le francais est le texte par defaut du HTML) ===
const EN={s0:"PORTFOLIO / 2026",h1:"Meva Rabe Harinoro",role:"Full-stack / mobile developer in training",
 hook:"I build useful apps, with an urban planner's eye. Scroll to cross the city.",
 rw:"Let's rewind",rw1:"Where it starts",
 rwt:"Based in Mauritius, with roots in Madagascar, bilingual. Curious by nature, I like turning an idea into a prototype that actually serves people.",
 rt:"Let's rethink",rt1:"Studies, projects and internship",
 rtt:"Third-year Licence in Applied Computer Science (Université des Mascareignes), vice-major of my class. Internship completed successfully in a company working with Scrum. Tools: PHP, HTML, CSS, Java, GitHub, Jira, Angular, React, Ionic.",
 k1:"Hybrid bus app: which buses, where they are, when they arrive, powered by user reports.",
 k2:"Platform where users exchange needs with each other.",
 k3:"2D game that motivates young people to protect the seabed.",
 k4:"Two-user home management: wallet, shopping, tasks, calendar.",
 ai:"AI is my code copilot: ideas, scaffolding, debugging, tests. I always review and adapt.",
 rb:"Let's rebuild",rb1:"Before code: cities",
 rbt:"I started in civil engineering and urban planning. My thesis tackled traffic flow between Antananarivo and its outskirts: the case of Itaosy. Yesterday I optimised how a city moves, today I optimise how users experience an app.",
 rb2:"Tools: ArcGIS, QGIS, AutoCAD, ArchiCAD, Revit, SketchUp",
 cn:"Let's connect",cn1:"Next stop: you",cnt:"Have a project, an internship or a role in mind? Let's talk.",
 f_name:"Your name",f_mail:"Your email",f_msg:"Your message",send:"Send",
 sent:"Thanks! Your message is on its way.",hint:"SCROLL ↓",pb:"Project"};
const $=s=>document.querySelectorAll(s),FR={};
$("[data-i]").forEach(e=>FR[e.dataset.i]=e.textContent);
$("[data-ph]").forEach(e=>FR[e.dataset.ph]=e.placeholder);
function setLang(l){const T=l==="en"?EN:FR;
 $("[data-i]").forEach(e=>e.textContent=T[e.dataset.i]);
 $("[data-ph]").forEach(e=>e.placeholder=T[e.dataset.ph]);
 document.documentElement.lang=l;document.getElementById("lang").textContent=l==="en"?"FR":"EN";
 try{localStorage.setItem("lang",l)}catch(_){}}
document.getElementById("lang").onclick=()=>setLang(document.documentElement.lang==="fr"?"en":"fr");
let sv=navigator.language.startsWith("en")?"en":"fr";try{sv=localStorage.getItem("lang")||sv}catch(_){}
if(sv==="en")setLang("en");

// === Formulaire : Formspree si configure, sinon mailto ===
document.querySelector("form").addEventListener("submit",async ev=>{
 ev.preventDefault();const f=ev.target,d=new FormData(f);
 if(f.action.includes("VOTRE_ID")){location.href="mailto:mevarabeharinoro@gmail.com?subject="+encodeURIComponent("Contact portfolio - "+d.get("name"))+"&body="+encodeURIComponent(d.get("message")+"\n\n"+d.get("email"));return}
 try{const r=await fetch(f.action,{method:"POST",body:d,headers:{Accept:"application/json"}});
  if(r.ok){f.reset();document.getElementById("status").textContent=document.documentElement.lang==="en"?EN.sent:"Merci ! Votre message est bien parti."}}catch(_){}});

// === Ville 3D : la camera suit un trajet entre 5 arrets (x, y, z, rotation) ===
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
document.documentElement.classList.add("d3");
const S=[{x:0,y:0,z:0,ry:0,rx:0},{x:1100,y:-350,z:-1500,ry:14,rx:3},{x:-900,y:-950,z:-3200,ry:-14,rx:12},
 {x:800,y:450,z:-5000,ry:12,rx:-10},{x:0,y:-200,z:-6800,ry:0,rx:0}];
const N=["ORIGIN","REWIND","RETHINK","REBUILD","CONNECT"],world=document.getElementById("world"),G=900;
// Panneaux a leur position
const P=[...$(".panel")];
P.forEach((p,i)=>p.style.transform=`translate3d(${S[i].x}px,${S[i].y}px,${S[i].z}px) translate(-50%,-50%)`);
// Immeubles filaires (graine fixe pour un rendu stable)
let sd=7;const R=(a,b)=>a+((sd=(sd*16807)%2147483647)/2147483647)*(b-a);
const gr=document.createElement("div");gr.className="ground";
gr.style.transform=`translate3d(0,${G}px,-3400px) rotateX(90deg)`;world.append(gr);
for(let n=0;n<70;n++){
 const x=R(-3400,3400),z=R(-7800,600),w=R(120,380),d=R(120,380),h=R(250,1700);
 if(S.some(s=>Math.abs(x-s.x)<650&&Math.abs(z-s.z)<650))continue;
 const b=document.createElement("div");b.className="b"+(n%9?"":" hot");
 b.style.transform=`translate3d(${x}px,${G-h/2}px,${z}px)`;
 [[w,h,`translateZ(${d/2}px)`],[w,h,`rotateY(180deg) translateZ(${d/2}px)`],[d,h,`rotateY(90deg) translateZ(${w/2}px)`],[d,h,`rotateY(-90deg) translateZ(${w/2}px)`]]
 .forEach(([fw,fh,t])=>{const f=document.createElement("i");f.style.cssText=`width:${fw}px;height:${fh}px;margin:${-fh/2}px 0 0 ${-fw/2}px;transform:${t}`;b.append(f)});
 world.append(b)}
// Navigation par arrets
const nav=document.getElementById("nav"),hud=document.getElementById("hud");
const max=()=>document.documentElement.scrollHeight-innerHeight;
N.forEach((n,i)=>{const b=document.createElement("button");b.textContent=`0${i} ${n}`;
 b.onclick=()=>scrollTo({top:i/(N.length-1)*max(),behavior:"smooth"});nav.append(b)});
// Boucle d'animation avec inertie
let cur=0;const L=(a,b,t)=>a+(b-a)*t;
(function f(){
 const tgt=max()>0?scrollY/max():0;cur+=(tgt-cur)*.08;
 const t=Math.min(cur,.9999)*(N.length-1),i=Math.floor(t);let u=t-i;u=u*u*(3-2*u);
 const a=S[i],b=S[i+1],k=k=>L(a[k],b[k],u),off=innerWidth<700?80:300;
 world.style.transform=`rotateX(${-k("rx")}deg) rotateY(${-k("ry")}deg) translate3d(${-k("x")}px,${-k("y")}px,${-(k("z")+off)}px)`;
 P.forEach((p,j)=>{const o=Math.max(0,1-Math.abs(t-j)*1.5);p.style.opacity=o;p.style.visibility=o?"visible":"hidden";p.style.pointerEvents=o>.6?"auto":"none"});
 const c=Math.round(t);[...nav.children].forEach((e,j)=>e.classList.toggle("on",j===c));
 hud.innerHTML=`<b>ZONE 0${c} / ${N[c]}</b><span>X ${Math.round(k("x"))} Y ${Math.round(k("y"))} Z ${Math.round(k("z"))}</span>`;
 requestAnimationFrame(f)})();
}
