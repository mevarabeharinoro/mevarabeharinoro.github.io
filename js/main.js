// === Traductions EN (le français est le texte par défaut du HTML) ===
const EN = {
 n_projects:"Projects",n_about:"About",n_more:"Extra",n_ai:"AI",n_contact:"Contact",
 hi:"Hi, I'm",role:"Full-stack / mobile developer in training",
 tag:"I build useful apps for everyday life, and bring an urban planner's eye to them.",
 cta1:"See my projects",cta2:"Contact me",h_projects:"Projects",
 p1:"Hybrid (mobile + web) app showing which buses exist, where they are now and when they will arrive, mainly fed by user reports.",
 p2:"Platform where users exchange needs with each other.",
 p3:"2D game motivating young people to protect the seabed.",
 p4:"Personal project to run a two-person household: wallet, shopping, tasks and calendar.",
 view:"View on GitHub →",h_about:"About",a1:"Background",
 a1t:"Third-year student in the Licence in Applied Computer Science (Université des Mascareignes), after a first path in civil engineering and urban planning. I'm moving towards full-stack and mobile development, with a taste for projects that solve real problems.",
 a2:"Skills",h_more:"Extra: urban planning",m1:"Urban planning thesis",
 m1t:"Improving traffic flow between Antananarivo and its outskirts: the case of Itaosy. This work shapes how I design mobility and transport apps.",
 m2:"Tools",h_ai:"How I use AI",i1:"In practice",
 i1t:"I use AI as a pair-programming partner: to explore ideas, scaffold code, debug and write tests. I always review, understand and adapt what it produces.",
 i2:"Benefits",
 i2t:"Faster prototyping, quicker learning of new tools, better quality through systematic review, and more time for design and user needs.",
 h_contact:"Contact",f_name:"Your name",f_mail:"Your email",f_msg:"Your message",send:"Send",
 sent:"Thanks! Your message is on its way.",foot:"Designed and built by Meva"
};
const $ = s => document.querySelectorAll(s);
const FR = {};
$("[data-i]").forEach(e => FR[e.dataset.i] = e.textContent);
$("[data-ph]").forEach(e => FR[e.dataset.ph] = e.placeholder);

function setLang(l){
  const T = l === "en" ? EN : FR;
  $("[data-i]").forEach(e => e.textContent = T[e.dataset.i]);
  $("[data-ph]").forEach(e => e.placeholder = T[e.dataset.ph]);
  document.documentElement.lang = l;
  document.getElementById("lang").textContent = l === "en" ? "FR" : "EN";
  try { localStorage.setItem("lang", l); } catch (_) {}
}
document.getElementById("lang").onclick = () =>
  setLang(document.documentElement.lang === "fr" ? "en" : "fr");
let saved = navigator.language.startsWith("en") ? "en" : "fr";
try { saved = localStorage.getItem("lang") || saved; } catch (_) {}
if (saved === "en") setLang("en");

// Menu mobile
const menu = document.querySelector("nav ul");
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu.onclick = () => menu.classList.remove("open");

// Animations d'apparition au scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), {threshold:.15});
$(".rv").forEach(e => io.observe(e));

// Formulaire : Formspree si configuré (voir README), sinon repli mailto
document.querySelector("form").addEventListener("submit", async ev => {
  ev.preventDefault();
  const f = ev.target, d = new FormData(f);
  if (f.action.includes("VOTRE_ID")) {
    location.href = "mailto:mevarabeharinoro@gmail.com?subject=" + encodeURIComponent("Contact portfolio - " + d.get("name")) +
      "&body=" + encodeURIComponent(d.get("message") + "\n\n" + d.get("email"));
    return;
  }
  try {
    const r = await fetch(f.action, {method:"POST", body:d, headers:{Accept:"application/json"}});
    if (r.ok) { f.reset(); document.getElementById("status").textContent = document.documentElement.lang === "en" ? EN.sent : "Merci ! Votre message est bien parti."; }
  } catch (_) {}
});
