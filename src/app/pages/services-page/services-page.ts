import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceModel } from '../../models/ServiceModel';

@Component({
  selector: 'app-services-page',
  imports: [RouterLink],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {
  protected localidadesOpen = signal(false);
  protected categoriasOpen = signal(false);
  protected userMenuOpen = signal(false);
  public serviceObject: ServiceModel = { categoryName: 'Desarrollo', serviceName: 'Creacion de paginas Web', serviceDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam perferendis est magni eos magnam praesentium sequi accusamus impedit ex? Dolorum veritatis aperiam quae, nobis eos ad perferendis molestias optio nam?', serviceImage:  ''};
  
  protected userMenuOptions = [
    'Publicar un servicio',
    'Mis servicios',
    'Configuración',
    'Cerrar sesión'
  ];
  
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

  protected toggleDropdown(field: 'localidades' | 'categorias' | 'userMenu') {
    if (field === 'localidades') {
      this.localidadesOpen.set(!this.localidadesOpen());
      this.categoriasOpen.set(false);
      this.userMenuOpen.set(false);
    } else if (field === 'categorias') {
      this.categoriasOpen.set(!this.categoriasOpen());
      this.localidadesOpen.set(false);
      this.userMenuOpen.set(false);
    } else {
      this.userMenuOpen.set(!this.userMenuOpen());
      this.localidadesOpen.set(false);
      this.categoriasOpen.set(false);
    }
  }

  protected closeDropdowns() {
    setTimeout(() => {
      this.localidadesOpen.set(false);
      this.categoriasOpen.set(false);
      this.userMenuOpen.set(false);
    }, 300);
  }
}