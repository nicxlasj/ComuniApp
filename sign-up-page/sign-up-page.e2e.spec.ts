import { test, expect } from '@playwright/test';

test.describe('SignUpPage - Pruebas E2E Visuales y UX/UI', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up');
  });

  // UI: Layout de grilla responsiva (Desktop vs Mobile)
  test('el formulario de 2 columnas para nombre/apellido se renderiza en paralelo en escritorio', async ({ page }) => {
    // Definimos un viewport estándar de escritorio
    await page.setViewportSize({ width: 1280, height: 800 });

    const firstNameContainer = page.locator('div:has(> label[for="firstName"])');
    const lastNameContainer = page.locator('div:has(> label[for="lastName"])');

    const firstNameBox = await firstNameContainer.boundingBox();
    const lastNameBox = await lastNameContainer.boundingBox();

    if (firstNameBox && lastNameBox) {
      // En escritorio, los inputs de Nombre y Apellido deben estar alineados horizontalmente (misma coordenada Y)
      expect(Math.abs(firstNameBox.y - lastNameBox.y)).toBeLessThan(5);
      // El de apellido debe estar a la derecha del de nombre
      expect(lastNameBox.x).toBeGreaterThan(firstNameBox.x);
    }

    // Captura de pantalla para verificar consistencia visual en desktop
    await expect(page).toHaveScreenshot('sign-up-page-desktop.png');
  });

  // UI / Responsividad: Comportamiento en móviles
  test('en viewport móvil (375px de ancho), el grid mantiene la disposición de 2 columnas como está programado', async ({ page }) => {
    // Configuramos el viewport al tamaño móvil solicitado
    await page.setViewportSize({ width: 375, height: 667 });

    const firstNameContainer = page.locator('div:has(> label[for="firstName"])');
    const lastNameContainer = page.locator('div:has(> label[for="lastName"])');

    const firstNameBox = await firstNameContainer.boundingBox();
    const lastNameBox = await lastNameContainer.boundingBox();

    if (firstNameBox && lastNameBox) {
      // Dado que se usa la clase fija 'grid-cols-2' en Tailwind, validamos que sigan estando lado a lado
      expect(Math.abs(firstNameBox.y - lastNameBox.y)).toBeLessThan(5);
    }

    // Captura de pantalla en móvil para control de regresión visual
    await expect(page).toHaveScreenshot('sign-up-page-mobile.png');
  });

  // UX: Accesibilidad - Visibilidad de placeholders
  test('todos los campos del formulario deben tener placeholders descriptivos y visibles', async ({ page }) => {
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const email = page.locator('#email');
    const password = page.locator('#password');
    const confirmPassword = page.locator('#confirmPassword');

    await expect(firstName).toHaveAttribute('placeholder', 'Juan');
    await expect(lastName).toHaveAttribute('placeholder', 'Pérez');
    await expect(email).toHaveAttribute('placeholder', 'juan@example.com');
    await expect(password).toHaveAttribute('placeholder', '••••••••');
    await expect(confirmPassword).toHaveAttribute('placeholder', '••••••••');
  });

  // UI: Consistencia en espaciados y márgenes verticales
  test('el espaciado vertical entre campos (space-y-5) debe ser visualmente uniforme', async ({ page }) => {
    const form = page.locator('form');
    // Verificamos que contenga la clase space-y-5 de Tailwind para espaciado vertical
    await expect(form).toHaveClass(/space-y-5/);

    const emailInput = page.locator('div:has(> label[for="email"])');
    const passwordInput = page.locator('div:has(> label[for="password"])');

    const emailBox = await emailInput.boundingBox();
    const passwordBox = await passwordInput.boundingBox();

    if (emailBox && passwordBox) {
      // El espacio entre campos (coordenada Y de inicio del segundo campo menos final del primero)
      const spacing = passwordBox.y - (emailBox.y + emailBox.height);
      // 'space-y-5' en Tailwind es de 1.25rem (20px). Validamos un aproximado físico
      expect(spacing).toBeGreaterThanOrEqual(15);
      expect(spacing).toBeLessThanOrEqual(25);
    }
  });
});
