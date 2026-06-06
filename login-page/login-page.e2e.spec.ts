import { test, expect } from '@playwright/test';

test.describe('LoginPage - Pruebas E2E Visuales y UX/UI', () => {
  
  test.beforeEach(async ({ page }) => {
    // Se asume que la aplicación está corriendo localmente
    await page.goto('/login');
  });

  // UI: Captura de pantalla para regresión visual básica
  test('debe tomar screenshot del componente renderizado para visual regression baseline', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveScreenshot('login-page-desktop.png');
  });

  // UI: Layout y alineación del contenedor en pantalla completa
  test('el formulario de login debe estar centrado vertical y horizontalmente en la pantalla', async ({ page }) => {
    const main = page.locator('main');
    const formContainer = page.locator('main > div');
    
    // Verificamos que el main use Flexbox para centrar
    await expect(main).toHaveClass(/flex/);
    await expect(main).toHaveClass(/items-center/);
    await expect(main).toHaveClass(/justify-center/);
    
    // El contenedor debe ser visible y tener la clase de ancho máximo
    await expect(formContainer).toBeVisible();
    await expect(formContainer).toHaveClass(/max-w-md/);
  });

  // UI: Estilos visuales de inputs (bordes visibles)
  test('los inputs de email y password deben tener un borde visible inicial', async ({ page }) => {
    const emailInput = page.locator('#email');
    const passwordInput = page.locator('#password');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Verificamos la clase de borde gris claro
    await expect(emailInput).toHaveClass(/border-gray-200/);
    await expect(passwordInput).toHaveClass(/border-gray-200/);
  });

  // UI: Ancho completo en botón de acción (Botón Primario)
  test('el botón de submit debe ocupar el ancho completo del formulario', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    
    await expect(submitBtn).toBeVisible();
    // Verificamos que tenga la clase de ancho completo
    await expect(submitBtn).toHaveClass(/w-full/);
    
    // Opcionalmente verificamos el comportamiento en el modelo de caja (box model)
    const boundingBox = await submitBtn.boundingBox();
    const formBox = await page.locator('form').boundingBox();
    if (boundingBox && formBox) {
      // El botón debe ocupar prácticamente todo el ancho disponible del formulario (dentro de márgenes/paddings)
      expect(boundingBox.width).toBeGreaterThanOrEqual(formBox.width - 20);
    }
  });

  // UX: Estado interactivo - Hover en botón de acción principal
  test('al hacer hover sobre el botón, la clase de hover adecuada debe estar definida en el elemento', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    
    // Verificamos que la clase hover:bg-blue-800 esté definida en el DOM
    await expect(submitBtn).toHaveClass(/hover:bg-blue-800/);
    
    // Simulamos la interacción física de hover con Playwright
    await submitBtn.hover();
  });

  // UI: Enlaces secundarios visibles y accesibles
  test('el enlace de registro debe estar visible y ubicado debajo del formulario', async ({ page }) => {
    const signUpLink = page.locator('a[routerLink="/sign-up"], a:has-text("Regístrate")');
    await expect(signUpLink).toBeVisible();

    const form = page.locator('form');
    
    const signUpBox = await signUpLink.boundingBox();
    const formBox = await form.boundingBox();
    
    if (signUpBox && formBox) {
      // El link debe estar físicamente por debajo de la base del formulario
      expect(signUpBox.y).toBeGreaterThan(formBox.y + formBox.height);
    }
  });
});
