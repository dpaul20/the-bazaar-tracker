# US 1.2 — Implementar sistema de captura de pantalla

## Contexto

El juego no tiene GEP; necesitamos capturar ventanas manualmente para alimentar OCR futuro.

## Descripción

Como sistema OCR quiero capturar screenshots del juego en intervalos configurables para procesar las imágenes y detectar cartas.

## Tareas Técnicas

1. Crear `ScreenCaptureService`
2. Usar `desktopCapturer.getSources()` y filtrar "The Bazaar"
3. Guardar última(s) capturas en memoria (máx 3)
4. Exponer IPC `get-last-screenshot`
5. Loguear timestamp, tamaño, nombre ventana

## Definition of Done

- [ ] Lista ventanas disponibles
- [ ] Detecta ventana del juego
- [ ] Captura cada 3s
- [ ] < 200ms por captura
- [ ] Máx 3 buffers

## Métricas

- Tiempo captura: < 200ms promedio
- Memoria idle: < 150MB
- Intervalo por defecto: 3s

## Referencias

- Epic 01: ../epics/epic-01-setup-overwolf-electron.md
- Issue: #35
