/**
 * SUHC Leaderboard — Player Data
 *
 * HOW TO ADD A PLAYER:
 * Add an object to the PLAYERS array with:
 *   name   : "PlayerName"
 *   head   : "filename.png" (optional — file in icons/heads/; defaults to default.png)
 *   color  : "#hexcolor" (used for accent/border on head; also fallback bg)
 *   civ    : number (CIV points — set 0 if none)
 *   hg     : number (HG points — set 0 if none)
 *   uhc    : number (UHC points — set 0 if none)
 *   badges : [] (array of badge IDs — see BADGES below, or leave empty [])
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
    og: { id: "og", name: "OG", icon: "icons/badge_og.png", desc: "Original Member — been here since the beginning" },
    hoster: { id: "hoster", name: "Hoster", icon: "icons/badge_hoster.png", desc: "Hoster — has hosted games for the community" },
    executive: { id: "executive", name: "Executive", icon: "icons/badge_executive.png", desc: "Executive — server leadership & administration" },
    hg_champion: { id: "hg_champion", name: "HG Champion", icon: "icons/badge_hg_champion.png", desc: "HG Champion — won a Hunger Games tournament" },
    uhc_champion: { id: "uhc_champion", name: "UHC Champion", icon: "icons/badge_uhc_champion.png", desc: "UHC Champion — won a UHC tournament" },
    inviter: { id: "inviter", name: "Inviter", icon: "icons/badge_inviter.png", desc: "Inviter — brought new players into the community" },
    civ_champion: { id: "civ_champion", name: "CIV Champion", icon: "icons/badge_civ_champion.png", desc: "CIV Champion — won a Civilization tournament" },
    contributor: { id: "contributor", name: "Contributor", icon: "icons/badge_contributor.png", desc: "Contributor — helped build or improve the server/community" }
};
 
const PLAYERS = [
    { name: "UserAbuser1493", color: "#888888", civ: 3, hg: 0, uhc: 0, badges: [] },
    { name: "Geno7L", color: "#888888", civ: 6, hg: 0, uhc: 0, badges: [] },
    { name: "clutchalt129", color: "#888888", civ: 6, hg: 0, uhc: 0, badges: [] },
    { name: "SwingMCC", color: "#888888", civ: 6, hg: 0, uhc: 59, badges: [] },
    { name: "G3RM4NHD", color: "#888888", civ: 7, hg: 0, uhc: 0, badges: ["og"] },
    { name: "HunterA23", color: "#888888", civ: 10, hg: 0, uhc: 0, badges: [] },
    { name: "Mr divel8118", color: "#888888", civ: 10, hg: 0, uhc: 0, badges: [] },
    { name: "Ultra Glizzy", color: "#888888", civ: 10, hg: 0, uhc: 0, badges: [] },
    { name: "FGKPLAYZ", color: "#888888", civ: 13, hg: 0, uhc: 0, badges: [] },
    { name: "Diamond24891", color: "#888888", civ: 15, hg: 0, uhc: 36, badges: [] },
    { name: "ItzCazry", color: "#888888", civ: 15, hg: 0, uhc: 6, badges: [] },
    { name: "silentHT1", color: "#888888", civ: 16, hg: 0, uhc: 0, badges: [] },
    { name: "Headtedtree1", color: "#888888", civ: 16, hg: 0, uhc: 0, badges: [] },
    { name: "Giantcoolben733", color: "#888888", civ: 17, hg: 0, uhc: 0, badges: [] },
    { name: "RequiemXV2", color: "#888888", civ: 17, hg: 0, uhc: 140, badges: [] },
    { name: "RebuiltTerror81", color: "#888888", civ: 17, hg: 0, uhc: 0, badges: [] },
    { name: "praise aq4a", color: "#888888", civ: 17, hg: 0, uhc: 0, badges: [] },
    { name: "AjarFerret10543", color: "#888888", civ: 17, hg: 0, uhc: 0, badges: [] },
    { name: "TodayBadge5645", color: "#888888", civ: 18, hg: 0, uhc: 65, badges: [] },
    { name: "Cube Ox", color: "#888888", civ: 19, hg: 0, uhc: 59, badges: [] },
    { name: "GoincraZy6", color: "#888888", civ: 21, hg: 0, uhc: 0, badges: [] },
    { name: "Kaiistooicy", color: "#888888", civ: 22, hg: 0, uhc: 72, badges: ["og"] },
    { name: "UnrulyBrayden", color: "#888888", civ: 0, hg: 0, uhc: 23, badges: [] },
    { name: "BOBJR789", color: "#888888", civ: 0, hg: 0, uhc: 15, badges: [] },
    { name: "jabel578", color: "#888888", civ: 24, hg: 0, uhc: 28, badges: [] },
    { name: "Badboy7068", color: "#888888", civ: 25, hg: 0, uhc: 0, badges: [] },
    { name: "Milkshake7464", color: "#888888", civ: 25, hg: 0, uhc: 0, badges: [] },
    { name: "Drenren", color: "#888888", civ: 26, hg: 0, uhc: 33, badges: [] },
    { name: "Itzrealvexy", color: "#888888", civ: 27, hg: 0, uhc: 15, badges: ["og", "contributor"] },
    { name: "Yodudepizzia9", color: "#888888", civ: 27, hg: 0, uhc: 0, badges: [] },
    { name: "Plague0171", color: "#888888", civ: 27, hg: 0, uhc: 9, badges: [] },
    { name: "Xanderparret", color: "#888888", civ: 27, hg: 0, uhc: 0, badges: [] },
    { name: "Bread4Bone", color: "#888888", civ: 27, hg: 0, uhc: 0, badges: [] },
    { name: "Snowflake23334", color: "#888888", civ: 27, hg: 0, uhc: 0, badges: [] },
    { name: "Kingiby91605976", color: "#888888", civ: 28, hg: 0, uhc: 0, badges: [] },
    { name: "OddRugX", color: "#888888", civ: 29, hg: 0, uhc: 0, badges: [] },
    { name: "maccy1511", color: "#888888", civ: 29, hg: 0, uhc: 0, badges: [] },
    { name: "Heatedtree1", color: "#888888", civ: 30, hg: 0, uhc: 0, badges: [] },
    { name: "Jackson1232246", color: "#888888", civ: 31, hg: 0, uhc: 0, badges: [] },
    { name: "justkqi", color: "#888888", civ: 31, hg: 0, uhc: 6, badges: [] },
    { name: "Bigshaq2067", color: "#888888", civ: 34, hg: 0, uhc: 0, badges: [] },
    { name: "BattierCrown747", color: "#888888", civ: 35, hg: 0, uhc: 51, badges: [] },
    { name: "BlitsyMC", color: "#888888", civ: 35, hg: 0, uhc: 0, badges: [] },
    { name: "dannycb69", color: "#888888", civ: 38, hg: 0, uhc: 0, badges: [] },
    { name: "madchad20081149", color: "#888888", civ: 39, hg: 0, uhc: 0, badges: [] },
    { name: "nightmarealt910", color: "#888888", civ: 46, hg: 0, uhc: 20, badges: [] },
    { name: "Verxza x", color: "#888888", civ: 48, hg: 0, uhc: 41, badges: ["og", "contributor"] },
    { name: "TecTonic7124", color: "#888888", civ: 49, hg: 0, uhc: 28, badges: [] },
    { name: "XeroX Goatt", color: "#888888", civ: 57, hg: 0, uhc: 27, badges: [] },
    { name: "DecaylngSky", color: "#888888", civ: 64, hg: 0, uhc: 0, badges: [] },
    { name: "Crackykleony", color: "#888888", civ: 70, hg: 0, uhc: 0, badges: [] },
    { name: "Boogieman881", color: "#888888", civ: 103, hg: 0, uhc: 0, badges: ["contributor"] },
    { name: "Goldieontop2277", color: "#888888", civ: 112, hg: 0, uhc: 0, badges: [] },
    { name: "Doomer99218", color: "#888888", civ: 125, hg: 0, uhc: 0, badges: [] },
    { name: "s1thslxyer33", color: "#888888", civ: 128, hg: 0, uhc: 0, badges: [] },
    { name: "MrFxber", color: "#888888", civ: 143, hg: 0, uhc: 0, badges: [] }
];
