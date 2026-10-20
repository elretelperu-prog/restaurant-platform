# Informe inicial para Astra — rellenar antes de programar

## Evidencia del repositorio
- Commit V56 realmente analizado:
- Commit rama R3F realmente analizado:
- Comandos ejecutados y su salida:
- Estado de compilación y pruebas (no ejecutadas / OK / fallos):
- Navegadores y dispositivos realmente utilizados:

## Matriz por requisito
| ID | Requisito | Estado (OK/parcial/roto/no implementado/no probado) | Evidencia | Riesgo | Archivo/Línea |
|---|---|---|---|---|---|
| A1 | carga y páginas visibles | | | | |
| A2 | 20 giros | | | | |
| A3 | pliegue y reverso | | | | |
| A4 | 10 platos/página | | | | |
| A5 | zoom/pan/selección/giro | | | | |
| A6 | comensales y pedidos | | | | |
| A7 | dos temas y móvil | | | | |
| A8 | build + tests | | | | |

## Decisiones a justificar
1. ¿Conservar PageFlip? Ventajas/inconvenientes/evidencias.
2. ¿Reconstruir solo el motor 3D con R3F? Costes/riesgos/evidencias.
3. ¿Híbrido HTML cuando está quieto + 3D durante giro? Costes de sincronización y accesibilidad.
4. ¿Cómo separar menú, UI y pedidos por cliente y por restaurante?
5. ¿Cómo impedir regresiones antes del siguiente despliegue?
6. Riesgos del uso de versiones `latest`, CSS acumulado, múltiples controladores táctiles.

## Plan de pruebas
- Test mínimo en portátil, iPhone Safari y Android Chrome.
- Tareas en orden, dependencias, qué NO tocar, umbral para revertir.
- Captura/video/screenshot y mediciones recogidas realmente (no inventadas).

## Puerta de aprobación
**No cambiar código de producción, no hacer merge ni redeploy sin la decisión del usuario.**
