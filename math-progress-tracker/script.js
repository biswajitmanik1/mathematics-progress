/* =========================================================
   Mathematics Course Progress Tracker — script.js
   Vanilla JS. No frameworks, no backend.
   ========================================================= */

/* ---------------------------------------------------------
   1. COURSE DATA
   Single source of truth for the whole course.
   - Add a new chapter: add { name, lectures } to a section's
     `chapters` array.
   - Change a lecture count: edit the `lectures` number.
   - Add a new section: add a new object to COURSE_DATA with
     a unique `id`, a `name`, and a `chapters` array.
   A chapter with `lectures: 0` means "count not added yet" —
   it is automatically excluded from every calculation until
   you give it a real number.
   --------------------------------------------------------- */

const COURSE_DATA = [
  {
    id: "arithmetic",
    name: "Arithmetic",
    chapters: [
      { name: "Percentage", lectures: 19 },
      { name: "Ratio and Proportion", lectures: 12 },
      { name: "Problem on Ages", lectures: 3 },
      { name: "Profit and Loss", lectures: 10 },
      { name: "Discount", lectures: 11 },
      { name: "Dishonest Shopkeeper", lectures: 3 },
      { name: "Time and Work", lectures: 15 },
      { name: "Pipe and Cistern", lectures: 5 },
      { name: "Mixture and Alligation", lectures: 14 },
      { name: "Simple Interest", lectures: 11 },
      { name: "Compound Interest", lectures: 17 },
      { name: "Partnership", lectures: 3 },
      { name: "Average", lectures: 6 },
      { name: "Time, Speed and Distance", lectures: 0 },
      { name: "Train", lectures: 0 },
      { name: "Race", lectures: 0 },
      { name: "Boat and Stream", lectures: 0 },
      { name: "Installment", lectures: 0 },
    ],
  },
  {
    id: "advance",
    name: "Advance",
    chapters: [
      { name: "2D Mensuration", lectures: 15 },
      { name: "3D Mensuration", lectures: 23 },
      { name: "Algebra", lectures: 30 },
      { name: "Trigonometry", lectures: 27 },
      { name: "Geometry", lectures: 24 },
    ],
  },
  {
    id: "number-system",
    name: "Number System & More",
    chapters: [
      { name: "Number System", lectures: 21 },
      { name: "Calculation & Simplification", lectures: 12 },
      { name: "Surds and Indices", lectures: 10 },
      { name: "LCM and HCF", lectures: 11 },
    ],
  },
];

/* ---------------------------------------------------------
   1b. CHAPTER ICONS
   Each chapter gets a small topic-matching icon shown next to
   every lecture row. `CHAPTER_ICON_MAP` maps a chapter name to
   a key in `ICON_PATHS`. Chapters not listed here (e.g. a new
   chapter you just added) automatically fall back to
   `DEFAULT_ICON_KEY` — no icon lookup ever fails.
   --------------------------------------------------------- */

const ICON_PATHS = {
  percent:
    '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
  sliders:
    '<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>',
  user:
    '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
  trendingUp:
    '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
  tag:
    '<path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>',
  shoppingCart:
    '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
  clock:
    '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
  layers:
    '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
  dollarSign:
    '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
  barChart:
    '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
  navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>',
  flag:
    '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>',
  anchor:
    '<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>',
  creditCard:
    '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>',
  square: '<rect x="3" y="3" width="18" height="18" rx="2"></rect>',
  box:
    '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
  xSquare:
    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>',
  triangle:
    '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>',
  hexagon:
    '<path d="M12 22 2 16.5v-9L12 2l10 5.5v9L12 22z"></path><line x1="12" y1="22" x2="12" y2="15.5"></line><line x1="22" y1="8.5" x2="12" y2="15.5"></line><line x1="2" y1="8.5" x2="12" y2="15.5"></line>',
  hash:
    '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>',
  grid:
    '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
  radical: '<path d="M2 13h3l3 8L13 3h9"></path>',
  divide:
    '<circle cx="12" cy="6" r="2"></circle><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="18" r="2"></circle>',
  train:
    '<rect x="4" y="3" width="16" height="12" rx="2"></rect><line x1="4" y1="10" x2="20" y2="10"></line><line x1="8" y1="19" x2="6.5" y2="22"></line><line x1="16" y1="19" x2="17.5" y2="22"></line>',
  bookOpen:
    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
};

