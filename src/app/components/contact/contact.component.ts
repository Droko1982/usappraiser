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
