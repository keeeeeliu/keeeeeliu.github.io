export const DEFAULT_TRACK = {
  src: "/music/chocolates-in-sanya.wav",
  title: "chocolates in sanya",
};

export function getBgmAudio(): HTMLAudioElement | null {
  return document.getElementById("bgm-audio") as HTMLAudioElement | null;
}

export function normalizeSrc(src: string): string {
  if (!src) return "";
  try {
    return new URL(src, location.origin).pathname;
  } catch {
    return src;
  }
}

export function getCurrentTrack() {
  const audio = getBgmAudio();
  if (!audio) return { ...DEFAULT_TRACK, playing: false };
  const src = audio.src ? normalizeSrc(audio.src) : DEFAULT_TRACK.src;
  const title = audio.dataset.trackTitle || DEFAULT_TRACK.title;
  return { src, title, playing: !audio.paused };
}

export function setBgmTip(title: string) {
  const tip = document.querySelector(".bgm-tip");
  if (tip) tip.textContent = title;
}

export function anyAudioPlaying() {
  return Array.from(document.querySelectorAll("audio")).some((a) => !a.paused);
}

export function pauseAllAudio() {
  document.querySelectorAll("audio").forEach((a) => (a as HTMLAudioElement).pause());
}

export async function playTrack(src: string, title: string) {
  const audio = getBgmAudio();
  if (!audio) return;
  const path = normalizeSrc(src);
  if (normalizeSrc(audio.src || "") !== path) audio.src = path;
  audio.dataset.trackTitle = title;
  setBgmTip(title);
  try {
    await audio.play();
  } catch {
    /* autoplay blocked */
  }
  notifyChange();
}

export async function toggleSiteAudio() {
  if (anyAudioPlaying()) {
    pauseAllAudio();
    notifyChange();
    return;
  }

  const audio = getBgmAudio();
  if (!audio) return;
  if (!audio.src) {
    audio.src = DEFAULT_TRACK.src;
    audio.dataset.trackTitle = DEFAULT_TRACK.title;
    setBgmTip(DEFAULT_TRACK.title);
  }
  try {
    await audio.play();
  } catch {
    /* autoplay blocked */
  }
  notifyChange();
}

export function syncBgmButton() {
  const btn = document.getElementById("bgm-toggle");
  const playing = anyAudioPlaying();
  if (btn) {
    btn.classList.toggle("playing", playing);
    btn.setAttribute("aria-pressed", String(playing));
    btn.setAttribute("aria-label", playing ? "Pause music" : "Play music");
  }
}

export function syncSoundsPlaylist(root: ParentNode = document) {
  const playlist = root.querySelector(".playlist");
  if (!playlist) return;

  const { src, playing } = getCurrentTrack();
  playlist.querySelectorAll<HTMLElement>(".track").forEach((track) => {
    const btn = track.querySelector(".track-play") as HTMLButtonElement | null;
    const trackSrc = btn?.dataset.src;
    const active = !!trackSrc && normalizeSrc(trackSrc) === src && playing;
    track.classList.toggle("is-playing", active);
    btn?.setAttribute("aria-pressed", String(active));
  });
}

function notifyChange() {
  syncBgmButton();
  syncSoundsPlaylist();
  document.dispatchEvent(new CustomEvent("site-audio:change"));
}

export function bindSiteAudioUi() {
  const audio = getBgmAudio();
  const btn = document.getElementById("bgm-toggle");
  if (!audio || !btn || btn.dataset.bound) return;
  btn.dataset.bound = "1";

  if (!audio.dataset.trackTitle) {
    audio.dataset.trackTitle = DEFAULT_TRACK.title;
  }

  btn.addEventListener("click", () => {
    toggleSiteAudio();
  });

  const onState = () => notifyChange();
  audio.addEventListener("play", onState);
  audio.addEventListener("pause", onState);

  if (!audio.dataset.tried) {
    audio.dataset.tried = "1";
    setBgmTip(audio.dataset.trackTitle || DEFAULT_TRACK.title);
    audio.play().catch(() => {
      const start = () => {
        audio.play().catch(() => {});
      };
      const evs = ["pointerdown", "keydown", "touchstart"] as const;
      const once = () => {
        start();
        evs.forEach((ev) => document.removeEventListener(ev, once));
      };
      evs.forEach((ev) => document.addEventListener(ev, once, { once: true }));
    });
  }

  notifyChange();
}
