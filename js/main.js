// Traductions EN (le francais est le texte par defaut du HTML)
const EN={n_home:"Home",n_proj:"Projects",n_path:"Path",n_contact:"Contact",
 eyebrow:"LINE 01 · FULL-STACK / MOBILE DEVELOPER IN TRAINING",
 h1:"I build apps that help people move and organise their daily lives.",
 lead:"Former urban planning student, now in an Applied Computer Science degree. I design software the way you design a network: for real users.",
 cta:"See the case studies",h_proj:"Projects as case studies",
 pb:"Problem",so:"Solution",view:"View on GitHub →",
 k1p:"Hard to know which buses exist, where they are and when they arrive.",
 k1s:"Mobile + web app fed mainly by user reports.",
 k2p:"Everyday needs often go unanswered.",k2s:"A platform where users exchange needs with each other.",
 k3p:"Young people are hard to engage on ocean protection.",k3s:"A 2D game that makes protecting the seabed motivating.",
 k4p:"Running a home for two means juggling budget, shopping, chores and agenda.",
 k4s:"A two-user app: wallet, shopping, tasks and calendar.",
 h_path:"From urban planner to developer",
 b1:"My path",
 b1t:"I started in civil engineering and urban planning, then moved to computer science. I'm in the third year of the Licence in Applied Computer Science (Université des Mascareignes), aiming for full-stack and mobile development.",
 b2:"Urban planning thesis",
 b2t:"Improving traffic flow between Antananarivo and its outskirts: the case of Itaosy. It's why I think about mobility first, and code second.",
 b3:"Skills and tools",b3t:"Software and design",b3u:"Urban planning, GIS and CAD",
 b4:"AI as a copilot",
 b4t:"I use AI to explore ideas, scaffold code, debug and write tests, then review and adapt everything. Result: faster prototypes, quicker learning, and more time for users' real needs.",
 h_contact:"Contact",f_name:"Your name",f_mail:"Your email",f_msg:"Your message",send:"Send",
 sent:"Thanks! Your message is on its way.",foot:"Designed and built by Meva"};
const $=s=>document.querySelectorAll(s),FR={};
$("[data-i]").forEach(e=>FR[e.dataset.i]=e.textContent);
$("[data-ph]").forEach(e=>FR[e.dataset.ph]=e.placeholder);
function setLang(l){const T=l==="en"?EN:FR;
 $("[data-i]").forEach(e=>e.textContent=T[e.dataset.i]);
 $("[data-ph]").forEach(e=>e.placeholder=T[e.dataset.ph]);
 document.documentElement.lang=l;document.getElementById("lang").textContent=l==="en"?"FR":"EN";
 try{localStorage.setItem("lang",l)}catch(_){}}
document.getElementById("lang").onclick=()=>setLang(document.documentElement.lang==="fr"?"en":"fr");
let saved=navigator.language.startsWith("en")?"en":"fr";
try{saved=localStorage.getItem("lang")||saved}catch(_){}
if(saved==="en")setLang("en");
// Arret actif sur la ligne de bus
const stops=[...$("nav a")];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)stops.forEach(a=>a.classList.toggle("on",a.hash==="#"+e.target.id))}),{rootMargin:"-45% 0px -45% 0px"});
$("section").forEach(s=>so.observe(s));
// Apparition au scroll
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")),{threshold:.12});
$(".rv").forEach(e=>io.observe(e));
// Formulaire : Formspree si configure, sinon mailto
document.querySelector("form").addEventListener("submit",async ev=>{
 ev.preventDefault();const f=ev.target,d=new FormData(f);
 if(f.action.includes("VOTRE_ID")){location.href="mailto:mevarabeharinoro@gmail.com?subject="+encodeURIComponent("Contact portfolio - "+d.get("name"))+"&body="+encodeURIComponent(d.get("message")+"\n\n"+d.get("email"));return}
 try{const r=await fetch(f.action,{method:"POST",body:d,headers:{Accept:"application/json"}});
  if(r.ok){f.reset();document.getElementById("status").textContent=document.documentElement.lang==="en"?EN.sent:"Merci ! Votre message est bien parti."}}catch(_){}});
