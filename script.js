const RANKS = [
  { min: 0,    max: 499,    title: "Recruit",  icon: "⚔",  color: "#888780", border: "#B4B2A9", bg: "#1c1c1a" },
  { min: 500,  max: 999,    title: "Soldier",  icon: "🗡",  color: "#4caf6e", border: "#97C459", bg: "#111a13" },
  { min: 1000, max: 1999,   title: "Veteran",  icon: "🛡",  color: "#3d8ef0", border: "#85B7EB", bg: "#0f1620" },
  { min: 2000, max: 3499,   title: "Elite",    icon: "👑",  color: "#EF9F27", border: "#EF9F27", bg: "#1c1508" },
  { min: 3500, max: 4999,   title: "Champion", icon: "🏆",  color: "#e05a40", border: "#D85A30", bg: "#1c0f0a" },
  { min: 5000, max: Infinity,title: "Legend",  icon: "★",   color: "#9f99e8", border: "#AFA9EC", bg: "#130f2a" },
];

const MEDALS = ["🥇", "🥈", "🥉"];

let players = [];
let sortKey = "total";

function getRank(pts) {
  return RANKS.find(r => pts >= r.min && pts <= r.max) || RANKS[0];
}

function initials(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase() || "??";
}

function total(p) {
  return (p.civ || 0) + (p.hg || 0) + (p.uhc || 0);
}

function fmt(n) {
  return Number(n).toLocaleString();
}

function sorted() {
  return [...players].sort((a, b) => {
    if (sortKey === "civ")   return (b.civ || 0) - (a.civ || 0);
    if (sortKey === "hg")    return (b.hg  || 0) - (a.hg  || 0);
    if (sortKey === "uhc")   return (b.uhc || 0) - (a.uhc || 0);
    return total(b) - total(a);
  });
}

function save() {
  localStorage.setItem("suhc-players", JSON.stringify(players));
}

function load() {
  try {
    const raw = localStorage.getItem("suhc-players");
    if (raw) players = JSON.parse(raw);
  } catch (_) {}
}

function render() {
  const list = sorted();
  const rows = document.getElementById("rows");
  const empty = document.getElementById("empty-state");
  const board = document.getElementById("board");

  document.getElementById("total-players").textContent = players.length;
  document.getElementById("total-points-sum").textContent = fmt(players.reduce((s, p) => s + total(p), 0));

  if (list.length === 0) {
    board.style.display = "none";
    empty.style.display = "block";
    return;
  }

  board.style.display = "block";
  empty.style.display = "none";

  rows.innerHTML = "";
  list.forEach((p, i) => {
    const rank = getRank(total(p));
    const pos = i + 1;
    const row = document.createElement("div");
    row.className = "player-row";
    row.dataset.id = p.id;

    const posCell = pos <= 3
      ? `<span class="col-pos pos-medal">${MEDALS[pos - 1]}</span>`
      : `<span class="col-pos">#${pos}</span>`;

    row.innerHTML = `
      ${posCell}
      <div class="col-info">
        <div class="avatar" style="--av-color:${rank.color};--av-border:${rank.border};--av-bg:${rank.bg}">${initials(p.name)}</div>
        <div>
          <div class="player-name">${escHtml(p.name)}</div>
          <div class="player-rank-title" style="--rank-color:${rank.color}">${rank.icon} ${rank.title}</div>
        </div>
      </div>
      <span class="col-civ col-stat">${fmt(p.civ || 0)}</span>
      <span class="col-hg  col-stat">${fmt(p.hg  || 0)}</span>
      <span class="col-uhc col-stat">${fmt(p.uhc  || 0)}</span>
      <span class="col-pts col-total">${fmt(total(p))}</span>
    `;

    row.addEventListener("click", () => openDetail(p.id));
    rows.appendChild(row);
  });
}

