import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Lang = 'en' | 'fr' | 'es';

export interface LangOption { code: Lang; label: string; }
export const LANGUAGES: LangOption[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

/**
 * Runtime trilingual (English / Español / Français) service.
 * Central dictionary for the whole site so text stays in one place and is easy to revise.
 * SSR-safe: guards all browser-only APIs (no window/localStorage on the prerender server).
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  readonly lang = signal<Lang>('en');
  readonly languages = LANGUAGES;

  constructor() {
    // Always default to English. Only honour a language the visitor explicitly chose before.
    // (No browser auto-detection — English is the initial language for every new visitor.)
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('usappraiser_lang') as Lang | null;
      if (saved === 'en' || saved === 'fr' || saved === 'es') {
        this.lang.set(saved);
      }
      document.documentElement.lang = this.lang();
    }
  }

  toggle(): void {
    const order: Lang[] = ['en', 'fr', 'es'];
    const next = order[(order.indexOf(this.lang()) + 1) % order.length];
    this.set(next);
  }

  currentLabel(): string {
    return LANGUAGES.find(l => l.code === this.lang())?.label ?? 'English';
  }

  set(l: Lang): void {
    this.lang.set(l);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usappraiser_lang', l);
      document.documentElement.lang = l;
    }
  }

  /** Translate a key for the active language. Falls back to the key itself if missing. */
  t(key: string): string {
    return DICT[this.lang()][key] ?? DICT.en[key] ?? key;
  }

  /** Business WhatsApp line. */
  readonly whatsappNumber = '16137095311';

  /** wa.me link opening a chat with a language-aware pre-filled message. */
  whatsappUrl(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.t('wa_msg'))}`;
  }
}

type Dictionary = Record<string, string>;

const en: Dictionary = {
  // Brand / header
  brand_name: 'US Appraiser',
  brand_tagline: 'Real Estate Appraisals Across America',
  hero_headline: 'Free Real Estate Appraisal Quotes Anywhere in the USA',
  hero_sub: 'Residential & commercial property valuations by state-certified and licensed appraisers (MAI, SRA) — fast, professional, and no obligation.',
  hero_cta: 'Get a Free Quote',
  nav_home: 'Home',
  nav_services: 'Services',
  nav_contact: 'Contact',
  nav_appraisers: 'For Appraisers',
  lang_switch: 'FR',
  lang_switch_aria: 'Passer au français',
  wa_btn: 'Chat on WhatsApp',
  wa_msg: 'Hi US Appraiser, I would like a free quote for a real estate appraisal.',

  // Home
  home_why_title: 'Why Is an Appraisal Essential?',
  home_intro:
    'Appraisals are crucial for a variety of purposes, including mortgage financing, estate planning, matrimonial asset division, relocations, and more. They provide an unbiased, professional opinion of value that plays a critical role in making informed decisions in various financial and legal contexts.',
  home_benefits_title: 'The Key Benefits of an Appraisal',
  home_b1_t: 'Accurate Valuation:',
  home_b1_d:
    'An appraisal report offers a reliable and precise estimate of market value, supported by thorough market analysis conducted by a qualified appraiser. This ensures a credible and professional evaluation that you can trust when making important decisions.',
  home_b2_t: 'Legal Recognition:',
  home_b2_d:
    'Professionally conducted appraisals are recognized by courts, financial institutions, and government bodies. This recognition is crucial in cases of litigation, divorce settlements, expropriation, or disputes, where the opinion of value must meet strict standards.',
  home_b3_t: 'Market Insight:',
  home_b3_d:
    'An up-to-date appraisal reflects current market conditions, offering the most accurate valuation for your property, whether you are buying, selling, or refinancing.',
  home_b4_t: 'Protection and Peace of Mind:',
  home_b4_d:
    'Appraisals conducted by certified professionals, adhering to the Uniform Standards of Professional Appraisal Practice (USPAP), ensure that your interests are safeguarded through a diligent, unbiased approach.',
  home_b5_t: 'Versatility and Adaptability:',
  home_b5_d:
    'Appraisals are essential for a wide range of purposes, including pre-listing evaluations, foreclosure processes, tax assessment appeals, replacement costing, estate settlements, and more.',
  home_specialize:
    'For over 5 years, we have connected clients with reputable, Appraisal Institute–designated appraisers (MAI, SRA) and state-certified professionals across the country. We select the appraiser and the specialized firm for your specific need — comparing trusted, licensed companies and matching you with the right professional for your property and purpose, so your appraisal is accurate, recognized and legally valid.',
  home_contact_cta_pre: 'Contact us today',
  home_contact_cta_post:
    ' to discuss your appraisal needs and benefit from our professional advice. Let us help you make informed decisions with confidence.',
  home_get_quote_btn: 'Get a Quote Now',

  // How it works / trusted network
  hiw_title: 'Why US Appraiser',
  hiw_1t: 'Only Accredited Appraisers',
  hiw_1d: 'We work only with established firms whose appraisers are state-certified and designated by the Appraisal Institute (MAI & SRA) — so your report is credible, recognized and legally valid.',
  hiw_2t: 'The Right Firm for the Job',
  hiw_2d: 'Not every company holds the right license for every appraisal. We compare our vetted partners and match you with the right one for your property, purpose and state.',
  hiw_3t: 'We Select Your Specialist',
  hiw_3d: 'With over 5 years of trusted partnerships, we select the appraiser and the firm specialized in your specific need — so you skip the research and work with proven professionals.',
  areas_served_title: 'Appraisals in Your City',
  areas_served_sub: 'Local real estate, commercial and equipment appraisals across the United States.',
  trust_1: 'State-certified appraisers',
  trust_2: 'USPAP standards',
  trust_3: '5+ years of partnerships',
  trust_4: 'English · Español · Français',
  trust_5: 'Free, no obligation',

  // FAQ
  faq_title: 'Frequently Asked Questions',
  faq_q1: 'How much does a real estate appraisal cost in the United States?',
  faq_a1: 'Appraisal fees vary by property type, location and complexity. Request a free quote and we will give you an exact price with no obligation.',
  faq_q2: 'How long does a home appraisal take?',
  faq_a2: 'Most residential appraisals are completed within 2–5 business days of the property inspection. Rush service is often available on request.',
  faq_q3: 'What areas of the United States do you cover?',
  faq_a3: 'We connect you with qualified appraisers in all 50 states — from New York and California to Texas, Florida, Illinois and everywhere in between.',
  faq_q4: 'Are your appraisers certified?',
  faq_a4: 'Yes. We work with state-certified and licensed appraisers who follow the Uniform Standards of Professional Appraisal Practice (USPAP).',
  faq_q5: 'What can a real estate appraisal be used for?',
  faq_a5: 'Mortgage financing, refinancing, purchases, divorce and marital settlements, estate settlement, capital gains, property tax assessment appeals, and more.',
  faq_q6: 'Do you offer service in Spanish or French?',
  faq_a6: 'Yes — our service is available in English, Spanish and French. You can request your appraisal quote in any of the three.',

  // Services
  serv_title: 'Our Services',
  serv_intro:
    'We offer a comprehensive range of appraisal services to meet your residential and commercial needs. Our network of appraisers is committed to providing accurate and professional valuations for a wide variety of property types across the United States.',
  serv_areas_title: 'Service Areas — Coast to Coast',
  serv_areas_intro:
    'We connect clients with qualified appraisers in all 50 states. Wherever your property is located, we can help.',
  serv_area_on: 'Northeast',
  serv_area_on_d:
    'New York City, Boston, Philadelphia, Newark, Pittsburgh, Buffalo, Hartford, Providence and surrounding communities.',
  serv_area_qc: 'Mid-Atlantic',
  serv_area_qc_d:
    'Washington, D.C., Baltimore, Richmond, Virginia Beach, Northern Virginia, Wilmington and surrounding regions.',
  serv_area_bc: 'Southeast',
  serv_area_bc_d:
    'Miami, Atlanta, Orlando, Tampa, Charlotte, Raleigh, Nashville, Jacksonville and the surrounding areas.',
  serv_area_ab: 'Midwest',
  serv_area_ab_d: 'Chicago, Detroit, Columbus, Indianapolis, Minneapolis, Kansas City, St. Louis, Milwaukee and nearby communities.',
  serv_area_prairies: 'South Central & Texas',
  serv_area_prairies_d: 'Houston, Dallas–Fort Worth, San Antonio, Austin, Oklahoma City, New Orleans, Memphis and surrounding areas.',
  serv_area_atlantic: 'Mountain West & Southwest',
  serv_area_atlantic_d:
    'Denver, Phoenix, Las Vegas, Salt Lake City, Albuquerque, Boise, Colorado Springs and the surrounding regions.',
  serv_area_north: 'West Coast',
  serv_area_north_d: 'Los Angeles, San Francisco, San Diego, Seattle, Portland, Sacramento, San Jose and the Pacific coast.',
  serv_desig_title: 'Professional Appraiser Designations',
  serv_aaci_t: 'MAI — Member, Appraisal Institute',
  serv_aaci_d:
    'The MAI designation is held by appraisers experienced in the valuation of commercial, industrial, residential and other property types, and who advise clients on real estate investment decisions. MAI appraisers handle complex commercial, industrial, institutional and agricultural assignments.',
  serv_cra_t: 'SRA — Senior Residential Appraiser',
  serv_cra_d:
    'The SRA designation is focused on residential property appraisals. SRA appraisers specialize in the analysis and valuation of individual dwellings, including single-family homes, condominiums, duplexes and small residential income properties.',
  serv_get_btn: 'Get a Specialized Appraiser',

  // Footer
  footer_tel: 'Tel:',
  footer_rights: 'All rights reserved.',
  privacy_link: 'Privacy Policy',
  call_aria: 'Call Us',
  whatsapp_aria: 'WhatsApp Us',

  // Contact form
  ct_title: 'Get Your Free Appraisal Quote',
  ct_intro: 'Tell us about your property and we’ll reply with a quote right away. It only takes a minute — no obligation.',
  ct_message: 'Details (purpose, timing, anything else)',
  ct_message_ph: 'Tell us anything that helps us prepare your quote',
  ct_first: 'First Name',
  ct_first_ph: 'Please enter your first name',
  ct_last: 'Last Name',
  ct_last_ph: 'Please enter your last name',
  ct_email: 'Email Address',
  ct_email_ph: 'Please enter your email address',
  ct_phone: 'Phone Number',
  ct_phone_ph: 'Please enter your phone number',
  ct_address: 'Property Address',
  ct_address_ph: 'Please enter the property address',
  ct_reportType: 'Report Type',
  ct_reportType_ph: 'Please select report type',
  ct_propertyType: 'Property Type',
  ct_propertyType_ph: 'Please select property type',
  ct_purposeType: 'Purpose',
  ct_purposeType_ph: 'Please select purpose',
  ct_specify: 'Please specify',
  ct_purchaseType: 'Purchase Type',
  ct_purchaseType_ph: 'Please select purchase type',
  ct_constructionCompany: 'Construction Company',
  ct_constructionCompany_ph: 'Please select construction company',
  ct_otherCompany: 'Other Company',
  ct_otherCompany_ph: 'Please specify the construction company',
  ct_houseModel: 'Model of the House',
  ct_houseModel_ph: 'Please select model of the house',
  ct_purchasePrice: 'Purchase Price',
  ct_purchasePrice_ph: 'Please enter purchase price',
  ct_mortgageType: 'Mortgage Type',
  ct_mortgageType_ph: 'Please select mortgage type',
  ct_lender: 'Who is the lender?',
  ct_lender_ph: 'Please enter the lender',
  ct_refinanceAmount: 'Refinance Amount',
  ct_refinanceAmount_ph: 'Please enter refinance amount',
  ct_loanToValue: 'Loan-to-Value Ratio',
  ct_loanToValue_ph: 'Please enter loan-to-value ratio',
  ct_relocationType: 'Relocation Type',
  ct_relocationType_ph: 'Please select relocation type',
  ct_otherRelocation_ph: 'Please specify the relocation type',
  ct_referenceNumber: 'Reference Number',
  ct_referenceNumber_ph: 'Please enter reference number',
  ct_dwellingStyle: 'Dwelling Style',
  ct_dwellingStyle_ph: 'Please select dwelling style',
  ct_condoFees: 'Condo Fees',
  ct_condoFees_ph: 'Please enter condo fees',
  ct_parking: 'Has Parking',
  ct_select: 'Please select',
  ct_parkingType: 'Parking Type',
  ct_parkingType_ph: 'Please select parking type',
  ct_parkingSpaces: 'How many parking spaces?',
  ct_parkingSpaces_ph: 'Please enter number of parking spaces',
  ct_locker: 'Locker',
  ct_specialAssessments: 'Special Assessments',
  ct_specialAssessments_ph: 'Please enter special assessments',
  ct_dwellingType: 'Dwelling Type',
  ct_dwellingType_ph: 'Please select dwelling type',
  ct_additionalInfo:
    'Please provide any additional information you feel may be pertinent to the valuation',
  ct_additionalInfo_ph: 'Please specify additional information',
  ct_isRetro: 'Is this a retrospective appraisal?',
  ct_retroDate: 'Retrospective Date',
  ct_retroDate_ph: 'Please enter date',
  ct_send: 'Send Form',

  // Form submission feedback
  ok_title: 'Form Submitted Successfully!',
  ok_body: 'Your request has been sent successfully. We will contact you shortly.',
  ok_thanks: 'Thank you for reaching out!',
  ok_btn: 'Okay',
  err_title: 'Error Sending Form',
  err_body: 'There was a problem submitting your form. Please try again later.',
  err_help: 'If the issue persists, please contact us directly.',
  err_btn: 'Retry',
  pending_title: 'Almost Ready!',
  pending_body:
    'Thank you! Online submissions are being finalized. In the meantime, please call or WhatsApp us and we will handle your appraisal request right away.',
  pending_btn: 'Okay',
};

const fr: Dictionary = {
  // Brand / header
  brand_name: 'US Appraiser',
  brand_tagline: 'Évaluations immobilières partout aux États-Unis',
  hero_headline: 'Soumission gratuite pour une évaluation immobilière partout aux États-Unis',
  hero_sub: 'Évaluations résidentielles et commerciales par des évaluateurs certifiés par l’État et désignés (MAI, SRA) — rapide, professionnel et sans engagement.',
  hero_cta: 'Obtenez une soumission gratuite',
  nav_home: 'Accueil',
  nav_services: 'Services',
  nav_contact: 'Contact',
  nav_appraisers: 'Pour évaluateurs',
  lang_switch: 'EN',
  lang_switch_aria: 'Switch to English',
  wa_btn: 'Discuter sur WhatsApp',
  wa_msg: 'Bonjour US Appraiser, j’aimerais une soumission gratuite pour une évaluation immobilière.',

  // Home
  home_why_title: 'Pourquoi une évaluation est-elle essentielle?',
  home_intro:
    'Les évaluations sont essentielles à de nombreuses fins : financement hypothécaire, planification successorale, partage des biens matrimoniaux, réinstallations et bien plus. Elles fournissent une opinion de valeur professionnelle et impartiale qui joue un rôle déterminant dans la prise de décisions éclairées, tant sur le plan financier que juridique.',
  home_benefits_title: 'Les principaux avantages d’une évaluation',
  home_b1_t: 'Évaluation précise :',
  home_b1_d:
    'Un rapport d’évaluation offre une estimation fiable et précise de la valeur marchande, appuyée par une analyse approfondie du marché réalisée par un évaluateur qualifié. Vous obtenez ainsi une évaluation crédible et professionnelle sur laquelle vous pouvez compter pour vos décisions importantes.',
  home_b2_t: 'Reconnaissance juridique :',
  home_b2_d:
    'Les évaluations réalisées par des professionnels sont reconnues par les tribunaux, les institutions financières et les organismes gouvernementaux. Cette reconnaissance est cruciale en cas de litige, de divorce, d’expropriation ou de différend, où l’opinion de valeur doit respecter des normes strictes.',
  home_b3_t: 'Connaissance du marché :',
  home_b3_d:
    'Une évaluation à jour reflète les conditions actuelles du marché et offre la valorisation la plus exacte de votre propriété, que vous soyez en train d’acheter, de vendre ou de refinancer.',
  home_b4_t: 'Protection et tranquillité d’esprit :',
  home_b4_d:
    'Les évaluations réalisées par des professionnels certifiés, conformément aux Normes uniformes de pratique professionnelle en matière d’évaluation (USPAP), garantissent que vos intérêts sont protégés grâce à une approche rigoureuse et impartiale.',
  home_b5_t: 'Polyvalence et adaptabilité :',
  home_b5_d:
    'Les évaluations sont essentielles pour une vaste gamme de besoins : évaluations avant mise en vente, procédures de saisie, contestations d’évaluation foncière, coût de remplacement, règlements successoraux et bien plus.',
  home_specialize:
    'Depuis plus de 5 ans, nous mettons les clients en relation avec des évaluateurs réputés, désignés par l’Appraisal Institute (MAI, SRA) et certifiés par l’État, partout au pays. Nous sélectionnons l’évaluateur et la firme spécialisés selon votre besoin — en évaluant des firmes fiables et licenciées et en vous jumelant avec le bon professionnel pour votre propriété et votre objectif, afin que votre évaluation soit exacte, reconnue et valide légalement.',
  home_contact_cta_pre: 'Contactez-nous dès aujourd’hui',
  home_contact_cta_post:
    ' pour discuter de vos besoins en évaluation et profiter de nos conseils professionnels. Laissez-nous vous aider à prendre des décisions éclairées en toute confiance.',
  home_get_quote_btn: 'Obtenez un devis',

  // How it works / trusted network
  hiw_title: 'Pourquoi US Appraiser',
  hiw_1t: 'Uniquement des évaluateurs agréés',
  hiw_1d: 'Nous collaborons seulement avec des firmes établies dont les évaluateurs sont certifiés par l’État et désignés par l’Appraisal Institute (MAI et SRA) — pour un rapport crédible, reconnu et valide légalement.',
  hiw_2t: 'La bonne firme pour le mandat',
  hiw_2d: 'Toutes les firmes n’ont pas le permis requis pour chaque évaluation. Nous comparons nos partenaires vérifiés et vous jumelons avec la bonne firme pour votre propriété, votre objectif et votre État.',
  hiw_3t: 'Nous sélectionnons votre spécialiste',
  hiw_3d: 'Fort de plus de 5 ans de partenariats de confiance, nous sélectionnons l’évaluateur et la firme spécialisés selon votre besoin précis — vous évitez les recherches et travaillez avec des professionnels reconnus.',
  areas_served_title: 'Évaluations dans votre ville',
  areas_served_sub: 'Évaluations immobilières, commerciales et d’équipement partout aux États-Unis.',
  trust_1: 'Évaluateurs certifiés par l’État',
  trust_2: 'Normes USPAP',
  trust_3: '5+ ans de partenariats',
  trust_4: 'English · Español · Français',
  trust_5: 'Gratuit, sans engagement',

  // FAQ
  faq_title: 'Foire aux questions',
  faq_q1: 'Combien coûte une évaluation immobilière aux États-Unis?',
  faq_a1: 'Les honoraires varient selon le type de propriété, l’emplacement et la complexité. Demandez une soumission gratuite et nous vous donnerons un prix exact, sans engagement.',
  faq_q2: 'Combien de temps prend une évaluation résidentielle?',
  faq_a2: 'La plupart des évaluations résidentielles sont réalisées dans un délai de 2 à 5 jours ouvrables après l’inspection. Un service accéléré est souvent offert sur demande.',
  faq_q3: 'Quelles régions des États-Unis couvrez-vous?',
  faq_a3: 'Nous vous mettons en relation avec des évaluateurs qualifiés dans les 50 États — de New York et de la Californie au Texas, à la Floride, à l’Illinois et partout ailleurs.',
  faq_q4: 'Vos évaluateurs sont-ils agréés?',
  faq_a4: 'Oui. Nous travaillons avec des évaluateurs certifiés et licenciés par l’État qui respectent les Normes uniformes de pratique professionnelle en matière d’évaluation (USPAP).',
  faq_q5: 'À quoi sert une évaluation immobilière?',
  faq_a5: 'Financement hypothécaire, refinancement, achat, divorce et partage des biens, règlement successoral, gains en capital, contestation d’évaluation foncière et plus encore.',
  faq_q6: 'Offrez-vous le service en espagnol ou en français?',
  faq_a6: 'Oui — notre service est offert en anglais, en espagnol et en français. Vous pouvez demander votre soumission dans l’une des trois langues.',

  // Services
  serv_title: 'Nos services',
  serv_intro:
    'Nous offrons une gamme complète de services d’évaluation pour répondre à vos besoins résidentiels et commerciaux. Notre réseau d’évaluateurs s’engage à fournir des évaluations précises et professionnelles pour une grande variété de types de propriétés partout aux États-Unis.',
  serv_areas_title: 'Zones de service — d’un océan à l’autre',
  serv_areas_intro:
    'Nous mettons les clients en relation avec des évaluateurs qualifiés dans les 50 États. Où que se trouve votre propriété, nous pouvons vous aider.',
  serv_area_on: 'Nord-Est',
  serv_area_on_d:
    'New York, Boston, Philadelphie, Newark, Pittsburgh, Buffalo, Hartford, Providence et les environs.',
  serv_area_qc: 'Centre atlantique',
  serv_area_qc_d:
    'Washington, D.C., Baltimore, Richmond, Virginia Beach, le nord de la Virginie, Wilmington et les régions avoisinantes.',
  serv_area_bc: 'Sud-Est',
  serv_area_bc_d:
    'Miami, Atlanta, Orlando, Tampa, Charlotte, Raleigh, Nashville, Jacksonville et les environs.',
  serv_area_ab: 'Midwest',
  serv_area_ab_d: 'Chicago, Detroit, Columbus, Indianapolis, Minneapolis, Kansas City, St. Louis, Milwaukee et les communautés avoisinantes.',
  serv_area_prairies: 'Centre-Sud et Texas',
  serv_area_prairies_d: 'Houston, Dallas–Fort Worth, San Antonio, Austin, Oklahoma City, La Nouvelle-Orléans, Memphis et les environs.',
  serv_area_atlantic: 'Montagnes Rocheuses et Sud-Ouest',
  serv_area_atlantic_d:
    'Denver, Phoenix, Las Vegas, Salt Lake City, Albuquerque, Boise, Colorado Springs et les régions avoisinantes.',
  serv_area_north: 'Côte Ouest',
  serv_area_north_d: 'Los Angeles, San Francisco, San Diego, Seattle, Portland, Sacramento, San Jose et la côte du Pacifique.',
  serv_desig_title: 'Désignations professionnelles d’évaluateur',
  serv_aaci_t: 'MAI — Membre de l’Appraisal Institute',
  serv_aaci_d:
    'La désignation MAI est détenue par des évaluateurs expérimentés dans l’évaluation de propriétés commerciales, industrielles, résidentielles et autres, qui conseillent leurs clients sur les décisions d’investissement immobilier. Les évaluateurs MAI traitent des mandats commerciaux, industriels, institutionnels et agricoles complexes.',
  serv_cra_t: 'SRA — Évaluateur résidentiel principal',
  serv_cra_d:
    'La désignation SRA est axée sur l’évaluation de propriétés résidentielles. Les évaluateurs SRA se spécialisent dans l’analyse et l’évaluation de logements individuels, y compris les maisons unifamiliales, les condominiums, les duplex et les petits immeubles de rapport résidentiels.',
  serv_get_btn: 'Trouvez un évaluateur spécialisé',

  // Footer
  footer_tel: 'Tél. :',
  footer_rights: 'Tous droits réservés.',
  privacy_link: 'Politique de confidentialité',
  call_aria: 'Appelez-nous',
  whatsapp_aria: 'Écrivez-nous sur WhatsApp',

  // Contact form
  ct_title: 'Obtenez votre soumission gratuite',
  ct_intro: 'Parlez-nous de votre propriété et nous vous reviendrons rapidement avec une soumission. Cela ne prend qu’une minute — sans engagement.',
  ct_message: 'Détails (objet, échéance, autres précisions)',
  ct_message_ph: 'Indiquez tout ce qui nous aide à préparer votre soumission',
  ct_first: 'Prénom',
  ct_first_ph: 'Veuillez saisir votre prénom',
  ct_last: 'Nom',
  ct_last_ph: 'Veuillez saisir votre nom',
  ct_email: 'Adresse courriel',
  ct_email_ph: 'Veuillez saisir votre adresse courriel',
  ct_phone: 'Numéro de téléphone',
  ct_phone_ph: 'Veuillez saisir votre numéro de téléphone',
  ct_address: 'Adresse de la propriété',
  ct_address_ph: 'Veuillez saisir l’adresse de la propriété',
  ct_reportType: 'Type de rapport',
  ct_reportType_ph: 'Veuillez choisir le type de rapport',
  ct_propertyType: 'Type de propriété',
  ct_propertyType_ph: 'Veuillez choisir le type de propriété',
  ct_purposeType: 'Objet de l’évaluation',
  ct_purposeType_ph: 'Veuillez choisir l’objet',
  ct_specify: 'Veuillez préciser',
  ct_purchaseType: 'Type d’achat',
  ct_purchaseType_ph: 'Veuillez choisir le type d’achat',
  ct_constructionCompany: 'Constructeur',
  ct_constructionCompany_ph: 'Veuillez choisir le constructeur',
  ct_otherCompany: 'Autre constructeur',
  ct_otherCompany_ph: 'Veuillez préciser le constructeur',
  ct_houseModel: 'Modèle de la maison',
  ct_houseModel_ph: 'Veuillez choisir le modèle de la maison',
  ct_purchasePrice: 'Prix d’achat',
  ct_purchasePrice_ph: 'Veuillez saisir le prix d’achat',
  ct_mortgageType: 'Type d’hypothèque',
  ct_mortgageType_ph: 'Veuillez choisir le type d’hypothèque',
  ct_lender: 'Qui est le prêteur?',
  ct_lender_ph: 'Veuillez saisir le prêteur',
  ct_refinanceAmount: 'Montant du refinancement',
  ct_refinanceAmount_ph: 'Veuillez saisir le montant du refinancement',
  ct_loanToValue: 'Ratio prêt-valeur',
  ct_loanToValue_ph: 'Veuillez saisir le ratio prêt-valeur',
  ct_relocationType: 'Type de réinstallation',
  ct_relocationType_ph: 'Veuillez choisir le type de réinstallation',
  ct_otherRelocation_ph: 'Veuillez préciser le type de réinstallation',
  ct_referenceNumber: 'Numéro de référence',
  ct_referenceNumber_ph: 'Veuillez saisir le numéro de référence',
  ct_dwellingStyle: 'Style d’habitation',
  ct_dwellingStyle_ph: 'Veuillez choisir le style d’habitation',
  ct_condoFees: 'Frais de copropriété',
  ct_condoFees_ph: 'Veuillez saisir les frais de copropriété',
  ct_parking: 'Stationnement inclus',
  ct_select: 'Veuillez choisir',
  ct_parkingType: 'Type de stationnement',
  ct_parkingType_ph: 'Veuillez choisir le type de stationnement',
  ct_parkingSpaces: 'Combien de places de stationnement?',
  ct_parkingSpaces_ph: 'Veuillez saisir le nombre de places',
  ct_locker: 'Casier / rangement',
  ct_specialAssessments: 'Cotisations spéciales',
  ct_specialAssessments_ph: 'Veuillez saisir les cotisations spéciales',
  ct_dwellingType: 'Type d’habitation',
  ct_dwellingType_ph: 'Veuillez choisir le type d’habitation',
  ct_additionalInfo:
    'Veuillez fournir tout renseignement supplémentaire que vous jugez pertinent pour l’évaluation',
  ct_additionalInfo_ph: 'Veuillez préciser les renseignements supplémentaires',
  ct_isRetro: 'S’agit-il d’une évaluation rétrospective?',
  ct_retroDate: 'Date rétrospective',
  ct_retroDate_ph: 'Veuillez saisir la date',
  ct_send: 'Envoyer le formulaire',

  // Form submission feedback
  ok_title: 'Formulaire envoyé avec succès!',
  ok_body: 'Votre demande a été envoyée avec succès. Nous vous contacterons sous peu.',
  ok_thanks: 'Merci de nous avoir contactés!',
  ok_btn: 'D’accord',
  err_title: 'Erreur lors de l’envoi',
  err_body: 'Un problème est survenu lors de l’envoi du formulaire. Veuillez réessayer plus tard.',
  err_help: 'Si le problème persiste, veuillez nous contacter directement.',
  err_btn: 'Réessayer',
  pending_title: 'Presque prêt!',
  pending_body:
    'Merci! L’envoi en ligne est en cours de finalisation. Entretemps, appelez-nous ou écrivez-nous sur WhatsApp et nous traiterons votre demande d’évaluation sans délai.',
  pending_btn: 'D’accord',
};

const es: Dictionary = {
  // Brand / header
  brand_name: 'US Appraiser',
  brand_tagline: 'Evalúos inmobiliarios en todo Estados Unidos',
  hero_headline: 'Cotizaciones gratis de evalúos inmobiliarios en todo Estados Unidos',
  hero_sub: 'Evalúos residenciales y comerciales por tasadores certificados por el estado y designados (MAI, SRA) — rápido, profesional y sin compromiso.',
  hero_cta: 'Cotización gratis',
  nav_home: 'Inicio',
  nav_services: 'Servicios',
  nav_contact: 'Contacto',
  nav_appraisers: 'Para tasadores',
  lang_switch: 'EN',
  lang_switch_aria: 'Switch to English',
  wa_btn: 'Escríbenos por WhatsApp',
  wa_msg: 'Hola US Appraiser, quisiera una cotización gratis para un evalúo inmobiliario.',

  // Home
  home_why_title: '¿Por qué es esencial un evalúo?',
  home_intro:
    'Los evalúos son fundamentales para múltiples fines: financiamiento hipotecario, planificación patrimonial, división de bienes matrimoniales, reubicaciones y más. Ofrecen una opinión de valor profesional e imparcial que resulta clave para tomar decisiones informadas en contextos financieros y legales.',
  home_benefits_title: 'Los beneficios clave de un evalúo',
  home_b1_t: 'Valoración precisa:',
  home_b1_d:
    'Un informe de evalúo ofrece una estimación confiable y precisa del valor de mercado, respaldada por un análisis riguroso realizado por un tasador calificado. Así obtienes una evaluación creíble y profesional en la que puedes confiar para tus decisiones importantes.',
  home_b2_t: 'Reconocimiento legal:',
  home_b2_d:
    'Los evalúos realizados por profesionales son reconocidos por tribunales, instituciones financieras y organismos gubernamentales. Este reconocimiento es crucial en casos de litigio, divorcio, expropiación o disputas, donde la opinión de valor debe cumplir normas estrictas.',
  home_b3_t: 'Conocimiento del mercado:',
  home_b3_d:
    'Un evalúo actualizado refleja las condiciones actuales del mercado y ofrece la valoración más exacta de tu propiedad, ya sea que estés comprando, vendiendo o refinanciando.',
  home_b4_t: 'Protección y tranquilidad:',
  home_b4_d:
    'Los evalúos realizados por profesionales certificados, conforme a las Normas Uniformes de Práctica Profesional de Evaluación (USPAP), garantizan que tus intereses estén protegidos mediante un enfoque diligente e imparcial.',
  home_b5_t: 'Versatilidad y adaptabilidad:',
  home_b5_d:
    'Los evalúos son esenciales para una amplia variedad de fines: valoraciones previas a la venta, procesos de ejecución hipotecaria, apelaciones de impuestos, costo de reemplazo, sucesiones y más.',
  home_specialize:
    'Desde hace más de 5 años conectamos a los clientes con tasadores reputados, designados por el Appraisal Institute (MAI, SRA) y certificados por el estado, en todo el país. Seleccionamos al tasador y a la firma especializada según tu necesidad — comparando empresas confiables y licenciadas y asignándote al profesional adecuado para tu propiedad y objetivo, para que tu evalúo sea exacto, reconocido y válido legalmente.',
  home_contact_cta_pre: 'Contáctanos hoy',
  home_contact_cta_post:
    ' para conversar sobre tu evalúo y aprovechar nuestra asesoría profesional. Te ayudamos a tomar decisiones informadas con confianza.',
  home_get_quote_btn: 'Cotiza ahora',

  // How it works / trusted network
  hiw_title: 'Por qué US Appraiser',
  hiw_1t: 'Solo tasadores acreditados',
  hiw_1d: 'Trabajamos únicamente con firmas establecidas cuyos tasadores están certificados por el estado y designados por el Appraisal Institute (MAI y SRA) — para que tu informe sea creíble, reconocido y válido legalmente.',
  hiw_2t: 'La firma adecuada para el caso',
  hiw_2d: 'No toda empresa tiene la licencia correcta para cada evalúo. Comparamos a nuestros socios verificados y te asignamos la firma adecuada según tu propiedad, tu objetivo y tu estado.',
  hiw_3t: 'Seleccionamos a tu especialista',
  hiw_3d: 'Con más de 5 años de alianzas de confianza, seleccionamos al tasador y a la firma especializada en tu necesidad — así te ahorras la búsqueda y trabajas con profesionales comprobados.',
  areas_served_title: 'Evalúos en tu ciudad',
  areas_served_sub: 'Evalúos inmobiliarios, comerciales y de equipo en todo Estados Unidos.',
  trust_1: 'Tasadores certificados por el estado',
  trust_2: 'Normas USPAP',
  trust_3: '+5 años de alianzas',
  trust_4: 'English · Español · Français',
  trust_5: 'Gratis, sin compromiso',

  // FAQ
  faq_title: 'Preguntas frecuentes',
  faq_q1: '¿Cuánto cuesta un evalúo inmobiliario en Estados Unidos?',
  faq_a1: 'Los honorarios varían según el tipo de propiedad, la ubicación y la complejidad. Solicita una cotización gratis y te daremos un precio exacto, sin compromiso.',
  faq_q2: '¿Cuánto tarda un evalúo residencial?',
  faq_a2: 'La mayoría de los evalúos residenciales se completan en 2 a 5 días hábiles tras la inspección de la propiedad. A menudo hay servicio urgente disponible a pedido.',
  faq_q3: '¿Qué zonas de Estados Unidos cubren?',
  faq_a3: 'Te conectamos con tasadores calificados en los 50 estados — de Nueva York y California a Texas, Florida, Illinois y todo lo demás.',
  faq_q4: '¿Sus tasadores están certificados?',
  faq_a4: 'Sí. Trabajamos con tasadores certificados y licenciados por el estado que cumplen las Normas Uniformes de Práctica Profesional de Evaluación (USPAP).',
  faq_q5: '¿Para qué sirve un evalúo inmobiliario?',
  faq_a5: 'Financiamiento hipotecario, refinanciamiento, compras, divorcios y división de bienes, sucesiones, ganancias de capital, apelaciones de impuestos y más.',
  faq_q6: '¿Ofrecen servicio en español?',
  faq_a6: 'Sí — puedes solicitar tu cotización de evalúo en español, inglés o francés.',

  // Services
  serv_title: 'Nuestros servicios',
  serv_intro:
    'Ofrecemos una gama completa de servicios de evalúo para tus necesidades residenciales y comerciales. Nuestra red de tasadores se compromete a entregar valoraciones precisas y profesionales para una gran variedad de tipos de propiedad en todo Estados Unidos.',
  serv_areas_title: 'Zonas de servicio — de costa a costa',
  serv_areas_intro:
    'Conectamos a los clientes con tasadores calificados en los 50 estados. Dondequiera que esté tu propiedad, podemos ayudarte.',
  serv_area_on: 'Noreste',
  serv_area_on_d: 'Nueva York, Boston, Filadelfia, Newark, Pittsburgh, Buffalo, Hartford, Providence y alrededores.',
  serv_area_qc: 'Costa atlántica media',
  serv_area_qc_d: 'Washington, D.C., Baltimore, Richmond, Virginia Beach, el norte de Virginia, Wilmington y regiones cercanas.',
  serv_area_bc: 'Sureste',
  serv_area_bc_d: 'Miami, Atlanta, Orlando, Tampa, Charlotte, Raleigh, Nashville, Jacksonville y alrededores.',
  serv_area_ab: 'Medio Oeste',
  serv_area_ab_d: 'Chicago, Detroit, Columbus, Indianápolis, Minneapolis, Kansas City, St. Louis, Milwaukee y comunidades cercanas.',
  serv_area_prairies: 'Centro-Sur y Texas',
  serv_area_prairies_d: 'Houston, Dallas–Fort Worth, San Antonio, Austin, Oklahoma City, Nueva Orleans, Memphis y alrededores.',
  serv_area_atlantic: 'Montañas Rocosas y Suroeste',
  serv_area_atlantic_d: 'Denver, Phoenix, Las Vegas, Salt Lake City, Albuquerque, Boise, Colorado Springs y regiones cercanas.',
  serv_area_north: 'Costa Oeste',
  serv_area_north_d: 'Los Ángeles, San Francisco, San Diego, Seattle, Portland, Sacramento, San José y la costa del Pacífico.',
  serv_desig_title: 'Designaciones profesionales de tasador',
  serv_aaci_t: 'MAI — Miembro del Appraisal Institute',
  serv_aaci_d:
    'La designación MAI la tienen tasadores con experiencia en la valoración de propiedades comerciales, industriales, residenciales y de otros tipos, y que asesoran a sus clientes en decisiones de inversión inmobiliaria. Los tasadores MAI manejan encargos comerciales, industriales, institucionales y agrícolas complejos.',
  serv_cra_t: 'SRA — Tasador Residencial Sénior',
  serv_cra_d:
    'La designación SRA se centra en evalúos de propiedades residenciales. Los tasadores SRA se especializan en el análisis y la valoración de viviendas individuales, incluidas casas unifamiliares, condominios, dúplex y pequeñas propiedades residenciales de renta.',
  serv_get_btn: 'Encuentra un tasador especializado',

  // Footer
  footer_tel: 'Tel.:',
  footer_rights: 'Todos los derechos reservados.',
  privacy_link: 'Política de privacidad',
  call_aria: 'Llámanos',
  whatsapp_aria: 'Escríbenos por WhatsApp',

  // Contact form
  ct_title: 'Obtén tu cotización gratis de evalúo',
  ct_intro: 'Cuéntanos sobre tu propiedad y te responderemos con una cotización de inmediato. Solo toma un minuto — sin compromiso.',
  ct_message: 'Detalles (objetivo, plazos, otros datos)',
  ct_message_ph: 'Cuéntanos cualquier cosa que ayude a preparar tu cotización',
  ct_first: 'Nombre',
  ct_first_ph: 'Ingresa tu nombre',
  ct_last: 'Apellido',
  ct_last_ph: 'Ingresa tu apellido',
  ct_email: 'Correo electrónico',
  ct_email_ph: 'Ingresa tu correo electrónico',
  ct_phone: 'Número de teléfono',
  ct_phone_ph: 'Ingresa tu número de teléfono',
  ct_address: 'Dirección de la propiedad',
  ct_address_ph: 'Ingresa la dirección de la propiedad',
  ct_reportType: 'Tipo de informe',
  ct_reportType_ph: 'Selecciona el tipo de informe',
  ct_propertyType: 'Tipo de propiedad',
  ct_propertyType_ph: 'Selecciona el tipo de propiedad',
  ct_purposeType: 'Objetivo del evalúo',
  ct_purposeType_ph: 'Selecciona el objetivo',
  ct_specify: 'Por favor especifica',
  ct_purchaseType: 'Tipo de compra',
  ct_purchaseType_ph: 'Selecciona el tipo de compra',
  ct_constructionCompany: 'Constructora',
  ct_constructionCompany_ph: 'Selecciona la constructora',
  ct_otherCompany: 'Otra constructora',
  ct_otherCompany_ph: 'Especifica la constructora',
  ct_houseModel: 'Modelo de la casa',
  ct_houseModel_ph: 'Selecciona el modelo de la casa',
  ct_purchasePrice: 'Precio de compra',
  ct_purchasePrice_ph: 'Ingresa el precio de compra',
  ct_mortgageType: 'Tipo de hipoteca',
  ct_mortgageType_ph: 'Selecciona el tipo de hipoteca',
  ct_lender: '¿Quién es el prestamista?',
  ct_lender_ph: 'Ingresa el prestamista',
  ct_refinanceAmount: 'Monto del refinanciamiento',
  ct_refinanceAmount_ph: 'Ingresa el monto del refinanciamiento',
  ct_loanToValue: 'Relación préstamo-valor',
  ct_loanToValue_ph: 'Ingresa la relación préstamo-valor',
  ct_relocationType: 'Tipo de reubicación',
  ct_relocationType_ph: 'Selecciona el tipo de reubicación',
  ct_otherRelocation_ph: 'Especifica el tipo de reubicación',
  ct_referenceNumber: 'Número de referencia',
  ct_referenceNumber_ph: 'Ingresa el número de referencia',
  ct_dwellingStyle: 'Estilo de vivienda',
  ct_dwellingStyle_ph: 'Selecciona el estilo de vivienda',
  ct_condoFees: 'Cuotas de condominio',
  ct_condoFees_ph: 'Ingresa las cuotas de condominio',
  ct_parking: 'Tiene estacionamiento',
  ct_select: 'Selecciona',
  ct_parkingType: 'Tipo de estacionamiento',
  ct_parkingType_ph: 'Selecciona el tipo de estacionamiento',
  ct_parkingSpaces: '¿Cuántos espacios de estacionamiento?',
  ct_parkingSpaces_ph: 'Ingresa el número de espacios',
  ct_locker: 'Bodega / casillero',
  ct_specialAssessments: 'Cuotas extraordinarias',
  ct_specialAssessments_ph: 'Ingresa las cuotas extraordinarias',
  ct_dwellingType: 'Tipo de vivienda',
  ct_dwellingType_ph: 'Selecciona el tipo de vivienda',
  ct_additionalInfo: 'Proporciona cualquier información adicional que consideres pertinente para la valoración',
  ct_additionalInfo_ph: 'Especifica la información adicional',
  ct_isRetro: '¿Es un evalúo retrospectivo?',
  ct_retroDate: 'Fecha retrospectiva',
  ct_retroDate_ph: 'Ingresa la fecha',
  ct_send: 'Enviar formulario',

  // Form submission feedback
  ok_title: '¡Formulario enviado con éxito!',
  ok_body: 'Tu solicitud se envió correctamente. Te contactaremos pronto.',
  ok_thanks: '¡Gracias por escribirnos!',
  ok_btn: 'De acuerdo',
  err_title: 'Error al enviar el formulario',
  err_body: 'Hubo un problema al enviar tu formulario. Inténtalo de nuevo más tarde.',
  err_help: 'Si el problema persiste, contáctanos directamente.',
  err_btn: 'Reintentar',
  pending_title: '¡Casi listo!',
  pending_body:
    '¡Gracias! El envío en línea se está finalizando. Mientras tanto, llámanos o escríbenos por WhatsApp y atenderemos tu solicitud de evalúo de inmediato.',
  pending_btn: 'De acuerdo',
};

const DICT: Record<Lang, Dictionary> = { en, fr, es };
