// ── TIER SYSTEM ──────────────────────────────────────────────
const TIERS = [
  {
    key: "WOOD",
    name: "Wood",
    icon: "icons/wood.png",
    color: "#9e9e9e",
    border: "#757575",
    bg: "#1a1a1a",
    subtiers: [
      { label: "I",   min: 0,   max: 14  },
      { label: "II",  min: 15,  max: 20  },
      { label: "III", min: 21,  max: 27  },
    ]
  },
  {
    key: "STONE",
    name: "Stone",
    icon: "icons/stone.png",
    color: "#f0c040",
    border: "#c9a800",
    bg: "#1a1700",
    subtiers: [
      { label: "I",   min: 28,  max: 35  },
      { label: "II",  min: 36,  max: 43  },
      { label: "III", min: 44,  max: 52  },
    ]
  },
  {
    key: "IRON",
    name: "Iron",
    icon: "icons/iron.png",
    color: "#e08020",
    border: "#b35f00",
    bg: "#1a0e00",
    subtiers: [
      { label: "I",   min: 53,  max: 61  },
      { label: "II",  min: 62,  max: 71  },
      { label: "III", min: 72,  max: 82  },
    ]
  },
  {
    key: "DIAMOND",
    name: "Diamond",
    icon: "icons/diamond.png",
    color: "#b06edd",
    border: "#8840bb",
    bg: "#150a20",
    subtiers: [
      { label: "I",   min: 83,  max: 94  },
      { label: "II",  min: 95,  max: 107 },
      { label: "III", min: 108, max: 121 },
    ]
  },
  {
    key: "NETHERITE",
    name: "Netherite",
    icon: "icons/netherite.png",
    color: "#e03030",
    border: "#aa1010",
    bg: "#1a0000",
    subtiers: [
      { label: "I",   min: 122, max: 136    },
      { label: "II",  min: 137, max: 153    },
      { label: "III", min: 154, max: 999999 },
    ]
  },
];

const SUBTIER_COLOR = "#aaaaaa";
const MEDALS = ["🥇", "🥈", "🥉"];

let players = [];
let sortKey = "total";

// ── RANK LOGIC ───────────────────────────────────────────────
function getRank(pts) {
  for (const tier of TIERS) {
    for (const sub of tier.subtiers) {
      if (pts >= sub.min && pts <= sub.max) {
        return { tier, sub };
      }
    }
  }
  return { tier: TIERS[0], sub: TIERS[0].subtiers[0] };
}

function rankLabel(pts) {
  const { tier, sub } = getRank(pts);
  return `${tier.name} ${sub.label}`;
}

function initials(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase() || "??";
}

function total(p) {
  return ((p.civ || 0) + (p.hg || 0) + (p.uhc || 0)) / 3;
}

function fmt(n) {
  return Number(n).toLocaleString();
}

function sorted() {
  return [...players].sort((a, b) => {
    if (sortKey === "civ") return (b.civ || 0) - (a.civ || 0);
    if (sortKey === "hg")  return (b.hg  || 0) - (a.hg  || 0);
    if (sortKey === "uhc") return (b.uhc || 0) - (a.uhc || 0);
    return total(b) - total(a);
  });
}

// ── RENDER ───────────────────────────────────────────────────
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
    const t = total(p);
    const { tier, sub } = getRank(t);
    const pos = i + 1;
    const row = document.createElement("div");
    row.className = "player-row";
    row.dataset.id = p.id;

    const posCell = pos <= 3
      ? `<span class="col-pos pos-medal">${MEDALS[pos - 1]}</span>`
      : `<span class="col-pos">#${pos}</span>`;

    const iconImg = `<img src="${tier.icon}" class="tier-icon-sm" alt="${tier.name}" onerror="this.style.display='none'">`;

    row.innerHTML = `
      ${posCell}
      <div class="col-info">
        <div class="avatar" style="--av-color:${tier.color};--av-border:${tier.border};--av-bg:${tier.bg}">${initials(p.name)}</div>
        <div>
          <div class="player-name">${escHtml(p.name)}</div>
          <div class="player-rank-title">
            ${iconImg}
            <span style="color:${tier.color}">${tier.name}</span>
            <span style="color:${SUBTIER_COLOR}">&nbsp;${sub.label}</span>
          </div>
        </div>
      </div>
      <span class="col-civ col-stat">${fmt(p.civ || 0)}</span>
      <span class="col-hg  col-stat">${fmt(p.hg  || 0)}</span>
      <span class="col-uhc col-stat">${fmt(p.uhc  || 0)}</span>
      <span class="col-pts col-total">${fmt(t)}</span>
    `;

    row.addEventListener("click", () => openDetail(p.id));
    rows.appendChild(row);
  });
}

