// Charge les projets depuis le JSON et les affiche
let allProjects = [];

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  try {
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error("Erreur de chargement");
    allProjects = await res.json();

    renderProjects(allProjects);
    renderFilters(allProjects);
  } catch (err) {
    grid.innerHTML = `<p class="error">Impossible de charger les projets : ${err.message}</p>`;
  }
}

function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = projects
    .map(
      (p) => `
      <article class="card">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="tags">
            ${p.technologies.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
          <div class="card-links">
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Démo ↗</a>` : ""}
            ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">Code ↗</a>` : ""}
          </div>
        </div>
      </article>`
    )
    .join("");
}

function renderFilters(projects) {
  const filters = document.getElementById("filters");
  const techs = [...new Set(projects.flatMap((p) => p.technologies))];

  filters.innerHTML =
    `<button class="filter-btn active" data-tech="all">Tous</button>` +
    techs.map((t) => `<button class="filter-btn" data-tech="${t}">${t}</button>`).join("");

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tech = btn.dataset.tech;
    renderProjects(tech === "all" ? allProjects : allProjects.filter((p) => p.technologies.includes(tech)));
  });
}

loadProjects();