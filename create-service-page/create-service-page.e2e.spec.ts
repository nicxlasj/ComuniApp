import { test, expect } from '@playwright/test';

test.describe('CreateServicePage - Pruebas E2E Visuales y UX/UI', () => {

  test.beforeEach(async ({ page }) => {
    // La página de creación se asume en la ruta '/create-service'
    await page.goto('/create-service');
  });

  // UI: Layout y centrado del formulario en pantalla
  test('el formulario debe renderizarse centrado con un ancho máximo de 3xl', async ({ page }) => {
    const formContainer = page.locator('main > div, div.max-w-3xl');
    await expect(formContainer).toBeVisible();
    await expect(formContainer).toHaveClass(/max-w-3xl/);
    await expect(formContainer).toHaveClass(/mx-auto/);
  });

  // UX: Estado inicial de inputs de selección (Placeholder visible)
  test('el selector de categoría debe mostrar el placeholder inicial correcto', async ({ page }) => {
    const select = page.locator('select#categoryName');
    await expect(select).toBeVisible();
    await expect(select).toHaveValue(''); // El valor inicial de la opción deshabilitada es vacío ''
    
    const selectedText = await select.evaluate((s: HTMLSelectElement) => s.options[s.selectedIndex].text);
    expect(selectedText).toBe('Selecciona una categoría');
  });

  // UX / UI: Flujo de éxito y visualización de modal con overlay difuminado
  test('al enviar el formulario con datos válidos, debe mostrarse el modal de éxito centrado con overlay difuminado', async ({ page }) => {
    // Rellenamos el formulario
    await page.fill('#serviceName', 'Asesoría Tributaria');
    await page.selectOption('#categoryName', 'finanzas');
    await page.fill('#serviceDescription', 'Asesoría experta en impuestos y estados financieros para pequeñas y medianas empresas.');
    await page.fill('#serviceImage', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f');

    // Enviamos el formulario
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();

    // Verificamos la aparición del modal
    const modalContainer = page.locator('div.fixed');
    await expect(modalContainer).toBeVisible();
    
    // Verificamos el overlay de fondo y desenfoque
    await expect(modalContainer).toHaveClass(/bg-gray-900\/30/);
    await expect(modalContainer).toHaveClass(/backdrop-blur-sm/);
    
    // Verificamos que esté centrado (Flexbox items-center justify-center)
    await expect(modalContainer).toHaveClass(/flex/);
    await expect(modalContainer).toHaveClass(/items-center/);
    await expect(modalContainer).toHaveClass(/justify-center/);

    // Captura de pantalla del modal visible (estado de éxito)
    await expect(page).toHaveScreenshot('create-service-success-modal.png');
  });

  // UX: Cierre del modal - Botón de Aceptar
  test('al hacer clic en el botón Aceptar del modal de éxito, este debe cerrarse y desaparecer del DOM', async ({ page }) => {
    // Rellenamos y enviamos
    await page.fill('#serviceName', 'Asesoría Tributaria');
    await page.selectOption('#categoryName', 'finanzas');
    await page.fill('#serviceDescription', 'Asesoría tributaria.');
    await page.fill('#serviceImage', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f');
    await page.locator('button[type="submit"]').click();

    const modalContainer = page.locator('div.fixed');
    await expect(modalContainer).toBeVisible();

    // Hacemos clic en el botón Aceptar dentro del modal
    const acceptBtn = modalContainer.locator('button:has-text("Aceptar")');
    await acceptBtn.click();

    // El modal debe desaparecer del DOM
    await expect(modalContainer).not.toBeAttached();
  });

  // UX: Cierre del modal - Clic fuera del modal (Overlay Backdrop)
  test('al hacer clic en el fondo difuminado (fuera del modal), este debe cerrarse correctamente', async ({ page }) => {
    // Rellenamos y enviamos
    await page.fill('#serviceName', 'Asesoría Tributaria');
    await page.selectOption('#categoryName', 'finanzas');
    await page.fill('#serviceDescription', 'Asesoría tributaria.');
    await page.fill('#serviceImage', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f');
    await page.locator('button[type="submit"]').click();

    const modalContainer = page.locator('div.fixed');
    await expect(modalContainer).toBeVisible();

    // Hacemos clic directamente en el contenedor del overlay (.fixed)
    // Usamos force: true ya que Playwright podría pensar que el modal interno obstruye el clic directo.
    // O hacemos clic cerca de la esquina superior izquierda de la pantalla
    await page.mouse.click(10, 10);

    // El modal debe desaparecer del DOM
    await expect(modalContainer).not.toBeAttached();
  });
});
