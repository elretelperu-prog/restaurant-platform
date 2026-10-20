# Especificación maestra y traspaso a Astra — Restaurant QR Platform
**Fecha:** 2026-10-20 | **Estado:** requisitos consolidados de conversaciones previas; pendientes de auditoría y pruebas.

## 0. Mandato inicial
Antes de modificar código, audita ambas ramas y entrega un diagnóstico reproducible, matriz de conservación/reconstrucción, arquitectura propuesta y plan de pruebas. No fusionar ni desplegar sin aprobación del propietario. No afirmar que algo funciona sin ejecutarlo y verificarlo.

## 1. Referencias exactas
- Repositorio: `elretelperu-prog/restaurant-platform`.
- Checkpoint funcional V56: commit `8fefb0c447ce31ed41fdb22295fb1a9d60902672` (2026-09-30).
- Rama funcional: `preview-physical-menu-2026-09-29`; respaldo: `backup/functional-menu-v56-2026-09-30`.
- Rama de evaluación: `migration/astra-audit-2026-10-20` (creada desde V56).
- Experimento 3D: `preview-r3f-book-prototype`.
- Sitio de referencia funcional (verificar estado actual): https://restaurant-platform-seven.vercel.app/
- Experimento (verificar estado actual): https://restaurant-platform-git-preview-r3f-book-prototype-elretel.vercel.app/book3d-prototype
- No asumir que las ramas ni demos desplegadas hoy reflejan automáticamente los mismos commits. Comprobar commit/despliegue.
- El prototipo 3D anterior tenía riesgo de desaparición/colapso de la hoja. No reemplazar V56 por él de forma automática.

## 2. Objetivo de producto
SaaS multi-restaurante: comensales escanean el QR permanente de la mesa y abren la web-app sin instalar nada. Un restaurante puede configurar nombre, logo, cartas, idiomas, monedas, mesas/QR y elegir plantillas (libro clásico/minimalista o futurista). En la primera fase se busca DEMO móvil convincente y estable; no fingir que hay backend de producción, cobros reales ni sincronización que aún no existan.

## 3. Comportamientos obligatorios en prototipo
### 3.1 Carta-libro
- Móvil en vertical; libro visible como DOS páginas físicas simultáneas; aproximadamente 80% de pantalla como referencia visual, con márgenes legibles y responsividad real iPhone/Android.
- Dataset demo: 4 páginas, 10 platos por página, con fotos/miniaturas, nombres, descripción y precios. Mantener texto correctamente orientado, nunca reflejado o invertido durante el giro.
- El gesto debe permitir agarrar esquina de página, preferentemente inferior (revisar y documentar la decisión final de posición), arrastrar LENTAMENTE y controlar el progreso de un giro continuo con curvatura/pliegue visible y reverso coherente. No aceptar simple transición 2D como equivalente físico si no reproduce requisitos.
- El indicador/hint de esquina se muestra discreto y no interrumpe interacción: referencia histórica, hint a los ~3 s una sola vez (verificar comportamiento aprobado).
- Durante el giro: ninguna hoja desaparece, colapsa, cambia abruptamente escala, invierte textos o tapa arbitrariamente controles.
- Zoom con gesto de pinza y desplazamiento dentro de límites: NO cambiar de página accidentalmente. Selección de fila completa operativa en vista normal y zoom.
- Comportamiento coherente al pasar de página 1-2 a 3-4 y retroceder; sin páginas en blanco inesperadas.

### 3.2 Pedido
- Pulsar cualquier parte de la fila selecciona el plato sin botón “Seleccionar”.
- Selección abre ficha/interfaz contextual para cantidad, nombre/apellido del cliente, añadir al pedido, cancelar/cerrar.
- Nombre y apellido se validan y recuerdan durante la sesión de demostración; no introducir persistencia de datos personales sin decisión expresa.
- “Mi pedido”: listado, edición de cantidades, eliminación, contador, importes y notas si la versión aprobada los soporta.
- La experiencia futurista usa círculo/hilos conectados visualmente; diferenciación estética no debe alterar consistencia funcional ni accesibilidad.

### 3.3 Extensibilidad multi-tenant futura
- Separar contenido (catálogo/precios/monedas), diseño (plantilla), lógica de pedidos y motor gráfico.
- Preparar, NO simular implementación terminada, de administración restaurante, carga de menú/fotos, editor visual, extracción IA, variantes, extras, alérgenos, traducciones, agotados, mesas/QR permanentes, perfiles del personal, cocina/caja en tiempo real, dividir cuenta, pedir camarero/factura, integración API, analítica, resiliencia/offline y pagos reales.
- No almacenar datos de tarjeta directamente; futura pasarela regulada.

