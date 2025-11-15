# EPIC 01 — Setup Overwolf-Electron

> Documento canónico de la Épica 1. Migración del scaffold Electron a ow-electron y base para captura/OCR.

## Resumen Ejecutivo

Migrar proyecto Electron vanilla a Overwolf-Electron para crear una aplicación de overlay gaming con captura de pantalla y OCR.

## Objetivo

Disponer de un entorno ow-electron estable, con arquitectura modular, soporte de captura de pantalla y tiempos de inicio aceptables.

## Alcance

- Migración dependencias a `@overwolf/ow-electron`
- Configuración de `package.json` y Forge
- Servicio de captura inicial (sin OCR)
- Estructura de carpetas y path aliases
- Medición de tiempo de inicio

### Fuera de Alcance

- OCR completo
- Recomendaciones de cartas
- Persistencia avanzada

## Motivación

El juego The Bazaar no soporta GEP, forzando una estrategia de captura manual y OCR, lo que requiere control de rendimiento y buffers.

## Arquitectura (Resumen)

```
Main Process -> Servicios (ScreenCapture) -> IPC -> Renderer UI
```

## User Stories

| US | Título | Issue | Estado |
|----|--------|-------|--------|
| 1.1 | Migrar proyecto a Overwolf-Electron | #38 | Pending |
| 1.2 | Implementar sistema de captura de pantalla | #35 | Pending |
| 1.3 | Estructurar arquitectura modular | #36 | Pending |
| 1.4 | Asegurar inicio rápido sin errores | #37 | Pending |

## Métricas

| Métrica | Objetivo |
|---------|----------|
| Startup | < 2s |
| Captura screenshot | < 200ms |
| RAM idle | < 150MB |
| US completadas | 4/4 |

## Dependencias

- Electron Forge + Vite
- Node.js + TypeScript

## Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| Alto uso CPU captura | Ajustar intervalos / tamaños |
| Latencia arranque | Lazy loading de módulos |
| Memoria por buffers | Limitar a 3 capturas |

## Referencias

- Epic: #1
- US: #38, #35, #36, #37
- OW Electron Docs: <https://dev.overwolf.com/ow-electron/getting-started/overview>

## Changelog

- v1.0 (2025-11-15): Creación inicial y migración de contenido desde `EPIC1_REFINEMENT.md`.
