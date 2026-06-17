/**
 * SUHC Leaderboard — Player Data
 *
 * HOW TO ADD A PLAYER:
 * Add an object to the PLAYERS array with:
 *   name    : "PlayerName"
 *   head    : "filename.png"  (optional — file in icons/heads/; defaults to default.png)
 *   color   : "#hexcolor"     (used for accent/border on head; also fallback bg)
 *   civ     : number          (CIV points — set 0 if none)
 *   hg      : number          (HG points  — set 0 if none)
 *   uhc     : number          (UHC points — set 0 if none)
 *   badges  : []              (array of badge IDs — see BADGES below, or leave empty [])
 *
 * HOW TO ADD A BADGE TO A PLAYER:
 * Just add the badge id string to their badges array.
 * Example: badges: ["og", "hoster"]
 *
 * AVAILABLE BADGE IDs:
 *   "og"           — OG (original member)
 *   "hoster"       — Hoster (ran games)
 *   "executive"    — Executive
 *   "hg_champion"  — HG Champion
 *   "uhc_champion" — UHC Champion
 *   "inviter"      — Inviter (brought people in)
 *   "civ_champion" — CIV Champion
 *   "contributor"  — Contributor
 */

const BADGES = {
  og: {
    id: "og",
    name: "OG",
    icon: "icons/badge_og.png",
    desc: "Original Member — been here since the beginning"
  },
  hoster: {
    id: "hoster",
    name: "Hoster",
    icon: "icons/badge_hoster.png",
    desc: "Hoster — has hosted games for the community"
  },
  executive: {
    id: "executive",
    name: "Executive",
    icon: "icons/badge_executive.png",
    desc: "Executive — server leadership & administration"
  },
  hg_champion: {
    id: "hg_champion",
    name: "HG Champion",
    icon: "icons/badge_hg_champion.png",
    desc: "HG Champion — won a Hunger Games tournament"
  },
  uhc_champion: {
    id: "uhc_champion",
    name: "UHC Champion",
    icon: "icons/badge_uhc_champion.png",
    desc: "UHC Champion — won a UHC tournament"
  },
  inviter: {
    id: "inviter",
    name: "Inviter",
    icon: "icons/badge_inviter.png",
    desc: "Inviter — brought new players into the community"
  },
  civ_champion: {
    id: "civ_champion",
    name: "CIV Champion",
    icon: "icons/badge_civ_champion.png",
    desc: "CIV Champion — won a Civilization tournament"
  },
  contributor: {
    id: "contributor",
    name: "Contributor",
    icon: "icons/badge_contributor.png",
    desc: "Contributor — helped build or improve the server/community"
  }
};

const PLAYERS = [
  {
    name: "FatherAJT",
    // head: "fatherajt.png",   ← uncomment & add file to icons/heads/ to use custom head
    color: "#c0392b",
    civ: 1000,
    hg: 900,
    uhc: 850,
    badges: ["og", "executive", "hoster"]
  },
  {
    name: "sithslayer337",
    // head: "sithslayer337.png",
    color: "#7c3aed",
    civ: 203,
    hg: 77,
    uhc: 0,
    badges: ["og", "contributor"]
  },
  {
    name: "Verxza_x",
    // head: "verxza_x.png",
    color: "#7c3aed",
    civ: 150,
    hg: 12,
    uhc: 110,
    badges: []
  }
];
