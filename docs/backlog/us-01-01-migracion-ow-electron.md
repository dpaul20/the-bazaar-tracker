# US 1.1 — Migrar proyecto a Overwolf-Electron

## Contexto

Migrar el scaffold actual (Electron Forge + Vite + TS) a **@overwolf/ow-electron** sin romper scripts ni tipados. Se habilitará el paquete `overlay` para futuras ventanas in-game y se preparará el entorno para servicios (captura/OCR) en sprints siguientes.

## Descripción

Como desarrollador quiero convertir el proyecto Electron actual en una aplicación ow-electron para tener acceso a las APIs de Overwolf y poder distribuir la app.

## Tareas Técnicas

1. Desinstalar `electron` e instalar paquetes ow-electron
2. Modificar `package.json` (productName, author, `overwolf.packages=["overlay"]`)
3. Actualizar `main.ts` para usar tipos de ow-electron
4. Configurar `forge` con `@overwolf/ow-electron-builder`

## Definition of Done

- [ ] npm run start sin errores
- [ ] Console muestra App ID
- [ ] Ventana principal visible
- [ ] Sin warnings de TypeScript
- [ ] README actualizado

## Métricas

- Tiempo de inicio: < 2s
- Errores de TypeScript: 0
- Build y start exitosos

## Referencias

- Epic 01: ../epics/epic-01-setup-overwolf-electron.md
- Issue: #38
