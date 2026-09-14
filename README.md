# Laboratorio de Automatizacion de Pruebas de Software

Este repositorio contiene los entregables de automatizacion backend y la guia para implementar las pruebas frontend.

## Backend: Postman

La coleccion [Laboratorio_Automatizacion_Backend.postman_collection.json](postman/Laboratorio_Automatizacion_Backend.postman_collection.json) cubre:

- Creacion de usuarios y login fallido con Reqres.
- Consulta de catalogo y producto con Fake Store API.
- Creacion, actualizacion y eliminacion de posts con JSONPlaceholder.

Para ejecutar la coleccion desde la raiz del proyecto:

```powershell
npx newman run .\postman\Laboratorio_Automatizacion_Backend.postman_collection.json
```

La ejecucion validada contiene 7 peticiones, 14 aserciones y 0 fallos.

## Frontend: Playwright

La parte frontend debe automatizar estos tres escenarios:

1. **Login invalido:** abrir `https://practicetestautomation.com/practice-test-login/`, ingresar credenciales invalidas, pulsar `Submit` y comprobar que `#error` sea visible y contenga `invalid`.
2. **Compra en SauceDemo:** iniciar sesion con `standard_user` y `secret_sauce`, agregar la mochila con `#add-to-cart-sauce-labs-backpack`, completar el checkout y validar `Thank you for your order!`.
3. **DemoQA Web Tables:** abrir `https://demoqa.com/webtables`, pulsar `Add`, completar First Name, Last Name, Email, Age, Salary y Department, y comprobar que la nueva fila aparezca en la tabla.

### Preparacion y ejecucion

```powershell
npm init playwright@latest
npx playwright test
npx playwright show-report
```

## Alcance

La coleccion Postman contiene solamente pruebas backend. Los scripts de Playwright deben agregarse como archivos `.spec.ts` en una carpeta `tests/` cuando se implemente la parte frontend.