const CHAPTER_ICON_MAP = {
  Percentage: "percent",
  "Ratio and Proportion": "sliders",
  "Problem on Ages": "user",
  "Profit and Loss": "trendingUp",
  Discount: "tag",
  "Dishonest Shopkeeper": "shoppingCart",
  "Time and Work": "clock",
  "Pipe and Cistern": "droplet",
  "Mixture and Alligation": "layers",
  "Simple Interest": "dollarSign",
  "Compound Interest": "barChart",
  Partnership: "users",
  Average: "activity",
  "Time, Speed and Distance": "navigation",
  Train: "train",
  Race: "flag",
  "Boat and Stream": "anchor",
  Installment: "creditCard",
  "2D Mensuration": "square",
  "3D Mensuration": "box",
  Algebra: "xSquare",
  Trigonometry: "triangle",
  Geometry: "hexagon",
  "Number System": "hash",
  "Calculation & Simplification": "grid",
  "Surds and Indices": "radical",
  "LCM and HCF": "divide",
};

const DEFAULT_ICON_KEY = "bookOpen";

function chapterIconSvg(chapterName) {
  const key = CHAPTER_ICON_MAP[chapterName] || DEFAULT_ICON_KEY;
  const paths = ICON_PATHS[key] || ICON_PATHS[DEFAULT_ICON_KEY];
  return `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

/* Each chapter gets its own neon color (icon + matching hover glow) so the
   dashboard doesn't read as flat single-tone. Assigned once, in course
   order, by cycling through NEON_COLORS — stable across renders and
   automatically covers any chapter you add later. */
const NEON_COLORS = [
  "#00e5ff", // electric cyan
  "#ff2e9a", // hot pink
  "#7cfc3c", // neon lime
  "#ffd400", // neon yellow
  "#b14eff", // neon violet
  "#ff5f2e", // neon orange
  "#2effc8", // spring teal
  "#ff2ecb", // magenta
  "#4e8cff", // electric blue
  "#ff4e4e", // neon red
];

function buildChapterColorMap() {
  const map = {};
  let i = 0;
  COURSE_DATA.forEach((section) => {
    section.chapters.forEach((chapter) => {
      map[chapter.name] = NEON_COLORS[i % NEON_COLORS.length];
      i++;
    });
  });
  return map;
}

const CHAPTER_COLOR_MAP = buildChapterColorMap();

function chapterColor(chapterName) {
  return CHAPTER_COLOR_MAP[chapterName] || NEON_COLORS[0];
}

/* Study and Revision are tracked as two entirely separate passes over the
   same course content, each with its own LocalStorage key so neither
   overwrites the other. `currentMode` decides which one the UI reads from
   and writes to right now — toggled via the header button. */
const STORAGE_KEY_STUDY = "mathCourseProgress";
const STORAGE_KEY_REVISION = "mathRevisionProgress";
let currentMode = "study"; // "study" | "revision"

/* Completed lectures are tracked in an object keyed by unique lecture key,
   e.g. "arithmetic_0_3" = section "arithmetic", chapter 0, lecture index 3.
   Only completed lectures get an entry — an entry looks like
   { completed: true, completedDate: "YYYY-MM-DD" | null }.
   Only this completion state is persisted — percentages are never stored,
   they are always recalculated from this data. */
let studyData = {};
let revisionData = {};

// Returns the data object (study or revision) that's currently active.
function activeStore() {
  return currentMode === "revision" ? revisionData : studyData;
}

function activeStorageKey() {
  return currentMode === "revision" ? STORAGE_KEY_REVISION : STORAGE_KEY_STUDY;
}

/* ---------------------------------------------------------
   2. LOADING / SAVING PROGRESS (LocalStorage)
   --------------------------------------------------------- */

/* Parses one LocalStorage entry into a lecture-data object, migrating
   older save formats on the fly so past progress is never lost:
   - Oldest format: an array of completed lecture keys (no dates at all).
   - Older format: { key: true } (completed, but no date recorded).
   - Current format: { key: { completed: true, completedDate } }.
   Migrated entries always get completedDate: null since we can't know
   the real historical completion date — we never invent one. */
function parseStoredProgress(raw) {
  const store = {};
  if (!raw) return store;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return store;
  }

  if (Array.isArray(parsed)) {
    parsed.forEach((key) => {
      store[key] = { completed: true, completedDate: null };
    });
    return store;
  }

  if (parsed && typeof parsed === "object") {
    Object.keys(parsed).forEach((key) => {
      const value = parsed[key];
      if (value === true) {
        store[key] = { completed: true, completedDate: null };
      } else if (value && typeof value === "object" && value.completed) {
        store[key] = { completed: true, completedDate: value.completedDate || null };
      }
    });
  }

  return store;
}

// Loads both the study pass and the revision pass from LocalStorage so
// switching modes never needs a page reload to show already-saved data.
function loadProgress() {
  studyData = parseStoredProgress(localStorage.getItem(STORAGE_KEY_STUDY));
  revisionData = parseStoredProgress(localStorage.getItem(STORAGE_KEY_REVISION));
}

// Saves only the currently active pass (study or revision) back to its own key.
function saveProgress() {
  localStorage.setItem(activeStorageKey(), JSON.stringify(activeStore()));
}

function lectureKey(sectionId, chapterIndex, lectureIndex) {
  return `${sectionId}_${chapterIndex}_${lectureIndex}`;
}

function isLectureCompleted(key) {
  const store = activeStore();
  return Boolean(store[key] && store[key].completed);
}

function getLectureDate(key) {
  const store = activeStore();
  return store[key] ? store[key].completedDate : null;
}

// Today's date as YYYY-MM-DD, using the browser's local date (not UTC).
function getTodayLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Converts a stored "YYYY-MM-DD" date into a human-friendly "13 Aug 2026".
function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${MONTH_NAMES[month - 1]} ${year}`;
}

