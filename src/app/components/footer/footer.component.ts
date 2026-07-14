import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public L = inject(LanguageService);

  // Business line.
  readonly phoneDisplay = '+1 (613) 709-5311';
  readonly phoneTel = '+16137095311';
  readonly whatsapp = '16137095311';             // requires WhatsApp Business registered on this line
  readonly email = 'info@usappraiser.com';
  readonly year = 2026;
}
