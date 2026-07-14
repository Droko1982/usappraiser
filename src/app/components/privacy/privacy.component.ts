import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService, Lang } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';

interface Section { h: string; p: string[]; }

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {
  public L = inject(LanguageService);
  private seo = inject(SeoService);

  constructor() {
    effect(() => { this.L.lang(); this.seo.set('privacy'); });
  }

  private l(): Lang { return this.L.lang(); }

  title(): string {
    switch (this.l()) {
      case 'fr': return 'Politique de confidentialité';
      case 'es': return 'Política de privacidad';
      default: return 'Privacy Policy';
    }
  }
  updated(): string {
    switch (this.l()) {
      case 'fr': return 'Dernière mise à jour : 14 juillet 2026';
      case 'es': return 'Última actualización: 14 de julio de 2026';
      default: return 'Last updated: July 14, 2026';
    }
  }
  intro(): string {
    switch (this.l()) {
      case 'fr': return 'US Appraiser respecte votre vie privée. Cette politique explique quels renseignements nous recueillons, comment nous les utilisons et vos droits, conformément aux lois fédérales et étatiques américaines applicables en matière de protection de la vie privée (y compris, le cas échéant, la California Consumer Privacy Act (CCPA/CPRA)).';
      case 'es': return 'US Appraiser respeta tu privacidad. Esta política explica qué información recopilamos, cómo la usamos y tus derechos, conforme a las leyes federales y estatales de privacidad aplicables de EE. UU. (incluida, cuando corresponda, la California Consumer Privacy Act (CCPA/CPRA)).';
      default: return 'US Appraiser respects your privacy. This policy explains what information we collect, how we use it, and your rights, in accordance with applicable U.S. federal and state privacy laws (including, where applicable, the California Consumer Privacy Act (CCPA/CPRA)).';
    }
  }

  sections(): Section[] {
    switch (this.l()) {
      case 'fr': return [
        { h: 'Renseignements que nous recueillons', p: [
          'Renseignements que vous fournissez : lorsque vous remplissez notre formulaire, nous recueillons votre nom, courriel, numéro de téléphone, adresse de la propriété et les détails de votre demande d’évaluation.',
          'Renseignements recueillis automatiquement : nous utilisons Google Analytics pour comprendre l’utilisation du site (pages visitées, appareil, données approximatives de localisation, cookies).'] },
        { h: 'Comment nous les utilisons', p: [
          'Pour répondre à votre demande de soumission et vous mettre en relation avec un évaluateur approprié.',
          'Pour communiquer avec vous et améliorer notre site et nos services.'] },
        { h: 'Partage de vos renseignements', p: [
          'Pour fournir le service, nous transmettons les détails de votre demande à la firme d’évaluation ou à l’évaluateur sélectionné pour vous servir.',
          'Nous faisons appel à des fournisseurs de confiance : livraison des formulaires (FormSubmit), statistiques (Google Analytics) et messagerie (WhatsApp).',
          'Nous NE vendons PAS vos renseignements personnels.'] },
        { h: 'Cookies et analytique', p: [
          'Nous utilisons des cookies de Google Analytics pour mesurer l’utilisation du site. Vous pouvez désactiver les cookies dans votre navigateur.'] },
        { h: 'Conservation des données', p: [
          'Nous conservons vos renseignements uniquement le temps nécessaire pour traiter votre demande et nous conformer à la loi.'] },
        { h: 'Vos droits', p: [
          'Vous pouvez demander l’accès, la correction ou la suppression de vos renseignements personnels en nous écrivant à info@usappraiser.com.'] },
        { h: 'Sécurité', p: [
          'Nous prenons des mesures raisonnables pour protéger vos renseignements. Aucune transmission sur Internet n’est totalement sécurisée.'] },
        { h: 'Nous joindre', p: [
          'Pour toute question sur cette politique : info@usappraiser.com.'] },
        { h: 'Modifications', p: [
          'Nous pouvons mettre à jour cette politique. La date « dernière mise à jour » indiquera tout changement.'] },
      ];
      case 'es': return [
        { h: 'Información que recopilamos', p: [
          'Información que nos proporcionas: al llenar nuestro formulario recopilamos tu nombre, correo, teléfono, dirección de la propiedad y los detalles de tu solicitud de evalúo.',
          'Información recopilada automáticamente: usamos Google Analytics para entender el uso del sitio (páginas vistas, dispositivo, ubicación aproximada, cookies).'] },
        { h: 'Cómo la usamos', p: [
          'Para responder a tu solicitud de cotización y conectarte con un tasador adecuado.',
          'Para comunicarnos contigo y mejorar nuestro sitio y servicios.'] },
        { h: 'Con quién la compartimos', p: [
          'Para prestar el servicio, compartimos los detalles de tu solicitud con la firma o el tasador seleccionado para atenderte.',
          'Usamos proveedores de confianza: entrega de formularios (FormSubmit), estadísticas (Google Analytics) y mensajería (WhatsApp).',
          'NO vendemos tu información personal.'] },
        { h: 'Cookies y analítica', p: [
          'Usamos cookies de Google Analytics para medir el uso del sitio. Puedes desactivar las cookies en tu navegador.'] },
        { h: 'Retención de datos', p: [
          'Conservamos tu información solo el tiempo necesario para atender tu solicitud y cumplir con la ley.'] },
        { h: 'Tus derechos', p: [
          'Puedes solicitar acceso, corrección o eliminación de tu información personal escribiéndonos a info@usappraiser.com.'] },
        { h: 'Seguridad', p: [
          'Tomamos medidas razonables para proteger tu información. Ninguna transmisión por Internet es 100% segura.'] },
        { h: 'Contáctanos', p: [
          'Para cualquier pregunta sobre esta política: info@usappraiser.com.'] },
        { h: 'Cambios', p: [
          'Podemos actualizar esta política. La fecha de "última actualización" reflejará cualquier cambio.'] },
      ];
      default: return [
        { h: 'Information we collect', p: [
          'Information you provide: when you complete our form, we collect your name, email, phone number, property address and the details of your appraisal request.',
          'Information collected automatically: we use Google Analytics to understand site usage (pages visited, device, approximate location, cookies).'] },
        { h: 'How we use it', p: [
          'To respond to your quote request and connect you with an appropriate appraiser.',
          'To communicate with you and improve our site and services.'] },
        { h: 'How we share it', p: [
          'To provide the service, we share your request details with the appraisal firm or appraiser selected to serve you.',
          'We use trusted providers: form delivery (FormSubmit), analytics (Google Analytics) and messaging (WhatsApp).',
          'We do NOT sell your personal information.'] },
        { h: 'Cookies & analytics', p: [
          'We use Google Analytics cookies to measure site usage. You can disable cookies in your browser settings.'] },
        { h: 'Data retention', p: [
          'We keep your information only as long as needed to handle your request and comply with the law.'] },
        { h: 'Your rights', p: [
          'You may request access to, correction of, or deletion of your personal information by emailing info@usappraiser.com.'] },
        { h: 'Security', p: [
          'We take reasonable measures to protect your information. No transmission over the internet is fully secure.'] },
        { h: 'Contact us', p: [
          'For any questions about this policy: info@usappraiser.com.'] },
        { h: 'Changes', p: [
          'We may update this policy. The "last updated" date will reflect any changes.'] },
      ];
    }
  }

  backHome(): string {
    switch (this.l()) {
      case 'fr': return '← Retour à l’accueil';
      case 'es': return '← Volver al inicio';
      default: return '← Back to home';
    }
  }
}
