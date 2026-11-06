const FT_INK = '#5b4328';

const FT_SKIN = '#f6d2a8';

const FT_GOBLIN = '#8cbf5a';

const FT_ART = {
    sword: tint => `\n    <path d="M70 18 L76 64" stroke="${FT_INK}" stroke-width="9" stroke-linecap="round"/><path d="M70 18 L76 64" stroke="#e9eef2" stroke-width="4" stroke-linecap="round"/>\n    <path d="M66 62 L86 59" stroke="#e3b341" stroke-width="6" stroke-linecap="round"/>\n    <path d="M30 92 Q30 56 50 56 Q70 56 70 92 Z" fill="${tint}"/>\n    <rect x="31" y="74" width="38" height="7" fill="#8a5a2b"/>\n    <circle cx="50" cy="38" r="19" fill="${FT_SKIN}"/>\n    <path d="M30 38 Q30 17 50 17 Q70 17 70 38 Z" fill="#c9d1d9"/>\n    <circle cx="58" cy="42" r="3" fill="${FT_INK}"/>`,
    knight: tint => `\n    <path d="M28 94 Q26 52 50 52 Q74 52 72 94 Z" fill="#c9d1d9"/>\n    <rect x="44" y="56" width="12" height="38" fill="${tint}"/>\n    <circle cx="50" cy="34" r="20" fill="#c9d1d9"/>\n    <path d="M52 30 H70" stroke="${FT_INK}" stroke-width="5" stroke-linecap="round"/>\n    <path d="M44 16 Q50 2 60 8 Q54 10 54 16 Z" fill="${tint}"/>\n    <path d="M62 54 H88 V72 Q88 88 75 94 Q62 88 62 72 Z" fill="${tint}"/>\n    <path d="M75 58 V88 M66 70 H84" stroke="#ffffff" stroke-width="5" fill="none"/>`,
    archer: tint => `\n    <path d="M74 12 Q96 50 74 88" fill="none" stroke="#a0672e" stroke-width="6"/><path d="M74 12 V88" stroke="#ffffff" stroke-width="2"/>\n    <rect x="18" y="54" width="12" height="30" rx="3" fill="#a0672e" transform="rotate(-14 24 68)"/>\n    <path d="M30 92 Q30 56 50 56 Q70 56 70 92 Z" fill="${tint}"/>\n    <circle cx="50" cy="38" r="18" fill="${FT_SKIN}"/>\n    <path d="M28 46 Q26 14 50 14 Q74 14 72 40 L64 40 Q60 26 46 28 Q36 30 36 46 Z" fill="#5f9a46"/>\n    <circle cx="58" cy="42" r="3" fill="${FT_INK}"/>`,
    fire: tint => `\n    <path d="M76 22 V94" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>\n    <circle cx="76" cy="18" r="10" fill="#ff9a3d"/><circle cx="76" cy="18" r="5" fill="#fff1a8" stroke="none"/>\n    <path d="M26 94 L40 54 H60 L74 94 Z" fill="#8a5cc4"/>\n    <circle cx="50" cy="44" r="16" fill="${FT_SKIN}"/>\n    <path d="M40 52 Q50 74 60 52 Z" fill="#ffffff"/>\n    <path d="M26 36 L54 0 L74 36 Z" fill="#8a5cc4"/><path d="M30 31 H71" stroke="${tint}" stroke-width="7"/>\n    <circle cx="57" cy="44" r="3" fill="${FT_INK}"/>`,
    ice: tint => `\n    <path d="M76 22 V94" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>\n    <path d="M76 4 L86 18 L76 32 L66 18 Z" fill="#9fe4ff"/>\n    <path d="M26 94 L40 54 H60 L74 94 Z" fill="#4a8ad4"/>\n    <circle cx="50" cy="44" r="16" fill="${FT_SKIN}"/>\n    <path d="M40 52 Q50 74 60 52 Z" fill="#ffffff"/>\n    <path d="M26 36 L54 0 L74 36 Z" fill="#4a8ad4"/><path d="M30 31 H71" stroke="${tint}" stroke-width="7"/>\n    <circle cx="57" cy="44" r="3" fill="${FT_INK}"/>`,
    grunt: () => `\n    <path d="M30 16 Q16 36 22 58" stroke="${FT_INK}" stroke-width="15" stroke-linecap="round"/><path d="M30 16 Q16 36 22 58" stroke="#a0672e" stroke-width="9" stroke-linecap="round"/>\n    <path d="M30 94 Q30 58 50 58 Q70 58 70 94 Z" fill="#9a6a3c"/>\n    <path d="M22 34 L4 26 L26 46 Z M78 34 L96 26 L74 46 Z" fill="${FT_GOBLIN}"/>\n    <circle cx="50" cy="40" r="20" fill="${FT_GOBLIN}"/>\n    <circle cx="41" cy="38" r="3.5" fill="${FT_INK}"/><circle cx="55" cy="38" r="3.5" fill="${FT_INK}"/>\n    <path d="M40 50 Q48 56 56 50" fill="none"/><path d="M42 50 L44 56 L46 51 M52 51 L54 56 L56 50" fill="#ffffff" stroke-width="2"/>`,
    runner: () => `\n    <path d="M72 60 H96 M74 72 H92" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".8"/>\n    <path d="M12 66 L32 62" stroke="${FT_INK}" stroke-width="8" stroke-linecap="round"/><path d="M12 66 L32 62" stroke="#dfe5ea" stroke-width="4" stroke-linecap="round"/>\n    <path d="M34 94 Q34 62 50 62 Q66 62 66 94 Z" fill="#7a5232"/>\n    <circle cx="50" cy="44" r="18" fill="#b9c95a"/>\n    <path d="M32 40 Q32 24 50 24 Q68 24 68 40 Z" fill="#d9483f"/><path d="M66 32 L80 38 L66 40 Z" fill="#d9483f"/>\n    <circle cx="42" cy="46" r="3" fill="${FT_INK}"/><circle cx="54" cy="46" r="3" fill="${FT_INK}"/>`,
    brute: () => `\n    <path d="M24 94 Q22 50 50 50 Q78 50 76 94 Z" fill="#b8604a"/>\n    <rect x="25" y="74" width="50" height="8" fill="#5b3a26"/>\n    <circle cx="52" cy="34" r="21" fill="#b8604a"/>\n    <path d="M30 30 Q30 10 52 10 Q74 10 74 30 Z" fill="#aab3bc"/>\n    <path d="M32 18 Q18 14 16 2 Q28 6 36 14 Z M72 18 Q86 14 88 2 Q76 6 68 14 Z" fill="#f2ead6"/>\n    <circle cx="44" cy="38" r="3.5" fill="${FT_INK}"/><circle cx="58" cy="38" r="3.5" fill="${FT_INK}"/>\n    <circle cx="20" cy="66" r="19" fill="#9aa3ad"/><circle cx="20" cy="66" r="6" fill="#dfe5ea"/>`,
    ram: () => `\n    <rect x="18" y="40" width="74" height="26" rx="12" fill="#b07a48"/>\n    <path d="M38 40 V66 M58 40 V66 M78 40 V66" stroke-width="3"/>\n    <path d="M4 40 Q4 53 18 66 V40 Z" fill="#9aa3ad"/><rect x="2" y="40" width="18" height="26" rx="8" fill="#9aa3ad"/>\n    <path d="M26 40 L34 22 H78 L86 40 Z" fill="#8a5a2b"/>\n    <circle cx="34" cy="76" r="10" fill="#6b5a4a"/><circle cx="76" cy="76" r="10" fill="#6b5a4a"/>`,
    boss: () => `\n    <path d="M24 4 V70" stroke="${FT_INK}" stroke-width="11" stroke-linecap="round"/><path d="M24 4 V70" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>\n    <rect x="6" y="2" width="36" height="20" rx="5" fill="#9aa3ad"/>\n    <path d="M26 96 Q24 50 54 50 Q84 50 82 96 Z" fill="#5b3a7a"/>\n    <circle cx="54" cy="36" r="22" fill="#9a62c4"/>\n    <path d="M36 18 L38 2 L46 12 L54 0 L62 12 L70 2 L72 18 Z" fill="#ffd24a"/>\n    <circle cx="46" cy="38" r="4.5" fill="#ff3b3b"/><circle cx="62" cy="38" r="4.5" fill="#ff3b3b"/>\n    <path d="M44 50 L48 56 L52 50 L56 56 L60 50" fill="none" stroke-width="3"/>`,
    gob_archer: () => `\n    <path d="M28 12 Q6 50 28 88" fill="none" stroke-width="6"/><path d="M28 12 Q6 50 28 88" fill="none" stroke="#a0672e" stroke-width="2.5"/><path d="M28 12 V88" stroke="#ffffff" stroke-width="2"/>\n    <rect x="70" y="52" width="11" height="28" rx="3" fill="#a0672e" transform="rotate(14 75 66)"/>\n    <path d="M32 94 Q32 60 50 60 Q68 60 68 94 Z" fill="#6f8a3c"/>\n    <path d="M24 36 L6 28 L28 48 Z M76 36 L94 28 L72 48 Z" fill="${FT_GOBLIN}"/>\n    <circle cx="50" cy="42" r="19" fill="${FT_GOBLIN}"/>\n    <path d="M30 40 Q30 20 50 20 Q70 20 70 40 L62 36 Q50 30 38 36 Z" fill="#4f6a2c"/>\n    <circle cx="42" cy="44" r="3.5" fill="${FT_INK}"/><circle cx="55" cy="44" r="3.5" fill="${FT_INK}"/>`,
    shaman: () => `\n    <circle cx="22" cy="18" r="13" fill="#b6f28a" stroke="none" opacity=".55"/>\n    <path d="M22 26 Q26 60 20 94" fill="none" stroke-width="6"/><path d="M22 26 Q26 60 20 94" fill="none" stroke="#8a5a2b" stroke-width="2.5"/>\n    <circle cx="22" cy="18" r="8" fill="#f2ead6"/><circle cx="19" cy="17" r="1.8" fill="${FT_INK}"/><circle cx="25" cy="17" r="1.8" fill="${FT_INK}"/>\n    <path d="M28 96 L36 58 H64 L72 96 Z" fill="#7a5ab0"/>\n    <path d="M40 60 L50 76 L60 60" fill="none" stroke="#f2ead6" stroke-width="3"/>\n    <circle cx="50" cy="44" r="18" fill="${FT_GOBLIN}"/>\n    <path d="M34 30 L30 8 L42 26 L48 4 L54 26 L66 8 L64 30 Z" fill="#e85d5d"/><path d="M33 31 H67" stroke-width="5"/>\n    <circle cx="43" cy="46" r="3.5" fill="${FT_INK}"/><circle cx="56" cy="46" r="3.5" fill="${FT_INK}"/>`,
    gob_mage: () => `\n    <path d="M24 22 V94" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>\n    <circle cx="24" cy="16" r="10" fill="#ff9a3d"/><circle cx="24" cy="16" r="5" fill="#fff1a8" stroke="none"/>\n    <path d="M28 96 L40 56 H60 L72 96 Z" fill="#c4473d"/>\n    <path d="M24 36 L8 30 L28 48 Z M76 36 L92 30 L72 48 Z" fill="${FT_GOBLIN}"/>\n    <circle cx="50" cy="44" r="17" fill="${FT_GOBLIN}"/>\n    <path d="M30 40 L50 2 L72 40 Q50 30 30 40 Z" fill="#c4473d"/>\n    <circle cx="43" cy="46" r="3.5" fill="${FT_INK}"/><circle cx="56" cy="46" r="3.5" fill="${FT_INK}"/>`,
    coin: () => `\n    <circle cx="50" cy="54" r="40" fill="#d99a1e"/>\n    <circle cx="50" cy="48" r="40" fill="#ffcf3f"/>\n    <circle cx="50" cy="48" r="28" fill="none" stroke="#e0a81c" stroke-width="5"/>\n    <path d="M50 30 L55 43 H68 L58 51 L62 64 L50 56 L38 64 L42 51 L32 43 H45 Z" fill="#fff0a8" stroke-width="3"/>`,
    b_sword: (tint, lv) => `\n    <path d="M10 88 L50 18 L90 88 Z" fill="${tint}"/>\n    <path d="M50 18 L36 88 M50 18 L64 88" stroke-width="3" opacity=".5"/>\n    <path d="M10 88 L50 18 L90 88" fill="none" stroke="${ftTrim(lv, 'none')}" stroke-width="5" opacity="${lv > 1 ? 1 : 0}"/>\n    <path d="M40 88 L50 56 L60 88 Z" fill="${ftTrim(lv, '#6b4a2a')}"/>\n    <path d="M50 18 V4" stroke-width="4"/><path d="M50 4 L66 9 L50 14 Z" fill="${ftTrim(lv, '#ffffff')}"/>`,
    b_knight: (tint, lv) => `\n    <path d="M12 88 V60 Q12 26 50 26 Q88 26 88 60 V88 Z" fill="#f2ead6"/>\n    <path d="M14 58 Q14 28 50 28 Q86 28 86 58 Q50 46 14 58 Z" fill="${tint}"/>\n    <path d="M44 28 L50 6 L56 28 Z" fill="${ftTrim(lv, '#f2ead6')}"/>\n    <path d="M38 88 V70 Q50 60 62 70 V88 Z" fill="#6b5a4a"/>\n    <path d="M40 46 H60 V56 Q60 66 50 70 Q40 66 40 56 Z" fill="${ftTrim(lv, '#9aa3ad')}"/>`,
    b_archer: (tint, lv) => `\n    <path d="M24 92 L34 50 M76 92 L66 50" stroke-width="6" stroke-linecap="round"/><path d="M24 92 L34 50 M76 92 L66 50" stroke="#a0672e" stroke-width="2.5"/>\n    <circle cx="50" cy="56" r="26" fill="#f2ead6"/><circle cx="50" cy="56" r="17" fill="${tint}"/><circle cx="50" cy="56" r="8" fill="${ftTrim(lv, '#ffffff')}"/>\n    <path d="M14 28 L50 10 L86 28 Z" fill="${ftTrim(lv, '#a0672e')}"/>`,
    b_fire: (tint, lv) => `\n    <rect x="28" y="40" width="44" height="50" fill="#d7d0c4"/>\n    <path d="M28 56 H72 M28 72 H72" stroke-width="2.5" opacity=".5"/>\n    <path d="M20 42 L50 4 L80 42 Z" fill="#8a5cc4"/><path d="M24 38 H76" stroke="${tint}" stroke-width="5"/>\n    <path d="M28 40 H72" stroke="${ftTrim(lv, '#d7d0c4')}" stroke-width="6" opacity="${lv > 1 ? 1 : 0}"/>\n    <circle cx="50" cy="6" r="6" fill="${ftTrim(lv, '#8a5cc4')}"/>\n    <path d="M42 66 Q42 54 50 54 Q58 54 58 66 V76 H42 Z" fill="#ff9a3d"/>`,
    b_ice: (tint, lv) => `\n    <rect x="28" y="40" width="44" height="50" fill="#d7d0c4"/>\n    <path d="M28 56 H72 M28 72 H72" stroke-width="2.5" opacity=".5"/>\n    <path d="M20 42 L50 4 L80 42 Z" fill="#4a8ad4"/><path d="M24 38 H76" stroke="${tint}" stroke-width="5"/>\n    <path d="M28 40 H72" stroke="${ftTrim(lv, '#d7d0c4')}" stroke-width="6" opacity="${lv > 1 ? 1 : 0}"/>\n    <circle cx="50" cy="6" r="6" fill="${ftTrim(lv, '#4a8ad4')}"/>\n    <path d="M42 66 Q42 54 50 54 Q58 54 58 66 V76 H42 Z" fill="#9fe4ff"/>`,
    b_ballista: (tint, lv) => `\n    <rect x="16" y="56" width="68" height="16" rx="4" fill="${ftTrim(lv, '#a0672e')}"/>\n    <path d="M28 56 Q50 18 72 56" fill="none" stroke-width="7"/><path d="M28 56 Q50 18 72 56" fill="none" stroke="#8a5a2b" stroke-width="3"/>\n    <path d="M10 50 H92" stroke-width="5" stroke-linecap="round"/><path d="M84 44 L96 50 L84 56 Z" fill="#c9d1d9"/>\n    <circle cx="28" cy="80" r="9" fill="#6b5a4a"/><circle cx="72" cy="80" r="9" fill="#6b5a4a"/>\n    <path d="M20 56 V36" stroke-width="3"/><path d="M20 36 L34 40 L20 44 Z" fill="${tint}"/>`,
    b_catapult: (tint, lv) => `\n    <rect x="14" y="58" width="72" height="14" rx="4" fill="${ftTrim(lv, '#a0672e')}"/>\n    <path d="M50 58 L36 30" stroke-width="5"/><path d="M50 64 L80 18" stroke-width="7" stroke-linecap="round"/><path d="M50 64 L80 18" stroke="#a0672e" stroke-width="3" stroke-linecap="round"/>\n    <path d="M70 18 Q80 30 92 16 Z" fill="#6b4a2a"/><circle cx="82" cy="14" r="7" fill="#9a958c"/>\n    <circle cx="26" cy="80" r="9" fill="#6b5a4a"/><circle cx="74" cy="80" r="9" fill="#6b5a4a"/>\n    <path d="M18 58 V38" stroke-width="3"/><path d="M18 38 L32 42 L18 46 Z" fill="${tint}"/>`,
    b_mint: (tint, lv) => `\n    <rect x="14" y="44" width="72" height="44" rx="6" fill="${ftTrim(lv, '#b07a48')}"/>\n    <path d="M14 58 H86" stroke-width="3"/>\n    <circle cx="34" cy="38" r="12" fill="#ffd24a"/><circle cx="56" cy="34" r="12" fill="#ffd24a"/><circle cx="72" cy="42" r="10" fill="#ffd24a"/>\n    <rect x="44" y="52" width="12" height="14" rx="2" fill="#e3b341"/>`,
    b_forge: (tint, lv) => `\n    <path d="M58 88 Q58 60 74 50 Q90 60 90 88 Z" fill="#ff9a3d"/><path d="M66 88 Q66 72 74 66 Q82 72 82 88 Z" fill="#ffe27a" stroke="none"/>\n    <path d="M8 46 H56 Q56 58 44 60 V74 H52 V86 H16 V74 H24 V60 Q12 58 8 46 Z" fill="${ftTrim(lv, '#6f7780')}"/>\n    <path d="M30 40 L50 14" stroke-width="7" stroke-linecap="round"/><path d="M30 40 L50 14" stroke="#a0672e" stroke-width="3" stroke-linecap="round"/>\n    <rect x="40" y="6" width="22" height="12" rx="3" fill="#9aa3ad" transform="rotate(38 51 12)"/>`,
    b_bastion: (tint, lv) => `\n    <path d="M10 88 V30 H24 V40 H38 V30 H62 V40 H76 V30 H90 V88 Z" fill="#c9c2b5"/>\n    <path d="M10 56 H90 M10 72 H90 M34 40 V56 M66 40 V56 M24 56 V72 M50 56 V72 M76 56 V72 M38 72 V88 M62 72 V88" stroke-width="2.5" opacity=".55"/>\n    <path d="M38 44 H62 V60 Q62 74 50 80 Q38 74 38 60 Z" fill="${ftTrim(lv, '#8fa3b8')}"/><path d="M38 54 H62" stroke-width="3"/>`,
    b_banner: (tint, lv) => `\n    <path d="M30 94 V8" stroke-width="7" stroke-linecap="round"/><path d="M30 94 V8" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/>\n    <circle cx="30" cy="8" r="5" fill="${ftTrim(lv, '#e3b341')}"/>\n    <path d="M34 14 H84 L74 34 L84 54 H34 Z" fill="${tint}"/>\n    <path d="M48 24 L68 44 M68 24 L48 44" stroke="${ftTrim(lv, '#ffffff')}" stroke-width="5" stroke-linecap="round"/>\n    <path d="M18 94 H44" stroke-width="6" stroke-linecap="round"/>`,
    b_market: (tint, lv) => `\n    <path d="M18 40 V90 M82 40 V90" stroke-width="5"/><path d="M18 40 V90 M82 40 V90" stroke="#a0672e" stroke-width="2"/>\n    <rect x="14" y="62" width="72" height="26" rx="4" fill="${ftTrim(lv, '#b07a48')}"/>\n    <circle cx="32" cy="58" r="8" fill="#f27d5e"/><circle cx="50" cy="56" r="8" fill="#ffd24a"/><circle cx="68" cy="58" r="8" fill="#8fd16a"/>\n    <path d="M8 40 L18 16 H82 L92 40 Z" fill="#f6efdc"/>\n    <path d="M30 16 L26 40 M46 16 L45 40 M62 16 L64 40 M78 16 L82 40" stroke="${tint}" stroke-width="9"/>\n    <path d="M8 40 L18 16 H82 L92 40 Z" fill="none"/>`,
    b_cell: () => `<rect x="14" y="14" width="72" height="72" rx="12" fill="#f2e2bd"/><path d="M50 32 V68 M32 50 H68" stroke-width="7" stroke-linecap="round"/>`
};

