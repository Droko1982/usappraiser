import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService, Lang } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public L = inject(LanguageService);
  public theme = inject(ThemeService);

  menuValue: boolean = false
  menu_icon: string = 'fa-solid fa-bars';

  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }

  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'fa-solid fa-bars';
  }

  toggleLang() {
    this.L.toggle();
  }

  onLang(event: Event) {
    this.L.set((event.target as HTMLSelectElement).value as Lang);
  }
}
