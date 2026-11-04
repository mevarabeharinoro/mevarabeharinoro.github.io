// --- Mode sombre / clair ---
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// --- Formulaire de contact (démo côté client) ---
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  // ⚠️ Démo : pas d'envoi réel. Remplace par Formspree / EmailJS / backend.
  console.log("Message prêt à envoyer :", Object.fromEntries(data));

  status.textContent = "✅ Message envoyé ! Merci de votre intérêt";
  form.reset();
});

// --- Année dans le footer ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Animation d'apparition au scroll ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section, .card").forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});