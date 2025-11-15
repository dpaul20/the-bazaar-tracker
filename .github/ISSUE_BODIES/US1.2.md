Tareas Técnicas:
1. Crear `src/services/screen-capture.service.ts` con desktopCapturer
2. Detectar ventana "The Bazaar" por título y capturar cada 3s
3. IPC handler `get-last-screenshot` para pruebas desde renderer
4. Limitar a 3 capturas en memoria y loguear timestamps

Definition of Done:
- [ ] Lista ventanas disponibles
- [ ] Detecta automáticamente "The Bazaar"
- [ ] Captura < 200ms por screenshot (medido)
- [ ] Logs con timestamp, tamaño buffer, nombre ventana
- [ ] Máximo 3 buffers en RAM

Documento de referencia: EPIC1_REFINEMENT.md
