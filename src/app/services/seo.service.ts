import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { LanguageService, Lang } from './language.service';

export type SeoPage = 'home' | 'services' | 'contact' | 'privacy';

interface SeoEntry { title: string; desc: string; keywords?: string; }

const ORIGIN = 'https://usappraiser.com';
const PATHS: Record<SeoPage, string> = {
  home: '/',
  services: '/services',
  contact: '/contact',
  privacy: '/privacy',
};

/**
 * Per-page, per-language SEO. Updates <title>, meta description/keywords,
 * Open Graph, Twitter and the canonical + og:url tags.
 * Called from each route component so prerendered pages get unique, keyword-rich metadata.
 * SSR-safe: canonical is written through the injected DOCUMENT (works on the prerender server).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleSvc = inject(Title);
  private meta = inject(Meta);
  private L = inject(LanguageService);
  private doc = inject(DOCUMENT);

  set(page: SeoPage): void {
    const e = SEO[this.L.lang()][page];
    const url = ORIGIN + PATHS[page];
    this.titleSvc.setTitle(e.title);
    this.meta.updateTag({ name: 'description', content: e.desc });
    if (e.keywords) { this.meta.updateTag({ name: 'keywords', content: e.keywords }); }
    this.meta.updateTag({ property: 'og:title', content: e.title });
    this.meta.updateTag({ property: 'og:description', content: e.desc });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: e.title });
    this.meta.updateTag({ name: 'twitter:description', content: e.desc });
    this.setCanonical(url);
    this.setAlternates(url);
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /** Single-URL trilingual model: every hreflang alternate for a page points at that page's own URL. */
  private setAlternates(url: string): void {
    for (const lang of ['en', 'es', 'fr', 'x-default']) {
      let link = this.doc.querySelector(`link[rel='alternate'][hreflang='${lang}']`) as HTMLLinkElement | null;
      if (!link) {
        link = this.doc.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        this.doc.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }
  }
}

const SEO: Record<Lang, Record<SeoPage, SeoEntry>> = {
  en: {
    home: {
      title: 'US Appraiser — Free Real Estate Appraisal Quotes in the USA',
      desc: 'Fast, free quotes for residential & commercial real estate appraisals anywhere in the USA. State-certified appraisers (MAI, SRA), USPAP standards.',
      keywords: 'real estate appraisal USA, home appraisal, commercial appraisal, appraisal quote, appraisal cost, appraiser near me, certified appraiser, MAI, SRA, USPAP, mortgage appraisal, divorce appraisal, estate appraisal',
    },
    services: {
      title: 'Appraisal Services & Nationwide Coverage | US Appraiser',
      desc: 'Residential, commercial, mortgage, matrimonial, capital gains, estate, insurance and expropriation appraisals. Appraisers serving New York, California, Texas, Florida, Illinois and every U.S. state.',
      keywords: 'appraisal services, residential appraisal, commercial appraisal, land appraisal, machinery and equipment appraisal, mortgage appraisal, capital gains appraisal, estate appraisal, USPAP',
    },
    contact: {
      title: 'Free Appraisal Quote, Anywhere in the USA | US Appraiser',
      desc: 'Request a free, no-obligation real estate appraisal quote anywhere in the USA. Fast reply, residential & commercial. Tell us about your property today.',
      keywords: 'free appraisal quote, real estate appraisal quote, appraisal cost, request appraisal, appraiser near me',
    },
    privacy: {
      title: 'Privacy Policy | US Appraiser',
      desc: 'How US Appraiser collects, uses and protects your information, in accordance with applicable U.S. federal and state privacy laws (including the CCPA/CPRA).',
    },
  },
  fr: {
    home: {
      title: 'US Appraiser | Soumissions d’évaluation immobilière partout aux États-Unis',
      desc: 'Soumissions gratuites et rapides pour évaluations immobilières résidentielles et commerciales partout aux États-Unis. Évaluateurs certifiés et licenciés par l’État (MAI, SRA), normes USPAP. Service en anglais, espagnol et français.',
      keywords: 'évaluation immobilière États-Unis, évaluateur agréé, soumission évaluation, coût évaluation, MAI, SRA, USPAP, évaluation hypothécaire',
    },
    services: {
      title: 'Services d’évaluation et couverture nationale | US Appraiser',
      desc: 'Évaluations résidentielles, commerciales, hypothécaires, matrimoniales, gains en capital, successions, assurance et expropriation. Évaluateurs à New York, en Californie, au Texas, en Floride, dans l’Illinois et partout aux États-Unis.',
      keywords: 'services d’évaluation, évaluation résidentielle, évaluation commerciale, évaluation de terrain, évaluation hypothécaire, USPAP',
    },
    contact: {
      title: 'Obtenez une soumission d’évaluation gratuite aux États-Unis | US Appraiser',
      desc: 'Demandez une soumission d’évaluation immobilière gratuite et sans engagement partout aux États-Unis. Réponse rapide, résidentiel et commercial, service en anglais, espagnol et français.',
      keywords: 'soumission évaluation gratuite, devis évaluation immobilière, coût évaluation, évaluateur près de chez moi',
    },
    privacy: {
      title: 'Politique de confidentialité | US Appraiser',
      desc: 'Comment US Appraiser recueille, utilise et protège vos renseignements, conformément aux lois fédérales et étatiques américaines applicables (y compris la CCPA/CPRA).',
    },
  },
  es: {
    home: {
      title: 'US Appraiser | Evalúos inmobiliarios en todo Estados Unidos',
      desc: 'Cotizaciones gratis y rápidas para evalúos inmobiliarios residenciales y comerciales en todo Estados Unidos. Tasadores certificados y licenciados por el estado (MAI, SRA), normas USPAP. Servicio en español, inglés y francés.',
      keywords: 'evalúo inmobiliario Estados Unidos, tasador, cotización evalúo, costo evalúo, tasador cerca de mí, MAI, SRA, USPAP, evalúo hipotecario',
    },
    services: {
      title: 'Servicios de evalúo y cobertura nacional | US Appraiser',
      desc: 'Evalúos residenciales, comerciales, hipotecarios, matrimoniales, ganancias de capital, sucesiones, seguros y expropiación. Tasadores en Nueva York, California, Texas, Florida, Illinois y todo Estados Unidos.',
      keywords: 'servicios de evalúo, evalúo residencial, evalúo comercial, evalúo de terreno, evalúo hipotecario, USPAP',
    },
    contact: {
      title: 'Obtén una cotización gratis de evalúo en Estados Unidos | US Appraiser',
      desc: 'Solicita una cotización de evalúo inmobiliario gratis y sin compromiso en todo Estados Unidos. Respuesta rápida, residencial y comercial, servicio en español, inglés y francés.',
      keywords: 'cotización gratis de evalúo, cotización evalúo inmobiliario, costo evalúo, tasador cerca de mí',
    },
    privacy: {
      title: 'Política de privacidad | US Appraiser',
      desc: 'Cómo US Appraiser recopila, usa y protege tu información, conforme a las leyes federales y estatales de privacidad aplicables de EE. UU. (incluida la CCPA/CPRA).',
    },
  },
};