function escHtml(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

function openDetail(id) {
  const p = players.find(x => x.id === id);
  if (!p) return;

  const list = sorted();
  const pos = list.findIndex(x => x.id === id) + 1;
  const rank = getRank(total(p));
  const t = total(p);
  const maxStat = Math.max(p.civ || 0, p.hg || 0, p.uhc || 0, 1);

  const av = document.getElementById("detail-avatar");
  av.textContent = initials(p.name);
  av.style.background = rank.bg;
  av.style.color = rank.color;
  av.style.borderColor = rank.border;

  document.getElementById("detail-name").textContent = p.name;
  document.getElementById("detail-rank").innerHTML = `<span style="color:${rank.color}">${rank.icon} ${rank.title}</span>`;
  document.getElementById("detail-position").textContent = `Rank #${pos} overall`;
  document.getElementById("detail-total").textContent = fmt(t);

  const pct = v => Math.round(((v || 0) / maxStat) * 100);
  setTimeout(() => {
    document.getElementById("bar-civ").style.width = pct(p.civ) + "%";
    document.getElementById("bar-hg").style.width  = pct(p.hg)  + "%";
    document.getElementById("bar-uhc").style.width = pct(p.uhc) + "%";
  }, 60);

  document.getElementById("val-civ").textContent = fmt(p.civ || 0);
  document.getElementById("val-hg").textContent  = fmt(p.hg  || 0);
  document.getElementById("val-uhc").textContent = fmt(p.uhc  || 0);

  const badges = [];
  if (pos === 1) badges.push(`<span class="badge badge-top1">🥇 #1 All Time</span>`);
  if (pos === 2) badges.push(`<span class="badge badge-top2">🥈 #2 All Time</span>`);
  if (pos === 3) badges.push(`<span class="badge badge-top3">🥉 #3 All Time</span>`);
  if (t >= 5000) badges.push(`<span class="badge badge-legend">★ Legend</span>`);
  const top = Math.max(p.civ || 0, p.hg || 0, p.uhc || 0);
  if (top === (p.civ || 0) && top > 0) badges.push(`<span class="badge badge-civ">CIV Specialist</span>`);
  else if (top === (p.hg || 0) && top > 0) badges.push(`<span class="badge badge-hg">HG Specialist</span>`);
  else if (top === (p.uhc || 0) && top > 0) badges.push(`<span class="badge badge-uhc">UHC Specialist</span>`);

  document.getElementById("modal-badges").innerHTML = badges.join("");
  document.getElementById("detail-overlay").classList.add("open");
}

function closeDetail() {
  document.getElementById("detail-overlay").classList.remove("open");
  document.getElementById("bar-civ").style.width = "0";
  document.getElementById("bar-hg").style.width  = "0";
  document.getElementById("bar-uhc").style.width = "0";
}

function openAdd() {
  document.getElementById("inp-name").value = "";
  document.getElementById("inp-civ").value  = "";
  document.getElementById("inp-hg").value   = "";
  document.getElementById("inp-uhc").value  = "";
  document.getElementById("form-error").textContent = "";
  document.getElementById("form-preview").style.display = "none";
  document.getElementById("add-overlay").classList.add("open");
  setTimeout(() => document.getElementById("inp-name").focus(), 100);
}

function closeAdd() {
  document.getElementById("add-overlay").classList.remove("open");
}

function submitAdd() {
  const name = document.getElementById("inp-name").value.trim();
  const civ  = parseInt(document.getElementById("inp-civ").value)  || 0;
  const hg   = parseInt(document.getElementById("inp-hg").value)   || 0;
  const uhc  = parseInt(document.getElementById("inp-uhc").value)  || 0;
  const err  = document.getElementById("form-error");

  if (!name) { err.textContent = "Player name is required."; return; }
  if (players.find(p => p.name.toLowerCase() === name.toLowerCase())) {
    err.textContent = "A player with that name already exists."; return;
  }
  if ([civ, hg, uhc].some(v => v < 0)) { err.textContent = "Points can't be negative."; return; }

  players.push({ id: Date.now(), name, civ, hg, uhc });
  save();
  render();
  closeAdd();
}

function updatePreview() {
  const civ = parseInt(document.getElementById("inp-civ").value) || 0;
  const hg  = parseInt(document.getElementById("inp-hg").value)  || 0;
  const uhc = parseInt(document.getElementById("inp-uhc").value) || 0;
  const t = civ + hg + uhc;
  const preview = document.getElementById("form-preview");
  if (t > 0) {
    preview.style.display = "flex";
    document.getElementById("preview-total").textContent = fmt(t);
  } else {
    preview.style.display = "none";
  }
}

/* ── BOOT ── */
document.addEventListener("DOMContentLoaded", () => {
  load();

  if (players.length === 0) {
    players = [
      { id: 1, name: "Zephyr_X",   civ: 2100, hg: 1800, uhc: 1520 },
      { id: 2, name: "NovaBlade",  civ: 1500, hg: 1200, uhc: 1100 },
      { id: 3, name: "CrimsonAce", civ: 1000, hg: 900,  uhc: 850  },
    ];
    save();
  }

  render();

  document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      sortKey = btn.dataset.sort;
      render();
    });
  });

  document.getElementById("open-add").addEventListener("click", openAdd);
  document.getElementById("add-close").addEventListener("click", closeAdd);
  document.getElementById("add-cancel").addEventListener("click", closeAdd);
  document.getElementById("add-submit").addEventListener("click", submitAdd);
  document.getElementById("detail-close").addEventListener("click", closeDetail);

  document.getElementById("add-overlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeAdd();
  });
  document.getElementById("detail-overlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeDetail();
  });

  ["inp-civ","inp-hg","inp-uhc"].forEach(id => {
    document.getElementById(id).addEventListener("input", updatePreview);
  });

  document.getElementById("inp-name").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("inp-civ").focus();
  });
  document.getElementById("add-submit").addEventListener("keydown", e => {
    if (e.key === "Enter") submitAdd();
  });
});
