import { getThemeList, applyTheme, getSavedTheme } from '../src/scripts/theme.js';
import { CONFIG } from '../src/scripts/config.js';

describe('theme', () => {
  beforeEach(() => {
    document.documentElement.style.cssText = '';
    localStorage.clear();
  });

  describe('getThemeList', () => {
    it('returns all themes with id and label', () => {
      const list = getThemeList();
      const themeIds = Object.keys(CONFIG.THEMES);
      expect(list).toHaveLength(themeIds.length);
      list.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('label');
        expect(themeIds).toContain(item.id);
      });
    });
  });

  describe('applyTheme', () => {
    it('sets CSS custom properties on document root', () => {
      applyTheme('ocean');
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--primary')).toBe('#0984e3');
      expect(root.style.getPropertyValue('--bg')).toBe('#edf5fc');
    });

    it('saves theme to localStorage', () => {
      applyTheme('forest');
      expect(localStorage.getItem('quiz-theme')).toBe('forest');
    });

    it('returns true for valid theme', () => {
      expect(applyTheme('dark')).toBe(true);
    });

    it('returns false for invalid theme', () => {
      expect(applyTheme('nonexistent')).toBe(false);
    });

    it('applies default theme correctly', () => {
      applyTheme('default');
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--primary')).toBe('#6c5ce7');
    });

    it('applies dark theme with dark background', () => {
      applyTheme('dark');
      const root = document.documentElement;
      expect(root.style.getPropertyValue('--bg')).toBe('#1e1e2e');
      expect(root.style.getPropertyValue('--card-bg')).toBe('#2a2a3d');
    });
  });

  describe('getSavedTheme', () => {
    it('returns default theme when nothing saved', () => {
      expect(getSavedTheme()).toBe(CONFIG.DEFAULT_THEME);
    });

    it('returns saved theme from localStorage', () => {
      localStorage.setItem('quiz-theme', 'sunset');
      expect(getSavedTheme()).toBe('sunset');
    });

    it('returns default for invalid saved theme', () => {
      localStorage.setItem('quiz-theme', 'invalid');
      expect(getSavedTheme()).toBe(CONFIG.DEFAULT_THEME);
    });
  });
});
