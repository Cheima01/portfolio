// Navigation : changement d'apparence après défilement.
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");

    if (!header) return;

    window.addEventListener("scroll", () => {
        header.classList.toggle("navbarDark", window.scrollY >= 100);
    }, { passive: true });
}

// Ferme le menu Bootstrap après sélection d'un lien sur petit écran.
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll("#navbarSupportedContent .nav-link");
    const menuToggle = document.getElementById("navbarSupportedContent");

    if (!menuToggle || typeof bootstrap === "undefined") return;

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const collapse = bootstrap.Collapse.getInstance(menuToggle)
                || new bootstrap.Collapse(menuToggle, { toggle: false });

            if (menuToggle.classList.contains("show")) {
                collapse.hide();
            }
        });
    });
}

function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    if (!container) return;

    fetch("data/skills.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Impossible de charger skills.json (${response.status})`);
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data)) throw new Error("skills.json doit contenir un tableau.");

            const row = document.createElement("div");
            row.className = "row";

            data.forEach((item) => {
                const card = document.createElement("div");
                card.className = "col-lg-4 col-md-6 mt-4";
                card.innerHTML = `
                    <article class="card skillsText h-100">
                        <div class="card-body">
                            <img src="./images/${item.image}" width="256" height="256"
                            loading="lazy" decoding="async" alt="${item.imageAlt || item.title}">
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </article>
                `;
                row.appendChild(card);
            });

            container.appendChild(row);
        })
        .catch((error) => {
            console.error("Erreur de chargement des compétences :", error);
        });
}

function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    if (!container) return;

    fetch("data/portfolio.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Impossible de charger portfolio.json (${response.status})`);
            }
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data)) throw new Error("portfolio.json doit contenir un tableau.");

            const row = document.createElement("div");
            row.className = "row";

            data.forEach((item) => {
                const card = document.createElement("div");
                card.className = `col-lg-4 col-md-6 mt-4 project-item ${item.category || "web"}`;
                card.innerHTML = `
                    <article class="card project-card">
                        ${item.image ? `<img class="card-img-top" src="images/${item.image}"
                            width="728" height="285" loading="lazy" decoding="async"
                            alt="${item.imageAlt || `Aperçu du projet ${item.title}`}">` : ""}
                        <div class="card-body">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                          ${item.link ? `
    <div class="text-center mt-3">
        <a href="${item.link}" class="btn btn-success"
           ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
           ${item.linkLabel || "Voir le projet"}
        </a>
    </div>
` : ""}
                        </div>
                    </article>
                `;
                row.appendChild(card);
            });

            container.appendChild(row);
            setupProjectFilters();
        })
        .catch((error) => {
            console.error("Erreur de chargement des projets :", error);
        });
}

function setupProjectFilters() {
    const buttons = document.querySelectorAll(".project-filter [data-filter]");
    const projects = document.querySelectorAll(".project-item");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            projects.forEach((project) => {
                const show = filter === "all" || project.classList.contains(filter);
                project.hidden = !show;
            });
        });
    });
}

handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
