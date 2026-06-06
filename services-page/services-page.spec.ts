import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesPage } from '../services-page/services-page';

describe('ServicesPage - Tests Unitarios Visuales y UX/UI', () => {
  let component: ServicesPage;
  let fixture: ComponentFixture<ServicesPage>;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElement = fixture.nativeElement;
  });

  // UI: Estilos base del Navbar (Diseño Premium)
  it('debe tener una barra de navegación con fondo blanco, sombra y espaciado correctos', () => {
    const nav = htmlElement.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav?.classList).toContain('bg-white');
    expect(nav?.classList).toContain('shadow-md');
    expect(nav?.classList).toContain('px-6');
    expect(nav?.classList).toContain('py-4');
  });

  // UI: Identidad visual del logo de la marca
  it('debe mostrar el logo "ComuniApp" en color azul corporativo y estilo bold destacado', () => {
    const logo = htmlElement.querySelector('nav span.text-2xl');
    expect(logo).toBeTruthy();
    expect(logo?.textContent?.trim()).toBe('ComuniApp');
    expect(logo?.classList).toContain('font-bold');
    expect(logo?.classList).toContain('text-blue-600');
  });

  // UX: Accesibilidad y estilos en la barra de búsqueda
  it('debe contener un input de búsqueda con el placeholder correcto y bordes redondeados', () => {
    const searchInput = htmlElement.querySelector('input[type="text"]');
    expect(searchInput).toBeTruthy();
    expect(searchInput?.getAttribute('placeholder')).toBe('Buscar servicios...');
    expect(searchInput?.classList).toContain('border-gray-300');
    expect(searchInput?.classList).toContain('rounded-lg');
  });

  // UI: Elementos decorativos (Ícono de búsqueda SVG)
  it('debe tener el icono SVG de búsqueda posicionado dentro del input', () => {
    const svgIcon = htmlElement.querySelector('input[type="text"] + svg');
    expect(svgIcon).toBeTruthy();
    expect(svgIcon?.classList).toContain('text-gray-400');
    expect(svgIcon?.classList).toContain('absolute');
  });

  // UI: Imagen de perfil del usuario (Avatar) con borde de marca
  it('debe renderizar el avatar circular del usuario con un borde azul e imagen desde Dicebear', () => {
    const avatar = htmlElement.querySelector('img[alt="Usuario"]');
    expect(avatar).toBeTruthy();
    expect(avatar?.classList).toContain('rounded-full');
    expect(avatar?.classList).toContain('border-2');
    expect(avatar?.classList).toContain('border-blue-500');
    expect(avatar?.getAttribute('src')).toContain('api.dicebear.com');
  });

  // UX: Interactividad dinámica - Dropdown de Localidades (Signal = true)
  it('debe renderizar el dropdown de localidades en el DOM cuando localidadesOpen() es true', () => {
    // Forzamos el signal a true
    (component as any).localidadesOpen.set(true);
    fixture.detectChanges();

    const dropdownList = htmlElement.querySelector('ul.absolute');
    expect(dropdownList).toBeTruthy();
    expect(dropdownList?.textContent).toContain('Ciudadela Colsubsidio');
  });

  // UX: Interactividad dinámica - Dropdown de Localidades (Signal = false)
  it('no debe renderizar el dropdown de localidades en el DOM cuando localidadesOpen() es false', () => {
    // Forzamos el signal a false
    (component as any).localidadesOpen.set(false);
    fixture.detectChanges();

    const dropdownList = htmlElement.querySelector('ul.absolute');
    expect(dropdownList).toBeNull();
  });

  // UI: Tarjetas de servicios - Animaciones y Sombras (Hover Elevation)
  it('debe aplicar clases de hover, elevación de sombra y desplazamiento vertical en las tarjetas de servicio', () => {
    const serviceCards = htmlElement.querySelectorAll('main > div > div');
    expect(serviceCards.length).toBeGreaterThan(0);
    serviceCards.forEach(card => {
      expect(card.classList).toContain('hover:shadow-2xl');
      expect(card.classList).toContain('hover:-translate-y-3');
      expect(card.classList).toContain('rounded-2xl');
      expect(card.classList).toContain('shadow-lg');
      expect(card.classList).toContain('border-gray-100');
    });
  });

  // UI / UX: Dimensiones fijas de imagen y accesibilidad (alt descriptivo) en tarjetas de servicio
  it('debe asegurar que las imágenes de servicios tengan un ancho fijo y atributo alt descriptivo', () => {
    const cardImages = htmlElement.querySelectorAll('main img:not([alt="Usuario"])');
    expect(cardImages.length).toBeGreaterThan(0);
    cardImages.forEach(img => {
      const parentDiv = img.parentElement;
      expect(parentDiv?.classList).toContain('w-72');
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.getAttribute('alt')?.length).toBeGreaterThan(2);
    });
  });
});
