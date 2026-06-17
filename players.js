// ── Badge Definitions ──────────────────────────────────────────────────────
// Add new badge IDs here and reference them in player `badges` arrays.
const BADGES = {
  "founder": {
    name: "Founder",
    desc: "One of the original SUHC members",
    icon: "icons/badge_founder.png"
  },
  "og": {
    name: "OG",
    desc: "Been here since the very beginning",
    icon: "icons/badge_og.png"
  },
  "champion": {
    name: "Champion",
    desc: "Won a major SUHC tournament",
    icon: "icons/badge_champion.png"
  },
};

// ── Player Definitions ─────────────────────────────────────────────────────
//
// Each player object supports:
//   name     {string}  Display name
//   color    {string}  Fallback hex color (used if skin fails to load)
//   skin     {string}  (optional) Minecraft username OR direct skin PNG URL.
//                      - If a Minecraft username is given (e.g. "FatherAJT"),
//                        the site will render their skin via crafatar.com.
//                      - If omitted, defaults to the classic Steve skin.
//                      - To use a custom/offline skin, provide a direct URL to
//                        a 64×64 skin PNG, e.g. "https://example.com/myskin.png"
//   civ      {number}  CIV points
//   hg       {number}  HG points
//   uhc      {number}  UHC points
//   badges   {string[]} Array of badge IDs from BADGES above (optional)
//
const PLAYERS = [
  {
    name: "FatherAJT",
    color: "#e05c5c",
    skin: "FatherAJT",       // Minecraft username → auto-fetched from crafatar
    civ: 1000,
    hg: 900,
    uhc: 850,
    badges: ["founder", "champion"],
  },
  {
    name: "sithslayer337",
    color: "#818cf8",
    skin: "sithslayer337",   // Minecraft username → auto-fetched from crafatar
    civ: 203,
    hg: 77,
    uhc: 0,
    badges: ["founder", "og"],
  },
  {
    name: "Verxza_x",
    color: "#7c3aed",
    skin: "Verxza_x",        // Minecraft username → auto-fetched from crafatar
    civ: 150,
    hg: 12,
    uhc: 110,
    badges: [],
  },
];
