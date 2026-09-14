# Laboratorio de automatizacion: backend

La coleccion `Laboratorio_Automatizacion_Backend.postman_collection.json` contiene exclusivamente las pruebas de API de los tres ejercicios. No incluye pruebas de frontend.

## Ejecucion en Postman

1. Importar el archivo JSON en Postman.
2. Ejecutar las carpetas en orden con Collection Runner.
3. Revisar las aserciones en la pestaña **Test Results**.

Las variables `createdUserId`, `productTitle`, `productPrice` y `createdPostId` se guardan como variables de colección durante la ejecución.

## Ejecucion con Newman

Desde esta carpeta:

```powershell
npx newman run .\Laboratorio_Automatizacion_Backend.postman_collection.json
```

## Nota sobre Reqres

El endpoint público `POST /api/login` de Reqres devuelve actualmente el mensaje `Missing password` cuando falta la contraseña. El test acepta ese mensaje y `Contraseña Vacía`, que es la traducción indicada en el enunciado, manteniendo la validación del error HTTP `400`.

## Guia frontend con Playwright

Esta sección describe la parte frontend del laboratorio. Las pruebas de Playwright deben mantenerse separadas de la colección de Postman.

### Preparar el proyecto

Desde la carpeta raíz del proyecto, ejecutar:

```powershell
npm init playwright@latest
```

Seleccionar TypeScript, usar `tests` como carpeta de pruebas e instalar los navegadores cuando el asistente lo solicite. Una estructura recomendada es:

```text
tests/
	login-invalido.spec.ts
	compra-saucedemo.spec.ts
	webtables.spec.ts
playwright.config.ts
package.json
```

### Ejercicio 1: login inválido

Página: `https://practicetestautomation.com/practice-test-login/`

La prueba debe ingresar un usuario y una contraseña inválidos, pulsar **Submit** y verificar que `#error` sea visible y contenga `invalid`.

```typescript
import { test, expect } from '@playwright/test';

test('muestra error con credenciales invalidas', async ({ page }) => {
	await page.goto('https://practicetestautomation.com/practice-test-login/');
	await page.locator('#username').fill('usuario_invalido');
	await page.locator('#password').fill('clave_invalida');
	await page.locator('#submit').click();

	await expect(page.locator('#error')).toBeVisible();
	await expect(page.locator('#error')).toContainText('invalid');
});
```

### Ejercicio 2: compra en SauceDemo

Página: `https://www.saucedemo.com`

Usar `standard_user` y `secret_sauce`, agregar la mochila, completar el checkout y validar `Thank you for your order!`.

```typescript
test('completa una compra en SauceDemo', async ({ page }) => {
	await page.goto('https://www.saucedemo.com');
	await page.locator('#user-name').fill('standard_user');
	await page.locator('#password').fill('secret_sauce');
	await page.locator('#login-button').click();

	await page.locator('#add-to-cart-sauce-labs-backpack').click();
	await page.locator('.shopping_cart_link').click();
	await page.getByRole('button', { name: 'Checkout' }).click();

	await page.locator('#first-name').fill('Sara');
	await page.locator('#last-name').fill('Sanchez');
	await page.locator('#postal-code').fill('110111');
	await page.getByRole('button', { name: 'Continue' }).click();
	await page.getByRole('button', { name: 'Finish' }).click();

	await expect(page.locator('.complete-header')).toHaveText(
		'Thank you for your order!'
	);
});
```

El selector correcto actual de la mochila es `#add-to-cart-sauce-labs-backpack`.

### Ejercicio 3: DemoQA Web Tables

Página: `https://demoqa.com/webtables`

Pulsar **Add**, completar todos los campos y comprobar que la nueva fila aparece en la tabla.

```typescript
test('agrega un registro en Web Tables', async ({ page }) => {
	await page.goto('https://demoqa.com/webtables');
	await page.getByRole('button', { name: 'Add' }).click();

	await page.locator('#firstName').fill('Sara');
	await page.locator('#lastName').fill('Sanchez');
	await page.locator('#userEmail').fill('sara@example.com');
	await page.locator('#age').fill('25');
	await page.locator('#salary').fill('3000000');
	await page.locator('#department').fill('QA');
	await page.locator('#submit').click();

	const newRow = page.locator('.rt-tr-group').filter({
		hasText: 'sara@example.com'
	});
	await expect(newRow).toContainText('Sara');
	await expect(newRow).toContainText('Sanchez');
	await expect(newRow).toContainText('QA');
});
```

### Ejecutar las pruebas frontend

```powershell
npx playwright test
npx playwright test --headed
npx playwright show-report
```

Para ejecutar un solo escenario:

```powershell
npx playwright test tests/login-invalido.spec.ts
```

La evidencia frontend debe incluir los archivos `.spec.ts`, la salida de Playwright sin fallos y el reporte HTML o capturas del reporte.