function escHtml(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ── DETAIL MODAL ─────────────────────────────────────────────
function openDetail(id) {
  const p = players.find(x => x.id === id);
  if (!p) return;

  const list = sorted();
  const pos = list.findIndex(x => x.id === id) + 1;
  const t = total(p);
  const { tier, sub } = getRank(t);
  const maxStat = Math.max(p.civ || 0, p.hg || 0, p.uhc || 0, 1);

  const av = document.getElementById("detail-avatar");
  av.textContent = initials(p.name);
  av.style.background = tier.bg;
  av.style.color = tier.color;
  av.style.borderColor = tier.border;

  document.getElementById("detail-name").textContent = p.name;

  const iconEl = document.getElementById("detail-tier-icon");
  iconEl.src = tier.icon;
  iconEl.alt = tier.name;
  iconEl.onerror = function() { this.style.display = "none"; };

  document.getElementById("detail-rank").innerHTML =
    `<span style="color:${tier.color}">${tier.name}</span> <span style="color:${SUBTIER_COLOR}">${sub.label}</span>`;
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
  if (tier.key === "NETHERITE") badges.push(`<span class="badge badge-neth">Netherite</span>`);
  const topStat = Math.max(p.civ || 0, p.hg || 0, p.uhc || 0);
  if (topStat === (p.civ || 0) && topStat > 0) badges.push(`<span class="badge badge-civ">CIV Specialist</span>`);
  else if (topStat === (p.hg || 0) && topStat > 0) badges.push(`<span class="badge badge-hg">HG Specialist</span>`);
  else if (topStat === (p.uhc || 0) && topStat > 0) badges.push(`<span class="badge badge-uhc">UHC Specialist</span>`);

  document.getElementById("modal-badges").innerHTML = badges.join("");
  document.getElementById("detail-overlay").classList.add("open");
}

function closeDetail() {
  document.getElementById("detail-overlay").classList.remove("open");
  document.getElementById("bar-civ").style.width = "0";
  document.getElementById("bar-hg").style.width  = "0";
  document.getElementById("bar-uhc").style.width = "0";
}

// ── BOOT ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Players come from players.js (PLAYERS array)
  players = typeof PLAYERS !== "undefined" ? PLAYERS : [];

  render();

  document.querySelectorAll(".sort-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      sortKey = btn.dataset.sort;
      render();
    });
  });

  document.getElementById("detail-close").addEventListener("click", closeDetail);
  document.getElementById("detail-overlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeDetail();
  });
});

// ── RANK LEGEND ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const legend = document.getElementById("rank-legend");
  if (!legend) return;
  TIERS.forEach(tier => {
    tier.subtiers.forEach(sub => {
      const pill = document.createElement("div");
      pill.className = "rank-pill";
      pill.innerHTML = `
        <img src="${tier.icon}" class="tier-icon-pill" alt="${tier.name}" onerror="this.style.display='none'">
        <span style="color:${tier.color}">${tier.name}</span>
        <span style="color:${SUBTIER_COLOR}">&nbsp;${sub.label}</span>
        <em>${sub.min}${sub.max > 99999 ? "+" : "–" + sub.max}</em>
      `;
      legend.appendChild(pill);
    });
  });
});
