# Plan de Trabajo Scrum – Overwolf Advisor para *The Bazaar*

## 🧭 Visión del Producto

Crear una aplicación para Overwolf que detecte cartas visibles durante una partida de *The Bazaar* y recomiende, en tiempo real, las mejores opciones basadas en sinergias y estadísticas.

---

## 🗺️ Roadmap General

1. Investigación del juego y APIs
2. MVP técnico (OCR + captura)
3. Motor de sinergias
4. Overlay UI
5. Integración completa
6. Optimización
7. Lanzamiento

---

## 🧩 Épicas y User Stories (US)

### **ÉPICA 1 — Configuración y Setup del Proyecto Overwolf-Electron**

**Objetivo:** Migrar el proyecto Electron actual a Overwolf-Electron, estableciendo la arquitectura base con soporte para overlays, captura de pantalla y estructura modular.

**Contexto Técnico:**
- Framework: **@overwolf/ow-electron** (basado en Electron.js oficial)
- Sample de referencia: [ow-electron-packages-sample](https://github.com/overwolf/ow-electron-packages-sample)
- Paquetes OW necesarios: `overlay` (ventanas in-game) + configuración manual de captura
- **⚠️ The Bazaar NO tiene soporte GEP** (Game Events Provider), por lo que NO podemos usar eventos nativos del juego
- Captura: Usaremos `desktopCapturer` de Electron para screenshots manuales

**Alcance:**
- Migrar de `electron` vanilla a `@overwolf/ow-electron`
- Configurar `package.json` con campos Overwolf (`overwolf.packages`, `productName`, `author.name`)
- Establecer arquitectura de 3 capas: Main Process, Renderer, Overwolf Services
- Configurar builds con `@overwolf/ow-electron-builder`
- Implementar captura de pantalla con `desktopCapturer`
- Tiempo de carga objetivo: **< 2 segundos**

**Definición de Éxito:**
- ✅ App arranca sin errores con ow-electron runtime
- ✅ Unique App ID generado y recuperable vía `process.env.OVERWOLF_APP_UID`
- ✅ Ventana principal funcional (desktop window)
- ✅ Sistema de captura de pantalla operativo
- ✅ Estructura de carpetas modular creada (`/src/main`, `/src/renderer`, `/src/services`)
- ✅ Scripts de build y dev funcionando (`npm run build`, `npm run start`)

**Enlaces canónicos:**

- [Documento de refinamiento (ÉPICA 1)](./EPIC1_REFINEMENT.md)
- [Epic #1](https://github.com/dpaul20/the-bazaar-tracker/issues/1)
- [US 1.1 – #38](https://github.com/dpaul20/the-bazaar-tracker/issues/38)
- [US 1.2 – #35](https://github.com/dpaul20/the-bazaar-tracker/issues/35)
- [US 1.3 – #36](https://github.com/dpaul20/the-bazaar-tracker/issues/36)
- [US 1.4 – #37](https://github.com/dpaul20/the-bazaar-tracker/issues/37)

#### **User Stories Refinadas**

**US 1.1 – Migrar proyecto a Overwolf-Electron**

**Como** desarrollador  
**Quiero** convertir el proyecto Electron actual en una aplicación ow-electron  
**Para** tener acceso a las APIs de Overwolf y poder distribuir la app vía Overwolf

**Detalle:**
- Instalar dependencias: `@overwolf/ow-electron`, `@overwolf/ow-electron-builder`, `@overwolf/electron-is-overwolf`
- Modificar `package.json`:
  - Cambiar `electron` por `@overwolf/ow-electron` en devDependencies
  - Agregar campos: `productName: "The Bazaar Tracker"`, `author.name: "Deivy Gutierrez"`
  - Agregar configuración: `overwolf: { packages: ["overlay"] }`
- Actualizar imports en `main.ts` para usar tipos de ow-electron
- Configurar electron-forge para usar ow-electron-builder

**Criterios de Aceptación:**
- [ ] Dependencias ow-electron instaladas y funcionando
- [ ] `npm run start` arranca la app con ow-electron runtime
- [ ] `console.log(process.env.OVERWOLF_APP_UID)` muestra el ID único de la app
- [ ] No hay errores de tipos TypeScript relacionados con ow-electron

**Estimación:** 3 Story Points  
**Prioridad:** P0 (Crítica)

---

**US 1.2 – Implementar sistema de captura de pantalla**

**Como** sistema OCR  
**Quiero** capturar screenshots del juego en intervalos configurables  
**Para** poder procesar las imágenes y detectar cartas

**Detalle:**
- Crear módulo `ScreenCaptureService` en `/src/services/screen-capture.service.ts`
- Usar `desktopCapturer.getSources()` de Electron para obtener ventanas/pantallas
- Implementar filtro para detectar ventana de "The Bazaar" por título
- Configurar captura cada 2-5 segundos (ajustable)
- Guardar capturas temporalmente en memoria (Buffer) para procesamiento
- Agregar logs con timestamp de cada captura

**Criterios de Aceptación:**
- [ ] Servicio puede listar todas las ventanas disponibles
- [ ] Detecta automáticamente ventana de The Bazaar cuando está abierto
- [ ] Captura screenshot completo de la ventana del juego
- [ ] Performance: captura completa en < 200ms
- [ ] Logs muestran: timestamp, tamaño de imagen, ventana capturada
- [ ] Capturas se almacenan en Buffer sin saturar RAM (máx 3 últimas)

**Estimación:** 5 Story Points  
**Prioridad:** P0 (Crítica)

---

**US 1.3 – Estructurar arquitectura modular del proyecto**

**Como** desarrollador  
**Quiero** una estructura de carpetas clara y escalable  
**Para** facilitar el desarrollo de módulos OCR, BD, Recs y UI

**Detalle:**
- Crear estructura de carpetas:
  ```
  src/
    ├── main/               # Main process (Node.js)
    │   ├── main.ts
    │   └── ipc-handlers.ts
    ├── renderer/           # Renderer process (UI)
    │   ├── renderer.ts
    │   ├── index.html
    │   └── styles/
    ├── services/           # Servicios compartidos
    │   ├── screen-capture.service.ts
    │   ├── ocr.service.ts      [placeholder]
    │   ├── database.service.ts [placeholder]
    │   └── recommendation.service.ts [placeholder]
    ├── models/             # Tipos TypeScript
    │   ├── Card.ts
    │   └── Recommendation.ts
    └── utils/              # Utilidades
        └── logger.ts
  ```
- Configurar path aliases en `tsconfig.json` (`@services`, `@models`, `@utils`)
- Crear archivos placeholder con interfaces básicas

**Criterios de Aceptación:**
- [ ] Estructura de carpetas creada según diseño
- [ ] Path aliases funcionando (`import { ScreenCaptureService } from '@services/screen-capture.service'`)
- [ ] Archivos placeholder tienen interfaces TypeScript básicas
- [ ] Logger utility implementado con niveles (debug, info, warn, error)
- [ ] README.md actualizado con explicación de la estructura

**Estimación:** 2 Story Points  
**Prioridad:** P1 (Alta)

---

**US 1.4 – Asegurar inicio rápido sin errores**

**Como** usuario  
**Quiero** que la aplicación cargue rápidamente al iniciar  
**Para** no interrumpir mi experiencia de juego

**Detalle:**
- Medir tiempo de carga desde `app.on('ready')` hasta ventana visible
- Optimizar imports (lazy loading de módulos pesados)
- Implementar splash screen simple mientras carga
- Agregar error boundaries para capturar crashes
- Configurar electron-squirrel-startup correctamente

**Criterios de Aceptación:**
- [ ] Tiempo de carga < 2 segundos (medido con `console.time`)
- [ ] Splash screen se muestra inmediatamente
- [ ] No hay errores en consola al iniciar
- [ ] App no crashea si falta alguna dependencia opcional
- [ ] Logs de inicio muestran: versión app, runtime (ow-electron vs electron), tiempo de carga

**Estimación:** 2 Story Points  
**Prioridad:** P1 (Alta)

---

### **ÉPICA 2 — Sistema de Captura (OCR / Computer Vision)**

Permitir reconocer cartas automáticamente desde la pantalla del juego.

#### **User Stories**

- **US 2.1:** Como usuario, quiero que la app capture automáticamente la pantalla para detectar cartas sin intervención manual.
- **US 2.2:** Como modelo OCR, quiero recibir imágenes ya recortadas del área de cartas para mejorar precisión.
- **US 2.3:** Como usuario, quiero que la detección sea rápida para no interferir con el flujo de la partida.
- **US 2.4:** Como técnico, quiero logs de detección para diagnosticar errores y mejorar modelos.

---

### **ÉPICA 3 — Base de Datos de Cartas**

Administrar y estructurar los datos de todas las cartas con sus sinergias.

#### **User Stories**

- **US 3.1:** Como PO, quiero una base de datos editable para actualizar cartas fácilmente.
- **US 3.2:** Como recomendador, quiero etiquetas de sinergia para calcular combos.
- **US 3.3:** Como motor, quiero valores base de cada carta para evaluar sus puntuaciones.

---

### **ÉPICA 4 — Motor de Recomendación**

Algoritmo que determine las mejores cartas según la situación del jugador.

#### **User Stories**

- **US 4.1:** Como jugador, quiero recibir una lista ordenada de las mejores cartas disponibles.
- **US 4.2:** Como usuario, quiero ver una explicación simple de por qué una carta es recomendada.
- **US 4.3:** Como sistema, quiero calcular sinergias entre cartas ya elegidas y nuevas opciones.
- **US 4.4:** Como desarrollador, quiero exponer un endpoint interno para obtener recomendaciones.

---

### **ÉPICA 5 — UI/UX Overlay**

Diseñar un overlay claro, liviano y no intrusivo dentro de Overwolf.

#### **User Stories**

- **US 5.1:** Como jugador, quiero un panel compacto con recomendaciones para no tapar el juego.
- **US 5.2:** Como usuario, quiero mover libremente la ventana en pantalla.
- **US 5.3:** Como usuario, quiero minimizar el overlay cuando lo desee.
- **US 5.4:** Como usuario, quiero una sección de configuración simple.

---

### **ÉPICA 6 — Integración Completa**

Unir todos los módulos para que las recomendaciones aparezcan automáticamente.

#### **User Stories**

- **US 6.1:** Como usuario, quiero que la app detecte cartas y muestre recomendaciones sin intervención manual.
- **US 6.2:** Como tester, quiero logs integrados para validar cada etapa del pipeline.
- **US 6.3:** Como sistema, quiero refrescar sugerencias en tiempo real.

---

### **ÉPICA 7 — QA, Optimización y Publicación**

Pulir la aplicación, asegurar estabilidad y publicarla en Overwolf Store.

#### **User Stories**

- **US 7.1:** Como QA, quiero realizar pruebas manuales y automatizadas para asegurar estabilidad.
- **US 7.2:** Como usuario, quiero que la app use pocos recursos para no afectar FPS.
- **US 7.3:** Como desarrollador, quiero generar un build listo para enviar a Overwolf.
- **US 7.4:** Como PO, quiero publicar la app para que los jugadores puedan usarla.

---

## 📏 Definition of Done (DoD)

- Código funcional y testeado
- Sin errores visibles
- UI estable
- Documentado
- Integrado en main branch
- Aprobado por el Product Owner
- Funcionando dentro del runtime de Overwolf

---

## 📌 Detalle de User Stories y Criterios de Aceptación

### ÉPICA 1 – Configuración y Setup

#### US 1.1 – Crear proyecto base Overwolf

**Detalle:** Estructurar proyecto, carpetas, scripts y configuración inicial.
**Criterios de aceptación:**

- Proyecto Overwolf creado.
- Carpeta `/src` y `/assets` definidas.
- App carga sin errores.

#### US 1.2 – Configurar manifest y ventanas

**Detalle:** Definir ventanas overlay/background y permisos.
**Criterios de aceptación:**

- Manifest válido.
- Ventana overlay visible.
- Ventana background ejecutándose en segundo plano.

#### US 1.3 – Inicio sin errores

**Detalle:** Asegurar que la app inicia sin delays.
**Criterios de aceptación:**

- Tiempo de carga < 2s.
- Logs sin errores de inicio.

### ÉPICA 2 – OCR / Captura

#### US 2.1 – Captura automática

**Detalle:** Captura la pantalla cuando aparecen cartas.
**Criterios de aceptación:**

- Capturas periódicas configurables.
- No afecta rendimiento.

#### US 2.2 – Recorte automático de regiones

**Detalle:** Detectar área de cartas.
**Criterios de aceptación:**

- ROI se recorta sin intervención manual.
- OCR recibe imágenes optimizadas.

#### US 2.3 – Detección rápida

**Detalle:** OCR en < 1s.
**Criterios de aceptación:**

- Rendimiento medido y validado.

#### US 2.4 – Logs de detección

**Detalle:** Registrar pasos del OCR.
**Criterios de aceptación:**

- Logs muestran captura, recorte y resultado.

### ÉPICA 3 – Base de Datos

#### US 3.1 – BD editable

**Detalle:** JSON/DB externo actualizable.
**Criterios de aceptación:**

- BD carga dinámicamente.
- Validación de formato.

#### US 3.2 – Etiquetas de sinergia

**Detalle:** Clasificación de cartas.
**Criterios de aceptación:**

- Cada carta tiene 1–N etiquetas.
- Motor de sinergia las reconoce.

#### US 3.3 – Valores base

**Detalle:** Atributos para ranking.
**Criterios de aceptación:**

- Todas las cartas tienen puntajes y stats.

### ÉPICA 4 – Motor de Recomendación

#### US 4.1 – Lista ordenada

**Detalle:** Sistema devuelve top N cartas.
**Criterios de aceptación:**

- Ordenamiento por score.
- Score reproducible.

#### US 4.2 – Explicación simple

**Detalle:** Mostrar razones de recomendación.
**Criterios de aceptación:**

- UI muestra texto "Synergy: X + Y".

#### US 4.3 – Cálculo de sinergias

**Detalle:** Matching entre mazo actual y opciones.
**Criterios de aceptación:**

- Sinergias aumentan score.

#### US 4.4 – Endpoint interno

**Detalle:** API JS interna para UI.
**Criterios de aceptación:**

- UI puede llamar `getRecommendations()`.

### ÉPICA 5 – UI Overlay

#### US 5.1 – Panel compacto

**Detalle:** UI minimalista.
**Criterios de aceptación:**

- Ocupa < 15% pantalla.

#### US 5.2 – Mover ventana

**Detalle:** Drag & drop.
**Criterios de aceptación:**

- Ventana arrastrable.

#### US 5.3 – Minimizar

**Detalle:** Botón contraer.
**Criterios de aceptación:**

- Estado colapsado/expandido.

#### US 5.4 – Configuración

**Detalle:** Panel de ajustes.
**Criterios de aceptación:**

- Cambios se guardan localmente.

### ÉPICA 6 – Integración

#### US 6.1 – Pipeline completo

**Detalle:** OCR → BD → Recs → UI.
**Criterios de aceptación:**

- Detección y recomendación automáticas.

#### US 6.2 – Logs integrados

**Detalle:** Logs por etapa.
**Criterios de aceptación:**

- Log unificado.

#### US 6.3 – Refresco en tiempo real

**Detalle:** Actualizar recomendaciones.
**Criterios de aceptación:**

- UI se actualiza sin recargar.

### ÉPICA 7 – QA y Publicación

#### US 7.1 – Pruebas

**Detalle:** Testing manual y técnico.
**Criterios de aceptación:**

- Checklist QA aprobada.

#### US 7.2 – Optimización

**Detalle:** Reducir uso de CPU/GPU.
**Criterios de aceptación:**

- App < 5% CPU en idle.

#### US 7.3 – Build final

**Detalle:** Generar paquete Overwolf.
**Criterios de aceptación:**

- Build firmado y verificado.

#### US 7.4 – Publicación

**Detalle:** Envío a Overwolf.
**Criterios de aceptación:**

- Paquete aprobado.

---

## 📌 Notas

- Este documento puede extenderse con criterios de aceptación e integración continua.
- Sugerido usar sprints de 2 semanas.
