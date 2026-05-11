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
    type: "Bachelor's thesis / released game",
    summary:
      "A solo-developed Unity 2D Metroidvania with 20 interconnected areas, 100+ scenes, 15 boss encounters, branching narrative, secure saves, and controller support.",
    stack: ["Unity", "C#", "Behavior graphs", "AES/HMAC saves", "ScriptableObjects"],
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
    summary:
      "SCADA internship work modelling heat flow across rooms, insulation, open-window factors, gas/A/C modes, and monthly energy reports from live process data.",
    stack: ["WinCC OA", "SCADA", "HVAC simulation", "Agile teamwork"],
    accent: "automation",
  },
  {
    id: "fitness-tracker",
    name: "Workout & Calorie Tracker",
    type: "Mobile app",
    summary:
      "A Flutter/Firebase app for exercise logging, weekly performance scoring, calorie tracking, local caching, and a self-hosted nutrition API.",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "Caching"],
    accent: "fitness",
  },
  {
    id: "graphics-engine",
    name: "3D Graphics Engine",
    type: "Rendering project",
    summary:
      "A C++ OpenGL engine supporting OBJ/FBX loading, custom GLSL shader pipelines, texture mapping, transforms, and instanced rendering.",
    stack: ["C++", "OpenGL", "GLSL", "3D models", "GPU rendering"],
    accent: "graphics",
  },
];