const FT_ART_WIDE = {
    b_sword: (tint, lv) => `\n    <path d="M10 90 L52 26 H148 L190 90 Z" fill="${tint}"/>\n    <path d="M52 26 L70 90 M148 26 L130 90" stroke-width="3" opacity=".5"/>\n    <path d="M10 90 L52 26 H148 L190 90" fill="none" stroke="${ftTrim(lv, 'none')}" stroke-width="5" opacity="${lv > 1 ? 1 : 0}"/>\n    <path d="M86 90 Q86 58 100 58 Q114 58 114 90 Z" fill="${ftTrim(lv, '#6b4a2a')}"/>\n    <path d="M52 26 V10 M148 26 V10" stroke-width="4"/><path d="M52 10 L66 15 L52 20 Z M148 10 L162 15 L148 20 Z" fill="${ftTrim(lv, '#ffffff')}"/>`,
    b_bastion: (tint, lv) => `\n    <path d="M8 90 V34 H26 V46 H46 V34 H66 V46 H86 V34 H114 V46 H134 V34 H154 V46 H174 V34 H192 V90 Z" fill="#c9c2b5"/>\n    <path d="M8 62 H192 M8 76 H192 M36 46 V62 M76 46 V62 M124 46 V62 M164 46 V62 M22 62 V76 M60 62 V76 M140 62 V76 M178 62 V76 M40 76 V90 M160 76 V90" stroke-width="2.5" opacity=".55"/>\n    <path d="M86 48 H114 V64 Q114 80 100 86 Q86 80 86 64 Z" fill="${ftTrim(lv, '#8fa3b8')}"/><path d="M86 58 H114" stroke-width="3"/>`,
    b_forge: (tint, lv) => `\n    <path d="M108 90 V40 Q108 22 136 22 Q164 22 164 40 V90 Z" fill="#a8a196"/>\n    <path d="M124 90 V62 Q124 50 136 50 Q148 50 148 62 V90 Z" fill="#ff9a3d"/><path d="M130 90 Q130 72 136 66 Q142 72 142 90 Z" fill="#ffe27a" stroke="none"/>\n    <path d="M128 22 V8 H144 V22" fill="#8f897e"/>\n    <path d="M20 50 H84 Q84 62 70 64 V76 H80 V88 H28 V76 H38 V64 Q22 62 20 50 Z" fill="${ftTrim(lv, '#6f7780')}"/>\n    <path d="M52 44 L72 18" stroke-width="7" stroke-linecap="round"/><path d="M52 44 L72 18" stroke="#a0672e" stroke-width="3" stroke-linecap="round"/>\n    <rect x="62" y="10" width="22" height="12" rx="3" fill="#9aa3ad" transform="rotate(38 73 16)"/>`,
    b_ballista: (tint, lv) => `\n    <rect x="30" y="58" width="140" height="16" rx="4" fill="${ftTrim(lv, '#a0672e')}"/>\n    <path d="M60 58 Q100 14 140 58" fill="none" stroke-width="7"/><path d="M60 58 Q100 14 140 58" fill="none" stroke="#8a5a2b" stroke-width="3"/>\n    <path d="M20 50 H186" stroke-width="5" stroke-linecap="round"/><path d="M176 43 L192 50 L176 57 Z" fill="#c9d1d9"/>\n    <circle cx="56" cy="82" r="9" fill="#6b5a4a"/><circle cx="144" cy="82" r="9" fill="#6b5a4a"/>\n    <path d="M36 58 V34" stroke-width="3"/><path d="M36 34 L52 39 L36 44 Z" fill="${tint}"/>`,
    b_catapult: (tint, lv) => `\n    <rect x="30" y="60" width="140" height="14" rx="4" fill="${ftTrim(lv, '#a0672e')}"/>\n    <path d="M100 60 L80 30" stroke-width="5"/><path d="M96 66 L150 14" stroke-width="7" stroke-linecap="round"/><path d="M96 66 L150 14" stroke="#a0672e" stroke-width="3" stroke-linecap="round"/>\n    <path d="M140 14 Q152 28 166 12 Z" fill="#6b4a2a"/><circle cx="156" cy="10" r="7" fill="#9a958c"/>\n    <circle cx="56" cy="82" r="9" fill="#6b5a4a"/><circle cx="144" cy="82" r="9" fill="#6b5a4a"/>\n    <path d="M36 60 V38" stroke-width="3"/><path d="M36 38 L52 43 L36 48 Z" fill="${tint}"/>`
};

