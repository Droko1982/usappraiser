import { Component, inject, effect } from '@angular/core';
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
  readonly cities = CITIES;

  constructor() {
    effect(() => { this.L.lang(); this.seo.set('home'); });
  }
}