/* ---------------------------------------------------------
   3. PROGRESS CALCULATIONS
   A chapter with 0 lectures is always excluded so it can
   never produce NaN or Infinity and never affects its parents.
   --------------------------------------------------------- */

function calculateChapterProgress(sectionId, chapterIndex, chapter) {
  const total = chapter.lectures;
  if (!total || total <= 0) {
    return { total: 0, completed: 0, percent: 0, hasData: false };
  }
  let completed = 0;
  for (let i = 0; i < total; i++) {
    if (isLectureCompleted(lectureKey(sectionId, chapterIndex, i))) {
      completed++;
    }
  }
  return { total, completed, percent: (completed / total) * 100, hasData: true };
}

function calculateSectionProgress(section) {
  let total = 0;
  let completed = 0;
  section.chapters.forEach((chapter, chapterIndex) => {
    const result = calculateChapterProgress(section.id, chapterIndex, chapter);
    total += result.total;
    completed += result.completed;
  });
  const percent = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, percent };
}

function calculateOverallProgress() {
  let total = 0;
  let completed = 0;
  COURSE_DATA.forEach((section) => {
    const result = calculateSectionProgress(section);
    total += result.total;
    completed += result.completed;
  });
  const percent = total > 0 ? (completed / total) * 100 : 0;
  return { total, completed, percent };
}

function formatPercent(value) {
  return `${value.toFixed(2).replace(/\.00$/, "")}%`;
}

// A completed 100% bar/percentage is shown in green instead of the accent color.
function completeClass(percent) {
  return percent >= 100 ? " complete" : "";
}

/* ---------------------------------------------------------
   4. RENDERING
   Sections -> Chapters -> Lectures
   --------------------------------------------------------- */

function renderAll() {
  renderOverallProgress();
  renderSectionSummaryGrid();
  renderCourseSections();
}

function renderOverallProgress() {
  const { total, completed, percent } = calculateOverallProgress();
  const isComplete = percent >= 100;
  // At 100% the universal green "done" look always wins, so the mode
  // color is only applied when not yet complete — the two never combine.
  const modeClass = isComplete ? "" : currentMode === "revision" ? " mode-revision" : " mode-study";

  const percentEl = document.getElementById("overallPercent");
  percentEl.textContent = formatPercent(percent);
  percentEl.className = "overall-percent" + modeClass + completeClass(percent);
  const verb = currentMode === "revision" ? "revised" : "completed";
  document.getElementById("overallCount").textContent = `${completed} / ${total} lectures ${verb}`;
  const bar = document.getElementById("overallBar");
  bar.style.width = `${percent}%`;
  bar.className = "progress-fill" + modeClass + completeClass(percent);
}

