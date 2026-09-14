import { test, expect } from '@playwright/test';

test.describe('Ejercicio 3 - Gestión de Web Tables DemoQA', () => {
  test('Debe agregar un nuevo registro a la tabla', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');

    // Abrir formulario Add
    await page.locator('#addNewRecordButton').click();
    await expect(page.locator('.modal-content')).toBeVisible();

    // Diligenciar campos
    await page.locator('#firstName').fill('Carlos');
    await page.locator('#lastName').fill('Garcia');
    await page.locator('#userEmail').fill('carlos.garcia@test.com');
    await page.locator('#age').fill('32');
    await page.locator('#salary').fill('7500');
    await page.locator('#department').fill('Engineering');

    // Enviar formulario
    await page.locator('#submit').click();
    await expect(page.locator('.modal-content')).not.toBeVisible();

    // Verificar fila en la tabla (tbody > tr > td)
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    let rowFound = false;

    for (let i = 0; i < rowCount; i++) {
      const text = await rows.nth(i).textContent();
      if (text?.includes('Carlos') && text?.includes('Garcia')) {
        rowFound = true;
        break;
      }
    }

    expect(rowFound).toBeTruthy();
    await expect(page.locator('td:has-text("carlos.garcia@test.com")')).toBeVisible();
  });

  test('Debe editar un registro existente en la tabla', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');

    // Editar primer registro
    await page.locator('#edit-record-1').click();
    await expect(page.locator('.modal-content')).toBeVisible();

    const firstNameInput = page.locator('#firstName');
    await firstNameInput.clear();
    await firstNameInput.fill('Maria');

    await page.locator('#submit').click();
    await expect(page.locator('.modal-content')).not.toBeVisible();

    // Verificar cambio
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    let rowFound = false;

    for (let i = 0; i < rowCount; i++) {
      const text = await rows.nth(i).textContent();
      if (text?.includes('Maria')) {
        rowFound = true;
        break;
      }
    }

    expect(rowFound).toBeTruthy();
  });

  test('Debe eliminar un registro de la tabla', async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');

    const initialCount = await page.locator('tbody tr').count();

    // Eliminar primer registro
    await page.locator('#delete-record-1').click();
    await page.waitForTimeout(500);

    const finalCount = await page.locator('tbody tr').count();
    expect(finalCount).toBeLessThan(initialCount);
  });
});
