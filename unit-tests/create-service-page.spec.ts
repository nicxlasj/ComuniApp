import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateServicePage } from '../create-service-page/create-service-page';

describe('CreateServicePage - Tests Unitarios Visuales y UX/UI', () => {
  let component: CreateServicePage;
  let fixture: ComponentFixture<CreateServicePage>;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServicePage]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElement = fixture.nativeElement;
  });

  // UI: Jerarquía tipográfica en el título de la página
  it('debe tener un título principal H1 de creación con clase text-3xl font-bold text-gray-800', () => {
    const title = htmlElement.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Crear Nuevo Servicio');
    expect(title?.classList).toContain('text-3xl');
    expect(title?.classList).toContain('font-bold');
    expect(title?.classList).toContain('text-gray-800');
  });

  // UI: Tarjeta de formulario con diseño y bordes Premium
  it('debe contener un formulario estructurado como tarjeta con fondo blanco, bordes redondeados y sombra', () => {
    const form = htmlElement.querySelector('form');
    expect(form).toBeTruthy();
    expect(form?.classList).toContain('bg-white');
    expect(form?.classList).toContain('rounded-2xl');
    expect(form?.classList).toContain('shadow-lg');
    expect(form?.classList).toContain('p-8');
  });

  // UX: Accesibilidad - Asociación de label a input de nombre del servicio
  it('debe tener la etiqueta "Nombre del Servicio" asociada correctamente al input mediante el for', () => {
    const label = htmlElement.querySelector('label[for="serviceName"]');
    const input = htmlElement.querySelector('input#serviceName');
    expect(label).toBeTruthy();
    expect(label?.textContent?.trim()).toBe('Nombre del Servicio');
    expect(input).toBeTruthy();
  });

  // UX: Accesibilidad - Asociación de label a selector de categoría
  it('debe tener la etiqueta "Categoría" asociada correctamente al select mediante el for', () => {
    const label = htmlElement.querySelector('label[for="categoryName"]');
    const select = htmlElement.querySelector('select#categoryName');
    expect(label).toBeTruthy();
    expect(label?.textContent?.trim()).toBe('Categoría');
    expect(select).toBeTruthy();
  });

  // UI / UX: Estilos en elemento selector y presencia de opciones correctas
  it('debe tener un select de categorías estilizado y con al menos 5 opciones disponibles para elegir', () => {
    const select = htmlElement.querySelector('select#categoryName');
    expect(select?.classList).toContain('rounded-lg');
    expect(select?.classList).toContain('border-gray-300');
    expect(select?.classList).toContain('bg-white');

    const options = htmlElement.querySelectorAll('select#categoryName option');
    // Debe haber la opción placeholder deshabilitada + las categorías reales (en total 9 en HTML)
    expect(options.length).toBeGreaterThanOrEqual(6);
  });

  // UI: Área de descripción del servicio (Textarea)
  it('debe tener un textarea de descripción con 5 filas y la propiedad de redimensionamiento deshabilitada (resize-none)', () => {
    const textarea = htmlElement.querySelector('textarea#serviceDescription');
    expect(textarea).toBeTruthy();
    expect(textarea?.getAttribute('rows')).toBe('5');
    expect(textarea?.classList).toContain('resize-none');
    expect(textarea?.classList).toContain('rounded-lg');
  });

  // UI: Presencia de texto de ayuda secundario
  it('debe tener una nota de ayuda de tamaño reducido y color atenuado para el campo de imagen', () => {
    const helpText = htmlElement.querySelector('input#serviceImage + p');
    expect(helpText).toBeTruthy();
    expect(helpText?.textContent?.trim()).toBe('Ingresa la URL de una imagen para representar tu servicio');
    expect(helpText?.classList).toContain('text-sm');
    expect(helpText?.classList).toContain('text-gray-500');
  });

  // UI: Diseño de botones de acción y flexibilidad en layout
  it('debe tener un botón de submit azul flexible y un botón de limpiar con bordes grises', () => {
    const submitBtn = htmlElement.querySelector('button[type="submit"]');
    const resetBtn = htmlElement.querySelector('button[type="reset"]');

    expect(submitBtn?.classList).toContain('bg-blue-600');
    expect(submitBtn?.classList).toContain('text-white');
    expect(submitBtn?.classList).toContain('flex-1');

    expect(resetBtn?.classList).toContain('border-gray-300');
    expect(resetBtn?.classList).toContain('text-gray-700');
  });

  // UX: Control dinámico del modal de éxito - Estado oculto (Signal = false)
  it('no debe renderizar el modal de éxito en el DOM cuando showModal() es false', () => {
    component.showModal.set(false);
    fixture.detectChanges();

    const modal = htmlElement.querySelector('.fixed');
    expect(modal).toBeNull();
  });

  // UX: Control dinámico y visual del modal - Estado visible (Signal = true)
  it('debe renderizar el modal de éxito centrado, con fondo opaco y desenfoque (backdrop blur) si showModal() es true', () => {
    component.showModal.set(true);
    fixture.detectChanges();

    const modalContainer = htmlElement.querySelector('.fixed');
    expect(modalContainer).toBeTruthy();
    expect(modalContainer?.classList).toContain('inset-0');
    expect(modalContainer?.classList).toContain('bg-gray-900/30');
    expect(modalContainer?.classList).toContain('backdrop-blur-sm');

    const modalBox = modalContainer?.querySelector('div > div');
    expect(modalBox?.classList).toContain('bg-white');
    expect(modalBox?.classList).toContain('rounded-2xl');
  });

  // UI: Ícono de Check de éxito y tipografía en el modal
  it('debe tener un círculo de check verde y texto "¡Servicio Creado!" grande en el modal de éxito', () => {
    component.showModal.set(true);
    fixture.detectChanges();

    const checkBg = htmlElement.querySelector('.bg-green-100');
    const checkIcon = htmlElement.querySelector('.text-green-600');
    const modalTitle = htmlElement.querySelector('.fixed h2');

    expect(checkBg).toBeTruthy();
    expect(checkBg?.classList).toContain('rounded-full');
    expect(checkIcon).toBeTruthy();
    expect(modalTitle?.textContent?.trim()).toBe('¡Servicio Creado!');
    expect(modalTitle?.classList).toContain('text-xl');
    expect(modalTitle?.classList).toContain('font-bold');
  });
});
