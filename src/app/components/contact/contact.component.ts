import { Component, OnInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContacDTO } from '../../dto/contac-dto';
import Swal from 'sweetalert2';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';

/**
 * Where appraisal leads are delivered.
 * FormSubmit.co needs ONLY this email address — no account, no API keys.
 * First submission (or the one-time activation email FormSubmit sends here) turns it on;
 * after that every request lands in this inbox.
 */
const LEAD_EMAIL = 'info@usappraiser.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${LEAD_EMAIL}`;

/**
 * Localized labels for the dropdown options.
 * The submitted VALUE stays English (so every lead email reads consistently for the office);
 * only the visible label is translated for ES/FR visitors.
 */
const OPT_LABELS: Record<string, { es: string; fr: string }> = {
  // Property type
  'Residential': { es: 'Residencial', fr: 'Résidentiel' },
  'Commercial': { es: 'Comercial', fr: 'Commercial' },
  'Land / Vacant Land': { es: 'Terreno / Terreno baldío', fr: 'Terrain / Terrain vacant' },
  'Machinery / Equipment': { es: 'Maquinaria / Equipo', fr: 'Machinerie / Équipement' },
  // Report type
  'Full Appraisal': { es: 'Evalúo completo', fr: 'Évaluation complète' },
  'Full Appraisal With Market Rent': { es: 'Evalúo completo con renta de mercado', fr: 'Évaluation complète avec loyer marchand' },
  'Market Rent': { es: 'Renta de mercado', fr: 'Loyer marchand' },
  'Cancelled Appraisal - Report Written': { es: 'Evalúo cancelado - informe redactado', fr: 'Évaluation annulée - rapport rédigé' },
  'Capital Gains': { es: 'Ganancias de capital', fr: 'Gains en capital' },
  'Drive By': { es: 'Inspección exterior (drive-by)', fr: 'Inspection extérieure (drive-by)' },
  'Desktop Appraisal': { es: 'Evalúo de escritorio', fr: 'Évaluation sur dossier' },
  'Progress Report': { es: 'Informe de avance', fr: 'Rapport d’avancement' },
  'Completion Certificate': { es: 'Certificado de finalización', fr: 'Certificat d’achèvement' },
  'Replacement Cost': { es: 'Costo de reemplazo', fr: 'Coût de remplacement' },
  'Consulting Request': { es: 'Solicitud de consultoría', fr: 'Demande de consultation' },
  'Other': { es: 'Otro', fr: 'Autre' },
  // Purpose
  'Purchase': { es: 'Compra', fr: 'Achat' },
  'Refinance': { es: 'Refinanciamiento', fr: 'Refinancement' },
  'Divorce': { es: 'Divorcio', fr: 'Divorce' },
  'Pre-List / Pre-Sale': { es: 'Antes de listar / Preventa', fr: 'Avant inscription / vente' },
  'Relocation': { es: 'Reubicación', fr: 'Réinstallation' },
  'Estate Settlement With Buyout': { es: 'Sucesión con compra de participación', fr: 'Règlement successoral avec rachat' },
  'Estate Settlement Title Transfer': { es: 'Sucesión con transferencia de título', fr: 'Règlement successoral avec transfert de titre' },
  'Probate': { es: 'Sucesión testamentaria', fr: 'Homologation' },
  'Title Transfer': { es: 'Transferencia de título', fr: 'Transfert de titre' },
  'Power Of Sale Or Foreclosure': { es: 'Ejecución hipotecaria', fr: 'Pouvoir de vente ou saisie' },
  'IRS / Tax Reporting': { es: 'IRS / Declaración de impuestos', fr: 'IRS / Déclaration fiscale' },
  'Prenups': { es: 'Acuerdo prenupcial', fr: 'Contrat de mariage' },
  'Update': { es: 'Actualización', fr: 'Mise à jour' },
  'Internal Asset Management': { es: 'Gestión interna de activos', fr: 'Gestion interne d’actifs' },
  'Assist Marketing Subject Property': { es: 'Apoyo a la comercialización del inmueble', fr: 'Aide à la mise en marché du bien' },
  // Dwelling style
  'Detached': { es: 'Independiente', fr: 'Individuelle (détachée)' },
  'Row Unit': { es: 'Casa en hilera', fr: 'Maison en rangée' },
  'Semi-Detached': { es: 'Pareada / Semi-independiente', fr: 'Jumelée (semi-détachée)' },
  'Apartment': { es: 'Apartamento', fr: 'Appartement' },
  'Condominium': { es: 'Condominio', fr: 'Copropriété' },
  // Dwelling type
  '1½ Story': { es: '1½ piso', fr: '1½ étage' },
  '2 Story': { es: '2 pisos', fr: '2 étages' },
  '3 Story': { es: '3 pisos', fr: '3 étages' },
  'Fourplex': { es: 'Cuádruplex', fr: 'Quadruplex' },
  'Bungalow (1 Story)': { es: 'Bungaló (1 piso)', fr: 'Bungalow (1 étage)' },
  'Bungalow With Loft': { es: 'Bungaló con altillo', fr: 'Bungalow avec mezzanine' },
  'Double': { es: 'Doble', fr: 'Double' },
  'Duplex / Secondary Dwelling Unit / In-Law Suite': { es: 'Dúplex / Vivienda secundaria / Suite anexa', fr: 'Duplex / Logement secondaire / Suite parentale' },
  'Raised Ranch': { es: 'Rancho elevado (raised ranch)', fr: 'Maison surélevée (raised ranch)' },
  'Mobile': { es: 'Móvil', fr: 'Mobile' },
  'Modular': { es: 'Modular', fr: 'Modulaire' },
  'One Level': { es: 'Un nivel', fr: 'Plain-pied' },
  'Split Level': { es: 'Niveles escalonados (split level)', fr: 'Paliers décalés (split level)' },
  'Triplex': { es: 'Tríplex', fr: 'Triplex' },
  // Yes / No
  'Yes': { es: 'Sí', fr: 'Oui' },
  'No': { es: 'No', fr: 'Non' },
};

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ContactComponent implements OnInit {

  public L = inject(LanguageService);
  private http = inject(HttpClient);
  private seo = inject(SeoService);

  contacDto: ContacDTO = new ContacDTO();
  propertyType: string[] = [];
  reportType: string[] = [];
  purposeType: string[] = [];
  dwellingStyle: string[] = [];
  dwellingType: string[] = [];
  isRetrospectiveAppraisal: string[] = [];
  sending = false;
  /** Honeypot — bots fill hidden fields; humans never see it. Non-empty => drop silently. */
  honeypot = '';

  constructor() {
    effect(() => { this.L.lang(); this.seo.set('contact'); });
  }

  ngOnInit(): void {
    this.uploadPropertyType();
    this.uploadReportType();
    this.uploadPurposeType();
    this.uploadDwellingStyle();
    this.uploadDwellingType();
    this.uploadIsRetrospectiveAppraisal();
  }

  /** Localized display label for a dropdown option (English value is preserved for submission). */
  optLabel(value: string): string {
    const t = OPT_LABELS[value];
    if (!t) { return value; }
    const l = this.L.lang();
    return l === 'es' ? t.es : l === 'fr' ? t.fr : value;
  }

  public sendEmail(event: Event, form: NgForm): void {
    event.preventDefault();
    if (this.honeypot) { return; }          // bot caught by honeypot
    if (this.sending) { return; }
    if (form.invalid) {                      // don't send empty/incomplete leads
      form.form.markAllAsTouched();
      return;
    }
    this.sending = true;

    const payload: Record<string, string> = {
      _subject: 'New Appraisal Request — US Appraiser',
      _template: 'table',
      _captcha: 'false',
      _honey: this.honeypot,
      Source: 'US Appraiser — usappraiser.com',
      'First Name': this.contacDto.firstName,
      'Last Name': this.contacDto.lastName,
      Phone: this.contacDto.phoneNumber,
      Email: this.contacDto.emailAddress,
      'Property Address': this.contacDto.address,
      'Report Type': this.contacDto.reportType,
      'Report Type (other)': this.contacDto.otherReport,
      'Property Type': this.contacDto.propertyType,
      Purpose: this.contacDto.purposeType,
      'Purpose (other)': this.contacDto.otherPurpose,
      'Dwelling Style': this.contacDto.dwellingStyleType,
      'Dwelling Type': this.contacDto.dwellingType,
      'Dwelling Type (other)': this.contacDto.otherDwellingType,
      'Special Assessments': this.contacDto.specialAssessments,
      'Retrospective Appraisal': this.contacDto.isRetrospectiveAppraisal,
      'Retrospective Date': this.contacDto.retrospectiveAppraisalDate,
      'Additional Information': this.contacDto.additionalInfo,
    };

    this.http.post(FORMSUBMIT_ENDPOINT, payload, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    }).subscribe({
      next: () => {
        this.sending = false;
        Swal.fire({
          icon: 'success',
          title: `<h3 style="color: #4CAF50;">${this.L.t('ok_title')}</h3>`,
          html: `
          <p style="color: #555;">${this.L.t('ok_body')}</p>
          <p style="font-size: 0.9rem; color: #888;">${this.L.t('ok_thanks')}</p>
        `,
          confirmButtonText: this.L.t('ok_btn'),
          confirmButtonColor: '#4CAF50',
          background: '#f9f9f9',
          timer: 6000,
          timerProgressBar: true,
        });
        this.contacDto = new ContacDTO();
        form.resetForm();
      },
      error: () => {
        this.sending = false;
        Swal.fire({
          icon: 'error',
          title: `<h3 style="color: #E74C3C;">${this.L.t('err_title')}</h3>`,
          html: `
          <p style="color: #555;">${this.L.t('err_body')}</p>
          <p style="font-size: 0.9rem; color: #888;">${this.L.t('err_help')}</p>
        `,
          confirmButtonText: this.L.t('err_btn'),
          confirmButtonColor: '#E74C3C',
          background: '#f9f9f9',
        });
      }
    });
  }

  private uploadPropertyType() {
    this.propertyType = [
      "Residential",
      "Commercial",
      "Land / Vacant Land",
      "Machinery / Equipment",
    ];
  }

  private uploadReportType() {
    this.reportType = [
      "Full Appraisal",
      "Full Appraisal With Market Rent",
      "Market Rent",
      "Cancelled Appraisal - Report Written",
      "Capital Gains",
      "Drive By",
      "Desktop Appraisal",
      "Progress Report",
      "Completion Certificate",
      "Replacement Cost",
      "Consulting Request",
      "Other"
    ];
  }

  private uploadPurposeType() {
    this.purposeType = [
      "Purchase",
      "Refinance",
      "Capital Gains",
      "Divorce",
      "Pre-List / Pre-Sale",
      "Relocation",
      "Estate Settlement With Buyout",
      "Estate Settlement Title Transfer",
      "Probate",
      "Title Transfer",
      "Power Of Sale Or Foreclosure",
      "IRS / Tax Reporting",
      "Prenups",
      "Update",
      "Internal Asset Management",
      "Assist Marketing Subject Property",
      "Other"
    ];
  }

  private uploadDwellingStyle() {
    this.dwellingStyle = [
      "Detached",
      "Row Unit",
      "Semi-Detached",
      "Apartment",
      "Condominium"
    ];
  }

  private uploadDwellingType() {
    this.dwellingType = [
      "1½ Story",
      "2 Story",
      "3 Story",
      "Fourplex",
      "Bungalow (1 Story)",
      "Bungalow With Loft",
      "Double",
      "Duplex / Secondary Dwelling Unit / In-Law Suite",
      "Raised Ranch",
      "Mobile",
      "Modular",
      "One Level",
      "Split Level",
      "Triplex",
      "Other"
    ];
  }

  private uploadIsRetrospectiveAppraisal() {
    this.isRetrospectiveAppraisal = [
      "Yes",
      "No"
    ];
  }

}
