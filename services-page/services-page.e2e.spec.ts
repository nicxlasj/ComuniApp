import { test, expect } from '@playwright/test';

test.describe('ServicesPage - Pruebas E2E Visuales y UX/UI', () => {

  test.beforeEach(async ({ page }) => {
    // La página de servicios se asume en la ruta raíz '/'
    await page.goto('/');
  });

  // UI: Ancho completo de elementos estructurales (Navbar)
  test('la barra de navegación debe ocupar todo el ancho disponible de la ventana', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    const navBox = await navbar.boundingBox();
    if (navBox) {
      expect(navBox.width).toBe(1280);
    }
  });

  // UX: Menú desplegable interactivo - Estado inicial (Oculto)
  test('el dropdown de Localidades no debe ser visible al cargar la página inicialmente', async ({ page }) => {
    const dropdown = page.locator('nav ul.absolute:has-text("Gran Granada")');
    await expect(dropdown).not.toBeVisible();
  });

  // UX: Menú desplegable interactivo - Apertura con clic
  test('al hacer clic en el botón de Localidades, el dropdown correspondiente debe aparecer en pantalla', async ({ page }) => {
    const btnLocalidades = page.getByRole('button', { name: 'Localidades' });
    await expect(btnLocalidades).toBeVisible();
    
    await btnLocalidades.click();
    
    const dropdown = page.locator('nav ul.absolute');
    await expect(dropdown).toBeVisible();
    await expect(dropdown.locator('li')).toHaveCount(5); // 5 localidades cargadas
  });

  // UX: Menú desplegable interactivo - Cierre al hacer clic fuera (Evento Blur)
  test('al abrir el dropdown de Localidades y hacer clic en el cuerpo de la página, el dropdown debe cerrarse', async ({ page }) => {
    const btnLocalidades = page.getByRole('button', { name: 'Localidades' });
    
    // Abrimos el dropdown
    await btnLocalidades.click();
    const dropdown = page.locator('nav ul.absolute');
    await expect(dropdown).toBeVisible();

    // Hacemos clic fuera (por ejemplo en el tag main) para provocar el blur del botón
    await page.locator('main').first().click();
    
    // Verificamos que se haya ocultado el dropdown
    await expect(dropdown).not.toBeVisible();
  });

  // UI: Layout de las tarjetas de servicios y consistencia visual
  test('las tarjetas de servicios deben mostrar correctamente imagen, título, tag de categoría y descripción', async ({ page }) => {
    const firstCard = page.locator('main > div > div').first();
    await expect(firstCard).toBeVisible();

    const img = firstCard.locator('img');
    const title = firstCard.locator('h2');
    const categoryTag = firstCard.locator('span.bg-green-600');
    const description = firstCard.locator('p');

    await expect(img).toBeVisible();
    await expect(title).toBeVisible();
    await expect(categoryTag).toBeVisible();
    await expect(description).toBeVisible();
  });

  // UX: Control de calidad de carga de imágenes (Imágenes no rotas)
  test('todas las imágenes de las tarjetas de servicios deben cargarse correctamente', async ({ page }) => {
    const images = page.locator('main img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();

      // Verificamos por medio de evaluación en el navegador si la imagen cargó con éxito
      const isLoaded = await img.evaluate((image: HTMLImageElement) => {
        return image.complete && image.naturalWidth > 0;
      });
      expect(isLoaded).toBeTruthy();
    }
  });

  // UI / Responsividad: Captura de pantalla multiplataforma
  test('debe tomar capturas de pantalla de la página completa en vista de escritorio y móvil', async ({ page }) => {
    // Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 1000 });
    await expect(page).toHaveScreenshot('services-page-desktop.png');

    // Mobile Viewport
    await page.setViewportSize({ width: 375, height: 1200 });
    await expect(page).toHaveScreenshot('services-page-mobile.png');
  });
});
