const pages = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "divine-harvest", label: "Divine Harvest" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    id: "divine-harvest",
    name: "Divine Harvest",
    type: "Metroidvania game",
    summary:
      "A large-scale metroidvania focused on exploration, ability progression, responsive combat, and atmospheric level design.",
    stack: ["Unity", "C#", "Game systems", "Level design", "UI"],
    accent: "harvest",
  },
  {
    id: "malware-ai",
    name: "AI Malware Detection",
    type: "Neural network security tool",
    summary:
      "A machine learning project for detecting malicious software patterns and improving threat classification workflows.",
    stack: ["Python", "Neural networks", "Cybersecurity", "Data analysis"],
    accent: "neural",
  },
  {
    id: "automation",
    name: "Automation and HVAC Simulation",
    type: "Internship work",
    summary: "Home automation and HVAC simulation development in an agile team environment.",
    stack: [".NET", "Automation", "Simulation", "Team workflow"],
    accent: "automation",
  },
];

const timeline = [
  {
    title: "Automation Developer Intern",
    place: "Accenture",
    date: "Summer 2025",
    points: [
      "Built home automation features and simulation tooling.",
      "Contributed in an agile team with technical planning and delivery.",
      "Worked on HVAC simulation behavior and practical system testing.",
    ],
  },
  {
    title: "Community Manager",
    place: "Online communities",
    date: "2018-2022",
    points: [
      "Managed servers, moderation flows, and member support.",
      "Organized community events and coordinated team responsibilities.",
      "Handled conflict resolution while keeping spaces welcoming.",
    ],
  },
];

const skillGroups = [
  {
    name: "Engineering",
    items: ["C++", "C#", ".NET", "Python", "Java", "Git"],
  },
  {
    name: "Game Development",
    items: ["Unity", "Gameplay systems", "Level design", "UI implementation"],
  },
  {
    name: "AI and Security",
    items: ["Neural networks", "Malware analysis", "Data preprocessing", "Model evaluation"],
  },
  {
    name: "Product",
    items: ["Web development", "Flutter", "Agile teamwork", "Community management"],
  },
];

const app = document.querySelector("#app");

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function chipList(items) {
  return `<ul class="chip-list">${listItems(items)}</ul>`;
}

function setPage(pageId) {
  window.location.hash = pageId;
}

window.setPage = setPage;

function getPageId() {
  const hash = window.location.hash.replace("#", "");
  return pages.some((page) => page.id === hash) ? hash : "home";
}

function renderHeader(activePage) {
  const tabs = pages
    .map(
      (page) => `
        <button
          class="tab ${activePage === page.id ? "active" : ""}"
          type="button"
          onclick="setPage('${page.id}')"
        >
          ${page.label}
        </button>`,
    )
    .join("");

  return `
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Go to homepage">
        <img src="character.png" alt="" class="brand-mark" />
        <span>Ballai Fokt Jeno</span>
      </a>
      <nav class="tabs" aria-label="Portfolio sections">${tabs}</nav>
    </header>`;
}

function renderHome() {
  const experience = timeline
    .map(
      (item) => `
        <article class="timeline-item">
          <div>
            <p class="item-date">${item.date}</p>
            <h3>${item.title}</h3>
            <p class="muted">${item.place}</p>
          </div>
          <ul>${listItems(item.points)}</ul>
        </article>`,
    )
    .join("");

  return `
    <main>
      <section class="page-grid hero-page">
        <div class="hero-copy">
          <p class="eyebrow">Student developer / game builder</p>
          <h1>Building games, intelligent tools, and polished web experiences.</h1>
          <p class="lead">
            I like learning hard things and turning them into systems people can use. My current
            focus is game development, AI security, and web projects with clear interfaces.
          </p>
          <div class="hero-actions">
            <button type="button" class="primary-action" onclick="setPage('divine-harvest')">
              View Divine Harvest
            </button>
            <button type="button" class="secondary-action" onclick="setPage('projects')">
              Browse projects
            </button>
          </div>
        </div>

        <div class="portrait-panel" aria-label="Profile portrait">
          <img src="en.jpeg" alt="Portrait of Ballai Fokt Jeno" class="portrait" />
          <div class="signal-card">
            <span class="signal-value">2026</span>
            <span>Information Technology, UMFST</span>
          </div>
        </div>
      </section>

      <section class="content-band">
        <div class="section-heading">
          <p class="eyebrow">Experience</p>
          <h2>Practical engineering with a creative edge.</h2>
        </div>
        <div class="timeline">${experience}</div>
      </section>
    </main>`;
}

