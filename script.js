// ===== INTRO TYPED =====
const typedIntroEl = document.getElementById("typedIntro");

if (typedIntroEl) {
  const intro = `Hay varias cosas que quiero decirte, mi niña...

Ábrelas una por una, con calma. 💌`;
  let i = 0;

  function type() {
    if (i < intro.length) {
      typedIntroEl.textContent += intro.charAt(i);
      i++;
      setTimeout(type, 40);
    }
  }
  type();
}

// ===== VISITADOS =====
const TOTAL_PAGES = 9;

function markVisited() {
  const c = [...document.body.classList].find(x => x.startsWith("page-msg"));
  if (!c) return;
  const key = c.replace("page-", "");
  localStorage.setItem("visited_" + key, "true");
}

function updateVisited() {
  document.querySelectorAll(".menu-card").forEach(card => {
    const p = card.dataset.page;
    if (!p) return;
    if (localStorage.getItem("visited_" + p) === "true") {
      card.classList.add("menu-visited");
      const s = card.querySelector(".menu-status");
      if (s) s.textContent = "Leído ✓";
    }
  });
}

if (document.body.classList.contains("page-menu")) updateVisited();
if (document.body.classList.contains("page-single")) markVisited();

// ===== EMOJIS POR PÁGINA =====
const emojiPattern = ["✨", "🌷", "🪄", "💓"];
function getEmoji(n) {
  return emojiPattern[(n - 1) % 4];
}

// ===== FONDO EMOJIS =====
document.addEventListener("DOMContentLoaded", () => {
  const bg = document.querySelector(".hearts-bg");
  if (!bg) return;

  const cls = [...document.body.classList].find(x => x.startsWith("page-msg"));
  let num = null;
  if (cls) num = parseInt(cls.replace("page-msg", ""));

  // EMOJI ÚNICO DE LA PÁGINA
  if (num) {
    const e = getEmoji(num);
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("span");
      s.className = "floating-emoji";
      s.textContent = e;
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDuration = 12 + Math.random() * 6 + "s";
      s.style.animationDelay = -Math.random() * 10 + "s";
      bg.appendChild(s);
    }
  }

  // EMOJIS GLOBALES ✨ y 💓
  ["✨", "💓"].forEach(em => {
    for (let i = 0; i < 8; i++) {
      const s = document.createElement("span");
      s.className = "floating-emoji";
      s.textContent = em;
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDuration = 11 + Math.random() * 6 + "s";
      s.style.animationDelay = -Math.random() * 10 + "s";
      bg.appendChild(s);
    }
  });

  setupHeartBursts();
});

// ===== CORAZONES ROSADOS CERCA DE 🌷 =====
function setupHeartBursts() {
  document.querySelectorAll(".floating-emoji").forEach(el => {
    if (el.textContent !== "🌷") return;

    const interval = 4000 + Math.random() * 4000;

    setInterval(() => {
      const r = el.getBoundingClientRect();
      const h = document.createElement("span");
      h.className = "burst-heart";
      h.textContent = "💓";

      const ox = (Math.random() - 0.5) * 40;
      const oy = (Math.random() - 0.5) * 40;

      h.style.left = r.left + r.width / 2 + ox + "px";
      h.style.top = r.top + r.height / 2 + oy + "px";

      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }, interval);
  });
}

// ===== BOTÓN "NO" =====
const yesBtnFinal = document.getElementById("yesBtnFinal");
const noBtnFinal = document.getElementById("noBtnFinal");
const answerMessage = document.getElementById("answerMessage");

if (yesBtnFinal && noBtnFinal) {
  yesBtnFinal.onclick = () => {
    answerMessage.classList.remove("hidden");
    launchHearts();
    yesBtnFinal.disabled = true;
    noBtnFinal.disabled = true;
  };

  noBtnFinal.style.position = "relative";
  noBtnFinal.onmouseenter = () => {
    const w = noBtnFinal.parentElement.getBoundingClientRect();
    const mx = w.width - noBtnFinal.offsetWidth;
    const my = w.height - noBtnFinal.offsetHeight;
    noBtnFinal.style.transform =
      `translate(${Math.random()*mx-mx/2}px, ${Math.random()*my-my/2}px)`;
  };
}

// ===== CONFETTI (💓) =====
function launchHearts() {
  const c = document.createElement("div");
  c.className = "confetti";
  document.body.appendChild(c);

  for (let i = 0; i < 40; i++) {
    const s = document.createElement("span");
    s.textContent = "💓";
    s.style.position = "absolute";
    s.style.left = Math.random()*100 + "vw";
    s.style.top = "-10vh";
    s.style.fontSize = 20 + Math.random()*20 + "px";
    s.style.animation = `fall ${4+Math.random()*3}s linear forwards`;
    c.appendChild(s);
  }

  if (!document.getElementById("fallKF")) {
    const style = document.createElement("style");
    style.id = "fallKF";
    style.textContent = `
      @keyframes fall {
        to { transform: translateY(120vh) rotate(360deg); opacity: 0; }
      }`;
    document.head.appendChild(style);
  }

  setTimeout(()=>c.remove(),8000);
}