const FT_EXTRAS = {
    x_rack: tint => `\n    <path d="M24 88 V40 M76 88 V40 M18 44 H82" stroke-width="5"/><path d="M24 88 V40 M76 88 V40 M18 44 H82" stroke="#a0672e" stroke-width="2"/>\n    <path d="M38 30 V80" stroke-width="7"/><path d="M38 30 V80" stroke="#e9eef2" stroke-width="3"/><path d="M30 70 H46" stroke="#e3b341" stroke-width="5"/>\n    <path d="M52 52 H72 V66 Q72 78 62 84 Q52 78 52 66 Z" fill="${tint}"/>`,
    x_hay: () => `<rect x="16" y="46" width="68" height="40" rx="8" fill="#e8c35a"/><path d="M16 60 H84 M16 72 H84" stroke-width="2.5" opacity=".6"/><path d="M38 46 V86 M62 46 V86" stroke="#a0672e" stroke-width="4"/>`,
    x_cauldron: () => `\n    <path d="M30 88 Q38 74 50 80 Q62 74 70 88 Z" fill="#ff9a3d"/>\n    <path d="M22 46 H78 Q78 80 50 80 Q22 80 22 46 Z" fill="#5c5f66"/><path d="M26 46 H74" stroke-width="5"/>\n    <circle cx="40" cy="36" r="6" fill="#c08cf0"/><circle cx="56" cy="30" r="4" fill="#c08cf0"/>`,
    x_crystal: () => `<path d="M30 88 L36 46 L48 24 L58 50 L66 36 L72 88 Z" fill="#bfeeff"/><path d="M48 24 L50 88 M66 36 L62 88" stroke-width="2.5" opacity=".5"/>`,
    x_bolts: () => `<path d="M20 74 L80 50 M20 84 L80 60 M20 64 L80 40" stroke-width="6"/><path d="M20 74 L80 50 M20 84 L80 60 M20 64 L80 40" stroke="#a0672e" stroke-width="2.5"/><path d="M76 38 L88 36 L82 46 M76 48 L88 46 L82 56 M76 58 L88 56 L82 66" fill="#c9d1d9"/>`,
    x_stones: () => `<circle cx="34" cy="70" r="15" fill="#a29d93"/><circle cx="64" cy="72" r="13" fill="#8f8a80"/><circle cx="50" cy="50" r="13" fill="#b5b0a6"/>`
};

