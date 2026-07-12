const PROFILE = {
  name: "Cambão",
  links: [
    {
      platform: "Instagram",
      label: "Siga no Instagram",
      handle: "@ismaelanfiloquiosotero",
      url: "https://www.instagram.com/ismaelanfiloquiosotero?igsh=ejg5YWtscGw4OG96",
      icon: "instagram",
    },
    {
      platform: "TikTok",
      label: "Acompanhe no TikTok",
      handle: "@ismael.sotero6",
      url: "https://www.tiktok.com/@ismael.sotero6?_r=1&_t=ZS-97xV3moP2Yu",
      icon: "tiktok",
    },
    {
      platform: "YouTube",
      label: "Inscreva-se no canal",
      handle: "Cambão",
      url: "https://www.youtube.com/",
      icon: "youtube",
    },
  ],
};

const ICONS = {
  instagram: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
    </svg>`,
  tiktok: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 2h3.1c.18 1.38.76 2.46 1.73 3.25.84.69 1.73 1.06 2.67 1.12v3.08a8.24 8.24 0 0 1-4.55-1.39v7.16A6.78 6.78 0 1 1 11.6 8.5v3.14a3.75 3.75 0 1 0 2.9 3.66V2Z"/>
    </svg>`,
  youtube: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.5 6.2a3.1 3.1 0 0 0-2.18-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.32.5A3.1 3.1 0 0 0 .5 6.2 32.7 32.7 0 0 0 0 12a32.7 32.7 0 0 0 .5 5.8A3.1 3.1 0 0 0 2.68 20c1.92.5 9.32.5 9.32.5s7.4 0 9.32-.5a3.1 3.1 0 0 0 2.18-2.2A32.7 32.7 0 0 0 24 12a32.7 32.7 0 0 0-.5-5.8ZM9.6 15.64V8.36L15.88 12 9.6 15.64Z"/>
    </svg>`,
};

const linksContainer = document.querySelector("[data-links]");
const toast = document.querySelector("[data-toast]");
const shareButton = document.querySelector("[data-share]");
const yearElement = document.querySelector("[data-year]");
const parallaxElement = document.querySelector("[data-parallax]");

function createLinkCard(link) {
  const anchor = document.createElement("a");
  anchor.className = "link-card";
  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.setAttribute("aria-label", `${link.label}: ${link.handle}`);
  anchor.dataset.platform = link.platform;

  anchor.innerHTML = `
    <span class="link-card__icon">${ICONS[link.icon]}</span>
    <span class="link-card__copy">
      <span class="link-card__title">${link.platform}</span>
      <span class="link-card__subtitle">${link.handle}</span>
    </span>
    <span class="link-card__arrow" aria-hidden="true">›</span>
  `;

  anchor.addEventListener("click", () => {
    const storageKey = `cambao-click-${link.platform.toLowerCase()}`;
    const currentClicks = Number(localStorage.getItem(storageKey) || 0);
    localStorage.setItem(storageKey, String(currentClicks + 1));
  });

  return anchor;
}

function renderLinks() {
  if (!linksContainer) return;
  const fragment = document.createDocumentFragment();
  PROFILE.links.forEach((link) => fragment.appendChild(createLinkCard(link)));
  linksContainer.replaceChildren(fragment);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

async function sharePage() {
  const shareData = {
    title: `${PROFILE.name} | Links oficiais`,
    text: `Acompanhe as lives e o conteúdo gamer do ${PROFILE.name}.`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast("Link copiado para a área de transferência.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      showToast("Não foi possível compartilhar agora.");
    }
  }
}

function enableParallax() {
  if (!parallaxElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const reset = () => {
    parallaxElement.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  parallaxElement.addEventListener("pointermove", (event) => {
    const rect = parallaxElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    parallaxElement.style.transform = `rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });

  parallaxElement.addEventListener("pointerleave", reset);
}

renderLinks();
enableParallax();

if (yearElement) yearElement.textContent = new Date().getFullYear();
if (shareButton) shareButton.addEventListener("click", sharePage);
