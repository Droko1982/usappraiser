import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { LanguageService, Lang } from './language.service';

export type SeoPage = 'home' | 'services' | 'contact' | 'appraisers' | 'privacy';

interface SeoEntry { title: string; desc: string; keywords?: string; }

const ORIGIN = 'https://usappraiser.com';
const PATHS: Record<SeoPage, string> = {
  home: '/',
  services: '/services',
  contact: '/contact',
  appraisers: '/appraisers',
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
}

const SEO: Record<Lang, Record<SeoPage, SeoEntry>> = {
  en: {
    home: {
      title: 'US Appraiser | Free Real Estate Appraisal Quotes Across the United States',
      desc: 'Free, fast quotes for residential & commercial real estate appraisals anywhere in the USA. State-certified and licensed appraisers (MAI, SRA), USPAP standards. Trilingual EN/ES/FR — get your quote today.',
      keywords: 'real estate appraisal USA, home appraisal, commercial appraisal, appraisal quote, appraisal cost, appraiser near me, certified appraiser, MAI, SRA, USPAP, mortgage appraisal, divorce appraisal, estate appraisal',
    },
    services: {
      title: 'Appraisal Services & Nationwide Coverage | US Appraiser',
      desc: 'Residential, commercial, mortgage, matrimonial, capital gains, estate, insurance and expropriation appraisals. Appraisers serving New York, California, Texas, Florida, Illinois and every U.S. state.',
      keywords: 'appraisal services, residential appraisal, commercial appraisal, land appraisal, machinery and equipment appraisal, mortgage appraisal, capital gains appraisal, estate appraisal, USPAP',
    },
    contact: {
      title: 'Get a Free Appraisal Quote — Anywhere in the USA | US Appraiser',
      desc: 'Request a free, no-obligation real estate appraisal quote across the United States. Fast reply, residential & commercial, trilingual service. Tell us about your property and get quoted today.',
      keywords: 'free appraisal quote, real estate appraisal quote, appraisal cost, request appraisal, appraiser near me',
    },
    appraisers: {
      title: 'For Appraisers — Join Our Nationwide Network | US Appraiser',
      desc: 'Are you a state-certified or licensed appraiser (MAI, SRA)? Join the US Appraiser network and receive new appraisal jobs in your area. Apply free — pay only per completed job.',
      keywords: 'appraiser jobs, appraisal network, MAI, SRA, certified appraiser, appraisal referrals, appraiser leads',
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
    appraisers: {
      title: 'Pour évaluateurs — Rejoignez notre réseau national | US Appraiser',
      desc: 'Vous êtes évaluateur certifié ou licencié par l’État (MAI, SRA)? Rejoignez le réseau US Appraiser et recevez des mandats dans votre région. Inscription gratuite — vous ne payez que par mandat réalisé.',
      keywords: 'mandats d’évaluation, réseau d’évaluateurs, MAI, SRA, évaluateur agréé, références d’évaluation',
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
    appraisers: {
      title: 'Para tasadores — Únete a nuestra red nacional | US Appraiser',
      desc: '¿Eres tasador certificado o licenciado por el estado (MAI, SRA)? Únete a la red de US Appraiser y recibe trabajos de evalúo en tu zona. Inscripción gratis — solo pagas por trabajo realizado.',
      keywords: 'trabajos de tasador, red de tasadores, MAI, SRA, tasador certificado, referencias de evalúo',
    },
    privacy: {
      title: 'Política de privacidad | US Appraiser',
      desc: 'Cómo US Appraiser recopila, usa y protege tu información, conforme a las leyes federales y estatales de privacidad aplicables de EE. UU. (incluida la CCPA/CPRA).',
    },
  },
};
