import { CONFIG } from './config.js';

const STORAGE_KEY = 'quiz-theme';

const CSS_PROPERTY_MAP = {
  primary: '--primary',
  primaryHover: '--primary-hover',
  correct: '--correct',
  wrong: '--wrong',
  bg: '--bg',
  cardBg: '--card-bg',
  text: '--text',
  textLight: '--text-light',
  accent: '--accent',
};

export function getThemeList() {
  return Object.entries(CONFIG.THEMES).map(([id, theme]) => ({
    id,
    label: theme.label,
  }));
}

export function applyTheme(themeId) {
  const theme = CONFIG.THEMES[themeId];
  if (!theme) return false;

  const root = document.documentElement;
  for (const [key, property] of Object.entries(CSS_PROPERTY_MAP)) {
    if (theme[key]) {
      root.style.setProperty(property, theme[key]);
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY, themeId);
  } catch {
    // localStorage unavailable — theme still applied via CSS
  }

  return true;
}

export function getSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && CONFIG.THEMES[saved]) return saved;
  } catch {
    // localStorage unavailable
  }
  return CONFIG.DEFAULT_THEME;
}
