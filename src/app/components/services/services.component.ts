import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  public L = inject(LanguageService);
  private seo = inject(SeoService);

  private servicesEn: string[] = [
    'Residential Appraisals',
    'Commercial Appraisals',
    'Land / Vacant Land Appraisals',
    'Machinery & Equipment Appraisals',
    'Consulting Services',
    'Mortgage Financing',
    'Relocations – Government and Employee',
    'Matrimonial / Separation of Assets',
    'New Construction',
    'Capital Gains',
    'Pre-list and Pre-sale Valuations',
    'Power of Sale / Foreclosure',
    'Property Tax Assessment Appeals',
    'Insurance / Replacement Cost Valuations',
    'Expropriation / Right-of-Way Acquisitions',
    'Wills and Estates',
  ];

  private servicesFr: string[] = [
    'Évaluations résidentielles',
    'Évaluations commerciales',
    'Évaluations de terrains',
    'Évaluations de machinerie et d’équipement',
    'Services de consultation',
    'Financement hypothécaire',
    'Réinstallations – gouvernement et employés',
    'Matrimonial / séparation des biens',
    'Construction neuve',
    'Gains en capital',
    'Évaluations avant mise en vente',
    'Vente sous seing / saisie',
    'Contestations d’évaluation foncière',
    'Assurance / coût de remplacement',
    'Expropriation / acquisitions d’emprise',
    'Testaments et successions',
  ];

  private servicesEs: string[] = [
    'Evalúos residenciales',
    'Evalúos comerciales',
    'Evalúos de terrenos',
    'Evalúos de maquinaria y equipo',
    'Servicios de consultoría',
    'Financiamiento hipotecario',
    'Reubicaciones – gobierno y empleados',
    'Matrimonial / división de bienes',
    'Construcción nueva',
    'Ganancias de capital',
    'Valoraciones previas a la venta',
    'Venta forzada / ejecución hipotecaria',
    'Apelaciones de impuesto predial',
    'Seguro / costo de reemplazo',
    'Expropiación / servidumbre de paso',
    'Testamentos y sucesiones',
  ];

  constructor(private router: Router) {
    effect(() => { this.L.lang(); this.seo.set('services'); });
  }

  get services(): string[] {
    const l = this.L.lang();
    return l === 'fr' ? this.servicesFr : l === 'es' ? this.servicesEs : this.servicesEn;
  }

  getAppraiser() {
    this.router.navigate(['/contact']);
  }
}
