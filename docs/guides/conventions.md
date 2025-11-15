# Convenciones de Documentación

## Estructura de Carpetas

```
docs/
  epics/              # Documentos de épicas
  backlog/            # User Stories canónicas
  overview/           # Scrum plan y visión
  architecture/       # Diagramas y decisiones técnicas
  guides/             # Convenciones, procesos
  changelog/          # Historial por sprint (opcional)
  research/           # Benchmarks, pruebas exploratorias (opcional)
```

## Nomenclatura

- Epics: `epic-<nn>-<slug>.md` (ej: `epic-01-setup-overwolf-electron.md`)
- User Stories: `us-<epic>-<story>-<slug>.md` (ej: `us-01-02-captura-pantalla.md`)
- Slug: kebab-case, sin tildes ni caracteres especiales.

## Plantilla Epic

```
# EPIC <nn> — <Título>
## Resumen Ejecutivo
## Objetivo
## Alcance / Fuera de Alcance
## Motivación / Contexto
## Arquitectura / Diagramas
## User Stories (tabla)
## Métricas
## Dependencias / Riesgos
## Referencias
## Changelog
```

## Plantilla User Story

```
# US <epic>.<story> — <Título>
## Contexto
## Descripción (Como / Quiero / Para)
## Tareas Técnicas
## Definition of Done
## Métricas
## Notas / Riesgos
## Referencias
```

## Enlaces

Usar rutas relativas desde `/docs` donde sea posible. Issues se enlazan como `#<número>` y si es necesario URL completa.

## Commits

Prefijos sugeridos:

- `docs:` cambios de documentación
- `feat:` nueva funcionalidad código
- `chore:` mantenimiento
- `refactor:` reorganización interna

## Revisión

Antes de merge:

1. Verificar que no hay contenido duplicado.
2. Validar enlaces relativos.
3. Ejecutar lint Markdown (manual o CI futura).
