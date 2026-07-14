import { Component, inject, effect, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { LanguageService, Lang } from '../../services/language.service';
import { CityInfo, CITIES, CITY_BY_SLUG } from '../../data/cities';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {
  public L = inject(LanguageService);
  private route = inject(ActivatedRoute);
  private titleSvc = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  city = signal<CityInfo>(CITIES[0]);

  constructor() {
    this.route.data.subscribe(d => {
      this.city.set(CITY_BY_SLUG[d['slug']] ?? CITIES[0]);
    });
    effect(() => { this.updateSeo(); });
  }

  private l(): Lang { return this.L.lang(); }

  cityName(): string {
    const c = this.city();
    return this.l() === 'es' ? c.nameEs : this.l() === 'fr' ? c.nameFr : c.name;
  }
  provName(): string {
    const c = this.city();
    return this.l() === 'es' ? c.provEs : this.l() === 'fr' ? c.provFr : c.prov;
  }
  blurb(): string {
    const c = this.city();
    return this.l() === 'es' ? c.blurbEs : this.l() === 'fr' ? c.blurbFr : c.blurb;
  }

  heading(): string {
    const c = this.cityName();
    switch (this.l()) {
      case 'fr': return `Évaluation immobilière à ${c}`;
      case 'es': return `Evalúo inmobiliario en ${c}`;
      default: return `Real Estate Appraisal in ${c}`;
    }
  }
  subhead(): string {
    const c = this.cityName();
    switch (this.l()) {
      case 'fr': return `Soumissions gratuites et rapides d’évaluateurs certifiés et licenciés par l’État (MAI, SRA) au service de ${c} et des environs — résidentiel et commercial, sans engagement.`;
      case 'es': return `Cotizaciones gratis y rápidas de tasadores certificados y licenciados por el estado (MAI, SRA) al servicio de ${c} y sus alrededores — residencial y comercial, sin compromiso.`;
      default: return `Fast, free quotes from state-certified and licensed appraisers (MAI, SRA) serving ${c} and the surrounding area — residential and commercial, no obligation.`;
    }
  }
  intro(): string {
    const c = this.cityName(); const p = this.provName();
    switch (this.l()) {
      case 'fr': return `Vous cherchez une évaluation immobilière professionnelle à ${c}? US Appraiser vous met en relation avec des évaluateurs qualifiés et reconnus pour les propriétés résidentielles et commerciales partout à ${c}, ${p}. Que ce soit pour un financement hypothécaire, un refinancement, un achat, un divorce, un règlement successoral ou des gains en capital, nous vous jumelons avec le bon évaluateur et vous obtenons une soumission gratuite et sans engagement — souvent le jour même.`;
      case 'es': return `¿Buscas un evalúo inmobiliario profesional en ${c}? US Appraiser te conecta con tasadores calificados y reconocidos para propiedades residenciales y comerciales en todo ${c}, ${p}. Ya sea para financiamiento hipotecario, refinanciamiento, compra, divorcio, sucesión o ganancias de capital, te asignamos el tasador adecuado y te conseguimos una cotización gratis y sin compromiso — a menudo el mismo día.`;
      default: return `Looking for a professional real estate appraisal in ${c}? US Appraiser connects you with qualified, recognized appraisers for residential and commercial property throughout ${c}, ${p}. Whether it’s for mortgage financing, refinancing, a purchase, divorce, estate settlement or capital gains, we match you with the right appraiser and get you a free, no-obligation quote — often the same day.`;
    }
  }
  servicesTitle(): string {
    const c = this.cityName();
    switch (this.l()) {
      case 'fr': return `Services d’évaluation à ${c}`;
      case 'es': return `Servicios de evalúo en ${c}`;
      default: return `Appraisal services in ${c}`;
    }
  }
  whyTitle(): string {
    const c = this.cityName();
    switch (this.l()) {
      case 'fr': return `Pourquoi choisir US Appraiser à ${c}`;
      case 'es': return `Por qué elegir US Appraiser en ${c}`;
      default: return `Why choose US Appraiser in ${c}`;
    }
  }
  ctaTitle(): string {
    const c = this.cityName();
    switch (this.l()) {
      case 'fr': return `Obtenez votre soumission gratuite à ${c}`;
      case 'es': return `Obtén tu cotización gratis de evalúo en ${c}`;
      default: return `Get your free ${c} appraisal quote`;
    }
  }
  nearbyTitle(): string {
    switch (this.l()) {
      case 'fr': return 'Autres régions desservies';
      case 'es': return 'Otras zonas que atendemos';
      default: return 'Other areas we serve';
    }
  }

  services(): string[] {
    switch (this.l()) {
      case 'fr': return ['Évaluations résidentielles', 'Évaluations commerciales', 'Terrains', 'Machinerie et équipement', 'Financement hypothécaire et refinancement', 'Divorce / séparation des biens', 'Successions et homologation', 'Gains en capital'];
      case 'es': return ['Evalúos residenciales', 'Evalúos comerciales', 'Terrenos', 'Maquinaria y equipo', 'Hipoteca y refinanciamiento', 'Divorcio / matrimonial', 'Sucesiones y homologación', 'Ganancias de capital'];
      default: return ['Residential appraisals', 'Commercial appraisals', 'Land appraisals', 'Machinery & equipment', 'Mortgage & refinance', 'Divorce / matrimonial', 'Estate & probate', 'Capital gains'];
    }
  }
  whyPoints(): string[] {
    switch (this.l()) {
      case 'fr': return ['Évaluateurs certifiés et licenciés par l’État (MAI, SRA)', 'Normes USPAP respectées', 'Service en anglais, espagnol et français', 'Soumission gratuite et sans engagement', 'Réponse rapide, souvent le jour même'];
      case 'es': return ['Tasadores certificados y licenciados por el estado (MAI, SRA)', 'Normas USPAP cumplidas', 'Servicio en español, inglés y francés', 'Cotización gratis y sin compromiso', 'Respuesta rápida, a menudo el mismo día'];
      default: return ['State-certified and licensed appraisers (MAI, SRA)', 'USPAP standards followed', 'Trilingual service (English, Spanish & French)', 'Free, no-obligation quote', 'Fast response, often same day'];
    }
  }
  nearby(): CityInfo[] {
    return CITIES.filter(c => c.slug !== this.city().slug).slice(0, 8);
  }
  nearbyLabel(c: CityInfo): string {
    return this.l() === 'es' ? c.nameEs : this.l() === 'fr' ? c.nameFr : c.name;
  }

  private updateSeo(): void {
    const c = this.cityName();
    const url = `https://usappraiser.com/appraisal/${this.city().slug}`;
    let title: string; let desc: string;
    switch (this.l()) {
      case 'fr':
        title = `Évaluation immobilière à ${c} | Soumission gratuite — US Appraiser`;
        desc = `Évaluation immobilière résidentielle et commerciale à ${c}. Évaluateurs certifiés et licenciés par l’État (MAI, SRA), soumission gratuite et rapide, service en anglais, espagnol et français. Obtenez votre devis dès aujourd’hui.`;
        break;
      case 'es':
        title = `Evalúo inmobiliario en ${c} | Cotización gratis — US Appraiser`;
        desc = `Evalúo inmobiliario residencial y comercial en ${c}. Tasadores certificados y licenciados por el estado (MAI, SRA), cotización gratis y rápida, servicio en español, inglés y francés. Obtén tu cotización hoy.`;
        break;
      default:
        title = `${c} Real Estate Appraisal | Free Quote — US Appraiser`;
        desc = `Residential & commercial real estate appraisal in ${c}. State-certified and licensed appraisers (MAI, SRA), fast free quote, trilingual service. Get your quote today.`;
    }
    this.titleSvc.setTitle(title);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
    this.setCanonical(url);
    this.setJsonLd(url, c, this.provName());
  }

  /** Per-city structured data: a localized Service offering + breadcrumb trail. */
  private setJsonLd(url: string, city: string, state: string): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          'serviceType': 'Real Estate Appraisal',
          'name': this.heading(),
          'url': url,
          'provider': {
            '@type': 'ProfessionalService',
            'name': 'US Appraiser',
            'url': 'https://usappraiser.com/',
            'telephone': '+1-613-709-5311',
            'email': 'info@usappraiser.com',
          },
          'areaServed': { '@type': 'City', 'name': city, 'containedInPlace': { '@type': 'State', 'name': state } },
          'availableLanguage': ['en', 'es', 'fr'],
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'US Appraiser', 'item': 'https://usappraiser.com/' },
            { '@type': 'ListItem', 'position': 2, 'name': this.heading(), 'item': url },
          ],
        },
      ],
    };
    let script = this.doc.getElementById('city-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'city-jsonld';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
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