## 4. Tecnología observada (no confundir con arquitectura final)
- V56 `package.json`: React, React DOM, Vite y `page-flip@2.0.7`; dependencias marcadas `latest` (riesgo de compilaciones no reproducibles).
- V56 `src/App.jsx` mantiene estado de pedido, identidad del comensal y lógica UI en un componente extenso. `src/components/MenuBook.jsx` mezcla `PageFlip`, gestos, zoom/pan, tiempos y eventos.
- Estilos `src/styles/menu.css` con muchas reglas acumuladas/versionadas: revisar precedencia, `!important`, tamaños y reglas obsoletas.
- Rama 3D añade `@react-three/fiber` y `three`; verificar su implementación y versión antes de proponer migración.
- Aún NO se ha hecho un ensayo automatizado completo ni auditoría reproducible del repositorio en este traspaso.

## 5. Cuestiones técnicas que Astra debe resolver explícitamente
1. Geometría: evaluar PageFlip 2D frente a malla deformable WebGL/R3F con coordenadas UV, caras anverso/reverso, normales, sombreado, giro y pliegue desde esquina.
2. Interacción: mapeo `pointer/touch -> hit testing -> elementos del plato`; prioridad entre pinza, pan, selección y giro. Captura de punteros y límites.
3. Texto y nitidez: DOM vivo vs textura HTML/canvas vs híbrido DOM estático + 3D en transición; sincronización de coordenadas y accesibilidad.
4. Rendimiento: medir en iPhone Safari y Android Chrome reales; presupuestos de fps y memoria definidos con datos; evitar doble render o texturas caras innecesarias.
5. Diseño móvil: dos páginas visibles y diez filas legibles a la vez es un compromiso difícil; cuantificar tamaño mínimo efectivo del texto y diseñar zoom accesible.
6. Estado de negocio: separar selección por identificador estable de plato y comensal; evitar agrupar pedidos de comensales diferentes por nombre de plato.
7. Fiabilidad: evitar regresiones con unitarias, integración, pruebas táctiles y screenshots comparativas.
8. Seguridad/operación: no añadir secretos al repositorio, no desplegar producción ni fusionar a `main` en esta fase.

## 6. Criterios de aceptación medibles
- A1: carga sin errores de consola en móvil y escritorio de prueba; mantener página inicial 1-2.
- A2: girar adelante/atrás 20 veces sin desaparecer, invertir o cambiar escala de página.
- A3: arrastre parcial sigue el dedo y revierte o completa según gesto; anverso/reverso y texto orientados bien.
- A4: 10 filas visibles en cada página según viewport objetivo; texto usable con zoom.
- A5: pinza + pan no dispara giro; gesto de giro no añade plato; pulsación sobre fila normal y ampliada sí abre plato.
- A6: añadir, modificar, eliminar platos; nombre/apellido; totales coherentes; conservar separación por comensal.
- A7: regresión visual/funcional del modo minimalista y futurista; sesiones Android/iOS.
- A8: `npm ci` (tras disponer de lockfile), `npm run build` y suite de pruebas pasan.
- A9: cambios documentados en commits pequeños, trazabilidad a pruebas y video/screenshot de la ejecución.

## 7. Proceso de decisión
**Paso 1 — solo lectura**: checkout limpio de V56; instalar dependencias en entorno aislado, inspeccionar todo árbol y obtener baseline (capturas/test). Comparar con prototipo R3F y no suponer que es superior.

**Paso 2 — informe**: por cada requisito: funciona / parcial / roto / sin implementar / no comprobado, con ruta exacta, pasos para reproducir, evidencia y severidad. Proponer opciones A conservar PageFlip, B módulo 3D independiente, C híbrido DOM+3D y coste/riesgos.

**Paso 3 — prueba de concepto aislada**: SOLO libro 4 páginas/2 visibles; curva real, gesto lento, caras correctas, controles y zoom. Medir en móviles; no mezclar todavía con toda la plataforma.

**Paso 4 — integración tras aprobación**: conectar menú/pedidos y themes mediante API clara; pruebas de regresión; PR desde rama temporal. Mantener intacta la base V56.

## 8. Reglas de trabajo
- Nunca reemplazar `main`, rama funcional V56, rama backup o demo publicada sin aprobación.
- Trabajar en rama nueva por experimento, commits pequeños, demostración visible y pruebas antes de declarar éxito.
- Preguntar solo cuando una ambigüedad esencial impida validar. En lo demás, documentar suposición y seguir.
- Registrar fallos y por qué ocurrieron; revertir cambios que rompan funcionalidades aprobadas.
- Entregar informe de arquitectura ANTES de programar; no hacer una reescritura masiva de entrada.
- No confundir “probé compilar” con “verifiqué en un móvil real”.

## 9. Primer prompt
Lee este documento y compara la rama de checkpoint V56 con `preview-r3f-book-prototype`. No escribas código todavía. Entrega árbol de componentes, causas probables de regresiones con evidencia, riesgos (incluyendo `latest`, CSS acumulado, gestos y estado de pedidos), tres rutas técnicas comparadas, y una recomendación argumentada con experimentos, métricas y criterios de salida.