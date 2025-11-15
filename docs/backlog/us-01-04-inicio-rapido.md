# US 1.4 — Asegurar inicio rápido sin errores

## Contexto

Optimizar tiempo de arranque y robustez para no degradar la experiencia del jugador.

## Descripción

Como usuario quiero que la aplicación cargue rápidamente al iniciar para no interrumpir mi experiencia de juego.

## Tareas Técnicas

1. Medir tiempo de carga (`console.time`/`console.timeEnd`)
2. Implementar splash screen ligero
3. Lazy loading de módulos pesados (OCR, BD)
4. Error boundaries (`uncaughtException`, `render-process-gone`)
5. Logs iniciales con versión y tiempo total

## Definition of Done

- [ ] Startup < 2s (promedio 3 pruebas)
- [ ] Splash aparece inmediatamente
- [ ] Sin errores/warnings en consola
- [ ] Manejo de errores sin crash
- [ ] Logs muestran versión/runtime/tiempo

## Métricas

- Tiempo medio de arranque
- Conteo de errores en startup

## Referencias

- Epic 01: ../epics/epic-01-setup-overwolf-electron.md
- Issue: #37
