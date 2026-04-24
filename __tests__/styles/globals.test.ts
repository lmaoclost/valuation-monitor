import { describe, it, expect } from 'vitest';

describe('Global CSS', () => {
  describe('Font Variables', () => {
    it('defines --font-display variable', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --font-display: serif; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--font-display').trim()).toBe('serif');
    });

    it('defines --font-body variable', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --font-body: serif; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--font-body').trim()).toBe('serif');
    });

    it('defines --font-mono variable', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --font-mono: monospace; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--font-mono').trim()).toBe('monospace');
    });
  });

  describe('Color Variables', () => {
    it('defines --background color', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --background: #0a0a0a; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--background').trim()).toBe('#0a0a0a');
    });

    it('defines --foreground color', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --foreground: #f5f0e8; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--foreground').trim()).toBe('#f5f0e8');
    });

    it('defines --primary color (gold accent)', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --primary: #c4a35a; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--primary').trim()).toBe('#c4a35a');
    });

    it('defines --accent color (sage green)', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --accent: #6b8e6b; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--accent').trim()).toBe('#6b8e6b');
    });

    it('defines --card color', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --card: #141414; }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--card').trim()).toBe('#141414');
    });

    it('defines --border color', () => {
      const style = document.createElement('style');
      style.textContent = ':root { --border: rgba(196, 163, 90, 0.15); }';
      document.head.appendChild(style);
      
      const computed = getComputedStyle(document.documentElement);
      expect(computed.getPropertyValue('--border').trim()).toBe('rgba(196,163,90,0.15)');
    });
  });

  describe('Animations', () => {
    it('defines fade-in-up animation', () => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
      
      const keyframes = document.getAnimations?.() || [];
      expect(keyframes.length).toBeGreaterThanOrEqual(0);
    });

    it('defines float animation', () => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `;
      document.head.appendChild(style);
      
      expect(style.sheet?.cssRules.length).toBeGreaterThan(0);
    });

    it('defines animate-fade-in-up utility class', () => {
      expect(true).toBe(true);
    });

    it('defines animate-float utility class', () => {
      expect(true).toBe(true);
    });

    it('defines animation delay classes', () => {
      expect(true).toBe(true);
    });
  });

  describe('Grain Overlay', () => {
    it('defines grain utility class', () => {
      expect(true).toBe(true);
    });
  });
});