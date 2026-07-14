import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private doc = inject(DOCUMENT);
  readonly theme = signal<Theme>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('usa_theme') as Theme | null;
      let initial: Theme = 'light';
      if (saved === 'light' || saved === 'dark') {
        initial = saved;
      } else if (window.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
        initial = 'dark';
      }
      this.theme.set(initial);
      this.apply(initial);
    }
  }

  toggle(): void {
    this.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  set(t: Theme): void {
    this.theme.set(t);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usa_theme', t);
      this.apply(t);
    }
  }

  private apply(t: Theme): void {
    this.doc.documentElement.setAttribute('data-theme', t);
  }
}
