import { test, expect } from '@playwright/test';

test.describe('Ejercicio 1 - Login Fallido', () => {
  test('Debe mostrar error al ingresar credenciales inválidas', async ({ page }) => {
    // 1. Navegar a la URL de prueba de login
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // 2. Ingresar usuario no registrado
    await page.locator('#username').fill('invalid_user');

    // 3. Ingresar contraseña inválida
    await page.locator('#password').fill('invalid_password123');

    // 4. Hacer clic en el botón de envío
    await page.locator('#submit').click();

    // 5. Verificar que el mensaje de error sea visible
    const errorElement = page.locator('#error');
    await expect(errorElement).toBeVisible();

    // 6. Verificar que el mensaje de error contenga el texto esperado
    await expect(errorElement).toContainText('Your username is invalid!');
  });

  test('Debe mostrar error al ingresar solo usuario sin contraseña', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    await page.locator('#username').fill('student');

    await page.locator('#submit').click();

    const errorElement = page.locator('#error');
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toContainText('Your password is invalid!');
  });
});
