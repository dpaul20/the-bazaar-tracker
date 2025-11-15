# US 1.2 — Implementar sistema de captura de pantalla

## Contexto

Implementar un servicio en el proceso principal que capture la ventana de "The Bazaar" a intervalos fijos usando `desktopCapturer`, exponiendo un handler IPC para pruebas desde renderer y controlando el uso de memoria.

## Tareas Técnicas

1. Crear `src/services/screen-capture.service.ts` con desktopCapturer
2. Detectar ventana "The Bazaar" por título y capturar cada 3s
3. IPC handler `get-last-screenshot` para pruebas desde renderer
4. Limitar a 3 capturas en memoria y loguear timestamps

## Definition of Done

- [ ] Lista ventanas disponibles
- [ ] Detecta automáticamente "The Bazaar"
- [ ] Captura < 200ms por screenshot (medido)
- [ ] Logs con timestamp, tamaño buffer, nombre ventana
- [ ] Máximo 3 buffers en RAM

## Métricas

- Tiempo por captura: < 200ms (promedio de 10 muestras)
- Memoria en idle: < 150MB (aprox.)
- Intervalo de captura por defecto: 3s

## Referencias

- ../../EPIC1_REFINEMENT.md
- [Epic #1](https://github.com/dpaul20/the-bazaar-tracker/issues/1)
- [US 1.2 – #35](https://github.com/dpaul20/the-bazaar-tracker/issues/35)
