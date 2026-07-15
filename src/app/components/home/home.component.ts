import { Component, inject, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { CITIES } from '../../data/cities';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public L = inject(LanguageService);
  private seo = inject(SeoService);
  private doc = inject(DOCUMENT);
  readonly cities = CITIES;

  constructor() {
    effect(() => { this.L.lang(); this.seo.set('home'); this.setFaqJsonLd(); });
  }

  /** FAQPage structured data — built from the 6 Q&As actually rendered on this page,
   *  so the markup always matches visible content (Google rich-results requirement). */
  private setFaqJsonLd(): void {
    const mainEntity = [1, 2, 3, 4, 5, 6].map(n => ({
      '@type': 'Question',
      'name': this.L.t('faq_q' + n),
      'acceptedAnswer': { '@type': 'Answer', 'text': this.L.t('faq_a' + n) },
    }));
    const data = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
    let s = this.doc.getElementById('faq-jsonld') as HTMLScriptElement | null;
    if (!s) {
      s = this.doc.createElement('script');
      s.id = 'faq-jsonld';
      s.type = 'application/ld+json';
      this.doc.head.appendChild(s);
    }
    s.textContent = JSON.stringify(data);
  }
}
