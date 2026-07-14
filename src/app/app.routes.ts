import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServicesComponent } from './components/services/services.component';
import { CityComponent } from './components/city/city.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { CITIES } from './data/cities';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'privacy', component: PrivacyComponent },
    // City landing pages (static paths so they are prerendered for SEO)
    ...CITIES.map(c => ({
        path: `appraisal/${c.slug}`,
        component: CityComponent,
        data: { slug: c.slug },
    })),
    { path: "**", pathMatch: "full", redirectTo: "" }
];