const FT_EXTRA_OF = {
    sword: 'x_rack',
    knight: 'x_rack',
    archer: 'x_hay',
    fire: 'x_cauldron',
    ice: 'x_crystal',
    ballista: 'x_bolts',
    catapult: 'x_stones',
    bastion: 'x_stones',
    mint: 'x_hay',
    forge: 'x_stones'
};

const ftArtCache = new Map;

const FT_LEVEL_TRIM = [ null, '#a9bccf', '#ffc93c', '#b57cf0' ];

const ftTrim = (lv, base) => lv > 1 ? FT_LEVEL_TRIM[lv - 1] : base;

const ftSparkle = (x, y, r, colour) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z" fill="${colour}" stroke-width="2.5"/>`;

function ftArt(kind, tint = '#7db7f0', wide = false, lv = 1) {
    const key = kind + tint + wide + lv;
    if (!ftArtCache.has(key)) {
        const draw = (wide ? FT_ART_WIDE : kind.startsWith('x_') ? FT_EXTRAS : FT_ART)[kind];
        let body = draw ? draw(tint, lv) : '';
        if (kind.startsWith('b_') && lv >= 3) {
            const w = wide ? 200 : 100;
            body += ftSparkle(w - 12, 14, 9, '#fff6c8');
            if (lv >= 4) body += ftSparkle(12, 22, 7, '#f3dcff');
        }
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wide ? 200 : 100} 100" fill="none" stroke="${FT_INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${body}</svg>`;
        ftArtCache.set(key, 'data:image/svg+xml,' + encodeURIComponent(svg));
    }
    return ftArtCache.get(key);
}

function ftBuildingLayout(kind, cells) {
    const left = Math.min(...cells.map((c => c[0]))), top = Math.min(...cells.map((c => c[1])));
    const own = new Set(cells.map((([x, y]) => `${x - left},${y - top}`)));
    const w = Math.max(...cells.map((c => c[0]))) - left + 1, h = Math.max(...cells.map((c => c[1]))) - top + 1;
    const covered = (x, y, rw, rh) => {
        for (let i = 0; i < rw; i++) for (let j = 0; j < rh; j++) if (!own.has(`${x + i},${y + j}`)) return false;
        return true;
    };
    const longOne = !!FT_ART_WIDE['b_' + kind];
    let best = null;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) for (let rh = 1; y + rh <= h; rh++) for (let rw = 1; x + rw <= w; rw++) {
        const fits = rw === rh || longOne && rw === 2 * rh;
        if (!fits || !covered(x, y, rw, rh)) continue;
        const score = rw * rh * 10 + (rw === rh ? 1 : 0);
        if (!best || score > best.score) best = {
            x: x,
            y: y,
            w: rw,
            h: rh,
            score: score
        };
    }
    const main = {
        art: 'b_' + kind,
        wide: best.w !== best.h,
        x: best.x,
        y: best.y,
        w: best.w,
        h: best.h
    };
    const parts = [ main ];
    for (const key of own) {
        const [x, y] = key.split(',').map(Number);
        if (x >= best.x && x < best.x + best.w && y >= best.y && y < best.y + best.h) continue;
        parts.push({
            art: FT_EXTRA_OF[kind] || 'x_hay',
            wide: false,
            x: x,
            y: y,
            w: 1,
            h: 1
        });
    }
    return parts;
}

function ftArtImage(kind, tint, cls, wide = false, lv = 1) {
    const image = document.createElement('img');
    image.className = cls;
    image.alt = '';
    image.draggable = false;
    image.src = ftArt(kind, tint, wide, lv);
    return image;
}

function ftCoin(cls = 'ft-coin') {
    return ftArtImage('coin', undefined, cls);
}

function ftBuildingImages(kind, cells, tint, size, unit, lv = 1) {
    return ftBuildingLayout(kind, cells).map((part => {
        const image = ftArtImage(part.art, tint, part.art.startsWith('x_') ? 'ft-extra' : 'ft-building', part.wide, part.art.startsWith('x_') ? 1 : lv);
        image.style.left = `${part.x * size}${unit}`;
        image.style.top = `${(part.y - .12 * part.h) * size}${unit}`;
        image.style.width = `${part.w * size}${unit}`;
        image.style.height = `${part.h * 1.12 * size}${unit}`;
        image.style.zIndex = 1 + part.y + part.h;
        return image;
    }));
}