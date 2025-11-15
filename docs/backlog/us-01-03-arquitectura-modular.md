# US 1.3 — Estructurar arquitectura modular

## Contexto

Necesitamos una estructura escalable para servicios (captura, OCR, BD, recomendaciones) y separación clara entre main y renderer.

## Descripción

Como desarrollador quiero una estructura de carpetas clara y escalable para facilitar desarrollo de módulos y mantenimiento futuro.

## Tareas Técnicas

1. Crear árbol de carpetas (main, renderer, services, models, utils)
2. Configurar path aliases en `tsconfig.json`
3. Crear placeholders `ocr.service.ts`, `database.service.ts`, `recommendation.service.ts`
4. Implementar `logger.ts` con niveles (debug/info/warn/error)
5. Actualizar README con explicación de estructura

## Definition of Done

- [ ] Estructura creada
- [ ] Path aliases compilan
- [ ] Logger funcional
- [ ] Placeholders presentes
- [ ] README actualizado

## Métricas

- Compilación sin errores
- Imports con aliases funcionando

## Referencias

- Epic 01: ../epics/epic-01-setup-overwolf-electron.md
- Issue: #36
