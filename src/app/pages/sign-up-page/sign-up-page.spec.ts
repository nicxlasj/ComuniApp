import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SignUpPage } from '../sign-up-page/sign-up-page';

describe('SignUpPage - Tests Unitarios Visuales y UX/UI', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpPage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElement = fixture.nativeElement;
  });

  // UI: Consistencia de diseño de tarjetas/contenedores entre login y registro
  it('debe tener un contenedor de formulario con el mismo ancho máximo y bordes consistentes con el Login', () => {
    const card = htmlElement.querySelector('main > div');
    expect(card).toBeTruthy();
    expect(card?.classList).toContain('max-w-md');
    expect(card?.classList).toContain('p-8');
    expect(card?.classList).toContain('bg-white');
    expect(card?.classList).toContain('rounded-lg');
    expect(card?.classList).toContain('shadow-sm');
    expect(card?.classList).toContain('border-gray-100');
  });

  // UI: Consistencia de color principal en encabezados
  it('debe tener un título H1 de "Crear cuenta" con el color azul corporativo idéntico al login', () => {
    const title = htmlElement.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Crear cuenta');
    expect(title?.classList).toContain('text-2xl');
    expect(title?.classList).toContain('font-semibold');
    expect(title?.classList).toContain('text-blue-600');
  });

  // UI: Layout de rejilla (Grid) para Nombre y Apellido
  it('debe contener un layout de grid de 2 columnas con espacio adecuado para los campos Nombre y Apellido', () => {
    const gridDiv = htmlElement.querySelector('form > div.grid');
    expect(gridDiv).toBeTruthy();
    expect(gridDiv?.classList).toContain('grid-cols-2');
    expect(gridDiv?.classList).toContain('gap-4');
  });

  // UX: Accesibilidad - Labels asociados a inputs en Nombre y Apellido
  it('debe asociar correctamente los labels de "Nombre" y "Apellido" a sus inputs correspondientes', () => {
    const labelFirstName = htmlElement.querySelector('label[for="firstName"]');
    const inputFirstName = htmlElement.querySelector('input#firstName');
    const labelLastName = htmlElement.querySelector('label[for="lastName"]');
    const inputLastName = htmlElement.querySelector('input#lastName');

    expect(labelFirstName?.textContent?.trim()).toBe('Nombre');
    expect(inputFirstName).toBeTruthy();
    expect(labelLastName?.textContent?.trim()).toBe('Apellido');
    expect(inputLastName).toBeTruthy();
  });

  // UX: Accesibilidad - Label asociado al input de Correo electrónico
  it('debe asociar correctamente el label de "Correo electrónico" a su input correspondiente', () => {
    const labelEmail = htmlElement.querySelector('label[for="email"]');
    const inputEmail = htmlElement.querySelector('input#email');
    expect(labelEmail?.textContent?.trim()).toBe('Correo electrónico');
    expect(inputEmail).toBeTruthy();
    expect(inputEmail?.getAttribute('type')).toBe('email');
  });

  // UX: Seguridad visual - Tipo de contraseña para campos de claves
  it('debe tener tipo "password" en los dos inputs de contraseña para ocultar el texto ingresado', () => {
    const passwordInput = htmlElement.querySelector('input#password');
    const confirmPasswordInput = htmlElement.querySelector('input#confirmPassword');
    expect(passwordInput?.getAttribute('type')).toBe('password');
    expect(confirmPasswordInput?.getAttribute('type')).toBe('password');
  });

  // UI: Consistencia de estilos en inputs del formulario
  it('debe aplicar la misma clase de estilos visuales a todos los campos de entrada del formulario', () => {
    const inputs = htmlElement.querySelectorAll('input');
    expect(inputs.length).toBe(5); // Nombre, Apellido, Email, Contraseña, Confirmar Contraseña
    inputs.forEach(input => {
      expect(input.classList).toContain('px-4');
      expect(input.classList).toContain('py-3');
      expect(input.classList).toContain('rounded-lg');
      expect(input.classList).toContain('border-gray-200');
    });
  });

  // UI: Consistencia visual en botón de submit (Estilo de Botón Primario)
  it('debe usar el mismo estilo del botón primario del login para el botón de "Crear cuenta"', () => {
    const btnSubmit = htmlElement.querySelector('button[type="submit"]');
    expect(btnSubmit).toBeTruthy();
    expect(btnSubmit?.classList).toContain('bg-blue-600');
    expect(btnSubmit?.classList).toContain('text-white');
    expect(btnSubmit?.classList).toContain('w-full');
    expect(btnSubmit?.classList).toContain('rounded-lg');
    expect(btnSubmit?.classList).toContain('hover:bg-blue-800');
  });

  // UI: Enlaces interactivos secundarios consistentes
  it('debe tener el enlace "Inicia sesión" con estilo secundario interactivo hover:underline', () => {
    const loginLink = htmlElement.querySelector('a[routerLink="/login"]');
    expect(loginLink).toBeTruthy();
    expect(loginLink?.classList).toContain('text-gray-900');
    expect(loginLink?.classList).toContain('font-medium');
    expect(loginLink?.classList).toContain('hover:underline');
  });

  // UI: Jerarquía tipográfica consistente
  it('debe aplicar una jerarquía tipográfica consistente a los labels (text-sm font-medium)', () => {
    const labels = htmlElement.querySelectorAll('label');
    labels.forEach(label => {
      expect(label.classList).toContain('text-sm');
      expect(label.classList).toContain('font-medium');
      expect(label.classList).toContain('text-gray-700');
    });
  });
});
