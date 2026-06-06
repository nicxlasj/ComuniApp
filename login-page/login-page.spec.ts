import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { LoginPage } from '../login-page/login-page';

describe('LoginPage - Tests Unitarios Visuales y UX/UI', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElement = fixture.nativeElement;
  });

  // UI: Estructura y clases de layout responsivo en contenedor principal
  it('debe tener un contenedor principal <main> centrado, con altura completa y fondo gris claro', () => {
    const mainEl = htmlElement.querySelector('main');
    expect(mainEl).toBeTruthy();
    expect(mainEl?.classList).toContain('min-h-screen');
    expect(mainEl?.classList).toContain('flex');
    expect(mainEl?.classList).toContain('items-center');
    expect(mainEl?.classList).toContain('justify-center');
    expect(mainEl?.classList).toContain('bg-gray-50');
  });

  // UI: Diseño de la tarjeta/contenedor del formulario (consistencia visual)
  it('debe tener una tarjeta de formulario con ancho máximo, padding, fondo blanco, bordes redondeados y sombra sutil', () => {
    const formCard = htmlElement.querySelector('main > div');
    expect(formCard).toBeTruthy();
    expect(formCard?.classList).toContain('w-full');
    expect(formCard?.classList).toContain('max-w-md');
    expect(formCard?.classList).toContain('p-8');
    expect(formCard?.classList).toContain('bg-white');
    expect(formCard?.classList).toContain('rounded-lg');
    expect(formCard?.classList).toContain('shadow-sm');
    expect(formCard?.classList).toContain('border');
    expect(formCard?.classList).toContain('border-gray-100');
  });

  // UI: Jerarquía tipográfica y color principal de marca en títulos
  it('debe mostrar el título "Bienvenido" con el color azul corporativo y tamaño de fuente correcto', () => {
    const title = htmlElement.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Bienvenido');
    expect(title?.classList).toContain('text-2xl');
    expect(title?.classList).toContain('font-semibold');
    expect(title?.classList).toContain('text-blue-600');
  });

  // UI: Contraste y color en elementos de texto secundario (subtítulos)
  it('debe mostrar el subtítulo "Ingresa a tu cuenta" con estilo secundario y color gris de bajo contraste', () => {
    const subtitle = htmlElement.querySelector('h1 + p');
    expect(subtitle).toBeTruthy();
    expect(subtitle?.textContent?.trim()).toBe('Ingresa a tu cuenta');
    expect(subtitle?.classList).toContain('text-gray-500');
    expect(subtitle?.classList).toContain('mt-2');
  });

  // UX: Accesibilidad - Label asociado correctamente al input de email
  it('debe tener la etiqueta "Usuario" correctamente vinculada al input de email mediante el atributo for', () => {
    const label = htmlElement.querySelector('label[for="email"]');
    const input = htmlElement.querySelector('input#email');
    expect(label).toBeTruthy();
    expect(label?.textContent?.trim()).toBe('Usuario');
    expect(input).toBeTruthy();
    expect(input?.getAttribute('type')).toBe('email');
  });

  // UX: Accesibilidad - Label asociado correctamente al input de contraseña
  it('debe tener la etiqueta "Contraseña" correctamente vinculada al input de contraseña mediante el atributo for', () => {
    const label = htmlElement.querySelector('label[for="password"]');
    const input = htmlElement.querySelector('input#password');
    expect(label).toBeTruthy();
    expect(label?.textContent?.trim()).toBe('Contraseña');
    expect(input).toBeTruthy();
    expect(input?.getAttribute('type')).toBe('password');
  });

  // UX: Accesibilidad visual - El input de email debe tener placeholder y clases de borde consistentes
  it('debe mostrar el placeholder correcto y clases de diseño base en el input de email', () => {
    const input = htmlElement.querySelector('input#email');
    expect(input?.getAttribute('placeholder')).toBe('username123');
    expect(input?.classList).toContain('w-full');
    expect(input?.classList).toContain('px-4');
    expect(input?.classList).toContain('py-3');
    expect(input?.classList).toContain('border-gray-200');
    expect(input?.classList).toContain('rounded-lg');
  });

  // UX: Seguridad visual - El input de contraseña debe ocultar caracteres y mostrar placeholder descriptivo
  it('debe usar tipo contraseña y placeholder de puntos para seguridad visual', () => {
    const input = htmlElement.querySelector('input#password');
    expect(input?.getAttribute('type')).toBe('password');
    expect(input?.getAttribute('placeholder')).toBe('••••••••');
  });

  // UI: Color y forma del botón de submit (consistencia del botón primario)
  it('debe tener el botón de submit con el color primario de marca, texto blanco, ancho completo y bordes redondeados', () => {
    const submitBtn = htmlElement.querySelector('button[type="submit"]');
    expect(submitBtn).toBeTruthy();
    expect(submitBtn?.classList).toContain('bg-blue-600');
    expect(submitBtn?.classList).toContain('text-white');
    expect(submitBtn?.classList).toContain('w-full');
    expect(submitBtn?.classList).toContain('rounded-lg');
  });

  // UX: Estado interactivo - Transición y hover en el botón de acción principal
  it('debe incluir clases de hover, ring focus y cursor pointer en el botón de submit para retroalimentación interactiva', () => {
    const submitBtn = htmlElement.querySelector('button[type="submit"]');
    expect(submitBtn?.classList).toContain('hover:bg-blue-800');
    expect(submitBtn?.classList).toContain('focus:ring-2');
    expect(submitBtn?.classList).toContain('focus:ring-gray-400');
    expect(submitBtn?.classList).toContain('transition-colors');
    expect(submitBtn?.classList).toContain('cursor-pointer');
  });

  // UI: Enlaces secundarios con estados interactivos (Hover underline)
  it('debe tener el enlace de registro con estilo de texto oscuro e interactividad hover:underline', () => {
    const registerLink = htmlElement.querySelector('a[routerLink="/sign-up"]');
    expect(registerLink).toBeTruthy();
    expect(registerLink?.classList).toContain('text-gray-900');
    expect(registerLink?.classList).toContain('font-medium');
    expect(registerLink?.classList).toContain('hover:underline');
  });

  // UI: Coherencia y jerarquía tipográfica general
  it('debe cumplir con la jerarquía tipográfica estándar para las etiquetas y formularios', () => {
    const labels = htmlElement.querySelectorAll('label');
    labels.forEach(lbl => {
      expect(lbl.classList).toContain('text-sm');
      expect(lbl.classList).toContain('font-medium');
      expect(lbl.classList).toContain('text-gray-700');
    });
  });
});
