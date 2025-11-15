# US 1.1 — Migrar proyecto a Overwolf-Electron

## Contexto

Migrar el scaffold actual (Electron Forge + Vite + TS) a **@overwolf/ow-electron** sin romper scripts ni tipados. Se habilitará el paquete `overlay` para futuras ventanas in-game y se preparará el entorno para servicios (captura/OCR) en sprints siguientes.

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

- Tiempo de inicio (informativo): < 2s
- Errores de TypeScript: 0
- `npm run build` y `npm run start` exitosos

## Referencias

- ../../EPIC1_REFINEMENT.md
- [Epic #1](https://github.com/dpaul20/the-bazaar-tracker/issues/1)
- [US 1.1 – #38](https://github.com/dpaul20/the-bazaar-tracker/issues/38)
