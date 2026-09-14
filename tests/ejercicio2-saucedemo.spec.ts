import { test, expect } from '@playwright/test';

test.describe('Ejercicio 2 - Flujo de Compra SauceDemo', () => {
  test('Debe completar el flujo de compra con exito', async ({ page }) => {
    // 1. Iniciar sesión en SauceDemo
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Verificar que se redirige al inventario
    await expect(page).toHaveURL(/.*inventory/);

    // 2. Agregar el producto Sauce Labs Backpack al carrito
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    // Verificar que el botón cambió a "Remove"
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible();

    // Verificar que el badge del carrito muestra 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 3. Navegar al carrito de compras
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart/);

    // Verificar que el producto está en el carrito
    await expect(
      page.locator('.cart_item .inventory_item_name')
    ).toHaveText('Sauce Labs Backpack');

    // 4. Proceder al checkout
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/.*checkout-step-one/);

    // 5. Completar información del checkout con datos ficticios
    await page.locator('#first-name').fill('Juan');
    await page.locator('#last-name').fill('Perez');
    await page.locator('#postal-code').fill('110111');
    await page.locator('#continue').click();

    // Verificar que se muestra el resumen del pedido
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');

    // 6. Finalizar la compra
    await page.locator('#finish').click();

    // 7. Verificar la pantalla final de confirmación
    await expect(page).toHaveURL(/.*checkout-complete/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
  });
});