function renderSectionSummaryGrid() {
  const grid = document.getElementById("sectionSummaryGrid");
  grid.innerHTML = "";

  COURSE_DATA.forEach((section) => {
    const { total, completed, percent } = calculateSectionProgress(section);

    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `
      <p class="summary-card-name">${section.name}</p>
      <div class="summary-card-percent${completeClass(percent)}">${formatPercent(percent)}</div>
      <div class="progress-track">
        <div class="progress-fill${completeClass(percent)}" style="width: ${percent}%"></div>
      </div>
      <p class="summary-card-count">${completed} / ${total} lectures</p>
    `;

    // Clicking a summary card scrolls to and opens the matching section.
    card.addEventListener("click", () => {
      const target = document.getElementById(`section-${section.id}`);
      if (!target) return;
      target.classList.add("open");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    grid.appendChild(card);
  });
}

function renderCourseSections() {
  const container = document.getElementById("sectionsContainer");
  const openSections = new Set(
    Array.from(container.querySelectorAll(".section-block.open")).map((el) => el.dataset.sectionId)
  );
  const openChapters = new Set(
    Array.from(container.querySelectorAll(".chapter-card.open")).map((el) => el.dataset.chapterKey)
  );

  container.innerHTML = "";

  COURSE_DATA.forEach((section) => {
    container.appendChild(buildSectionBlock(section, openSections, openChapters));
  });
}

function buildSectionBlock(section, openSections, openChapters) {
  const { total, completed, percent } = calculateSectionProgress(section);

  const block = document.createElement("div");
  block.className = "section-block";
  block.id = `section-${section.id}`;
  block.dataset.sectionId = section.id;
  if (openSections.has(section.id)) block.classList.add("open");

  const header = document.createElement("div");
  header.className = "section-header";
  header.innerHTML = `
    <span class="chevron">${chevronSvg()}</span>
    <div class="section-header-main">
      <div class="section-header-top">
        <span class="section-name">${section.name}</span>
        <span class="section-percent${completeClass(percent)}">${formatPercent(percent)}</span>
      </div>
      <div class="section-meta">
        <div class="progress-track">
          <div class="progress-fill${completeClass(percent)}" style="width: ${percent}%"></div>
        </div>
        <span class="section-count">${completed} / ${total} lectures</span>
      </div>
    </div>
  `;
  header.addEventListener("click", () => {
    block.classList.toggle("open");
  });

  const chapterList = document.createElement("div");
  chapterList.className = "chapter-list";

  const chapterListInner = document.createElement("div");
  chapterListInner.className = "chapter-list-inner";

  const chapterListPad = document.createElement("div");
  chapterListPad.className = "chapter-list-pad";

  section.chapters.forEach((chapter, chapterIndex) => {
    chapterListPad.appendChild(buildChapterCard(section, chapter, chapterIndex, openChapters));
  });

  chapterListInner.appendChild(chapterListPad);
  chapterList.appendChild(chapterListInner);

  block.appendChild(header);
  block.appendChild(chapterList);

  return block;
}

function buildChapterCard(section, chapter, chapterIndex, openChapters) {
  const chapterKey = `${section.id}_${chapterIndex}`;
  const result = calculateChapterProgress(section.id, chapterIndex, chapter);

  const card = document.createElement("div");
  card.className = "chapter-card" + (result.hasData ? "" : " empty");
  card.dataset.chapterKey = chapterKey;
  if (result.hasData && openChapters.has(chapterKey)) card.classList.add("open");
  const color = chapterColor(chapter.name);
  card.style.setProperty("--card-accent", color);
  card.style.setProperty("--card-glow", `${color}55`);

  const header = document.createElement("div");
  header.className = "chapter-header";

  if (result.hasData) {
    header.innerHTML = `
      <span class="chevron">${chevronSvg()}</span>
      <div class="chapter-header-main">
        <div class="chapter-header-top">
          <span class="chapter-name">${chapter.name}</span>
          <span class="chapter-percent${completeClass(result.percent)}">${formatPercent(result.percent)}</span>
        </div>
        <div class="chapter-meta">
          <div class="progress-track">
            <div class="progress-fill${completeClass(result.percent)}" style="width: ${result.percent}%"></div>
          </div>
          <span class="chapter-count">${result.completed} / ${result.total} lectures</span>
        </div>
      </div>
    `;
    header.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  } else {
    header.innerHTML = `
      <span class="chevron">${chevronSvg()}</span>
      <div class="chapter-header-main">
        <div class="chapter-header-top">
          <span class="chapter-name">${chapter.name}</span>
          <span class="chapter-percent muted">No data</span>
        </div>
        <p class="chapter-empty-note">Lecture count not added yet</p>
      </div>
    `;
  }

  card.appendChild(header);

  if (result.hasData) {
    const lectureList = document.createElement("div");
    lectureList.className = "lecture-list";

    const lectureListInner = document.createElement("div");
    lectureListInner.className = "lecture-list-inner";

    const lectureListPad = document.createElement("div");
    lectureListPad.className = "lecture-list-pad";

    for (let i = 0; i < chapter.lectures; i++) {
      lectureListPad.appendChild(buildLectureRow(section, chapter, chapterIndex, i));
    }

    lectureListInner.appendChild(lectureListPad);
    lectureList.appendChild(lectureListInner);
    card.appendChild(lectureList);
  }

  return card;
}

function buildLectureRow(section, chapter, chapterIndex, lectureIndex) {
  const key = lectureKey(section.id, chapterIndex, lectureIndex);
  const isCompleted = isLectureCompleted(key);
  const completedDate = getLectureDate(key);
  const classNumber = String(lectureIndex + 1).padStart(2, "0");
  const color = chapterColor(chapter.name);

  const row = document.createElement("label");
  row.className = "lecture-row" + (isCompleted ? " completed" : "");
  row.innerHTML = `
    <input type="checkbox" ${isCompleted ? "checked" : ""} />
    <span class="lecture-checkbox">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
    <span class="lecture-icon" style="color: ${color}; background: ${color}26; box-shadow: 0 0 0 1px ${color}40;">${chapterIconSvg(chapter.name)}</span>
    <span class="lecture-label">Class - ${classNumber} || by Gagan sir</span>
    ${isCompleted && completedDate ? `<span class="lecture-date">${formatDisplayDate(completedDate)}</span>` : ""}
  `;

  const checkbox = row.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => {
    toggleLecture(section, chapterIndex, lectureIndex);
  });

  return row;
}

function chevronSvg() {
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
}

/* ---------------------------------------------------------
   5. USER ACTIONS
   --------------------------------------------------------- */

// Checking a lecture stamps it with today's local date; unchecking it
// removes the entry entirely (completion state and date together).
// Always acts on whichever pass (study/revision) is currently active.
function toggleLecture(section, chapterIndex, lectureIndex) {
  const key = lectureKey(section.id, chapterIndex, lectureIndex);
  const store = activeStore();
  if (isLectureCompleted(key)) {
    delete store[key];
  } else {
    store[key] = { completed: true, completedDate: getTodayLocalDateString() };
  }
  saveProgress();
  renderAll();
}

// Switches between the Study pass and the Revision pass, then re-renders
// everything against the newly active data set (open accordions stay open).
function setMode(mode) {
  currentMode = mode;
  updateModeToggleUI();
  renderAll();
}

function updateModeToggleUI() {
  const label = document.getElementById("modeToggleLabel");
  const button = document.getElementById("modeToggleBtn");
  const overallLabel = document.getElementById("overallLabel");
  const overallCount = document.getElementById("overallCount");
  const isRevision = currentMode === "revision";

  label.textContent = isRevision ? "Switch to Study" : "Switch to Revision";
  button.classList.toggle("revision-active", isRevision);
  overallLabel.textContent = isRevision ? "Mathematics Revision Progress" : "Mathematics Study Progress";
  overallLabel.classList.toggle("mode-study", !isRevision);
  overallLabel.classList.toggle("mode-revision", isRevision);
  overallCount.classList.toggle("mode-study", !isRevision);
  overallCount.classList.toggle("mode-revision", isRevision);
}

/* ---------------------------------------------------------
   6. INITIALIZATION
   --------------------------------------------------------- */

function init() {
  loadProgress();
  updateModeToggleUI();
  renderAll();
  document.getElementById("modeToggleBtn").addEventListener("click", () => {
    setMode(currentMode === "study" ? "revision" : "study");
  });
}

document.addEventListener("DOMContentLoaded", init);
