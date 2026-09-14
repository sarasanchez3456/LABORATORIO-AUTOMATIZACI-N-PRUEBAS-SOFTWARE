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