const timeline = [
  {
    title: "Automation Developer Intern",
    place: "Accenture",
    date: "Summer 2025",
    points: [
      "Developed an HVAC environment simulation in WinCC OA for room-level heat flow.",
      "Modelled insulation, open-window factors, gas heating, and A/C modes.",
      "Generated monthly energy expense reports from live process data.",
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
    items: ["C#", "Python", "C", "C++", "Java", "Dart", "SQL", "Git"],
  },
  {
    name: "Game Development",
    items: ["Unity", "Gameplay systems", "Boss AI", "Level design", "Input systems", "UI"],
  },
  {
    name: "AI and Security",
    items: ["Neural networks", "Malware analysis", "AES-CBC", "HMAC-SHA256", "Model evaluation"],
  },
  {
    name: "Tools and Platforms",
    items: ["Flutter", "Firebase", "OpenGL", "Docker", "Bash/Linux", "LaTeX", "REST APIs"],
  },
];

const divineHarvestStats = [
  ["20", "interconnected areas"],
  ["100+", "Unity scenes"],
  ["15", "boss encounters"],
  ["27", "persistent managers"],
  ["3", "save slots"],
  ["2", "narrative endings"],
];

const divineHarvestSystems = [
  {
    title: "PersistentObjects Architecture",
    text:
      "A DontDestroyOnLoad prefab bootstraps 27 global managers before any scene loads, preserving world, player, map, story, and combat state across 100+ room transitions.",
  },
  {
    title: "Three-Tier Data Model",
    text:
      "Static ScriptableObject definitions, persistent runtime managers, and scene-local components stay separated so gameplay data does not collapse into scene lifecycle problems.",
  },
  {
    title: "Secure Save Pipeline",
    text:
      "The save system uses AES-CBC encryption, HMAC-SHA256 integrity validation, constant-time comparison, three save slots, and readable metadata for the save UI.",
  },
  {
    title: "Boss AI Evolution",
    text:
      "Boss logic evolved from animator-driven coroutines into graph-based Unity Behavior pipelines, with object pooling reducing projectile instantiation overhead.",
  },
  {
    title: "Input Abstraction",
    text:
      "Runtime remapping and a 177-entry keybind icon database support keyboard, PlayStation, and Xbox input aliases without hardcoded UI references.",
  },
  {
    title: "Narrative Systems",
    text:
      "Branching dialogue, lore items, NPC questlines, a recurring hub, and dual endings tie progression systems to the world fiction.",
  },
];

const divineScreenshots = [
  {
    src: "assets/divine-harvest-01.webp",
    alt: "Divine Harvest gameplay screenshot with ornate interior and character platforming",
  },
  {
    src: "assets/divine-harvest-02.webp",
    alt: "Divine Harvest screenshot showing character dialogue and glowing effects",
  },
  {
    src: "assets/divine-harvest-03.webp",
    alt: "Divine Harvest cave environment screenshot with purple lighting",
  },
  {
    src: "assets/divine-harvest-04.webp",
    alt: "Divine Harvest dark red atmospheric boss or story scene",
  },
];

const app = document.querySelector("#app");

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function chipList(items) {
  return `<ul class="chip-list">${listItems(items)}</ul>`;
}

function metricList(items) {
  return items
    .map(([value, label]) => `<div><span class="stat">${value}</span><span>${label}</span></div>`)
    .join("");
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
          <p class="eyebrow">Software developer / game systems builder</p>
          <h1>Building games, secure systems, AI tools, and graphics projects.</h1>
          <p class="lead">
            I work across game development, systems programming, industrial automation, AI security,
            mobile apps, and low-level graphics. My current flagship is Divine Harvest, a released
            Unity Metroidvania and bachelor's thesis built end to end.
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

      <section class="content-band compact-band">
        <div class="metric-strip">
          ${metricList([
            ["Unity", "game systems"],
            ["SCADA", "automation internship"],
            ["OpenGL", "graphics engine"],
            ["AI", "malware detection"],
          ])}
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
  const screenshotTiles = divineScreenshots
    .map(
      (shot, index) => `
        <figure class="screenshot-tile tile-${index + 1}">
          <img src="${shot.src}" alt="${shot.alt}" loading="lazy" />
        </figure>`,
    )
    .join("");

  const systems = divineHarvestSystems
    .map(
      (system) => `
        <article>
          <h2>${system.title}</h2>
          <p>${system.text}</p>
        </article>`,
    )
    .join("");

  return `
    <main>
      <section class="game-page">
        <div class="game-hero">
          <div class="screenshot-collage" aria-label="Divine Harvest screenshot collage">
            ${screenshotTiles}
          </div>
          <div class="game-copy">
            <p class="eyebrow">Released Windows game / bachelor's thesis</p>
            <h1>Divine Harvest</h1>
            <p class="lead">
              A solo-developed 2D Metroidvania built in Unity over roughly eight months, released
              on itch.io as a university final project and documented in a 99-page thesis.
            </p>
            <div class="game-actions">
              <a class="primary-action" href="https://ballaii.itch.io/divine-harvest" target="_blank" rel="noopener">
                Play on itch.io
              </a>
              <a class="secondary-action" href="https://www.youtube.com/watch?v=65rzQu2B-PM" target="_blank" rel="noopener">
                Watch trailer
              </a>
            </div>
          </div>
        </div>

        <div class="stat-row stat-row-wide">
          ${metricList(divineHarvestStats)}
        </div>

        <section class="media-section">
          <div class="section-heading wide">
            <p class="eyebrow">Trailer</p>
            <h2>Watch the Divine Harvest trailer.</h2>
          </div>
          <div class="video-frame">
            <iframe
              src="https://www.youtube.com/embed/65rzQu2B-PM"
              title="Divine Harvest trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <section class="content-band">
          <div class="section-heading wide">
            <p class="eyebrow">Systems</p>
            <h2>Engineering choices behind the world.</h2>
            <p class="lead">
              The thesis frames Divine Harvest as an end-to-end architecture problem: persistent
              world state, ability-gated progression, AI encounters, secure saves, input abstraction,
              and narrative branching all have to survive constant scene transitions.
            </p>
          </div>
          <div class="feature-grid systems-grid">${systems}</div>
        </section>

        <section class="content-band">
          <div class="release-panel">
            <div>
              <p class="eyebrow">Release</p>
              <h2>Available as a downloadable Windows game.</h2>
              <p>
                The itch page lists Divine Harvest as a released Adventure game for Windows with
                Action-Adventure, Indie, Metroidvania, Pixel Art, Short, and Singleplayer tags.
                It also notes controller support for walking through the game.
              </p>
            </div>
            <a class="primary-action" href="https://ballaii.itch.io/divine-harvest" target="_blank" rel="noopener">
              Open itch.io page
            </a>
          </div>
        </section>
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
