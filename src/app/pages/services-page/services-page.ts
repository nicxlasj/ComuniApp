import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-services-page',
  imports: [],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {
  protected localidadesOpen = signal(false);
  protected categoriasOpen = signal(false);

  protected localidades = [
    'Ciudadela Colsubsidio',
    'Gran Granada',
    'Morato',
    'Chico Alto',
    'Cedritos'
  ];

  protected categorias = [
    'Negocios',
    'Tecnología',
    'Marketing',
    'Gestión',
    'Finanzas',
    'Salud',
    'Educación'
  ];

  protected toggleDropdown(field: 'localidades' | 'categorias') {
    if (field === 'localidades') {
      this.localidadesOpen.set(!this.localidadesOpen());
      this.categoriasOpen.set(false);
    } else {
      this.categoriasOpen.set(!this.categoriasOpen());
      this.localidadesOpen.set(false);
    }
  }

  protected closeDropdowns() {
    this.localidadesOpen.set(false);
    this.categoriasOpen.set(false);
  }
}