function renderProjects() {
  const cards = projects
    .map(
      (project) => `
        <article class="project-card ${project.accent}">
          <div class="project-graphic" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="project-copy">
            <p class="project-type">${project.type}</p>
            <h2>${project.name}</h2>
            <p>${project.summary}</p>
            ${chipList(project.stack)}
            ${
              project.id === "divine-harvest"
                ? `<button type="button" class="inline-link" onclick="setPage('divine-harvest')">Open dedicated page</button>`
                : ""
            }
          </div>
        </article>`,
    )
    .join("");

  return `
    <main>
      <section class="content-band">
        <div class="section-heading wide">
          <p class="eyebrow">Selected work</p>
          <h1>Projects with distinct technical stories.</h1>
          <p class="lead">
            A concise project index for game development, AI security, automation, and web work.
          </p>
        </div>
        <div class="project-grid">${cards}</div>
      </section>
    </main>`;
}

function renderDivineHarvest() {
  return `
    <main>
      <section class="game-page">
        <div class="game-hero">
          <div class="game-art" aria-hidden="true">
            <div class="sun"></div>
            <div class="temple"></div>
            <div class="platform platform-a"></div>
            <div class="platform platform-b"></div>
            <div class="player-silhouette"></div>
          </div>
          <div class="game-copy">
            <p class="eyebrow">Flagship game project</p>
            <h1>Divine Harvest</h1>
            <p class="lead">
              A metroidvania built around atmospheric exploration, ability-gated progression,
              responsive encounters, and a world that rewards curiosity.
            </p>
            <div class="stat-row">
              <div><span class="stat">Unity</span><span>Engine</span></div>
              <div><span class="stat">C#</span><span>Gameplay</span></div>
              <div><span class="stat">2D</span><span>Metroidvania</span></div>
            </div>
          </div>
        </div>

        <div class="feature-grid">
          <article>
            <h2>Core Direction</h2>
            <p>
              Divine Harvest gets its own space because it is the largest creative and technical
              project in the portfolio. The page frames it as a serious game system, not just a
              hobby entry.
            </p>
          </article>
          <article>
            <h2>Systems Focus</h2>
            <p>
              Movement, combat, progression, UI, save flow, enemy behavior, and level structure can
              all be expanded here as the project grows.
            </p>
          </article>
          <article>
            <h2>Portfolio Value</h2>
            <p>
              Recruiters and collaborators can quickly see the stack, scope, and design thinking
              behind the game before looking at the rest of the site.
            </p>
          </article>
        </div>
      </section>
    </main>`;
}

function renderSkills() {
  const groups = skillGroups
    .map(
      (group) => `
        <article class="skill-panel">
          <h2>${group.name}</h2>
          ${chipList(group.items)}
        </article>`,
    )
    .join("");

  return `
    <main>
      <section class="content-band">
        <div class="section-heading wide">
          <p class="eyebrow">Capabilities</p>
          <h1>Technical range with a bias toward building.</h1>
        </div>
        <div class="skills-grid">${groups}</div>
      </section>
    </main>`;
}

function renderContact() {
  return `
    <main>
      <section class="contact-page">
        <div>
          <p class="eyebrow">Contact</p>
          <h1>Let us build something useful.</h1>
          <p class="lead">
            I am open to internships, collaborations, and technical conversations around games,
            web apps, automation, and AI security.
          </p>
        </div>
        <div class="contact-panel">
          <a href="mailto:ballaifoktjeno@gmail.com">ballaifoktjeno@gmail.com</a>
          <a href="https://www.linkedin.com/in/jen%C5%91-ballai-fokt-203928316/" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a href="https://github.com/Ballaii" target="_blank" rel="noopener">GitHub</a>
        </div>
      </section>
    </main>`;
}

function renderPage() {
  const page = getPageId();
  const pageContent = {
    home: renderHome,
    projects: renderProjects,
    "divine-harvest": renderDivineHarvest,
    skills: renderSkills,
    contact: renderContact,
  };

  app.innerHTML = `
    <div class="site-shell">
      ${renderHeader(page)}
      ${pageContent[page]()}
    </div>`;
}

window.addEventListener("hashchange", renderPage);
renderPage();
